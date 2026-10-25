import React, { useEffect, useMemo, useRef } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';

// Timing (ms)
const FADE_IN_MS = 550;
const BEAT_MS = 450;
const SCROLL_MS = 1400;
const AFTER_SCROLL_MS = 350;
const REVEAL_MS = 1300;
const AFTER_REVEAL_MS = 700;
const PREVIEW_HOLD_MS = 2400;

const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

// =====================================================
// UNLOCKING POLAROID
// One Animated.Value (progress 0 -> 1) drives everything:
//   0.00-0.50  anticipation: the locked polaroid jiggles and tilts
//   0.55-0.66  the locked art swaps to the unlocked art
//   0.60-1.00  pop, small hop, settle (ends at exactly normal size)
//
// width/height are the same pixel size as the normal polaroids,
// and both images get that exact size (no stretching to fill).
// =====================================================
export function UnlockingPolaroid({
    lockedImage,
    unlockedImage,
    progress,
    width,
    height,
}) {
    // Built once, so re-renders never recreate the native animation nodes.
    const anim = useMemo(
        () => ({
            rotate: progress.interpolate({
                inputRange: [0, 0.06, 0.12, 0.18, 0.24, 0.3, 0.36, 0.42, 0.5],
                outputRange: [
                    '0deg', '-5deg', '5deg', '-6deg', '6deg', '-4deg', '3deg', '-1deg', '0deg',
                ],
                extrapolate: 'clamp',
            }),
            scale: progress.interpolate({
                inputRange: [0, 0.1, 0.5, 0.62, 0.74, 0.86, 1],
                outputRange: [1, 1.03, 1.03, 1.08, 0.98, 1.02, 1],
                extrapolate: 'clamp',
            }),
            translateY: progress.interpolate({
                inputRange: [0, 0.5, 0.62, 0.76, 0.86, 1],
                outputRange: [0, 0, -8, 0, -2, 0],
                extrapolate: 'clamp',
            }),
            unlockedOpacity: progress.interpolate({
                inputRange: [0, 0.55, 0.66, 1],
                outputRange: [0, 0, 1, 1],
                extrapolate: 'clamp',
            }),
            lockedOpacity: progress.interpolate({
                inputRange: [0, 0.55, 0.66, 1],
                outputRange: [1, 1, 0, 0],
                extrapolate: 'clamp',
            }),
        }),
        [progress]
    );

    const size = { width, height };

    return (
        <Animated.View
            style={[
                size,
                {
                    transform: [
                        { translateY: anim.translateY },
                        { rotate: anim.rotate },
                        { scale: anim.scale },
                    ],
                },
            ]}
        >
            <Animated.Image
                source={lockedImage}
                resizeMode="contain"
                style={[styles.stackedImage, size, { opacity: anim.lockedOpacity }]}
            />
            <Animated.Image
                source={unlockedImage}
                resizeMode="contain"
                style={[styles.stackedImage, size, { opacity: anim.unlockedOpacity }]}
            />
        </Animated.View>
    );
}

