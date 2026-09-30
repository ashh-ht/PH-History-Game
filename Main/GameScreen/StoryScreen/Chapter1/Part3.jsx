export const Chapter1_Part3 = [

  {
    type: "system",
    intro: true,
    background: require("../../../../Background Images/Usuals/Black Background.jpg"),
    text: "Decades after the Dagohoy rebellion, a new generation begins to challenge Spanish rule."
  },

  {
    type: "system",
    intro: true,
    background: require("../../../../Background Images/Usuals/Black Background.jpg"),
    text: "In 1892, a returning novelist will turn his words into a movement."
  },



  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // SCENE 1
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  {
    type: "scene",
    title: "The Novelist's Return",
    date: "June 26, 1892",
    background: require("../../../../Background Images/Usuals/Black Background.jpg")
  },

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 3/manila port 1890s.png"),
    text: "After many years abroad, Dr. José Rizal returns to Manila."
  },

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 3/Rizal's home.png"),
    text: "His novels Noli Me Tángere and El Filibusterismo have already made him known\nacross the islands, but this time, he wants to do more than write from afar."
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



  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // SCENE 2
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  {
    type: "scene",
    title: "The Covenant in Tondo",
    date: "July 3, 1892",
    background: require("../../../../Background Images/Usuals/Brown Background.jpg")
  },

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 3/Liga Filipina founding 1892 Ongjunco.png"),
    text: "A few days later, around thirty people gather at the home of\nDoroteo Ongjunco in Tondo."
  },

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 3/Liga Filipina founding 1892 Ongjunco.png"),
    text: "A rare mix of wealthy reformers, professionals, and working-class merchants\nmeet to form a new organization: La Liga Filipina."
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

  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // CHOICE 3.1
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

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
    nextScene: 15
  },

  // CONTINUE


  {
    type: "narrator",
    background: require("../../../../Background Images/Part 3/Liga Filipina founding 1892 Ongjunco.png"),
    text: "La Liga Filipina begins as a peaceful organization focused on unity, mutual support,\neducation, and the welfare of Filipinos."
  },


  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // SCENE 3
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  {
    type: "scene",
    title: "The Blow of Banishment",
    date: "July 6, 1892",
    background: require("../../../../Background Images/Usuals/Brown Background.jpg")
  },

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 3/Governor-General's office.png"),
    text: "Three days later, the Spanish authorities move against Rizal, claiming they found\nanti-friar pamphlets hidden in his sister's luggage."
  },

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 3/Governor-General's office.png"),
    text: "Governor-General Eulogio Despujol orders his arrest and exile."
  },

  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // CHOICE 3.2 
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
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
    nextScene: 20
  },

  // CONTINUE

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 3/manila port 1890s.png"),
    text: "Either way, nothing changes. Rizal is taken away and exiled to Dapitan in Mindanao,\nleaving La Liga without its founder."
  },



  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // SCENE 4
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  {
    type: "scene",
    title: "The Great Disagreement",
    date: "April – October 1893",
    background: require("../../../../Background Images/Usuals/Brown Background.jpg")
  },

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 3/Reformist meeting hall, 1893 (Liga revival debate).png"),
    text: "Rizal is far away in Dapitan, and the original Liga has paused its activities."
  },

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 3/Reformist meeting hall, 1893 (Liga revival debate).png"),
    text: "Domingo Franco and Andrés Bonifacio step forward to bring it back to life,\nbut soon, the members start to disagree about how to move forward."
  },

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

  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // CHOICE 3.3
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

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
    nextScene: 28
  },


  // CONTINUE

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 3/Reformist meeting hall, 1893 (Liga revival debate).png"),
    text: "Either way, the disagreement can't be resolved. La Liga Filipina\nofficially ends in October 1893."
  },

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 3/Reformist meeting hall, 1893 (Liga revival debate).png"),
    text: "Bonifacio, together with Plata, Diwa, Diaz, and Dizon, moves forward to build a new\norganization dedicated to full independence."
  },



  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // SCENE 5
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  {
    type: "scene",
    title: "The Founding of the KKK",
    date: "July 7, 1892",
    background: require("../../../../Background Images/Usuals/Brown Background.jpg")
  },

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 3/Arellano house, Calle Elcano, Tondo.png"),
    text: "Inside the small home of Deodato Arellano on Calle Elcano, Bonifacio, Plata,\nand the others gather around a single oil lamp."
  },

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 3/Arellano house, Calle Elcano, Tondo.png"),
    text: "Together, they sign their names to a new, secret brotherhood dedicated to\nwinning independence for their country."
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
    type: "scene",
    intro: true,
    background: require("../../../../Background Images/Usuals/Black Background.jpg"),
    text: "From today, we work only for the freedom of our country."
  },

];