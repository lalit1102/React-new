import { useState } from 'react'
import { useDatabase } from '../context/DatabaseContext'
import './Database.css'

function Database() {
  const {
    registrations,
    reviews,
    courses,
    projects,
    deleteRegistration,
    deleteReview,
    deleteCourse,
    deleteProject,
    exportData,
    clearAllData
  } = useDatabase()

  const [activeTab, setActiveTab] = useState('registrations')

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString()
  }

  const getStats = () => {
    return {
      totalRegistrations: registrations.length,
      totalReviews: reviews.length,
      totalCourses: courses.length,
      totalProjects: projects.length
    }
  }

  const stats = getStats()

  return (
    <div className="page-container">
      <section className="database-hero">
        <div className="container">
          <h1 className="page-title">Database Management</h1>
          <p className="page-subtitle">View and manage all stored data</p>
        </div>
      </section>

      <section className="database-section">
        <div className="container">
          <div className="database-stats">
            <div className="stat-card">
              <h3>{stats.totalRegistrations}</h3>
              <p>Registrations</p>
            </div>
            <div className="stat-card">
              <h3>{stats.totalReviews}</h3>
              <p>Reviews</p>
            </div>
            <div className="stat-card">
              <h3>{stats.totalCourses}</h3>
              <p>Courses</p>
            </div>
            <div className="stat-card">
              <h3>{stats.totalProjects}</h3>
              <p>Projects</p>
            </div>
          </div>

          <div className="database-actions">
            <button className="btn btn-primary" onClick={exportData}>
              📥 Export All Data
            </button>
            <button className="btn btn-danger" onClick={clearAllData}>
              🗑️ Clear All Data
            </button>
          </div>

          <div className="database-tabs">
            <button
              className={`tab ${activeTab === 'registrations' ? 'active' : ''}`}
              onClick={() => setActiveTab('registrations')}
            >
              Registrations ({registrations.length})
            </button>
            <button
              className={`tab ${activeTab === 'reviews' ? 'active' : ''}`}
              onClick={() => setActiveTab('reviews')}
            >
              Reviews ({reviews.length})
            </button>
            <button
              className={`tab ${activeTab === 'courses' ? 'active' : ''}`}
              onClick={() => setActiveTab('courses')}
            >
              Courses ({courses.length})
            </button>
            <button
              className={`tab ${activeTab === 'projects' ? 'active' : ''}`}
              onClick={() => setActiveTab('projects')}
            >
              Projects ({projects.length})
            </button>
          </div>

          <div className="database-content">
            {activeTab === 'registrations' && (
              <div className="data-table-container">
                <h3>Registrations</h3>
                {registrations.length === 0 ? (
                  <p className="no-data">No registrations found</p>
                ) : (
                  <div className="data-table">
                    <table>
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Phone</th>
                          <th>Course</th>
                          <th>Date</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {registrations.map(reg => (
                          <tr key={reg.id}>
                            <td>{reg.id.slice(-6)}</td>
                            <td>{reg.firstName} {reg.lastName}</td>
                            <td>{reg.email}</td>
                            <td>{reg.phone}</td>
                            <td>{reg.course}</td>
                            <td>{formatDate(reg.createdAt)}</td>
                            <td>
                              <button
                                className="btn-delete"
                                onClick={() => deleteRegistration(reg.id)}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="data-table-container">
                <h3>Reviews</h3>
                {reviews.length === 0 ? (
                  <p className="no-data">No reviews found</p>
                ) : (
                  <div className="data-table">
                    <table>
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Name</th>
                          <th>Rating</th>
                          <th>Review</th>
                          <th>Date</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {reviews.map(review => (
                          <tr key={review.id}>
                            <td>{review.id.slice(-6)}</td>
                            <td>{review.name}</td>
                            <td>{'★'.repeat(review.rating)}</td>
                            <td className="text-preview">{review.text?.substring(0, 50)}...</td>
                            <td>{formatDate(review.createdAt)}</td>
                            <td>
                              <button
                                className="btn-delete"
                                onClick={() => deleteReview(review.id)}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'courses' && (
              <div className="data-table-container">
                <h3>Courses</h3>
                {courses.length === 0 ? (
                  <p className="no-data">No courses found</p>
                ) : (
                  <div className="data-table">
                    <table>
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Title</th>
                          <th>Level</th>
                          <th>Duration</th>
                          <th>Date</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {courses.map(course => (
                          <tr key={course.id}>
                            <td>{course.id.slice(-6)}</td>
                            <td>{course.title}</td>
                            <td>{course.level}</td>
                            <td>{course.duration}</td>
                            <td>{formatDate(course.createdAt)}</td>
                            <td>
                              <button
                                className="btn-delete"
                                onClick={() => deleteCourse(course.id)}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'projects' && (
              <div className="data-table-container">
                <h3>Projects</h3>
                {projects.length === 0 ? (
                  <p className="no-data">No projects found</p>
                ) : (
                  <div className="data-table">
                    <table>
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Title</th>
                          <th>Tech Stack</th>
                          <th>Date</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {projects.map(project => (
                          <tr key={project.id}>
                            <td>{project.id.slice(-6)}</td>
                            <td>{project.title}</td>
                            <td>{Array.isArray(project.tech) ? project.tech.join(', ') : project.tech}</td>
                            <td>{formatDate(project.createdAt)}</td>
                            <td>
                              <button
                                className="btn-delete"
                                onClick={() => deleteProject(project.id)}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Database


