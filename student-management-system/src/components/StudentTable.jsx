// src/components/StudentTable.jsx
// Displays students in a table with search, filter, and sort

import { useState } from 'react'

function StudentTable({ students, onViewStudent, onEditStudent, onDeleteStudent }) {

  // State for search, filter, sort
  var [searchTerm, setSearchTerm] = useState('')
  var [filterDepartment, setFilterDepartment] = useState('All')
  var [filterYear, setFilterYear] = useState('All')
  var [sortOrder, setSortOrder] = useState('default')

  // ---------- SEARCH ----------
  // Filter students whose name or ID includes the search text (case-insensitive)
  var filteredStudents = students.filter(function (student) {
    var lowerSearch = searchTerm.toLowerCase()
    var matchesSearch = student.fullName.toLowerCase().includes(lowerSearch)
      || student.id.toLowerCase().includes(lowerSearch)
    return matchesSearch
  })

  // ---------- FILTER BY DEPARTMENT ----------
  if (filterDepartment !== 'All') {
    filteredStudents = filteredStudents.filter(function (student) {
      return student.department === filterDepartment
    })
  }

  // ---------- FILTER BY YEAR ----------
  if (filterYear !== 'All') {
    filteredStudents = filteredStudents.filter(function (student) {
      return student.year === filterYear
    })
  }

  // ---------- SORT ----------
  if (sortOrder === 'a-z') {
    filteredStudents = filteredStudents.slice().sort(function (a, b) {
      return a.fullName.localeCompare(b.fullName)
    })
  } else if (sortOrder === 'z-a') {
    filteredStudents = filteredStudents.slice().sort(function (a, b) {
      return b.fullName.localeCompare(a.fullName)
    })
  }

  // Confirm before deleting
  function handleDelete(student) {
    var confirmed = window.confirm('Are you sure you want to delete ' + student.fullName + '?')
    if (confirmed) {
      onDeleteStudent(student.id)
    }
  }

  // Short department label
  function getShortDept(dept) {
    if (dept === 'Computer Science') return 'CS'
    if (dept === 'Electrical Engineering') return 'EE'
    if (dept === 'Mechanical Engineering') return 'ME'
    if (dept === 'Civil Engineering') return 'CE'
    if (dept === 'Business Administration') return 'BA'
    return dept
  }

  return (
    <div className="students-page">
      <div className="page-header">
        <h1>Student Directory</h1>
        <p>View, search, and manage all enrolled students</p>
      </div>

      {/* Controls: Search, Filter, Sort */}
      <div className="table-controls">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search by name or ID..."
            value={searchTerm}
            onChange={function (e) { setSearchTerm(e.target.value) }}
          />
        </div>

        <div className="filter-group">
          <select
            value={filterDepartment}
            onChange={function (e) { setFilterDepartment(e.target.value) }}
          >
            <option value="All">All Departments</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Electrical Engineering">Electrical Engineering</option>
            <option value="Mechanical Engineering">Mechanical Engineering</option>
            <option value="Civil Engineering">Civil Engineering</option>
            <option value="Business Administration">Business Administration</option>
          </select>

          <select
            value={filterYear}
            onChange={function (e) { setFilterYear(e.target.value) }}
          >
            <option value="All">All Years</option>
            <option value="1st Year">1st Year</option>
            <option value="2nd Year">2nd Year</option>
            <option value="3rd Year">3rd Year</option>
            <option value="4th Year">4th Year</option>
          </select>

          <select
            value={sortOrder}
            onChange={function (e) { setSortOrder(e.target.value) }}
          >
            <option value="default">Sort: Default</option>
            <option value="a-z">Name: A → Z</option>
            <option value="z-a">Name: Z → A</option>
          </select>
        </div>
      </div>

      {/* Results count */}
      <div className="results-info">
        Showing <strong>{filteredStudents.length}</strong> of <strong>{students.length}</strong> students
      </div>

      {/* Student Table */}
      <div className="student-table-wrapper">
        <table className="student-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Year</th>
              <th>Gender</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.length === 0 && (
              <tr>
                <td colSpan="7" className="no-results">
                  No students found matching your criteria.
                </td>
              </tr>
            )}
            {filteredStudents.map(function (student) {
              return (
                <tr key={student.id}>
                  <td><span className="id-badge">{student.id}</span></td>
                  <td className="name-cell">{student.fullName}</td>
                  <td className="email-cell">{student.email}</td>
                  <td><span className="dept-badge">{getShortDept(student.department)}</span></td>
                  <td>{student.year}</td>
                  <td>
                    <span className={'gender-badge ' + (student.gender === 'Male' ? 'gender-male' : 'gender-female')}>
                      {student.gender}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button className="btn-action btn-view" onClick={function () { onViewStudent(student) }}>
                        View
                      </button>
                      <button className="btn-action btn-edit" onClick={function () { onEditStudent(student) }}>
                        Edit
                      </button>
                      <button className="btn-action btn-delete" onClick={function () { handleDelete(student) }}>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default StudentTable
