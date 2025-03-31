// Mobile menu toggle
function setupMobileMenu() {
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');

  mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });
}

// Initialize all functionality
function init() {
  setupMobileMenu();
}

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', init);

// Fetch GitHub projects
async function fetchAllGitHubProjects() {
  let page = 1;
  let allProjects = [];

  try {
    while (true) {
      const response = await fetch(`https://api.github.com/users/OwPor/repos?per_page=100&page=${page}`);
      
      if (!response.ok) {
        console.error(`GitHub API error: ${response.status} ${response.statusText}`);
        break;
      }

      const projects = await response.json();
      if (!Array.isArray(projects) || projects.length === 0) break;
      
      allProjects.push(...projects);
      page++;
    }

    displayProjects(allProjects);
  } catch (error) {
    console.error('Error fetching GitHub projects:', error);
  }
}

function displayProjects(projects) {
  const projectsContainer = document.getElementById('projects-container');
  projectsContainer.innerHTML = '';

  projects.forEach(project => {
    const projectCard = document.createElement('div');
    projectCard.className = 'bg-white rounded-lg shadow-md overflow-hidden';

    projectCard.innerHTML = `
      <div class="p-6">
        <h3 class="text-xl font-semibold text-gray-900 mb-2">${project.name}</h3>
        <p class="text-gray-600 mb-4">${project.description || 'No description provided'}</p>
        <div class="flex items-center text-sm text-gray-500">
          <span class="mr-4">⭐ ${project.stargazers_count}</span>
          <span>📁 ${project.language || 'N/A'}</span>
        </div>
        <a href="${project.html_url}" class="mt-4 inline-block text-indigo-600 hover:text-indigo-800" target="_blank">View Project</a>
      </div>
    `;

    projectsContainer.appendChild(projectCard);
  });
}

