export const Chapter1_Part2 = [

  {
    type: "scene",
    title: "The Refusal at Inabanga",
    date: "1744",
    background: require("../../../../Background Images/Usuals/Black Background.jpg")
  },

  {
    type: "narrator",
    text: "In 1744, Francisco Dagohoy loses his brother, Sagarino.",
    background: require("../../../../Background Images/Part 2/saint paul inabanga church exterior.png")
  },

  {
    type: "narrator",
    text: "Sagarino dies while carrying out a priest's orders, but Father\nGaspar Morales refuses to give him a proper burial.",
    background: require("../../../../Background Images/Part 2/saint paul inabanga church interior.png")
  },

  {
    type: "dialogue",
    speaker: "FRANCISCO DAGOHOY",
    background: require("../../../../Background Images/Part 2/saint paul inabanga church interior.png"),
    characters: [
      {
        source: require("../../../../Character Images/Temporary Placeholders/Dagohoy.png"),
        position: "left"
      }
    ],
    text: "Padre, pinatay po ang aking kapatid habang tinutupad ang inyong utos."
  },

  {
    type: "dialogue",
    speaker: "FRANCISCO DAGOHOY",
    background: require("../../../../Background Images/Part 2/saint paul inabanga church interior.png"),
    characters: [
      {
        source: require("../../../../Character Images/Temporary Placeholders/Dagohoy.png"),
        position: "left"
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
        source: require("../../../../Character Images/Temporary Placeholders/Morales.png"),
        position: "right"
      },
      {
        source: require("../../../../Character Images/Temporary Placeholders/Dagohoy.png"),
        position: "left"
      }
    ],
    text: "The rules of the Church do not bend, Cabeza. I cannot allow the burial."
  },

  {
    type: "dialogue",
    speaker: "FRANCISCO DAGOHOY",
    background: require("../../../../Background Images/Part 2/saint paul inabanga church interior.png"),
    characters: [
      {
        source: require("../../../../Character Images/Temporary Placeholders/Dagohoy.png"),
        position: "left"
      },
      {
        source: require("../../../../Character Images/Temporary Placeholders/Morales.png"),
        position: "right"
      }
    ],
    text: "Sinuway niya ang panganib para sa inyo!"
  },

  {
    type: "dialogue",
    speaker: "FRANCISCO DAGOHOY",
    background: require("../../../../Background Images/Part 2/saint paul inabanga church interior.png"),
    characters: [
      {
        source: require("../../../../Character Images/Temporary Placeholders/Dagohoy.png"),
        position: "left"
      },
      {
        source: require("../../../../Character Images/Temporary Placeholders/Morales.png"),
        position: "right"
      }
    ],
    text: "Kung wala man lang paggalang ang inyong simbahan para sa mga tapat\nna lingkod, hindi na kami dapat manatiling tapat!",
    translation: "If your church has no respect for a loyal servant, then we should not have to remain loyal."
  },

  //Q2_1 here

  {
    type: "choice",
    title: "Choice 2.1: You are Francisco Dagohoy",
    question: "Father Gaspar Morales has refused your brother a proper burial.",
    background: require("../../../../Background Images/Part 2/saint paul inabanga church interior.png"),
    choices: [
      {
        text: "Speak out and lead your people to the mountains.",
        speaker: "FRANCISCO DAGOHOY",
        dialogue: "Sobra na ang ginawa nila sa ating mga pamilya. Panahon na para umalis\ntayo at magsimula sa kabundukan.",
        translation: "They've done enough to our families. It's time for us to leave and start anew in the mountains.",
        characters: [
          {
            source: require("../../../../Character Images/Temporary Placeholders/Dagohoy.png"),
            position: "left"
          }
        ]
      },

      {
        text: "Appeal to a higher church authority first.",
        speaker: "FRANCISCO DAGOHOY",
        dialogue: "Makikipag-usap muna ako sa Obispo. Baka may magawa pa\nsiya tungkol dito.",
        translation: "I'll speak to the Bishop first. Maybe he can still do something about this.",
        characters: [
          {
            source: require("../../../../Character Images/Temporary Placeholders/Dagohoy.png"),
            position: "left"
          }
        ]
      }
    ],
    nextScene: 9
  },

  // CONTINUE

  {
    type: "narrator",
    text: "Dagohoy and about 3,000 Boholanos leave for the mountains. They\nwant to live free from Spanish control and forced labor.",
    background: require("../../../../Background Images/Part 2/Bohol highlands jungle pass.png")
  },

  //Q2_2 here

  {
    type: "scene",
    title: "Flight to the Mountains",
    date: "1744",
    background: require("../../../../Background Images/Usuals/Brown Background.jpg")
  },

  {
    type: "narrator",
    text: "The rebels build farms and form their own community in the mountains.",
    background: require("../../../../Background Images/Part 2/Mountain settlement.png")
  },

  {
    type: "narrator",
    text: "Their community grows. Spanish forces try again and again to\ndefeat them, but the rebels hold their ground.",
    background: require("../../../../Background Images/Part 2/mountain fortress bamboo palisade.png")
  },

  {
    type: "scene",
    title: "The Unbroken Stronghold",
    date: "Late 18th Century – 1827",
    background: require("../../../../Background Images/Usuals/Brown Background.jpg")
  },

  //T1_2 here

  {
    type: "narrator",
    text: "By 1827, Spanish forces still cannot defeat Dagohoy's movement. An expedition\nof 2,200 soldiers enters the mountains, but it eventually withdraws.",
    background: require("../../../../Background Images/Part 2/mountain fortress bamboo palisade.png")
  },

  {
    type: "choice",
    title: "Choice 2.2: You are Francisco Dagohoy",
    question: "Spain is weakened after the British take Manila.",
    background: require("../../../../Background Images/Part 2/mountain fortress bamboo palisade.png"),
    choices: [
      {
        text: "Stay focused on protecting your mountain community.",
        speaker: "FRANCISCO DAGOHOY",
        dialogue: "Hindi pa panahon para lumabas. Bantayan muna natin ang\nating komunidad.",
        translation: "It's not time to move yet. Let's protect our community first.",
        characters: [
          {
            source: require("../../../../Character Images/Temporary Placeholders/Dagohoy.png"),
            position: "left"
          }
        ]
      },

      {
        text: "Send scouts to see if other islands want to join you.",
        speaker: "FRANCISCO DAGOHOY",
        dialogue: "Magpadala tayo ng mga tagamasid sa Leyte at Cebu. Alamin natin\nkung handa silang sumama sa atin.",
        translation: "Let's send scouts to Leyte and Cebu. Let's see if they're willing to join us.",
        characters: [
          {
            source: require("../../../../Character Images/Temporary Placeholders/Dagohoy.png"),
            position: "left"
          }
        ]
      }
    ],
    nextScene: 16
  },

  // CONTINUE

  {
    type: "narrator",
    text: "The rebels receive no large alliance from other islands. They\ncontinue to defend their community on their own.",
    background: require("../../../../Background Images/Part 2/Mountain settlement.png")
  },

  //T3_2 here

  {
    type: "scene",
    title: "The Sanz Campaign & The Clemency",
    date: "1828–1829",
    background: require("../../../../Background Images/Usuals/Brown Background.jpg")
  },

  {
    type: "narrator",
    text: "In 1828, Governor-General Mariano Ricafort sends Captain Manuel\nSanz with 6,000 soldiers to regain control of Bohol.",
    background: require("../../../../Background Images/Part 2/mountain fortress bamboo palisade.png")
  },

  {
    type: "narrator",
    text: "By 1829, the long struggle has lasted about 85 years. The rebels\nmust decide whether to accept peace or keep fighting.",
    background: require("../../../../Background Images/Part 2/mountain fortress bamboo palisade.png")
  },

  //Q3_2 here

  {
    type: "choice",
    title: "Choice 2.3: You are a Boholano Rebel Leader",
    question: "In 1829, Captain Manuel Sanz's army arrives. After spending 85 years in the\nmountains, the Spanish offer peace and pardon or war.",
    background: require("../../../../Background Images/Part 2/mountain fortress bamboo palisade.png"),
    choices: [
      {
        text: "Accept the offer to spare your people from more fighting.",
        speaker: "REBEL LEADER",
        dialogue: "Tama na ang labanan. Tanggapin natin ang alok nila para wala ng buhay\nang mawawala.",
        translation: "Enough of the fighting. Let's accept their offer so no more lives are lost.",
        characters: [
          {
            source: require("../../../../Character Images/Temporary Placeholders/BoholanoRebelLeader.png"),
            position: "left"
          }
        ]
      },

      {
        text: "Ask for time to discuss the offer with the community.",
        speaker: "REBEL LEADER",
        dialogue: "Bigyan ninyo kami ng panahon para pag-usapan muna ito bilang\nisang komunidad.",
        translation: "Give us time to discuss this as a community.",
        characters: [
          {
            source: require("../../../../Character Images/Temporary Placeholders/BoholanoRebelLeader.png"),
            position: "left"
          }
        ]
      }
    ],
    nextScene: 21
  },

  // CONTINUE

  {
    type: "narrator",
    text: "The rebellion ends in 1829. Ricafort pardons 19,420 people\nliving in the mountain community. They return to lowland towns,\nincluding Batuan, Cabulao, Catigbian, and Bilar.",
    background: require("../../../../Background Images/Part 2/bohol 19th century town plaza.png")
  },

  {
    type: "system",
    intro: true,
    text: "Dagohoy's rebellion lasted about 85 years.",
    background: require("../../../../Background Images/Usuals/Black Background.jpg")
  },

  {
    type: "system",
    intro: true,
    text: "His story reminds us that people will fight to\nprotect their families, homes, and freedom.",
    background: require("../../../../Background Images/Usuals/Black Background.jpg")
  },

  {
    type: "scene",
    title: "Test Your Knowledge!",
    date: "How well do you remember Dagohoy's story?",
    background: require("../../../../Background Images/Usuals/Brown Background.jpg")
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
    correctIndex: 1
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
    correctIndex: 1
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
    correctIndex: 2
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
    correctIndex: 1
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
    correctIndex: 1
  },

  {
    type: "scene",
    title: "Chapter Complete.",
    date: "The longest rebellion in Philippine history has ended.",
    background: require("../../../../Background Images/Usuals/Black Background.jpg")
  },

  {
    type: "scene",
    title: "But the story of resistance is far from over.",
    date: " ",
    background: require("../../../../Background Images/Usuals/Black Background.jpg")
  },

];