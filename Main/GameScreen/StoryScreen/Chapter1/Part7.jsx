export const Chapter1_Part7 = [

  {
    type: "scene",
    title: "The Tejeros Convention",
    background: require("../../../../Background Images/Usuals/Black Background.jpg")
  },

  {
    type: "narrator",
    text: "On March 22, 1897, revolutionary leaders meet at Tejeros to discuss the defense of\nCavite. Instead, they hold an election for a new revolutionary government.",
    background: require("../../../../Background Images/Part 7/Casa Hacienda Tejeros.png")
  },

  {
    type: "narrator",
    text: "Emilio Aguinaldo is elected president. Bonifacio\nis elected Director of the Interior.",
    background: require("../../../../Background Images/Part 7/Casa Hacienda Tejeros.png")
  },

  // Q1_7 here

  {
    type: "dialogue",
    speaker: "DANIEL TIRONA",
    characters: [
      {
        source: require("../../../../Character Images/Temporary Placeholders/Tirona.png"),
        position: "left"
      }
    ],
    text: "Hindi angkop na ang isang taong walang diploma ang mamuno sa\nKagawaran ng Interior. Dapat abogado ang humawak ng puwestong iyan!",
    translation: "It isn't appropriate for someone without a diploma to lead the Department of the Interior.\nA lawyer should hold that position.",
    background: require("../../../../Background Images/Part 7/Casa Hacienda Tejeros.png")
  },

  {
    type: "choice",
    title: "Choice 7.1: You are Andrés Bonifacio",
    question: "Tirona has publicly challenged your qualifications.",
    background: require("../../../../Background Images/Part 7/Casa Hacienda Tejeros.png"),
    choices: [
      {
        text: "React strongly and declare the election invalid.",
        speaker: "ANDRÉS BONIFACIO",
        dialogue: "<i>slams table</i> Bilang Supremo ng Katipunan, ipinapawalang-bisa ko ang lahat\nng nangyari dito ngayon din!",
        translation: "As Supremo of the Katipunan, I declare everything that happened here today invalid.",
        characters: [
          {
            source: require("../../../../Character Images/Temporary Placeholders/Bonifacio.png"),
            position: "right"
          }
        ]
      },

      {
        text: "Demand that the issue be settled fairly.",
        speaker: "ANDRÉS BONIFACIO",
        dialogue: "Kung hindi ako karapat-dapat, patunayan ninyo iyan sa isang tapat\nna botohan, hindi sa pang-iinsulto.",
        translation: "If I'm not qualified, prove it through a fair vote, not through insults.",
        characters: [
          {
            source: require("../../../../Character Images/Temporary Placeholders/Bonifacio.png"),
            position: "right"
          }
        ]
      }
    ],
    nextScene: 5
  },

  // Q2_7 here

  // CONTINUE

  {
    type: "narrator",
    text: "Bonifacio objects to the election after Tirona questions his qualifications.\nThe disagreement deepens the division among the revolutionaries.",
    background: require("../../../../Background Images/Part 7/Casa Hacienda Tejeros.png")
  },

  {
    type: "scene",
    title: "The Annulment",
    date: "March 23, 1897",
    background: require("../../../../Background Images/Usuals/Brown Background.jpg")
  },

  {
    type: "narrator",
    text: "The next day, Bonifacio rejects the election results. Aguinaldo and\nother officials continue organizing the new government.",
    background: require("../../../../Background Images/Part 7/Aguinaldo's HQ exterior.png")
  },

  {
    type: "dialogue",
    speaker: "ANDRÉS BONIFACIO",
    characters: [
      {
        source: require("../../../../Character Images/Temporary Placeholders/Bonifacio.png"),
        position: "right"
      }
    ],
    text: "Isulat ninyo ito. Hindi totoo ang halalan kahapon. Hindi nito kinatawan ang\ntunay na kalooban ng mga narito.",
    translation: "Write this down. Yesterday's election was not legitimate. It did not represent the true will of those gathered here.",
    background: require("../../../../Background Images/Part 7/Aguinaldo's HQ exterior.png")
  },

  {
    type: "narrator",
    text: "Artemio Ricarte later takes his oath of office,\ndespite his concerns about the election.",
    background: require("../../../../Background Images/Part 7/Tanza parish convent, night (oath-taking).png")
  },

  //Q3_7 here

  {
    type: "choice",
    title: "Choice 7.2: You are Artemio Ricarte",
    question: "You have doubts about the election, but Aguinaldo's new\ngovernment is moving forward.",
    background: require("../../../../Background Images/Part 7/Tanza parish convent, night (oath-taking).png"),
    choices: [
      {
        text: "Take the oath, but record your concerns.",
        speaker: "ARTEMIO RICARTE",
        dialogue: "Susumpa ako dahil kinakailangan. Ngunit isusulat ko ang\naking mga nakita at narinig.",
        translation: "I will take the oath because it is necessary. But I will write down what I saw and heard.",
        characters: [
          {
            source: require("../../../../Character Images/Temporary Placeholders/Ricarte.png"),
            position: "right"
          }
        ]
      },

      {
        text: "Refuse the oath and stand with Bonifacio.",
        speaker: "ARTEMIO RICARTE",
        dialogue: "Hindi ko masusuportahan ang halalang may ganitong mga pagdududa.",
        translation: "I cannot support an election surrounded by these doubts.",
        characters: [
          {
            source: require("../../../../Character Images/Temporary Placeholders/Ricarte.png"),
            position: "right"
          }
        ]
      }
    ],
    nextScene: 11
  },

  // T1_7 here

  // CONTINUE

  {
    type: "narrator",
    text: "Ricarte ultimately takes the oath and later records his account of what\nhappened. Aguinaldo's new government continues to organize the revolution.",
    background: require("../../../../Background Images/Part 7/Tanza parish convent, night (oath-taking).png")
  },

  {
    type: "scene",
    title: "The Naic Agreement",
    date: "April 1897",
    background: require("../../../../Background Images/Usuals/Brown Background.jpg")
  },

  {
    type: "narrator",
    text: "Bonifacio and his supporters move to Naic and continue operating under their\nown leadership. Aguinaldo's group sees this as a threat to unity.",
    background: require("../../../../Background Images/Part 7/Naik camp (Bonifacio addresses loyalists).png")
  },

  {
    type: "dialogue",
    speaker: "ANDRÉS BONIFACIO",
    characters: [
      {
        source: require("../../../../Character Images/Temporary Placeholders/Bonifacio.png"),
        position: "right"
      }
    ],
    text: "Hindi ko tatanggapin ang isang halalang hindi tapat.\nDito, ipagpapatuloy natin ang laban.",
    translation: "I will not accept an election I do not consider fair. Here, we will continue the fight.",
    background: require("../../../../Background Images/Part 7/Naik camp (Bonifacio addresses loyalists).png")
  },

  {
    type: "scene",
    title: "The Limbon Confrontation",
    date: "April 1897",
    background: require("../../../../Background Images/Usuals/Brown Background.jpg")
  },

  {
    type: "narrator",
    text: "In April 1897, Aguinaldo's soldiers find Bonifacio's\ngroup at Limbon. A violent confrontation follows.",
    background: require("../../../../Background Images/Part 7/Limbon camp, Indang (Bonifacio captured).png")
  },

  {
    type: "narrator",
    text: "Bonifacio's brother Ciriaco is killed, and Andrés,\nProcopio, and Gregoria are taken into custody.",
    background: require("../../../../Background Images/Part 7/Limbon camp, Indang (Bonifacio captured).png")
  },

  {
    type: "dialogue",
    speaker: "ANDRÉS BONIFACIO",
    characters: [
      {
        source: require("../../../../Character Images/Temporary Placeholders/Bonifacio.png"),
        position: "right"
      }
    ],
    text: "Mga Pilipino... kayo mismo ang gumawa nito sa akin.",
    translation: "My fellow Filipinos... you yourselves did this to me.",
    background: require("../../../../Background Images/Part 7/Limbon camp, Indang (Bonifacio captured).png")
  },

  {
    type: "system",
    text: "A disagreement among fellow revolutionaries has\nnow turned into a serious conflict.",
    background: require("../../../../Background Images/Part 7/Limbon camp, Indang (Bonifacio captured).png")
  },

  {
    type: "scene",
    title: "The Trial at Maragondon",
    date: "May 1897",
    background: require("../../../../Background Images/Usuals/Brown Background.jpg")
  },

  {
    type: "narrator",
    text: "The Bonifacio brothers face a military court in Maragondon.\nBoth are found guilty and sentenced to death.",
    background: require("../../../../Background Images/Part 7/Maragondon court-martial room.png")
  },

  {
    type: "narrator",
    text: "Aguinaldo first changes the sentence to exile, hoping\nto prevent more bloodshed among Filipinos.",
    background: require("../../../../Background Images/Part 7/Aguinaldo's HQ interior.png")
  },

  {
    type: "dialogue",
    speaker: "EMILIO AGUINALDO",
    characters: [
      {
        source: require("../../../../Character Images/Temporary Placeholders/Aguinaldo.png"),
        position: "left"
      }
    ],
    text: "Sila ay mga anak din ng bayan. Hindi ko kayang dagdagan pa ang dugong\nPilipinong ibinubuhos natin.",
    translation: "They are also sons of the nation. I cannot bear to spill more Filipino blood.",
    background: require("../../../../Background Images/Part 7/Aguinaldo's HQ interior.png")
  },

  {
    type: "choice",
    title: "Choice 7.3: You are Emilio Aguinaldo",
    question: "Your generals want Bonifacio executed despite your decision\nto commute the sentence.",
    background: require("../../../../Background Images/Part 7/Aguinaldo's HQ interior.png"),
    choices: [
      {
        text: "Give in to the pressure and allow the execution to proceed",
        speaker: "EMILIO AGUINALDO",
        dialogue: "...Sige.",
        translation: "...Very well.",
        characters: [
          {
            source: require("../../../../Character Images/Temporary Placeholders/Aguinaldo.png"),
            position: "right"
          }
        ]
      },

      {
        text: "Hold firm and insist that the exile order remain.",
        speaker: "EMILIO AGUINALDO",
        dialogue: "Hindi. Ipapadala natin siya sa malayo. Ayaw kong madagdagan pa\nang dugo ng ating mga kababayan.",
        translation: "No. We will send him away. I do not want more bloodshed among our own people.",
        characters: [
          {
            source: require("../../../../Character Images/Temporary Placeholders/Aguinaldo.png"),
            position: "right"
          }
        ]
      }
    ],
    nextScene: 25
  },

  // CONTINUE

  {
    type: "narrator",
    text: "Despite the change in sentence, the execution order is carried out.",
    background: require("../../../../Background Images/Part 7/Maragondon court-martial room.png")
  },

  {
    type: "scene",
    title: "The Mount Buntis Incident",
    date: "May 10, 1897",
    background: require("../../../../Background Images/Usuals/Brown Background.jpg")
  },

  {
    type: "narrator",
    text: "On May 10, 1897, Andrés and Procopio Bonifacio are\nexecuted near Mount Buntis in Maragondon, Cavite.",
    background: require("../../../../Background Images/Part 7/Mount Buntis Maragondon.png")
  },

  {
    type: "system",
    intro: true,
    text: "Bonifacio's death becomes one of the most painful\nevents in the history of the Revolution.",
    background: require("../../../../Background Images/Usuals/Black Background.jpg")
  },

  //Q4_7 here

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

  {
    type: "scene",
    title: "Test Your Knowledge!",
    date: "How well do you remember the struggle for leadership?",
    background: require("../../../../Background Images/Usuals/Brown Background.jpg")
  },

  {
    type: "quiz",
    question: "What was the main purpose of the Tejeros Convention?",
    options: [
      "To negotiate peace with Spain",
      "To organize a new revolutionary government",
      "To restore Spanish rule in Cavite",
      "To establish the Katipunan"
    ],
    correctIndex: 1
  },

  {
    type: "quiz",
    question: "Who was elected President at the Tejeros Convention?",
    options: [
      "Andrés Bonifacio",
      "Mariano Álvarez",
      "Emilio Aguinaldo",
      "Artemio Ricarte"
    ],
    correctIndex: 2
  },

  {
    type: "quiz",
    question: "Why did Bonifacio object to the results of the Tejeros Convention?",
    options: [
      "He wanted to become President",
      "He believed the election was\nnot conducted fairly",
      "He wanted to surrender to Spain",
      "He opposed the creation of a\nrevolutionary government"
    ],
    correctIndex: 1
  },

  {
    type: "quiz",
    question: "What happened to Bonifacio after the conflict\nbetween the revolutionary factions?",
    options: [
      "He returned to Manila",
      "He was sent to Spain",
      "He was arrested and brought\nbefore a military court",
      "He became President of the\nnew government"
    ],
    correctIndex: 2
  },

  {
    type: "quiz",
    question: "What happened to Andrés and Procopio Bonifacio on May 10, 1897?",
    options: [
      "They were exiled",
      "They escaped from Cavite",
      "They were executed at Mount Buntis",
      "They surrendered to Spanish forces"
    ],
    correctIndex: 2
  },

  {
    type: "scene",
    title: "Chapter Complete.",
    date: "Bonifacio is gone, but the Revolution will continue.",
    background: require("../../../../Background Images/Usuals/Black Background.jpg")
  },

  {
    type: "scene",
    title: "The Revolution has now entered a new chapter.",
    date: " ",
    background: require("../../../../Background Images/Usuals/Black Background.jpg")
  },

];