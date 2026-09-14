import { BackHandler, View, ImageBackground, Pressable, Image, ScrollView } from 'react-native';
import { useState } from 'react';

import Part1 from '../GameScreen/Part1.jsx';
import Part2 from '../GameScreen/Part2.jsx';
import Part3 from '../GameScreen/Part3.jsx';
import Part4 from '../GameScreen/Part4.jsx';
import Part5 from '../GameScreen/Part5.jsx';
import Part6 from '../GameScreen/Part6.jsx';
import Part7 from '../GameScreen/Part7.jsx';
import Part8 from '../GameScreen/Part8.jsx';

import Settings from './Settings.jsx';
import Style from '../../Styles/Others/StyleMenu.jsx';

// = = = = = = = = = = Main Menu = = = = = = = = = =
function Menu_btn({ Part, setPart }){
  const [screen, setScreen] = useState('Menu_btn');

  if (screen === 'Settings') {
    return <Settings />;
  } else if (screen === 'New Game') {
    return <New_Game Part={Part} setPart={setPart} />;
  } else if (screen === 'Continue'){
    return <Continue Part={Part} setPart={setPart} />;
  } 
 
  return ( 
    <ImageBackground
      source={require('../../../assets/Menu/Main Menu/Menu_bg.png')}
      resizeMode="cover"
      style={Style.background}>  
      <View style={Style.btnList}>
        <Pressable onPress={() => setScreen('New Game')}>  
          <Image source={require('../../../assets/Menu/Main Menu/Menu_NewGame.png')} style={Style.button} />
        </Pressable>
  
        <Pressable onPress={() => setScreen('Continue')}>
          <Image source={require('../../../assets/Menu/Main Menu/Menu_Continue.png')} style={Style.button} />
        </Pressable>

        <Pressable onPress={() => setScreen('Settings')}>
          <Image source={require('../../../assets/Menu/Main Menu/Menu_Settings.png')} style={Style.button} />
        </Pressable>

        <Pressable onPress={() => BackHandler.exitApp()}>
          <Image source={require('../../../assets/Menu/Main Menu/Menu_Exit.png')} style={Style.button} />
        </Pressable>
      </View>
    </ImageBackground>
  );
}

// = = = = = = = = = = New Game = = = = = = = = = = 
function New_Game({ Part, setPart }){
  const [screen, setScreen] = useState('A');

  if(screen === 'Yes'){
    setPart(1);
    return <Menu_btn />
  } else if (screen === 'No') {
    return <Menu_btn />
  } 

  return ( 
    <ImageBackground
      source={require('../../../assets/Menu/New_Game/NewGame_bg.png')}
      resizeMode="cover"
      style={Style.background}
    > 

    <View style={Style.NewGameList}> 
      <Pressable onPress={() => setScreen('Yes')}>
        <Image source={require('../../../assets/Menu/New_Game/NewGame_Yes.png')} style={Style.NGbutton} />
      </Pressable>

      <Pressable onPress={() => setScreen('No')}>
        <Image source={require('../../../assets/Menu/New_Game/NewGame_No.png')} style={Style.NGbutton} />
      </Pressable>
    </View>
    
    </ImageBackground>
  );
}


// = = = = = = = = = = Continue  = = = = = = = = = =
function Continue({ Part, setPart }){
  const [screen, setScreen] = useState(null);

  if(screen === 'Chapter1'){
    return <Chapter1 Part={Part} setPart={setPart} />
  } 

  return(
    <ImageBackground
      source={require('../../../assets/Menu/Chapters/Chapters_bg.png')}
      resizeMode="cover"
      style={Style.background}
    >  
    <View style={Style.ChptList}> 
      <Pressable onPress={() => setScreen('Chapter1')}>
        <Image source={require('../../../assets/Menu/Chapters/Chapter1_btn.png')} style={Style.Chptbutton} />
      </Pressable>

      <Image source={require('../../../assets/Menu/Chapters/Chapter2_btn.png')} style={Style.Chptbutton} />
       
      <Image source={require('../../../assets/Menu/Chapters/Chapter3_btn.png')} style={Style.Chptbutton} />
    </View>
    </ImageBackground>
  );
}


function Chapter1({ Part, setPart }){
  const [screen, setScreen] = useState(null);

  const PartList = [
    Part1,
    Part2,
    Part3,
    Part4,
    Part5,
    Part6,
    Part7,
    Part8
  ];

  const Play = [
    require('../../../assets/Menu/Chapter 1 Parts/Part1_btn_play.png'),
    require('../../../assets/Menu/Chapter 1 Parts/Part2_btn_play.png'),
    require('../../../assets/Menu/Chapter 1 Parts/Part3_btn_play.png'),
    require('../../../assets/Menu/Chapter 1 Parts/Part4_btn_play.png'),
    require('../../../assets/Menu/Chapter 1 Parts/Part5_btn_play.png'),
    require('../../../assets/Menu/Chapter 1 Parts/Part6_btn_play.png'),
    require('../../../assets/Menu/Chapter 1 Parts/Part7_btn_play.png'),
    require('../../../assets/Menu/Chapter 1 Parts/Part8_btn_play.png')
  ];

  const Lock = [
    require('../../../assets/Menu/Chapter 1 Parts/Part1_btn_lock.png'),
    require('../../../assets/Menu/Chapter 1 Parts/Part2_btn_lock.png'),
    require('../../../assets/Menu/Chapter 1 Parts/Part3_btn_lock.png'),
    require('../../../assets/Menu/Chapter 1 Parts/Part4_btn_lock.png'),
    require('../../../assets/Menu/Chapter 1 Parts/Part5_btn_lock.png'),
    require('../../../assets/Menu/Chapter 1 Parts/Part6_btn_lock.png'),
    require('../../../assets/Menu/Chapter 1 Parts/Part7_btn_lock.png'),
    require('../../../assets/Menu/Chapter 1 Parts/Part8_btn_lock.png')
  ];

  if (screen !== null) {
    const SelectedPart = PartList[screen];
    return <SelectedPart />;
  }

  return (
    <ImageBackground
      source={require('../../../assets/Menu/Chapter 1 Parts/Parts_bg.png')}
      resizeMode="cover"
      style={Style.background}
    >
      <ScrollView
        style={Style.PartList}
        contentContainerStyle={Style.PartListContent}
      >
        {Play.map((image, i) => (
          <Pressable
            key={i}
            onPress={() => {
              if (i < Part) {
                setScreen(i);
              }
            }}
          >
            <Image
              source={i < Part ? image : Lock[i]}
              style={Style.Chptbutton}
            />
          </Pressable>
        ))}
      </ScrollView>
    </ImageBackground>
  );
}


export default function App({ Part, setPart }) {

  return (
    <View style={Style.background}>
    <Menu_btn Part={Part} setPart={setPart} />
    </View>
  );
}