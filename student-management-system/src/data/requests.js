// src/data/requests.js
// Sample initial profile modification requests and support tickets

export var sampleProfileRequests = [
  {
    id: 'REQ-4821',
    studentId: 'STU-001',
    studentName: 'Aarav Sharma',
    email: 'aarav.sharma@college.edu',
    requestDate: '2026-11-10',
    reason: 'Updated contact number and residential address after relocation.',
    status: 'pending',
    adminComment: '',
    originalData: {
      fullName: 'Aarav Sharma',
      phone: '9876543210',
      address: '42 MG Road, Bengaluru, Karnataka',
      department: 'Computer Science',
      year: '3rd Year'
    },
    requestedData: {
      fullName: 'Aarav Sharma',
      phone: '9811223344',
      address: '88 Indiranagar 100ft Road, Bengaluru, Karnataka',
      department: 'Computer Science',
      year: '3rd Year'
    }
  },
  {
    id: 'REQ-3190',
    studentId: 'STU-002',
    studentName: 'Priya Patel',
    email: 'priya.patel@college.edu',
    requestDate: '2026-11-08',
    reason: 'Corrected typo in full name for academic mark sheets.',
    status: 'approved',
    adminComment: 'Verified with official government identity proof. Updated.',
    originalData: {
      fullName: 'Priya K. Patel',
      phone: '9876543211',
      address: '15 Park Street, Mumbai, Maharashtra',
      department: 'Electrical Engineering',
      year: '2nd Year'
    },
    requestedData: {
      fullName: 'Priya Patel',
      phone: '9876543211',
      address: '15 Park Street, Mumbai, Maharashtra',
      department: 'Electrical Engineering',
      year: '2nd Year'
    }
  }
]

export var sampleTickets = [
  {
    id: 'TCK-7120',
    studentId: 'STU-001',
    studentName: 'Aarav Sharma',
    department: 'Computer Science',
    date: '2026-11-11',
    category: 'Hostel & Transport',
    priority: 'Medium',
    subject: 'Hostel Block-B Wi-Fi router connectivity drop',
    description: 'The Wi-Fi router on the 2nd floor of Hostel Block-B has frequent disconnection issues during evening study hours.',
    status: 'open',
    adminReply: ''
  },
  {
    id: 'TCK-5541',
    studentId: 'STU-003',
    studentName: 'Rohan Gupta',
    department: 'Mechanical Engineering',
    date: '2026-11-09',
    category: 'Library',
    priority: 'Low',
    subject: 'Request extension on borrowed thermodynamics textbook',
    description: 'Need one week extension for the core reference textbook due to upcoming midterm evaluations.',
    status: 'resolved',
    adminReply: 'Extension granted until next Monday. Please return books promptly thereafter.'
  }
]
