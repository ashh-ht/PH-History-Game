export const Chapter1_Part1 = [

  {
    type: "system",
    intro: true,
    text: "Before the names in our history books, there were people.",
    background: require("../../../../Background Images/Usuals/Black Background.jpg")
  },

  {
    type: "system",
    intro: true,
    text: "They lived on these islands long before they were ever called a colony.",
    background: require("../../../../Background Images/Intro/Intro 2.png")
  },

  {
    type: "system",
    intro: true,
    text: "They built homes, sailed between islands, traded with distant shores, and raised families.",
    background: require("../../../../Background Images/Intro/Intro 3.png")
  },

  {
    type: "system",
    intro: true,
    text: "And then, one day...",
    background: require("../../../../Background Images/Usuals/Black Background.jpg")
  },

  {
    type: "system",
    intro: true,
    text: "Mysterious ships appeared on the horizon.",
    background: require("../../../../Background Images/Intro/Intro 4.png")
  },


  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // SCENE 1
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  {
    type: "scene",
    title: "Cibabao, Samar",
    date: "February 13, 1565",
    background: require("../../../../Background Images/Usuals/Black Background.jpg")
  },

  {
    type: "narrator",
    text: "After weeks at sea, five Spanish ships under General Miguel López de Legazpi\nanchor off Cibabao, Samar.",
    background: require("../../../../Background Images/Part 1/Spanish Arrival.png")
  },

  {
    type: "narrator",
    text: "The local people gather along the shore, watching the unfamiliar ships from a distance.",
    background: require("../../../../Background Images/Part 1/Spanish Arrival.png")
  },

  {
    type: "system",
    intro: true,
    text: "In 1565, Legazpi arrived at Samar to continue what Magellan started.",
    background: require("../../../../Background Images/Usuals/Black Background.jpg")
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
    type: "narrator",
    text: "The people of Samar remain near the trees.",
    background: require("../../../../Background Images/Part 1/Spanish Coast.png")
  },

  {
    type: "narrator",
    text: "They have have heard stories of foreign ships before, but don't know yet\nwhether these visitors mean peace or trouble.",
    background: require("../../../../Background Images/Part 1/Spanish Coast.png")
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
    type: "narrator",
    text: "A warrior steps from the trees and blocks Gomez's path with his spear.\nHe does not attack. He simply refuses to let him pass.",
    background: require("../../../../Background Images/Part 1/Spanish Coast.png")
  },


  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // CHOICE 1.1
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

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
            source: require("../../../../Character Images/Temporary Placeholders/Chieftan.png"),
            position: "right"
          }
        ]
      },

      {
        text: "Hear him out, but keep your guard up.",
        speaker: "CHIEFTAIN",
        dialogue: "Makikinig kami sa sasabihin mo, pero hindi pa kami nagtitiwala sa iyo.",
        translation: "We'll hear what you have to say, but we don't trust you yet.",
        characters: [
          {
            source: require("../../../../Character Images/Temporary Placeholders/Chieftan.png"),
            position: "right"
          }
        ]
      }
    ],

    nextScene: 15
  },

  // CONTINUE

  {
    type: "narrator",
    text: "No Spanish settlement is established in Samar.\nLegazpi's fleet continues toward Leyte and Bohol.",
    background: require("../../../../Background Images/Part 1/Spanish Coast.png")
  },



  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // SCENE 2
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  {
    type: "scene",
    title: "Formal Claims & Island Hopping",
    date: "February 15 – April 1565",
    background: require("../../../../Background Images/Usuals/Brown Background.jpg")
  },

  {
    type: "narrator",
    text: "Two days after leaving Samar, Legazpi and his fleet reach Leyte. He lands on shore\nand plants a cross to formally claim the territory for Spain.",
    background: require("../../../../Background Images/Part 1/Spanish Coast.png")
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
    text: "Let this cross mark the start of our mission here, in the name of King Philip II."
  },

  {
    type: "narrator",
    text: "The fleet continues on to Bohol, where Legazpi meets Datu Sikatuna.",
    background: require("../../../../Background Images/Part 1/Bohol Coast.png")
  },

  {
    type: "narrator",
    text: "Unlike their tense arrival in Samar, Datu Sikatuna welcomes the Spaniards.\nThe two seal their friendship with a sandugo, a traditional blood compact.",
    background: require("../../../../Background Images/Part 1/Bohol Coast.png")
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



  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // SCENE 3
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  {
    type: "scene",
    title: "The Ultimatum in Cebu",
    date: "April 27, 1565",
    background: require("../../../../Background Images/Usuals/Brown Background.jpg")
  },

  {
    type: "narrator",
    text: "Forty-four years after Magellan's fleet passed nearby, Legazpi enters Cebu's harbor.",
    background: require("../../../../Background Images/Part 1/Cebu Village.png")
  },

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 1/Cebu Village.png"),
    characters: [
      {
        source: require("../../../../Character Images/Temporary Placeholders/Tupas.png"),
        position: "left"
      },
    ],
    text: "Rajah Tupas waits on shore with more than two thousand warriors behind him."
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
    text: "Sino kayo at bakit kayo naririto sa aming isla? Hindi ako pumapayag\nsa inyong pakikipag-usap!",
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


  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // CHOICE 1.2
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  {
    type: "choice",
    title: "Choice 1.2: You are Rajah Tupas of Cebu",
    question: "The three-day deadline is almost up.\nSpanish messengers return to ask for peace.",
    background: require("../../../../Background Images/Part 1/Cebu Village.png"),

    choices: [
      {
        text: "Refuse, and retreat to the mountains to prepare for battle.",
        speaker: "RAJAH TUPAS",
        dialogue: "Umatras muna tayo sa kabundukan at maghanda. Hindi\nnatin basta-bastang ibibigay ang ating lupain.",
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

    nextScene: 30
  },

  // CONTINUE

  {
    type: "narrator",
    text: "Tupas and his people leave the settlement and retreat into the hills. When\nthe Spanish arrive and re-enter Cebu, they find the village largely abandoned.",
    background: require("../../../../Background Images/Part 1/Cebu hills Tupas's retreat.png")
  },

  {
    type: "dialogue",
    speaker: "MIGUEL LÓPEZ DE LEGAZPI",
    background: require("../../../../Background Images/Part 1/Cebu Burned.png"),
    characters: [
      {
        source: require("../../../../Character Images/Temporary Placeholders/Legazpi.png"),
        position: "right"
      }
    ],
    text: "We offered peace, and I wish this could have gone differently.\nStill, we must persevere and survive."
  },

  {
    type: "narrator",
    text: "Construction begins on Fort San Pedro. Cebu becomes Spain's first\nlasting settlement in the islands.",
    background: require("../../../../Background Images/Part 1/Construction.png")
  },

  {
    type: "dialogue",
    speaker: "MIGUEL LÓPEZ DE LEGAZPI",
    background: require("../../../../Background Images/Part 1/Construction.png"),
    characters: [
      {
        source: require("../../../../Character Images/Temporary Placeholders/Legazpi.png"),
        position: "center"
      }
    ],
    text: "We'll build our settlement here and call it Villa de Santísimo\nNombre de Jesús."
  },

  {
    type: "narrator",
    text: "As the Spanish explore the empty houses, Juan de Camus discovers something\nunexpected inside one of them.",
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

  {
    type: "narrator",
    text: "The discovery becomes an important moment for the new Spanish settlement.",
    background: require("../../../../Background Images/Part 1/nipa hut interior santo nino discovery.png")
  },

  {
    type: "narrator",
    text: "However, life in Cebu remains difficult due to food shortages and tensions between\nthe Spanish and local communities.",
    background: require("../../../../Background Images/Part 1/Cebu Village.png")
  },

  {
    type: "dialogue",
    speaker: "MIGUEL LÓPEZ DE LEGAZPI",
    background: require("../../../../Background Images/Part 1/Cebu Village.png"),
    characters: [
      {
        source: require("../../../../Character Images/Temporary Placeholders/Legazpi.png"),
        position: "center"
      }
    ],
    text: "We cannot keep surviving on so little. Panay has more food. We will\nmove the settlement somewhere else."
  },

  {
    type: "narrator",
    text: "After years of struggling to survive in Cebu, the Spanish move their settlement to\nPanay, where food is more plentiful.",
    background: require("../../../../Background Images/Part 1/Bohol Coast.png")
  },

  {
    type: "narrator",
    text: "The settlement moves to the Panay River, where life becomes more stable.",
    background: require("../../../../Background Images/Part 1/Bohol Coast.png")
  },

  {
    type: "narrator",
    text: "Soon, traders begin talking about a wealthy settlement farther north named Maynila.",
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



  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // SCENE 4
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  {
    type: "scene",
    title: "The Sandugo of Manila",
    date: "June 1571",
    background: require("../../../../Background Images/Usuals/Brown Background.jpg")
  },

  {
    type: "narrator",
    text: "After early clashes with Rajah Sulayman's forces, Legazpi arrives\nin Manila Bay with a large fleet.",
    background: require("../../../../Background Images/Part 1/Manila Shoreline.png")
  },

  {
    type: "narrator",
    text: "Lakan Dula of Tondo senses danger and urges his nephew to negotiate.",
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
    translation: "My dear nephew, look at their boat and guns"
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
    translation: "My nephew, look at their ships and weapons. If we fight them head-on, we could lose\neverything. Let's talk first."
  },


  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // CHOICE 1.3
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

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


    nextScene: 51
  },



  // END OF STORY

  {
    type: "narrator",
    text: "Sulayman agrees to negotiate with Legazpi. The two sides settle for peace\nand seal the agreement with a sandugo.",
    background: require("../../../../Background Images/Part 1/Inside hut sandugo part.png")
  },

  {
    type: "narrator",
    text: "On June 24, 1571, Legazpi declares Manila the capital of the colony.",
    background: require("../../../../Background Images/Part 1/Manila Shoreline.png")
  },

  {
    type: "scene",
    title: "Their story does not end here.",
    date: "It will continue for centuries. Through generations of change, resistance,\nand eventually the fight for independence.",
    background: require("../../../../Background Images/Usuals/Black Background.jpg")
  },



  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // QUIZ TIME
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

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