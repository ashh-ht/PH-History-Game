export const Chapter1_Part6 = [

  {
    type: "scene",
    title: "The Sword of War",
    date: "August 24–30, 1896",
    background: require("../../../../Background Images/Usuals/Black Background.jpg")
  },

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 6/San Mateo Rizal 1896 revolution.png"),
    text: "The Revolution has begun, but the Katipuneros face a powerful\nSpanish army. Their early attacks have brought heavy losses."
  },

  //T3_6 here

  {
    type: "scene",
    title: "The Rise of Cavite",
    date: "Autumn 1896",
    background: require("../../../../Background Images/Usuals/Brown Background.jpg")
  },

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 6/Cavite revolution 1896 plaza.png"),
    text: "While Bonifacio's forces struggle near Manila,\nFilipino revolutionaries win battles in Cavite."
  },

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 6/Magdiwang HQ (Noveleta), outside.png"),
    text: "Two groups gain influence. The Magdiwang is led by Mariano\nÁlvarez, while the Magdalo is led by Baldomero Aguinaldo and\nsupports Emilio Aguinaldo's growing leadership."
  },

  {
    type: "dialogue",
    speaker: "MARIANO ÁLVAREZ",
    background: require("../../../../Background Images/Part 6/Magdiwang HQ (Noveleta), inside.png"),
    characters: [
      {
        source: require("../../../../Character Images/Temporary Placeholders/Alvarez.png"),
        position: "center"
      }
    ],
    text: "Tell the Supremo that Cavite still stands with the Katipunan. We may have\nour own forces here, but we fight for the same cause."
  },

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 6/Magdiwang HQ (Noveleta), outside.png"),
    text: "Both groups want independence, but they disagree\nabout who should lead the Revolution."
  },

  //Q1_6 here

  {
    type: "scene",
    title: "Remembering Dr. José Rizal",
    date: "December 30, 1896",
    background: require("../../../../Background Images/Usuals/Brown Background.jpg")
  },

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 6/Rizal execution.png"),
    text: "On December 30, 1896, José Rizal is executed at Bagumbayan. His death\nshocks Filipinos and strengthens the desire for freedom."
  },

  {
    type: "dialogue",
    speaker: "DR. JOSÉ RIZAL",
    background: require("../../../../Background Images/Part 6/Rizal execution.png"),
    characters: [
      {
        source: require("../../../../Character Images/Temporary Placeholders/Rizal.png"),
        position: "center"
      }
    ],
    text: "Consummatum est.",
    translation: "It is finished."
  },

  {
    type: "system",
    background: require("../../../../Background Images/Part 6/Rizal execution.png"),
    text: "Rizal's death becomes an important symbol in the fight against Spanish rule."
  },

  //T4_6 here

  {
    type: "scene",
    title: "The Naic Letter",
    date: "Early 1897",
    background: require("../../../../Background Images/Usuals/Brown Background.jpg")
  },

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 6/Naik camp hut interior.png"),
    text: "In early 1897, the revolutionary leaders face growing pressure from Spain.\nOffers of pardon and negotiations create more disagreements."
  },

  {
    type: "dialogue",
    speaker: "ANDRÉS BONIFACIO",
    background: require("../../../../Background Images/Part 6/Naik camp hut interior.png"),
    characters: [
      {
        source: require("../../../../Character Images/Temporary Placeholders/Bonifacio.png"),
        position: "right"
      }
    ],
    text: "Emilio, may alok daw ng amnestiya. Pero kung pagsuko ang kapalit,\nhindi natin basta matatanggap iyon.",
    translation: "Emilio, there's supposedly an offer of amnesty. But if surrender is the price,\nwe can't simply accept it."
  },

  //T5_6 here

  {
    type: "choice",
    title: "Choice 6.1: You are Emilio Aguinaldo",
    question: "Father Pio Pi offers a full pardon if you surrender, but you want to know\nwhether real terms can be negotiated.",
    background: require("../../../../Background Images/Part 6/Naik camp hut interior.png"),
    choices: [
      {
        text: "Contact the Magdiwang leaders first without telling Bonifacio.",
        speaker: "EMILIO AGUINALDO",
        characters: [
          {
            source: require("../../../../Character Images/Temporary Placeholders/Aguinaldo.png"),
            position: "right"
          }
        ],
        dialogue: "Huwag munang sabihin kay Bonifacio. Kailangan nating maghanda,\nhindi lamang siya.",
        translation: "Don't tell Bonifacio yet. We need to prepare too, not just him."
      },

      {
        text: "Bring the offer to Bonifacio and discuss it openly.",
        speaker: "EMILIO AGUINALDO",
        characters: [
          {
            source: require("../../../../Character Images/Temporary Placeholders/Aguinaldo.png"),
            position: "right"
          }
        ],
        dialogue: "Hindi ako makikipagkasundo nang lihim, Supremo. Ito ang alok nila.\nPag-usapan natin.",
        translation: "I won't make a secret deal, Supremo. Here's their offer. Let's discuss it."
      }
    ],
    nextScene: 15
  },

  // CONTINUE

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 6/Naik camp hut interior.png"),
    text: "The offer does not solve the conflict between the revolutionary\nleaders. Their groups continue to build separate centers of power."
  },

  //Q2_6 here

  {
    type: "scene",
    title: "The Question of Loyalty",
    date: "Early 1897",
    background: require("../../../../Background Images/Usuals/Brown Background.jpg")
  },

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 6/Magdiwang HQ (Noveleta), outside.png"),
    text: "Aguinaldo wants the revolutionary forces in Cavite to follow one\ncommand. Mariano Álvarez remains loyal to Bonifacio."
  },

  {
    type: "dialogue",
    speaker: "EMILIO AGUINALDO",
    background: require("../../../../Background Images/Part 6/Magdiwang HQ (Noveleta), inside.png"),
    characters: [
      {
        source: require("../../../../Character Images/Temporary Placeholders/Aguinaldo.png"),
        position: "left"
      }
    ],
    text: "Kailangan natin ng iisang utos, Don Mariano. Hindi tayo mananalo\nkung magkakanya-kanya tayo.",
    translation: "We need one command, Don Mariano. We won't win if we're divided."
  },

  {
    type: "dialogue",
    speaker: "MARIANO ÁLVAREZ",
    background: require("../../../../Background Images/Part 6/Magdiwang HQ (Noveleta), inside.png"),
    characters: [
      {
        source: require("../../../../Character Images/Temporary Placeholders/Alvarez.png"),
        position: "right"
      }
    ],
    text: "Ang aking utos ay galing sa Supremo. Hindi ako maaaring sumunod sa\ndalawang pinuno nang sabay.",
    translation: "My orders come from the Supremo. I can't follow two leaders at once."
  },

  //T1_6 here

  {
    type: "choice",
    title: "Choice 6.2: You are Mariano Álvarez",
    question: "Aguinaldo wants a unified command in Cavite, but you remain loyal to Bonifacio.",
    background: require("../../../../Background Images/Part 6/Magdiwang HQ (Noveleta), inside.png"),
    choices: [
      {
        text: "Keep your forces under Bonifacio's authority.",
        speaker: "MARIANO ÁLVAREZ",
        characters: [
          {
            source: require("../../../../Character Images/Temporary Placeholders/Alvarez.png"),
            position: "right"
          }
        ],
        dialogue: "Mananatili ako sa panig ng Supremo. Hindi ko siya tatalikuran ngayon.",
        translation: "I will remain on the Supremo's side. I won't turn against him now."
      },

      {
        text: "Agree to cooperate in battle without giving up your command.",
        speaker: "MARIANO ÁLVAREZ",
        characters: [
          {
            source: require("../../../../Character Images/Temporary Placeholders/Alvarez.png"),
            position: "right"
          }
        ],
        dialogue: "Maaari tayong magtulungan sa labanan, pero mananatili sa akin\nang aking mga tauhan.",
        translation: "We can fight together, but my men will remain under my command."
      }
    ],
    nextScene: 21
  },

  // CONTINUE

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 6/Magdiwang HQ (Noveleta), outside.png"),
    text: "The groups sometimes cooperate, but their disagreement over leadership remains."
  },

  {
    type: "scene",
    title: "The Breaking Point in Tanza",
    date: "Early 1897",
    background: require("../../../../Background Images/Usuals/Brown Background.jpg")
  },

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 6/st augustine church tanza (surrender scene).png"),
    text: "Spanish forces continue advancing through Cavite. The revolutionaries struggle with a\nlack of weapons, tired soldiers, and disagreements among their leaders."
  },

  {
    type: "dialogue",
    speaker: "DANIEL TIRONA",
    background: require("../../../../Background Images/Part 6/st augustine church tanza (surrender scene).png"),
    characters: [
      {
        source: require("../../../../Character Images/Temporary Placeholders/Tirona.png"),
        position: "left"
      }
    ],
    text: "Wala na tayong sapat na armas. Kung magpapatuloy tayo, baka\nlalo lang tayong malugi.",
    translation: "We don't have enough weapons. If we keep going, we may only lose more."
  },

  {
    type: "choice",
    title: "Choice 6.3: You are Daniel Tirona",
    question: "Spanish forces are pushing deeper into Cavite.\nYour men are exhausted and short on weapons.",
    background: require("../../../../Background Images/Part 6/st augustine church tanza (surrender scene).png"),
    choices: [
      {
        text: "Surrender and save the men who are left.",
        speaker: "DANIEL TIRONA",
        characters: [
          {
            source: require("../../../../Character Images/Temporary Placeholders/Tirona.png"),
            position: "right"
          }
        ],
        dialogue: "Ibaba na natin ang mga armas. Hindi ko hahayaang mamatay\npa ang mga natitira.",
        translation: "Lay down your weapons. I won't let the men who remain die."
      },

      {
        text: "Hold your position a little longer and look for a way out.",
        speaker: "DANIEL TIRONA",
        characters: [
          {
            source: require("../../../../Character Images/Temporary Placeholders/Tirona.png"),
            position: "right"
          }
        ],
        dialogue: "Maghintay pa tayo nang kaunti. Baka makahanap pa tayo\nng paraan para makaalis.",
        translation: "Let's hold on a little longer. We may still find a way out."
      }
    ],
    nextScene: 26
  },

  // CONTINUE

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 6/Cavite revolution 1896 plaza.png"),
    text: "The Revolution faces two challenges: defeating\nSpain and keeping its own leaders united."
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
    correctIndex: 0
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
    correctIndex: 1
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
    correctIndex: 2
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
    correctIndex: 0
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
    correctIndex: 2
  },

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
  },

];