
export const Chapter1_Part5 = [

  // ===========================================
  // PROLOGUE
  // ===========================================

  {
    type: "system",
    intro: true,
    background: require("../../../../Background Images/Usuals/Black Background.jpg"),
    text: "The Katipunan had prepared in secret. Now, its secret is out."
  },

  {
    type: "system",
    intro: true,
    background: require("../../../../Background Images/Usuals/Black Background.jpg"),
    text: "Arrests spread quickly."
  },

  {
    type: "system",
    intro: true,
    background: require("../../../../Background Images/Usuals/Black Background.jpg"),
    text: "Now, Bonifacio and his fellow Katipuneros must decide: wait, or fight for freedom."
  },

  // ===========================================
  // SCENE 1: THE CATALYST
  // ===========================================

  {
    type: "scene",
    title: "The Catalyst",
    date: "August 19, 1896",
    background: require("../../../../Background Images/Usuals/Black Background.jpg"),
    // SFX: running
    sfx: "running"
  },

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 5/19th century hand press printing shop ransacked.png"),
    text: "Spanish authorities discover the Katipunan. Father Mariano Gil\norders a search of the Diario de Manila printing press.",
    music: "suspense",
    unlock: ["Timeline_1896_08-19", "gil-1"]
  },

  {
    type: "dialogue",
    speaker: "FATHER MARIANO GIL",
    background: require("../../../../Background Images/Part 5/19th century hand press printing shop ransacked.png"),
    characters: [
      {
        name: "FATHER MARIANO GIL",
        source: require("../../../../Character Images/Chapter 5/Gil.png"),
        position: "center"
      }
    ],
    text: "Search the press! Find their names, their plans!\nAnything that reveals this secret society.",
    unlock: ["gil-2"]
  },

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 5/19th century hand press printing shop ransacked.png"),
    text: "Arrests spread through Manila. Bonifacio knows the authorities\nmay soon come for the rest of his men."
  },

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 5/Katipunan hideout 1896,.png"),
    text: "There is no time left for quiet planning. Bonifacio calls\nthe Katipunan leaders to an emergency meeting."
  },

  // T2_5 here

  // ===========================================
  // SCENE 2: THE EMERGENCY COUNCIL
  // ===========================================

  {
    type: "scene",
    title: "The Emergency Council",
    date: "August 1896",
    background: require("../../../../Background Images/Usuals/Brown Background.jpg"),
    // SFX: chairSit
    sfx: "chairSit"
  },

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 5/Katipunan hideout 1896,.png"),
    text: "The leaders face a hard choice. Their weapons are few,\nbut waiting could mean arrest."
  },

  {
    type: "dialogue",
    speaker: "TEODORO PLATA",
    background: require("../../../../Background Images/Part 5/Katipunan hideout 1896,.png"),
    characters: [
      {
        name: "TEODORO PLATA",
        source: require("../../../../Character Images/Chapter 5/Plata Talking.png"),
        position: "left"
      },
      {
        name: "ANDRÉS BONIFACIO",
        source: require("../../../../Character Images/Chapter 5/Bonifacio Unsure R.png"),
        position: "right"
      }
    ],
    text: "Andrés, we barely have enough muskets for one man in ten.\nIf we fight now, we may lose before we begin.",
    unlock: ["plata-2"]
  },

  {
    type: "dialogue",
    speaker: "ANDRÉS BONIFACIO",
    background: require("../../../../Background Images/Part 5/Katipunan hideout 1896,.png"),
    characters: [
      {
        name: "TEODORO PLATA",
        source: require("../../../../Character Images/Chapter 5/Plata Talking.png"),
        position: "left"
      },
      {
        name: "ANDRÉS BONIFACIO",
        source: require("../../../../Character Images/Chapter 4/Bonifacio Talking Mad R.png"),
        position: "right"
      }
    ],
    text: "And if we wait, Teodoro? They know our names!\nDo we let them arrest us one by one?"
  },

  // T4_5 here

  {
    type: "choice",
    title: "Choice 5.1: You are Andrés Bonifacio",
    background: require("../../../../Background Images/Part 5/Katipunan hideout 1896,.png"),
    question: "Plata warns that the Katipunan has too few weapons.\nWhat should Bonifacio do?",
    choices: [
      {
        text: "Call for the revolution to begin now.",
        speaker: "ANDRÉS BONIFACIO",
        characters: [
          {
            name: "TEODORO PLATA",
            source: require("../../../../Character Images/Chapter 5/Plata Neutral.png"),
            position: "left"
          },
          {
            name: "ANDRÉS BONIFACIO",
            source: require("../../../../Character Images/Chapter 4/Bonifacio Talking Mad R.png"),
            position: "right"
          }
        ],
        dialogue: "Hindi na tayo maghihintay. Ngayon na ang oras!",
        translation: "We won't wait any longer. Now is the time."
      },

      {
        text: "Seek more weapons before making a move.",
        speaker: "ANDRÉS BONIFACIO",
        characters: [
          {
            name: "TEODORO PLATA",
            source: require("../../../../Character Images/Chapter 5/Plata Neutral.png"),
            position: "left"
          },
          {
            name: "ANDRÉS BONIFACIO",
            source: require("../../../../Character Images/Chapter 5/Bonifacio Talking R.png"),
            position: "right"
          }
        ],
        dialogue: "Maghintay muna tayo ng ilang araw, hanggang\nsa mas marami tayong sandata.",
        translation: "Let's wait a few days, until we have more weapons."
      }
    ]
  },

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 5/Katipunan hideout 1896,.png"),
    text: "The Katipunan has little time left. Whatever they decide,\nthe struggle against Spanish rule is drawing near.",
    unlock: ["plata-3"]
  },

  // ===========================================
  // SCENE 3: THE HISTORIAN'S INTERLUDE
  // ===========================================

  {
    type: "scene",
    title: "The Historian's Interlude",
    date: "The Cry of the Revolution",
    background: require("../../../../Background Images/Part 5/Map of the eight provinces under martial law.png"),
    // SFX: singlePageFlip
    sfx: "singlePageFlip"
  },

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 5/Map of the eight provinces under martial law.png"),
    text: "Historians disagree about exactly when and where\nthe Cry of the Revolution took place."
  },

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 5/Map of the eight provinces under martial law.png"),
    text: "Teodoro Agoncillo places the event on August 23, 1896,\nat Pugad Lawin."
  },

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 5/Map of the eight provinces under martial law.png"),
    text: "General Artemio Ricarte also gives August 23,\nbut identifies Balintawak as the location."
  },

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 5/Map of the eight provinces under martial law.png"),
    text: "General Santiago Álvarez's account places the main event\non August 29, 1896."
  },

  {
    type: "scene",
    title: "The date and location remain debated.",
    date: "The decision to resist Spanish rule did not.",
    background: require("../../../../Background Images/Usuals/Black Background.jpg")
  },

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 5/Map of the eight provinces under martial law.png"),
    text: "Though accounts differ, the Cry became a lasting symbol\nof Filipinos choosing to fight for freedom."
  },

  // T1_5 here

  // ===========================================
  // SCENE 4: THE TEARING OF THE CÉDULAS
  // ===========================================

  {
    type: "scene",
    title: "The Tearing of the Cédulas",
    date: "August 23, 1896",
    background: require("../../../../Background Images/Usuals/Brown Background.jpg"),
    // SFX: footstepsGround
    sfx: "footstepsGround"
  },

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 5/Cry of Pugad Lawin.png"),
    text: "At Pugad Lawin, Bonifacio and about a thousand Katipuneros gather.\nEach holds a cédula, an identity paper under Spanish rule.",
    unlock: ["Timeline_1896_08-23", "melchora-3"]
  },

  {
    type: "dialogue",
    speaker: "ANDRÉS BONIFACIO",
    background: require("../../../../Background Images/Part 5/Cry of Pugad Lawin.png"),
    characters: [
      {
        name: "ANDRÉS BONIFACIO",
        source: require("../../../../Character Images/Chapter 5/Bonifacio Cedula.png"),
        position: "left"
      },
      {
        name: "TANDANG SORA",
        source: require("../../../../Character Images/Chapter 5/Tandang Sora Surprised.png"),
        position: "right"
      }
    ],
    text: "This paper says we belong to Spain.\nTonight, we say otherwise."
  },

  {
    type: "dialogue",
    speaker: "ANDRÉS BONIFACIO",
    background: require("../../../../Background Images/Part 5/Cry of Pugad Lawin.png"),
    characters: [
      {
        name: "ANDRÉS BONIFACIO",
        source: require("../../../../Character Images/Chapter 5/Bonifacio Cedula.png"),
        position: "center"
      },
      {
        name: "CHEERING CROWD",
        source: require("../../../../Character Images/Chapter 5/cheeringcrowd.png"),
        position: "left"
      },
      {
        name: "CHEERING CROWD",
        source: require("../../../../Character Images/Chapter 5/cheeringcrowd.png"),
        position: "right"
      }
    ],
    text: "Show me your cédulas!"
  },

  {
    type: "choice",
    title: "Choice 5.2: You are a Katipunan Soldier",
    background: require("../../../../Background Images/Part 5/Cry of Pugad Lawin.png"),
    question: "Tearing your cédula means openly rejecting\nSpanish rule.",
    choices: [
      {
        text: "Tear it without hesitation.",
        speaker: "KATIPUNAN SOLDIERS",
        characters: [
          {
            name: "ANDRÉS BONIFACIO",
            source: require("../../../../Character Images/Chapter 5/Bonifacio Cedula.png"),
            position: "center"
          },
          {
            name: "CHEERING CROWD",
            source: require("../../../../Character Images/Chapter 5/cheeringcrowd.png"),
            position: "left"
          },
          {
            name: "CHEERING CROWD",
            source: require("../../../../Character Images/Chapter 5/cheeringcrowd.png"),
            position: "right"
          }
        ],
        dialogue: "Mabuhay ang Pilipinas! Mabuhay ang Katipunan!",
        translation: "Long live the Philippines! Long live the Katipunan!"
      },

      {
        text: "Hesitate, then tear it with the others.",
        speaker: "KATIPUNAN SOLDIER",
        characters: [
          {
            name: "ANDRÉS BONIFACIO",
            source: require("../../../../Character Images/Chapter 5/Bonifacio Cedula.png"),
            position: "center"
          },
          {
            name: "CHEERING CROWD",
            source: require("../../../../Character Images/Chapter 5/cheeringcrowd.png"),
            position: "left"
          },
          {
            name: "CHEERING CROWD",
            source: require("../../../../Character Images/Chapter 5/cheeringcrowd.png"),
            position: "right"
          }
        ],
        dialogue: "Malaking hakbang ito... pero panahon na.",
        translation: "This is a big step... but it's time."
      }
    ]
  },

  // Q1_5 here

  {
    type: "cedula"
  },

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 5/Cry of Pugad Lawin.png"),
    text: "The cédulas tear. The crowd's decision is clear:\nthey reject Spanish rule and choose the path to independence.",
    // SFX: paperRip
    sfx: "paperRip"
  },

  // ===========================================
  // SCENE 5: THE FIRST BATTLE
  // ===========================================

  {
    type: "scene",
    title: "The First Battle: San Juan del Monte",
    date: "August 30, 1896",
    background: require("../../../../Background Images/Usuals/Brown Background.jpg"),
    // SFX: footstepsGround
    sfx: "footstepsGround"
  },

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 5/Battle of San Juan del Monte 1896.png"),
    text: "On August 30, revolutionaries attack the Spanish weapons depot\nat San Juan del Monte, hoping to seize guns and ammunition.",
    unlock: ["Timeline_1896_08-30"]
  },

  {
    type: "dialogue",
    speaker: "ANDRÉS BONIFACIO",
    background: require("../../../../Background Images/Part 5/Battle of San Juan del Monte 1896.png"),
    characters: [
      {
        name: "ANDRÉS BONIFACIO",
        source: require("../../../../Character Images/Chapter 5/Bonifacio Talking Mad.png"),
        position: "center"
      }
    ],
    text: "Kunin natin ang mga baril nila. Kung wala tayong sandata\nngayon, may sandata na tayo bukas.",
    translation: "Let's take their weapons. If we don't have arms today, we'll have them tomorrow."
  },

  {
    type: "choice",
    title: "Choice 5.3: You are Andrés Bonifacio",
    background: require("../../../../Background Images/Part 5/Battle of San Juan del Monte 1896.png"),
    question: "Your fighters are ready to attack the Spanish weapons depot.",
    choices: [
      {
        text: "Launch the assault immediately.",
        speaker: "ANDRÉS BONIFACIO",
        characters: [
          {
            name: "ANDRÉS BONIFACIO",
            source: require("../../../../Character Images/Chapter 5/Bonifacio Talking Mad.png"),
            position: "center"
          }
        ],
        dialogue: "Sugod! Kunin natin ang Polvorín!",
        translation: "Attack! Take the Polvorín!"
      },

      {
        text: "Wait for allies and surround the depot.",
        speaker: "ANDRÉS BONIFACIO",
        characters: [
          {
            name: "ANDRÉS BONIFACIO",
            source: require("../../../../Character Images/Chapter 5/Bonifacio Talking.png"),
            position: "center"
          }
        ],
        dialogue: "Hintayin muna natin sila. Palilibutan natin ang Polvorín.",
        translation: "Let's wait for them. We'll surround the Polvorín."
      }
    ]
  },

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 5/Battle of San Juan del Monte 1896.png"),
    text: "The attack fails. The revolutionaries suffer heavy losses\nand retreat, but the struggle has begun."
  },

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 5/Battle of San Juan del Monte 1896.png"),
    text: "The Katipunan also plans coordinated attacks on Manila,\nwith groups approaching from different directions.",
    unlock: ["Timeline_1896_08-29"]
  },

  {
    type: "dialogue",
    speaker: "ANDRÉS BONIFACIO",
    background: require("../../../../Background Images/Part 5/Battle of San Juan del Monte 1896.png"),
    characters: [
      {
        name: "ANDRÉS BONIFACIO",
        source: require("../../../../Character Images/Chapter 5/Bonifacio Talking.png"),
        position: "center"
      }
    ],
    text: "Tatlong direksyon. Kung sabay tayong kikilos,\nhindi nila kayang ipagtanggol ang lahat.",
    translation: "Three directions. If we move together, they cannot defend everything."
  },

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 5/Map of the eight provinces under martial law.png"),
    text: "On August 30, Governor-General Ramón Blanco places\neight provinces under a state of war.",
    unlock: ["Timeline_1896_08-29_30"]
  },

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 5/Map of the eight provinces under martial law.png"),
    text: "Spain now faces a rebellion that can no longer be hidden."
  },

  {
    type: "scene",
    title: "The Revolution has begun.",
    date: "But the first battles reveal how hard the fight will be.",
    background: require("../../../../Background Images/Usuals/Black Background.jpg")
  },

  // T3_5 here

  // ===========================================
  // QUIZ TIME
  // ===========================================

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
      "The Katipunan was exposed and its\nmembers began facing arrests",
      "Rizal returned from exile",
      "The Spanish army abandoned Manila"
    ],
    correctIndex: 1,
    unlock: ["remnant-part5-1"]
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
    correctIndex: 1,
    unlock: ["remnant-part5-2"]
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
    correctIndex: 2,
    unlock: ["remnant-part5-3"]
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
    correctIndex: 2,
    unlock: ["remnant-part5-4"]
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
    correctIndex: 1,
    unlock: ["remnant-part5-5"]
  },

  // ===========================================
  // CLOSING
  // ===========================================

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
