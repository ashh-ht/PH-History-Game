
export const Chapter1_Part7 = [

  // INTRO

  {
    type: "system",
    intro: true,
    text: "The Revolution had begun to divide against itself.",
    background: require("../../../../Background Images/Usuals/Black Background.jpg")
  },

  {
    type: "system",
    intro: true,
    text: "At Tejeros, a dispute over leadership would change the course of the Revolution.",
    background: require("../../../../Background Images/Usuals/Black Background.jpg")
  },

  // SCENE 1: THE TEJEROS CONVENTION

  {
    type: "scene",
    title: "The Tejeros Convention",
    date: "March 22, 1897",
    background: require("../../../../Background Images/Usuals/Black Background.jpg"),
    sfx: "chairSit"
  },

  {
    type: "narrator",
    text: "On March 22, 1897, revolutionary leaders gather at the Casa Hacienda\nin Tejeros, San Francisco de Malabon, Cavite.",
    background: require("../../../../Background Images/Part 7/Casa Hacienda Tejeros.png"),
    music: "suspense"
  },

  {
    type: "narrator",
    text: "The meeting is supposed to focus on the province's defense.\nInstead, the leaders decide to organize a central revolutionary government.",
    background: require("../../../../Background Images/Part 7/Casa Hacienda Tejeros.png")
  },

  {
    type: "narrator",
    text: "Bonifacio, the Supremo of the Katipunan, presides over the election.\nThe results bring a new government, but also deepen existing divisions.",
    background: require("../../../../Background Images/Part 7/Casa Hacienda Tejeros.png")
  },

  {
    type: "narrator",
    text: "Emilio Aguinaldo is elected President in absentia while he is away\nat the military front. Bonifacio is elected Director of the Interior.",
    background: require("../../../../Background Images/Part 7/Casa Hacienda Tejeros.png"),
    unlock: ["Timeline_1897_03-22", "aguinaldo-3"]
  },

  // Q1_7 HERE

  {
    type: "dialogue",
    speaker: "DANIEL TIRONA",
    characters: [
      {
        name: "DANIEL TIRONA",
        source: require("../../../../Character Images/Chapter 7/Tirona Mad.png"),
        position: "left"
      },
      {
        name: "ANDRÉS BONIFACIO",
        source: require("../../../../Character Images/Chapter 7/Bonifacio Neutral R.png"),
        position: "right"
      }
    ],
    text: "Hindi angkop na ang isang taong walang diploma ang mamuno sa\nKagawaran ng Interior. Dapat abogado ang humawak ng puwestong iyan!",
    translation: "Soemone with no diploma shouldn't lead the Department of the Interior. A lawyer should hold that position.",
    background: require("../../../../Background Images/Part 7/Casa Hacienda Tejeros.png"),
    unlock: ["tirona-2"]
  },

  {
    type: "dialogue",
    speaker: "DANIEL TIRONA",
    characters: [
      {
        name: "DANIEL TIRONA",
        source: require("../../../../Character Images/Chapter 7/Tirona Mad.png"),
        position: "left"
      },
      {
        name: "ANDRÉS BONIFACIO",
        source: require("../../../../Character Images/Chapter 7/Bonifacio Unsure R.png"),
        position: "right"
      }
    ],
    text: "Dapat abogado ang humawak ng puwestong iyan!",
    translation: "A lawyer should hold that position!",
    background: require("../../../../Background Images/Part 7/Casa Hacienda Tejeros.png")
  },

  // CHOICE 7.1

  {
    type: "choice",
    title: "Choice 7.1: You are Andrés Bonifacio",
    question: "Tirona has publicly challenged your qualifications.",
    background: require("../../../../Background Images/Part 7/Casa Hacienda Tejeros.png"),
    choices: [
      {
        text: "React strongly and declare\nthe election invalid.",
        speaker: "ANDRÉS BONIFACIO",
        dialogue: "Bilang Supremo ng Katipunan, ipinapawalang-bisa ko ang lahat\nng nangyari dito ngayon din!",
        translation: "As Supremo of the Katipunan, I declare everything that happened here today invalid.",
        characters: [
          {
            name: "DANIEL TIRONA",
            source: require("../../../../Character Images/Chapter 7/Tirona Mad.png"),
            position: "left"
          },
          {
            name: "ANDRÉS BONIFACIO",
            source: require("../../../../Character Images/Chapter 6/Bonifacio Talking Mad R.png"),
            position: "right"
          }
        ]
      },
      {
        text: "Demand that the issue\nbe settled fairly.",
        speaker: "ANDRÉS BONIFACIO",
        dialogue: "Kung hindi ako karapat-dapat, patunayan ninyo iyan sa isang tapat\nna botohan, hindi sa pang-iinsulto.",
        translation: "If I'm not qualified, prove it through a fair vote, not through insults.",
        characters: [
          {
            name: "DANIEL TIRONA",
            source: require("../../../../Character Images/Chapter 7/Tirona Mad.png"),
            position: "left"
          },
          {
            name: "ANDRÉS BONIFACIO",
            source: require("../../../../Character Images/Chapter 6/Bonifacio Talking R.png"),
            position: "right"
          }
        ]
      }
    ]
  },

  // Q2_7 HERE

  {
    type: "narrator",
    text: "The insult sparks a confrontation. Bonifacio declares the proceedings\nvoid and leaves with his supporters. The divide among the revolutionaries grows.",
    background: require("../../../../Background Images/Part 7/Casa Hacienda Tejeros.png")
  },

  // SCENE 2: THE ACTA DE TEJEROS

  {
    type: "scene",
    title: "The Acta de Tejeros",
    date: "March 23, 1897",
    background: require("../../../../Background Images/Usuals/Brown Background.jpg"),
    sfx: "chairSit"
  },

  {
    type: "narrator",
    text: "The following day, Bonifacio and his supporters meet again at Tejeros\nto formally record their objections to the election.",
    background: require("../../../../Background Images/Part 7/Aguinaldo's HQ exterior.png")
  },

  {
    type: "dialogue",
    speaker: "ANDRÉS BONIFACIO",
    characters: [
      {
        name: "ANDRÉS BONIFACIO",
        source: require("../../../../Character Images/Chapter 6/Bonifacio Talking.png"),
        position: "center"
      }
    ],
    text: "Isulat ninyo ito. Hindi namin kinikilala ang halalan kahapon.\nNaniniwala kaming may mga iregularidad sa proseso.",
    translation: "Write this down. We do not recognize yesterday's election. We believe there were irregularities in the process.",
    background: require("../../../../Background Images/Part 7/Aguinaldo's HQ exterior.png")
  },

  {
    type: "narrator",
    text: "The document becomes known as the Acta de Tejeros. Meanwhile,\nAguinaldo takes his oath of office at Tanza on March 23.",
    background: require("../../../../Background Images/Part 7/Tanza parish convent, night (oath-taking).png"),
    unlock: ["Timeline_1897_03-23", "trias-1", "ricarte-1"]
  },

  // Q3_7 HERE

  // CHOICE 7.2

  {
    type: "choice",
    title: "Choice 7.2: You are Artemio Ricarte",
    question: "You have concerns about the election, but Aguinaldo's new\ngovernment is moving forward.",
    background: require("../../../../Background Images/Part 7/Tanza parish convent, night (oath-taking).png"),
    choices: [
      {
        text: "Take the oath and work toward\nkeeping the revolution organized.",
        speaker: "ARTEMIO RICARTE",
        dialogue: "Susumpa ako at gagampanan ang aking tungkulin. Kailangan\npa rin nating ipagpatuloy ang pakikibaka.",
        translation: "I will take the oath and fulfill my duty. We still need to continue the struggle.",
        characters: [
          {
            name: "EMILIO AGUINALDO",
            source: require("../../../../Character Images/Chapter 7/Emilio Serious R.png"),
            position: "left"
          },
          {
            name: "ARTEMIO RICARTE",
            source: require("../../../../Character Images/Chapter 7/Ricarte.png"),
            position: "right"
          }
        ]
      },
      {
        text: "Refuse to accept the election\nand stand with Bonifacio.",
        speaker: "ARTEMIO RICARTE",
        dialogue: "Hindi ko maitatago ang aking mga pagdududa tungkol sa halalan.\nKailangan nating pag-isipan ang magiging bunga nito.",
        translation: "I cannot hide my doubts about the election. We need to consider its consequences.",
        characters: [
          {
            name: "EMILIO AGUINALDO",
            source: require("../../../../Character Images/Chapter 7/Emilio Serious R.png"),
            position: "left"
          },
          {
            name: "ARTEMIO RICARTE",
            source: require("../../../../Character Images/Chapter 7/Ricarte.png"),
            position: "right"
          }
        ]
      }
    ]
  },

  // T1_7 HERE

  {
    type: "narrator",
    text: "Ricarte takes the oath as Captain-General of the new revolutionary government.\nHowever, disagreement over the election continues among the revolutionaries.",
    background: require("../../../../Background Images/Part 7/Tanza parish convent, night (oath-taking).png"),
    unlock: ["ricarte-2"]
  },

  // SCENE 3: THE NAIC MILITARY AGREEMENT

  {
    type: "scene",
    title: "The Naic Military Agreement",
    date: "April 19, 1897",
    background: require("../../../../Background Images/Usuals/Brown Background.jpg"),
    sfx: "stampPapers"
  },

  {
    type: "narrator",
    text: "Bonifacio and his supporters move to Naic, Cavite, and continue\noperating independently of Aguinaldo's new government.",
    background: require("../../../../Background Images/Part 7/Naik camp (Bonifacio addresses loyalists).png"),
    unlock: ["Timeline_1897_03_Late", "bonifacio-6"]
  },

  {
    type: "narrator",
    text: "On April 19, Bonifacio and his supporters sign the Naic Military Agreement.\nThey organize their own military command under the Supremo's authority.",
    background: require("../../../../Background Images/Part 7/Naik camp (Bonifacio addresses loyalists).png"),
    unlock: ["Timeline_1897_04-19"]
  },

  {
    type: "dialogue",
    speaker: "ANDRÉS BONIFACIO",
    characters: [
      {
        name: "ANDRÉS BONIFACIO",
        source: require("../../../../Character Images/Chapter 6/Bonifacio Talking Mad.png"),
        position: "center"
      }
    ],
    text: "Hindi ko kinikilala ang halalang ito. Sa ilalim ng kasunduang ito,\nmagpapatuloy tayo sa pakikibaka ayon sa ating paninindigan.",
    translation: "I do not recognize this election. Under this agreement, we will continue the struggle according to our principles.",
    background: require("../../../../Background Images/Part 7/Naik camp (Bonifacio addresses loyalists).png")
  },

  {
    type: "narrator",
    text: "The agreement deepens the split between Bonifacio's supporters\nand Aguinaldo's government, making unity even harder to achieve.",
    background: require("../../../../Background Images/Part 7/Naik camp (Bonifacio addresses loyalists).png")
  },

  // SCENE 4: THE LIMBON CONFRONTATION

  {
    type: "scene",
    title: "The Limbon Confrontation",
    date: "April 28, 1897",
    background: require("../../../../Background Images/Usuals/Brown Background.jpg"),
    sfx: "marching"
  },

  {
    type: "narrator",
    text: "After the Naic agreement, Bonifacio's group moves to Limbon, Indang.\nAguinaldo sends soldiers under Colonel Agapito Bonzon to arrest him.",
    background: require("../../../../Background Images/Part 7/Limbon camp, Indang (Bonifacio captured).png")
  },

  {
    type: "narrator",
    text: "On April 28, the soldiers attack Bonifacio's camp. His brother Ciriaco is killed,\nand Andrés is wounded. Procopio and Gregoria de Jesús are also taken into custody.",
    background: require("../../../../Background Images/Part 7/Limbon camp, Indang (Bonifacio captured).png"),
    unlock: ["Timeline_1897_04-28", "gregoria-3"]
  },

  {
    type: "dialogue",
    speaker: "ANDRÉS BONIFACIO",
    characters: [
      {
        name: "ANDRÉS BONIFACIO",
        source: require("../../../../Character Images/Chapter 6/Bonifacio Sad.png"),
        position: "center"
      }
    ],
    text: "Mga kababayan... bakit umabot sa ganito ang ating pagkakahati?",
    translation: "My countrymen... why has our division come to this?",
    background: require("../../../../Background Images/Part 7/Limbon camp, Indang (Bonifacio captured).png")
  },

  {
    type: "narrator",
    text: "The conflict that began as a dispute over leadership has turned\ninto violence between revolutionary forces.",
    background: require("../../../../Background Images/Part 7/Limbon camp, Indang (Bonifacio captured).png"),
    unlock: ["tirona-3"]
  },

  // SCENE 5: THE TRIAL AT MARAGONDON

  {
    type: "scene",
    title: "The Trial at Maragondon",
    date: "Late April to May 1897",
    background: require("../../../../Background Images/Usuals/Brown Background.jpg"),
    sfx: "courtroom"
  },

  {
    type: "narrator",
    text: "Andrés and Procopio Bonifacio are brought before a military court\nat Maragondon, Cavite, under Aguinaldo's revolutionary government.",
    background: require("../../../../Background Images/Part 7/Maragondon court-martial room.png")
  },

  {
    type: "narrator",
    text: "The court finds both brothers guilty and sentences them to death.\nThe proceedings and the fairness of the trial remain controversial.",
    background: require("../../../../Background Images/Part 7/Maragondon court-martial room.png"),
    unlock: ["Timeline_1897_04-05", "noriel-1"]
  },

  {
    type: "narrator",
    text: "Aguinaldo commutes the death sentence to exile. Despite this decision,\nthe brothers are later taken away under armed guard.",
    background: require("../../../../Background Images/Part 7/Aguinaldo's HQ interior.png")
  },

  {
    type: "dialogue",
    speaker: "EMILIO AGUINALDO",
    characters: [
      {
        name: "EMILIO AGUINALDO",
        source: require("../../../../Character Images/Chapter 7/Emilio Serious R.png"),
        position: "center"
      }
    ],
    text: "Hindi ko nais na dumami pa ang dugong Pilipinong mabubuhos.",
    translation: "I do not want more Filipino blood to be spilled.",
    background: require("../../../../Background Images/Part 7/Aguinaldo's HQ interior.png")
  },

  {
    type: "dialogue",
    speaker: "EMILIO AGUINALDO",
    characters: [
      {
        name: "EMILIO AGUINALDO",
        source: require("../../../../Character Images/Chapter 7/Emilio Serious R.png"),
        position: "center"
      }
    ],
    text: "Ngunit ang pasya ng hukuman ay nagdulot ng matinding alitan.",
    translation: "But the court's decision has caused a deep conflict.",
    background: require("../../../../Background Images/Part 7/Aguinaldo's HQ interior.png")
  },

  // CHOICE 7.3

  {
    type: "choice",
    title: "Choice 7.3: You are Emilio Aguinaldo",
    question: "Your generals support the death sentence, but you have commuted it\nto exile. What will you do?",
    background: require("../../../../Background Images/Part 7/Aguinaldo's HQ interior.png"),
    choices: [
      {
        text: "Yield to the pressure\nfrom your military officers.",
        speaker: "EMILIO AGUINALDO",
        dialogue: "Hindi ko nais ang pasyang ito, ngunit susundin ko ang hinihingi\nng aking mga opisyal.",
        translation: "I do not want this decision, but I will follow what my officers demand.",
        characters: [
          {
            name: "EMILIO AGUINALDO",
            source: require("../../../../Character Images/Chapter 7/Emilio Serious R.png"),
            position: "center"
          }
        ]
      },
      {
        text: "Insist that the exile order\nbe respected.",
        speaker: "EMILIO AGUINALDO",
        dialogue: "Ipinag-utos ko na ang pagpapatapon. Dapat itong sundin upang\nmaiwasan ang higit pang pagdanak ng dugo.",
        translation: "I have ordered exile. That order must be followed to prevent further bloodshed.",
        characters: [
          {
            name: "EMILIO AGUINALDO",
            source: require("../../../../Character Images/Chapter 7/Emilio Serious R.png"),
            position: "center"
          }
        ]
      }
    ]
  },

  {
    type: "narrator",
    text: "Although Aguinaldo commutes the sentence, the order is not carried out.\nThe Bonifacio brothers are executed on May 10, 1897.",
    background: require("../../../../Background Images/Part 7/Maragondon court-martial room.png")
  },

  // SCENE 6: THE EXECUTION OF THE BONIFACIO BROTHERS

  {
    type: "scene",
    title: "The Execution of the Bonifacio Brothers",
    date: "May 10, 1897",
    background: require("../../../../Background Images/Usuals/Brown Background.jpg"),
    sfx: "groundThud"
  },

  {
    type: "narrator",
    text: "On May 10, 1897, Andrés and Procopio Bonifacio are taken to the mountains\nof Maragondon, Cavite, where they are executed.",
    background: require("../../../../Background Images/Part 7/Mount Buntis Maragondon.png")
  },

  {
    type: "narrator",
    text: "The death of Andrés Bonifacio, founder of the Katipunan, becomes one of\nthe darkest and most controversial events of the Philippine Revolution.",
    background: require("../../../../Background Images/Part 7/Mount Buntis Maragondon.png"),
    unlock: ["Timeline_1897_05-10", "bonifacio-7"]
  },

  {
    type: "system",
    intro: true,
    text: "The execution of Andrés and Procopio Bonifacio marks a dark moment in the Revolution.",
    background: require("../../../../Background Images/Usuals/Black Background.jpg"),
    sfx: "gunShot"
  },

  {
    type: "scene",
    title: "A Revolution Changed Forever",
    date: "May 10, 1897",
    background: require("../../../../Background Images/Usuals/Black Background.jpg")
  },

  // Q4_7 HERE

  {
    type: "whoSaidIt"
  },

  {
    type: "system",
    intro: true,
    text: "The Revolution continues under Aguinaldo, but the division\namong Filipino leaders has come at a great cost.",
    background: require("../../../../Background Images/Usuals/Black Background.jpg")
  },

  {
    type: "system",
    intro: true,
    text: "The fight for independence is not only a struggle against\nforeign rule. It is also a struggle to remain united.",
    background: require("../../../../Background Images/Usuals/Black Background.jpg")
  },

  // QUIZ TIME

  {
    type: "scene",
    title: "Test Your Knowledge!",
    date: "How well do you remember the struggle for leadership?",
    background: require("../../../../Background Images/Usuals/Brown Background.jpg")
  },

  {
    type: "quiz",
    question: "What was the main outcome of the Tejeros Convention?",
    options: [
      "It negotiated peace with Spain",
      "It organized a new revolutionary government",
      "It restored Spanish rule in Cavite",
      "It established the Katipunan"
    ],
    correctIndex: 1,
    unlock: ["remnant-part7-1"]
  },

  {
    type: "quiz",
    question: "Who was elected President at the Tejeros Convention?",
    options: [
      "Andrés Bonifacio",
      "Mariano Trías",
      "Emilio Aguinaldo",
      "Artemio Ricarte"
    ],
    correctIndex: 2,
    unlock: ["remnant-part7-2"]
  },

  {
    type: "quiz",
    question: "Why did Bonifacio object to the results of the Tejeros Convention?",
    options: [
      "He wanted to surrender to Spain",
      "He believed the proceedings were\nunfair and rejected their legitimacy",
      "He opposed independence",
      "He wanted to restore Spanish rule"
    ],
    correctIndex: 1,
    unlock: ["remnant-part7-3"]
  },

  {
    type: "quiz",
    question: "What was the Naic Military Agreement?",
    options: [
      "A peace treaty with Spain",
      "An agreement to recognize Spanish rule",
      "An agreement by Bonifacio to\norganize a separate military command",
      "A treaty between the\nMagdiwang and Spanish forces"
    ],
    correctIndex: 2,
    unlock: ["remnant-part7-4"]
  },

  {
    type: "quiz",
    question: "What happened to Bonifacio after the confrontation at Limbon?",
    options: [
      "He returned to Manila",
      "He was sent to Spain",
      "He was arrested and brought \nbefore a military court",
      "He became President of\nthe new government"
    ],
    correctIndex: 2,
    unlock: ["remnant-part7-5"]
  },

  {
    type: "quiz",
    question: "What happened to Andrés and Procopio Bonifacio on May 10, 1897?",
    options: [
      "They were exiled",
      "They escaped from Cavite",
      "They were executed in the\nmountains of Maragondon",
      "They surrendered\nto Spanish forces"
    ],
    correctIndex: 2,
    unlock: ["remnant-part7-6"]
  },

  {
    type: "quiz",
    question: "Where were the Bonifacio brothers tried and sentenced by the military court?",
    options: [
      "Tejeros",
      "Tanza",
      "Maragondon",
      "Naic"
    ],
    correctIndex: 2,
    unlock: ["remnant-part7-7"]
  },

  // CHAPTER COMPLETE

  {
    type: "scene",
    title: "Chapter Complete",
    date: "Bonifacio is gone, but the Revolution will continue.",
    background: require("../../../../Background Images/Usuals/Black Background.jpg")
  }

];
