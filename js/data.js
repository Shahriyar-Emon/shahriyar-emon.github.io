// ================================================================
// EDIT YOUR INFORMATION HERE
// This is the only file you need to touch to update your content.
// Nothing here controls animations or layout — just the words,
// links, and lists that appear on the site.
// ================================================================

const portfolioData = {
  name: "Md.Shahriyar",
  role: "Computer Science Student & Future Cybersecurity Engineer",
  university: "Bangladesh University of Business and Technology (BUBT)",
  location: "Dhaka, Bangladesh",

  profileImage: "images/profile.jpg",

  heroDescription:
    "Building my foundation in software development, web development, and computer science with a long-term direction toward cybersecurity.",

  social: {
    github: "https://github.com/Shahriyar-Emon",
    linkedin: "https://www.linkedin.com/in/md-shahriyar-emon-98b710348/",
    email: "https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox",
  },

  about: [
    {
      label: "Education",
      value: "B.Sc. in Computer Science & Engineering",
    },
    {
      label: "Current focus",
      value: "Web Development + CS Fundamentals",
    },
    {
      label: "Long-term interest",
      value: "Cybersecurity",
    },
    {
      label: "Location",
      value: "Dhaka, Bangladesh",
    },
  ],

  // status: "done" | "current" | "future"
  journey: [
    {
      year: "2024",
      title: "Started CSE Journey",
      detail: "Began my B.Sc. in Computer Science & Engineering at BUBT.",
      status: "done",
    },
    {
      year: "2025",
      title: "Programming Fundamentals",
      detail: "Built a foundation in C and C++, and started thinking in data structures.",
      status: "done",
    },
    {
      year: "2026",
      title: "Java, Web Dev & Systems",
      detail: "Learning Java, Web Development, Database Systems, and Operating Systems.",
      status: "current",
    },
    {
      year: "Next",
      title: "Networking, Linux & Security",
      detail: "Planning to move into Networking, Linux, and the fundamentals of Cybersecurity.",
      status: "future",
    },
  ],

  // state: "learning" | "strengthening" | "exploring"
  learningBoard: {
    learning: [
      "Operating Systems",
      "Database Systems",
      "Advanced Java",
      "Web Development",
    ],
    strengthening: ["Data Structures & Algorithms"],
    exploring: ["Linux", "Networking", "Cybersecurity"],
  },

  // Add a new project by copying an object below and editing its fields.
  // Remove a project by deleting its object from this array.
  projects: [
    {
      number: "01",
      title: "Digital Detective",
      description:
        "A console-based investigation project focused on logic, data handling, and problem solving.",
      technologies: ["Python"],
      github: "#",
      demo: "",
    },
    // {
    //   number: "02",
    //   title: "Your Next Project",
    //   description: "Short description of what it does and why you built it.",
    //   technologies: ["Tech1", "Tech2"],
    //   github: "#",
    //   demo: "#",
    // },
  ],

  skills: {
    programming: ["C/C++", "Java", "JavaScript"],
    web: ["HTML", "CSS", "JavaScript"],
    tools: ["Git", "GitHub", "VS Code"],
    exploring: ["Linux", "Networking", "Cybersecurity"],
  },

  direction: [
    "Software Development",
    "Web Development",
    "Computer Science Foundation",
    "Linux + Networking",
    "Cybersecurity",
  ],

  directionStatement:
    "The destination is cybersecurity. The foundation starts with software engineering and strong computer science fundamentals.",

  nav: [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Journey", href: "#journey" },
    { label: "Learning", href: "#learning" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Direction", href: "#direction" },
    { label: "Contact", href: "#contact" },
  ],
};
