import { Link } from 'react-router-dom'
import './Home.css'

function Home() {
  return (
    <div className="page-container">
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to WebTech</h1>
          <p className="hero-subtitle">
            Your gateway to modern web technologies and innovative solutions
          </p>
          <div className="hero-buttons">
            <Link to="/course" className="btn btn-primary">Explore Courses</Link>
            <Link to="/project" className="btn btn-secondary">View Projects</Link>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h2 className="section-title">Why Choose WebTech?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🚀</div>
              <h3>Modern Technologies</h3>
              <p>Learn the latest web development frameworks and tools</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💡</div>
              <h3>Expert Guidance</h3>
              <p>Get mentored by industry professionals</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>Hands-on Projects</h3>
              <p>Build real-world applications and portfolios</p>
            </div>
          </div>
        </div>
      </section>

      <section className="reviews-preview">
        <div className="container">
          <h2 className="section-title">What Our Students Say</h2>
          <div className="reviews-preview-grid">
            <div className="review-preview-card">
              <div className="review-preview-header">
                <div className="review-preview-avatar">👩‍💼</div>
                <div>
                  <h4>Sarah Johnson</h4>
                  <div className="review-preview-stars">★★★★★</div>
                </div>
              </div>
              <p>"WebTech transformed my career! The React course was comprehensive and I landed my dream job within 3 months."</p>
            </div>
            <div className="review-preview-card">
              <div className="review-preview-header">
                <div className="review-preview-avatar">👨‍💻</div>
                <div>
                  <h4>Michael Chen</h4>
                  <div className="review-preview-stars">★★★★★</div>
                </div>
              </div>
              <p>"The best investment I've made in my education. The full-stack course covered everything and helped me build a strong portfolio."</p>
            </div>
            <div className="review-preview-card">
              <div className="review-preview-header">
                <div className="review-preview-avatar">👩‍🎨</div>
                <div>
                  <h4>Emily Rodriguez</h4>
                  <div className="review-preview-stars">★★★★★</div>
                </div>
              </div>
              <p>"The UI/UX course was so well-structured. Now I'm working as a freelance designer!"</p>
            </div>
          </div>
          <div className="reviews-cta">
            <Link to="/reviews" className="btn btn-primary">View All Reviews</Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home

