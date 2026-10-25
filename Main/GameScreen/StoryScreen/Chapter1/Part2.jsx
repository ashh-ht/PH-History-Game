export const Chapter1_Part2 = [


  {
    type: "system",
    intro: true,
    text: "The arrival of the Spanish changed life across the islands.",
    background: require("../../../../Background Images/Usuals/Black Background.jpg"),
    sfx: 'windyFlag'
  },

  {
    type: "system",
    intro: true,
    text: "For some, accepting their rule was never an option.",
    background: require("../../../../Background Images/Usuals/Black Background.jpg")
  },

  // GAME ENTRY

  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // SCENE 1 
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  {
    type: "scene",
    title: "The Refusal at Inabanga",
    date: "1744",
    background: require("../../../../Background Images/Usuals/Black Background.jpg"),
    sfx: 'churchBell',
  },

  {
    type: "narrator",
    text: "The afternoon air in Bohol is heavy. Outside the parish church, Francisco Dagohoy\nstands grieving for his brother, Sagarino.",
    background: require("../../../../Background Images/Part 2/saint paul inabanga church exterior.png"),
    music: "grief",
    sfx: 'windyFlag',
    unlock: ["dagohoy-1"]
  },

  {
    type: "narrator",
    text: "Sagarino died while carrying out Father Morales's orders. Yet the priest\nrefuses to give him a proper burial.",
    background: require("../../../../Background Images/Part 2/saint paul inabanga church interior.png"),
    sfx: 'doorOpen',
    unlock: ["morales-1", "morales-2"]
  },

  {
    type: "dialogue",
    speaker: "FRANCISCO DAGOHOY",
    background: require("../../../../Background Images/Part 2/saint paul inabanga church interior.png"),
    characters: [
      {
        source: require("../../../../Character Images/Chapter 2/Dagohoy Mad.png"),
        position: "left"
      },
      {
        source: require("../../../../Character Images/Chapter 2/Morales.png"),
        position: "right"
      }
    ],
    text: "Padre, pinatay po ang aking kapatid habang tinutupad ang inyong utos.",
    translation: "Father, my brother was killed while following your orders."
  },

  {
    type: "dialogue",
    speaker: "FRANCISCO DAGOHOY",
    background: require("../../../../Background Images/Part 2/saint paul inabanga church interior.png"),
    characters: [
      {
        source: require("../../../../Character Images/Chapter 2/Dagohoy Mad.png"),
        position: "left"
      },
      {
        source: require("../../../../Character Images/Chapter 2/Morales.png"),
        position: "right"
      }
    ],
    text: "Bakit ninyo siya pinakakaitan ng tamang paglilibing?",
    translation: "He died doing his duty. Why are you refusing him a proper burial?"
  },

  {
    type: "dialogue",
    speaker: "FATHER GASPAR MORALES",
    background: require("../../../../Background Images/Part 2/saint paul inabanga church interior.png"),
    characters: [
      {
        source: require("../../../../Character Images/Chapter 2/Morales Talking.png"),
        position: "right"
      },
      {
        source: require("../../../../Character Images/Chapter 2/Dagohoy Done.png"),
        position: "left"
      }
    ],
    text: "The rules of the Church do not bend, Cabeza. I cannot allow the burial.",
    sfx: 'stampPapers'
  },

  {
    type: "dialogue",
    speaker: "FRANCISCO DAGOHOY",
    background: require("../../../../Background Images/Part 2/saint paul inabanga church interior.png"),
    characters: [
      {
        source: require("../../../../Character Images/Chapter 2/Dagohoy Mad.png"),
        position: "left"
      },
      {
        source: require("../../../../Character Images/Chapter 2/Morales.png"),
        position: "right"
      }
    ],
    text: "Sinuway niya ang panganib para sa inyo!",
    translation: "He faced danger for you!"
  },

  {
    type: "dialogue",
    speaker: "FRANCISCO DAGOHOY",
    background: require("../../../../Background Images/Part 2/saint paul inabanga church interior.png"),
    characters: [
      {
        source: require("../../../../Character Images/Chapter 2/Dagohoy Mad.png"),
        position: "left"
      },
      {
        source: require("../../../../Character Images/Chapter 2/Morales.png"),
        position: "right"
      }
    ],
    text: "Kung wala man lang paggalang ang inyong simbahan para sa mga tapat\nna lingkod, hindi na kami dapat manatiling tapat!",
    translation: "If your church has no respect for a loyal servant, then we should not have to remain loyal.",
    sfx: 'groundThud'
  },

  //Q2_1 here

  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // CHOICE 2.1
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  {
    type: "choice",
    title: "Choice 2.1: You are Francisco Dagohoy",
    question: "Father Gaspar Morales has refused your brother a proper burial.",
    background: require("../../../../Background Images/Part 2/saint paul inabanga church interior.png"),

    choices: [
      {
        text: "Speak out and lead your people\nto the mountains.",
        speaker: "FRANCISCO DAGOHOY",
        dialogue: "Sobra na ang ginawa nila sa ating mga pamilya! Panahon na para umalis\ntayo at magsimula sa kabundukan.",
        translation: "They've done enough to our families. It's time for us to leave and start anew in the mountains.",
        characters: [
          {
            source: require("../../../../Character Images/Chapter 2/Dagohoy Mad.png"),
            position: "center"
          }
        ]
      },

      {
        text: "Appeal to a higher church\nauthority first.",
        speaker: "FRANCISCO DAGOHOY",
        dialogue: "Makikipag-usap muna ako sa Obispo. Baka may magawa pa\nsiya tungkol dito.",
        translation: "I'll speak to the Bishop first. Maybe he can still do something about this.",
        characters: [
          {
            source: require("../../../../Character Images/Chapter 2/Dagohoy Done.png"),
            position: "center"
          }
        ]
      }
    ],


  },


  // CONTINUE

  {
    type: "narrator",
    text: "No compromise is reached. Dagohoy gathers about three thousand Boholanos\nand leads them into the mountains.",
    background: require("../../../../Background Images/Part 2/Bohol highlands jungle pass.png"),
    sfx: 'footstepsGround',
    unlock: ["Timeline_1744", "dagohoy-2", "morales-3"]
  },

  //Q2_2 here

  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // SCENE 2
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  {
    type: "scene",
    title: "Flight to the Mountains",
    date: "1744",
    background: require("../../../../Background Images/Usuals/Brown Background.jpg"),
    sfx:'hiking'
  },

  {
    type: "narrator",
    text: "In the mountains, Dagohoy along with the three thousand Boholanos build farms\nand organize their own community.",
    background: require("../../../../Background Images/Part 2/Mountain settlement.png"),
    sfx: 'hammer'
  },

  {
    type: "narrator",
    text: "There, they start a new life outside of Spanish control and forced labor.",
    background: require("../../../../Background Images/Part 2/Mountain settlement.png"),
  },



  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // SCENE 3
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  {
    type: "scene",
    title: "The Unbroken Stronghold",
    date: "Late 18th Century – 1827",
    background: require("../../../../Background Images/Usuals/Brown Background.jpg"),
    sfx: 'pagesFlipping',
    
  },

  {
    type: "narrator",
    text: "Decades pass. The mountain community grows from around three thousand\npeople into a population of around twenty thousand.",
    background: require("../../../../Background Images/Part 2/Mountain settlement.png"),
    unlock: ["Timeline_1744-1828", "dagohoy-3"]
  },

  {
    type: "narrator",
    text: "Spanish expeditions return again and again to regain control, but to no avail.",
    background: require("../../../../Background Images/Part 2/mountain fortress bamboo palisade.png"),
    sfx: 'marching'
  },

  //T1_2 here

  {
    type: "narrator",
    text: "Officials begin to make attempts to negotiate with the community.",
    background: require("../../../../Background Images/Part 2/mountain fortress bamboo palisade.png"),
    sfx: 'quillWriting'
  },


  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // CHOICE 2.2
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  {
    type: "choice",
    title: "Choice 2.2: You are Francisco Dagohoy",
    question: "Spain is weakened after the British take Manila.",
    background: require("../../../../Background Images/Part 2/mountain fortress bamboo palisade.png"),

    choices: [
      {
        text: "Stay focused on protecting your\nmountain community.",
        speaker: "FRANCISCO DAGOHOY",
        dialogue: "Hindi pa panahon para lumabas. Bantayan muna natin ang\nating komunidad.",
        translation: "It's not time to move yet. Let's protect our community first.",
        characters: [
          {
            source: require("../../../../Character Images/Chapter 2/Dagohoy Talking.png"),
            position: "center"
          }
        ]
      },

      {
        text: "Send scouts to see if other islands\nwant to join you.",
        speaker: "FRANCISCO DAGOHOY",
        dialogue: "Magpadala tayo ng mga tagamasid sa Leyte at Cebu. Alamin natin\nkung handa silang sumama sa atin.",
        translation: "Let's send scouts to Leyte and Cebu. Let's see if they're willing to join us.",
        characters: [
          {
            source: require("../../../../Character Images/Chapter 2/Dagohoy Talking.png"),
            position: "center"
          }
        ]
      }
    ],

  },

  // CONTINUE


  {
    type: "narrator",
    text: "No large alliance forms. The mountain community remains on its own.",
    background: require("../../../../Background Images/Part 2/Mountain settlement.png"),
    sfx: 'windyFlag'
  },

  {
    type: "narrator",
    text: "In 1827, a Spanish expedition of 2,200 soldiers enters the mountains.",
    background: require("../../../../Background Images/Part 2/mountain fortress bamboo palisade.png"),
    sfx: 'marching',
    unlock: ["Timeline_1827"]
  },

  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // MINIGAME: DEFEND THE STRONGHOLD
  // (needs to be registered like "decipher")
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  {
    type: "stronghold",
    title: "Defend the Stronghold!",
    instructions: "Spanish scouts are sneaking toward the palisade! Tap them before they get close. Don't tap the villagers!",
    background: require("../../../../Background Images/Part 2/mountain fortress bamboo palisade.png"),
    rounds: 3,
    sfx: 'marching',
    hitSfx: 'correct',
    missSfx: 'wrong',
    successText: "The stronghold holds!"
  },

  //T3_2 here 

  {
    type: "narrator",
    text: "After a difficult standoff, the expedition withdraws. The Boholanos\nsuccessfully defend their territory.",
    background: require("../../../../Background Images/Part 2/mountain fortress bamboo palisade.png"),
  },



  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // SCENE 4
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  {
    type: "scene",
    title: "The Sanz Campaign & The Clemency",
    date: "1828–1829",
    background: require("../../../../Background Images/Usuals/Brown Background.jpg"),
    sfx: 'marching',
    
  },

  {
    type: "narrator",
    text: "Governor-General Mariano Ricafort sends Captain Manuel Sanz to lead 6,000\nsoldiers into Bohol as a final campaign to retake control.",
    background: require("../../../../Background Images/Part 2/mountain fortress bamboo palisade.png"),
    sfx: 'cannonFire',
    unlock: ["sanz-1", "ricafort-1"]
  },

  //Q3_2 here

  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // CHOICE 2.3
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  {
    type: "choice",
    title: "Choice 2.3: You are a Boholano Rebel Leader",
    question: "In 1829, Captain Manuel Sanz's army arrives. After spending 85 years in the\nmountains, the Spanish offer peace and pardon or war.",
    background: require("../../../../Background Images/Part 2/mountain fortress bamboo palisade.png"),

    choices: [
      {
        text: "Accept the offer to spare your people\nfrom more fighting.",
        speaker: "REBEL LEADER",
        dialogue: "Tama na ang labanan. Tanggapin natin ang alok nila para wala\nng buhay ang mawawala.",
        translation: "Enough of the fighting. Let's accept their offer so no more lives are lost.",
        characters: [
          {
            source: require("../../../../Character Images/Chapter 2/BoholanoRebelLeader.png"),
            position: "center"
          }
        ]
      },

      {
        text: "Ask for time to discuss the offer\nwith the community.",
        speaker: "REBEL LEADER",
        dialogue: "Bigyan ninyo kami ng panahon para pag-usapan muna ito\nbilang isang komunidad.",
        translation: "Give us time to discuss this as a community.",
        characters: [
          {
            source: require("../../../../Character Images/Chapter 2/BoholanoRebelLeader.png"),
            position: "center"
          }
        ]
      }
    ],

  },

  // CONTINUE


  {
    type: "narrator",
    text: "The community ends up choosing peace. Governor-General Ricafort pardons the\n19,420 people living in the mountain state.",
    background: require("../../../../Background Images/Part 2/bohol 19th century town plaza.png"),
    sfx: 'churchBell',
    unlock: ["Timeline_1829_08-31", "ricafort-2", "sanz-2", "dagohoy-4"]
  },

  {
    type: "narrator",
    text: "They resettle in lowland towns including Batuan, Cabulao, Catigbian, and Bilar.",
    background: require("../../../../Background Images/Part 2/bohol 19th century town plaza.png"),
    sfx: 'footstepsPavement'
  },

  {
    type: "scene",
    title: "After 85 years,",
    date: "the Dagohoy rebellion comes to an end.",
    background: require("../../../../Background Images/Usuals/Black Background.jpg"),
    sfx: 'churchBell'
  },

  {
    type: "decipher",
  },

  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // QUIZ TIME
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  {
    type: "scene",
    title: "Test Your Knowledge!",
    date: "How well do you remember Dagohoy's story?",
    background: require("../../../../Background Images/Usuals/Brown Background.jpg"),
    sfx: 'pagesFlipping'
  },

  {
    type: "quiz",
    question: "Why did Francisco Dagohoy begin his rebellion in 1744?",
    options: [
      "Spain refused to trade with Bohol",
      "His brother Sagarino was denied a proper burial",
      "The Spanish destroyed his mountain community",
      "He wanted to become governor of Bohol"
    ],
    correctIndex: 1,
    unlock: ["remnant-part2-1"]
  },
  {
    type: "quiz",
    question: "Where did Dagohoy and his followers establish their community?",
    options: [
      "Along the coast of Cebu",
      "In the mountains of Bohol",
      "Inside Manila",
      "On the island of Leyte"
    ],
    correctIndex: 1,
    unlock: ["remnant-part2-2"]
  },
  {
    type: "quiz",
    question: "About how large did Dagohoy's mountain community eventually become?",
    options: [
      "Around 3,000 people",
      "Around 10,000 people",
      "Around 20,000 people",
      "Around 50,000 people"
    ],
    correctIndex: 2,
    unlock: ["remnant-part2-3"]
  },
  {
    type: "quiz",
    question: "What happened when a Spanish expedition of 2,200 soldiers\nentered the mountains in 1827?",
    options: [
      "The Boholanos immediately surrendered",
      "The expedition withdrew after\na difficult standoff",
      "The community moved to Cebu",
      "Dagohoy signed a peace treaty with Spain"
    ],
    correctIndex: 1,
    unlock: ["remnant-part2-4"]
  },
  {
    type: "quiz",
    question: "How did the Dagohoy rebellion finally come to an end in 1829?",
    options: [
      "The Spanish captured every rebel leader",
      "The community accepted peace and was\ngranted a pardon",
      "The Boholanos left the Philippines",
      "The mountain community defeated the\nSpanish completely"
    ],
    correctIndex: 1,
    unlock: ["remnant-part2-5"]
  },
  // NEW QUESTION ADDED
  {
    type: "quiz",
    question: "Who led the final Spanish expedition of 6,000 soldiers that ended the Dagohoy rebellion?",
    options: [
      "Captain Manuel Sanz",
      "Governor-General Mariano Ricafort",
      "Father Gaspar Morales",
      "Miguel López de Legazpi"
    ],
    correctIndex: 0,
    unlock: ["remnant-part2-6"]
  },

  {
    type: "scene",
    title: "But the story of resistance is far from over.",
    date: " ",
    background: require("../../../../Background Images/Usuals/Black Background.jpg"),
    sfx: 'windyFlag'
  }

];