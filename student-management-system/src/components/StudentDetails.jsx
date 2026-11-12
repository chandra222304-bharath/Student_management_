// src/components/StudentDetails.jsx
// Displays full information for a single selected student

function StudentDetails({ student, onEditStudent, onBack }) {

  // Format a date string like "2003-05-14" to a more readable "14 May 2003"
  function formatDate(dateStr) {
    if (!dateStr) return '—'
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    var parts = dateStr.split('-')
    var year = parts[0]
    var monthIndex = parseInt(parts[1], 10) - 1
    var day = parseInt(parts[2], 10)
    return day + ' ' + months[monthIndex] + ' ' + year
  }

  // Compute age from date of birth
  function computeAge(dateStr) {
    if (!dateStr) return '—'
    var today = new Date()
    var birthDate = new Date(dateStr)
    var age = today.getFullYear() - birthDate.getFullYear()
    var monthDiff = today.getMonth() - birthDate.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age = age - 1
    }
    return age + ' years'
  }

  return (
    <div className="details-page">
      <div className="page-header">
        <button className="btn-back" onClick={onBack}>← Back to Students</button>
      </div>

      <div className="details-card">
        {/* Top header section */}
        <div className="details-header">
          <div className="details-avatar">
            {student.fullName.charAt(0)}
          </div>
          <div className="details-header-info">
            <h1>{student.fullName}</h1>
            <div className="details-meta">
              <span className="id-badge">{student.id}</span>
              <span className="dept-badge-lg">{student.department}</span>
              <span className={'gender-badge ' + (student.gender === 'Male' ? 'gender-male' : 'gender-female')}>
                {student.gender}
              </span>
            </div>
          </div>
          <button className="btn-edit-profile" onClick={function () { onEditStudent(student) }}>
            ✏️ Edit Profile
          </button>
        </div>

        {/* Details grid */}
        <div className="details-grid">
          <div className="detail-item">
            <span className="detail-label">📧 Email</span>
            <span className="detail-value">{student.email}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">📱 Phone</span>
            <span className="detail-value">{student.phone}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">🎂 Date of Birth</span>
            <span className="detail-value">{formatDate(student.dateOfBirth)}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">📅 Age</span>
            <span className="detail-value">{computeAge(student.dateOfBirth)}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">🏛️ Department</span>
            <span className="detail-value">{student.department}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">📚 Year of Study</span>
            <span className="detail-value">{student.year}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">📝 Enrollment Date</span>
            <span className="detail-value">{formatDate(student.enrollmentDate)}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">📍 Address</span>
            <span className="detail-value">{student.address}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentDetails
