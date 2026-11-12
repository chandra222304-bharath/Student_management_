// src/components/StudentProfileRequest.jsx
// Form allowing a student to request changes to their personal/academic profile.
// The request goes to the Admin for approval or rejection.

import { useState } from 'react'

function StudentProfileRequest({ student, onSubmitRequest, setActiveTab }) {

  // Form state pre-filled with the student's current profile data
  var [fullName, setFullName] = useState(student.fullName)
  var [phone, setPhone] = useState(student.phone)
  var [address, setAddress] = useState(student.address)
  var [department, setDepartment] = useState(student.department)
  var [year, setYear] = useState(student.year)
  var [reason, setReason] = useState('')

  var [error, setError] = useState('')
  var [success, setSuccess] = useState('')

  function handleSubmit(e) {
    e.preventDefault()

    // Validation
    if (fullName.trim() === '') {
      setError('Full name cannot be blank.')
      return
    }
    if (!/^\d{10}$/.test(phone.trim())) {
      setError('Phone number must be a valid 10-digit number.')
      return
    }
    if (address.trim() === '') {
      setError('Address cannot be blank.')
      return
    }
    if (reason.trim() === '') {
      setError('Please provide a reason for requesting these modifications.')
      return
    }

    // Check if anything actually changed
    var hasChanges = (
      fullName.trim() !== student.fullName ||
      phone.trim() !== student.phone ||
      address.trim() !== student.address ||
      department !== student.department ||
      year !== student.year
    )

    if (!hasChanges) {
      setError('No changes detected compared to your current profile.')
      return
    }

    var newRequest = {
      id: 'REQ-' + Math.floor(1000 + Math.random() * 9000),
      studentId: student.id,
      studentName: student.fullName,
      email: student.email,
      requestDate: new Date().toISOString().split('T')[0],
      reason: reason.trim(),
      status: 'pending', // 'pending' | 'approved' | 'rejected'
      adminComment: '',
      // Snapshot of original data
      originalData: {
        fullName: student.fullName,
        phone: student.phone,
        address: student.address,
        department: student.department,
        year: student.year
      },
      // Requested updates
      requestedData: {
        fullName: fullName.trim(),
        phone: phone.trim(),
        address: address.trim(),
        department: department,
        year: year
      }
    }

    onSubmitRequest(newRequest)
    setError('')
    setSuccess('Your profile modification request has been submitted successfully! An administrator will review and approve it shortly.')
  }

  return (
    <div className="form-page">
      <div className="page-header">
        <h1>Request Profile Modification</h1>
        <p>Update your details below. Once submitted, the administration team will review and approve the changes.</p>
      </div>

      {success && (
        <div className="alert alert-success">
          {success}
          <div style={{ marginTop: '10px' }}>
            <button className="btn-secondary" onClick={function () { setActiveTab('student-my-requests') }}>
              View My Requests →
            </button>
          </div>
        </div>
      )}

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="form-card">
        <form onSubmit={handleSubmit}>

          <div className="form-row">
            <div className="form-group">
              <label>Student ID (Non-modifiable)</label>
              <input type="text" value={student.id} disabled className="input-disabled" />
            </div>
            <div className="form-group">
              <label>Email Address (Non-modifiable)</label>
              <input type="text" value={student.email} disabled className="input-disabled" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Full Name <span className="required">*</span></label>
              <input
                type="text"
                value={fullName}
                onChange={function (e) { setFullName(e.target.value) }}
                placeholder="Enter full name"
              />
            </div>
            <div className="form-group">
              <label>Phone Number <span className="required">*</span></label>
              <input
                type="text"
                value={phone}
                onChange={function (e) { setPhone(e.target.value) }}
                placeholder="10-digit phone number"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Department</label>
              <select value={department} onChange={function (e) { setDepartment(e.target.value) }}>
                <option value="Computer Science">Computer Science</option>
                <option value="Electrical Engineering">Electrical Engineering</option>
                <option value="Mechanical Engineering">Mechanical Engineering</option>
                <option value="Civil Engineering">Civil Engineering</option>
                <option value="Business Administration">Business Administration</option>
              </select>
            </div>
            <div className="form-group">
              <label>Year of Study</label>
              <select value={year} onChange={function (e) { setYear(e.target.value) }}>
                <option value="1st Year">1st Year</option>
                <option value="2nd Year">2nd Year</option>
                <option value="3rd Year">3rd Year</option>
                <option value="4th Year">4th Year</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Residential Address <span className="required">*</span></label>
            <textarea
              rows="3"
              value={address}
              onChange={function (e) { setAddress(e.target.value) }}
              placeholder="Enter complete residential address"
            />
          </div>

          <div className="form-group">
            <label>Reason for Modification Request <span className="required">*</span></label>
            <textarea
              rows="2"
              value={reason}
              onChange={function (e) { setReason(e.target.value) }}
              placeholder="e.g. Relocated to a new address / Corrected typo in contact number"
            />
            <span className="input-help">Please explain why these details are being updated. This helps administrators verify your request.</span>
          </div>

          <div className="form-buttons">
            <button type="submit" className="btn-primary">
              📤 Submit Request to Admin
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

export default StudentProfileRequest
