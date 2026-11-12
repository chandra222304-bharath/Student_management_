// src/App.jsx
// Root component managing all application state:
// - User Authentication (Admin vs Student Login)
// - Student Records (CRUD)
// - Profile Modification Requests (Submit, Approve, Reject)
// - Student Support Tickets (Raise, Update, Resolve)
// - LocalStorage Persistence

import { useState, useEffect } from 'react'
import './styles/App.css'
import './styles/Dashboard.css'
import './styles/Students.css'
import './styles/StudentForm.css'
import './styles/StudentDetails.css'
import './styles/Portal.css'

import Sidebar from './components/Sidebar.jsx'
import Navbar from './components/Navbar.jsx'
import LoginScreen from './components/LoginScreen.jsx'
import DashboardCards from './components/DashboardCards.jsx'
import StudentTable from './components/StudentTable.jsx'
import StudentForm from './components/StudentForm.jsx'
import StudentDetails from './components/StudentDetails.jsx'
import StudentPortal from './components/StudentPortal.jsx'
import StudentProfileRequest from './components/StudentProfileRequest.jsx'
import RaiseTicket from './components/RaiseTicket.jsx'
import MyRequests from './components/MyRequests.jsx'
import AdminRequests from './components/AdminRequests.jsx'

import sampleStudents from './data/students.js'
import { sampleProfileRequests, sampleTickets } from './data/requests.js'

