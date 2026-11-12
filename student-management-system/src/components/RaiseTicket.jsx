// src/components/RaiseTicket.jsx
// Form allowing students to raise support/query tickets to administrators

import { useState } from 'react'

function RaiseTicket({ student, onAddTicket, setActiveTab }) {

  var [category, setCategory] = useState('Academic')
  var [priority, setPriority] = useState('Medium')
  var [subject, setSubject] = useState('')
  var [description, setDescription] = useState('')

  var [error, setError] = useState('')
  var [success, setSuccess] = useState('')

  function handleSubmit(e) {
    e.preventDefault()

    if (subject.trim() === '') {
      setError('Please provide a subject for the ticket.')
      return
    }
    if (description.trim() === '') {
      setError('Please provide a description explaining the issue or query.')
      return
    }

    var newTicket = {
      id: 'TCK-' + Math.floor(1000 + Math.random() * 9000),
      studentId: student.id,
      studentName: student.fullName,
      department: student.department,
      date: new Date().toISOString().split('T')[0],
      category: category,
      priority: priority,
      subject: subject.trim(),
      description: description.trim(),
      status: 'open', // 'open' | 'in-progress' | 'resolved'
      adminReply: ''
    }

    onAddTicket(newTicket)
    setError('')
    setSuccess('Ticket #' + newTicket.id + ' raised successfully! Our administration team will look into it.')
    setSubject('')
    setDescription('')
  }

  return (
    <div className="form-page">
      <div className="page-header">
        <h1>Raise a Support Ticket</h1>
        <p>Submit questions, issues, or administrative assistance requests directly to college management.</p>
      </div>

      {success && (
        <div className="alert alert-success">
          {success}
          <div style={{ marginTop: '10px' }}>
            <button className="btn-secondary" onClick={function () { setActiveTab('student-my-requests') }}>
              Track Tickets →
            </button>
          </div>
        </div>
      )}

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="form-card">
        <form onSubmit={handleSubmit}>

          <div className="form-row">
            <div className="form-group">
              <label>Ticket Category <span className="required">*</span></label>
              <select value={category} onChange={function (e) { setCategory(e.target.value) }}>
                <option value="Academic">Academic / Syllabus</option>
                <option value="Fees & Accounts">Fees & Financials</option>
                <option value="Examinations">Examinations & Hall Ticket</option>
                <option value="Hostel & Transport">Hostel & Transportation</option>
                <option value="Library">Library & Books</option>
                <option value="Technical Support">Technical / Portal Issues</option>
                <option value="Other">General Administration</option>
              </select>
            </div>

            <div className="form-group">
              <label>Priority Level <span className="required">*</span></label>
              <select value={priority} onChange={function (e) { setPriority(e.target.value) }}>
                <option value="Low">Low - General Inquiry</option>
                <option value="Medium">Medium - Standard Request</option>
                <option value="High">High - Urgent Assistance</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Subject / Brief Summary <span className="required">*</span></label>
            <input
              type="text"
              value={subject}
              onChange={function (e) { setSubject(e.target.value) }}
              placeholder="e.g. Discrepancy in Semester 3 Grade Sheet"
            />
          </div>

          <div className="form-group">
            <label>Detailed Description <span className="required">*</span></label>
            <textarea
              rows="5"
              value={description}
              onChange={function (e) { setDescription(e.target.value) }}
              placeholder="Please describe your query or issue in detail..."
            />
          </div>

          <div className="form-buttons">
            <button type="submit" className="btn-primary">
              🎫 Submit Ticket
            </button>
            <button type="button" className="btn-secondary" onClick={function () { setActiveTab('student-dashboard') }}>
              Cancel
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}

export default RaiseTicket
