export const Chapter1_Part1 = [
  // ===========================================
  // PROLOGUE
  // ===========================================

  {
    type: "system",
    intro: true,
    text: "Long before Spain arrived, the islands were already home to many communities.",
    background: require("../../../../Background Images/Intro/Intro 2.png"),
    music: "somber"
  },
  {
    type: "system",
    intro: true,
    text: "People built homes, traded goods, and sailed between islands.",
    background: require("../../../../Background Images/Intro/Intro 3.png")
  },
  {
    type: "system",
    intro: true,
    text: "In 1565, Spanish ships arrived. A new chapter in Philippine history began.",
    background: require("../../../../Background Images/Intro/Intro 4.png")
  },

  // ===========================================
  // SCENE 1: CIBABAO, SAMAR
  // ===========================================

  {
    type: "scene",
    title: "Cibabao, Samar",
    date: "February 13, 1565",
    background: require("../../../../Background Images/Usuals/Black Background.jpg"),
    music: "traditional",
    sfx: "shipArrival"
  },

  // SFX: waves, ship creaking, sailors shouting

  {
    type: "narrator",
    text: "Five Spanish ships arrive in Samar. Miguel López de Legazpi leads the expedition.",
    background: require("../../../../Background Images/Intro/Intro 4.png"),
    unlock: ["Timeline_1565_02-13"]
  },
  {
    type: "narrator",
    text: "The ships approach the shore. The people watch, unsure what to expect.",
    background: require("../../../../Background Images/Part 1/Spanish Arrival.png")
  },
  {
    type: "dialogue",
    speaker: "MIGUEL LÓPEZ DE LEGAZPI",
    background: require("../../../../Background Images/Part 1/Spanish Shipdeck.png"),
    characters: [
      {
        name: "MIGUEL LÓPEZ DE LEGAZPI",
        source: require("../../../../Character Images/Chapter 1/Legazpi Neutral.png"),
        position: "right"
      }
    ],
    text: "Remember our orders. We must seek peace first."
  },
  {
    type: "dialogue",
    speaker: "FRANCISCO GOMEZ",
    background: require("../../../../Background Images/Part 1/Spanish Coast.png"),
    characters: [
      {
        name: "FRANCISCO GOMEZ",
        source: require("../../../../Character Images/Chapter 1/Gomez Talking.png"),
        position: "center"
      }
    ],
    text: "We come in peace! We offer you a sandugo as a pact of friendship."
  },

  // CHOICE 1.1

  {
    type: "choice",
    title: "Choice 1.1: You are a Chieftain of Samar",
    background: require("../../../../Background Images/Part 1/Spanish Coast.png"),
    question: "The strangers offer a sandugo, or blood compact. Will you trust them?",
    choices: [
      {
        text: "Turn them away for now.",
        speaker: "CHIEFTAIN",
        dialogue: "Hindi pa kami handa. Umalis muna kayo.",
        translation: "We are not ready. Please leave for now.",
        characters: [
          {
            name: "FRANCISCO GOMEZ",
            source: require("../../../../Character Images/Chapter 1/Gomez Unsure.png"),
            position: "left"
          },
          {
            name: "CHIEFTAIN",
            source: require("../../../../Character Images/Chapter 1/Chieftain.png"),
            position: "right"
          }
        ]
      },
      {
        text: "Listen, but stay cautious.",
        speaker: "CHIEFTAIN",
        dialogue: "Makikinig kami, pero hindi pa kami nagtitiwala sa inyo.",
        translation: "We will listen, but we do not trust you yet.",
        characters: [
          {
            name: "FRANCISCO GOMEZ",
            source: require("../../../../Character Images/Chapter 1/Gomez Unsure.png"),
            position: "left"
          },
          {
            name: "CHIEFTAIN",
            source: require("../../../../Character Images/Chapter 1/Chieftain.png"),
            position: "right"
          }
        ]
      }
    ],
    nextScene: 9
  },

  // CONTINUE

  {
    type: "narrator",
    text: "No settlement is established in Samar. Legazpi's fleet sails toward Leyte and Bohol.",
    background: require("../../../../Background Images/Part 1/Spanish Coast.png")
  },

  // ===========================================
  // SCENE 2: FORMAL CLAIMS & ISLAND HOPPING
  // ===========================================

  {
    type: "scene",
    title: "Formal Claims & Island Hopping",
    date: "February 15 – April 1565",
    background: require("../../../../Background Images/Usuals/Brown Background.jpg"),
    music: "traditional",
    sfx: "shipArrival"
  },

  // SFX: waves, footsteps on shore

  {
    type: "narrator",
    text: "In Leyte, Legazpi orders a cross to be planted. Spain claims the\nland in King Philip II's name.",
    background: require("../../../../Background Images/Part 1/Spanish Coast.png"),
    sfx: "sandThud"
  },
  {
    type: "dialogue",
    speaker: "MIGUEL LÓPEZ DE LEGAZPI",
    background: require("../../../../Background Images/Part 1/Spanish Coast.png"),
    characters: [
      {
        name: "MIGUEL LÓPEZ DE LEGAZPI",
        source: require("../../../../Character Images/Chapter 1/Legazpi Neutral.png"),
        position: "center"
      }
    ],
    text: "This cross marks our claim in the name of King Philip II!"
  },

  // SFX: waves, quiet gathering

  {
    type: "narrator",
    text: "In Bohol, Datu Sikatuna welcomes Legazpi. They agree to seal their\nfriendship with a sandugo.",
    background: require("../../../../Background Images/Part 1/Bohol Coast.png")
  },
  {
    type: "dialogue",
    speaker: "DATU SIKATUNA",
    background: require("../../../../Background Images/Part 1/Bohol Coast.png"),
    characters: [
      {
        name: "DATU SIKATUNA",
        source: require("../../../../Character Images/Chapter 1/Sikatuna Talk.png"),
        position: "left"
      },
      {
        name: "MIGUEL LÓPEZ DE LEGAZPI",
        source: require("../../../../Character Images/Chapter 1/Legazpi Neutral.png"),
        position: "right"
      }
    ],
    text: "Take this cup, Legazpi. Let our blood seal our friendship."
  },

  // SFX: cup being passed, quiet ambience

  {
    type: "dialogue",
    speaker: "DATU SIKATUNA",
    background: require("../../../../Background Images/Part 1/Bohol Coast.png"),
    characters: [
      {
        name: "DATU SIKATUNA",
        source: require("../../../../Character Images/Chapter 1/Sikatuna Solemn.png"),
        position: "left"
      },
      {
        name: "MIGUEL LÓPEZ DE LEGAZPI",
        source: require("../../../../Character Images/Chapter 1/Legazpi Neutral.png"),
        position: "right"
      }
    ],
    text: "Cebu lies to the west. But beware. Rajah Tupas will defend his shores."
  },

  // ===========================================
  // SCENE 3: THE ULTIMATUM IN CEBU
  // ===========================================

  {
    type: "scene",
    title: "The Ultimatum in Cebu",
    date: "April 27, 1565",
    background: require("../../../../Background Images/Usuals/Brown Background.jpg"),
    music: "somber",
    sfx: "shipArrival"
  },

  // SFX: waves, ship ropes, footsteps on shore

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 1/Cebu Village.png"),
    characters: [
      {
        name: "RAJAH TUPAS",
        source: require("../../../../Character Images/Chapter 1/Tupas Upset R.png"),
        position: "right"
      }
    ],
    text: "Legazpi reaches Cebu. Rajah Tupas stands ready with 2,000 warriors.",
    unlock: ["tupas-1"]
  },
  {
    type: "dialogue",
    speaker: "RAJAH TUPAS",
    background: require("../../../../Background Images/Part 1/Cebu Village.png"),
    characters: [
      {
        name: "MIGUEL LÓPEZ DE LEGAZPI",
        source: require("../../../../Character Images/Chapter 1/Legazpi Neutral R.png"),
        position: "left"
      },
      {
        name: "RAJAH TUPAS",
        source: require("../../../../Character Images/Chapter 1/Tupas Talking R.png"),
        position: "right"
      }
    ],
    text: "Sino kayo? Bakit kayo naparito? Hindi ako pumapayag sa inyong mga kondisyon!",
    translation: "Who are you? Why have you come? I reject your terms!"
  },
  {
    type: "dialogue",
    speaker: "MIGUEL LÓPEZ DE LEGAZPI",
    background: require("../../../../Background Images/Part 1/Cebu Village.png"),
    characters: [
      {
        name: "MIGUEL LÓPEZ DE LEGAZPI",
        source: require("../../../../Character Images/Chapter 1/Legazpi Neutral R.png"),
        position: "left"
      },
      {
        name: "RAJAH TUPAS",
        source: require("../../../../Character Images/Chapter 1/Tupas Mad R.png"),
        position: "right"
      }
    ],
    text: "I am Legazpi. We seek peace, not another conflict."
  },
  {
    type: "dialogue",
    speaker: "MIGUEL LÓPEZ DE LEGAZPI",
    background: require("../../../../Background Images/Part 1/Cebu Village.png"),
    characters: [
      {
        name: "MIGUEL LÓPEZ DE LEGAZPI",
        source: require("../../../../Character Images/Chapter 1/Legazpi Mad R.png"),
        position: "left"
      },
      {
        name: "RAJAH TUPAS",
        source: require("../../../../Character Images/Chapter 1/Tupas Upset R.png"),
        position: "right"
      }
    ],
    text: "You have three days to decide. My men need food and a place to stay."
  },

  // CHOICE 1.2

  {
    type: "choice",
    title: "Choice 1.2: You are Rajah Tupas of Cebu",
    question: "Three days have passed. How will you answer the Spanish?",
    background: require("../../../../Background Images/Part 1/Cebu Village.png"),
    choices: [
      {
        text: "Retreat to the mountains and prepare.",
        speaker: "RAJAH TUPAS",
        dialogue: "Umatras tayo sa kabundukan. Hindi natin basta ibibigay ang ating lupain.",
        translation: "Let us retreat to the mountains. We will not give up our land easily.",
        characters: [
          {
            name: "RAJAH TUPAS",
            source: require("../../../../Character Images/Chapter 1/Tupas Talking.png"),
            position: "center"
          }
        ]
      },
      {
        text: "Ask the Spanish for more time.",
        speaker: "RAJAH TUPAS",
        dialogue: "Kailangan pa namin ng panahon para mag-isip.",
        translation: "We need more time to think.",
        characters: [
          {
            name: "MIGUEL LÓPEZ DE LEGAZPI",
            source: require("../../../../Character Images/Chapter 1/Legazpi Mad R.png"),
            position: "left"
          },
          {
            name: "RAJAH TUPAS",
            source: require("../../../../Character Images/Chapter 1/Tupas Upset R.png"),
            position: "right"
          }
        ]
      }
    ],
    nextScene: 22
  },

  // CONTINUE

  // SFX: hurried footsteps, rustling leaves

  {
    type: "narrator",
    text: "Tupas and his people retreat to the hills.",
    background: require("../../../../Background Images/Part 1/Cebu hills Tupas's retreat.png"),
    unlock: ["tupas-2", "Timeline_1565_04-27"]
  },

  // SFX: hammering, sawing wood, workers calling out

  {
    type: "narrator",
    text: "The Spanish enter Cebu and begin building their settlement.",
    background: require("../../../../Background Images/Part 1/Construction.png"),
    sfx: "construction",
    unlock: ["Timeline_1565_05-08"]
  },

  // SFX: distant fire crackling, falling debris
  // Use only if the scene is intended to depict a burned settlement.

  {
    type: "dialogue",
    speaker: "MIGUEL LÓPEZ DE LEGAZPI",
    background: require("../../../../Background Images/Part 1/Cebu Burned.png"),
    characters: [
      {
        name: "MIGUEL LÓPEZ DE LEGAZPI",
        source: require("../../../../Character Images/Chapter 1/Legazpi Neutral.png"),
        position: "center"
      }
    ],
    text: "I wish it had not ended this way."
  },

  // SFX: hut ambience, footsteps approaching

  {
    type: "narrator",
    text: "In an abandoned hut, Juan de Camus discovers an image of the Santo Niño\nleft behind by Magellan's crew in 1521.",
    background: require("../../../../Background Images/Part 1/nipa hut interior santo nino discovery.png")
  },
  {
    type: "dialogue",
    speaker: "JUAN DE CAMUS",
    background: require("../../../../Background Images/Part 1/nipa hut interior santo nino discovery.png"),
    characters: [
      {
        name: "JUAN DE CAMUS",
        source: require("../../../../Character Images/Chapter 1/Camus Talking.png"),
        position: "left"
      },
      {
        name: "MIGUEL LÓPEZ DE LEGAZPI",
        source: require("../../../../Character Images/Chapter 1/Legazpi Neutral.png"),
        position: "right"
      }
    ],
    text: "Señor General! Look what I found!"
  },
  {
    type: "dialogue",
    speaker: "MIGUEL LÓPEZ DE LEGAZPI",
    background: require("../../../../Background Images/Part 1/nipa hut interior santo nino discovery.png"),
    characters: [
      {
        name: "JUAN DE CAMUS",
        source: require("../../../../Character Images/Chapter 1/Camus Happy.png"),
        position: "left"
      },
      {
        name: "MIGUEL LÓPEZ DE LEGAZPI",
        source: require("../../../../Character Images/Chapter 1/Legazpi Surprised.png"),
        position: "right"
      }
    ],
    text: "The Santo Niño... left here by Magellan's crew in 1521."
  },

  // MINIGAME

  {
    type: "santoNino"
  },
  {
    type: "narrator",
    text: "The discovery becomes an important moment for the Spanish settlement.",
    background: require("../../../../Background Images/Part 1/nipa hut interior santo nino discovery.png"),
    unlock: ["Timeline_1565_04-28"]
  },

  // SFX: ship creaking, waves, sailors preparing to depart

  {
    type: "narrator",
    text: "Eventually, food runs low. The Spanish move to Panay, where\nsupplies are easier to find.",
    background: require("../../../../Background Images/Part 1/Cebu Village.png"),
    unlock: ["Timeline_1565-1569", "Timeline_1565_11-27", "Timeline_1566_10-15", "Timeline_1569"]
  },
  {
    type: "narrator",
    text: "Then they hear of a wealthy settlement: Maynila.",
    background: require("../../../../Background Images/Part 1/Manila Shoreline.png")
  },
  {
    type: "dialogue",
    speaker: "MIGUEL LÓPEZ DE LEGAZPI",
    background: require("../../../../Background Images/Part 1/Spanish Shipdeck.png"),
    characters: [
      {
        name: "MARTÍN DE GOITI",
        source: require("../../../../Character Images/Chapter 1/Goiti Neutral.png"),
        position: "right"
      },
      {
        name: "MIGUEL LÓPEZ DE LEGAZPI",
        source: require("../../../../Character Images/Chapter 1/Legazpi Neutral R.png"),
        position: "center"
      },
      {
        name: "JUAN DE SALCEDO",
        source: require("../../../../Character Images/Chapter 1/Salcedo Neutral.png"),
        position: "left"
      }
    ],
    text: "Martín, take my grandson Juan. Sail north to Maynila.",
    unlock: ["goiti-1", "salcedo-1", "Timeline_1570_05-03"]
  },
  {
    type: "dialogue",
    speaker: "MIGUEL LÓPEZ DE LEGAZPI",
    background: require("../../../../Background Images/Part 1/Spanish Shipdeck.png"),
    characters: [
      {
        name: "MARTÍN DE GOITI",
        source: require("../../../../Character Images/Chapter 1/Goiti Salute.png"),
        position: "right"
      },
      {
        name: "MIGUEL LÓPEZ DE LEGAZPI",
        source: require("../../../../Character Images/Chapter 1/Legazpi Neutral R.png"),
        position: "center"
      },
      {
        name: "JUAN DE SALCEDO",
        source: require("../../../../Character Images/Chapter 1/Salcedo Neutral.png"),
        position: "left"
      }
    ],
    text: "Offer peace first. Avoid a fight if you can."
  },

  // ===========================================
  // SCENE 4: THE SANDUGO OF MANILA
  // ===========================================

  {
    type: "scene",
    title: "The Sandugo of Manila",
    date: "June 1571",
    background: require("../../../../Background Images/Usuals/Brown Background.jpg"),
    sfx: "footstepsSand",
    music: "traditional"
  },
  {
    type: "narrator",
    text: "In Manila, Rajah Sulayman and his uncle, Lakan Dula, face a\ndifficult choice: fight or negotiate.",
    background: require("../../../../Background Images/Part 1/Sulayman's council space.png"),
    unlock: ["goiti-2", "salcedo-2"]
  },
  {
    type: "dialogue",
    speaker: "LAKAN DULA",
    background: require("../../../../Background Images/Part 1/Sulayman's council space.png"),
    characters: [
      {
        name: "LAKAN DULA",
        source: require("../../../../Character Images/Chapter 1/Dula Neutral.png"),
        position: "left"
      },
      {
        name: "RAJAH SULAYMAN",
        source: require("../../../../Character Images/Chapter 1/Sulayman Neutral R.png"),
        position: "right"
      }
    ],
    text: "Aking pamangkin, malakas ang kanilang mga armas.",
    translation: "My nephew, their weapons are powerful."
  },
  {
    type: "dialogue",
    speaker: "LAKAN DULA",
    background: require("../../../../Background Images/Part 1/Sulayman's council space.png"),
    characters: [
      {
        name: "LAKAN DULA",
        source: require("../../../../Character Images/Chapter 1/Dula Unsure.png"),
        position: "left"
      },
      {
        name: "RAJAH SULAYMAN",
        source: require("../../../../Character Images/Chapter 1/Sulayman Neutral R.png"),
        position: "right"
      }
    ],
    text: "Kung lalaban tayo, baka mawala ang lahat. Makipag-usap muna tayo.",
    translation: "If we fight, we could lose everything. Let us talk first."
  },

  // CHOICE 1.3

  {
    type: "choice",
    title: "Choice 1.3: You are Rajah Sulayman",
    question: "Your uncle urges you to negotiate with Legazpi. Will you listen?",
    background: require("../../../../Background Images/Part 1/Sulayman's council space.png"),
    choices: [
      {
        text: "Agree to speak with Legazpi.",
        speaker: "RAJAH SULAYMAN",
        dialogue: "Sige, tito. Susubukan nating makipag-usap.",
        translation: "All right, uncle. Let us try to negotiate.",
        characters: [
          {
            name: "RAJAH SULAYMAN",
            source: require("../../../../Character Images/Chapter 1/Sulayman Talking R.png"),
            position: "right"
          },
          {
            name: "LAKAN DULA",
            source: require("../../../../Character Images/Chapter 1/Dula Neutral.png"),
            position: "left"
          }
        ]
      },
      {
        text: "Ask your uncle to explain first.",
        speaker: "RAJAH SULAYMAN",
        dialogue: "Hindi pa ako sigurado, tito. Ano ba ang plano mo?",
        translation: "I'm not sure yet, uncle. What is your plan?",
        characters: [
          {
            name: "RAJAH SULAYMAN",
            source: require("../../../../Character Images/Chapter 1/Sulayman Talking R.png"),
            position: "right"
          },
          {
            name: "LAKAN DULA",
            source: require("../../../../Character Images/Chapter 1/Dula Neutral.png"),
            position: "left"
          }
        ]
      }
    ],
    nextScene: 39
  },

  // ENDING

  {
    type: "narrator",
    text: "Sulayman agrees to speak with Legazpi.",
    background: require("../../../../Background Images/Part 1/Inside hut sandugo part.png")
  },
  {
    type: "narrator",
    text: "On June 24, 1571, Legazpi declares Manila the capital of Spanish rule in the Philippines.",
    background: require("../../../../Background Images/Part 1/Manila Shoreline.png"),
    unlock: ["Timeline_1571_06-24", "salcedo-3"]
  },

  // CLOSING

  {
    type: "system",
    intro: true,
    text: "You have witnessed the first meetings between Spanish forces and Filipino leaders.",
    background: require("../../../../Background Images/Usuals/Black Background.jpg")
  },
  {
    type: "system",
    intro: true,
    text: "Some chose peace. Others chose caution. Spain's rule was only beginning.",
    background: require("../../../../Background Images/Usuals/Black Background.jpg")
  },
  {
    type: "voyage",
    unlock: ["remnant-2"],
    music: "voyage"
  },

  // ===========================================
  // QUIZ TIME
  // ===========================================

  {
    type: "scene",
    title: "What do you remember?",
    date: "How well do you remember the journey?",
    background: require("../../../../Background Images/Usuals/Brown Background.jpg")
  },
  {
    type: "quiz",
    question: "Where did Legazpi and his fleet first anchor in February 1565?",
    options: [
      "Cebu",
      "Cibabao, Samar",
      "Bohol",
      "Manila"
    ],
    correctIndex: 1,
    music: "traditional",
    unlock: ["remnant-part1-1"]
  },
  {
    type: "quiz",
    question: "What did Legazpi plant on Leyte to claim the land for Spain?",
    options: [
      "A Spanish flag",
      "A wooden fort",
      "A cross",
      "A cannon"
    ],
    correctIndex: 2,
    unlock: ["remnant-part1-2"]
  },
  {
    type: "quiz",
    question: "Who welcomed Legazpi in Bohol and sealed their friendship with a sandugo?",
    options: [
      "Rajah Tupas",
      "Lakan Dula",
      "Rajah Sulayman",
      "Datu Sikatuna"
    ],
    correctIndex: 3,
    unlock: ["remnant-part1-3"]
  },
  {
    type: "quiz",
    question: "What did Juan de Camus discover inside a house in Cebu?",
    options: [
      "A Spanish sword",
      "The Santo Niño",
      "A gold crown",
      "A map of Manila"
    ],
    correctIndex: 1,
    unlock: ["remnant-part1-4"]
  },
  {
    type: "quiz",
    question: "Who urged Rajah Sulayman to negotiate with Legazpi?",
    options: [
      "Datu Sikatuna",
      "Rajah Tupas",
      "Lakan Dula",
      "Juan de Salcedo"
    ],
    correctIndex: 2,
    unlock: ["remnant-part1-5"]
  },
  {
    type: "quiz",
    question: "What did Legazpi declare Manila as on June 24, 1571?",
    options: [
      "A military outpost",
      "The capital of the colony",
      "An independent city-state",
      "A trade route hub"
    ],
    correctIndex: 1,
    unlock: ["remnant-part1-6"]
  }
];