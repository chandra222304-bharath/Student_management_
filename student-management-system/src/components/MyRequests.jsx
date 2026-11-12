// src/components/MyRequests.jsx
// View for students to see all their submitted profile modification requests and support tickets

import { useState } from 'react'

function MyRequests({ student, profileRequests, tickets, setActiveTab }) {

  var [activeSubTab, setActiveSubTab] = useState('profile') // 'profile' or 'tickets'

  // Filter requests belonging to this student
  var myProfileRequests = profileRequests.filter(function (req) {
    return req.studentId === student.id
  })

  var myTickets = tickets.filter(function (tck) {
    return tck.studentId === student.id
  })

  function getStatusBadge(status) {
    if (status === 'approved' || status === 'resolved') {
      return <span className="status-badge-success">✓ {status.toUpperCase()}</span>
    } else if (status === 'rejected') {
      return <span className="status-badge-danger">✕ REJECTED</span>
    } else if (status === 'in-progress') {
      return <span className="status-badge-warning">⚡ IN PROGRESS</span>
    } else {
      return <span className="status-badge-pending">⏳ PENDING</span>
    }
  }

  return (
    <div className="requests-page">
      <div className="page-header">
        <h1>My Submitted Requests & Tickets</h1>
        <p>Monitor status updates and administration responses for your submissions</p>
      </div>

      {/* Tabs */}
      <div className="sub-tabs">
        <button
          className={'sub-tab' + (activeSubTab === 'profile' ? ' active' : '')}
          onClick={function () { setActiveSubTab('profile') }}
        >
          ✏️ Profile Change Requests ({myProfileRequests.length})
        </button>
        <button
          className={'sub-tab' + (activeSubTab === 'tickets' ? ' active' : '')}
          onClick={function () { setActiveSubTab('tickets') }}
        >
          🎫 Support Tickets ({myTickets.length})
        </button>
      </div>

      {/* 1. Profile Modification Requests */}
      {activeSubTab === 'profile' && (
        <div className="requests-container">
          {myProfileRequests.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📝</div>
              <h3>No Profile Change Requests</h3>
              <p>You haven't submitted any modification requests yet.</p>
              <button className="btn-primary" onClick={function () { setActiveTab('student-profile-request') }}>
                Request Profile Change
              </button>
            </div>
          ) : (
            <div className="request-cards-list">
              {myProfileRequests.map(function (req) {
                return (
                  <div key={req.id} className={'request-card ' + req.status}>
                    <div className="request-card-header">
                      <div>
                        <span className="req-id">{req.id}</span>
                        <span className="req-date">Submitted on {req.requestDate}</span>
                      </div>
                      <div>{getStatusBadge(req.status)}</div>
                    </div>

                    <div className="request-body">
                      <p><strong>Reason:</strong> {req.reason}</p>

                      <div className="changes-diff-box">
                        <h4>Requested Modifications:</h4>
                        <ul>
                          {req.originalData.fullName !== req.requestedData.fullName && (
                            <li>
                              <strong>Name:</strong> <span className="old-val">{req.originalData.fullName}</span> → <span className="new-val">{req.requestedData.fullName}</span>
                            </li>
                          )}
                          {req.originalData.phone !== req.requestedData.phone && (
                            <li>
                              <strong>Phone:</strong> <span className="old-val">{req.originalData.phone}</span> → <span className="new-val">{req.requestedData.phone}</span>
                            </li>
                          )}
                          {req.originalData.department !== req.requestedData.department && (
                            <li>
                              <strong>Department:</strong> <span className="old-val">{req.originalData.department}</span> → <span className="new-val">{req.requestedData.department}</span>
                            </li>
                          )}
                          {req.originalData.year !== req.requestedData.year && (
                            <li>
                              <strong>Year:</strong> <span className="old-val">{req.originalData.year}</span> → <span className="new-val">{req.requestedData.year}</span>
                            </li>
                          )}
                          {req.originalData.address !== req.requestedData.address && (
                            <li>
                              <strong>Address:</strong> <span className="old-val">{req.originalData.address}</span> → <span className="new-val">{req.requestedData.address}</span>
                            </li>
                          )}
                        </ul>
                      </div>

                      {req.adminComment && (
                        <div className="admin-response-box">
                          <strong>Admin Note:</strong> {req.adminComment}
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}

      {/* 2. Support Tickets */}
      {activeSubTab === 'tickets' && (
        <div className="requests-container">
          {myTickets.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🎫</div>
              <h3>No Support Tickets Raised</h3>
              <p>Everything running smoothly! If you ever have questions or issues, raise a ticket.</p>
              <button className="btn-primary" onClick={function () { setActiveTab('student-raise-ticket') }}>
                Raise a Ticket Now
              </button>
            </div>
          ) : (
            <div className="request-cards-list">
              {myTickets.map(function (tck) {
                return (
                  <div key={tck.id} className={'request-card ticket-card ' + tck.status}>
                    <div className="request-card-header">
                      <div>
                        <span className="req-id">{tck.id}</span>
                        <span className="tag-category">{tck.category}</span>
                        <span className="req-date">Raised on {tck.date}</span>
                      </div>
                      <div className="header-badges">
                        <span className={'priority-badge ' + tck.priority.toLowerCase()}>{tck.priority} Priority</span>
                        {getStatusBadge(tck.status)}
                      </div>
                    </div>

                    <div className="request-body">
                      <h3 className="ticket-subject">{tck.subject}</h3>
                      <p className="ticket-desc">{tck.description}</p>

                      {tck.adminReply && (
                        <div className="admin-response-box">
                          <strong>Admin Response:</strong> {tck.adminReply}
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default MyRequests
