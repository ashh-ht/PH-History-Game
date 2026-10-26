import React, { useRef, useState } from 'react';
import {
  ImageBackground,
  ScrollView,
  Image,
  StyleSheet,
  Text,
  View,
  Animated,
  Linking,
  useWindowDimensions,
} from 'react-native';
import Sound_clicks from '../../Components/Sound_clicks';
import useScale from '../../Components/ScreenScaler';

const BG_BASE = require('../../assets/Settings_Assets/Sources_Base.png');

const CITATIONS_TEXT = `Admin. (2021, October 11). José Rizal. Philippine Folklife Museum Foundation | San Francisco, Ca. https://philippinefolklifemuseum.org/collection/jose-rizal/
Admin. (2019, June 25). Andres Bonifacio. Philippine Folklife Museum Foundation | San Francisco, Ca. https://philippinefolklifemuseum.org/collection/andres-bonifacio/
Apacible, Luna and Arejola. (n.d.). Philippine Center for Masonic Studies. https://www.philippinemasonry.org/apacible-luna-and-arejola.html
Argate, R., Cabañero, D. T., & Barcoso, H. L. (2020). The Katipunan Movement in CEBU: Significance to the Philippine struggle for independence. Journal of Humanities and Social Sciences Studies, 2(6), 195–202. https://doi.org/10.32996/jhsss.2020.2.6.21
Aseniero, G. & Independent Researcher. (2013). From Cádiz to La Liga: The Spanish context of Rizal’s political thought. ASIAN STUDIES: Journal of Critical Perspectives on Asia, 49(1). https://www.asj.upd.edu.ph/mediabox/archive/ASJ-49-1-2013/From%20Cadiz%20to%20La%20Liga%20-%20Spanish%20Context%20of%20Rizals%20Political%20Thought%20-%20Aseniero.pdf
Bautista, A. R. (1898, June 12). Acta de la Proclamación de Independencia del Pueblo Filipino [The formal Declaration of Independence].
Bonifacio, A. (1897, February 13). Letter to Julio Nakpil regarding revolutionary movements and internal coordination. [Critical primary artifact detailing communications]. http://www.kasaysayan-kkk.info/cavite-politics-in-a-time-of-revolution/andres-bonifacio-letter-to-julio-nakpil-february-13-1897
Bonifacio, A. (1897, April 16). Letter to Emilio Jacinto from Naik regarding secret negotiations between Aguinaldo and Spanish Jesuits. [Archival correspondence].
Bonifacio, A. (1892). The Katipunan Decalogue (Katungkulang gagawin ng mga Z. Ll. B.) [Masonic-influenced moral code].
Camposano, C. C. (2019). Citizenship and Civic Education: A critical elaboration on the pedagogy of Rizal’s La Liga Filipina. Philippine Journal of Public Policy. https://cids.up.edu.ph/wp-content/uploads/2020/02/Camposano-Article-2019.pdf
Camus, J. de. (1565). Notarized declaration regarding the discovery of the Flemish-style Santo Niño in Cebu. In J. V. Jimenez et al. (Eds.), Philippine History Source Book. National Commission for Culture and the Arts.
CuUnjieng Aboitiz, N. (2020). Asian Place, Filipino Nation: A Global Intellectual History of the Philippine Revolution, 1887–1912 (pp. vii–ix). Columbia University Press. https://cup.columbia.edu
Dagohoy Rebellion | History | Research Starters | EBSCO Research. (n.d.). EBSCO. https://www.ebsco.com/research-starters/history/dagohoy-rebellion
Davis, L. (1989). Revolutionary struggle in the Philippines. Palgrave Macmillan. https://doi.org/10.1007/978-1-349-19862-7
Dela Peña, A. R., Constantino, R., Llewellyn, J., Thompson, S., Sage-Advices, Acode, Wikipilipinas., & TeachersCollegesJ. (2022). A critical paper on the Philippines: A past Revisited. Polytechnic University of the Philippines – Sta. Mesa.
Despujol, E. (1892, July 6). Official arrest and exile decree of Dr. José Rizal. Spanish Colonial Administrative Order.
Emilio Aguinaldo. (n.d.). Philippine Center for Masonic Studies. https://www.philippinemasonry.org/emilio-aguinaldo.html
First unfurling of the Philippine Flag, May 28, 1898. (n.d.). Philippine Center for Masonic Studies. https://www.philippinemasonry.org/first-unfurling-of-the-philippine-flag.html
Founders of the Katipunan. (n.d.). Philippine Center for Masonic Studies. https://www.philippinemasonry.org/founders-of-the-katipunan.html
Guerrero, M. C., Encarnacion, E. N., & Villegas, R. N. (n.d.). Andres Bonifacio and the 1896 Revolution. In KasPil1 Readings, DLSU-Manila (pp. 1–4). https://bangkanixiao.wordpress.com/wp-content/uploads/2012/10/guerrero-andres-bonifacio-and-the-1896-revolution.pdf
History of Masonry in the Philippines. Chronology, 1856-1890. (n.d.). Philippine Center for Masonic Studies. https://www.philippinemasonry.org/1856--1890.html
History of Masonry in the Philippines. Chronology, 1890-1900. (n.d.). Philippine Center for Masonic Studies. https://www.philippinemasonry.org/1890---1900.html
History of Masonry in the Philippines. Chronology, 1901-1918. (n.d.). Philippine Center for Masonic Studies. https://www.philippinemasonry.org/1901---1918.html
Jacinto, E. (1894). The Kartilya ng Katipunan [Official primer utilizing Masonic-style codes and rituals].
Jandoc, K. R. L. (2011). La Liga Filipina: Rizal and institutional change. The Philippine Review of Economics, 48(2), 151–182.
Jesús, G. de. (1930). Mga Tala ng Aking Buhay [Memoirs of my life]. Kasaysayan-KKK Digital Archive.
Jimenez, J. V., Hernandez, J. R. B., Cleope, E. J. P., Galang, J. A., Ramos, D. P. G., II, Estella, J. R., & Cabalquinto, A. D. (2021). Philippine history source book: Annotated compilation of selected Philippine history primary sources and secondary works in electronic format. National Commission for Culture and the Arts (NCCA). https://www.researchgate.net/publication/356251783_Philippine_History_Source_Book
Kartilya ng Katipunan. (n.d.). Philippine Center for Masonic Studies. https://www.philippinemasonry.org/kartilya-ng-katipunan.html
Kasaysayan-KKK Digital Archive. (n.d.). Digital archive of the Philippine Revolution. https://www.kasaysayan-kkk.info/
Legazpi, M. L. de. (1565–1571). Letters and reports to King Philip II regarding the establishment of Villa de Santisimo Nombre de Jesus and the annexation of Manila. Spanish Colonial Administrative Records.
Mabini, A. (1898, June 23). Decree establishing the Revolutionary Government. [Transition from dictatorial to constitutional structures].
McKinley, W. (1898, December 21). Benevolent Assimilation Proclamation. [U.S. executive order asserting sovereignty over the islands].
Morales, G. (1744). Jesuit pastoral letters regarding the "apostasy" and rebellion of the Boholanos in Inabanga. Ecclesiastical Records. In NCCA-NCHR Source Book.
Morga, A. de. (1609). Sucesos de las Islas Filipinas [Events in the Philippine Islands].
Noriel, M. (1897). Records of the Court-Martial of Andrés and Procopio Bonifacio.
Ricafort, M. (1829). Decree of pardon and amnesty for the 19,420 survivors of the Bohol rebellion. Official Spanish Administrative Decree.
Ricarte, A. (1897, March 24). The Declaration of Artemio Ricarte regarding the anomalies of the Tejeros Convention.
Rizal, J. (1892). The Constitution of La Liga Filipina.
Sanz, M. (1829). Official military dispatches regarding the final suppression of the Dagohoy rebellion. Spanish Military Campaign Records.
The 13 Martyrs of Bagumbayan. (n.d.). Philippine Center for Masonic Studies. https://www.philippinemasonry.org/the-13-martyrs-of-bagumbayan.html
The Katipunan and Masonry. (n.d.). Philippine Center for Masonic Studies. https://www.philippinemasonry.org/the-katipunan-and-masonry.html
The katipunan ideology. (n.d.). Philippine Center for Masonic Studies.
United States & Spain. (1898, December 10). The Treaty of Paris.
Vallejo, B. (2016). Antonio Luna, science and the emerging Filipino national identity. Antonio Luna, Science and the Emerging Filipino National Identity, 61(1). https://doi.org/10.13140/rg.2.1.1113.7527
Victoria, F. P. F. (2023). Opium, the Ethnic Chinese, and the Philippine Revolution: Disruption and adaptation in the midst of Regime Change, 1896–1901. Chinese Studies Journal, 17, 140–183.`;

