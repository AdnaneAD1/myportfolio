export const INFO = {
  name: "ADNANE SIDI-AMADOU",
  email: "sidiamadouadnane4@gmail.com",
  github: "https://github.com/AdnaneAD1",
  location: "Bénin / Remote / Relocalisation / Présentiel",
  available: true,
  fr: {
    title: "Ingénieur Full Stack & Tech Lead",
    subtitle: "J'architecture et conçois des produits numériques performants, de l'idée initiale à la mise en production à grande échelle.",
    stack: "Expertise : Laravel · Next.js · Python · TypeScript",
    status: "Disponible",
  },
  en: {
    title: "Full Stack Engineer & Tech Lead",
    subtitle: "Architecting and building high-performance digital products, scaling from initial concept to large-scale production.",
    stack: "Expertise: Laravel · Next.js · Python · TypeScript",
    status: "Available",
  }
}

export const STATS = {
  fr: [
    { num: "3+",   label: "Années d'expérience" },
    { num: "15+",  label: "Projets en production" },
    { num: "8",    label: "Clients & employeurs" },
    { num: "2023", label: "Freelance depuis" },
  ],
  en: [
    { num: "3+",   label: "Years of Experience" },
    { num: "15+",  label: "Production Projects" },
    { num: "8",    label: "Clients & Employers" },
    { num: "2023", label: "Freelance since" },
  ]
}

export const SKILLS = [
  {
    fr: { category: "Langages" },
    en: { category: "Languages" },
    items: [
      { name: "TypeScript", featured: true },
      { name: "JavaScript", featured: true },
      { name: "Python",     featured: true },
      { name: "PHP",        featured: true },
      { name: "Dart",       featured: false },
      { name: "SQL",        featured: false },
    ]
  },
  {
    fr: { category: "Frontend" },
    en: { category: "Frontend" },
    items: [
      { name: "Next.js",     featured: true },
      { name: "React",       featured: true },
      { name: "Flutter",     featured: true },
      { name: "Tailwind CSS",featured: false },
      { name: "Shadcn UI",   featured: false },
      { name: "SWR",         featured: false },
    ]
  },
  {
    fr: { category: "Backend" },
    en: { category: "Backend" },
    items: [
      { name: "Laravel",     featured: true },
      { name: "FastAPI",     featured: true },
      { name: "RESTful APIs",featured: false },
      { name: "Architecture",featured: false },
      { name: "Queues",      featured: false },
      { name: "WebSockets",  featured: false },
    ]
  },
  {
    fr: { category: "Bases de données" },
    en: { category: "Databases" },
    items: [
      { name: "MySQL",             featured: true },
      { name: "Firebase",          featured: true },
      { name: "Supabase",          featured: false },
      { name: "PostgreSQL",        featured: false },
      { name: "Redis",             featured: false },
    ]
  },
  {
    fr: { category: "DevOps & Cloud" },
    en: { category: "DevOps & Cloud" },
    items: [
      { name: "Docker",          featured: true },
      { name: "GitHub Actions",  featured: true },
      { name: "Vercel / Fly.io", featured: false },
      { name: "Nginx",           featured: false },
      { name: "CI/CD",           featured: false },
    ]
  },
  {
    fr: { category: "Innovations IA" },
    en: { category: "AI & Innovation" },
    items: [
      { name: "LLMs (GPT-4/Llama)", featured: true },
      { name: "AI Orchestration",   featured: true },
      { name: "Scikit-learn",       featured: false },
      { name: "NLP Systems",        featured: false },
    ]
  },
]

