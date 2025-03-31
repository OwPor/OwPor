// Fetch GitHub projects
async function fetchGitHubProjects() {
  try {
    const response = await fetch('https://api.github.com/users/OwPor/repos');
    const projects = await response.json();
    
    const projectsContainer = document.getElementById('projects-container');
    
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
  } catch (error) {
    console.error('Error fetching GitHub projects:', error);
  }
}

// Fetch LinkedIn profile data
async function fetchLinkedInData() {
  // Note: LinkedIn API requires authentication
  // This is a placeholder for LinkedIn integration
  const contactContainer = document.getElementById('contact-container');
  
  contactContainer.innerHTML = `
    <div class="flex items-center">
      <svg class="h-5 w-5 text-gray-500 mr-2" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.97-1.37-3-3.65-3-2.19 0-3.83 1.08-3.83 2.81 0 1.78 1.37 2.45 3.24 2.94 1.93.51 2.35 1.07 2.35 1.82 0 .99-.84 1.58-2.2 1.58-1.63 0-2.26-.76-2.4-1.64H8.3c.14 2.19 1.76 3.42 4.01 3.42 2.49 0 4.1-1.32 4.1-3.13 0-1.87-1.5-2.49-3.1-2.89z"/>
      </svg>
      <span>Email: concepcionrayvincent@gmail.com</span>
    </div>
    <div class="flex items-center">
      <svg class="h-5 w-5 text-gray-500 mr-2" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
      </svg>
      <a href="https://www.linkedin.com/in/ray-vincent-concepcion" target="_blank">LinkedIn Profile</a>
    </div>
    <div class="flex items-center">
      <svg class="h-5 w-5 text-gray-500 mr-2" fill="currentColor" viewBox="0 0 24 24">
        <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
      </svg>
      <a href="https://www.facebook.com/ray.vincent.ds.concepcion" target="_blank">Facebook Profile</a>
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
function populateTechnicalSkills() {
  const skills = {
    'Programming Languages & Scripting': [
      'Assembly', 'C++', 'Dart', 'Java', 'JavaScript', 'PHP', 'Python', 'TypeScript', 'Lua'
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
      'Git', 'ESLint', 'CMake', 'Postman'
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
  
  Object.entries(skills).forEach(([category, items]) => {
    const categoryElement = document.createElement('div');
    categoryElement.className = 'mb-6';
    
    const categoryTitle = document.createElement('h3');
    categoryTitle.className = 'text-lg font-semibold mb-2';
    categoryTitle.textContent = category;
    categoryElement.appendChild(categoryTitle);
    
    const itemsContainer = document.createElement('div');
    itemsContainer.className = 'grid grid-cols-2 md:grid-cols-3 gap-2';
    
    items.forEach(item => {
      const itemElement = document.createElement('div');
      itemElement.className = 'bg-white rounded-lg shadow-sm p-2 text-center text-sm';
      itemElement.textContent = item;
      itemsContainer.appendChild(itemElement);
    });
    
    categoryElement.appendChild(itemsContainer);
    skillsContainer.appendChild(categoryElement);
  });
}

// Populate skills section
function populateSkills() {
  const skills = [
    'JavaScript', 'HTML/CSS', 'React', 'Node.js', 
    'Git', 'Tailwind CSS', 'Responsive Design', 'API Integration',
    'Python', 'Django', 'Docker',
    'PHP', 'Android', 'Android Studio', 'Assembly',
    'Blender', 'Bootstrap', 'Burp Suite', 'C++',
    'CMake', 'CSS3', 'CyberChef', 'Dart',
    'Django', 'ESLint', 'ExpressJS', 'Figma',
    'Firebase', 'Flask', 'Flutter', 'FlutterFlow'
  ];
  
  const skillsContainer = document.getElementById('skills-list-container');
  
  skills.forEach(skill => {
    const skillElement = document.createElement('div');
    skillElement.className = 'bg-white rounded-lg shadow-sm p-4 text-center';
    skillElement.textContent = skill;
    skillsContainer.appendChild(skillElement);
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
  populateTechnicalSkills();
  fetchGitHubProjects();
  fetchLinkedInData();
  fetchLinkedInPosts();
}

document.addEventListener('DOMContentLoaded', initPortfolio);