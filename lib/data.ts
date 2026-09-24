export interface ProjectItem {
  id: string
  num: string
  title: string
  subtitle: string
  year: string
  problem: string
  solution: string
  impact?: string
  stack: string[]
  github?: string | null
  demo?: string | null
  badge: string
}

export interface ExperienceItem {
  period: string
  company: string
  role: string
  type: string
  narrative: string
  highlights: string[]
}

export interface SkillCategory {
  category: string
  description: string
  tools: { name: string; level?: 'expert' | 'advanced' | 'familiar' }[]
}

export const BOOK_DATA = {
  cover: {
    author: "ADNANE SIDI-AMADOU",
    title: "The Book of Adnane",
    subtitle: "Software Developer — Backend & Architecture",
    description: "Chroniques, réalisations et arsenal d'un artisan du logiciel.",
    cta: "Ouvrir le livre",
    year: "2026",
    edition: "Première Édition",
  },

  titlePage: {
    quote: "Je ne code pas des démos. Je construis des choses qui tournent.",
    author: "Adnane SIDI-AMADOU",
    role: "Software Developer & Tech Lead",
    location: "Bénin · International / Remote",
  },

  toc: {
    title: "Sommaire",
    subtitle: "Table des matières & cheminement",
    chapters: [
      { num: "I",   id: "about",      title: "D'où je viens (À propos)",   page: 3 },
      { num: "II",  id: "skills",     title: "Mon arsenal (Compétences)",  page: 5 },
      { num: "III", id: "projects",   title: "Les œuvres (Projets)",       page: 7 },
      { num: "IV",  id: "experience", title: "Le chemin parcouru (Parcours)", page: 13 },
      { num: "V",   id: "contact",    title: "Écrivons la suite (Contact)", page: 17 },
    ]
  },

  about: {
    chapterNumber: "Chapitre I",
    title: "D'où je viens",
    subtitle: "Genèse, principes et vision du métier",
    paragraphs: [
      "Diplômé en Génie Logiciel à l'IFRI (Institut de Formation et de Recherche en Informatique, Université d'Abomey-Calavi, Bénin), j'ai commencé à coder avec une conviction intime : un bon logiciel doit d'abord fonctionner sans faille avant de prétendre à l'élégance.",
      "Depuis plus de 3 ans, je conçois des architectures backend robustes, des APIs résilientes et des systèmes asynchrones qui tiennent rigoureusement la charge en production — loin des simples prototypes de démonstration.",
      "Aujourd'hui freelance et Tech Lead, j'accompagne des entreprises en France, au Bénin et à l'international, sur des défis allant du e-commerce multi-régions aux bots autonomes d'intelligence artificielle appliquée à la finance.",
    ],
    marginalia: {
      quote: "Le code le plus élégant est celui qu'on n'a jamais besoin de réécrire.",
      note: "Architecture d'abord. Chaque ligne de code doit mériter sa place en production."
    },
    stats: [
      { value: "3+", label: "Années d'expérience" },
      { value: "15+", label: "Systèmes déployés" },
      { value: "8+", label: "Clients & Partenaires" },
      { value: "100%", label: "Engagement livraison" },
    ]
  },

  skills: {
    chapterNumber: "Chapitre II",
    title: "Mon arsenal",
    subtitle: "Outils de forge, étagères et savoir-faire",
    intro: "Un artisan se reconnaît à la maîtrise et au respect de ses outils. Mon écosystème s'articule autour d'un socle backend puissant, complété par une maîtrise frontend moderne et l'intégration pragmatique de l'intelligence artificielle.",
    shelves: [
      {
        category: "Backend (Le Cœur du Réacteur)",
        description: "Architecture de services, APIs scalables, files de messages et traitements asynchrones.",
        tools: [
          { name: "Laravel", level: "expert" },
          { name: "FastAPI", level: "expert" },
          { name: "PHP 8+", level: "expert" },
          { name: "Python", level: "expert" },
          { name: "APIs RESTful", level: "expert" },
          { name: "Queues & Jobs", level: "advanced" },
          { name: "WebSockets", level: "advanced" },
        ]
      },
      {
        category: "Frontend (L'Interface Vivante)",
        description: "Expériences soignées, réactives et accessibles au service de l'utilisateur final.",
        tools: [
          { name: "Next.js", level: "expert" },
          { name: "React", level: "expert" },
          { name: "TypeScript", level: "advanced" },
          { name: "Flutter", level: "advanced" },
          { name: "Tailwind CSS", level: "expert" },
        ]
      },
      {
        category: "Bases de Données (La Mémoire)",
        description: "Modélisation relationnelle rigoureuse, optimisations d'index et stockage NoSQL moderne.",
        tools: [
          { name: "MySQL", level: "expert" },
          { name: "PostgreSQL", level: "advanced" },
          { name: "Firebase", level: "expert" },
          { name: "Supabase", level: "advanced" },
          { name: "Redis", level: "advanced" },
        ]
      },
      {
        category: "DevOps & Déploiement (La Citadelle)",
        description: "Conteneurisation, pipelines de test continu et infrastructure résiliente.",
        tools: [
          { name: "Docker", level: "expert" },
          { name: "GitHub Actions", level: "advanced" },
          { name: "Vercel / Fly.io", level: "advanced" },
          { name: "Render / Nginx", level: "advanced" },
          { name: "CI / CD", level: "advanced" },
        ]
      },
      {
        category: "IA & Systèmes Autonomes (Le Futur)",
        description: "Orchestration d'agents LLM, chaînes RAG et pipelines prédictifs en production.",
        tools: [
          { name: "GPT-4o / Llama 3", level: "expert" },
          { name: "Groq SDK", level: "expert" },
          { name: "Scikit-learn", level: "advanced" },
          { name: "Pandas / NumPy", level: "advanced" },
        ]
      },
    ] as SkillCategory[]
  },

  projects: {
    chapterNumber: "Chapitre III",
    title: "Les œuvres",
    subtitle: "Études de cas & réalisations en production",
    intro: "Chaque projet est une réponse concrète à un défi d'ingénierie. Voici une sélection d'œuvres livrées et opérationnelles.",
    items: [
      {
        id: "sentinel-macro",
        num: "01",
        title: "Sentinel-Macro",
        subtitle: "Bot de Trading Algorithmique Multi-Agents",
        year: "2026",
        badge: "FinTech / IA",
        problem: "Les marchés financiers génèrent un volume de signaux macro-économiques et techniques impossible à traiter avec une latence humaine sans biaiser les décisions de couverture.",
        solution: "Conception d'un automate institutionnel supervisé par 6 agents autonomes coordonnés : analyse de sentiment de presse en direct via GPT-4o & Llama-3, couplée à un moteur d'exécution MetaTrader 5.",
        impact: "+120% de rentabilité simulée et exécution déterministe sub-seconde.",
        stack: ["Python", "FastAPI", "Scikit-learn", "Pandas", "Next.js", "MT5"],
        github: "https://github.com/AdnaneAD1/bot-trading",
      },
      {
        id: "mishki",
        num: "02",
        title: "Mishki",
        subtitle: "Plateforme B2B/B2C Multi-Régions",
        year: "2025",
        badge: "E-Commerce International",
        problem: "Gérer un flux commercial transatlantique entre la France et le Pérou avec des réglementations fiscales, devises et régimes de tarification de gros et détail totalement divergents.",
        solution: "Architecture Next.js 16 et Firebase unifiée capable d'isoler les flux B2B/B2C, de délivrer une facturation automatisée légale et de synchroniser les stocks en temps réel sans latence.",
        impact: "Déploiement international réussi avec zéro rupture de synchronisation documentaire.",
        stack: ["Next.js 16", "TypeScript", "Firebase", "Radix UI", "Tailwind CSS"],
        github: "https://github.com/AdnaneAD1/mishki",
      },
      {
        id: "calixt",
        num: "03",
        title: "Calixt",
        subtitle: "Plateforme Marketing & CMS Haute Performance",
        year: "2026",
        badge: "SaaS & NLP",
        problem: "Fournir aux équipes marketing une solution ultra-légère capable d'interpréter automatiquement les requêtes prospects entrantes sans surcoût d'infrastructure.",
        solution: "Moteur NLP personnalisé intégré à un backend Laravel modulaire, couplé à une interface dynamique compilée sous Vite avec lazy-loading complet des assets multimédias.",
        impact: "Gain de 65% en temps de réponse support et temps de chargement des pages inférieur à 700ms.",
        stack: ["Laravel", "PHP 8.3", "MySQL", "Docker", "NLP"],
        github: "https://github.com/AdnaneAD1/calixt",
      },
      {
        id: "seleogeraubenin",
        num: "04",
        title: "SELEOGERAUBENIN",
        subtitle: "Plateforme Immobilière & Gestion Intelligente",
        year: "2026",
        badge: "PropTech",
        problem: "Prolifération d'annonces frauduleuses en doublons et lourdeurs administratives des baux locatifs sur le marché immobilier béninois.",
        solution: "Algorithme d'analyse d'images et empreintes SHA-256 détectant 80% des doublons à la volée, adossé à un module de signature électronique de contrat conforme aux standards juridiques.",
        impact: "Assainissement du catalogue d'annonces et division par 3 du temps de conclusion d'un bail.",
        stack: ["Laravel", "PHP", "MySQL", "Redis", "Canvas API"],
        github: "https://github.com/sergeafouda/selogeraubenin",
      },
      {
        id: "businessplan",
        num: "05",
        title: "BusinessPlan IA",
        subtitle: "Génération de Business Plans & Prévisions",
        year: "2025",
        badge: "IA Générative",
        problem: "Les porteurs de projets perdent des semaines sur la modélisation financière et les matrices stratégiques SWOT préliminaires.",
        solution: "Moteur combinant l'accélération Groq (Llama-3) pour l'analyse stratégique et un calculateur déterministe prévoyant la trésorerie sur 12 mois avec rendu vectoriel immédiat.",
        impact: "Génération d'un dossier bancable complet en moins de 2 minutes.",
        stack: ["Laravel 12", "Next.js 15", "Groq SDK", "Firebase", "Chart.js"],
        github: null,
      },
      {
        id: "ckdcare",
        num: "06",
        title: "CKDCare",
        subtitle: "Détection Précoce de l'Insuffisance Rénale",
        year: "2024",
        badge: "HealthTech & ML",
        problem: "Le diagnostic tardif des pathologies rénales chroniques réduit drastiquement l'espérance de vie des patients dans les zones à faible densité hospitalière.",
        solution: "Modèle de classification entraîné sur des marqueurs biomédicaux, délivrant un score de risque interprétable aux professionnels de santé via une interface web épurée.",
        impact: "Taux de précision prédictive supérieur à 94% sur les cohortes de validation.",
        stack: ["Python", "Scikit-learn", "FastAPI", "Tailwind CSS"],
        github: "https://github.com/AdnaneAD1",
      },
    ] as ProjectItem[]
  },

  experience: {
    chapterNumber: "Chapitre IV",
    title: "Le chemin parcouru",
    subtitle: "Chroniques professionnelles & responsabilités",
    intro: "Mon parcours est celui d'un bâtisseur qui a gravi chaque échelon par la pratique, de la résolution de bugs ardus à la responsabilité globale de systèmes en production.",
    timeline: [
      {
        period: "2025 — Présent",
        company: "ZeroInvestissement",
        role: "Software Developer & Tech Lead",
        type: "Collaboration Stratégique",
        narrative: "Prise en charge de la direction technique de la plateforme Mishki. Définition des choix d'architecture avec Next.js, Firebase et TypeScript, encadrement de développeurs, revues de code rigoureuses et déploiement de circuits de paiement internationaux.",
        highlights: [
          "Leadership technique et validation de l'architecture distribuée.",
          "Coordination de l'équipe et respect des engagements de livraison.",
          "Sécurisation des flux bancaires et passerelles de paiement.",
        ]
      },
      {
        period: "2023 — Présent",
        company: "Indépendant / Freelance",
        role: "Software Developer & Consultant",
        type: "Missions Clientes",
        narrative: "Accompagnement sur-mesure de startups et PME dans la conception de leurs socles logiciels. Conception d'APIs critiques, intégration d'intelligences artificielles génératives et pilotage de pipelines DevOps complets (Docker, CI/CD).",
        highlights: [
          "Plus de 15 projets livrés avec succès en production.",
          "Conception d'outils sur-mesure (Calixt, bots de trading automatisés).",
          "Zéro dette technique non maîtrisée chez mes clients.",
        ]
      },
      {
        period: "Févr. — Avr. 2026",
        company: "SELEOGERAUBENIN",
        role: "Ingénieur Consultant Backend",
        type: "Mission d'Ingénierie",
        narrative: "Intervention ciblée sur l'assainissement et la sécurisation d'un portail immobilier d'envergure. Mise en place de détection de doublons par hachage cryptographique et optimisation des requêtes de bases de données sous forte charge.",
        highlights: [
          "Algorithme de déduplication SHA-256 avec 80% de corrélation.",
          "Génération automatisée et sécurisée de contrats de location PDF.",
          "Architecture de queues asynchrones avec Redis.",
        ]
      },
      {
        period: "Mars — Juin 2025",
        company: "Diha's",
        role: "Software Developer",
        type: "Poste Ingénierie",
        narrative: "Développement complet du SaaS BusinessPlan IA. Intégration du SDK Groq pour le traitement de langage naturel, couplé à une interface Next.js 15 hautement interactive et à la génération documentaire bancaire.",
        highlights: [
          "Conception de l'API REST Laravel et dashboards analytiques.",
          "Calculateur dynamique de trésorerie sur horizon 12 mois.",
          "Authentification sécurisée et flux multi-utilisateurs Firebase.",
        ]
      },
      {
        period: "2024",
        company: "LAGORAGROUP",
        role: "Développeur d'Applications",
        type: "Projets d'Équipe",
        narrative: "Conception de modules applicatifs, automatisation de processus métiers et consolidation de bases de données relationnelles pour les besoins opérationnels du groupe.",
        highlights: [
          "Développement fullstack et maintenance applicative.",
          "Intégration de maquettes UI fidèles et tests d'intégration.",
        ]
      },
    ] as ExperienceItem[]
  },

  contact: {
    chapterNumber: "Chapitre V",
    title: "Écrivons la suite",
    subtitle: "Correspondance, collaborations & opportunités",
    lead: "Un projet audacieux ? Une architecture à concevoir ou consolider ? Ou simplement l'envie d'échanger sur l'artisanat logiciel ? Vous pouvez m'adresser votre message directement ci-dessous.",
    coordinates: {
      name: "Adnane SIDI-AMADOU",
      email: "sidiamadouadnane4@gmail.com",
      github: "https://github.com/AdnaneAD1",
      location: "Bénin · Ouvert au Remote & Relocalisation",
      status: "Disponible pour nouvelles missions & postes Tech Lead",
    },
    postcard: {
      postmark: "Cotonou · BJ",
      airmailText: "PAR AVION / AIR MAIL",
      stampText: "POSTES 2026",
      instructions: "Remplissez ce formulaire comme une lettre cachetée.",
    }
  },

  backCover: {
    author: "Adnane SIDI-AMADOU",
    title: "The Book of Adnane",
    blurb: "Ce livre retrace le cheminement d'un développeur qui a choisi de privilégier la solidité de la fondation sur l'artifice du décor. Entre rigueur backend, élégance d'architecture et puissance de l'intelligence artificielle, chaque chapitre s'écrit avec la certitude qu'un logiciel bien pensé change la donne.",
    closing: "Merci d'avoir feuilleté ces pages.",
    socials: [
      { name: "GitHub", url: "https://github.com/AdnaneAD1" },
      { name: "Email", url: "mailto:sidiamadouadnane4@gmail.com" },
    ],
    copyright: "© 2026 Adnane SIDI-AMADOU · Tous droits réservés.",
    isbn: "ISBN 978-2-ADNANE-DEV-2026",
  }
}

export const INFO = {
  name: BOOK_DATA.cover.author,
  email: BOOK_DATA.contact.coordinates.email,
  github: BOOK_DATA.contact.coordinates.github,
}