export const PROJECTS = [
  {
    num: "01",
    icon: "Bot",
    year: "2026",
    stack: ["Python", "FastAPI", "Scikit-learn", "Pandas", "Next.js", "MetaTrader 5"],
    github: "https://github.com/AdnaneAD1/bot-trading",
    featured: true,
    fr: {
      badge: "FinTech / AI",
      title: "Sentinel-Macro",
      subtitle: "Bot de Trading Algorithmique Multi-Agents",
      description: "Automate institutionnel piloté par 6 agents autonomes coordonnant analyse fondamentale (LLM) et technique. Scoring de sentiment en temps réel via GPT-4o et Llama-3.",
      highlight: "+120% de rentabilité estimée.",
    },
    en: {
      badge: "FinTech / AI",
      title: "Sentinel-Macro",
      subtitle: "Multi-Agent Algo-Trading Bot",
      description: "Institutional bot powered by 6 autonomous agents coordinating fundamental (LLM) and technical analysis. Real-time sentiment scoring via GPT-4o and Llama-3.",
      highlight: "+120% estimated ROI.",
    }
  },
  {
    num: "02",
    icon: "Zap",
    year: "2026",
    stack: ["Laravel", "PHP", "MySQL", "Docker"],
    github: "https://github.com/AdnaneAD1/calixt",
    featured: true,
    fr: {
      badge: "Freelance",
      title: "Calixt",
      subtitle: "Plateforme Marketing & CMS Haute Performance",
      description: "Application avec moteur NLP customisé pour support client intelligent. Architecture optimisée (Lazy-loading, Vite) et système complet de CMS multilingue.",
      highlight: "Moteur NLP Customisé.",
    },
    en: {
      badge: "Freelance",
      title: "Calixt",
      subtitle: "High-Performance Marketing & CMS Platform",
      description: "Application featuring a custom NLP engine for intelligent customer support. Optimized architecture (Lazy-loading, Vite) and full multilingual CMS.",
      highlight: "Custom NLP Engine.",
    }
  },
  {
    num: "03",
    icon: "Home",
    year: "2026",
    stack: ["Laravel", "PHP", "MySQL", "Canvas API"],
    github: "https://github.com/sergeafouda/selogeraubenin",
    featured: false,
    fr: {
      badge: "Real Estate",
      title: "SELEOGERAUBENIN",
      subtitle: "Plateforme Immobilière & Gestion Intelligente",
      description: "Système de détection de doublons (MD5/SHA-256), module de signature électronique légale et optimisation massive des performances SQL.",
    },
    en: {
      badge: "Real Estate",
      title: "SELEOGERAUBENIN",
      subtitle: "Real Estate Platform & Smart Management",
      description: "Duplicate detection system (MD5/SHA-256), legal e-signature module, and massive SQL performance optimization.",
    }
  },
  {
    num: "04",
    icon: "ShoppingBag",
    year: "2025",
    stack: ["Next.js 16", "TypeScript", "Firebase", "Radix UI"],
    github: "https://github.com/AdnaneAD1/mishki",
    featured: false,
    fr: {
      badge: "E-Commerce",
      title: "Mishki",
      subtitle: "Plateforme B2B/B2C Multi-régions",
      description: "Architecture unifiée gérant des flux B2B/B2C distincts. Internationalisation (France/Pérou), facturation automatisée et gestion NoSQL optimisée.",
    },
    en: {
      badge: "E-Commerce",
      title: "Mishki",
      subtitle: "Multi-region B2B/B2C Platform",
      description: "Unified architecture managing distinct B2B/B2C flows. Internationalization (FR/PE), automated invoicing, and optimized NoSQL management.",
    }
  },
  {
    num: "05",
    icon: "FileText",
    year: "2025",
    stack: ["Laravel 12", "Next.js 15", "Groq SDK", "Firebase"],
    github: null,
    featured: false,
    fr: {
      badge: "AI SaaS",
      title: "BUSINESSPLAN",
      subtitle: "Génération de Business Plans & Analyse IA",
      description: "Moteur d'évaluation utilisant l'IA (Groq) pour SWOT et prévisions financières. Calcul de Cash Flow sur 12 mois et visualisation Chart.js.",
    },
    en: {
      badge: "AI SaaS",
      title: "BUSINESSPLAN",
      subtitle: "AI Business Plan Generation & Analysis",
      description: "Evaluation engine using AI (Groq) for SWOT and financial forecasting. 12-month Cash Flow calculation and Chart.js visualization.",
    }
  }
]

