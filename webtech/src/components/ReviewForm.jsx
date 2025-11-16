import { useState } from 'react'
import { useDatabase } from '../context/DatabaseContext'
import './ReviewForm.css'

function ReviewForm({ onClose, onSuccess }) {
  const { addReview } = useDatabase()
  const [formData, setFormData] = useState({
    name: '',
    course: '',
    rating: 5,
    text: ''
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isGeneratingAI, setIsGeneratingAI] = useState(false)
  const [aiSuggestion, setAiSuggestion] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'rating' ? parseInt(value) : value
    }))
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validate = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.course.trim()) {
      newErrors.course = 'Course is required'
    }

    if (!formData.text.trim()) {
      newErrors.text = 'Review text is required'
    } else if (formData.text.trim().length < 10) {
      newErrors.text = 'Review must be at least 10 characters'
    }

    if (formData.rating < 1 || formData.rating > 5) {
      newErrors.rating = 'Rating must be between 1 and 5'
    }

    return newErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = validate()

    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true)
      
      const reviewData = {
        name: formData.name,
        course: formData.course,
        rating: formData.rating,
        text: formData.text,
        image: getRandomAvatar()
      }

      addReview(reviewData)
      
      setTimeout(() => {
        setIsSubmitting(false)
        if (onSuccess) onSuccess()
        if (onClose) onClose()
        setFormData({
          name: '',
          course: '',
          rating: 5,
          text: ''
        })
      }, 500)
    } else {
      setErrors(newErrors)
    }
  }

  const getRandomAvatar = () => {
    const avatars = ['👩‍💼', '👨‍💻', '👩‍🎨', '👨‍🔬', '👩‍💻', '👨‍🚀', '👩‍🏫', '👨‍💼']
    return avatars[Math.floor(Math.random() * avatars.length)]
  }

  const generateAIReview = () => {
    if (!formData.course || !formData.rating) {
      alert('Please select a course and rating first')
      return
    }

    setIsGeneratingAI(true)
    setAiSuggestion('')

    // Simulate AI processing
    setTimeout(() => {
      const reviewTemplates = {
        5: [
          `I absolutely loved the ${formData.course} course! The content was comprehensive, well-structured, and the instructors were incredibly knowledgeable and supportive. The hands-on projects helped me understand the concepts deeply, and I feel confident applying what I learned in real-world scenarios. Highly recommended!`,
          `The ${formData.course} course exceeded my expectations! The curriculum was up-to-date with industry standards, and the practical exercises were challenging yet rewarding. The community support and instructor feedback were invaluable. This course has significantly boosted my skills and confidence.`,
          `Outstanding course! The ${formData.course} program provided excellent value. The step-by-step approach made complex topics easy to understand, and the real-world examples were very helpful. I've already started applying the knowledge in my projects. Thank you for such a great learning experience!`
        ],
        4: [
          `The ${formData.course} course was very good overall. The content was well-organized and the instructors were helpful. Some areas could use more examples, but I learned a lot and would recommend it to others.`,
          `I enjoyed the ${formData.course} course. The material was comprehensive and the pace was appropriate. There were a few topics that could have been explained in more detail, but overall it was a valuable learning experience.`
        ],
        3: [
          `The ${formData.course} course was decent. It covered the basics well, though some advanced topics could have been explored more deeply. The course structure was okay, but I think it could benefit from more interactive elements.`
        ],
        2: [
          `The ${formData.course} course had some good content, but I felt it could be improved. Some explanations were unclear, and I would have liked more practical examples. There's potential, but it needs refinement.`
        ],
        1: [
          `I found the ${formData.course} course challenging to follow. The content seemed disorganized and some concepts weren't explained clearly. I hope the course can be improved with better structure and more detailed explanations.`
        ]
      }

      const templates = reviewTemplates[formData.rating] || reviewTemplates[5]
      const generated = templates[Math.floor(Math.random() * templates.length)]
      setAiSuggestion(generated)
      setIsGeneratingAI(false)
    }, 1500)
  }

  const useAISuggestion = () => {
    setFormData(prev => ({
      ...prev,
      text: aiSuggestion
    }))
    setAiSuggestion('')
  }

  const enhanceWithAI = () => {
    if (!formData.text.trim()) {
      alert('Please write some review text first to enhance it')
      return
    }

    setIsGeneratingAI(true)
    setAiSuggestion('')

    setTimeout(() => {
      const enhanced = `Based on your input: "${formData.text}"\n\nHere's an enhanced version:\n\n${formData.text}\n\nThe course provided excellent learning opportunities with practical applications. The instructors were knowledgeable and the material was well-structured. I found the hands-on exercises particularly valuable for understanding the concepts. Overall, a great learning experience that I would recommend to others.`
      setAiSuggestion(enhanced)
      setIsGeneratingAI(false)
    }, 1500)
  }

  return (
    <div className="review-form-overlay" onClick={onClose}>
      <div className="review-form-container" onClick={(e) => e.stopPropagation()}>
        <div className="review-form-header">
          <h2>Write a Review</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <form className="review-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Your Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? 'error' : ''}
              placeholder="Enter your name"
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="course">Course *</label>
            <select
              id="course"
              name="course"
              value={formData.course}
              onChange={handleChange}
              className={errors.course ? 'error' : ''}
            >
              <option value="">Select a course</option>
              <option value="React Fundamentals">React Fundamentals</option>
              <option value="Advanced JavaScript">Advanced JavaScript</option>
              <option value="Full Stack Development">Full Stack Development</option>
              <option value="UI/UX Design">UI/UX Design</option>
              <option value="Vue.js Mastery">Vue.js Mastery</option>
              <option value="DevOps & Deployment">DevOps & Deployment</option>
            </select>
            {errors.course && <span className="error-message">{errors.course}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="rating">Rating *</label>
            <div className="rating-input">
              {[1, 2, 3, 4, 5].map(star => (
                <button
                  key={star}
                  type="button"
                  className={`star-btn ${formData.rating >= star ? 'active' : ''}`}
                  onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                >
                  ★
                </button>
              ))}
              <span className="rating-text">{formData.rating} out of 5</span>
            </div>
            {errors.rating && <span className="error-message">{errors.rating}</span>}
          </div>

          <div className="form-group">
            <div className="review-text-header">
              <label htmlFor="text">Your Review *</label>
              <div className="ai-actions-buttons">
                <button
                  type="button"
                  className="btn-ai-generate"
                  onClick={generateAIReview}
                  disabled={isGeneratingAI || !formData.course}
                  title="Generate AI review based on course and rating"
                >
                  {isGeneratingAI ? '🤖 Generating...' : '🤖 Generate with AI'}
                </button>
                {formData.text && (
                  <button
                    type="button"
                    className="btn-ai-enhance"
                    onClick={enhanceWithAI}
                    disabled={isGeneratingAI}
                    title="Enhance your existing review with AI"
                  >
                    ✨ Enhance with AI
                  </button>
                )}
              </div>
            </div>
            <textarea
              id="text"
              name="text"
              value={formData.text}
              onChange={handleChange}
              className={errors.text ? 'error' : ''}
              placeholder="Share your experience with this course... or use AI to generate one!"
              rows="5"
            />
            {errors.text && <span className="error-message">{errors.text}</span>}
            
            {aiSuggestion && (
              <div className="ai-suggestion-box">
                <div className="ai-suggestion-header">
                  <span className="ai-label">🤖 AI Suggestion:</span>
                  <button
                    type="button"
                    className="btn-close-suggestion"
                    onClick={() => setAiSuggestion('')}
                  >
                    ×
                  </button>
                </div>
                <div className="ai-suggestion-text">{aiSuggestion}</div>
                <button
                  type="button"
                  className="btn-use-suggestion"
                  onClick={useAISuggestion}
                >
                  Use This Suggestion
                </button>
              </div>
            )}
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit Review'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ReviewForm

