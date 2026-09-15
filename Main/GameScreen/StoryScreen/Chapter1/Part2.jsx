export const Chapter1_Part2 = [
  // ---- SCENE 1 — THE REFUSAL AT INABANGA (1744) ----
  {
    type: "scene",
    title: "Scene 1 — The Refusal at Inabanga",
    date: "1744"
  },
  {
    type: "narrator",
    text: "The afternoon air in Bohol feels heavy. Outside the wooden doors of the parish church, Francisco Dagohoy — a respected community leader — stands quietly, grieving. His brother, Sagarino, died while doing his duty, following the priest's own orders. But because of a strict church rule, the priest is refusing him a proper burial."
  },
  {
    type: "dialogue",
    speaker: "FRANCISCO DAGOHOY",
    //background: require("../../../../assets/background/idkyet.png")
    characters: [
      { source: require("../../../../assets/characters/legazpi.png"), position: "left" }
    ],
    text: "Padre, pinatay po ang aking kapatid habang tinutupad ang inyong utos. He died doing his duty! Bakit ninyo siya ipinagkakait sa isang tamang paglilibing? (Father, my brother died carrying out your order. He died doing his duty! Why are you refusing him a proper burial?)"
  },
  {
    type: "dialogue",
    speaker: "FATHER GASPAR MORALES",
    characters: [
      { source: require("../../../../assets/characters/legazpi.png"), position: "right" }
    ],
    text: "The rules of the Church do not bend, Cabeza. I cannot allow this burial under these circumstances."
  },
  {
    type: "dialogue",
    speaker: "FRANCISCO DAGOHOY",
    characters: [
      { source: require("../../../../assets/characters/legazpi.png"), position: "left" }
    ],
    text: "Sinuway niya ang panganib para sa inyo. Kung wala man lang paggalang ang inyong simbahan para sa isang tapat na lingkod, hindi na kami dapat manatiling tapat. (He faced danger for you. If your church has no respect left for a loyal servant, then we shouldn't have to stay loyal either.)"
  },

  // ---- CHOICE 2.1 ----
  {
    type: "choice",
    title: "Choice 2.1 — You are Francisco Dagohoy",
    question: "Father Gaspar Morales has just refused your brother a proper burial. You have to decide what to do next.",
    choices: [
      {
        text: "Speak out and lead your people to the mountains.",
        speaker: "FRANCISCO DAGOHOY",
        dialogue: "Masyado na nilang pinahirapan ang ating mga pamilya. Ngayong araw, sisimulan natin ang bagong buhay — malaya, sa kabundukan.",
        translation: "They have burdened our families for too long. Today, we begin a new life — free, in the mountains."
      },
      {
        text: "Try one more appeal to a higher church authority first.",
        speaker: "FRANCISCO DAGOHOY",
        dialogue: "Bago ako kumilos, susubukan ko munang makipag-usap sa Obispo.",
        translation: "Before I act, let me try speaking with the Bishop first."
      }
    ],
    nextScene: 6 // Points to the convergence below
  },

  // ---- SCENE 1 CONVERGENCE (index 6) ----
  {
    type: "narrator",
    text: "No compromise is reached. Dagohoy gathers about three thousand Boholanos and leads them into the mountains, away from Spanish rule — the true beginning of an 85-year story of independence."
  },

  // ---- SCENE 2 — FLIGHT TO THE MOUNTAINS (1744) ----
  {
    type: "scene",
    title: "Scene 2 — Flight to the Mountains",
    date: "1744"
  },
  {
    type: "narrator",
    text: "Carrying only what they can, Dagohoy and thousands of Boholanos leave the lowlands behind."
  },
  {
    type: "narrator",
    text: "High in the mountains, the group builds something remarkable: an organized, self-sufficient community with its own farms — a place where they could live free from Spanish taxes and forced labor."
  },

  // ---- SCENE 3 — THE UNBROKEN STRONGHOLD ----
  {
    type: "scene",
    title: "Scene 3 — The Unbroken Stronghold",
    date: "Late 18th Century – 1827"
  },
  {
    type: "narrator",
    text: "Decades pass. What began with three thousand people grows into a community of twenty thousand. Spanish expeditions try again and again to bring the mountain state back under control, without success."
  },
  {
    type: "narrator",
    text: "Spanish officials tried many times to negotiate with Dagohoy's community — a sign of just how strong and respected the mountain settlement had become."
  },

  // ---- CHOICE 2.2 ----
  {
    type: "choice",
    title: "Choice 2.2 — You are Francisco Dagohoy",
    question: "In 1762, the British briefly take control of Manila, leaving Spanish power in the region weaker than usual.",
    choices: [
      {
        text: "Stay focused on protecting your own mountain community.",
        speaker: "FRANCISCO DAGOHOY",
        dialogue: "Hindi pa panahon para lumabas. Bantayan muna natin ang ating sariling bundok.",
        translation: "It's not yet time to go out. Let's watch over our own mountain first."
      },
      {
        text: "Send scouts to see if other islands want to team up.",
        speaker: "FRANCISCO DAGOHOY",
        dialogue: "Magpadala tayo ng mga tagamasid sa Leyte at Cebu, tignan kung handa silang sumama.",
        translation: "Let's send scouts to Leyte and Cebu, to see if they're ready to join us."
      }
    ],
    nextScene: 12 // Points to the convergence below
  },

  // ---- SCENE 3 CONVERGENCE (index 12) ----
  {
    type: "narrator",
    text: "Either way, no large alliance forms during this time. Bohol's mountain community stays independent and secure on its own for many more years — a single, determined community holding its ground."
  },
  {
    type: "narrator",
    text: "In 1827, a large expedition of 2,200 soldiers marches into the mountains to try, once again, to bring the rebellion to an end."
  },
  {
    type: "narrator",
    text: "The Boholanos defend their home with skill and determination. After a difficult standoff, the expedition turns back, unable to reach the mountain stronghold."
  },

  // ---- SCENE 4 — THE SANZ CAMPAIGN & THE CLEMENCY ----
  {
    type: "scene",
    title: "Scene 4 — The Sanz Campaign & The Clemency",
    date: "1828–1829"
  },
  {
    type: "narrator",
    text: "Realizing the mountain state isn't going anywhere on its own, Governor-General Mariano Ricafort sends one final, much larger campaign — 6,000 soldiers under Captain Manuel Sanz."
  },

  // ---- CHOICE 2.3 ----
  {
    type: "choice",
    title: "Choice 2.3 — You are a Boholano Rebel Leader",
    question: "In 1829, Sanz's large army finally corners the last mountain strongholds, after 85 years of independence.",
    choices: [
      {
        text: "Hold your ground, then accept the governor's offer of peace.",
        speaker: "GOVERNOR-GENERAL RICAFORT",
        dialogue: "Let there be peace on this island. We forgive your people. Come down from the mountains, and you may build new lives in peaceful lowland towns.",
        translation: ""
      },
      {
        text: "Ask for terms and time to discuss it with your community first.",
        speaker: "REBEL LEADER",
        dialogue: "Bigyan niyo po kami ng panahon para pag-usapan ito bilang isang komunidad.",
        translation: "Please give us time to discuss this as a community."
      }
    ],
    nextScene: 17 // Points to the convergence below
  },

  // ---- SCENE 4 CONVERGENCE (index 17) ----
  {
    type: "narrator",
    text: "Either way, the community chooses peace over continued fighting. Governor-General Ricafort pardons the 19,420 people who had lived in the mountain state, and they resettle in new lowland towns — Batuan, Cabulao, Catigbian, and Bilar — bringing 85 years of resistance to a peaceful close."
  },

  // ---- ENDING TRANSITION & LEGEND CORNER ----
  {
    type: "system",
    text: "The misty mountains of Bohol fade back into heavy parchment. You turn to the next page, where the year 1892 begins to glow..."
  },
  {
    type: "system",
    text: "🌙 Legend Corner — 'The Watchful Fire'"
  },
  {
    type: "system",
    text: "(A folklore note, not a choice — just for fun, and clearly not part of real history)\n\nSome old Boholano stories tell of spirit-keepers who watched over the highland farms during the long years in the mountains — quietly helping crops grow and travelers find safe paths home. It's a comforting story passed down through generations, but it's folklore, not fact, and it doesn't change anything that really happened in the game."
  }
];