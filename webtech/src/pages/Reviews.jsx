import { useState, useMemo } from 'react'
import { useDatabase } from '../context/DatabaseContext'
import ReviewForm from '../components/ReviewForm'
import './Reviews.css'

function Reviews() {
  const { reviews: dbReviews } = useDatabase()
  const [showReviewForm, setShowReviewForm] = useState(false)

  // Default reviews
  const defaultReviews = [
    {
      id: 'default-1',
      name: 'Sarah Johnson',
      course: 'React Fundamentals',
      rating: 5,
      image: '👩‍💼',
      text: 'WebTech transformed my career! The React course was comprehensive and the instructors were incredibly supportive. I landed my dream job as a frontend developer within 3 months of completing the course.',
      date: '2 months ago',
      createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 'default-2',
      name: 'Michael Chen',
      course: 'Full Stack Development',
      rating: 5,
      image: '👨‍💻',
      text: 'The best investment I\'ve made in my education. The full-stack course covered everything from frontend to backend, and the hands-on projects helped me build a strong portfolio. Highly recommended!',
      date: '1 month ago',
      createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 'default-3',
      name: 'Emily Rodriguez',
      course: 'UI/UX Design',
      rating: 5,
      image: '👩‍🎨',
      text: 'As someone with no design background, I was nervous about starting. But the UI/UX course was so well-structured and the feedback from instructors was invaluable. Now I\'m working as a freelance designer!',
      date: '3 months ago',
      createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 'default-4',
      name: 'David Kim',
      course: 'Advanced JavaScript',
      rating: 5,
      image: '👨‍🔬',
      text: 'The Advanced JavaScript course really deepened my understanding of the language. The complex concepts were explained clearly, and the practical exercises were challenging yet rewarding.',
      date: '2 weeks ago',
      createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 'default-5',
      name: 'Lisa Anderson',
      course: 'Vue.js Mastery',
      rating: 5,
      image: '👩‍💻',
      text: 'I loved the Vue.js course! The curriculum was up-to-date and the community support was amazing. The projects we built were real-world applications that I could showcase to employers.',
      date: '1 month ago',
      createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 'default-6',
      name: 'James Wilson',
      course: 'DevOps & Deployment',
      rating: 5,
      image: '👨‍🚀',
      text: 'The DevOps course was exactly what I needed to advance my career. Learning Docker, CI/CD, and cloud deployment has made me a more valuable developer. Great course structure!',
      date: '3 weeks ago',
      createdAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString()
    }
  ]

  // Combine default reviews with database reviews
  const allReviews = useMemo(() => {
    const combined = [...defaultReviews, ...dbReviews]
    // Sort by date (newest first)
    return combined.sort((a, b) => {
      const dateA = new Date(a.createdAt || a.date)
      const dateB = new Date(b.createdAt || b.date)
      return dateB - dateA
    })
  }, [dbReviews])

  // Calculate stats
  const stats = useMemo(() => {
    const totalReviews = allReviews.length
    if (totalReviews === 0) {
      return { averageRating: 0, totalReviews: 0, recommendRate: 0 }
    }
    
    const totalRating = allReviews.reduce((sum, review) => sum + (review.rating || 5), 0)
    const averageRating = (totalRating / totalReviews).toFixed(1)
    const fiveStarReviews = allReviews.filter(r => r.rating === 5).length
    const recommendRate = Math.round((fiveStarReviews / totalReviews) * 100)
    
    return {
      averageRating,
      totalReviews: totalReviews + 1200, // Add base number for display
      recommendRate
    }
  }, [allReviews])

  const formatDate = (dateString) => {
    if (!dateString) return 'Recently'
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now - date)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} week${Math.floor(diffDays / 7) > 1 ? 's' : ''} ago`
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} month${Math.floor(diffDays / 30) > 1 ? 's' : ''} ago`
    return `${Math.floor(diffDays / 365)} year${Math.floor(diffDays / 365) > 1 ? 's' : ''} ago`
  }

  const renderStars = (rating) => {
    const ratingValue = rating || 5
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} className={index < ratingValue ? 'star filled' : 'star'}>
        ★
      </span>
    ))
  }

  const handleReviewSuccess = () => {
    setShowReviewForm(false)
    // Optionally show a success message
  }

  return (
    <div className="page-container">
      <section className="reviews-hero">
        <div className="container">
          <h1 className="page-title">Student Reviews</h1>
          <p className="page-subtitle">Hear from our successful students</p>
        </div>
      </section>

      <section className="reviews-section">
        <div className="container">
          <div className="reviews-header">
            <div className="reviews-stats">
              <div className="stat-item">
                <h3>{stats.averageRating}/5</h3>
                <p>Average Rating</p>
              </div>
              <div className="stat-item">
                <h3>{stats.totalReviews.toLocaleString()}+</h3>
                <p>Total Reviews</p>
              </div>
              <div className="stat-item">
                <h3>{stats.recommendRate}%</h3>
                <p>Would Recommend</p>
              </div>
            </div>
            <button 
              className="btn btn-primary btn-add-review"
              onClick={() => setShowReviewForm(true)}
            >
              ✍️ Write a Review
            </button>
          </div>

          <div className="reviews-grid">
            {allReviews.length === 0 ? (
              <p className="no-reviews">No reviews yet. Be the first to write one!</p>
            ) : (
              allReviews.map(review => (
                <div key={review.id} className="review-card">
                  <div className="review-header">
                    <div className="review-avatar">{review.image || '👤'}</div>
                    <div className="review-info">
                      <h3 className="review-name">{review.name}</h3>
                      <p className="review-course">{review.course}</p>
                    </div>
                  </div>
                  <div className="review-rating">
                    {renderStars(review.rating)}
                  </div>
                  <p className="review-text">"{review.text}"</p>
                  <p className="review-date">
                    {review.date || formatDate(review.createdAt)}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {showReviewForm && (
        <ReviewForm
          onClose={() => setShowReviewForm(false)}
          onSuccess={handleReviewSuccess}
        />
      )}
    </div>
  )
}

export default Reviews

