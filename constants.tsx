
import { Club, ClubCategory } from './types';

export const CLUBS: Club[] = [
  // TECHNICAL
  {
    id: 'dcc',
    name: 'Developers & Coders Club (DCC)',
    category: ClubCategory.TECHNICAL,
    shortDescription: 'The premier community for competitive programming and open-source contributions.',
    longDescription: 'DCC is the heart of coding at NITA. We organize weekly contests, hackathons, and workshops on modern tech stacks. Joining DCC means becoming part of an elite community that consistently produces top-tier developers and competitive programmers who excel in GSoC, ICPC, and major corporate hackathons.',
    image: 'https://raw.githubusercontent.com/tanya-agrawal4/clubsphere-nita/main/assets/logos/dcc.png',
    instagram: 'https://www.instagram.com/dccnita',
    applyLink: 'apply.html?club=DCC'
  },
  {
    id: 'dsai',
    name: 'DSAI Club',
    category: ClubCategory.TECHNICAL,
    shortDescription: 'Focusing on the frontiers of Data Science and Artificial Intelligence.',
    longDescription: 'The Data Science and AI club focuses on providing students with the tools to master machine learning, deep learning, and data analytics. We bridge the gap between academic theory and industry application through hands-on project building and research papers.',
    image: 'https://raw.githubusercontent.com/tanya-agrawal4/clubsphere-nita/main/assets/logos/dsai.png',
    instagram: 'https://www.instagram.com/dsai_nita',
    applyLink: 'apply.html?club=DSAI'
  },
  {
    id: 'gdg',
    name: 'GDG IIIT Agartala',
    category: ClubCategory.TECHNICAL,
    shortDescription: 'The Google Developer Group community fostering innovation through Google technologies.',
    longDescription: 'Google Developer Groups (GDG) is for students interested in Google developer technologies. Everything from Android and Cloud to TensorFlow and Flutter. We provide a peer-to-peer learning environment and a direct link to the global Google developer community.',
    image: 'https://raw.githubusercontent.com/tanya-agrawal4/clubsphere-nita/main/assets/logos/gdg.png',
    instagram: 'https://www.instagram.com/gdgiiitagartala',
    applyLink: 'apply.html?club=GDG'
  },
  {
    id: 'anima',
    name: 'Anima – Aero Club',
    category: ClubCategory.TECHNICAL,
    shortDescription: 'Exploring the skies through drone technology and aerospace engineering.',
    longDescription: 'Anima is dedicated to the world of aerodynamics and aviation. We design, build, and fly R.C. planes and drones. Our members learn about the mechanics of flight and the future of unmanned aerial vehicles through practical construction and flight simulation.',
    image: 'https://raw.githubusercontent.com/tanya-agrawal4/clubsphere-nita/main/assets/logos/anima.png',
    instagram: 'https://www.instagram.com/anima_the_aero_club',
    applyLink: 'apply.html?club=Anima'
  },
  {
    id: 'mechestremo',
    name: 'Mechestremo Racing',
    category: ClubCategory.TECHNICAL,
    shortDescription: 'NITA\'s official formula student racing team, pushing mechanical boundaries.',
    longDescription: 'Mechestremo Racing is a high-performance team designing and building formula-style race cars. It requires rigorous engineering, project management, and a passion for automotive excellence. We represent NITA in national racing competitions like Formula Student India.',
    image: 'https://raw.githubusercontent.com/tanya-agrawal4/clubsphere-nita/main/assets/logos/mechestremo.png',
    instagram: 'https://www.instagram.com/team_mechestremo_racing',
    applyLink: 'apply.html?club=Mechestremo'
  },

  // BUSINESS
  {
    id: 'business',
    name: 'Business Club',
    category: ClubCategory.BUSINESS,
    shortDescription: 'Cultivating the entrepreneurial spirit through startup incubation.',
    longDescription: 'B-Club is the platform for future entrepreneurs and corporate leaders. We foster a culture of innovation, providing mentorship for startups, conducting market research, and hosting business pitch competitions like B-Plan.',
    image: 'https://raw.githubusercontent.com/tanya-agrawal4/clubsphere-nita/main/assets/logos/business.png',
    instagram: 'https://www.instagram.com/bclub.nita',
    applyLink: 'apply.html?club=Business'
  },
  {
    id: 'consulting',
    name: 'Consulting Club',
    category: ClubCategory.BUSINESS,
    shortDescription: 'Solving complex business problems through case studies and strategy.',
    longDescription: 'The Consulting Club focuses on developing the analytical and problem-solving skills necessary for a career in management consulting. We solve real-world business cases and host mock interviews with industry professionals.',
    image: 'https://raw.githubusercontent.com/tanya-agrawal4/clubsphere-nita/main/assets/logos/consulting.png',
    instagram: 'https://www.instagram.com/consulting_club_nita',
    applyLink: 'apply.html?club=Consulting'
  },

  // CREATIVE
  {
    id: 'pixels',
    name: 'Pixels',
    category: ClubCategory.CREATIVE,
    shortDescription: 'The visual storytelling hub specializing in professional photography.',
    longDescription: 'Pixels is the official photography and film-making club of NITA. We capture the essence of campus life and events. Our members master visual storytelling through high-end cameras, drones, and professional editing software.',
    image: 'https://raw.githubusercontent.com/tanya-agrawal4/clubsphere-nita/main/assets/logos/pixels.png',
    instagram: 'https://www.instagram.com/pixels.nita',
    applyLink: 'apply.html?club=Pixels'
  },
  {
    id: 'anarc',
    name: 'ANARC',
    category: ClubCategory.CREATIVE,
    shortDescription: 'Architecture and Design community focused on aesthetic innovation.',
    longDescription: 'ANARC brings together creative minds interested in design and structure. We explore the intersection of architecture, aesthetics, and modern design principles through workshops and campus design projects.',
    image: 'https://raw.githubusercontent.com/tanya-agrawal4/clubsphere-nita/main/assets/logos/anarc.png',
    instagram: 'https://www.instagram.com/anarc_nita',
    applyLink: 'apply.html?club=ANARC'
  },
  {
    id: 'finearts',
    name: 'Fine Arts Club',
    category: ClubCategory.CREATIVE,
    shortDescription: 'Nurturing traditional and digital artistry through exhibitions.',
    longDescription: 'The Fine Arts Club is a sanctuary for painters, sketchers, and digital artists. We beautify the campus with murals and showcase student talent through annual art exhibitions and creative competitions.',
    image: 'https://raw.githubusercontent.com/tanya-agrawal4/clubsphere-nita/main/assets/logos/finearts.png',
    instagram: 'https://www.instagram.com/fineartsclub.nita',
    applyLink: 'apply.html?club=FineArts'
  },

  // CULTURAL
  {
    id: 'aaveg',
    name: 'Aaveg',
    category: ClubCategory.CULTURAL,
    shortDescription: 'Celebrating the rhythm and soul of NITA through music and dance.',
    longDescription: 'Aaveg is the heartbeat of cultural expression on campus. We organize large-scale fests, musical nights, and dance showcases. It is a home for every student who finds joy in performing arts.',
    image: 'https://raw.githubusercontent.com/tanya-agrawal4/clubsphere-nita/main/assets/logos/aaveg.png',
    instagram: 'https://www.instagram.com/aaveg_nita',
    applyLink: 'apply.html?club=Aaveg'
  },
  {
    id: 'spicmacay',
    name: 'SPIC MACAY',
    category: ClubCategory.CULTURAL,
    shortDescription: 'Promoting Indian classical music and culture among youth.',
    longDescription: 'The NITA chapter of SPIC MACAY brings world-class classical musicians and artists to campus. We focus on preserving and promoting the rich heritage of Indian classical music and traditional art forms.',
    image: 'https://raw.githubusercontent.com/tanya-agrawal4/clubsphere-nita/main/assets/logos/spicmacay.png',
    instagram: 'https://www.instagram.com/spicmacay_nita',
    applyLink: 'apply.html?club=SPICMACAY'
  },
  {
    id: 'dzire',
    name: 'Dzire',
    category: ClubCategory.CULTURAL,
    shortDescription: 'The ultimate dance squad mastering contemporary and hip-hop.',
    longDescription: 'Dzire is NITA\'s premier dance crew. We specialize in synchronized group performances, hip-hop, and urban dance styles, competing in various inter-college fests across the country.',
    image: 'https://raw.githubusercontent.com/tanya-agrawal4/clubsphere-nita/main/assets/logos/dzire.png',
    instagram: 'https://www.instagram.com/dzire_nita',
    applyLink: 'apply.html?club=Dzire'
  },
  {
    id: 'malhar',
    name: 'Malhar',
    category: ClubCategory.CULTURAL,
    shortDescription: 'A musical odyssey celebrating classical and folk traditions.',
    longDescription: 'Malhar is dedicated to the exploration of classical and folk music traditions. We host serene musical evenings and workshops to teach traditional instruments and vocal techniques to students.',
    image: 'https://raw.githubusercontent.com/tanya-agrawal4/clubsphere-nita/main/assets/logos/malhar.png',
    instagram: 'https://www.instagram.com/malhar_nita',
    applyLink: 'apply.html?club=Malhar'
  },

  // LITERARY
  {
    id: 'nlc',
    name: 'NLC – Literary Club',
    category: ClubCategory.LITERARY,
    shortDescription: 'The hub for poets, writers, and thinkers at NIT Agartala.',
    longDescription: 'The NITA Literary Club (NLC) is where words come to life. We host poetry slams, creative writing workshops, and book discussion sessions. Our annual magazine showcases the finest literary talent on campus.',
    image: 'https://raw.githubusercontent.com/tanya-agrawal4/clubsphere-nita/main/assets/logos/nlc.png',
    instagram: 'https://www.instagram.com/nlc_nita',
    applyLink: 'apply.html?club=NLC'
  },
  {
    id: 'munsoc',
    name: 'MUNSOC',
    category: ClubCategory.LITERARY,
    shortDescription: 'Mastering international relations through Model United Nations.',
    longDescription: 'MUNSOC trains students in diplomacy, international relations, and public speaking. We organize NITA-MUN and lead delegations to prestigious MUN conferences globally, honing negotiation and research skills.',
    image: 'https://raw.githubusercontent.com/tanya-agrawal4/clubsphere-nita/main/assets/logos/munsoc.png',
    instagram: 'https://www.instagram.com/munsoc_nita',
    applyLink: 'apply.html?club=MUNSOC'
  },

  // SOCIAL
  {
    id: 'wecan',
    name: 'We Can',
    category: ClubCategory.SOCIAL,
    shortDescription: 'Student-led initiative for social change and community welfare.',
    longDescription: 'We Can is a social service club dedicated to making a tangible impact. From organizing donation drives to teaching underprivileged children, we believe in the power of student action to transform lives.',
    image: 'https://raw.githubusercontent.com/tanya-agrawal4/clubsphere-nita/main/assets/logos/wecan.png',
    instagram: 'https://www.instagram.com/wecan_nita',
    applyLink: 'apply.html?club=WeCan'
  },
  {
    id: 'ncc',
    name: 'NCC',
    category: ClubCategory.SOCIAL,
    shortDescription: 'National Cadet Corps - Character, Comradeship, and Service.',
    longDescription: 'NCC at NITA instills discipline, leadership, and a sense of duty. Our cadets participate in rigorous training, national camps, and community service projects, embodying the spirit of "Unity and Discipline".',
    image: 'https://raw.githubusercontent.com/tanya-agrawal4/clubsphere-nita/main/assets/logos/ncc.png',
    instagram: 'https://www.instagram.com/ncc_nita',
    applyLink: 'apply.html?club=NCC'
  },

  // SPORTS
  {
    id: 'hoopers',
    name: 'Hoopers (Basketball)',
    category: ClubCategory.SPORTS,
    shortDescription: 'The official basketball community of NIT Agartala.',
    longDescription: 'Hoopers is for the basketball enthusiasts of NITA. We organize inter-branch tournaments and represent the college in national level athletic meets. Join us for intensive practice and the spirit of the court.',
    image: 'https://raw.githubusercontent.com/tanya-agrawal4/clubsphere-nita/main/assets/logos/hoopers.png',
    instagram: 'https://www.instagram.com/hoopers_nita',
    applyLink: 'apply.html?club=Hoopers'
  },
  {
    id: 'shuttlers',
    name: 'Shuttlers',
    category: ClubCategory.SPORTS,
    shortDescription: 'Promoting badminton through training and competitive play.',
    longDescription: 'Shuttlers brings together badminton players of all skill levels. We host annual championships and provide a community for students to stay fit and competitive through one of the most popular sports on campus.',
    image: 'https://raw.githubusercontent.com/tanya-agrawal4/clubsphere-nita/main/assets/logos/shuttlers.png',
    instagram: 'https://www.instagram.com/shuttlers_nita',
    applyLink: 'apply.html?club=Shuttlers'
  }
];
