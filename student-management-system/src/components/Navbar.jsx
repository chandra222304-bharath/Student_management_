// src/components/Navbar.jsx

function Navbar({ activeTab, currentUser, onLogout }) {
  var isAdmin = currentUser && currentUser.role === 'admin'
  var student = currentUser && currentUser.student

  function getTitle() {
    if (activeTab === 'dashboard') return 'College Overview Dashboard'
    if (activeTab === 'students') return 'Student Directory'
    if (activeTab === 'add-student') return 'Register New Student'
    if (activeTab === 'edit-student') return 'Edit Student Record'
    if (activeTab === 'student-details') return 'Student Profile'
    if (activeTab === 'admin-requests') return 'Student Requests & Support Center'
    if (activeTab === 'student-dashboard') return 'My Student Portal'
    if (activeTab === 'student-profile-request') return 'Request Profile Modification'
    if (activeTab === 'student-raise-ticket') return 'Raise a Support Ticket'
    if (activeTab === 'student-my-requests') return 'My Submitted Requests & Tickets'
    return 'EduTrack Portal'
  }

  return (
    <header className="app-navbar">
      <div className="navbar-title">
        <h2>{getTitle()}</h2>
      </div>

      <div className="navbar-right">
        <div className="navbar-user">
          <div className={'user-avatar ' + (isAdmin ? 'avatar-admin' : 'avatar-student')}>
            {isAdmin ? '🛡️' : (student ? student.fullName.charAt(0) : 'U')}
          </div>
          <div className="user-info">
            <span className="user-name">
              {isAdmin ? 'System Administrator' : (student ? student.fullName : 'Guest')}
            </span>
            <span className="user-role">
              {isAdmin ? 'Super Admin' : (student ? student.id + ' • ' + student.department : '')}
            </span>
          </div>
        </div>

        <button className="btn-logout" onClick={onLogout} title="Log Out">
          🚪 Logout
        </button>
      </div>
    </header>
  )
}

export default Navbar
