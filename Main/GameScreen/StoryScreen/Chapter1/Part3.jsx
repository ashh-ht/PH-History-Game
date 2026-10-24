export const Chapter1_Part3 = [

  {
    type: "scene",
    title: "The Novelist's Return",
    date: "June 26, 1892",
    background: require("../../../../Background Images/Usuals/Black Background.jpg")
  },

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 3/manila port 1890s.png"),
    text: "On June 26, 1892, Dr. José Rizal returns to Manila. His books, Noli Me Tángere and\nEl Filibusterismo, have encouraged Filipinos to question Spanish rule."
  },

  {
    type: "dialogue",
    speaker: "DR. JOSÉ RIZAL",
    background: require("../../../../Background Images/Part 3/Rizal's home.png"),
    characters: [
      {
        source: require("../../../../Character Images/Temporary Placeholders/Rizal.png"),
        position: "left"
      }
    ],
    text: "Writing from Spain was only the beginning. Now I want to work for\nour people here, in our own country."
  },

  {
    type: "dialogue",
    speaker: "DR. JOSÉ RIZAL",
    background: require("../../../../Background Images/Part 3/Rizal's home.png"),
    characters: [
      {
        source: require("../../../../Character Images/Temporary Placeholders/Rizal.png"),
        position: "left"
      }
    ],
    text: "If we want a better future for our people, we cannot wait for the government\nto change. We must build it ourselves."
  },

  {
    type: "scene",
    title: "La Liga Filipina",
    background: require("../../../../Background Images/Usuals/Brown Background.jpg")
  },

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 3/Liga Filipina founding 1892 Ongjunco.png"),
    text: "On July 3, 1892, Rizal meets with about 30 people in Tondo.\nTogether, they form La Liga Filipina, an organization that\nsupports unity, education, and the welfare of Filipinos."
  },

  {
    type: "dialogue",
    speaker: "DR. JOSÉ RIZAL",
    background: require("../../../../Background Images/Part 3/Liga Filipina founding 1892 Ongjunco.png"),
    characters: [
      {
        source: require("../../../../Character Images/Temporary Placeholders/Rizal.png"),
        position: "left"
      }
    ],
    text: "My friends, we've lived as separate individuals for too long. It is time we\nunite into one strong group."
  },

  {
    type: "dialogue",
    speaker: "DR. JOSÉ RIZAL",
    background: require("../../../../Background Images/Part 3/Liga Filipina founding 1892 Ongjunco.png"),
    characters: [
      {
        source: require("../../../../Character Images/Temporary Placeholders/Rizal.png"),
        position: "left"
      }
    ],
    text: "Our motto is simple: Unus Instar Omnium. One is worth all. If one of us\nis in trouble, we all stand together."
  },

  //T3_3 here

  {
    type: "dialogue",
    speaker: "ANDRÉS BONIFACIO",
    background: require("../../../../Background Images/Part 3/Liga Filipina founding 1892 Ongjunco.png"),
    characters: [
      {
        source: require("../../../../Character Images/Temporary Placeholders/Bonifacio.png"),
        position: "left"
      }
    ],
    text: "But what happens if Spain decides to come after us? What can we do\nto protect ourselves?"
  },

  {
    type: "dialogue",
    speaker: "APOLINARIO MABINI",
    background: require("../../../../Background Images/Part 3/Liga Filipina founding 1892 Ongjunco.png"),
    characters: [
      {
        source: require("../../../../Character Images/Temporary Placeholders/Bonifacio.png"),
        position: "left"
      },
      {
        source: require("../../../../Character Images/Temporary Placeholders/Mabini.png"),
        position: "right"
      }
    ],
    text: "I trust we will build something strong among our own people. Let's sign\nthis agreement and prove that we can stand together as equals."
  },

  {
    type: "choice",
    title: "Choice 3.1: You are Dr. José Rizal",
    question: "Bonifacio worries about what might happen if the Spanish\nauthorities turn against the Liga.",
    background: require("../../../../Background Images/Part 3/Liga Filipina founding 1892 Ongjunco.png"),
    choices: [
      {
        text: "Insist that the Liga must remain peaceful and legal.",
        speaker: "DR. JOSÉ RIZAL",
        dialogue: "Mananatiling mapayapa ang Liga, Andrés. Huwag nating bigyan ang\npamahalaan ng dahilan para tawagin tayong mga rebelde.",
        translation: "The Liga will remain peaceful, Andrés. We must not give the government a reason to call us rebels.",
        characters: [
          {
            source: require("../../../../Character Images/Temporary Placeholders/Rizal.png"),
            position: "right"
          }
        ]
      },

      {
        text: "Admit that his concern is worth considering.",
        speaker: "DR. JOSÉ RIZAL",
        dialogue: "May punto ka, Andrés. Pag-isipan natin kung paano tayo haharap\nkung dumating ang araw na iyon.",
        translation: "You have a point, Andrés. Let's think about how we'll respond if that day comes.",
        characters: [
          {
            source: require("../../../../Character Images/Temporary Placeholders/Rizal.png"),
            position: "right"
          }
        ]
      }
    ],
    nextScene: 11
  },

  // CONTINUE

  //Q1_3 and Q2_3 here

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 3/Liga Filipina founding 1892 Ongjunco.png"),
    text: "La Liga Filipina begins as a peaceful organization. Its members\nhope to improve life for Filipinos by working together."
  },

  {
    type: "scene",
    title: "The Blow of Banishment",
    date: "July 6, 1892",
    background: require("../../../../Background Images/Usuals/Brown Background.jpg")
  },

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 3/Governor-General's office.png"),
    text: "Just three days later, Spanish authorities arrest Rizal and\nsend him to Dapitan in Mindanao without a trial."
  },

  {
    type: "choice",
    title: "Choice 3.2: You are Dr. José Rizal",
    question: "You have been ordered into exile without a trial. What will you do?",
    background: require("../../../../Background Images/Part 3/Governor-General's office.png"),
    choices: [
      {
        text: "Accept the arrest calmly.",
        speaker: "DR. JOSÉ RIZAL",
        dialogue: "I'll go quietly. My family and friends should not suffer because of me.",
        characters: [
          {
            source: require("../../../../Character Images/Temporary Placeholders/Rizal.png"),
            position: "left"
          }
        ]
      },

      {
        text: "Ask to speak with an official about the charges.",
        speaker: "DR. JOSÉ RIZAL",
        dialogue: "I would like the chance to explain myself before I am taken away.",
        characters: [
          {
            source: require("../../../../Character Images/Temporary Placeholders/Rizal.png"),
            position: "left"
          }
        ]
      }
    ],
    nextScene: 15
  },

  // CONTINUE

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 3/manila port 1890s.png"),
    text: "Rizal is sent to Dapitan. His exile makes it\nharder for the Liga to continue its work."
  },

  //Q3_3 here

  {
    type: "scene",
    title: "The Great Disagreement",
    date: "April – October 1893",
    background: require("../../../../Background Images/Usuals/Brown Background.jpg")
  },

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 3/Reformist meeting hall, 1893 (Liga revival debate).png"),
    text: "In 1893, the Liga's members disagree about what to do next.\nSome want to continue asking Spain for reforms."
  },

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 3/Reformist meeting hall, 1893 (Liga revival debate).png"),
    text: "Bonifacio believes Filipinos must prepare for independence."
  },

  //T1_3 here

  {
    type: "dialogue",
    speaker: "DOMINGO FRANCO",
    background: require("../../../../Background Images/Part 3/Reformist meeting hall, 1893 (Liga revival debate).png"),
    characters: [
      {
        source: require("../../../../Character Images/Temporary Placeholders/Franco.png"),
        position: "left"
      }
    ],
    text: "We should keep working peacefully. We can collect funds to support our\nwriters in Spain and keep pushing for fair treatment through legal means."
  },

  {
    type: "dialogue",
    speaker: "ANDRÉS BONIFACIO",
    background: require("../../../../Background Images/Part 3/Reformist meeting hall, 1893 (Liga revival debate).png"),
    characters: [
      {
        source: require("../../../../Character Images/Temporary Placeholders/Franco.png"),
        position: "left"
      },
      {
        source: require("../../../../Character Images/Temporary Placeholders/Bonifacio.png"),
        position: "right"
      }
    ],
    text: "You still want to write letters to Spain while our leader sits far away in Mindanao?\nRizal's exile proved that reform won't work."
  },

  {
    type: "dialogue",
    speaker: "ANDRÉS BONIFACIO",
    background: require("../../../../Background Images/Part 3/Reformist meeting hall, 1893 (Liga revival debate).png"),
    characters: [
      {
        source: require("../../../../Character Images/Temporary Placeholders/Franco.png"),
        position: "left"
      },
      {
        source: require("../../../../Character Images/Temporary Placeholders/Bonifacio.png"),
        position: "right"
      }
    ],
    text: "We need a different approach."
  },

  {
    type: "choice",
    title: "Choice 3.3: You are Andrés Bonifacio",
    question: "The Liga can't agree on how to move forward.",
    background: require("../../../../Background Images/Part 3/Reformist meeting hall, 1893 (Liga revival debate).png"),
    choices: [
      {
        text: "Leave the Liga and start building a new, secret group.",
        speaker: "ANDRÉS BONIFACIO",
        dialogue: "Sawa na ako sa mga liham na walang kasagutan. Kung hindi sapat ang\nmga salita, kailangan nating gumawa ng ibang paraan.",
        translation: "I've had enough of letters that go unanswered. If words alone aren't enough, we need to\nfind another way.",
        characters: [
          {
            source: require("../../../../Character Images/Temporary Placeholders/Bonifacio.png"),
            position: "right"
          }
        ]
      },

      {
        text: "Try one more time to bring everyone together.",
        speaker: "ANDRÉS BONIFACIO",
        dialogue: "Pakiusap, subukan muna nating magkasundo sa isang plano bago tayo\ntuluyang magkahiwalay.",
        translation: "Please, let's try to agree on one plan before we go our separate ways.",
        characters: [
          {
            source: require("../../../../Character Images/Temporary Placeholders/Bonifacio.png"),
            position: "right"
          }
        ]
      }
    ],
    nextScene: 23
  },

  // CONTINUE

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 3/Reformist meeting hall, 1893 (Liga revival debate).png"),
    text: "The disagreement divides the organization. Bonifacio and his\ncompanions begin forming a secret group dedicated to independence."
  },

  {
    type: "scene",
    title: "The Founding of the KKK",
    date: "July 7, 1892",
    background: require("../../../../Background Images/Usuals/Brown Background.jpg")
  },

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 3/Arellano house, Calle Elcano, Tondo.png"),
    text: "On July 7, 1892, Bonifacio and his companions establish the Katipunan, a\nsecret organization that aims to free the Philippines from Spain."
  },

  {
    type: "dialogue",
    speaker: "ANDRÉS BONIFACIO",
    background: require("../../../../Background Images/Part 3/Arellano house, Calle Elcano, Tondo.png"),
    characters: [
      {
        source: require("../../../../Character Images/Temporary Placeholders/Bonifacio.png"),
        position: "left"
      }
    ],
    text: "We are no longer just colonial subjects asking for change. We are the Anak\nng Bayan, the Children of the Nation!"
  },

  {
    type: "system",
    intro: true,
    background: require("../../../../Background Images/Usuals/Black Background.jpg"),
    text: "Rizal worked for change through peaceful reform. Bonifacio and\nthe Katipunan prepared to fight for independence."
  },

  {
    type: "system",
    intro: true,
    background: require("../../../../Background Images/Usuals/Black Background.jpg"),
    text: "Their methods were different, but both became\nimportant figures in Philippine history."
  },

  {
    type: "scene",
    title: "Test Your Knowledge!",
    date: "How well do you remember the events of 1892?",
    background: require("../../../../Background Images/Usuals/Brown Background.jpg")
  },

  {
    type: "quiz",
    question: "What did José Rizal hope to accomplish after returning to the Philippines in 1892?",
    options: [
      "Become a Spanish government official",
      "Work with Filipinos to improve their country",
      "Leave Manila immediately",
      "Start a military campaign"
    ],
    correctIndex: 1
  },

  {
    type: "quiz",
    question: "What organization did Rizal help establish on July 3, 1892?",
    options: [
      "The Katipunan",
      "La Liga Filipina",
      "The Philippine Republic",
      "The Propaganda Movement"
    ],
    correctIndex: 1
  },

  {
    type: "quiz",
    question: "What happened to Rizal shortly after the founding of La Liga Filipina?",
    options: [
      "He was elected president of the Liga",
      "He returned to Spain voluntarily",
      "He was arrested and exiled to Dapitan",
      "He joined Bonifacio's secret organization"
    ],
    correctIndex: 2
  },

  {
    type: "quiz",
    question: "Why did members of La Liga Filipina begin to disagree about its future?",
    options: [
      "They disagreed about whether to continue\npeaceful reform or pursue a different approach",
      "They could not agree on where to meet",
      "They wanted to replace Rizal as a novelist",
      "They disagreed about which language to use"
    ],
    correctIndex: 0
  },

  {
    type: "quiz",
    question: "What secret organization was founded by Andrés Bonifacio and his companions?",
    options: [
      "La Liga Filipina",
      "The Propaganda Movement",
      "The Katipunan",
      "The Philippine Assembly"
    ],
    correctIndex: 2
  },

  {
    type: "scene",
    title: "Chapter Complete.",
    date: "The call for change had become a call for freedom.",
    background: require("../../../../Background Images/Usuals/Black Background.jpg")
  },

  {
    type: "scene",
    title: "And soon, that call would no longer remain in secret.",
    date: " ",
    background: require("../../../../Background Images/Usuals/Black Background.jpg")
  },

];