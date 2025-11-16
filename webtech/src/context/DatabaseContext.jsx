import { createContext, useContext, useState, useEffect } from 'react'

const DatabaseContext = createContext()

export const useDatabase = () => {
  const context = useContext(DatabaseContext)
  if (!context) {
    throw new Error('useDatabase must be used within DatabaseProvider')
  }
  return context
}

export const DatabaseProvider = ({ children }) => {
  const [registrations, setRegistrations] = useState([])
  const [reviews, setReviews] = useState([])
  const [courses, setCourses] = useState([])
  const [projects, setProjects] = useState([])

  // Load data from LocalStorage on mount
  useEffect(() => {
    loadData()
  }, [])

  const loadData = () => {
    try {
      const savedRegistrations = localStorage.getItem('webtech_registrations')
      const savedReviews = localStorage.getItem('webtech_reviews')
      const savedCourses = localStorage.getItem('webtech_courses')
      const savedProjects = localStorage.getItem('webtech_projects')

      if (savedRegistrations) {
        setRegistrations(JSON.parse(savedRegistrations))
      }
      if (savedReviews) {
        setReviews(JSON.parse(savedReviews))
      }
      if (savedCourses) {
        setCourses(JSON.parse(savedCourses))
      }
      if (savedProjects) {
        setProjects(JSON.parse(savedProjects))
      }
    } catch (error) {
      console.error('Error loading data:', error)
    }
  }

  // Save data to LocalStorage
  const saveToStorage = (key, data) => {
    try {
      localStorage.setItem(key, JSON.stringify(data))
    } catch (error) {
      console.error('Error saving data:', error)
    }
  }

  // Registration operations
  const addRegistration = (registrationData) => {
    const newRegistration = {
      id: Date.now().toString(),
      ...registrationData,
      createdAt: new Date().toISOString()
    }
    const updated = [...registrations, newRegistration]
    setRegistrations(updated)
    saveToStorage('webtech_registrations', updated)
    return newRegistration
  }

  const getRegistrations = () => {
    return registrations
  }

  const deleteRegistration = (id) => {
    const updated = registrations.filter(reg => reg.id !== id)
    setRegistrations(updated)
    saveToStorage('webtech_registrations', updated)
  }

  // Review operations
  const addReview = (reviewData) => {
    const newReview = {
      id: Date.now().toString(),
      ...reviewData,
      createdAt: new Date().toISOString()
    }
    const updated = [...reviews, newReview]
    setReviews(updated)
    saveToStorage('webtech_reviews', updated)
    return newReview
  }

  const getReviews = () => {
    return reviews
  }

  const deleteReview = (id) => {
    const updated = reviews.filter(review => review.id !== id)
    setReviews(updated)
    saveToStorage('webtech_reviews', updated)
  }

  // Course operations
  const addCourse = (courseData) => {
    const newCourse = {
      id: Date.now().toString(),
      ...courseData,
      createdAt: new Date().toISOString()
    }
    const updated = [...courses, newCourse]
    setCourses(updated)
    saveToStorage('webtech_courses', updated)
    return newCourse
  }

  const getCourses = () => {
    return courses
  }

  const updateCourse = (id, courseData) => {
    const updated = courses.map(course =>
      course.id === id ? { ...course, ...courseData, updatedAt: new Date().toISOString() } : course
    )
    setCourses(updated)
    saveToStorage('webtech_courses', updated)
  }

  const deleteCourse = (id) => {
    const updated = courses.filter(course => course.id !== id)
    setCourses(updated)
    saveToStorage('webtech_courses', updated)
  }

  // Project operations
  const addProject = (projectData) => {
    const newProject = {
      id: Date.now().toString(),
      ...projectData,
      createdAt: new Date().toISOString()
    }
    const updated = [...projects, newProject]
    setProjects(updated)
    saveToStorage('webtech_projects', updated)
    return newProject
  }

  const getProjects = () => {
    return projects
  }

  const updateProject = (id, projectData) => {
    const updated = projects.map(project =>
      project.id === id ? { ...project, ...projectData, updatedAt: new Date().toISOString() } : project
    )
    setProjects(updated)
    saveToStorage('webtech_projects', updated)
  }

  const deleteProject = (id) => {
    const updated = projects.filter(project => project.id !== id)
    setProjects(updated)
    saveToStorage('webtech_projects', updated)
  }

  // Export all data
  const exportData = () => {
    const allData = {
      registrations,
      reviews,
      courses,
      projects,
      exportedAt: new Date().toISOString()
    }
    const dataStr = JSON.stringify(allData, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `webtech-data-${Date.now()}.json`
    link.click()
    URL.revokeObjectURL(url)
  }

  // Clear all data
  const clearAllData = () => {
    if (window.confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
      localStorage.removeItem('webtech_registrations')
      localStorage.removeItem('webtech_reviews')
      localStorage.removeItem('webtech_courses')
      localStorage.removeItem('webtech_projects')
      setRegistrations([])
      setReviews([])
      setCourses([])
      setProjects([])
    }
  }

  const value = {
    // Registrations
    registrations,
    addRegistration,
    getRegistrations,
    deleteRegistration,
    // Reviews
    reviews,
    addReview,
    getReviews,
    deleteReview,
    // Courses
    courses,
    addCourse,
    getCourses,
    updateCourse,
    deleteCourse,
    // Projects
    projects,
    addProject,
    getProjects,
    updateProject,
    deleteProject,
    // Utilities
    exportData,
    clearAllData
  }

  return (
    <DatabaseContext.Provider value={value}>
      {children}
    </DatabaseContext.Provider>
  )
}

