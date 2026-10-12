/* ==========================================================================
   LOKESWARAN S - PORTFOLIO DATA STORE
   Verified from Official Resume, VIT SCOPE Patent Registry, and GitHub
   ========================================================================== */

const PORTFOLIO_DATA = {
  profile: {
    name: "Lokeswaran S",
    title: "Backend & Systems Engineer • AI/ML & Research",
    shortBio: "B.Tech Computer Science student at VIT Chennai building resilient backend architectures, production-grade machine learning pipelines, and patented deep-tech systems.",
    location: "Chennai, India",
    education: {
      institution: "Vellore Institute of Technology, Chennai",
      degree: "B.Tech in Computer Science and Engineering",
      period: "Aug 2023 – May 2027",
      cgpa: "8.23",
      coursework: ["Operating Systems", "Object Oriented Programming", "Database Management Systems", "Data Structures & Algorithms"]
    },
    highSchool: {
      institution: "PCKG Government Higher Secondary School, Chennai",
      qualification: "Computer Science XII",
      period: "Aug 2021 – May 2023",
      score: "86%"
    },
    contacts: {
      email: "lokeswaran9218@gmail.com",
      phone: "+91 72009 72232",
      github: "https://github.com/lokes9218",
      githubUsername: "lokes9218",
      linkedin: "https://linkedin.com/in/lokeswaranS",
      linkedinHandle: "in/lokeswaranS",
      leetcode: "https://leetcode.com/u/Lokeswaran_S",
      leetcodeHandle: "Lokeswaran_S (400+ Solved)",
      twitter: "https://x.com/s_lokes9218",
      twitterHandle: "@s_lokes9218"
    },
    status: {
      available: true,
      text: "Open to Software Engineering & Systems Internships (Summer/Fall 2025–2026)"
    }
  },

  skills: [
    {
      category: "Programming Languages",
      items: [
        { name: "Python", level: "Advanced", desc: "Scripting, ML pipelines, data processing" },
        { name: "Java", level: "Proficient", desc: "Object-oriented architectures, core algorithms" },
        { name: "SQL", level: "Proficient", desc: "Complex queries, indexing, schema design" },
        { name: "JavaScript (ES6+)", level: "Proficient", desc: "Modern asynchronous workflows, APIs" },
        { name: "TypeScript", level: "Working Knowledge", desc: "Type-safe interfaces, backend schemas" },
        { name: "C / C++", level: "Foundational", desc: "Systems programming, data structures" }
      ]
    },
    {
      category: "Backend & Web Architecture",
      items: [
        { name: "Node.js", level: "Proficient", desc: "Event-driven runtime, scalable microservices" },
        { name: "Express.js", level: "Proficient", desc: "RESTful API design, middleware, auth" },
        { name: "REST APIs", level: "Advanced", desc: "Clean contract design, rate-limiting, documentation" },
        { name: "JWT Auth & Security", level: "Proficient", desc: "Token authentication, role-based access" },
        { name: "Mongoose ODM", level: "Proficient", desc: "Schema validation, aggregation pipelines" },
        { name: "React.js / Next.js", level: "Intermediate", desc: "Component architecture, dynamic state" }
      ]
    },
    {
      category: "Databases & Storage",
      items: [
        { name: "MongoDB", level: "Proficient", desc: "Document modeling, indexing, clustering" },
        { name: "MySQL / Oracle", level: "Proficient", desc: "Relational modeling, transactions, ACID" },
        { name: "Amazon DynamoDB", level: "Working Knowledge", desc: "NoSQL key-value patterns, high-throughput" }
      ]
    },
    {
      category: "Machine Learning & Data Science",
      items: [
        { name: "Scikit-Learn", level: "Proficient", desc: "Supervised pipelines, cross-validation, tuning" },
        { name: "XGBoost & Random Forest", level: "Proficient", desc: "Ensemble learning, feature importance" },
        { name: "Neural Networks (MLP)", level: "Intermediate", desc: "Multi-layer perceptron hybrid models" },
        { name: "Pandas & NumPy", level: "Proficient", desc: "Vectorized data wrangling, cleaning" },
        { name: "EDA & Visualization", level: "Proficient", desc: "Matplotlib, Seaborn diagnostics" },
        { name: "Generative AI & LLMs", level: "Intermediate", desc: "Prompt engineering, semantic retrieval" }
      ]
    },
    {
      category: "Cloud & Developer Tooling",
      items: [
        { name: "AWS (EC2, S3, Lambda)", level: "Working Knowledge", desc: "Serverless execution, storage, VM hosting" },
        { name: "Git & GitHub", level: "Advanced", desc: "Branching strategies, CI/CD actions" },
        { name: "Postman", level: "Proficient", desc: "API testing, automated collection runners" },
        { name: "Linux / Bash", level: "Proficient", desc: "CLI navigation, process automation, scripting" }
      ]
    }
  ],

  projects: [
    {
      id: "ffcs-xchanger",
      title: "FFCS XChanger",
      subtitle: "Automated Course Faculty Slot-Swapping Portal",
      category: "fullstack",
      categoryLabel: "Full Stack / Web Architecture",
      featured: true,
      github: "https://github.com/lokes9218",
      demo: null,
      stats: "500+ Active Student Logins",
      summary: "A production MERN stack portal designed to eliminate the logistical chaos of VIT's Fully Flexible Credit System (FFCS) by automating peer-to-peer faculty slot swap discovery.",
      tech: ["Node.js", "Express.js", "MongoDB", "React", "JWT Auth", "REST APIs"],
      caseStudy: {
        problem: "During VIT's FFCS course allocation windows, thousands of students scramble to exchange teacher slots and timetable hours across informal WhatsApp groups and Telegram chats. The process was unorganized, riddled with missed messages, duplicated requests, and high security risks without verification.",
        contribution: "Independently designed and built the complete backend architecture, user authentication flow, and database schema, and co-built the responsive frontend interface.",
        architecture: [
          "RESTful Express.js API layer with modular routing for authentication, swap postings, slot matching, and user status.",
          "Mongoose schemas enforcing strict validation on course codes, slot designations, and user credentials.",
          "Stateless JSON Web Token (JWT) authentication flow with bcrypt password hashing.",
          "Indexed MongoDB collections allowing sub-50ms search across hundreds of concurrent swap requests."
        ],
        challenges: [
          {
            title: "Handling High Concurrent Registration Surges",
            solution: "Designed lightweight, normalized MongoDB collections with composite indexes on course codes and slot IDs to prevent query bottlenecks during peak FFCS swap windows."
          },
          {
            title: "Preventing Spam & Duplicate Postings",
            solution: "Implemented custom middleware that authenticates student session tokens and restricts users from publishing duplicate active swaps for the exact same course slot."
          }
        ],
        results: [
          "Onboarded and validated 500+ active student logins during peak semester registration.",
          "Cut swap turnaround time from days of unstructured chat messaging down to immediate filter-based matches.",
          "Zero reported authentication compromises or unauthorized state mutations."
        ],
        nextSteps: "Integrate WebSocket-based instant bilateral notifications and automated two-way swap contract verification."
      }
    },
    {
      id: "cipher-dao",
      title: "CIPHER DAO",
      subtitle: "Confidential Decentralized Autonomous Organization Framework Using Inco TEE",
      category: "web3",
      categoryLabel: "Security / Decentralized Systems",
      featured: true,
      github: "https://github.com/lokes9218",
      demo: null,
      stats: "Inco TEE Confidential Architecture",
      summary: "A privacy-preserving DAO governance framework utilizing Trusted Execution Environments (Inco TEE) to achieve encrypted voting, confidential balances, and anti-collusion execution.",
      tech: ["Inco TEE", "Solidity", "Confidential Compute", "Cryptography", "Smart Contracts", "Web3"],
      caseStudy: {
        problem: "Traditional decentralized autonomous organizations conduct voting completely transparently on public ledgers. This transparency enables voter coercion, front-running, targeted bribing, and herd mentality, compromising fair governance outcomes.",
        contribution: "Architected the confidential governance flow, studied Inco TEE cryptographic execution mechanics, and authored the architectural specifications and smart contract interface definitions presented at academic panel reviews.",
        architecture: [
          "Confidential execution layer powered by Inco Network's hardware-isolated Trusted Execution Environment (TEE).",
          "Encrypted state variables for ballot tallies and member balances, preventing validators from inspecting in-flight voter choices.",
          "On-chain verifiable computation that outputs only the cryptographic final quorum result upon vote closing."
        ],
        challenges: [
          {
            title: "Balancing Verifiability with Total Confidentiality",
            solution: "Utilized TEE attestation proofs to ensure that computations inside the enclave cannot be forged while keeping individual voting ballots completely hidden from public visibility."
          },
          {
            title: "Preventing Front-Running & Last-Minute Collusion",
            solution: "Enforced sealed-bid style private governance ballots that remain encrypted until the governance proposal expiration block."
          }
        ],
        results: [
          "Developed end-to-end architecture validated through comprehensive panel review at VIT Chennai.",
          "Demonstrated zero voter choice exposure during active proposal rounds while maintaining on-chain verifiability."
        ],
        nextSteps: "Integrating homomorphic encryption primitives for cross-chain state verification."
      }
    },
    {
      id: "aircraft-injury-prediction",
      title: "Aircraft Injury Severity Prediction",
      subtitle: "Deep Hybrid Machine Learning Pipeline for Aviation Triage",
      category: "aiml",
      categoryLabel: "Machine Learning / Data Science",
      featured: true,
      github: "https://github.com/lokes9218",
      demo: null,
      stats: "94.5% Classification Accuracy",
      summary: "An end-to-end predictive machine learning pipeline that analyzes complex multi-dimensional aviation incident parameters to forecast casualty and injury severity tiers.",
      tech: ["Python", "Scikit-Learn", "XGBoost", "Random Forest", "MLP (Neural Net)", "Pandas", "Matplotlib"],
      caseStudy: {
        problem: "Aviation accident data is inherently sparse, highly imbalanced, and filled with non-linear relationships across meteorological variables, aircraft mechanical structural attributes, and flight conditions. Rapidly forecasting casualty severity is vital for regulatory analysis and preventative safety engineering.",
        contribution: "Developed the entire pipeline from raw data wrangling, missing value strategies, and feature encoding to building and evaluating a deep hybrid ensemble combining MLP, Random Forest, and XGBoost.",
        architecture: [
          "Robust preprocessing pipeline with multivariate imputation and domain-specific feature scaling.",
          "Feature importance filtering eliminating collinear and uninformative sensor dimensions.",
          "Hybrid multi-stage architecture: Tree-based ensemble (Random Forest & XGBoost) feature representations fed alongside deep Multi-Layer Perceptron (MLP) classification layers."
        ],
        challenges: [
          {
            title: "High Class Imbalance Across Severity Categories",
            solution: "Employed stratified sampling alongside tuned class weighting and SMOTE oversampling to prevent the classifier from collapsing toward the dominant class."
          },
          {
            title: "Complex Non-Linear Interactions",
            solution: "Benchmarked standalone models against the hybrid architecture; the combination of gradient-boosted decision boundaries with MLP non-linear activations captured edge-case fatalities significantly better."
          }
        ],
        results: [
          "Achieved 94.5% overall test classification accuracy.",
          "Superior macro-averaged recall across severe and fatal injury categories compared to standard baseline models.",
          "Comprehensive feature contribution analysis identifying weather severity and structural impact angles as dominant predictors."
        ],
        nextSteps: "Package the inference model into a containerized FastAPI service for instant interactive query evaluation."
      }
    },
    {
      id: "divine-ai",
      title: "Divine AI / Mahabharata Wisdom Mentor",
      subtitle: "Contextual Conversational AI Grounded in Epical Teachings",
      category: "aiml",
      categoryLabel: "Generative AI / NLP",
      featured: false,
      github: "https://github.com/lokes9218/Divine_AI",
      demo: null,
      stats: "Context-Grounded LLM Mentor",
      summary: "A generative AI knowledge system designed to provide nuanced ethical, leadership, and emotional guidance by grounding modern queries in the timeless philosophical teachings of the Mahabharata.",
      tech: ["JavaScript", "Python", "Generative AI", "Semantic Search", "Prompt Engineering"],
      caseStudy: {
        problem: "General-purpose LLMs frequently provide shallow or hallucinated philosophical advice when questioned on traditional ethical dilemmas, failing to anchor responses in authentic textual contexts.",
        contribution: "Curated conversational datasets, designed contextual prompting structures, and built the interactive web interface connecting user prompts to philosophical synthesis engines.",
        architecture: [
          "Semantic query parsing mapping emotional or situational dilemmas to specific textual discourse themes.",
          "Multi-stage prompt routing providing explanatory parallels, Sanskrit aphorism context, and practical modern takeaways."
        ],
        challenges: [
          {
            title: "Preventing Hallucinations & Modern Misinterpretations",
            solution: "Strict prompt guards and grounding rules that prevent the model from fabricating non-existent verses or projecting unintended dogmatic assertions."
          }
        ],
        results: [
          "Open-source implementation on GitHub with positive user feedback.",
          "High semantic relevance on nuanced leadership and ethical crisis queries."
        ],
        nextSteps: "Implement full vector embedding retrieval (RAG) using Pinecone/ChromaDB over the complete critical edition text."
      }
    },
    {
      id: "brain-tumor-classification",
      title: "Brain Tumor Classification from Gene Expression",
      subtitle: "Supervised Learning on High-Dimensional Microarray Genomic Vectors",
      category: "research",
      categoryLabel: "Research & Healthcare AI",
      featured: false,
      github: "https://github.com/lokes9218",
      demo: null,
      stats: "Published Research Paper",
      summary: "Published academic research benchmark developing supervised machine learning architectures to classify brain tumor subtypes directly from microarray gene expression profiles.",
      tech: ["Python", "Supervised ML", "Genomic Data Processing", "SVM", "Random Forest", "Bioinformatics"],
      caseStudy: {
        problem: "Microarray gene expression datasets suffer from the 'curse of dimensionality'—thousands of gene expression levels measured across only dozens of patient samples. Traditional diagnostic methods struggle to identify informative biomarker signatures without severe overfitting.",
        contribution: "Conducted feature selection and dimensionality reduction, developed supervised classification pipelines (SVM, Random Forest, k-NN), and co-authored the published research paper.",
        architecture: [
          "Statistical filtering and variance thresholding to isolate candidate oncogenes.",
          "Supervised classifier training with cross-validation protocols to ensure zero data leakage.",
          "Confusion matrix validation measuring sensitivity and specificity across tumor subcategories."
        ],
        challenges: [
          {
            title: "Small Sample Size with Massive Gene Dimensionality",
            solution: "Rigorous k-fold cross-validation coupled with recursive feature elimination to distill the predictive gene signature down to statistically significant biomarkers."
          }
        ],
        results: [
          "Paper published: 'Brain Tumor Classification from Gene Expression Dataset through Supervised Machine Learning Algorithms'.",
          "Demonstrated high diagnostic precision and identified candidate biomarker subsets for further clinical validation."
        ],
        nextSteps: "Investigate graph neural networks (GNNs) modeling gene interaction regulatory pathways."
      }
    }
  ],

  patents: [
    {
      id: "patent-ultrasound-stroke",
      appNo: "202641050864",
      year: "2026",
      status: "Published",
      authority: "Indian Patent Office (Govt. of India) / VIT Chennai SCOPE",
      title: "System And Method For Stroke Rehabilitation Employing Transcranial Focused Ultrasound",
      inventors: "Dr. Shridevi S, Vijay Bala, Harshavardan, Lokeswaran S",
      domain: "Biomedical Systems & Neuro-Rehabilitation",
      abstract: "A non-invasive neuro-modulation apparatus and computational method delivering precisely calibrated low-intensity transcranial focused ultrasound pulses to targeted cortical and subcortical brain regions to accelerate neuroplastic recovery following ischemic stroke."
    },
    {
      id: "patent-glucose-estimation",
      appNo: "202541105574",
      year: "2025",
      status: "Published",
      authority: "Indian Patent Office (Govt. of India) / VIT Chennai SCOPE",
      title: "Blood Glucose Level Estimation System",
      inventors: "Dr. Sahaya Beni Prathiba B, Dr. Dhanalakshmi R, Lokeswaran S",
      domain: "Non-Invasive Diagnostics & Sensor Analytics",
      abstract: "A non-invasive metabolic monitoring system leveraging optical/spectroscopic signal absorption data combined with digital signal processing algorithms to estimate physiological blood glucose concentrations continuously without blood extraction."
    },
    {
      id: "patent-glucose-detection",
      appNo: "202541113464",
      year: "2025",
      status: "Published",
      authority: "Indian Patent Office (Govt. of India) / VIT Chennai SCOPE",
      title: "System For Detecting Glucose And Method Thereof",
      inventors: "Dr. Vignesh U, Lokeswaran S (23BCE5104)",
      domain: "Embedded Biosensing & Analytical Hardware",
      abstract: "An integrated sensor architecture and method for rapid, accurate biochemical glucose detection using proprietary filtering circuitry and signal calibration algorithms to eliminate environmental baseline drift."
    },
    {
      id: "patent-planet-underground",
      appNo: "202641058860",
      year: "2026",
      status: "Published",
      authority: "Indian Patent Office (Govt. of India) / VIT Chennai SCOPE",
      title: "System For Planet-Wide Underground Monitoring And Method Thereof",
      inventors: "Dr. Sahaya Beni Prathiba B, Dr. Dhanalakshmi R, Lokeswaran S (23BCE5104)",
      domain: "Geophysical Telematics & Subsurface IoT",
      abstract: "A distributed sensor network and telemetric processing system for continuous underground subsurface strata monitoring, acoustic vibration tracking, and early seismic anomaly detection across wide geographical regions."
    },
    {
      id: "patent-smart-road",
      appNo: "202541065792",
      year: "2025",
      status: "Published",
      authority: "Indian Patent Office (Govt. of India) / VIT Chennai SCOPE",
      title: "System And Method For Constructing And Managing Smart Road Infrastructure",
      inventors: "Dr. U. Vignesh, Dr. Monica K M, Lokeswaran S, Dharshini B",
      domain: "Smart Cities & Intelligent Transportation Systems",
      abstract: "An integrated telematics and automated infrastructure management system utilizing embedded road sensors, real-time vehicular load telemetry, and automated maintenance dispatch algorithms to optimize road lifespan and traffic throughput."
    }
  ],

  publications: [
    {
      id: "pub-brain-tumor",
      type: "Research Paper",
      status: "Published",
      title: "Brain Tumor Classification from Gene Expression Dataset through Supervised Machine Learning Algorithms",
      authors: "Lokeswaran S et al.",
      venue: "Peer-Reviewed Academic Publication",
      year: "2024–2025",
      focus: "Supervised machine learning algorithms, high-dimensional genomic microarray vectors, dimensionality reduction, medical oncology diagnostics."
    }
  ],

  experience: [
    {
      role: "Student Researcher & Deep-Tech Patent Co-Inventor",
      org: "School of Computer Science and Engineering (SCOPE), VIT Chennai",
      period: "2024 – Present",
      location: "Chennai, India",
      points: [
        "Co-invented 5 published Indian patents in non-invasive biomedical sensors, neuro-rehabilitation ultrasound, subsurface telemetry, and smart infrastructure.",
        "Collaborated closely with department faculty (Dr. Sahaya Beni Prathiba, Dr. Vignesh U, Dr. Shridevi S) to design algorithmic pipelines, system schematics, and patent documentation.",
        "Published academic research on genomic machine learning for brain tumor classification."
      ]
    },
    {
      role: "Event Host & Cultural Lead",
      org: "Arignar Anna Tamil Mandram, VIT Chennai",
      period: "2023 – 2024",
      location: "Chennai, India",
      points: [
        "Led and coordinated 3 large-scale cultural symposiums and events hosting 450+ participants across VIT Chennai.",
        "Directed event logistics, cross-functional team scheduling, public communications, and on-stage hosting.",
        "Strengthened leadership, high-pressure crisis management, and stakeholder coordination."
      ]
    },
    {
      role: "Competitive Programmer",
      org: "LeetCode & Problem Solving",
      period: "2023 – Present",
      location: "Active Practice",
      points: [
        "Solved 400+ algorithmic and data structure problems on LeetCode (handle: Lokeswaran_S).",
        "Focused on dynamic programming, graph traversals, binary search trees, and optimal asymptotic time/space complexities."
      ]
    }
  ],

  certifications: [
    {
      name: "Backend Development",
      issuer: "Udemy",
      year: "2024",
      skills: "REST API architecture, Node.js, Express, Database Design"
    },
    {
      name: "Introduction to Generative AI",
      issuer: "IBM",
      year: "2024",
      skills: "Foundation models, LLM architectures, prompt engineering, ethics in AI"
    }
  ]
};
