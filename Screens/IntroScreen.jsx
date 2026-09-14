import { View, Text, Pressable, StyleSheet } from 'react-native';

function IntroScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Logo Intro</Text>
      <Text style={styles.body}>
        Placeholder logo/intro animation goes here.
      </Text>

      <Pressable style={styles.button} onPress={() => navigation.navigate('StartGamePrompt')}>
        <Text style={styles.buttonText}>Continue</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#000',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  body: {
    fontSize: 14,
    color: '#ccc',
    textAlign: 'center',
    marginBottom: 24,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: '#897438',
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default IntroScreen;