// src/components/DashboardCards.jsx
// Displays summary statistics about students

function DashboardCards({ students }) {

  // Count male students
  var maleCount = students.filter(function (student) {
    return student.gender === 'Male'
  }).length

  // Count female students
  var femaleCount = students.filter(function (student) {
    return student.gender === 'Female'
  }).length

  // Count students per department
  var departments = ['Computer Science', 'Electrical Engineering', 'Mechanical Engineering', 'Civil Engineering', 'Business Administration']

  var departmentCounts = departments.map(function (dept) {
    var count = students.filter(function (student) {
      return student.department === dept
    }).length
    return { name: dept, count: count }
  })

  // Get 5 most recently added students (last items in the array)
  var recentStudents = students.slice(-5).reverse()

  // Short department label for display
  function getShortDept(dept) {
    if (dept === 'Computer Science') return 'CS'
    if (dept === 'Electrical Engineering') return 'EE'
    if (dept === 'Mechanical Engineering') return 'ME'
    if (dept === 'Civil Engineering') return 'CE'
    if (dept === 'Business Administration') return 'BA'
    return dept
  }

  // Color for each department card
  function getDeptColor(dept) {
    if (dept === 'Computer Science') return { bg: '#eff6ff', border: '#bfdbfe', text: '#1d4ed8' }
    if (dept === 'Electrical Engineering') return { bg: '#fefce8', border: '#fde68a', text: '#a16207' }
    if (dept === 'Mechanical Engineering') return { bg: '#fdf2f8', border: '#fbcfe8', text: '#be185d' }
    if (dept === 'Civil Engineering') return { bg: '#f0fdf4', border: '#bbf7d0', text: '#15803d' }
    if (dept === 'Business Administration') return { bg: '#faf5ff', border: '#e9d5ff', text: '#7e22ce' }
    return { bg: '#f8fafc', border: '#e2e8f0', text: '#475569' }
  }

  return (
    <div className="dashboard-page">
      <div className="page-header">
        <h1>Dashboard Overview</h1>
        <p>Quick summary of your student management portal</p>
      </div>

      {/* Summary Cards Row */}
      <div className="summary-cards">
        <div className="summary-card card-total">
          <div className="card-icon">🎓</div>
          <div className="card-data">
            <span className="card-number">{students.length}</span>
            <span className="card-label">Total Students</span>
          </div>
        </div>

        <div className="summary-card card-male">
          <div className="card-icon">👨‍🎓</div>
          <div className="card-data">
            <span className="card-number">{maleCount}</span>
            <span className="card-label">Male Students</span>
          </div>
        </div>

        <div className="summary-card card-female">
          <div className="card-icon">👩‍🎓</div>
          <div className="card-data">
            <span className="card-number">{femaleCount}</span>
            <span className="card-label">Female Students</span>
          </div>
        </div>

        <div className="summary-card card-dept">
          <div className="card-icon">🏛️</div>
          <div className="card-data">
            <span className="card-number">{departments.length}</span>
            <span className="card-label">Departments</span>
          </div>
        </div>
      </div>

      {/* Department Breakdown */}
      <div className="dashboard-section">
        <h2 className="section-title">Students by Department</h2>
        <div className="dept-cards">
          {departmentCounts.map(function (dept) {
            var colors = getDeptColor(dept.name)
            return (
              <div
                className="dept-card"
                key={dept.name}
                style={{
                  backgroundColor: colors.bg,
                  borderColor: colors.border
                }}
              >
                <span className="dept-count" style={{ color: colors.text }}>{dept.count}</span>
                <span className="dept-name" style={{ color: colors.text }}>{dept.name}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Recently Added Students */}
      <div className="dashboard-section">
        <h2 className="section-title">Recently Added Students</h2>
        <div className="recent-table-wrapper">
          <table className="recent-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Department</th>
                <th>Year</th>
                <th>Enrolled</th>
              </tr>
            </thead>
            <tbody>
              {recentStudents.map(function (student) {
                return (
                  <tr key={student.id}>
                    <td><span className="id-badge">{student.id}</span></td>
                    <td>{student.fullName}</td>
                    <td><span className="dept-badge">{getShortDept(student.department)}</span></td>
                    <td>{student.year}</td>
                    <td>{student.enrollmentDate}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default DashboardCards
