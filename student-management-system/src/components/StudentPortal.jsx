// src/components/StudentPortal.jsx
// Student dashboard showing their profile, status overview, and quick action cards.

function StudentPortal({ student, setActiveTab, profileRequests, tickets }) {

  var myProfileRequests = profileRequests.filter(function (r) {
    return r.studentId === student.id
  })

  var myTickets = tickets.filter(function (t) {
    return t.studentId === student.id
  })

  var pendingRequests = myProfileRequests.filter(function (r) { return r.status === 'pending' }).length
  var openTickets = myTickets.filter(function (t) { return t.status === 'open' || t.status === 'in-progress' }).length

  function formatDate(dateStr) {
    if (!dateStr) return '—'
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    var parts = dateStr.split('-')
    return parseInt(parts[2], 10) + ' ' + months[parseInt(parts[1], 10) - 1] + ' ' + parts[0]
  }

  return (
    <div className="portal-page">
      <div className="page-header">
        <h1>Welcome back, {student.fullName} 👋</h1>
        <p>Student Self-Service Portal & Campus Records Dashboard</p>
      </div>

      {/* Profile Overview Card */}
      <div className="portal-profile-card">
        <div className="portal-avatar">
          {student.fullName.charAt(0)}
        </div>
        <div className="portal-profile-info">
          <div className="portal-header-top">
            <h2>{student.fullName}</h2>
            <div className="portal-meta">
              <span className="id-badge">{student.id}</span>
              <span className="dept-badge">{student.department}</span>
              <span className={'gender-badge ' + (student.gender === 'Male' ? 'gender-male' : 'gender-female')}>
                {student.gender}
              </span>
            </div>
          </div>

          <div className="portal-details-grid">
            <div className="portal-info-cell">
              <span className="info-label">Email Address</span>
              <span className="info-value">📧 {student.email}</span>
            </div>
            <div className="portal-info-cell">
              <span className="info-label">Contact Phone</span>
              <span className="info-value">📱 {student.phone}</span>
            </div>
            <div className="portal-info-cell">
              <span className="info-label">Year of Study</span>
              <span className="info-value">📚 {student.year}</span>
            </div>
            <div className="portal-info-cell">
              <span className="info-label">Enrolled Since</span>
              <span className="info-value">📅 {formatDate(student.enrollmentDate)}</span>
            </div>
            <div className="portal-info-cell full-width">
              <span className="info-label">Registered Residence</span>
              <span className="info-value">📍 {student.address}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Activity Counters Row */}
      <div className="portal-stats-row">
        <div className="portal-stat-card">
          <div className="stat-number">{myProfileRequests.length}</div>
          <div className="stat-label">Profile Change Requests</div>
          {pendingRequests > 0 && <span className="stat-tag pending">{pendingRequests} Pending Review</span>}
        </div>

        <div className="portal-stat-card">
          <div className="stat-number">{myTickets.length}</div>
          <div className="stat-label">Support Tickets Raised</div>
          {openTickets > 0 && <span className="stat-tag open">{openTickets} Active</span>}
        </div>
      </div>

      {/* Quick Action Navigation Cards */}
      <h2 className="section-title">Student Portal Services</h2>
      <div className="portal-actions-grid">
        <div
          className="portal-action-card"
          onClick={function () { setActiveTab('student-profile-request') }}
        >
          <div className="action-icon icon-edit">✏️</div>
          <h3>Request Profile Modification</h3>
          <p>Changed your phone number, relocated, or noticed a typo? Submit an official modification request to the administration.</p>
          <span className="action-link">Open Request Form →</span>
        </div>

        <div
          className="portal-action-card"
          onClick={function () { setActiveTab('student-raise-ticket') }}
        >
          <div className="action-icon icon-ticket">🎫</div>
          <h3>Raise Support Ticket</h3>
          <p>Have an inquiry about examinations, fees, hostels, library cards, or technical issues? Create a ticket for prompt resolution.</p>
          <span className="action-link">Raise Ticket →</span>
        </div>

        <div
          className="portal-action-card"
          onClick={function () { setActiveTab('student-my-requests') }}
        >
          <div className="action-icon icon-history">📋</div>
          <h3>Track Submitted Requests</h3>
          <p>View administrative decisions, approval notices, comments, and real-time status updates for all your submissions.</p>
          <span className="action-link">View All Statuses →</span>
        </div>
      </div>
    </div>
  )
}

export default StudentPortal
