
export const Chapter1_Part6 = [

  // INTRO

  {
    type: "system",
    intro: true,
    background: require("../../../../Background Images/Usuals/Black Background.jpg"),
    text: "The Revolution had begun, but the first battles came at a heavy cost."
  },

  {
    type: "system",
    intro: true,
    background: require("../../../../Background Images/Usuals/Black Background.jpg"),
    text: "As the fighting spread to Cavite, a new question emerged:\nwho would lead the Revolution?",
    sfx: "chairSit"
  },

  // SCENE 1: THE SWORD OF WAR

  {
    type: "scene",
    title: "The Sword of War",
    date: "August 24 to 30, 1896",
    background: require("../../../../Background Images/Usuals/Black Background.jpg"),
    sfx: "tar"
  },

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 6/San Mateo Rizal 1896 revolution.png"),
    text: "The Katipuneros face a powerful Spanish army.\nTheir first attacks have already brought heavy losses.",
    music: "war"
  },

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 6/San Mateo Rizal 1896 revolution.png"),
    text: "Governor-General Ramón Blanco places eight provinces under\na state of war. The struggle is spreading.",
    unlock: ["Timeline_1896_08-24", "Timeline_1896_08-29_30"],
    stopSfx: true
  },

  // T3_6 HERE

  // SCENE 2: THE RISE OF CAVITE

  {
    type: "scene",
    title: "The Rise of Cavite",
    date: "Autumn 1896",
    background: require("../../../../Background Images/Usuals/Brown Background.jpg"),
    sfx: "tar"
  },

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 6/Cavite revolution 1896 plaza.png"),
    text: "While Bonifacio's forces struggle near Manila, revolutionaries\nwin battles and capture Spanish positions in Cavite.",
    stopSfx: true
  },

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 6/Cavite revolution 1896 plaza.png"),
    text: "Their victories bring another problem into the open.\nWho should lead the revolutionary forces?",
    unlock: ["Timeline_1896_Autumn"]
  },

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 6/Magdiwang HQ (Noveleta), outside.png"),
    text: "Two factions rise in Cavite. The \"Magdiwang\", led by Mariano\nÁlvarez, remains closely aligned with Bonifacio.",
    unlock: ["alvarez-1"]
  },

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 6/Magdiwang HQ (Noveleta), outside.png"),
    text: "The \"Magdalo\", led by Baldomero Aguinaldo, gains influence\nas his cousin Emilio Aguinaldo's leadership grows.",
    unlock: ["aguinaldo-1", "aguinaldo-2"]
  },

  {
    type: "dialogue",
    speaker: "MARIANO ÁLVAREZ",
    background: require("../../../../Background Images/Part 6/Magdiwang HQ (Noveleta), inside.png"),
    characters: [
      {
        name: "MARIANO ÁLVAREZ",
        source: require("../../../../Character Images/Chapter 6/Alvarez Firm.png"),
        position: "center"
      }
    ],
    text: "Tell the Supremo that Cavite still stands with the Katipunan.\nWe may have our own forces, but we fight for the same cause.",
    unlock: ["alvarez-2"]
  },

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 6/Magdiwang HQ (Noveleta), outside.png"),
    text: "Both factions want independence. But as Spanish reinforcements\narrive, their rivalry makes cooperation harder."
  },

  // Q1_6 HERE

  // SCENE 3: REMEMBERING DR. JOSÉ RIZAL

  {
    type: "scene",
    title: "Remembering Dr. José Rizal",
    date: "December 30, 1896",
    background: require("../../../../Background Images/Usuals/Brown Background.jpg"),
    sfx: "footstepsGround"
  },

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 6/Rizal execution.png"),
    text: "José Rizal had been exiled to Dapitan in 1892. In 1896,\nhe was arrested while traveling to serve as a doctor in Cuba.",
    unlock: ["rizal-4"]
  },

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 6/Rizal execution.png"),
    text: "On December 30, 1896, Rizal is executed at Bagumbayan.\nHis death shocks Filipinos across the colony.",
    unlock: ["Timeline_1896_12-30", "rizal-5"]
  },

  {
    type: "dialogue",
    speaker: "DR. JOSÉ RIZAL",
    background: require("../../../../Background Images/Part 6/Rizal execution.png"),
    characters: [
      {
        name: "DR. JOSÉ RIZAL",
        source: require("../../../../Character Images/Chapter 6/Rizal Sad.png"),
        position: "center"
      }
    ],
    text: "Consummatum est.",
    translation: "It is finished.",
    sfx: "shoots"
  },

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 6/Rizal execution.png"),
    text: "Rizal's death becomes a powerful symbol in the growing\nstruggle against Spanish rule."
  },

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 6/Rizal execution.png"),
    text: "He is remembered each December 30 as a national hero\nand as a symbol of the Filipino people's fight for freedom."
  },

  // T4_6 HERE

  // MINI-GAME

  {
    type: "chronological"
  },

  // SCENE 4: THE NAIC LETTER

  {
    type: "scene",
    title: "The Naic Letter",
    date: "April 16 to 19, 1897",
    background: require("../../../../Background Images/Usuals/Brown Background.jpg"),
    sfx: "quillWriting"
  },

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 6/Naik camp hut interior.png"),
    text: "By April 1897, Bonifacio is in Cavite, where tensions between\nthe Magdiwang and Magdalo have grown into a serious conflict.",
    unlock: ["Timeline_1896_12-1897_Early", "bonifacio-5"]
  },

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 6/Naik camp hut interior.png"),
    text: "On April 16, Bonifacio writes to Emilio Jacinto about a reported\noffer of amnesty and the growing divisions among the revolutionaries."
  },

  {
    type: "dialogue",
    speaker: "ANDRÉS BONIFACIO",
    background: require("../../../../Background Images/Part 6/Naik camp hut interior.png"),
    characters: [
      {
        name: "ANDRÉS BONIFACIO",
        source: require("../../../../Character Images/Chapter 6/Bonifacio Neutral R.png"),
        position: "center"
      }
    ],
    text: "Emilio, may alok daw ng amnestiya. Pero kung pagsuko ang\nkapalit, hindi natin basta matatanggap iyon.",
    translation: "Emilio, there's supposedly an offer of amnesty. But if surrender is the price, we can't simply accept it."
  },

  // T5_6 HERE

  // CHOICE 6.1

  {
    type: "choice",
    title: "Choice 6.1: You are Emilio Aguinaldo",
    background: require("../../../../Background Images/Part 6/Naik camp hut interior.png"),
    question: "A Jesuit priest, Father Pio Pi, and Rafael Comenge reportedly\noffer amnesty to revolutionary leaders. How will you respond?",
    choices: [
      {
        text: "Consult the Magdiwang leaders first\nbefore deciding what to do.",
        speaker: "EMILIO AGUINALDO",
        characters: [
          {
            name: "EMILIO AGUINALDO",
            source: require("../../../../Character Images/Chapter 6/Emilio Reading.png"),
            position: "center"
          }
        ],
        dialogue: "Huwag muna tayong magpasya. Kailangan nating\nkumonsulta sa ibang pinuno bago kumilos.",
        translation: "Let us not decide yet. We need to consult the other leaders before acting."
      },

      {
        text: "Discuss the offer openly with Bonifacio\nand the other revolutionary leaders.",
        speaker: "EMILIO AGUINALDO",
        characters: [
          {
            name: "EMILIO AGUINALDO",
            source: require("../../../../Character Images/Chapter 6/Emilio Serious.png"),
            position: "center"
          }
        ],
        dialogue: "Hindi ako basta tatanggap ng alok. Kailangan nating\npag-usapan ang mga kondisyon nito.",
        translation: "I will not simply accept the offer. We need to discuss its conditions."
      }
    ]
  },

  // CONTINUE

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 6/Naik camp hut interior.png"),
    text: "The reported offer does not resolve the deeper conflict.\nThe revolutionary factions continue to pursue separate plans."
  },

  // Q2_6 HERE

  // SCENE 5: THE QUESTION OF LOYALTY

  {
    type: "scene",
    title: "The Question of Loyalty",
    date: "Early 1897",
    background: require("../../../../Background Images/Usuals/Brown Background.jpg"),
    sfx: "chairSit"
  },

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 6/Magdiwang HQ (Noveleta), outside.png"),
    text: "The leaders of Cavite struggle to establish a unified command.\nMariano Álvarez remains closely aligned with Bonifacio."
  },

  {
    type: "dialogue",
    speaker: "EMILIO AGUINALDO",
    background: require("../../../../Background Images/Part 6/Magdiwang HQ (Noveleta), inside.png"),
    characters: [
      {
        name: "EMILIO AGUINALDO",
        source: require("../../../../Character Images/Chapter 6/Emilio Serious.png"),
        position: "right"
      },
      {
        name: "MARIANO ÁLVAREZ",
        source: require("../../../../Character Images/Chapter 6/Alvarez Thoughtful.png"),
        position: "left"
      }
    ],
    text: "Kailangan natin ng iisang utos, Don Mariano.\nHindi tayo mananalo kung magkakanya-kanya tayo.",
    translation: "We need one command, Don Mariano. We won't win if we're divided."
  },

  {
    type: "dialogue",
    speaker: "MARIANO ÁLVAREZ",
    background: require("../../../../Background Images/Part 6/Magdiwang HQ (Noveleta), inside.png"),
    characters: [
      {
        name: "MARIANO ÁLVAREZ",
        source: require("../../../../Character Images/Chapter 6/Alvarez Firm.png"),
        position: "left"
      },
      {
        name: "EMILIO AGUINALDO",
        source: require("../../../../Character Images/Chapter 6/Emilio Serious.png"),
        position: "right"
      }
    ],
    text: "Ang aking utos ay galing sa Supremo. Hindi ako maaaring\nsumunod sa dalawang pinuno nang sabay.",
    translation: "My orders come from the Supremo. I can't follow two leaders at once."
  },

  // T1_6 HERE

  // CHOICE 6.2

  {
    type: "choice",
    title: "Choice 6.2: You are Mariano Álvarez",
    background: require("../../../../Background Images/Part 6/Magdiwang HQ (Noveleta), inside.png"),
    question: "Aguinaldo wants a unified command in Cavite,\nbut you remain loyal to Bonifacio.",
    choices: [
      {
        text: "Keep your forces under\nBonifacio's authority.",
        speaker: "MARIANO ÁLVAREZ",
        characters: [
          {
            name: "MARIANO ÁLVAREZ",
            source: require("../../../../Character Images/Chapter 6/Alvarez Firm.png"),
            position: "left"
          },
          {
            name: "EMILIO AGUINALDO",
            source: require("../../../../Character Images/Chapter 6/Emilio Serious.png"),
            position: "right"
          }
        ],
        dialogue: "Mananatili ako sa panig ng Supremo.\nHindi ko siya tatalikuran ngayon.",
        translation: "I will remain on the Supremo's side.\nI won't turn against him now."
      },

      {
        text: "Cooperate in battle without\ngiving up your command.",
        speaker: "MARIANO ÁLVAREZ",
        characters: [
          {
            name: "MARIANO ÁLVAREZ",
            source: require("../../../../Character Images/Chapter 6/Alvarez Firm.png"),
            position: "left"
          },
          {
            name: "EMILIO AGUINALDO",
            source: require("../../../../Character Images/Chapter 6/Emilio Serious.png"),
            position: "right"
          }
        ],
        dialogue: "Maaari tayong magtulungan sa labanan, pero mananatili\nsa akin ang aking mga tauhan.",
        translation: "We can fight together, but my men will remain under my command."
      }
    ]
  },

  // CONTINUE

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 6/Magdiwang HQ (Noveleta), outside.png"),
    text: "The factions sometimes cooperate, but their disagreement\nover leadership remains unresolved."
  },

  // SCENE 6: THE BREAKING POINT IN CAVITE

  {
    type: "scene",
    title: "The Breaking Point in Cavite",
    date: "Early 1897",
    background: require("../../../../Background Images/Usuals/Brown Background.jpg"),
    sfx: "tar"
  },

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 6/st augustine church tanza (surrender scene).png"),
    text: "Spanish forces advance through Cavite. Revolutionary fighters\nface dwindling supplies, exhaustion, and internal divisions.",
    stopSfx: true
  },

  {
    type: "dialogue",
    speaker: "DANIEL TIRONA",
    background: require("../../../../Background Images/Part 6/st augustine church tanza (surrender scene).png"),
    characters: [
      {
        name: "DANIEL TIRONA",
        source: require("../../../../Character Images/Chapter 6/Tirona R.png"),
        position: "center"
      }
    ],
    text: "Wala na tayong sapat na armas. Kung magpapatuloy\ntayo, baka lalo lang tayong malugi.",
    translation: "We don't have enough weapons. If we keep going, we may only lose more.",
    unlock: ["tirona-1"]
  },

  // CHOICE 6.3

  {
    type: "choice",
    title: "Choice 6.3: You are Daniel Tirona",
    background: require("../../../../Background Images/Part 6/st augustine church tanza (surrender scene).png"),
    question: "Spanish forces are pushing deeper into Cavite.\nYour men are exhausted and short on weapons.",
    choices: [
      {
        text: "Withdraw and save the\nmen who are left.",
        speaker: "DANIEL TIRONA",
        characters: [
          {
            name: "DANIEL TIRONA",
            source: require("../../../../Character Images/Chapter 6/Tirona Mad.png"),
            position: "center"
          }
        ],
        dialogue: "Ilayo muna natin ang mga tauhan sa panganib.\nHindi ko hahayaang mamatay pa ang mga natitira.",
        translation: "Let us move the men out of danger. I won't let the men who remain die."
      },

      {
        text: "Hold your position a little\nlonger and look for a way out.",
        speaker: "DANIEL TIRONA",
        characters: [
          {
            name: "DANIEL TIRONA",
            source: require("../../../../Character Images/Chapter 6/Tirona Mad.png"),
            position: "center"
          }
        ],
        dialogue: "Maghintay pa tayo nang kaunti. Baka makahanap pa tayo\nng paraan para makaalis.",
        translation: "Let's hold on a little longer. We may still find a way out."
      }
    ]
  },

  // CONTINUE

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 6/st augustine church tanza (surrender scene).png"),
    text: "The situation grows more desperate. The revolutionaries must\nface both the Spanish army and divisions within their ranks."
  },

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 6/Cavite revolution 1896 plaza.png"),
    text: "The Revolution has survived its first months, but defeating Spain\nis only one challenge. Who will lead the movement forward?"
  },

  {
    type: "scene",
    title: "One Revolution, Divided Leadership",
    date: "The struggle continues.",
    background: require("../../../../Background Images/Usuals/Black Background.jpg")
  },

  {
    type: "system",
    intro: true,
    background: require("../../../../Background Images/Usuals/Black Background.jpg"),
    text: "The revolutionaries share one goal, but they do not agree on who should lead."
  },

  {
    type: "system",
    intro: true,
    background: require("../../../../Background Images/Usuals/Black Background.jpg"),
    text: "Their next meeting will change the course of the Revolution."
  },

  // QUIZ TIME

  {
    type: "scene",
    title: "Test Your Knowledge!",
    date: "How well do you remember the Revolution's early months?",
    background: require("../../../../Background Images/Usuals/Brown Background.jpg")
  },

  {
    type: "quiz",
    question: "Which province became a major center of revolutionary victories in late 1896?",
    options: [
      "Cavite",
      "Cebu",
      "Leyte",
      "Ilocos"
    ],
    correctIndex: 0,
    unlock: ["remnant-part6-1"]
  },

  {
    type: "quiz",
    question: "What were the two main factions that emerged in Cavite?",
    options: [
      "Katipon and Kawal",
      "Magdiwang and Magdalo",
      "La Liga and Katipunan",
      "Cavite and Manila"
    ],
    correctIndex: 1,
    unlock: ["remnant-part6-2"]
  },

  {
    type: "quiz",
    question: "What happened to José Rizal on December 30, 1896?",
    options: [
      "He escaped from Dapitan",
      "He joined the Katipunan",
      "He was executed at Bagumbayan",
      "He became a revolutionary commander"
    ],
    correctIndex: 2,
    unlock: ["remnant-part6-3"]
  },

  {
    type: "quiz",
    question: "Why did the rivalry between the Magdiwang and Magdalo become a problem?",
    options: [
      "They disagreed over who should lead\nthe revolutionary forces",
      "They wanted to abandon the Revolution",
      "They were fighting over control of Manila",
      "They refused to fight Spain"
    ],
    correctIndex: 0,
    unlock: ["remnant-part6-4"]
  },

  {
    type: "quiz",
    question: "What major problem faced the revolutionaries as Spanish forces advanced?",
    options: [
      "They had too many weapons",
      "They had no support from Cavite",
      "They faced military pressure, shortages,\nand divisions over leadership",
      "They had already defeated Spain"
    ],
    correctIndex: 2,
    unlock: ["remnant-part6-5"]
  },

  {
    type: "quiz",
    question: "Who led the Magdiwang faction in Cavite?",
    options: [
      "Emilio Aguinaldo",
      "Baldomero Aguinaldo",
      "Mariano Álvarez",
      "Daniel Tirona"
    ],
    correctIndex: 2,
    unlock: ["remnant-part6-6"]
  },

  // ENDING

  {
    type: "scene",
    title: "Chapter Complete.",
    date: "The Revolution was under pressure from within and without.",
    background: require("../../../../Background Images/Usuals/Black Background.jpg")
  },

  {
    type: "scene",
    title: "Soon, the question of leadership would be decided.",
    date: " ",
    background: require("../../../../Background Images/Usuals/Black Background.jpg")
  }

];