const SOURCES_LIST = CITATIONS_TEXT.split('\n').filter(line => line.trim() !== '');
const PANEL_ASPECT = 1205 / 630;
const URL_REGEX = /(https?:\/\/[^\s]+)/g;

function SpringImageButton({ image, pressedImage, onPress, imageStyle }) {
  const scale = useRef(new Animated.Value(1)).current;
  const [pressed, setPressed] = useState(false);

  const handlePressIn = () => {
    setPressed(true);
    Animated.spring(scale, { toValue: 0.9, useNativeDriver: true, speed: 20, bounciness: 10 }).start();
  };

  const handlePressOut = () => {
    setPressed(false);
    Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 20, bounciness: 10 }).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <Sound_clicks onPress={onPress} onPressIn={handlePressIn} onPressOut={handlePressOut}>
        <Image source={pressed ? pressedImage : image} style={imageStyle} resizeMode="contain" />
      </Sound_clicks>
    </Animated.View>
  );
}

function Citation({ text }) {
  const parts = text.split(URL_REGEX);

  const openLink = async (url) => {
    try {
      await Linking.openURL(url);
    } catch (e) {
      console.warn('Could not open URL:', url, e);
    }
  };

  return (
    <Text style={styles.citationText}>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <Text key={i} style={styles.linkText} onPress={() => openLink(part)}>
            {part}
          </Text>
        ) : (
          part
        )
      )}
    </Text>
  );
}

