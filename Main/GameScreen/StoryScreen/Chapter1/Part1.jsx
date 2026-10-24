export const Chapter1_Part1 = [

  {
    type: "system",
    intro: true,
    text: "Long before Spain arrived, people already lived on these islands.",
    background: require("../../../../Background Images/Intro/Intro 2.png")
  },

  {
    type: "system",
    intro: true,
    text: "They built homes, sailed between islands, traded goods, and formed communities.",
    background: require("../../../../Background Images/Intro/Intro 3.png")
  },

  {
    type: "system",
    intro: true,
    text: "Then, in 1565, Spanish ships arrived. What would happen next?",
    background: require("../../../../Background Images/Intro/Intro 4.png")
  },

  {
    type: "scene",
    title: "Cibabao, Samar",
    date: "February 13, 1565",
    background: require("../../../../Background Images/Usuals/Black Background.jpg")
  },

  {
    type: "narrator",
    text: "Miguel López de Legazpi arrives in Samar with five Spanish ships.",
    background: require("../../../../Background Images/Part 1/Spanish Arrival.png")
  },

  {
    type: "narrator",
    text: "The people watch from the shore. They do not\nknow if the visitors can be trusted.",
    background: require("../../../../Background Images/Part 1/Spanish Coast.png")
  },

  {
    type: "dialogue",
    speaker: "MIGUEL LÓPEZ DE LEGAZPI",
    background: require("../../../../Background Images/Part 1/Spanish Shipdeck.png"),
    characters: [
      {
        source: require("../../../../Character Images/Temporary Placeholders/Legazpi.png"),
        position: "center"
      }
    ],
    text: "We have finally arrived. Remember our orders. We speak with\nthe locals peacefully first."
  },

  {
    type: "dialogue",
    speaker: "FRANCISCO GOMEZ",
    background: require("../../../../Background Images/Part 1/Spanish Coast.png"),
    characters: [
      {
        source: require("../../../../Character Images/Temporary Placeholders/Gomez.png"),
        position: "left"
      }
    ],
    text: "We come in peace! We'd like to offer a sandugo, a blood compact,\nas a sign of friendship."
  },

  {
    type: "choice",
    title: "Choice 1.1: You are a Chieftain of Samar",
    question: "A Spanish sailor has offered a blood compact.\nYour people are not sure whether to trust these strangers.",
    background: require("../../../../Background Images/Part 1/Spanish Coast.png"),
    choices: [
      {
        text: "Turn him away for now.",
        speaker: "CHIEFTAIN",
        dialogue: "Hindi pa kami handa. Umalis muna kayo.",
        translation: "We are not ready yet. Please leave for now.",
        characters: [
          {
            source: require("../../../../Character Images/Temporary Placeholders/Chieftan.png"),
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
            source: require("../../../../Character Images/Temporary Placeholders/Chieftan.png"),
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
    text: "The people of Samar choose to be careful. No Spanish settlement is\nbuilt there. Legazpi's fleet sails toward Leyte and Bohol.",
    background: require("../../../../Background Images/Part 1/Spanish Coast.png")
  },

  {
    type: "scene",
    title: "Formal Claims & Island Hopping",
    date: "February 15 – April 1565",
    background: require("../../../../Background Images/Usuals/Brown Background.jpg")
  },

  {
    type: "narrator",
    text: "In Leyte, Legazpi claims the land for Spain by planting a cross.",
    background: require("../../../../Background Images/Part 1/Spanish Coast.png")
  },

  //Q3_1 here

  {
    type: "narrator",
    text: "In Bohol, Datu Sikatuna welcomes him. They make a\nsandugo, or blood compact, to show friendship.",
    background: require("../../../../Background Images/Part 1/Bohol Coast.png")
  },

  {
    type: "dialogue",
    speaker: "MIGUEL LÓPEZ DE LEGAZPI",
    background: require("../../../../Background Images/Part 1/Spanish Coast.png"),
    characters: [
      {
        source: require("../../../../Character Images/Temporary Placeholders/Legazpi.png"),
        position: "right"
      }
    ],
    text: "Let this cross mark the start of our mission\nhere, in the name of King Philip II."
  },

  {
    type: "dialogue",
    speaker: "DATU SIKATUNA",
    background: require("../../../../Background Images/Part 1/Bohol Coast.png"),
    characters: [
      {
        source: require("../../../../Character Images/Temporary Placeholders/Sikatuna.png"),
        position: "right"
      },
      {
        source: require("../../../../Character Images/Temporary Placeholders/Legazpi.png"),
        position: "left"
      }
    ],
    text: "Legazpi, take this cup. From this moment, our blood is one."
  },

  {
    type: "dialogue",
    speaker: "DATU SIKATUNA",
    background: require("../../../../Background Images/Part 1/Bohol Coast.png"),
    characters: [
      {
        source: require("../../../../Character Images/Temporary Placeholders/Sikatuna.png"),
        position: "right"
      },
      {
        source: require("../../../../Character Images/Temporary Placeholders/Legazpi.png"),
        position: "left"
      }
    ],
    text: "If you're looking for Cebu, sail west. But be careful. Rajah Tupas is proud.\nHe guards his shores fiercely."
  },

  {
    type: "scene",
    title: "The Ultimatum in Cebu",
    date: "April 27, 1565",
    background: require("../../../../Background Images/Usuals/Brown Background.jpg")
  },

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 1/Cebu Village.png"),
    characters: [
      {
        source: require("../../../../Character Images/Temporary Placeholders/Tupas.png"),
        position: "left"
      }
    ],
    text: "At last, Legazpi reaches Cebu. Rajah Tupas and his two\nthousand warriors are ready to defend their home."
  },

  {
    type: "dialogue",
    speaker: "RAJAH TUPAS",
    background: require("../../../../Background Images/Part 1/Cebu Village.png"),
    characters: [
      {
        source: require("../../../../Character Images/Temporary Placeholders/Legazpi.png"),
        position: "left"
      },
      {
        source: require("../../../../Character Images/Temporary Placeholders/Tupas.png"),
        position: "right"
      }
    ],
    text: "Sino kayo at bakit kayo naparito sa aming isla? Hindi ako pumapayag\nsa inyong pakikipag-usap!",
    translation: "Who are you, and why are you here on our island? I do not agree to your terms!"
  },

  {
    type: "dialogue",
    speaker: "MIGUEL LÓPEZ DE LEGAZPI",
    background: require("../../../../Background Images/Part 1/Cebu Village.png"),
    characters: [
      {
        source: require("../../../../Character Images/Temporary Placeholders/Legazpi.png"),
        position: "left"
      },
      {
        source: require("../../../../Character Images/Temporary Placeholders/Tupas.png"),
        position: "right"
      }
    ],
    text: "Rajah Tupas, I am Miguel López de Legazpi. We come in peace and\ndo not wish to repeat old conflicts."
  },

  {
    type: "dialogue",
    speaker: "MIGUEL LÓPEZ DE LEGAZPI",
    background: require("../../../../Background Images/Part 1/Cebu Village.png"),
    characters: [
      {
        source: require("../../../../Character Images/Temporary Placeholders/Legazpi.png"),
        position: "left"
      },
      {
        source: require("../../../../Character Images/Temporary Placeholders/Tupas.png"),
        position: "right"
      }
    ],
    text: "I offer you three days to consider a peace agreement with me. My men\nare hungry. I hope we can share this port peacefully."
  },

  {
    type: "choice",
    title: "Choice 1.2: You are Rajah Tupas of Cebu",
    question: "The three-day deadline is almost up.\nSpanish messengers return to ask for peace.",
    background: require("../../../../Background Images/Part 1/Cebu Village.png"),
    choices: [
      {
        text: "Refuse, and retreat to the mountains to prepare for battle.",
        speaker: "RAJAH TUPAS",
        dialogue: "Umatras muna tayo sa kabundukan at maghanda. Hindi\nnatin basta-basta ibibigay ang ating lupain.",
        translation: "Let's retreat to the mountains and prepare. We we will not just give up our land.",
        characters: [
          {
            source: require("../../../../Character Images/Temporary Placeholders/Tupas.png"),
            position: "left"
          }
        ]
      },

      {
        text: "Send a messenger to ask for more time first.",
        speaker: "RAJAH TUPAS",
        dialogue: "Sabihin mo sa kanila na kailangan pa natin ng panahon.",
        translation: "Tell them we need more time.",
        characters: [
          {
            source: require("../../../../Character Images/Temporary Placeholders/Tupas.png"),
            position: "left"
          }
        ]
      }
    ],
    nextScene: 22
  },

  // CONTINUE

  {
    type: "narrator",
    text: "Tupas and his people retreat to the hills. The Spanish\nenter Cebu and begin building a settlement.",
    background: require("../../../../Background Images/Part 1/Cebu hills Tupas's retreat.png")
  },

  //Q2_1 here

  {
    type: "narrator",
    text: "Juan de Camus finds an image of the Santo Niño,\nleft behind by Magellan's crew in 1521.",
    background: require("../../../../Background Images/Part 1/nipa hut interior santo nino discovery.png")
  },

  {
    type: "dialogue",
    speaker: "JUAN DE CAMUS",
    background: require("../../../../Background Images/Part 1/nipa hut interior santo nino discovery.png"),
    characters: [
      {
        source: require("../../../../Character Images/Temporary Placeholders/Camus.png"),
        position: "left"
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
        source: require("../../../../Character Images/Temporary Placeholders/Camus.png"),
        position: "left"
      },
      {
        source: require("../../../../Character Images/Temporary Placeholders/Legazpi.png"),
        position: "right"
      }
    ],
    text: "The Santo Niño... left behind by Magellan's crew, forty-four years ago."
  },

  //T1_1 here

  {
    type: "santoNino"
  },

  {
    type: "narrator",
    text: "The discovery becomes an important moment for the new Spanish settlement.",
    background: require("../../../../Background Images/Part 1/nipa hut interior santo nino discovery.png")
  },

  {
    type: "narrator",
    text: "Food soon becomes scarce. The Spanish move their\nsettlement to Panay, where food is easier to find.",
    background: require("../../../../Background Images/Part 1/Bohol Coast.png")
  },

  {
    type: "narrator",
    text: "Later, they hear about a wealthy settlement called Maynila.",
    background: require("../../../../Background Images/Part 1/Manila Shoreline.png")
  },

  {
    type: "dialogue",
    speaker: "MIGUEL LÓPEZ DE LEGAZPI",
    background: require("../../../../Background Images/Part 1/Spanish Shipdeck.png"),
    characters: [
      {
        source: require("../../../../Character Images/Temporary Placeholders/Goiti.png"),
        position: "left"
      },
      {
        source: require("../../../../Character Images/Temporary Placeholders/Legazpi.png"),
        position: "center"
      },
      {
        source: require("../../../../Character Images/Temporary Placeholders/Salcedo.png"),
        position: "right"
      }
    ],
    text: "Martín, I want you and my grandson, Juan de Salcedo.\nI want you to sail north together."
  },

  {
    type: "dialogue",
    speaker: "MIGUEL LÓPEZ DE LEGAZPI",
    background: require("../../../../Background Images/Part 1/Spanish Shipdeck.png"),
    characters: [
      {
        source: require("../../../../Character Images/Temporary Placeholders/Goiti.png"),
        position: "left"
      },
      {
        source: require("../../../../Character Images/Temporary Placeholders/Legazpi.png"),
        position: "center"
      },
      {
        source: require("../../../../Character Images/Temporary Placeholders/Salcedo.png"),
        position: "right"
      }
    ],
    text: "Offer peace and friendship first. If we can avoid a fight, we will."
  },

  {
    type: "scene",
    title: "The Sandugo of Manila",
    date: "June 1571",
    background: require("../../../../Background Images/Usuals/Brown Background.jpg")
  },

  {
    type: "narrator",
    text: "In Manila, Rajah Sulayman and Lakan Dula face a difficult choice.\nShould they fight the Spanish or try to make peace?",
    background: require("../../../../Background Images/Part 1/Sulayman's council space.png")
  },

  {
    type: "dialogue",
    speaker: "LAKAN DULA",
    background: require("../../../../Background Images/Part 1/Sulayman's council space.png"),
    characters: [
      {
        source: require("../../../../Character Images/Temporary Placeholders/Dula.png"),
        position: "left"
      },
      {
        source: require("../../../../Character Images/Temporary Placeholders/Sulayman.png"),
        position: "right"
      }
    ],
    text: "Aking pamangkin, tingnan mo ang kanilang mga barko at armas.",
    translation: "My dear nephew, look at their boat and guns."
  },

  {
    type: "dialogue",
    speaker: "LAKAN DULA",
    background: require("../../../../Background Images/Part 1/Sulayman's council space.png"),
    characters: [
      {
        source: require("../../../../Character Images/Temporary Placeholders/Dula.png"),
        position: "left"
      },
      {
        source: require("../../../../Character Images/Temporary Placeholders/Sulayman.png"),
        position: "right"
      }
    ],
    text: "Kung lalabanan natin sila nang tuwiran, mawawala ang lahat sa atin.\nMakipag-usap muna tayo.",
    translation: "My nephew, look at their ships and weapons. If we fight them head-on, we could lose everything. Let's talk first."
  },

  {
    type: "choice",
    title: "Choice 1.3: You are Rajah Sulayman",
    question: "Legazpi has arrived with a large force. Your uncle is urging you to negotiate.",
    background: require("../../../../Background Images/Part 1/Sulayman's council space.png"),
    choices: [
      {
        text: "Agree right away and go speak with Legazpi.",
        speaker: "RAJAH SULAYMAN",
        dialogue: "Sige, tito. Susubukan nating makipag-usap.",
        translation: "Alright, uncle. Let's try talking.",
        characters: [
          {
            source: require("../../../../Character Images/Temporary Placeholders/Sulayman.png"),
            position: "right"
          }
        ]
      },

      {
        text: "Hesitate, but let your uncle explain his plan.",
        speaker: "RAJAH SULAYMAN",
        dialogue: "Hindi ako sigurado, tito... pero makikinig muna ako.\nAno ba ang plano mo?",
        translation: "I'm not sure, uncle... but I'll hear you out. What's your plan?",
        characters: [
          {
            source: require("../../../../Character Images/Temporary Placeholders/Sulayman.png"),
            position: "right"
          }
        ]
      }
    ],
    nextScene: 37
  },

  // END OF STORY

  {
    type: "narrator",
    text: "Sulayman agrees to talk with Legazpi. On June 24, 1571, Legazpi\ndeclares Manila the capital of Spanish rule in the Philippines.",
    background: require("../../../../Background Images/Part 1/Inside hut sandugo part.png")
  },

  {
    type: "system",
    intro: true,
    text: "You have seen the first meetings between Spanish visitors and Filipino leaders.",
    background: require("../../../../Background Images/Usuals/Black Background.jpg")
  },

  {
    type: "system",
    intro: true,
    text: "Some chose peace. Others chose caution. But Spain's rule was only beginning.",
    background: require("../../../../Background Images/Usuals/Black Background.jpg")
  },

  {
    type: "scene",
    title: "The Voyage Continues.",
    date: "Guide the fleet safely through the waters.",
    background: require("../../../../Background Images/Usuals/Brown Background.jpg")
  },

  {
    type: "voyage"
  },

  {
    type: "scene",
    title: "Test Your Knowledge!",
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
    correctIndex: 1
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
    correctIndex: 2
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
    correctIndex: 3
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
    correctIndex: 1
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
    correctIndex: 2
  },

  {
    type: "scene",
    title: "Chapter Complete.",
    date: "You survived the first encounters.\nBut the story doesn't end here...",
    background: require("../../../../Background Images/Usuals/Black Background.jpg")
  },

  {
    type: "scene",
    title: "There are still centuries of history waiting to unfold.",
    date: " ",
    background: require("../../../../Background Images/Usuals/Black Background.jpg")
  },

];