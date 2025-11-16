import './Course.css'

function Course() {
  const courses = [
    {
      id: 1,
      title: 'React Fundamentals',
      description: 'Master the basics of React and build interactive user interfaces',
      duration: '8 weeks',
      level: 'Beginner',
      icon: '⚛️'
    },
    {
      id: 2,
      title: 'Advanced JavaScript',
      description: 'Deep dive into ES6+, async programming, and modern patterns',
      duration: '6 weeks',
      level: 'Intermediate',
      icon: '📜'
    },
    {
      id: 3,
      title: 'Full Stack Development',
      description: 'Build complete web applications with React, Node.js, and MongoDB',
      duration: '12 weeks',
      level: 'Advanced',
      icon: '🌐'
    },
    {
      id: 4,
      title: 'UI/UX Design',
      description: 'Learn design principles and create beautiful, user-friendly interfaces',
      duration: '6 weeks',
      level: 'Beginner',
      icon: '🎨'
    },
    {
      id: 5,
      title: 'Vue.js Mastery',
      description: 'Comprehensive guide to Vue.js framework and ecosystem',
      duration: '8 weeks',
      level: 'Intermediate',
      icon: '💚'
    },
    {
      id: 6,
      title: 'DevOps & Deployment',
      description: 'Learn CI/CD, Docker, and cloud deployment strategies',
      duration: '6 weeks',
      level: 'Advanced',
      icon: '🚀'
    }
  ]

  return (
    <div className="page-container">
      <section className="course-hero">
        <div className="container">
          <h1 className="page-title">Our Courses</h1>
          <p className="page-subtitle">Choose from a wide range of web technology courses</p>
        </div>
      </section>

      <section className="courses-section">
        <div className="container">
          <div className="courses-grid">
            {courses.map(course => (
              <div key={course.id} className="course-card">
                <div className="course-icon">{course.icon}</div>
                <div className="course-badge">{course.level}</div>
                <h3 className="course-title">{course.title}</h3>
                <p className="course-description">{course.description}</p>
                <div className="course-meta">
                  <span className="course-duration">⏱️ {course.duration}</span>
                </div>
                <button className="btn btn-primary btn-course">Enroll Now</button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Course