export const EXPERIENCES = {
  fr: [
    {
      period: "2025 — Présent",
      company: "ZeroInvestissement",
      type: "Tech Lead",
      title: "Ingénieur Full Stack & Tech Lead",
      missions: [
        "Architecture et déploiement de la plateforme Mishki (Next.js, Firebase, TypeScript).",
        "Encadrement d'une équipe de développeurs : revues de code, choix technologiques et validation des livrables.",
        "Mise en place de systèmes de paiement et de logiques commerciales complexes à l'international.",
      ]
    },
    {
      period: "2023 — Présent",
      company: "Indépendant",
      type: "Freelance",
      title: "Développeur Full Stack & Architecte Web",
      missions: [
        "Accompagnement de startups dans la création de MVPs et la montée en charge d'applications web.",
        "Expertise en sécurité, SEO technique et intégration d'IA générative (Calixt, etc.).",
        "Gestion complète du cycle DevOps : Dockerisation, CI/CD et monitoring serveur.",
      ]
    },
    {
      period: "Févr. — Avr. 2026",
      company: "SELEOGERAUBENIN",
      type: "Ingénieur Consultant",
      title: "Développeur Full Stack",
      missions: [
        "Conception d'algorithmes de détection de doublons basés sur SHA-256 avec 80% de précision.",
        "Module de signature électronique sécurisée et automatisation de la génération documentaire PDF.",
        "Optimisation massive des performances SQL et gestion des tâches asynchrones via Redis/Queues.",
      ]
    },
    {
      period: "Mars — Juin 2025",
      company: "Diha's",
      type: "Poste Permanent",
      title: "Développeur Full Stack",
      missions: [
        "BusinessPlan IA : moteur SWOT Groq SDK, calcul automatisé Cash Flow 12 mois.",
        "Conception de l'API REST Laravel et du frontend Next.js 15 avec dashboards Chart.js.",
        "Intégration Firebase, authentification Socialite et génération documentaire PDF.",
      ]
    }
  ],
  en: [
    {
      period: "2025 — Present",
      company: "ZeroInvestissement",
      type: "Tech Lead",
      title: "Full Stack Engineer & Tech Lead",
      missions: [
        "Architecting and deploying the Mishki platform (Next.js, Firebase, TypeScript).",
        "Leading a team of developers: code reviews, architectural decisions, and delivery validation.",
        "Implementing international payment systems and complex business logic.",
      ]
    },
    {
      period: "2023 — Present",
      company: "Independent",
      type: "Freelance",
      title: "Full Stack Developer & Web Architect",
      missions: [
        "Supporting startups in building MVPs and scaling high-performance web applications.",
        "Expertise in security, technical SEO, and Generative AI integration.",
        "Full DevOps cycle management: Dockerization, CI/CD, and server monitoring.",
      ]
    },
    {
      period: "Feb. — Apr. 2026",
      company: "SELEOGERAUBENIN",
      type: "Consulting Engineer",
      title: "Full Stack Developer",
      missions: [
        "Designing duplicate detection algorithms based on SHA-256 with 80% similarity scoring.",
        "Secure e-signature module and automated PDF document generation pipeline.",
        "Massive SQL performance optimization and asynchronous task management via Redis/Queues.",
      ]
    },
    {
      period: "March — June 2025",
      company: "Diha's",
      type: "Full-Time Position",
      title: "Full Stack Developer",
      missions: [
        "AI BusinessPlan: SWOT engine using Groq SDK, 12-month automated Cash Flow projection.",
        "Designing Laravel REST API and Next.js 15 frontend with Chart.js dashboards.",
        "Firebase integration, Socialite auth, and PDF document generation.",
      ]
    }
  ]
}

