// src/components/Sidebar.jsx

function Sidebar({ activeTab, setActiveTab, currentUser, onLogout, pendingRequestsCount, openTicketsCount }) {
  var isAdmin = currentUser && currentUser.role === 'admin'
  var totalPendingAdmin = (pendingRequestsCount || 0) + (openTicketsCount || 0)

  return (
    <aside className="app-sidebar">
      <div className="sidebar-brand">
        <div className="brand-icon">🎓</div>
        <div>
          <span className="brand-name">EduTrack</span>
          <span className="brand-sub">{isAdmin ? 'ADMIN PORTAL' : 'STUDENT PORTAL'}</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        {/* ================= ADMIN NAVIGATION ================= */}
        {isAdmin && (
          <>
            <div
              className={'nav-item' + (activeTab === 'dashboard' ? ' active' : '')}
              onClick={function () { setActiveTab('dashboard') }}
            >
              <span className="nav-icon">📊</span>
              <span className="nav-label">Dashboard</span>
            </div>

            <div
              className={'nav-item' + (activeTab === 'students' || activeTab === 'student-details' ? ' active' : '')}
              onClick={function () { setActiveTab('students') }}
            >
              <span className="nav-icon">👥</span>
              <span className="nav-label">Students Directory</span>
            </div>

            <div
              className={'nav-item' + (activeTab === 'add-student' || activeTab === 'edit-student' ? ' active' : '')}
              onClick={function () { setActiveTab('add-student') }}
            >
              <span className="nav-icon">➕</span>
              <span className="nav-label">Add Student</span>
            </div>

            <div
              className={'nav-item' + (activeTab === 'admin-requests' ? ' active' : '')}
              onClick={function () { setActiveTab('admin-requests') }}
            >
              <span className="nav-icon">📬</span>
              <span className="nav-label">Requests & Tickets</span>
              {totalPendingAdmin > 0 && (
                <span className="sidebar-badge">{totalPendingAdmin}</span>
              )}
            </div>
          </>
        )}

        {/* ================= STUDENT NAVIGATION ================= */}
        {!isAdmin && (
          <>
            <div
              className={'nav-item' + (activeTab === 'student-dashboard' ? ' active' : '')}
              onClick={function () { setActiveTab('student-dashboard') }}
            >
              <span className="nav-icon">🏠</span>
              <span className="nav-label">My Dashboard</span>
            </div>

            <div
              className={'nav-item' + (activeTab === 'student-profile-request' ? ' active' : '')}
              onClick={function () { setActiveTab('student-profile-request') }}
            >
              <span className="nav-icon">✏️</span>
              <span className="nav-label">Change Profile</span>
            </div>

            <div
              className={'nav-item' + (activeTab === 'student-raise-ticket' ? ' active' : '')}
              onClick={function () { setActiveTab('student-raise-ticket') }}
            >
              <span className="nav-icon">🎫</span>
              <span className="nav-label">Raise a Ticket</span>
            </div>

            <div
              className={'nav-item' + (activeTab === 'student-my-requests' ? ' active' : '')}
              onClick={function () { setActiveTab('student-my-requests') }}
            >
              <span className="nav-icon">📋</span>
              <span className="nav-label">My Requests</span>
            </div>
          </>
        )}
      </nav>

      {/* Logout button at bottom of sidebar */}
      <div className="sidebar-footer">
        <button className="btn-sidebar-logout" onClick={onLogout} title="Switch Account / Sign Out">
          🚪 Sign Out
        </button>
        <div className="sidebar-footer-text">© 2026 EduTrack System</div>
      </div>
    </aside>
  )
}

export default Sidebar
