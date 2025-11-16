import './AboutUs.css'

function AboutUs() {
  return (
    <div className="page-container">
      <section className="about-hero">
        <div className="container">
          <h1 className="page-title">About Us</h1>
          <p className="page-subtitle">Learn more about WebTech and our mission</p>
        </div>
      </section>

      <section className="about-content">
        <div className="container">
          <div className="about-section">
            <h2>Our Mission</h2>
            <p>
              At WebTech, we are dedicated to empowering individuals and businesses 
              with cutting-edge web technologies. Our mission is to provide high-quality 
              education and resources that help you stay ahead in the rapidly evolving 
              world of web development.
            </p>
          </div>

          <div className="about-section">
            <h2>What We Do</h2>
            <p>
              We offer comprehensive courses covering modern web technologies including 
              React, Vue, Node.js, and more. Our hands-on approach ensures that you not 
              only learn the theory but also gain practical experience through real-world 
              projects.
            </p>
          </div>

          <div className="about-section">
            <h2>Our Team</h2>
            <p>
              Our team consists of experienced developers and educators who are passionate 
              about sharing their knowledge. We believe in creating an inclusive learning 
              environment where everyone can thrive and grow their skills.
            </p>
          </div>

          <div className="stats-grid">
            <div className="stat-card">
              <h3>1000+</h3>
              <p>Students Enrolled</p>
            </div>
            <div className="stat-card">
              <h3>50+</h3>
              <p>Courses Available</p>
            </div>
            <div className="stat-card">
              <h3>200+</h3>
              <p>Projects Completed</p>
            </div>
            <div className="stat-card">
              <h3>95%</h3>
              <p>Success Rate</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AboutUs