export default function SourcesScreen({ navigation }) {
  const { s, insets } = useScale();
  const { width: winW, height: winH } = useWindowDimensions();

  const panelH = Math.min(winH * 0.92, 700, (winW * 0.9) / PANEL_ASPECT);
  const panelW = panelH * PANEL_ASPECT;

  const dynamicStyles = {
    topIconContainer: {
      top: Math.max(insets.top, 12 * s),
      left: Math.max(insets.left, 20 * s),
    },
    topIconImage: {
      width: 40 * s,
      height: 40 * s,
    },
  };

  return (
    <View style={styles.screenOverlay}>
      <View style={[styles.topIconContainer, dynamicStyles.topIconContainer]}>
        <SpringImageButton imageStyle={dynamicStyles.topIconImage}
          image={require('../../assets/icons/x_button.png')}
          pressedImage={require('../../assets/icons/x_buttonpressed.png')}
          onPress={() => navigation.goBack()}
        />
      </View>

      <ImageBackground
        source={BG_BASE}
        style={{ width: panelW, height: panelH, justifyContent: "center", alignItems: "center", paddingTop: "12%", paddingBottom: "5%" }}
        resizeMode="stretch"
      >
        <View style={styles.contentWrapper}>
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={true}
            indicatorStyle="black"
          >
            {SOURCES_LIST.map((citation, index) => (
              <Citation key={index} text={citation} />
            ))}
          </ScrollView>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  screenOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.65)",
    justifyContent: "center",
    alignItems: "center",
  },
  topIconContainer: {
    position: "absolute",
    zIndex: 10,
    flexDirection: "row",
  },
  contentWrapper: {
    width: "80%",
    height: "100%",
    alignItems: "center",
  },
  scrollView: {
    width: "90%",
  },
  scrollContent: {
    paddingVertical: 10,
    paddingBottom: 60,
  },
  citationText: {
    fontFamily: 'serif',
    fontSize: 16,
    color: '#5A4A32',
    textAlign: 'left',
    lineHeight: 24,
    marginBottom: 16,
  },
  linkText: {
    color: '#1A5FB4',
    textDecorationLine: 'underline',
  },
});