function App() {

  // ========================================================
  // 1. AUTHENTICATION STATE
  // ========================================================
  var [currentUser, setCurrentUser] = useState(function () {
    var savedUser = localStorage.getItem('edutrack-current-user')
    if (savedUser) {
      try {
        return JSON.parse(savedUser)
      } catch (err) {
        return null
      }
    }
    return null // Null means user is logged out (shows LoginScreen)
  })

  // Which page/tab is currently active
  var [activeTab, setActiveTab] = useState(function () {
    if (currentUser && currentUser.role === 'student') {
      return 'student-dashboard'
    }
    return 'dashboard'
  })

  // ========================================================
  // 2. DATA STATES (With LocalStorage initialization)
  // ========================================================

  // Enrolled Students list
  var [students, setStudents] = useState(function () {
    var saved = localStorage.getItem('edutrack-students')
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch (err) {
        return sampleStudents
      }
    }
    return sampleStudents
  })

  // Profile Change Modification Requests
  var [profileRequests, setProfileRequests] = useState(function () {
    var saved = localStorage.getItem('edutrack-profile-requests')
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch (err) {
        return sampleProfileRequests
      }
    }
    return sampleProfileRequests
  })

  // Student Support Tickets
  var [tickets, setTickets] = useState(function () {
    var saved = localStorage.getItem('edutrack-tickets')
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch (err) {
        return sampleTickets
      }
    }
    return sampleTickets
  })

  // Active student being inspected or edited in admin view
  var [selectedStudent, setSelectedStudent] = useState(null)
  var [editingStudent, setEditingStudent] = useState(null)

  // ========================================================
  // 3. LOCAL STORAGE PERSISTENCE (useEffect hooks)
  // ========================================================

  useEffect(function () {
    if (currentUser) {
      localStorage.setItem('edutrack-current-user', JSON.stringify(currentUser))
    } else {
      localStorage.removeItem('edutrack-current-user')
    }
  }, [currentUser])

  useEffect(function () {
    localStorage.setItem('edutrack-students', JSON.stringify(students))
  }, [students])

  useEffect(function () {
    localStorage.setItem('edutrack-profile-requests', JSON.stringify(profileRequests))
  }, [profileRequests])

  useEffect(function () {
    localStorage.setItem('edutrack-tickets', JSON.stringify(tickets))
  }, [tickets])

  // Keep student object inside currentUser updated when student record changes
  useEffect(function () {
    if (currentUser && currentUser.role === 'student' && currentUser.student) {
      var fresh = students.find(function (s) { return s.id === currentUser.student.id })
      if (fresh) {
        setCurrentUser(function (prev) {
          return { role: 'student', student: fresh }
        })
      }
    }
  }, [students])

  // ========================================================
  // 4. AUTHENTICATION HANDLERS
  // ========================================================

  function handleLoginAdmin() {
    setCurrentUser({ role: 'admin' })
    setActiveTab('dashboard')
  }

  function handleLoginStudent(studentObj) {
    setCurrentUser({ role: 'student', student: studentObj })
    setActiveTab('student-dashboard')
  }

  function handleLogout() {
    setCurrentUser(null)
    setActiveTab('dashboard')
    setSelectedStudent(null)
    setEditingStudent(null)
  }

  // ========================================================
  // 5. ADMIN CRUD HANDLERS
  // ========================================================

  function handleAddStudent(newStudent) {
    setStudents(function (prev) {
      return prev.concat([newStudent])
    })
  }

  function handleUpdateStudent(updatedStudent) {
    setStudents(function (prev) {
      return prev.map(function (s) {
        return s.id === updatedStudent.id ? updatedStudent : s
      })
    })
    setActiveTab('students')
    setEditingStudent(null)
  }

  function handleDeleteStudent(studentId) {
    setStudents(function (prev) {
      return prev.filter(function (s) { return s.id !== studentId })
    })
  }

  function handleViewStudent(student) {
    setSelectedStudent(student)
    setActiveTab('student-details')
  }

  function handleEditStudent(student) {
    setEditingStudent(student)
    setActiveTab('edit-student')
  }

  // ========================================================
  // 6. REQUESTS & TICKETS HANDLERS
  // ========================================================

  // Student submits a profile change request
  function handleSubmitProfileRequest(newRequest) {
    setProfileRequests(function (prev) {
      return [newRequest].concat(prev)
    })
  }

  // Admin approves a profile change request:
  // 1. Updates request status to 'approved'
  // 2. Automatically updates the student's live record in `students`!
  function handleApproveProfileRequest(requestId) {
    var reqToApprove = profileRequests.find(function (r) { return r.id === requestId })
    if (!reqToApprove) return

    // 1. Update the request status
    setProfileRequests(function (prev) {
      return prev.map(function (r) {
        if (r.id === requestId) {
          return {
            ...r,
            status: 'approved',
            adminComment: 'Approved and applied by college administration.'
          }
        }
        return r
      })
    })

    // 2. Update the actual student record with the requested data
    setStudents(function (prev) {
      return prev.map(function (student) {
        if (student.id === reqToApprove.studentId) {
          return {
            ...student,
            fullName: reqToApprove.requestedData.fullName,
            phone: reqToApprove.requestedData.phone,
            address: reqToApprove.requestedData.address,
            department: reqToApprove.requestedData.department,
            year: reqToApprove.requestedData.year
          }
        }
        return student
      })
    })
  }

  // Admin rejects a profile change request
  function handleRejectProfileRequest(requestId, comment) {
    setProfileRequests(function (prev) {
      return prev.map(function (r) {
        if (r.id === requestId) {
          return {
            ...r,
            status: 'rejected',
            adminComment: comment || 'Request rejected by college administration.'
          }
        }
        return r
      })
    })
  }

  // Student raises a new ticket
  function handleAddTicket(newTicket) {
    setTickets(function (prev) {
      return [newTicket].concat(prev)
    })
  }

  // Admin updates ticket status and/or replies
  function handleUpdateTicketStatus(ticketId, newStatus, reply) {
    setTickets(function (prev) {
      return prev.map(function (t) {
        if (t.id === ticketId) {
          return {
            ...t,
            status: newStatus,
            adminReply: reply || t.adminReply
          }
        }
        return t
      })
    })
  }

  // ========================================================
  // 7. RENDER LOGIC
  // ========================================================

  // If not logged in, show the LoginScreen
  if (!currentUser) {
    return (
      <LoginScreen
        students={students}
        onLoginAdmin={handleLoginAdmin}
        onLoginStudent={handleLoginStudent}
      />
    )
  }

  var pendingRequestsCount = profileRequests.filter(function (r) { return r.status === 'pending' }).length
  var openTicketsCount = tickets.filter(function (t) { return t.status === 'open' }).length

  return (
    <div className="app-container">
      {/* Sidebar with dynamic links for Admin or Student */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={function (tab) {
          setActiveTab(tab)
          setSelectedStudent(null)
          setEditingStudent(null)
        }}
        currentUser={currentUser}
        onLogout={handleLogout}
        pendingRequestsCount={pendingRequestsCount}
        openTicketsCount={openTicketsCount}
      />

      <div className="app-main">
        {/* Top Navbar */}
        <Navbar
          activeTab={activeTab}
          currentUser={currentUser}
          onLogout={handleLogout}
        />

        <main className="app-content">

          {/* ================= ADMIN VIEWS ================= */}
          {currentUser.role === 'admin' && (
            <>
              {activeTab === 'dashboard' && (
                <DashboardCards students={students} />
              )}

              {activeTab === 'students' && (
                <StudentTable
                  students={students}
                  onViewStudent={handleViewStudent}
                  onEditStudent={handleEditStudent}
                  onDeleteStudent={handleDeleteStudent}
                />
              )}

              {activeTab === 'add-student' && (
                <StudentForm
                  key="add-form"
                  students={students}
                  onAddStudent={handleAddStudent}
                  onUpdateStudent={handleUpdateStudent}
                  editingStudent={null}
                  setActiveTab={setActiveTab}
                />
              )}

              {activeTab === 'edit-student' && editingStudent && (
                <StudentForm
                  key={'edit-' + editingStudent.id}
                  students={students}
                  onAddStudent={handleAddStudent}
                  onUpdateStudent={handleUpdateStudent}
                  editingStudent={editingStudent}
                  setActiveTab={setActiveTab}
                />
              )}

              {activeTab === 'student-details' && selectedStudent && (
                <StudentDetails
                  student={selectedStudent}
                  onEditStudent={handleEditStudent}
                  onBack={function () { setSelectedStudent(null); setActiveTab('students') }}
                />
              )}

              {activeTab === 'admin-requests' && (
                <AdminRequests
                  profileRequests={profileRequests}
                  tickets={tickets}
                  onApproveProfileRequest={handleApproveProfileRequest}
                  onRejectProfileRequest={handleRejectProfileRequest}
                  onUpdateTicketStatus={handleUpdateTicketStatus}
                />
              )}
            </>
          )}

          {/* ================= STUDENT VIEWS ================= */}
          {currentUser.role === 'student' && currentUser.student && (
            <>
              {activeTab === 'student-dashboard' && (
                <StudentPortal
                  student={currentUser.student}
                  setActiveTab={setActiveTab}
                  profileRequests={profileRequests}
                  tickets={tickets}
                />
              )}

              {activeTab === 'student-profile-request' && (
                <StudentProfileRequest
                  student={currentUser.student}
                  onSubmitRequest={handleSubmitProfileRequest}
                  setActiveTab={setActiveTab}
                />
              )}

              {activeTab === 'student-raise-ticket' && (
                <RaiseTicket
                  student={currentUser.student}
                  onAddTicket={handleAddTicket}
                  setActiveTab={setActiveTab}
                />
              )}

              {activeTab === 'student-my-requests' && (
                <MyRequests
                  student={currentUser.student}
                  profileRequests={profileRequests}
                  tickets={tickets}
                  setActiveTab={setActiveTab}
                />
              )}
            </>
          )}

        </main>
      </div>
    </div>
  )
}

export default App
