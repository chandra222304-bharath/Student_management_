// src/components/AdminRequests.jsx
// Dedicated Admin section to review, approve/reject student profile modification requests,
// and manage support tickets.

import { useState } from 'react'

function AdminRequests({
  profileRequests,
  tickets,
  onApproveProfileRequest,
  onRejectProfileRequest,
  onUpdateTicketStatus
}) {

  var [activeTab, setActiveTab] = useState('profile-requests') // 'profile-requests' | 'tickets'
  var [filterStatus, setFilterStatus] = useState('all') // 'all' | 'pending' | 'approved' | 'rejected'

  // State for rejecting a request with a comment
  var [rejectingId, setRejectingId] = useState(null)
  var [rejectComment, setRejectComment] = useState('')

  // State for replying to a ticket
  var [replyingTicketId, setReplyingTicketId] = useState(null)
  var [adminReplyText, setAdminReplyText] = useState('')
  var [ticketNewStatus, setTicketNewStatus] = useState('resolved')

  // Filter profile requests based on selected status filter
  var filteredProfileRequests = profileRequests.filter(function (req) {
    if (filterStatus === 'all') return true
    return req.status === filterStatus
  })

  var pendingProfileCount = profileRequests.filter(function (r) { return r.status === 'pending' }).length
  var openTicketCount = tickets.filter(function (t) { return t.status === 'open' }).length

  function handleConfirmReject(requestId) {
    onRejectProfileRequest(requestId, rejectComment.trim() || 'Request rejected by administration.')
    setRejectingId(null)
    setRejectComment('')
  }

  function handleConfirmTicketReply(ticketId) {
    onUpdateTicketStatus(ticketId, ticketNewStatus, adminReplyText.trim())
    setReplyingTicketId(null)
    setAdminReplyText('')
  }

  function getStatusBadge(status) {
    if (status === 'approved' || status === 'resolved') {
      return <span className="status-badge-success">✓ {status.toUpperCase()}</span>
    } else if (status === 'rejected') {
      return <span className="status-badge-danger">✕ REJECTED</span>
    } else if (status === 'in-progress') {
      return <span className="status-badge-warning">⚡ IN PROGRESS</span>
    } else {
      return <span className="status-badge-pending">⏳ PENDING REVIEW</span>
    }
  }

  return (
    <div className="admin-requests-page">
      <div className="page-header">
        <h1>Student Requests & Support Center</h1>
        <p>Review student profile change requests and manage college support inquiries</p>
      </div>

      {/* Main Mode Tabs */}
      <div className="sub-tabs">
        <button
          className={'sub-tab' + (activeTab === 'profile-requests' ? ' active' : '')}
          onClick={function () { setActiveTab('profile-requests') }}
        >
          ✏️ Profile Modification Requests
          {pendingProfileCount > 0 && <span className="counter-pill">{pendingProfileCount}</span>}
        </button>

        <button
          className={'sub-tab' + (activeTab === 'tickets' ? ' active' : '')}
          onClick={function () { setActiveTab('tickets') }}
        >
          🎫 Student Support Tickets
          {openTicketCount > 0 && <span className="counter-pill warning">{openTicketCount}</span>}
        </button>
      </div>

      {/* ========================================================
          1. PROFILE MODIFICATION REQUESTS SECTION
          ======================================================== */}
      {activeTab === 'profile-requests' && (
        <div className="admin-section">
          {/* Status Filter Bar */}
          <div className="filter-pills">
            <button
              className={'pill' + (filterStatus === 'all' ? ' active' : '')}
              onClick={function () { setFilterStatus('all') }}
            >
              All Requests ({profileRequests.length})
            </button>
            <button
              className={'pill' + (filterStatus === 'pending' ? ' active' : '')}
              onClick={function () { setFilterStatus('pending') }}
            >
              Pending ({pendingProfileCount})
            </button>
            <button
              className={'pill' + (filterStatus === 'approved' ? ' active' : '')}
              onClick={function () { setFilterStatus('approved') }}
            >
              Approved ({profileRequests.filter(function (r) { return r.status === 'approved' }).length})
            </button>
            <button
              className={'pill' + (filterStatus === 'rejected' ? ' active' : '')}
              onClick={function () { setFilterStatus('rejected') }}
            >
              Rejected ({profileRequests.filter(function (r) { return r.status === 'rejected' }).length})
            </button>
          </div>

          {filteredProfileRequests.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🎉</div>
              <h3>No Requests Found</h3>
              <p>There are no profile modification requests matching this status filter.</p>
            </div>
          ) : (
            <div className="admin-cards-list">
              {filteredProfileRequests.map(function (req) {
                return (
                  <div key={req.id} className={'admin-request-card ' + req.status}>
                    <div className="admin-card-header">
                      <div className="student-header-info">
                        <span className="id-badge">{req.studentId}</span>
                        <h3 className="student-name">{req.studentName}</h3>
                        <span className="req-date">Requested: {req.requestDate}</span>
                      </div>
                      <div>{getStatusBadge(req.status)}</div>
                    </div>

                    <div className="admin-card-body">
                      <p className="request-reason">
                        <strong>Student's Stated Reason:</strong> <em>"{req.reason}"</em>
                      </p>

                      {/* Side by side comparison table */}
                      <div className="diff-table-container">
                        <table className="diff-table">
                          <thead>
                            <tr>
                              <th>Field</th>
                              <th>Current Profile Data</th>
                              <th>Requested New Data</th>
                            </tr>
                          </thead>
                          <tbody>
                            {req.originalData.fullName !== req.requestedData.fullName && (
                              <tr className="highlight-row">
                                <td><strong>Full Name</strong></td>
                                <td className="old-cell">{req.originalData.fullName}</td>
                                <td className="new-cell">{req.requestedData.fullName}</td>
                              </tr>
                            )}
                            {req.originalData.phone !== req.requestedData.phone && (
                              <tr className="highlight-row">
                                <td><strong>Phone Number</strong></td>
                                <td className="old-cell">{req.originalData.phone}</td>
                                <td className="new-cell">{req.requestedData.phone}</td>
                              </tr>
                            )}
                            {req.originalData.department !== req.requestedData.department && (
                              <tr className="highlight-row">
                                <td><strong>Department</strong></td>
                                <td className="old-cell">{req.originalData.department}</td>
                                <td className="new-cell">{req.requestedData.department}</td>
                              </tr>
                            )}
                            {req.originalData.year !== req.requestedData.year && (
                              <tr className="highlight-row">
                                <td><strong>Year</strong></td>
                                <td className="old-cell">{req.originalData.year}</td>
                                <td className="new-cell">{req.requestedData.year}</td>
                              </tr>
                            )}
                            {req.originalData.address !== req.requestedData.address && (
                              <tr className="highlight-row">
                                <td><strong>Address</strong></td>
                                <td className="old-cell">{req.originalData.address}</td>
                                <td className="new-cell">{req.requestedData.address}</td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>

                      {/* Display Admin comment if previously handled */}
                      {req.adminComment && (
                        <div className="admin-response-box">
                          <strong>Admin Comment:</strong> {req.adminComment}
                        </div>
                      )}

                      {/* Pending Action Buttons */}
                      {req.status === 'pending' && (
                        <div className="admin-actions-bar">
                          {rejectingId === req.id ? (
                            <div className="reject-box">
                              <input
                                type="text"
                                placeholder="Enter reason for rejection (optional)..."
                                value={rejectComment}
                                onChange={function (e) { setRejectComment(e.target.value) }}
                              />
                              <div className="reject-actions">
                                <button className="btn-action btn-delete" onClick={function () { handleConfirmReject(req.id) }}>
                                  Confirm Rejection
                                </button>
                                <button className="btn-secondary btn-sm" onClick={function () { setRejectingId(null) }}>
                                  Cancel
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="action-buttons-group">
                              <button
                                className="btn-action btn-approve"
                                onClick={function () { onApproveProfileRequest(req.id) }}
                              >
                                ✓ Accept & Apply Changes to Student Record
                              </button>
                              <button
                                className="btn-action btn-reject"
                                onClick={function () { setRejectingId(req.id); setRejectComment('') }}
                              >
                                ✕ Reject Request
                              </button>
                            </div>
                          )}
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

      {/* ========================================================
          2. SUPPORT TICKETS SECTION
          ======================================================== */}
      {activeTab === 'tickets' && (
        <div className="admin-section">
          {tickets.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📬</div>
              <h3>No Tickets Raised</h3>
              <p>No student support inquiries have been submitted.</p>
            </div>
          ) : (
            <div className="admin-cards-list">
              {tickets.map(function (tck) {
                return (
                  <div key={tck.id} className={'admin-request-card ticket-card ' + tck.status}>
                    <div className="admin-card-header">
                      <div>
                        <span className="req-id">{tck.id}</span>
                        <span className="tag-category">{tck.category}</span>
                        <span className="req-date">From: <strong>{tck.studentName}</strong> ({tck.studentId}) on {tck.date}</span>
                      </div>
                      <div className="header-badges">
                        <span className={'priority-badge ' + tck.priority.toLowerCase()}>{tck.priority} Priority</span>
                        {getStatusBadge(tck.status)}
                      </div>
                    </div>

                    <div className="admin-card-body">
                      <h3 className="ticket-subject">{tck.subject}</h3>
                      <p className="ticket-desc">{tck.description}</p>

                      {tck.adminReply && (
                        <div className="admin-response-box">
                          <strong>Current Admin Reply:</strong> {tck.adminReply}
                        </div>
                      )}

                      {/* Ticket Action / Reply Form */}
                      {replyingTicketId === tck.id ? (
                        <div className="ticket-reply-form">
                          <label>Reply to Student & Update Status:</label>
                          <textarea
                            rows="3"
                            placeholder="Type resolution or message for the student..."
                            value={adminReplyText}
                            onChange={function (e) { setAdminReplyText(e.target.value) }}
                          />
                          <div className="reply-form-footer">
                            <select
                              value={ticketNewStatus}
                              onChange={function (e) { setTicketNewStatus(e.target.value) }}
                            >
                              <option value="in-progress">In Progress</option>
                              <option value="resolved">Resolved</option>
                              <option value="open">Keep Open</option>
                            </select>
                            <div className="action-buttons-group">
                              <button className="btn-primary btn-sm" onClick={function () { handleConfirmTicketReply(tck.id) }}>
                                Send Reply & Update
                              </button>
                              <button className="btn-secondary btn-sm" onClick={function () { setReplyingTicketId(null) }}>
                                Cancel
                              </button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="admin-actions-bar">
                          <button
                            className="btn-secondary btn-sm"
                            onClick={function () {
                              setReplyingTicketId(tck.id)
                              setAdminReplyText(tck.adminReply || '')
                              setTicketNewStatus(tck.status === 'open' ? 'in-progress' : tck.status)
                            }}
                          >
                            💬 Reply / Update Ticket Status
                          </button>
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

export default AdminRequests