// =====================================================
// SEQUENCE COORDINATOR
// Plays: fade in -> scroll -> unlock animation -> preview hold,
// then calls onSequenceDone(). PartSelect owns the final screen.
// =====================================================
export default function ChapterUnlockSequence({
    sequence,
    scrollRef,
    scrollMetrics, // ref: { offset, viewH, contentH }
    revealProgress,
    itemHeight,
    itemStride,
    onRevealDone,
    onShowPreview,
    onSequenceDone,
}) {
    const cover = useRef(new Animated.Value(1)).current;

    // Always call the latest handlers from the long-running timeline.
    const callbacks = useRef({});
    callbacks.current = { onRevealDone, onShowPreview, onSequenceDone };

    useEffect(() => {
        let cancelled = false;
        const timers = new Set();
        const running = new Set();
        const scrollY = new Animated.Value(0);
        let listenerId = null;

        const wait = (ms) =>
            new Promise((resolve) => {
                const id = setTimeout(() => {
                    timers.delete(id);
                    resolve();
                }, ms);
                timers.add(id);
            });

        const play = (animation) =>
            new Promise((resolve) => {
                running.add(animation);
                animation.start(() => {
                    running.delete(animation);
                    resolve();
                });
            });

        const targetFor = (index) => {
            const { viewH, contentH } = scrollMetrics.current;
            const maxY = Math.max(0, contentH - viewH);
            return clamp(index * itemStride - (viewH - itemHeight) / 2, 0, maxY);
        };

        const scrollToY = (y) =>
            scrollRef.current?.scrollTo({ y, animated: false });

        const finish = () => {
            console.log('[unlock-seq] done -> onSequenceDone');
            callbacks.current.onSequenceDone?.();
        };

        const run = async () => {
            try {
                console.log('[unlock-seq] start', sequence);

                for (
                    let i = 0;
                    i < 30 &&
                    (scrollMetrics.current.viewH === 0 ||
                        scrollMetrics.current.contentH === 0);
                    i++
                ) {
                    await wait(50);
                    if (cancelled) return;
                }

                const fromY = targetFor(sequence.completedIndex);
                scrollToY(fromY);
                await wait(60);
                if (cancelled) return;

                await play(
                    Animated.timing(cover, {
                        toValue: 0,
                        duration: FADE_IN_MS,
                        useNativeDriver: true,
                    })
                );
                if (cancelled) return;
                await wait(BEAT_MS);
                if (cancelled) return;
                console.log('[unlock-seq] faded in');

                if (sequence.nextIndex !== null) {
                    const toY = targetFor(sequence.nextIndex);

                    if (Math.abs(toY - fromY) > 1) {
                        scrollY.setValue(fromY);
                        listenerId = scrollY.addListener(({ value }) => scrollToY(value));

                        await play(
                            Animated.timing(scrollY, {
                                toValue: toY,
                                duration: SCROLL_MS,
                                easing: Easing.inOut(Easing.cubic),
                                useNativeDriver: false,
                            })
                        );

                        scrollY.removeListener(listenerId);
                        listenerId = null;
                        if (cancelled) return;
                        scrollToY(toY);
                    }
                    console.log('[unlock-seq] scrolled');

                    await wait(AFTER_SCROLL_MS);
                    if (cancelled) return;

                    if (sequence.needsReveal) {
                        await play(
                            Animated.timing(revealProgress, {
                                toValue: 1,
                                duration: REVEAL_MS,
                                easing: Easing.linear,
                                useNativeDriver: true,
                            })
                        );
                        if (cancelled) return;
                        // Pin the value to exactly 1 so the polaroid rests at normal size.
                        revealProgress.setValue(1);
                        console.log('[unlock-seq] revealed');
                        callbacks.current.onRevealDone?.();
                        await wait(AFTER_REVEAL_MS);
                        if (cancelled) return;
                    }

                    try {
                        callbacks.current.onShowPreview?.(sequence.nextIndex);
                    } catch (error) {
                        console.error('onShowPreview failed:', error);
                    }
                    await wait(PREVIEW_HOLD_MS);
                    if (cancelled) return;
                } else {
                    await wait(AFTER_REVEAL_MS);
                    if (cancelled) return;
                }

                finish();
            } catch (error) {
                console.error('Chapter unlock sequence failed:', error);
                if (!cancelled) finish();
            }
        };

        run();

        return () => {
            console.log('[unlock-seq] cleanup (cancelled =', cancelled, ')');
            cancelled = true;
            timers.forEach(clearTimeout);
            running.forEach((a) => a.stop());
            if (listenerId !== null) scrollY.removeListener(listenerId);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <View style={styles.root} pointerEvents="auto">
            <Animated.View
                pointerEvents="none"
                style={[styles.cover, { opacity: cover }]}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 100,
        elevation: 100,
    },
    cover: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#000000',
    },
    stackedImage: {
        position: 'absolute',
        left: 0,
        top: 0,
    },
});