// Fetch profile data
async function fetchProfile() {
  const contactContainer = document.getElementById('contact-container');
  
  contactContainer.innerHTML = `
    <div class="w-full">
      <div class="max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-md text-center">
        <p class="text-lg">Open to new opportunities, collaborations, or tech discussions—let's connect!</p>
        <div class="space-y-4 mt-6">
          <div class="flex items-center justify-center">
            <svg class="h-5 w-5 text-gray-500 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.97-1.37-3-3.65-3-2.19 0-3.83 1.08-3.83 2.81 0 1.78 1.37 2.45 3.24 2.94 1.93.51 2.35 1.07 2.35 1.82 0 .99-.84 1.58-2.2 1.58-1.63 0-2.26-.76-2.4-1.64H8.3c.14 2.19 1.76 3.42 4.01 3.42 2.49 0 4.1-1.32 4.1-3.13 0-1.87-1.5-2.49-3.1-2.89z"/>
            </svg>
            <span>Email: concepcionrayvincent@gmail.com</span>
          </div>
          <div class="flex items-center justify-center">
            <svg class="h-5 w-5 text-gray-500 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            <a href="https://github.com/OwPor" target="_blank" rel="noopener noreferrer" class="text-primary-600 hover:underline">GitHub Profile</a>
          </div>
          <div class="flex items-center justify-center">
            <svg class="h-5 w-5 text-gray-500 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
            <a href="https://www.linkedin.com/in/ray-vincent-concepcion" target="_blank" rel="noopener noreferrer" class="text-primary-600 hover:underline">LinkedIn Profile</a>
          </div>
          <div class="flex items-center justify-center">
            <svg class="h-5 w-5 text-gray-500 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
            </svg>
            <a href="https://www.facebook.com/ray.vincent.ds.concepcion" target="_blank" rel="noopener noreferrer" class="text-primary-600 hover:underline">Facebook Profile</a>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Populate professional interests section
function populateInterests() {
  const interests = [
    'Software Development: Bringing ideas to life through code',
    'Prompt Engineering: Crafting effective prompts for AI and language models',
    'Artificial Intelligence: Exploring machine learning and AI potential',
    'Cybersecurity: Staying ahead of threats, including penetration testing',
    'Automation: Streamlining repetitive tasks for improved productivity',
    'Reverse Engineering: Understanding systems by examining their internals',
    'Game Development: Designing and building games',
    'Game Modding: Creating custom game experiences',
    'Tinkering & Experimentation: Continuously learning through hands-on projects',
    'Web Development: Designing interactive websites and web applications',
    'Open-Source Collaboration: Sharing and contributing to community projects'
  ];
  
  const interestsContainer = document.getElementById('interests-container');
  
  interests.forEach(interest => {
    const interestElement = document.createElement('div');
    interestElement.className = 'bg-white rounded-lg shadow-sm p-4';
    interestElement.textContent = interest;
    interestsContainer.appendChild(interestElement);
  });
}

// Populate technical skills section
function populateSkills() {
  const skills = {
    'Programming Languages & Scripting': [
      'Assembly', 'C++', 'CMake', 'Dart', 'Java', 'JavaScript', 'PHP', 'Python', 'TypeScript', 'Lua'
    ],
    'Web Technologies & Frameworks': [
      'HTML5', 'CSS3', 'Bootstrap', 'Tailwind CSS', 'jQuery', 'NextJS', 'NodeJS', 
      'ExpressJS', 'ReactJS', 'Django', 'Flask', 'TensorFlow', 'Numpy', 'Pandas'
    ],
    'Mobile & Development Tools': [
      'Android', 'Android Studio', 'Flutter', 'FlutterFlow', 'NetBeans', 'IntelliJ', 'XAMPP', 'Netlify', 'Vercel'
    ],
    'Database Technologies': [
      'MongoDB', 'MySQL', 'SQLite', 'Oracle'
    ],
    'Dev Tools & Version Control': [
      'Git', 'ESLint', 'Postman', 'Docker'
    ],
    'Design & Multimedia': [
      'Blender', 'Figma', 'Illustrator', 'Photoshop', 'HxD'
    ],
    'Security & Reverse Engineering': [
      'Burp Suite', 'CyberChef', 'Ghidra', 'Wireshark', 'JADX'
    ],
    'Additional Tools & Technologies': [
      'Linux', 'Godot', 'nginx', 'Firebase', 'OpenCV'
    ]
  };
  
  const skillsContainer = document.getElementById('skills-container');
  skillsContainer.className = 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6';

  Object.entries(skills).forEach(([category, items]) => {
    const categoryElement = document.createElement('div');
    categoryElement.className = 'mb-6';
    
    const categoryTitle = document.createElement('h3');
    categoryTitle.className = 'text-lg font-semibold mb-2';
    categoryTitle.textContent = category;
    categoryElement.appendChild(categoryTitle);
    
    const itemsContainer = document.createElement('div');
    itemsContainer.className = 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2';
    
    items.sort().forEach(item => {
      const itemElement = document.createElement('div');
      itemElement.className = 'bg-white rounded-lg shadow-sm p-2 text-center text-sm md:whitespace-normal truncate md:truncate-none';
      itemElement.textContent = item;
      itemElement.title = item;
      itemsContainer.appendChild(itemElement);
    });
    
    categoryElement.appendChild(itemsContainer);
    skillsContainer.appendChild(categoryElement);
  });
}

// Provide link instead since I currently don't have a LinkedIn API
function fetchLinkedInPosts() {
	const postsContainer = document.getElementById('linkedin-posts-container');
	
	postsContainer.innerHTML = '';
	postsContainer.className = '';
	
	postsContainer.classList.add(
    'w-full',
    'flex',
    'justify-center',
    'items-center',
    'py-8'
	);
	
	postsContainer.innerHTML = `
    <div class="text-center max-w-md mx-auto p-8 bg-white rounded-lg border border-gray-100 shadow-sm">
      <p class="text-gray-600 mb-6 text-lg">Visit my LinkedIn profile to see my recent posts and activity:</p>
      <a 
        href="https://www.linkedin.com/in/ray-vincent-concepcion/recent-activity/" 
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 transition-colors"
      >
        View My LinkedIn Activity
        <svg xmlns="http://www.w3.org/2000/svg" class="ml-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </a>
    </div>
	`;
}
  
// Initialize the portfolio
function initPortfolio() {
  populateSkills();
  populateInterests();
  fetchAllGitHubProjects();
  fetchProfile();
  fetchLinkedInPosts();
}

document.addEventListener('DOMContentLoaded', initPortfolio);