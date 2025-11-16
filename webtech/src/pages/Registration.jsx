import { useState } from 'react'
import { useDatabase } from '../context/DatabaseContext'
import './Registration.css'

function Registration() {
  const { addRegistration } = useDatabase()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    course: '',
    agreeToTerms: false
  })

  const [errors, setErrors] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validate = () => {
    const newErrors = {}

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required'
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (!/^[0-9]{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Phone number must be 10 digits'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    if (!formData.course) {
      newErrors.course = 'Please select a course'
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions'
    }

    return newErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = validate()

    if (Object.keys(newErrors).length === 0) {
      // Form is valid, save to database
      const registrationData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        course: formData.course
        // Note: We don't save password for security reasons
      }
      addRegistration(registrationData)
      setIsSubmitted(true)
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false)
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          password: '',
          confirmPassword: '',
          course: '',
          agreeToTerms: false
        })
      }, 3000)
    } else {
      setErrors(newErrors)
    }
  }

  return (
    <div className="page-container">
      <section className="registration-hero">
        <div className="container">
          <h1 className="page-title">Registration</h1>
          <p className="page-subtitle">Join WebTech and start your learning journey today</p>
        </div>
      </section>

      <section className="registration-section">
        <div className="container">
          <div className="registration-form-container">
            {isSubmitted ? (
              <div className="success-message">
                <div className="success-icon">✓</div>
                <h2>Registration Successful!</h2>
                <p>Thank you for registering. We'll contact you soon.</p>
              </div>
            ) : (
              <form className="registration-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="firstName">First Name *</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={errors.firstName ? 'error' : ''}
                      placeholder="Enter your first name"
                    />
                    {errors.firstName && <span className="error-message">{errors.firstName}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="lastName">Last Name *</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={errors.lastName ? 'error' : ''}
                      placeholder="Enter your last name"
                    />
                    {errors.lastName && <span className="error-message">{errors.lastName}</span>}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? 'error' : ''}
                    placeholder="Enter your email"
                  />
                  {errors.email && <span className="error-message">{errors.email}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={errors.phone ? 'error' : ''}
                    placeholder="Enter your phone number"
                  />
                  {errors.phone && <span className="error-message">{errors.phone}</span>}
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="password">Password *</label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className={errors.password ? 'error' : ''}
                      placeholder="Create a password"
                    />
                    {errors.password && <span className="error-message">{errors.password}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password *</label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={errors.confirmPassword ? 'error' : ''}
                      placeholder="Confirm your password"
                    />
                    {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="course">Select Course *</label>
                  <select
                    id="course"
                    name="course"
                    value={formData.course}
                    onChange={handleChange}
                    className={errors.course ? 'error' : ''}
                  >
                    <option value="">Choose a course</option>
                    <option value="react-fundamentals">React Fundamentals</option>
                    <option value="advanced-javascript">Advanced JavaScript</option>
                    <option value="full-stack">Full Stack Development</option>
                    <option value="ui-ux">UI/UX Design</option>
                    <option value="vuejs">Vue.js Mastery</option>
                    <option value="devops">DevOps & Deployment</option>
                  </select>
                  {errors.course && <span className="error-message">{errors.course}</span>}
                </div>

                <div className="form-group checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onChange={handleChange}
                      className={errors.agreeToTerms ? 'error' : ''}
                    />
                    <span>I agree to the <a href="#">Terms and Conditions</a> and <a href="#">Privacy Policy</a> *</span>
                  </label>
                  {errors.agreeToTerms && <span className="error-message">{errors.agreeToTerms}</span>}
                </div>

                <button type="submit" className="btn btn-primary btn-submit">
                  Register Now
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Registration

