import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMarketplace } from '../context/MarketplaceContext'
import { User, Mail, Package, Settings, LogOut } from 'lucide-react'
import './Profile.css'

const Profile = () => {
  const { user, logout } = useMarketplace()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('profile')

  if (!user) {
    navigate('/login')
    return null
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="profile-page">
      <div className="container">
        <div className="profile-header">
          <div className="profile-avatar">
            <User size={48} />
          </div>
          <div className="profile-info">
            <h1>{user.name}</h1>
            <p>{user.email}</p>
            <span className="profile-role">{user.role}</span>
          </div>
        </div>

        <div className="profile-content">
          <div className="profile-sidebar">
            <button
              className={`sidebar-item ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              <User size={20} />
              Profile
            </button>
            <button
              className={`sidebar-item ${activeTab === 'orders' ? 'active' : ''}`}
              onClick={() => setActiveTab('orders')}
            >
              <Package size={20} />
              Orders
            </button>
            <button
              className={`sidebar-item ${activeTab === 'settings' ? 'active' : ''}`}
              onClick={() => setActiveTab('settings')}
            >
              <Settings size={20} />
              Settings
            </button>
            <button className="sidebar-item logout" onClick={handleLogout}>
              <LogOut size={20} />
              Logout
            </button>
          </div>

          <div className="profile-main">
            {activeTab === 'profile' && (
              <div className="profile-section">
                <h2>Profile Information</h2>
                <div className="info-card">
                  <div className="info-item">
                    <label>Full Name</label>
                    <p>{user.name}</p>
                  </div>
                  <div className="info-item">
                    <label>Email</label>
                    <p>{user.email}</p>
                  </div>
                  <div className="info-item">
                    <label>Role</label>
                    <p className="role-badge">{user.role}</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="profile-section">
                <h2>Order History</h2>
                <div className="orders-list">
                  <div className="empty-state">
                    <Package size={48} />
                    <p>No orders yet</p>
                    <button onClick={() => navigate('/products')} className="btn btn-primary">
                      Start Shopping
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="profile-section">
                <h2>Account Settings</h2>
                <div className="settings-card">
                  <div className="setting-item">
                    <label>Email Notifications</label>
                    <input type="checkbox" defaultChecked />
                  </div>
                  <div className="setting-item">
                    <label>Marketing Emails</label>
                    <input type="checkbox" />
                  </div>
                  <div className="setting-item">
                    <label>Order Updates</label>
                    <input type="checkbox" defaultChecked />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile

