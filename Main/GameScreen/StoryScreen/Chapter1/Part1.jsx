// MUSIC: put `music: "trackname"` (lowercase, no spaces) on any entry where the
// track should change. It keeps playing until another entry sets a different one.
// Only "traditional" and "somber" are used here. Add more tags once you have the files.

// NOTE: every `nextScene` is the index of the entry right AFTER its choice.
// If you add or remove entries above a choice, update that choice's nextScene.


export const Chapter1_Part1 = [

  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // PROLOGUE
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  // 0
  {
    type: "system",
    intro: true,
    text: "Long before Spain arrived, people already lived on these islands.",
    background: require("../../../../Background Images/Intro/Intro 2.png"),
    music: "somber"
  },

  // 1
  {
    type: "system",
    intro: true,
    text: "They built homes, sailed between islands, traded goods, and formed communities.",
    background: require("../../../../Background Images/Intro/Intro 3.png")
  },

  // 2
  {
    type: "system",
    intro: true,
    text: "Then, in 1565, Spanish ships arrived. What would happen next?",
    background: require("../../../../Background Images/Intro/Intro 4.png")
  },


  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // SCENE 1
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  // 3
  {
    type: "scene",
    title: "Cibabao, Samar",
    date: "February 13, 1565",
    background: require("../../../../Background Images/Usuals/Black Background.jpg"),
    music: "traditional",
    sfx: 'shipArrival'
  },

  // 4
  {
    type: "narrator",
    text: "Miguel López de Legazpi arrives in Samar with five Spanish ships.",
    background: require("../../../../Background Images/Intro/Intro 4.png"),
    unlock: ["Timeline_1565_02-13"]
  },

  // 5
  {
    type: "narrator",
    text: "The people watch from the shore. They do not know if the visitors can be trusted.",
    background: require("../../../../Background Images/Part 1/Spanish Arrival.png")
  },

  // 6
  {
    type: "dialogue",
    speaker: "MIGUEL LÓPEZ DE LEGAZPI",
    background: require("../../../../Background Images/Part 1/Spanish Shipdeck.png"),
    characters: [
      {
        source: require("../../../../Character Images/Chapter 1/Legazpi Neutral.png"),
        position: "right"
      }
    ],
    text: "We have finally arrived. Remember our orders. We speak with\nthe locals peacefully first."
  },

  // 7
  {
    type: "dialogue",
    speaker: "FRANCISCO GOMEZ",
    background: require("../../../../Background Images/Part 1/Spanish Coast.png"),
    characters: [
      {
        source: require("../../../../Character Images/Chapter 1/Gomez Talking.png"),
        position: "center"
      }
    ],
    text: "We come in peace! We'd like to offer a sandugo, a blood compact,\nas a sign of friendship."
  },


  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // CHOICE 1.1
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  // 8
  {
    type: "choice",
    title: "Choice 1.1: You are a Chieftain of Samar",
    background: require("../../../../Background Images/Part 1/Spanish Coast.png"),

    question: "A Spanish sailor has offered a blood compact.\nYour people are not sure whether to trust these strangers.",

    choices: [
      {
        text: "Turn him away for now.",
        speaker: "CHIEFTAIN",
        dialogue: "Hindi pa kami handa. Umalis muna kayo.",
        translation: "We are not ready yet. Please leave for now.",
        characters: [
          {
            source: require("../../../../Character Images/Chapter 1/Gomez Unsure.png"),
            position: "left"
          },
          {
            source: require("../../../../Character Images/Temporary Placeholders/Chieftain.png"),
            position: "right"
          }
        ]
      },

      {
        text: "Hear him out, but keep your guard up.",
        speaker: "CHIEFTAIN",
        dialogue: "Makikinig kami sa sasabihin mo, pero hindi pa rin kami muna nagtitiwala sa iyo.",
        translation: "We'll hear what you have to say, but we will not trust you yet.",
        characters: [
          {
            source: require("../../../../Character Images/Chapter 1/Gomez Unsure.png"),
            position: "left"
          },
          {
            source: require("../../../../Character Images/Chapter 1/Chieftain.png"),
            position: "right"
          }
        ]
      }
    ],

    nextScene: 9
  },

  // CONTINUE

  // 9
  {
    type: "narrator",
    text: "The people of Samar choose to be careful. No Spanish settlement is built there.\nLegazpi's fleet sails toward Leyte and Bohol.",
    background: require("../../../../Background Images/Part 1/Spanish Coast.png")
  },



  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // SCENE 2
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  // 10
  {
    type: "scene",
    title: "Formal Claims & Island Hopping",
    date: "February 15 – April 1565",
    background: require("../../../../Background Images/Usuals/Brown Background.jpg"),
    music: "traditional",
    sfx: 'shipArrival'
  },

  // 11
  {
    type: "narrator",
    text: "In Leyte, Legazpi claims the land for Spain by planting a cross.",
    background: require("../../../../Background Images/Part 1/Spanish Coast.png"),
    sfx: "sandThud"
  },

  // 12
  {
    type: "dialogue",
    speaker: "MIGUEL LÓPEZ DE LEGAZPI",
    background: require("../../../../Background Images/Part 1/Spanish Coast.png"),
    characters: [
      {
        source: require("../../../../Character Images/Chapter 1/Legazpi Neutral.png"),
        position: "center"
      }
    ],
    text: "Let this cross mark the start of our mission here, in the name of King Philip II."
  },

  // 13
  {
    type: "narrator",
    text: "In Bohol, Datu Sikatuna welcomes him. They make a sandugo, or blood compact,\nto show friendship.",
    background: require("../../../../Background Images/Part 1/Bohol Coast.png")
  },

  // 14
  {
    type: "dialogue",
    speaker: "DATU SIKATUNA",
    background: require("../../../../Background Images/Part 1/Bohol Coast.png"),
    characters: [
      {
        source: require("../../../../Character Images/Chapter 1/Sikatuna Talk.png"),
        position: "left"
      },
      {
        source: require("../../../../Character Images/Chapter 1/Legazpi Neutral.png"),
        position: "right"
      }
    ],
    text: "Legazpi, take this cup. From this moment, our blood is one."
  },

  // 15
  {
    type: "dialogue",
    speaker: "DATU SIKATUNA",
    background: require("../../../../Background Images/Part 1/Bohol Coast.png"),
    characters: [
      {
        source: require("../../../../Character Images/Chapter 1/Sikatuna Solemn.png"),
        position: "left"
      },
      {
        source: require("../../../../Character Images/Chapter 1/Legazpi Neutral.png"),
        position: "right"
      }
    ],
    text: "If you're looking for Cebu, sail west. But be careful. Rajah Tupas is proud.\nHe guards his shores fiercely."
  },


  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // SCENE 3
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  // 16
  {
    type: "scene",
    title: "The Ultimatum in Cebu",
    date: "April 27, 1565",
    background: require("../../../../Background Images/Usuals/Brown Background.jpg"),
    music: "somber",
    sfx: 'shipArrival'
  },

  // 17
  {
    type: "narrator",
    background: require("../../../../Background Images/Part 1/Cebu Village.png"),
    characters: [
      {
        source: require("../../../../Character Images/Chapter 1/Tupas Upset R.png"),
        position: "right"
      },
    ],
    text: "At last, Legazpi reaches Cebu. Rajah Tupas and his two thousand warriors\nare ready to defend their home.",
    unlock: ["tupas-1"]
  },

  // 18
  {
    type: "dialogue",
    speaker: "RAJAH TUPAS",
    background: require("../../../../Background Images/Part 1/Cebu Village.png"),
    characters: [
      {
        source: require("../../../../Character Images/Chapter 1/Legazpi Neutral R.png"),
        position: "left"
      },
      {
        source: require("../../../../Character Images/Chapter 1/Tupas Talking R.png"),
        position: "right"
      }
    ],
    text: "Sino kayo at bakit kayo naparito sa aming isla? Hindi ako pumapayag\nsa inyong pakikipag-usap!",
    translation: "Who are you, and why are you here on our island? I do not agree to your terms!"
  },

  // 19
  {
    type: "dialogue",
    speaker: "MIGUEL LÓPEZ DE LEGAZPI",
    background: require("../../../../Background Images/Part 1/Cebu Village.png"),
    characters: [
      {
        source: require("../../../../Character Images/Chapter 1/Legazpi Neutral R.png"),
        position: "left"
      },
      {
        source: require("../../../../Character Images/Chapter 1/Tupas Mad R.png"),
        position: "right"
      }
    ],
    text: "Rajah Tupas, I am Miguel López de Legazpi. We come in peace and\ndo not wish to repeat old conflicts."
  },

  // 20
  {
    type: "dialogue",
    speaker: "MIGUEL LÓPEZ DE LEGAZPI",
    background: require("../../../../Background Images/Part 1/Cebu Village.png"),
    characters: [
      {
        source: require("../../../../Character Images/Chapter 1/Legazpi Mad R.png"),
        position: "left"
      },
      {
        source: require("../../../../Character Images/Chapter 1/Tupas Upset R.png"),
        position: "right"
      }
    ],
    text: "I offer you three days to consider a peace agreement with me. My men\nare hungry. I hope we can share this port peacefully."
  },


  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // CHOICE 1.2
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  // 21
  {
    type: "choice",
    title: "Choice 1.2: You are Rajah Tupas of Cebu",
    question: "The three-day deadline is almost up.\nSpanish messengers return to ask for peace.",
    background: require("../../../../Background Images/Part 1/Cebu Village.png"),

    choices: [
      {
        text: "Refuse, and retreat to the\nmountains to prepare for battle.",
        speaker: "RAJAH TUPAS",
        dialogue: "Umatras muna tayo sa kabundukan at maghanda. Hindi natin\nbasta-basta ibibigay ang ating lupain.",
        translation: "Let's retreat to the mountains and prepare. We we will not just give up our land.",
        characters: [
          {
            source: require("../../../../Character Images/Chapter 1/Tupas Talking.png"),
            position: "center"
          }
        ]
      },

      {
        text: "Send a messenger to ask for\nmore time first.",
        speaker: "RAJAH TUPAS",
        dialogue: "Sabihin mo sa kanila na kailangan pa natin ng panahon.",
        translation: "Tell them we need more time.",
        characters: [
          {
            source: require("../../../../Character Images/Chapter 1/Tupas Talking.png"),
            position: "center"
          }
        ]
      }
    ],

    nextScene: 22
  },

  // CONTINUE

  // 22  (revised line split in two so both backgrounds still show)
  {
    type: "narrator",
    text: "Tupas and his people retreat to the hills.",
    background: require("../../../../Background Images/Part 1/Cebu hills Tupas's retreat.png"),
    unlock: ["tupas-2", "Timeline_1565_04-27"]
  },

  // 23
  {
    type: "narrator",
    text: "The Spanish enter Cebu and begin building a settlement.",
    background: require("../../../../Background Images/Part 1/Construction.png"),
    sfx: 'construction',
    unlock: ["Timeline_1565_05-08"]
  },

  //Q2_1 here

  // 24
  {
    type: "narrator",
    text: "Juan de Camus finds an image of the Santo Niño, left behind by Magellan's crew in 1521.",
    background: require("../../../../Background Images/Part 1/nipa hut interior santo nino discovery.png")
  },

  // 25
  {
    type: "dialogue",
    speaker: "JUAN DE CAMUS",
    background: require("../../../../Background Images/Part 1/nipa hut interior santo nino discovery.png"),
    characters: [
      {
        source: require("../../../../Character Images/Chapter 1/Camus Talking.png"),
        position: "left"
      },
      {
        source: require("../../../../Character Images/Chapter 1/Legazpi Neutral.png"),
        position: "right"
      }
    ],
    text: "Señor General! Look what I found!"
  },

  // 26
  {
    type: "dialogue",
    speaker: "MIGUEL LÓPEZ DE LEGAZPI",
    background: require("../../../../Background Images/Part 1/nipa hut interior santo nino discovery.png"),
    characters: [
      {
        source: require("../../../../Character Images/Chapter 1/Camus Happy.png"),
        position: "left"
      },
      {
        source: require("../../../../Character Images/Chapter 1/Legazpi Surprised.png"),
        position: "right"
      }
    ],
    text: "The Santo Niño... left behind by Magellan's crew, forty-four years ago."
  },

  //T1_1 here

  // 27  (MINIGAME)
  {
    type: "santoNino"
  },

  // 28
  {
    type: "narrator",
    text: "The discovery becomes an important moment for the new Spanish settlement.",
    background: require("../../../../Background Images/Part 1/nipa hut interior santo nino discovery.png"),
    unlock: ["Timeline_1565_04-28"]
  },

  // 29
  {
    type: "narrator",
    text: "Food soon becomes scarce. The Spanish move their settlement to Panay,\nwhere food is easier to find.",
    background: require("../../../../Background Images/Part 1/Cebu Village.png"),
    unlock: ["Timeline_1565-1569", "Timeline_1565_11-27", "Timeline_1566_10-15", "Timeline_1569"]
  },

  // 30
  {
    type: "narrator",
    text: "Later, they hear about a wealthy settlement called Maynila.",
    background: require("../../../../Background Images/Part 1/Manila Shoreline.png")
  },

  // 31
  {
    type: "dialogue",
    speaker: "MIGUEL LÓPEZ DE LEGAZPI",
    background: require("../../../../Background Images/Part 1/Spanish Shipdeck.png"),
    characters: [
      {
        source: require("../../../../Character Images/Chapter 1/Goiti Neutral.png"),
        position: "right"
      },
      {
        source: require("../../../../Character Images/Chapter 1/Legazpi Neutral R.png"),
        position: "center"
      },
      {
        source: require("../../../../Character Images/Chapter 1/Salcedo Neutral.png"),
        position: "left"
      }
    ],
    text: "Martín, I want you and my grandson, Juan de Salcedo.\nI want you to sail north together.",
    unlock: ["goiti-1", "salcedo-1", "Timeline_1570_05-03"]
  },

  // 32
  {
    type: "dialogue",
    speaker: "MIGUEL LÓPEZ DE LEGAZPI",
    background: require("../../../../Background Images/Part 1/Spanish Shipdeck.png"),
    characters: [
      {
        source: require("../../../../Character Images/Chapter 1/Goiti Salute.png"),
        position: "right"
      },
      {
        source: require("../../../../Character Images/Chapter 1/Legazpi Neutral R.png"),
        position: "center"
      },
      {
        source: require("../../../../Character Images/Chapter 1/Salcedo Neutral.png"),
        position: "left"
      }
    ],
    text: "Offer peace and friendship first. If we can avoid a fight, we will."
  },



  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // SCENE 4
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  // 33
  {
    type: "scene",
    title: "The Sandugo of Manila",
    date: "June 1571",
    background: require("../../../../Background Images/Usuals/Brown Background.jpg"),
    sfx: 'footstepsSand',
    music: "traditional"
  },

  // 34
  {
    type: "narrator",
    text: "In Manila, Rajah Sulayman and Lakan Dula face a difficult choice.\nShould they fight the Spanish or try to make peace?",
    background: require("../../../../Background Images/Part 1/Sulayman's council space.png"),
    unlock: ["goiti-2", "salcedo-2"]
  },

  // 35
  {
    type: "dialogue",
    speaker: "LAKAN DULA",
    background: require("../../../../Background Images/Part 1/Sulayman's council space.png"),
    characters: [
      {
        source: require("../../../../Character Images/Chapter 1/Dula Neutral.png"),
        position: "left"
      },
      {
        source: require("../../../../Character Images/Chapter 1/Sulayman Neutral R.png"),
        position: "right"
      }
    ],
    text: "Aking pamangkin, tingnan mo ang kanilang mga barko at armas.",
    translation: "My dear nephew, look at their boat and guns."
  },

  // 36
  {
    type: "dialogue",
    speaker: "LAKAN DULA",
    background: require("../../../../Background Images/Part 1/Sulayman's council space.png"),
    characters: [
      {
        source: require("../../../../Character Images/Chapter 1/Dula Unsure.png"),
        position: "left"
      },
      {
        source: require("../../../../Character Images/Chapter 1/Sulayman Neutral R.png"),
        position: "right"
      }
    ],
    text: "Kung lalabanan natin sila nang tuwiran, mawawala ang lahat sa atin.\nMakipag-usap muna tayo.",
    translation: "My nephew, look at their ships and weapons. If we fight them head-on, we could lose everything. Let's talk first."
  },


  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // CHOICE 1.3
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  // 37
  {
    type: "choice",
    title: "Choice 1.3: You are Rajah Sulayman",
    question: "Legazpi has arrived with a large force. Your uncle is urging you to negotiate.",
    background: require("../../../../Background Images/Part 1/Sulayman's council space.png"),

    choices: [
      {
        text: "Agree right away and go\nspeak with Legazpi.",
        speaker: "RAJAH SULAYMAN",
        dialogue: "Sige, tito. Susubukan nating makipag-usap.",
        translation: "Alright, uncle. Let's try talking.",
        characters: [
          {
            source: require("../../../../Character Images/Chapter 1/Sulayman Talking R.png"),
            position: "right"
          },
          {
            source: require("../../../../Character Images/Chapter 1/Dula Neutral.png"),
            position: "left"
          }
        ]
      },

      {
        text: "Hesitate, but let your uncle\nexplain his plan.",
        speaker: "RAJAH SULAYMAN",
        dialogue: "Hindi ako sigurado, tito... pero makikinig muna ako.\nAno ba ang plano mo?",
        translation: "I'm not sure, uncle... but I'll hear you out. What's your plan?",
        characters: [
          {
            source: require("../../../../Character Images/Chapter 1/Sulayman Talking R.png"),
            position: "right"
          },
          {
            source: require("../../../../Character Images/Chapter 1/Dula Neutral.png"),
            position: "left"
          }
        ]
      }
    ],

    nextScene: 38
  },



  // END OF STORY

  // 38  (revised line split in two so both backgrounds still show)
  {
    type: "narrator",
    text: "Sulayman agrees to talk with Legazpi.",
    background: require("../../../../Background Images/Part 1/Inside hut sandugo part.png")
  },

  // 39
  {
    type: "narrator",
    text: "On June 24, 1571, Legazpi declares Manila the capital of Spanish rule\nin the Philippines.",
    background: require("../../../../Background Images/Part 1/Manila Shoreline.png"),
    unlock: ["Timeline_1571_06-24", "salcedo-3"]
  },


  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // CLOSING (one short ending instead of the old title cards)
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  // 40
  {
    type: "system",
    intro: true,
    text: "You have seen the first meetings between Spanish visitors and Filipino leaders.",
    background: require("../../../../Background Images/Usuals/Black Background.jpg")
  },

  // 41
  {
    type: "system",
    intro: true,
    text: "Some chose peace. Others chose caution. But Spain's rule was only beginning.",
    background: require("../../../../Background Images/Usuals/Black Background.jpg")
  },

  // 42  (MINIGAME: the voyage minigame has its own title + instructions screen now)
  {
    type: "voyage",
    unlock: ["remnant-2"],
    music: "voyage"
  },


  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // QUIZ TIME
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  // 43
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
    question: "What did Legazpi plant on Leyte to formally claim the territory for Spain?",
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
    question: "What important object did Juan de Camus discover inside a house in Cebu?",
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
    question: "Who urged Rajah Sulayman to negotiate with Legazpi when\nthe Spanish arrived in Manila?",
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
  },

];