export const Chapter1_Part5 = [

  {
    type: "system",
    intro: true,
    background: require("../../../../Background Images/Usuals/Black Background.jpg"),
    text: "The Katipunan had spent years preparing in secret."
  },

  {
    type: "system",
    intro: true,
    background: require("../../../../Background Images/Usuals/Black Background.jpg"),
    text: "Now, its secret was out. There's no turning back."
  },



  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // SCENE 1
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  {
    type: "scene",
    title: "The Catalyst",
    date: "August 19, 1896",
    background: require("../../../../Background Images/Usuals/Black Background.jpg")
  },

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 5/19th century hand press printing shop ransacked.png"),
    text: "The Katipunan has been exposed. Father Gil sends people to Diario de Manila."
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
    background: require("../../../../Background Images/Part 5/19th century hand press printing shop ransacked.png"),
    text: "Arrests spread through Manila, and Bonifacio knows the Spanish authorities\nwill soon come for more of his men."
  },

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 5/Katipunan hideout 1896,.png"),
    text: "Bonifacio knows there is no time left for quiet planning. He leaves Manila\nand calls the Katipunan leaders to an emergency meeting."
  },



  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // SCENE 2
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  {
    type: "scene",
    title: "The Emergency Council",
    date: "August 1896",
    background: require("../../../../Background Images/Usuals/Brown Background.jpg")
  },

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 5/Katipunan hideout 1896,.png"),
    text: "At the meeting, the leaders face a difficult choice. They can act with the\nweapons they have, or wait and risk being arrested one by one."
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

  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // CHOICE 5.1 
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  {
    type: "choice",
    title: "Choice 5.1: You are Andrés Bonifacio",
    background: require("../../../../Background Images/Part 5/Katipunan hideout 1896,.png"),
    question: "Teodoro Plata worries that starting the revolution without\nenough weapons is too dangerous.",
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
        dialogue: "Baka mas mabuting maghintay ng ilang araw, hanggang may dagdag tayong sandata.",
        translation: "Maybe it's better to wait a few days, until we have more weapons."
      }
    ],
    nextScene: 12
  },

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 5/Katipunan hideout 1896,.png"),
    text: "Either way, there is little time left. The Katipunan has been exposed, and the\ndecision to rise against Spanish rule is already taking shape."
  },



  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // SCENE 3
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  {
    type: "scene",
    title: "The Historian's Interlude",
    background: require("../../../../Background Images/Usuals/Brown Background.jpg")
  },

  {
    type: "system",
    background: require("../../../../Background Images/Usuals/Brown Background.jpg"),
    text: "History is not always perfectly clear-cut. Historians have given different\naccounts of exactly when and where the Cry took place."
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



  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // SCENE 4
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  {
    type: "scene",
    title: "The Tearing of the Cédulas",
    date: "August 23, 1896",
    background: require("../../../../Background Images/Usuals/Brown Background.jpg")
  },

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 5/Cry of Pugad Lawin.png"),
    text: "At Pugad Lawin, Bonifacio and about a thousand Katipuneros gather at the\nhome of Melchora Aquino, known as Tandang Sora."
  },

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 5/Cry of Pugad Lawin.png"),
    text: "They face a choice that will make their break with Spanish rule impossible to hide."
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


  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // CHOICE 5.2
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  {
    type: "choice",
    title: "Choice 5.2: You are a Katipunan Soldier",
    background: require("../../../../Background Images/Part 5/Cry of Pugad Lawin.png"),
    question: "You know that tearing your cédula means openly\nbreaking with Spanish rule.",
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
    nextScene: 25
  },


  // CONTINUE

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 5/Cry of Pugad Lawin.png"),
    text: "You tear your cédula along with the others. The act becomes a powerful symbol of\ntheir decision to rise against Spanish rule."
  },



  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // SCENE 5
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  {
    type: "scene",
    title: "The First Battle: San Juan del Monte",
    date: "August 30, 1896",
    background: require("../../../../Background Images/Usuals/Brown Background.jpg")
  },

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 5/Battle of San Juan del Monte 1896.png"),
    text: "A week after the cry, the Katipuneros launch a major attack at San Juan del\nMonte, hoping to capture the Spanish weapons depot at the Polvorín."
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

  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // CHOICE 5.3
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  {
    type: "choice",
    title: "Choice 5.3: You are Andrés Bonifacio",
    background: require("../../../../Background Images/Part 5/Battle of San Juan del Monte 1896.png"),
    question: "Your fighters are preparing to attack the Spanish weapons depot in San Juan.",
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
    nextScene: 30
  },


  // CONTINUE

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 5/Battle of San Juan del Monte 1896.png"),
    text: "The Revolution begins. After the Cry of Pugad Lawin, Bonifacio and the Katipunan\nleaders move quickly to organize their first attacks."
  },

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 5/Battle of San Juan del Monte 1896.png"),
    text: "One of their plans is a coordinated attack on Manila, with different groups\nentering from several directions."
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
    text: "Tatlong daan. Tatlong direksyon. Kung sabay tayong tatama sa Maynila,\nhindi nila kayang ipagtanggol ang lahat.",
    translation: "Three routes. Three directions. If we strike Manila together, they won't be able to defend everything."
  },

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 5/Battle of San Juan del Monte 1896.png"),
    text: "But the plan fails. The attack at San Juan del Monte ends in heavy losses, and\nthe revolutionaries are forced to retreat."
  },

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 5/Map of the eight provinces under martial law.png"),
    text: "On August 30, Governor-General Ramón Blanco places eight provinces\nunder a state of war."
  },

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 5/Map of the eight provinces under martial law.png"),
    text: "The Spanish government now knows the rebellion is no longer a small, hidden movement."
  },

  {
    type: "scene",
    title: "The fighting at San Juan del Monte makes one thing clear:",
    date: "the Revolution has begun.",
    background: require("../../../../Background Images/Usuals/Black Background.jpg"),
  },

  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // QUIZ TIME
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

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
  }

];