export const UI = {
  fr: {
    nav: {
      home: "Accueil",
      about: "À propos",
      skills: "Skills",
      work: "Projets",
      xp: "Expérience",
      contact: "Contact",
      cv: "Télécharger CV",
      status: "Disponible",
    },
    about: {
      tag: "02",
      label: "À propos",
      heading: "Je ne fais pas des démos. <em class='italic text-[var(--blue)] not-italic'>Je livre.</em>",
      p1: "Ingénieur en <strong>Génie Logiciel</strong> spécialisé dans la conception de systèmes robustes et scalables. Actuellement <strong>Tech Lead</strong>, j'interviens sur l'ensemble du cycle de vie des produits numériques.",
      p2: "De l'architecture cloud au déploiement CI/CD, je transforme des idées complexes en applications prêtes pour la production, avec un focus constant sur la performance et l'expérience utilisateur.",
      p3: "Basé au Bénin, disponible pour des projets en freelance ou des collaborations à distance.",
      cards: [
        { title: "Ingénierie Full Stack", subtitle: "Architecture logicielle & Solutions scalables" },
        { title: "Intelligence Artificielle", subtitle: "Orchestration d'agents & LLMs" },
        { title: "Trading Algorithmique", subtitle: "Systèmes experts & Analyse de données" },
        { title: "DevOps & Cloud", subtitle: "Déploiement continu & Conteneurisation" },
      ]
    },
    projects: {
      tag: "04",
      label: "Sélection",
      heading: "Réalisations <em class='italic text-[var(--blue)] not-italic'>Sélectionnées</em>",
      viewOnGithub: "Voir sur GitHub",
    },
    skills: {
      tag: "03",
      label: "Expertise",
      heading: "Mon Stack <em class='italic text-[var(--blue)] not-italic'>Technique</em>",
    },
    contact: {
      tag: "06",
      label: "Contact",
      heading: "Travaillons <em class='italic text-[var(--blue)] not-italic'>Ensemble</em>",
      sub: "Un projet ? Une opportunité ? Discutons-en.",
      email: "Email",
      location: "Localisation",
      github: "GitHub",
    }
  },
  en: {
    nav: {
      home: "Home",
      about: "About",
      skills: "Skills",
      work: "Work",
      xp: "Experience",
      contact: "Contact",
      cv: "Download CV",
      status: "Available",
    },
    about: {
      tag: "02",
      label: "About",
      heading: "I don't just build demos. <em class='italic text-[var(--blue)] not-italic'>I deliver.</em>",
      p1: "<strong>Software Engineer</strong> specializing in designing robust and scalable systems. Currently serving as a <strong>Tech Lead</strong>, I manage the entire lifecycle of digital products.",
      p2: "From cloud architecture to CI/CD deployment, I transform complex ideas into production-ready applications, with a constant focus on performance and user experience.",
      p3: "Based in Benin, available for freelance projects or remote collaborations.",
      cards: [
        { title: "Full Stack Engineering", subtitle: "Software Architecture & Scalable Solutions" },
        { title: "Artificial Intelligence", subtitle: "LLM Orchestration & AI Agents" },
        { title: "Algorithmic Trading", subtitle: "Expert Systems & Data Analysis" },
        { title: "DevOps & Cloud", subtitle: "Continuous Deployment & Containerization" },
      ]
    },
    projects: {
      tag: "04",
      label: "Selection",
      heading: "Selected <em class='italic text-[var(--blue)] not-italic'>Works</em>",
      viewOnGithub: "View on GitHub",
    },
    skills: {
      tag: "03",
      label: "Expertise",
      heading: "Technical <em class='italic text-[var(--blue)] not-italic'>Stack</em>",
    },
    contact: {
      tag: "06",
      label: "Contact",
      heading: "Let's Work <em class='italic text-[var(--blue)] not-italic'>Together</em>",
      sub: "Got a project? An opportunity? Let's talk.",
      email: "Email",
      location: "Location",
      github: "GitHub",
    }
  }
}
