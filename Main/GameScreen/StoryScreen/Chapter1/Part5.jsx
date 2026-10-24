export const Chapter1_Part5 = [

  {
    type: "scene",
    title: "The Catalyst",
    date: "August 19, 1896",
    background: require("../../../../Background Images/Usuals/Black Background.jpg")
  },

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 5/19th century hand press printing shop ransacked.png"),
    text: "On August 19, 1896, Spanish authorities discover the Katipunan. Arrests\nspread through Manila. Bonifacio knows the members must act quickly."
  },

  {
    type: "dialogue",
    speaker: "FATHER MARIANO GIL",
    background: require("../../../../Background Images/Part 5/19th century hand press printing shop ransacked.png"),
    characters: [
      {
        source: require("../../../../Character Images/Temporary Placeholders/Gil.png"),
        position: "left"
      }
    ],
    text: "Search the Diario de Manila press right away. There may be evidence\nthere. Find names, plans, everything."
  },

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 5/Katipunan hideout 1896,.png"),
    text: "Bonifacio calls an emergency meeting. The leaders must decide what to do next."
  },

  //T2_5 here

  {
    type: "scene",
    title: "The Emergency Council",
    date: "August 1896",
    background: require("../../../../Background Images/Usuals/Brown Background.jpg")
  },

  {
    type: "dialogue",
    speaker: "TEODORO PLATA",
    background: require("../../../../Background Images/Part 5/Katipunan hideout 1896,.png"),
    characters: [
      {
        source: require("../../../../Character Images/Temporary Placeholders/Plata.png"),
        position: "left"
      }
    ],
    text: "Andrés, we barely have enough muskets for one man in ten. Starting\na revolution now is too risky."
  },

  {
    type: "dialogue",
    speaker: "ANDRÉS BONIFACIO",
    background: require("../../../../Background Images/Part 5/Katipunan hideout 1896,.png"),
    characters: [
      {
        source: require("../../../../Character Images/Temporary Placeholders/Bonifacio.png"),
        position: "right"
      }
    ],
    text: "And waiting is risky too, Teodoro. They already know our names. Do we\nwait to be arrested one by one, or do we stand together and fight?"
  },

  //T4_5 here

  {
    type: "choice",
    title: "Choice 5.1: You are Andrés Bonifacio",
    question: "Teodoro Plata worries that starting the revolution without\nenough weapons is too dangerous.",
    background: require("../../../../Background Images/Part 5/Katipunan hideout 1896,.png"),
    choices: [
      {
        text: "Overrule Plata and call for the revolution to begin now.",
        speaker: "ANDRÉS BONIFACIO",
        characters: [
          {
            source: require("../../../../Character Images/Temporary Placeholders/Bonifacio.png"),
            position: "right"
          }
        ],
        dialogue: "Hindi na tayo maghihintay. Ngayon na ang oras.",
        translation: "We won't wait any longer. Now is the time."
      },

      {
        text: "Suggest securing more weapons first, even if it means a delay.",
        speaker: "ANDRÉS BONIFACIO",
        characters: [
          {
            source: require("../../../../Character Images/Temporary Placeholders/Bonifacio.png"),
            position: "right"
          }
        ],
        dialogue: "Baka mas mabuting maghintay tayo ng ilang araw,\nhanggang sa marami na tayong sandata.",
        translation: "Maybe it's better to wait a few days, until we have more weapons."
      }
    ],
    nextScene: 8
  },

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 5/Katipunan hideout 1896,.png"),
    text: "The Katipunan has little time left. Its leaders\nprepare to make a stand against Spanish rule."
  },

  {
    type: "scene",
    title: "The Historian's Interlude",
    background: require("../../../../Background Images/Usuals/Brown Background.jpg")
  },

  {
    type: "system",
    background: require("../../../../Background Images/Usuals/Brown Background.jpg"),
    text: "Historians disagree about the exact date and place of the Cry."
  },

  {
    type: "system",
    background: require("../../../../Background Images/Usuals/Brown Background.jpg"),
    text: "Teodoro Agoncillo's account:\nPlaces the event on August 23, 1896, at Pugad Lawin."
  },

  {
    type: "system",
    background: require("../../../../Background Images/Usuals/Brown Background.jpg"),
    text: "General Artemio Ricarte,\nalso gives August 23, but identifies Balintawak as the location."
  },

  {
    type: "system",
    background: require("../../../../Background Images/Usuals/Brown Background.jpg"),
    text: "General Santiago Álvarez's account:\nPlaces the main event instead on August 29, 1896."
  },

  {
    type: "system",
    background: require("../../../../Background Images/Usuals/Brown Background.jpg"),
    text: "The exact date and location remains debated. But the significance is clear:\nthe Katipunan was no longer staying in the shadows."
  },

  {
    type: "system",
    background: require("../../../../Background Images/Usuals/Brown Background.jpg"),
    text: "Although accounts differ, the Cry became a symbol of\nthe Filipinos' decision to fight for freedom."
  },

  //T1_5 here

  {
    type: "scene",
    title: "The Tearing of the Cédulas",
    date: "August 23, 1896",
    background: require("../../../../Background Images/Usuals/Brown Background.jpg")
  },

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 5/Cry of Pugad Lawin.png"),
    text: "At Pugad Lawin, Bonifacio and about a thousand Katipuneros gather. They\nhold their cédulas, identity papers issued under Spanish rule."
  },

  {
    type: "dialogue",
    speaker: "ANDRÉS BONIFACIO",
    background: require("../../../../Background Images/Part 5/Cry of Pugad Lawin.png"),
    characters: [
      {
        source: require("../../../../Character Images/Temporary Placeholders/Bonifacio.png"),
        position: "left"
      }
    ],
    text: "This paper says we belong to Spain. Tonight, we say otherwise."
  },

  {
    type: "dialogue",
    speaker: "ANDRÉS BONIFACIO",
    background: require("../../../../Background Images/Part 5/Cry of Pugad Lawin.png"),
    characters: [
      {
        source: require("../../../../Character Images/Temporary Placeholders/Bonifacio.png"),
        position: "left"
      }
    ],
    text: "Show me your cédulas!"
  },

  {
    type: "choice",
    title: "Choice 5.2: You are a Katipunan Soldier",
    question: "You know that tearing your cédula means openly\nbreaking with Spanish rule.",
    background: require("../../../../Background Images/Part 5/Cry of Pugad Lawin.png"),
    choices: [
      {
        text: "Tear the cédula without hesitation.",
        speaker: "KATIPUNAN SOLDIERS",
        characters: [
          {
            source: require("../../../../Character Images/Temporary Placeholders/Katipunero.png"),
            position: "right"
          }
        ],
        dialogue: "Mabuhay ang Pilipinas! Mabuhay ang Katipunan!",
        translation: "Long live the Philippines! Long live the Katipunan!"
      },

      {
        text: "Hesitate for a moment, then tear it.",
        speaker: "KATIPUNAN SOLDIER",
        characters: [
          {
            source: require("../../../../Character Images/Temporary Placeholders/Katipunero.png"),
            position: "right"
          }
        ],
        dialogue: "Malaking hakbang ito... pero panahon na.",
        translation: "This is a big step... but it's time."
      }
    ],
    nextScene: 21
  },

  //Q1_5 here

  // CONTINUE

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 5/Cry of Pugad Lawin.png"),
    text: "The Katipuneros tear their cédulas. This act shows that they reject\nSpanish rule and are ready to fight for independence."
  },

  {
    type: "scene",
    title: "The First Battle: San Juan del Monte",
    date: "August 30, 1896",
    background: require("../../../../Background Images/Usuals/Brown Background.jpg")
  },

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 5/Battle of San Juan del Monte 1896.png"),
    text: "On August 30, 1896, revolutionaries attack the\nSpanish weapons depot at San Juan del Monte."
  },

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 5/Battle of San Juan del Monte 1896.png"),
    text: "They hope to capture guns and ammunition."
  },

  {
    type: "dialogue",
    speaker: "ANDRÉS BONIFACIO",
    background: require("../../../../Background Images/Part 5/Battle of San Juan del Monte 1896.png"),
    characters: [
      {
        source: require("../../../../Character Images/Temporary Placeholders/Bonifacio.png"),
        position: "right"
      }
    ],
    text: "Kunin natin ang mga baril nila. Kung wala tayong sandata ngayon,\nmay sandata na tayo bukas.",
    translation: "Let's take their weapons. If we don't have arms today, we'll have them tomorrow."
  },

  {
    type: "choice",
    title: "Choice 5.3: You are Andrés Bonifacio",
    question: "Your fighters are preparing to attack the Spanish weapons depot in San Juan.",
    background: require("../../../../Background Images/Part 5/Battle of San Juan del Monte 1896.png"),
    choices: [
      {
        text: "Launch the assault immediately.",
        speaker: "ANDRÉS BONIFACIO",
        characters: [
          {
            source: require("../../../../Character Images/Temporary Placeholders/Bonifacio.png"),
            position: "right"
          }
        ],
        dialogue: "Sugod! Kunin natin ang Polvorín!",
        translation: "Attack! Take the Polvorín!"
      },

      {
        text: "Wait and surround the depot while more allies arrive.",
        speaker: "ANDRÉS BONIFACIO",
        characters: [
          {
            source: require("../../../../Character Images/Temporary Placeholders/Bonifacio.png"),
            position: "right"
          }
        ],
        dialogue: "Hintayin muna natin sila. Palilibutan natin ang Polvorín.",
        translation: "Let's wait for them. We'll surround the Polvorín."
      }
    ],
    nextScene: 27
  },

  // CONTINUE

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 5/Battle of San Juan del Monte 1896.png"),
    text: "The attack fails, and the revolutionaries retreat. The\nfighting marks the start of a wider war against Spain."
  },

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 5/Map of the eight provinces under martial law.png"),
    text: "On August 30, Governor-General Ramón Blanco places\neight provinces under a state of war."
  },

  //T3_5 here

  {
    type: "system",
    intro: true,
    background: require("../../../../Background Images/Usuals/Black Background.jpg"),
    text: "The Katipunan has openly challenged Spain. The Revolution has begun,\nbut the first battles show how difficult the fight will be."
  },

  {
    type: "scene",
    title: "Test Your Knowledge!",
    date: "How well do you remember the beginning of the Revolution?",
    background: require("../../../../Background Images/Usuals/Brown Background.jpg")
  },

  {
    type: "quiz",
    question: "What led Bonifacio and the Katipunan to move toward\nopen revolt in August 1896?",
    options: [
      "The Spanish government offered\nthem independence",
      "The Katipunan was exposed and its\nembers began facing arrests",
      "Rizal returned from exile",
      "The Spanish army abandoned Manila"
    ],
    correctIndex: 1
  },

  {
    type: "quiz",
    question: "What did the tearing of the cédulas symbolize?",
    options: [
      "The end of the Katipunan",
      "A rejection of Spanish rule",
      "The beginning of a new tax system",
      "A celebration of Spanish citizenship"
    ],
    correctIndex: 1
  },

  {
    type: "quiz",
    question: "Where did the Katipuneros launch a major attack on August 30, 1896?",
    options: [
      "Cavite",
      "Pugad Lawin",
      "San Juan del Monte",
      "Cebu"
    ],
    correctIndex: 2
  },

  {
    type: "quiz",
    question: "What happened after the attack at San Juan del Monte?",
    options: [
      "The revolutionaries captured Manila",
      "The Spanish forces surrendered",
      "The revolutionaries suffered heavy\nlosses and retreated",
      "The Katipunan disbanded"
    ],
    correctIndex: 2
  },

  {
    type: "quiz",
    question: "What did Governor-General Ramón Blanco declare on August 30, 1896?",
    options: [
      "A peace agreement",
      "Eight provinces under a state of war",
      "Philippine independence",
      "The restoration of La Liga Filipina"
    ],
    correctIndex: 1
  },

  {
    type: "scene",
    title: "Chapter Complete.",
    date: "The uprising had begun.",
    background: require("../../../../Background Images/Usuals/Black Background.jpg")
  },

  {
    type: "scene",
    title: "The first battles were only the beginning.",
    date: " ",
    background: require("../../../../Background Images/Usuals/Black Background.jpg")
  },

];