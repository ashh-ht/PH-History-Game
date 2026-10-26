
export const Chapter1_Part3 = [

  // ===========================================
  // PROLOGUE
  // ===========================================

  {
    type: "system",
    intro: true,
    background: require("../../../../Background Images/Usuals/Black Background.jpg"),
    music: "somber",
    text: "After decades of resistance, a new generation begins to challenge Spanish rule."
  },
  {
    type: "system",
    intro: true,
    background: require("../../../../Background Images/Usuals/Black Background.jpg"),
    text: "In 1892, a returning novelist brings his ideas home."
  },
  {
    type: "system",
    intro: true,
    background: require("../../../../Background Images/Usuals/Black Background.jpg"),
    text: "Soon, his words will help inspire a movement."
  },

  // ===========================================
  // SCENE 1: THE NOVELIST'S RETURN
  // ===========================================

  {
    type: "scene",
    title: "The Novelist's Return",
    date: "June 26, 1892",
    background: require("../../../../Background Images/Usuals/Black Background.jpg"),
    sfx: "shipArrival"
  },

  // SFX: waves, ship creaking, footsteps on the dock

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 3/manila port 1890s.png"),
    text: "After years abroad, Dr. José Rizal returns to Manila.\nHis novels have already stirred questions across the islands.",
    music: "somber",
    unlock: ["Timeline_1892_06-26", "rizal-1"]
  },

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 3/Rizal's home.png"),
    text: "Noli Me Tángere and El Filibusterismo exposed abuses\nand encouraged Filipinos to think about their future."
  },

  {
    type: "dialogue",
    speaker: "DR. JOSÉ RIZAL",
    background: require("../../../../Background Images/Part 3/Rizal's home.png"),
    characters: [
      {
        name: "DR. JOSÉ RIZAL",
        source: require("../../../../Character Images/Chapter 3/Rizal Arrival.png"),
        position: "center"
      }
    ],
    text: "Writing from Spain was only the beginning.\nNow I want to work for our people here, at home."
  },

  {
    type: "dialogue",
    speaker: "DR. JOSÉ RIZAL",
    background: require("../../../../Background Images/Part 3/Rizal's home.png"),
    characters: [
      {
        name: "DR. JOSÉ RIZAL",
        source: require("../../../../Character Images/Chapter 3/Rizal Arrival.png"),
        position: "center"
      }
    ],
    text: "We cannot simply wait for the government to change.\nWe must work together to build a better future."
  },

  // ===========================================
  // SCENE 2: THE COVENANT IN TONDO
  // ===========================================

  {
    type: "scene",
    title: "The Covenant in Tondo",
    date: "July 3, 1892",
    background: require("../../../../Background Images/Usuals/Brown Background.jpg"),
    sfx: "chairSit"
  },

  // SFX: quiet conversation, chairs moving, papers being arranged

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 3/Liga Filipina founding 1892 Ongjunco.png"),
    text: "At Doroteo Ongjunco's home in Tondo, about thirty people gather for a meeting.",
    unlock: ["Timeline_1892_07-03", "arellano-1"]
  },

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 3/Liga Filipina founding 1892 Ongjunco.png"),
    text: "Reformers, professionals, and merchants come together.\nTogether, they create a new organization: \"La Liga Filipina.\"",
    unlock: ["rizal-2"]
  },

  {
    type: "dialogue",
    speaker: "DR. JOSÉ RIZAL",
    background: require("../../../../Background Images/Part 3/Liga Filipina founding 1892 Ongjunco.png"),
    characters: [
      {
        name: "DR. JOSÉ RIZAL",
        source: require("../../../../Character Images/Chapter 3/Rizal.png"),
        position: "center"
      }
    ],
    text: "My friends, we have stood apart for too long. It is time we\nunite as one strong community."
  },

  {
    type: "dialogue",
    speaker: "DR. JOSÉ RIZAL",
    background: require("../../../../Background Images/Part 3/Liga Filipina founding 1892 Ongjunco.png"),
    characters: [
      {
        name: "DR. JOSÉ RIZAL",
        source: require("../../../../Character Images/Chapter 3/Rizal.png"),
        position: "center"
      }
    ],
    text: "Our motto is Unus Instar Omnium: \n\"One is worth all\". No one should stand alone."
  },

  // T3_3

  {
    type: "dialogue",
    speaker: "ANDRÉS BONIFACIO",
    background: require("../../../../Background Images/Part 3/Liga Filipina founding 1892 Ongjunco.png"),
    characters: [
      {
        name: "ANDRÉS BONIFACIO",
        source: require("../../../../Character Images/Chapter 3/Bonifacio Talking Mad.png"),
        position: "left"
      },
      {
        name: "APOLINARIO MABINI",
        source: require("../../../../Character Images/Chapter 3/Mabini R.png"),
        position: "right"
      }
    ],
    text: "But what if Spain turns against us?\nHow will we protect the people who join us?",
    unlock: ["bonifacio-1"]
  },

  {
    type: "dialogue",
    speaker: "APOLINARIO MABINI",
    background: require("../../../../Background Images/Part 3/Liga Filipina founding 1892 Ongjunco.png"),
    characters: [
      {
        name: "ANDRÉS BONIFACIO",
        source: require("../../../../Character Images/Chapter 3/Bonifacio Unsure.png"),
        position: "left"
      },
      {
        name: "APOLINARIO MABINI",
        source: require("../../../../Character Images/Chapter 3/Mabini R.png"),
        position: "right"
      }
    ],
    text: "Then we must build trust among our own people.\nLet us sign and prove we can stand together."
  },

  // CHOICE 3.1

  {
    type: "choice",
    title: "Choice 3.1: You are Dr. José Rizal",
    question: "Bonifacio fears the authorities may turn against\nthe Liga. How will you respond?",
    background: require("../../../../Background Images/Part 3/Liga Filipina founding 1892 Ongjunco.png"),
    choices: [
      {
        text: "Keep the Liga peaceful and legal.",
        speaker: "DR. JOSÉ RIZAL",
        dialogue: "Mananatiling mapayapa ang Liga, Andrés. Huwag nating bigyan sila\nng dahilan para tayo'y tawaging rebelde.",
        translation: "The Liga will remain peaceful, Andrés. We must not give them a reason to call us rebels.",
        characters: [
          {
            name: "DR. JOSÉ RIZAL",
            source: require("../../../../Character Images/Chapter 3/Rizal.png"),
            position: "left"
          },
          {
            name: "ANDRÉS BONIFACIO",
            source: require("../../../../Character Images/Chapter 3/Bonifacio Unsure R.png"),
            position: "right"
          }
        ]
      },
      {
        text: "Admit his concern deserves attention.",
        speaker: "DR. JOSÉ RIZAL",
        dialogue: "May punto ka, Andrés. Pag-isipan natin kung\n paano tayo haharap sa panganib.",
        translation: "You have a point, Andrés. Let us think about how we would face danger.",
        characters: [
          {
            name: "DR. JOSÉ RIZAL",
            source: require("../../../../Character Images/Chapter 3/Rizal.png"),
            position: "left"
          },
          {
            name: "ANDRÉS BONIFACIO",
            source: require("../../../../Character Images/Chapter 3/Bonifacio Neutral R.png"),
            position: "right"
          }
        ]
      }
    ]
  },

  // CONTINUE

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 3/Liga Filipina founding 1892 Ongjunco.png"),
    text: "The Liga promotes unity, mutual support, education,\nand better living conditions for Filipinos."
  },

  // ===========================================
  // SCENE 3: THE BLOW OF BANISHMENT
  // ===========================================

  {
    type: "scene",
    title: "The Blow of Banishment",
    date: "July 6, 1892",
    background: require("../../../../Background Images/Usuals/Brown Background.jpg"),
    sfx: "doorKnock"
  },

  // SFX: I'd prefer a loud banging instead of a door knock.

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 3/Governor-General's office.png"),
    text: "Three days later, the authorities act against Rizal.\nThey claim anti-friar pamphlets were found in his sister's luggage."
  },

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 3/Governor-General's office.png"),
    text: "Governor-General Eulogio Despujol orders Rizal's arrest\nand exile, cutting short his work in Manila.",
    unlock: ["despujol-1", "Timeline_1892_07-06"]
  },

  // CHOICE 3.2

  {
    type: "choice",
    title: "Choice 3.2: You are Dr. José Rizal",
    question: "You face arrest and exile without a trial.",
    background: require("../../../../Background Images/Part 3/Governor-General's office.png"),
    choices: [
      {
        text: "Accept the arrest calmly.",
        speaker: "DR. JOSÉ RIZAL",
        dialogue: "I'll go quietly. My family and friends should not suffer because of me.",
        characters: [
          {
            name: "DR. JOSÉ RIZAL",
            source: require("../../../../Character Images/Chapter 3/Rizal Sad.png"),
            position: "center"
          }
        ]
      },
      {
        text: "Ask to answer the charges first.",
        speaker: "DR. JOSÉ RIZAL",
        dialogue: "At least let me explain myself before you take me away.",
        characters: [
          {
            name: "DR. JOSÉ RIZAL",
            source: require("../../../../Character Images/Chapter 3/Rizal Talking.png"),
            position: "center"
          }
        ]
      }
    ]
  },

  // CONTINUE

  // SFX: footsteps, ship creaking, waves fading into the distance

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 3/manila port 1890s.png"),
    text: "Rizal is sent to Dapitan in Mindanao.\nThe Liga must continue without its founder.",
    unlock: ["rizal-3", "despujol-2", "Timeline_1892_07-07"]
  },

  // ===========================================
  // SCENE 4: THE GREAT DISAGREEMENT
  // ===========================================

  {
    type: "scene",
    title: "The Great Disagreement",
    date: "April – October 1893",
    background: require("../../../../Background Images/Usuals/Brown Background.jpg"),
    sfx: "chairSit"
  },

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 3/Reformist meeting hall, 1893 (Liga revival debate).png"),
    text: "With Rizal far away in Dapitan, members try to revive the Liga.\nBut they disagree on how to win change."
  },

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 3/Reformist meeting hall, 1893 (Liga revival debate).png"),
    text: "Domingo Franco supports peaceful reform.\nBonifacio believes independence must be the goal.",
    unlock: ["franco-1", "franco-2", "mabini-2", "Timeline_1893_04-03"]
  },

  // T1_3

  {
    type: "dialogue",
    speaker: "DOMINGO FRANCO",
    background: require("../../../../Background Images/Part 3/Reformist meeting hall, 1893 (Liga revival debate).png"),
    characters: [
      {
        name: "DOMINGO FRANCO",
        source: require("../../../../Character Images/Chapter 3/Franco Talking.png"),
        position: "center"
      }
    ],
    text: "We should keep working peacefully. Our writers in Spain still need support."
  },

  {
    type: "dialogue",
    speaker: "DOMINGO FRANCO",
    background: require("../../../../Background Images/Part 3/Reformist meeting hall, 1893 (Liga revival debate).png"),
    characters: [
      {
        name: "DOMINGO FRANCO",
        source: require("../../../../Character Images/Chapter 3/Franco Talking.png"),
        position: "center"
      }
    ],
    text: "We can gather funds and demand fair treatment\nthrough legal means."
  },

  {
    type: "dialogue",
    speaker: "ANDRÉS BONIFACIO",
    background: require("../../../../Background Images/Part 3/Reformist meeting hall, 1893 (Liga revival debate).png"),
    characters: [
      {
        name: "DOMINGO FRANCO",
        source: require("../../../../Character Images/Chapter 3/Franco Neutral.png"),
        position: "left"
      },
      {
        name: "ANDRÉS BONIFACIO",
        source: require("../../../../Character Images/Chapter 3/Bonifacio Talking Mad R.png"),
        position: "right"
      }
    ],
    text: "And while we write letters, Rizal remains in exile!\nHow long must our people wait?"
  },

  {
    type: "dialogue",
    speaker: "ANDRÉS BONIFACIO",
    background: require("../../../../Background Images/Part 3/Reformist meeting hall, 1893 (Liga revival debate).png"),
    characters: [
      {
        name: "DOMINGO FRANCO",
        source: require("../../../../Character Images/Chapter 3/Franco Neutral.png"),
        position: "left"
      },
      {
        name: "ANDRÉS BONIFACIO",
        source: require("../../../../Character Images/Chapter 3/Bonifacio Talking R.png"),
        position: "right"
      }
    ],
    text: "We need a different approach.\nOur country must be free."
  },

  // CHOICE 3.3

  {
    type: "choice",
    title: "Choice 3.3: You are Andrés Bonifacio",
    question: "The Liga cannot agree on how to move forward.",
    background: require("../../../../Background Images/Part 3/Reformist meeting hall, 1893 (Liga revival debate).png"),
    choices: [
      {
        text: "Consider organizing a different movement.",
        speaker: "ANDRÉS BONIFACIO",
        dialogue: "Sawa na ako sa mga liham na walang kasagutan! Kung hindi sapat\nang mga salita, kailangan nating kumilos.",
        translation: "I've had enough of unanswered letters! If words alone aren't enough, we must act.",
        characters: [
          {
            name: "DOMINGO FRANCO",
            source: require("../../../../Character Images/Chapter 3/Franco Neutral.png"),
            position: "left"
          },
          {
            name: "ANDRÉS BONIFACIO",
            source: require("../../../../Character Images/Chapter 3/Bonifacio Talking Mad R.png"),
            position: "right"
          }
        ]
      },
      {
        text: "Try once more to unite the members.",
        speaker: "ANDRÉS BONIFACIO",
        dialogue: "Subukan muna nating magkasundo sa isang plano\nbago tayo tuluyang magkahiwalay.",
        translation: "Let us agree on a plan before we go our separate ways.",
        characters: [
          {
            name: "DOMINGO FRANCO",
            source: require("../../../../Character Images/Chapter 3/Franco Neutral.png"),
            position: "left"
          },
          {
            name: "ANDRÉS BONIFACIO",
            source: require("../../../../Character Images/Chapter 3/Bonifacio Talking R.png"),
            position: "right"
          }
        ]
      }
    ]
  },

  // CONTINUE

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 3/Reformist meeting hall, 1893 (Liga revival debate).png"),
    text: "The disagreement deepens. La Liga Filipina's activities\ncome to an end in October 1893.",
    unlock: ["Timeline_1893_10"]
  },

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 3/Reformist meeting hall, 1893 (Liga revival debate).png"),
    text: "Bonifacio and his companions continue to consider how to pursue independence.\nTheir struggle is far from over.",
    unlock: [
      "diaz-1",
      "diwa-1",
      "dizon-1",
      "dizon-2",
      "plata-1",
      "franco-3",
      "dizon-3"
    ]
  },

  // ===========================================
  // MATCHING MINIGAME
  // ===========================================

  {
    type: "matching",
    characters: [
      {
        id: "rizal",
        name: "Dr. José Rizal",
        image: require("../../../../Character Images/Chapter 3/Rizal.png")
      },
      {
        id: "bonifacio",
        name: "Andrés Bonifacio",
        image: require("../../../../Character Images/Chapter 3/Bonifacio Neutral.png")
      },
      {
        id: "mabini",
        name: "Apolinario Mabini",
        image: require("../../../../Character Images/Chapter 3/Mabini R.png")
      },
      {
        id: "franco",
        name: "Domingo Franco",
        image: require("../../../../Character Images/Chapter 3/Franco Neutral.png")
      },
      {
        id: "dagohoy",
        name: "Francisco Dagohoy",
        image: require("../../../../Character Images/Chapter 2/Dagohoy Mad.png")
      },
      {
        id: "legazpi",
        name: "Miguel López de Legazpi",
        image: require("../../../../Character Images/Chapter 1/Legazpi Neutral.png")
      },
      {
        id: "dula",
        name: "Lakan Dula",
        image: require("../../../../Character Images/Chapter 1/Dula Neutral.png")
      },
      {
        id: "sulayman",
        name: "Rajah Sulayman",
        image: require("../../../../Character Images/Chapter 1/Sulayman Neutral R.png")
      }
    ]
  },

  // ===========================================
  // QUIZ TIME
  // ===========================================

  {
    type: "scene",
    title: "Test Your Knowledge!",
    date: "How well do you remember the events of 1892?",
    background: require("../../../../Background Images/Usuals/Brown Background.jpg")
  },

  {
    type: "quiz",
    question: "What did José Rizal hope to accomplish after\nreturning to the Philippines in 1892?",
    options: [
      "Become a Spanish government official",
      "Work with Filipinos to improve their country",
      "Leave Manila immediately",
      "Start a military campaign"
    ],
    correctIndex: 1,
    unlock: ["remnant-part3-1"]
  },

  {
    type: "quiz",
    question: "What organization did Rizal help establish\non July 3, 1892?",
    options: [
      "The Katipunan",
      "La Liga Filipina",
      "The Philippine Republic",
      "The Propaganda Movement"
    ],
    correctIndex: 1,
    unlock: ["remnant-part3-2"]
  },

  {
    type: "quiz",
    question: "What happened to Rizal shortly after the founding\nof La Liga Filipina?",
    options: [
      "He was elected president of the Liga",
      "He returned to Spain voluntarily",
      "He was arrested and exiled to Dapitan",
      "He joined Bonifacio's secret organization"
    ],
    correctIndex: 2,
    unlock: ["remnant-part3-3"]
  },

  {
    type: "quiz",
    question: "Why did members of La Liga Filipina begin to disagree\nabout its future?",
    options: [
      "They disagreed about whether to continue\npeaceful reform or pursue a different approach",
      "They could not agree on where to meet",
      "They wanted to replace Rizal as a novelist",
      "They disagreed about which language to use"
    ],
    correctIndex: 0,
    unlock: ["remnant-part3-4"]
  },

  {
    type: "quiz",
    question: "What did Andrés Bonifacio believe the Philippines needed?",
    options: [
      "More time under Spanish rule",
      "A return to the old colonial system",
      "Independence from Spanish rule",
      "An end to all organized movements"
    ],
    correctIndex: 2,
    unlock: ["remnant-part3-5"]
  },

  {
    type: "quiz",
    question: "What was the Latin motto of La Liga Filipina?",
    options: [
      "Liberty or Death",
      "Unus Instar Omnium (One is worth all)",
      "Viva la Independencia",
      "God, Country, People"
    ],
    correctIndex: 1,
    unlock: ["remnant-part3-6"]
  },

  // ===========================================
  // CLOSING
  // ===========================================

  {
    type: "scene",
    title: "Chapter Complete",
    date: "The call for change had become a call for freedom.",
    background: require("../../../../Background Images/Usuals/Black Background.jpg")
  },

  {
    type: "scene",
    title: "The struggle for independence was only beginning.",
    date: " ",
    background: require("../../../../Background Images/Usuals/Black Background.jpg")
  }

];
