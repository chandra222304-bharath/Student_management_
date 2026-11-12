// src/components/StudentForm.jsx
// Handles both adding a new student and editing an existing student

import { useState } from 'react'

function StudentForm({ students, onAddStudent, onUpdateStudent, editingStudent, setActiveTab }) {

  // Decide whether we are in "edit mode" or "add mode"
  var isEditing = editingStudent !== null

  // If editing, pre-fill the form with the student's data.
  // If adding, start with empty fields.
  var [fullName, setFullName] = useState(isEditing ? editingStudent.fullName : '')
  var [email, setEmail] = useState(isEditing ? editingStudent.email : '')
  var [phone, setPhone] = useState(isEditing ? editingStudent.phone : '')
  var [gender, setGender] = useState(isEditing ? editingStudent.gender : '')
  var [dateOfBirth, setDateOfBirth] = useState(isEditing ? editingStudent.dateOfBirth : '')
  var [department, setDepartment] = useState(isEditing ? editingStudent.department : '')
  var [year, setYear] = useState(isEditing ? editingStudent.year : '')
  var [address, setAddress] = useState(isEditing ? editingStudent.address : '')
  var [enrollmentDate, setEnrollmentDate] = useState(isEditing ? editingStudent.enrollmentDate : '')

  // Object to hold error messages for each field
  var [errors, setErrors] = useState({})

  // Show a success message after successful submission
  var [successMessage, setSuccessMessage] = useState('')

  // ---------- AUTO-GENERATE STUDENT ID ----------
  function generateNewId() {
    if (students.length === 0) {
      return 'STU-001'
    }
    // Find the highest existing numeric part
    var maxNum = 0
    for (var i = 0; i < students.length; i++) {
      var parts = students[i].id.split('-')
      var num = parseInt(parts[1], 10)
      if (num > maxNum) {
        maxNum = num
      }
    }
    var nextNum = maxNum + 1
    // Pad to 3 digits: 1 -> "001", 12 -> "012"
    var padded = String(nextNum)
    while (padded.length < 3) {
      padded = '0' + padded
    }
    return 'STU-' + padded
  }

  // ---------- FORM VALIDATION ----------
  function validateForm() {
    var newErrors = {}

    // Full Name: required
    if (fullName.trim() === '') {
      newErrors.fullName = 'Full name is required'
    }

    // Email: required and must contain @ and .
    if (email.trim() === '') {
      newErrors.email = 'Email is required'
    } else if (email.indexOf('@') === -1 || email.indexOf('.') === -1) {
      newErrors.email = 'Please enter a valid email address'
    }

    // Phone: required and must be 10 digits
    if (phone.trim() === '') {
      newErrors.phone = 'Phone number is required'
    } else if (!/^\d{10}$/.test(phone.trim())) {
      newErrors.phone = 'Phone number must be exactly 10 digits'
    }

    // Gender: required
    if (gender === '') {
      newErrors.gender = 'Please select a gender'
    }

    // Date of Birth: required
    if (dateOfBirth === '') {
      newErrors.dateOfBirth = 'Date of birth is required'
    }

    // Department: required
    if (department === '') {
      newErrors.department = 'Please select a department'
    }

    // Year: required
    if (year === '') {
      newErrors.year = 'Please select a year of study'
    }

    // Address: required
    if (address.trim() === '') {
      newErrors.address = 'Address is required'
    }

    // Enrollment Date: required
    if (enrollmentDate === '') {
      newErrors.enrollmentDate = 'Enrollment date is required'
    }

    // Check for duplicate email (but skip the current student when editing)
    if (email.trim() !== '') {
      var duplicateEmail = students.find(function (s) {
        if (isEditing && s.id === editingStudent.id) return false
        return s.email.toLowerCase() === email.trim().toLowerCase()
      })
      if (duplicateEmail) {
        newErrors.email = 'A student with this email already exists'
      }
    }

    setErrors(newErrors)

    // If there are no keys in newErrors, the form is valid
    return Object.keys(newErrors).length === 0
  }

  // ---------- HANDLE FORM SUBMIT ----------
  function handleSubmit(e) {
    e.preventDefault() // Prevent the browser from reloading the page

    if (!validateForm()) {
      return // Stop if validation fails
    }

    if (isEditing) {
      // Update existing student — keep the same ID
      var updatedStudent = {
        id: editingStudent.id,
        fullName: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        gender: gender,
        dateOfBirth: dateOfBirth,
        department: department,
        year: year,
        address: address.trim(),
        enrollmentDate: enrollmentDate
      }
      onUpdateStudent(updatedStudent)
      setSuccessMessage('Student record updated successfully!')
    } else {
      // Create a new student
      var newStudent = {
        id: generateNewId(),
        fullName: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        gender: gender,
        dateOfBirth: dateOfBirth,
        department: department,
        year: year,
        address: address.trim(),
        enrollmentDate: enrollmentDate
      }
      onAddStudent(newStudent)
      setSuccessMessage('Student "' + fullName.trim() + '" added successfully!')

      // Clear the form after adding
      setFullName('')
      setEmail('')
      setPhone('')
      setGender('')
      setDateOfBirth('')
      setDepartment('')
      setYear('')
      setAddress('')
      setEnrollmentDate('')
    }

    setErrors({})

    // Auto-clear success message after 4 seconds
    setTimeout(function () {
      setSuccessMessage('')
    }, 4000)
  }

  // ---------- CANCEL EDITING ----------
  function handleCancel() {
    setActiveTab('students')
  }

  return (
    <div className="form-page">
      <div className="page-header">
        <h1>{isEditing ? 'Edit Student Record' : 'Register New Student'}</h1>
        <p>{isEditing ? 'Update the student information below' : 'Fill in the details to enroll a new student'}</p>
      </div>

      {/* Success Message */}
      {successMessage !== '' && (
        <div className="alert alert-success">{successMessage}</div>
      )}

      <div className="form-card">
        <form onSubmit={handleSubmit}>

          {/* If editing, show the Student ID (read-only) */}
          {isEditing && (
            <div className="form-group">
              <label>Student ID</label>
              <input type="text" value={editingStudent.id} disabled className="input-disabled" />
            </div>
          )}

          {/* Row 1: Full Name + Email */}
          <div className="form-row">
            <div className="form-group">
              <label>Full Name <span className="required">*</span></label>
              <input
                type="text"
                placeholder="e.g. Aarav Sharma"
                value={fullName}
                onChange={function (e) { setFullName(e.target.value) }}
              />
              {errors.fullName && <span className="error-text">{errors.fullName}</span>}
            </div>
            <div className="form-group">
              <label>Email Address <span className="required">*</span></label>
              <input
                type="text"
                placeholder="e.g. aarav@college.edu"
                value={email}
                onChange={function (e) { setEmail(e.target.value) }}
              />
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>
          </div>

          {/* Row 2: Phone + Gender */}
          <div className="form-row">
            <div className="form-group">
              <label>Phone Number <span className="required">*</span></label>
              <input
                type="text"
                placeholder="e.g. 9876543210"
                value={phone}
                onChange={function (e) { setPhone(e.target.value) }}
              />
              {errors.phone && <span className="error-text">{errors.phone}</span>}
            </div>
            <div className="form-group">
              <label>Gender <span className="required">*</span></label>
              <select value={gender} onChange={function (e) { setGender(e.target.value) }}>
                <option value="">-- Select Gender --</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              {errors.gender && <span className="error-text">{errors.gender}</span>}
            </div>
          </div>

          {/* Row 3: Date of Birth + Department */}
          <div className="form-row">
            <div className="form-group">
              <label>Date of Birth <span className="required">*</span></label>
              <input
                type="date"
                value={dateOfBirth}
                onChange={function (e) { setDateOfBirth(e.target.value) }}
              />
              {errors.dateOfBirth && <span className="error-text">{errors.dateOfBirth}</span>}
            </div>
            <div className="form-group">
              <label>Department <span className="required">*</span></label>
              <select value={department} onChange={function (e) { setDepartment(e.target.value) }}>
                <option value="">-- Select Department --</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Electrical Engineering">Electrical Engineering</option>
                <option value="Mechanical Engineering">Mechanical Engineering</option>
                <option value="Civil Engineering">Civil Engineering</option>
                <option value="Business Administration">Business Administration</option>
              </select>
              {errors.department && <span className="error-text">{errors.department}</span>}
            </div>
          </div>

          {/* Row 4: Year + Enrollment Date */}
          <div className="form-row">
            <div className="form-group">
              <label>Year of Study <span className="required">*</span></label>
              <select value={year} onChange={function (e) { setYear(e.target.value) }}>
                <option value="">-- Select Year --</option>
                <option value="1st Year">1st Year</option>
                <option value="2nd Year">2nd Year</option>
                <option value="3rd Year">3rd Year</option>
                <option value="4th Year">4th Year</option>
              </select>
              {errors.year && <span className="error-text">{errors.year}</span>}
            </div>
            <div className="form-group">
              <label>Enrollment Date <span className="required">*</span></label>
              <input
                type="date"
                value={enrollmentDate}
                onChange={function (e) { setEnrollmentDate(e.target.value) }}
              />
              {errors.enrollmentDate && <span className="error-text">{errors.enrollmentDate}</span>}
            </div>
          </div>

          {/* Row 5: Address (full width) */}
          <div className="form-group">
            <label>Address <span className="required">*</span></label>
            <textarea
              placeholder="e.g. 42 MG Road, Bengaluru, Karnataka"
              value={address}
              onChange={function (e) { setAddress(e.target.value) }}
              rows="3"
            ></textarea>
            {errors.address && <span className="error-text">{errors.address}</span>}
          </div>

          {/* Buttons */}
          <div className="form-buttons">
            <button type="submit" className="btn-primary">
              {isEditing ? '💾 Update Student' : '➕ Add Student'}
            </button>
            {isEditing && (
              <button type="button" className="btn-secondary" onClick={handleCancel}>
                Cancel
              </button>
            )}
          </div>

        </form>
      </div>
    </div>
  )
}

export default StudentForm
