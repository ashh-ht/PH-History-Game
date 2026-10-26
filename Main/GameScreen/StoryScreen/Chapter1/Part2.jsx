export const Chapter1_Part2 = [

  // ===========================================
  // SCENE 1: THE REFUSAL AT INABANGA
  // ===========================================

  {
    type: "scene",
    title: "The Refusal at Inabanga",
    date: "1744",
    background: require("../../../../Background Images/Usuals/Black Background.jpg"),
    sfx: 'churchBell',
  },

  {
    type: "narrator",
    text: "In 1744, Francisco Dagohoy loses his brother, Sagarino.",
    background: require("../../../../Background Images/Part 2/saint paul inabanga church exterior.png"),
    music: "grief",
    sfx: 'windyFlag',
    unlock: ["dagohoy-1"]
  },

  // SFX: church ambience, footsteps

  {
    type: "narrator",
    text: "Sagarino dies while carrying out a priest's orders.\nBut Father Gaspar Morales refuses him a proper burial.",
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
        name: "FRANCISCO DAGOHOY",
        source: require("../../../../Character Images/Chapter 2/Dagohoy Mad.png"),
        position: "left"
      },
      {
        name: "FATHER GASPAR MORALES",
        source: require("../../../../Character Images/Chapter 2/Morales.png"),
        position: "right"
      }
    ],
    text: "Padre, namatay ang aking kapatid habang tinutupad ang inyong utos."
  },

  {
    type: "dialogue",
    speaker: "FRANCISCO DAGOHOY",
    background: require("../../../../Background Images/Part 2/saint paul inabanga church interior.png"),
    characters: [
      {
        name: "FRANCISCO DAGOHOY",
        source: require("../../../../Character Images/Chapter 2/Dagohoy Mad.png"),
        position: "left"
      },
      {
        name: "FATHER GASPAR MORALES",
        source: require("../../../../Character Images/Chapter 2/Morales.png"),
        position: "right"
      }
    ],
    text: "Bakit ninyo siya pinagkakaitan ng tamang libing?",
    translation: "Why are you refusing him a proper burial?"
  },

  {
    type: "dialogue",
    speaker: "FATHER GASPAR MORALES",
    background: require("../../../../Background Images/Part 2/saint paul inabanga church interior.png"),
    characters: [
      {
        name: "FATHER GASPAR MORALES",
        source: require("../../../../Character Images/Chapter 2/Morales Talking.png"),
        position: "right"
      },
      {
        name: "FRANCISCO DAGOHOY",
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
        name: "FRANCISCO DAGOHOY",
        source: require("../../../../Character Images/Chapter 2/Dagohoy Mad.png"),
        position: "left"
      },
      {
        name: "FATHER GASPAR MORALES",
        source: require("../../../../Character Images/Chapter 2/Morales.png"),
        position: "right"
      }
    ],
    text: "Isinugal niya ang buhay niya para sa inyo!",
    translation: "He risked his life for you!"
  },

  {
    type: "dialogue",
    speaker: "FRANCISCO DAGOHOY",
    background: require("../../../../Background Images/Part 2/saint paul inabanga church interior.png"),
    characters: [
      {
        name: "FRANCISCO DAGOHOY",
        source: require("../../../../Character Images/Chapter 2/Dagohoy Mad.png"),
        position: "left"
      },
      {
        name: "FATHER GASPAR MORALES",
        source: require("../../../../Character Images/Chapter 2/Morales.png"),
        position: "right"
      }
    ],
    text: "Kung walang paggalang ang inyong simbahan sa mga tapat na lingkod,\Nbakit pa kami mananatiling tapat?",
    translation: "If your church cannot respect loyal servants, why should we remain loyal?",
    sfx: 'groundThud'
  },

  // CHOICE 2.1

  {
    type: "choice",
    title: "Choice 2.1: You are Francisco Dagohoy",
    question: "Your brother has been denied a proper burial. What will you do?",
    background: require("../../../../Background Images/Part 2/saint paul inabanga church interior.png"),

    choices: [
      {
        text: "Lead your people to the mountains.",
        speaker: "FRANCISCO DAGOHOY",
        dialogue: "Sobra na ang ginawa nila sa ating mga pamilya! Panahon na para magsimula tayo sa kabundukan.",
        translation: "They've done enough to our families. It's time to start anew in the mountains.",
        characters: [
          {
            name: "FRANCISCO DAGOHOY",
            source: require("../../../../Character Images/Chapter 2/Dagohoy Mad.png"),
            position: "center"
          }
        ]
      },

      {
        text: "Appeal to a higher church authority.",
        speaker: "FRANCISCO DAGOHOY",
        dialogue: "Makikipag-usap muna ako sa Obispo. Baka may magawa pa siya.",
        translation: "I'll speak to the Bishop first. Maybe he can still help.",
        characters: [
          {
            name: "FRANCISCO DAGOHOY",
            source: require("../../../../Character Images/Chapter 2/Dagohoy Done.png"),
            position: "center"
          }
        ]
      }
    ],
  },

  // SFX: footsteps, rustling leaves

  {
    type: "narrator",
    text: "No compromise is reached. Dagohoy leads about 3,000 Boholanos into the mountains.",
    background: require("../../../../Background Images/Part 2/Bohol highlands jungle pass.png"),
    sfx: 'footstepsGround',
    unlock: ["Timeline_1744", "dagohoy-2", "morales-3"]
  },

  // ===========================================
  // SCENE 2: FLIGHT TO THE MOUNTAINS
  // ===========================================

  {
    type: "scene",
    title: "Flight to the Mountains",
    date: "1744",
    background: require("../../../../Background Images/Usuals/Brown Background.jpg"),
    sfx: 'hiking'
  },

  {
    type: "narrator",
    text: "Far from Spanish control, the rebels build farms and a new home in the mountains.",
    background: require("../../../../Background Images/Part 2/Mountain settlement.png"),
    sfx: 'hammer'
  },

  // EXTRA CHOICE: SURVIVING IN THE MOUNTAINS
  // Uses existing background and character assets.

  {
    type: "choice",
    title: "Life in the Mountains",
    question: "Your people need food and protection. What should you focus on first?",
    background: require("../../../../Background Images/Part 2/Mountain settlement.png"),

    choices: [
      {
        text: "Grow food for the families.",
        speaker: "FRANCISCO DAGOHOY",
        dialogue: "Unahin natin ang pagkain. Walang dapat magutom sa ating komunidad.",
        translation: "Let's focus on food first. No one in our community should go hungry.",
        characters: [
          {
            name: "FRANCISCO DAGOHOY",
            source: require("../../../../Character Images/Chapter 2/Dagohoy Talking.png"),
            position: "center"
          }
        ]
      },

      {
        text: "Strengthen our defenses.",
        speaker: "FRANCISCO DAGOHOY",
        dialogue: "Patibayin natin ang mga harang. Dapat handa tayo sa anumang pag-atake.",
        translation: "Let's strengthen our barriers. We must be ready for any attack.",
        characters: [
          {
            name: "FRANCISCO DAGOHOY",
            source: require("../../../../Character Images/Chapter 2/Dagohoy Talking.png"),
            position: "center"
          }
        ]
      }
    ],
  },

  // SFX: marching, distant shouts

  {
    type: "narrator",
    text: "Spanish forces return to crush the rebellion. But the mountain community refuses to fall.",
    background: require("../../../../Background Images/Part 2/mountain fortress bamboo palisade.png")
  },

  // SFX: Fighting fighting

  {
    type: "narrator",
    text: "A fight ensues, and the mountain community refuses to fall.",
    background: require("../../../../Background Images/Part 2/mountain fortress bamboo palisade.png")
  },

  // SFX: gunshots, fighting, swords clashing
  // These are suggestions for a future audio pass.
  // Do not add them as sfx values unless the assets exist.

  {
    type: "scene",
    title: "The Unbroken Stronghold",
    date: "Late 18th Century – 1827",
    background: require("../../../../Background Images/Usuals/Brown Background.jpg"),
    sfx: 'pagesFlipping',
  },

  {
    type: "narrator",
    text: "Decades pass. The community grows from about 3,000 people to nearly 20,000.",
    background: require("../../../../Background Images/Part 2/Mountain settlement.png"),
    unlock: ["Timeline_1744-1828", "dagohoy-3"]
  },

  // SFX: marching, distant gunfire

  {
    type: "narrator",
    text: "Spanish expeditions attack again and again. Still, they fail to defeat the rebels.",
    background: require("../../../../Background Images/Part 2/mountain fortress bamboo palisade.png"),
    sfx: 'marching'
  },

  {
    type: "narrator",
    text: "Then, Spain faces another crisis: the British have taken Manila.",
    background: require("../../../../Background Images/Part 2/mountain fortress bamboo palisade.png"),
    sfx: 'quillWriting'
  },

  // CHOICE 2.2

  {
    type: "choice",
    title: "Choice 2.2: You are Francisco Dagohoy",
    question: "Spain is weakened. What should your community do?",
    background: require("../../../../Background Images/Part 2/mountain fortress bamboo palisade.png"),

    choices: [
      {
        text: "Protect the mountain community.",
        speaker: "FRANCISCO DAGOHOY",
        dialogue: "Hindi pa panahon para lumabas. Bantayan muna natin ang ating komunidad.",
        translation: "It's not time to leave yet. Let's protect our community first.",
        characters: [
          {
            name: "FRANCISCO DAGOHOY",
            source: require("../../../../Character Images/Chapter 2/Dagohoy Talking.png"),
            position: "center"
          }
        ]
      },

      {
        text: "Seek allies from nearby islands.",
        speaker: "FRANCISCO DAGOHOY",
        dialogue: "Magpadala tayo ng mga tagamasid sa Leyte at Cebu. Alamin natin kung may sasama sa atin.",
        translation: "Let's send scouts to Leyte and Cebu. We'll see if others will join us.",
        characters: [
          {
            name: "FRANCISCO DAGOHOY",
            source: require("../../../../Character Images/Chapter 2/Dagohoy Talking.png"),
            position: "center"
          }
        ]
      }
    ],
  },

  // SFX: footsteps, wind through trees

  {
    type: "narrator",
    text: "No large alliance forms. The Boholanos continue to defend their home on their own.",
    background: require("../../../../Background Images/Part 2/Mountain settlement.png"),
    sfx: 'windyFlag'
  },

  // SFX: marching, boots on rocky ground

  {
    type: "narrator",
    text: "In 1827, 2,200 Spanish soldiers march into the mountains to confront the rebels.",
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

  // SFX: gunshots, fighting, then silence

  {
    type: "narrator",
    text: "After a difficult standoff, the expedition withdraws. The Boholanos hold their ground.",
    background: require("../../../../Background Images/Part 2/mountain fortress bamboo palisade.png")
  },

  // ===========================================
  // SCENE 4: THE SANZ CAMPAIGN
  // ===========================================

  {
    type: "scene",
    title: "The Sanz Campaign & The Clemency",
    date: "1828–1829",
    background: require("../../../../Background Images/Usuals/Brown Background.jpg"),
    sfx: 'marching',
  },

  {
    type: "narrator",
    text: "Governor-General Mariano Ricafort sends Captain Manuel Sanz\nwith 6,000 soldiers to retake Bohol.",
    background: require("../../../../Background Images/Part 2/mountain fortress bamboo palisade.png"),
    sfx: 'cannonFire',
    unlock: ["sanz-1", "ricafort-1"]
    // SFX: marching, drums, soldiers assembling
  },

  {
    type: "narrator",
    text: "After 85 years of resistance, the rebels face a difficult choice: accept peace or keep fighting.",
    background: require("../../../../Background Images/Part 2/mountain fortress bamboo palisade.png")
  },

  // CHOICE 2.3

  {
    type: "choice",
    title: "Choice 2.3: You are a Boholano Rebel Leader",
    question: "Spain offers peace and a pardon. What will you choose?",
    background: require("../../../../Background Images/Part 2/mountain fortress bamboo palisade.png"),

    choices: [
      {
        text: "Accept peace to protect your people.",
        speaker: "FRANCISCO DAGOHOY",
        dialogue: "Tama na ang labanan. Tanggapin natin ang alok para wala nang buhay na mawala.",
        translation: "Enough fighting. Let's accept the offer so no more lives are lost.",
        characters: [
          {
            name: "FRANCISCO DAGOHOY",
            source: require("../../../../Character Images/Chapter 2/Dagohoy Talking.png"),
            position: "center"
          }
        ]
      },

      {
        text: "Ask for time to discuss the offer.",
        speaker: "FRANCISCO DAGOHOY",
        dialogue: "Bigyan ninyo kami ng panahon para pag-usapan ito bilang isang komunidad.",
        translation: "Give us time to discuss this as a community.",
        characters: [
          {
            name: "FRANCISCO DAGOHOY",
            source: require("../../../../Character Images/Chapter 2/Dagohoy Talking.png"),
            position: "center"
          }
        ]
      }
    ],
  },

  {
    type: "narrator",
    text: "In 1829, the rebellion ends. Ricafort pardons 19,420 people from the mountain community.",
    background: require("../../../../Background Images/Part 2/bohol 19th century town plaza.png"),
    sfx: 'churchBell',
    unlock: ["Timeline_1829_08-31", "ricafort-2", "sanz-2", "dagohoy-4"]
  },

  {
    type: "narrator",
    text: "They return to lowland towns, including Batuan, Cabulao, Catigbian, and Bilar.",
    background: require("../../../../Background Images/Part 2/bohol 19th century town plaza.png"),
    sfx: 'footstepsPavement'
  },

  {
    type: "scene",
    title: "After 85 Years",
    date: "The Dagohoy Rebellion Comes to an End",
    background: require("../../../../Background Images/Usuals/Black Background.jpg"),
    sfx: 'churchBell'
  },

  {
    type: "decipher",
  },

  // ===========================================
  // QUIZ TIME
  // ===========================================

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
    question: "Where did Dagohoy and his followers build their community?",
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
    question: "About how large did the community eventually become?",
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
    question: "What happened when 2,200 Spanish soldiers entered the mountains in 1827?",
    options: [
      "The Boholanos immediately surrendered",
      "The expedition withdrew after a difficult standoff",
      "The community moved to Cebu",
      "Dagohoy signed a peace treaty with Spain"
    ],
    correctIndex: 1,
    unlock: ["remnant-part2-4"]
  },

  {
    type: "quiz",
    question: "How did the rebellion end in 1829?",
    options: [
      "The Spanish captured every rebel leader",
      "The community accepted peace and received a pardon",
      "The Boholanos left the Philippines",
      "The mountain community defeated Spain completely"
    ],
    correctIndex: 1,
    unlock: ["remnant-part2-5"]
  },

  {
    type: "quiz",
    question: "Who led the final Spanish campaign?",
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
    title: "Chapter Complete",
    date: "The longest rebellion in Philippine history has ended.",
    background: require("../../../../Background Images/Usuals/Black Background.jpg")
  },

  {
    type: "scene",
    title: "But the story of resistance is far from over.",
    date: " ",
    background: require("../../../../Background Images/Usuals/Black Background.jpg"),
    sfx: 'windyFlag'
  }

];