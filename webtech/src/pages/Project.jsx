import './Project.css'

function Project() {
  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'A full-featured online shopping platform with cart, checkout, and payment integration',
      tech: ['React', 'Node.js', 'MongoDB'],
      image: '🛒'
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'Collaborative task management tool with real-time updates and team collaboration',
      tech: ['Vue.js', 'Firebase', 'TypeScript'],
      image: '📋'
    },
    {
      id: 3,
      title: 'Social Media Dashboard',
      description: 'Analytics dashboard for social media metrics and insights',
      tech: ['React', 'D3.js', 'Express'],
      image: '📊'
    },
    {
      id: 4,
      title: 'Weather App',
      description: 'Real-time weather information with forecasts and location-based data',
      tech: ['React', 'API Integration', 'CSS3'],
      image: '🌤️'
    },
    {
      id: 5,
      title: 'Blog Platform',
      description: 'Modern blogging platform with markdown support and SEO optimization',
      tech: ['Next.js', 'MDX', 'Tailwind CSS'],
      image: '✍️'
    },
    {
      id: 6,
      title: 'Portfolio Website',
      description: 'Responsive portfolio website with animations and modern design',
      tech: ['React', 'Framer Motion', 'SASS'],
      image: '💼'
    }
  ]

  return (
    <div className="page-container">
      <section className="project-hero">
        <div className="container">
          <h1 className="page-title">Our Projects</h1>
          <p className="page-subtitle">Explore our portfolio of innovative web applications</p>
        </div>
      </section>

      <section className="projects-section">
        <div className="container">
          <div className="projects-grid">
            {projects.map(project => (
              <div key={project.id} className="project-card">
                <div className="project-image">{project.image}</div>
                <div className="project-content">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  <div className="project-tech">
                    {project.tech.map((tech, index) => (
                      <span key={index} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                  <button className="btn btn-primary btn-project">View Details</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Project

