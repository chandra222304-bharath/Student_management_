// src/components/LoginScreen.jsx
// The gateway screen. Asks whether the user is an Admin or Student.
// Admin requires a secret key (default: admin123).
// Student requires entering their Student ID or selecting their account.

import { useState } from 'react'

function LoginScreen({ students, onLoginAdmin, onLoginStudent }) {

  // Selected role: 'admin' or 'student'
  var [role, setRole] = useState('admin')

  // Admin secret key
  var [secretKey, setSecretKey] = useState('')
  var [adminError, setAdminError] = useState('')

  // Student selection / input
  var [studentId, setStudentId] = useState('')
  var [studentError, setStudentError] = useState('')

  var ADMIN_SECRET = 'admin123'

  function handleAdminLogin(e) {
    e.preventDefault()
    if (secretKey.trim() === '') {
      setAdminError('Please enter the secret key.')
      return
    }
    if (secretKey !== ADMIN_SECRET) {
      setAdminError('Invalid secret key! Try "admin123".')
      return
    }
    setAdminError('')
    onLoginAdmin()
  }

  function handleStudentLogin(e) {
    e.preventDefault()
    if (studentId.trim() === '') {
      setStudentError('Please enter or select a Student ID.')
      return
    }

    var found = students.find(function (s) {
      return s.id.toLowerCase() === studentId.trim().toLowerCase()
    })

    if (!found) {
      setStudentError('No student found with ID "' + studentId.trim() + '". Please check and try again.')
      return
    }

    setStudentError('')
    onLoginStudent(found)
  }

  function handleQuickStudentSelect(id) {
    setStudentId(id)
    var found = students.find(function (s) {
      return s.id === id
    })
    if (found) {
      setStudentError('')
      onLoginStudent(found)
    }
  }

  return (
    <div className="login-screen">
      <div className="login-container">
        
        {/* Brand Header */}
        <div className="login-header">
          <div className="login-icon">🎓</div>
          <h1>EduTrack Portal</h1>
          <p>College Administration & Student Self-Service System</p>
        </div>

        {/* Role Toggle Selector */}
        <div className="login-tabs">
          <button
            type="button"
            className={'login-tab' + (role === 'admin' ? ' active' : '')}
            onClick={function () { setRole('admin'); setAdminError(''); setStudentError('') }}
          >
            🛡️ College Administrator
          </button>
          <button
            type="button"
            className={'login-tab' + (role === 'student' ? ' active' : '')}
            onClick={function () { setRole('student'); setAdminError(''); setStudentError('') }}
          >
            🎒 Enrolled Student
          </button>
        </div>

        {/* ================= ADMIN FORM ================= */}
        {role === 'admin' && (
          <form className="login-card" onSubmit={handleAdminLogin}>
            <div className="card-badge admin-badge">Restricted Access</div>
            <h2>Admin Authentication</h2>
            <p className="card-desc">Enter your administrative secret key to access dashboard analytics and record management.</p>

            <div className="form-group">
              <label>Admin Secret Key</label>
              <input
                type="password"
                placeholder="Enter secret key..."
                value={secretKey}
                onChange={function (e) { setSecretKey(e.target.value) }}
                autoFocus
              />
              {adminError && <span className="login-error-text">⚠️ {adminError}</span>}
            </div>

            <button type="submit" className="btn-login btn-login-admin">
              🔓 Sign In to Admin Console
            </button>

            <div className="login-tip-box">
              <span className="tip-icon">💡</span>
              <span>Default Administrator Secret Key: <code>admin123</code></span>
            </div>
          </form>
        )}

        {/* ================= STUDENT FORM ================= */}
        {role === 'student' && (
          <form className="login-card" onSubmit={handleStudentLogin}>
            <div className="card-badge student-badge">Student Portal</div>
            <h2>Student Self-Service Login</h2>
            <p className="card-desc">Sign in with your Student ID to view your profile, raise support tickets, and submit profile change requests.</p>

            <div className="form-group">
              <label>Student ID</label>
              <input
                type="text"
                placeholder="e.g. STU-001"
                value={studentId}
                onChange={function (e) { setStudentId(e.target.value) }}
                autoFocus
              />
              {studentError && <span className="login-error-text">⚠️ {studentError}</span>}
            </div>

            <button type="submit" className="btn-login btn-login-student">
              🚀 Enter Student Portal
            </button>

            {/* Quick Demo Pickers */}
            <div className="quick-students-section">
              <span className="quick-label">⚡ Quick Demo Login (Click to Sign In):</span>
              <div className="quick-buttons-row">
                {students.slice(0, 4).map(function (s) {
                  return (
                    <button
                      key={s.id}
                      type="button"
                      className="quick-student-pill"
                      onClick={function () { handleQuickStudentSelect(s.id) }}
                      title={'Log in as ' + s.fullName + ' (' + s.department + ')'}
                    >
                      <strong>{s.id}</strong> • {s.fullName.split(' ')[0]}
                    </button>
                  )
                })}
              </div>
            </div>
          </form>
        )}

      </div>
    </div>
  )
}

export default LoginScreen
