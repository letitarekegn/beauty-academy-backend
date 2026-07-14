// Dashboard Overview Data
export const dashboardStats = {
  totalStudents: 245,
  totalRevenue: 1250000,
  totalEmployees: 18,
  graduatedThisMonth: 32,
  pendingPayments: 125000,
  totalGraduated: 892,
};

// Students Data
export const students = [
  { id: 1, name: 'Aisha Mohammed', phone: '+966-50-123-4567', email: 'aisha@example.com', batch: 'Winter 2025', status: 'active', enrollDate: '2025-01-15' },
  { id: 2, name: 'Fatima Al-Dosari', phone: '+966-50-234-5678', email: 'fatima@example.com', batch: 'Winter 2025', status: 'active', enrollDate: '2025-01-16' },
  { id: 3, name: 'Noor Al-Qahtani', phone: '+966-50-345-6789', email: 'noor@example.com', batch: 'Fall 2024', status: 'graduated', enrollDate: '2024-09-01' },
  { id: 4, name: 'Reem Al-Shehri', phone: '+966-50-456-7890', email: 'reem@example.com', batch: 'Winter 2025', status: 'active', enrollDate: '2025-01-17' },
  { id: 5, name: 'Sarah Al-Harbi', phone: '+966-50-567-8901', email: 'sarah@example.com', batch: 'Fall 2024', status: 'graduated', enrollDate: '2024-09-10' },
];

// Payments Data
export const payments = [
  { id: 1, studentName: 'Aisha Mohammed', amount: 15000, dueDate: '2025-02-15', status: 'paid', course: 'Professional Makeup' },
  { id: 2, studentName: 'Fatima Al-Dosari', amount: 15000, dueDate: '2025-02-16', status: 'pending', course: 'Skincare Specialist' },
  { id: 3, studentName: 'Reem Al-Shehri', amount: 15000, dueDate: '2025-02-17', status: 'overdue', course: 'Hair Styling' },
  { id: 4, studentName: 'Layla Al-Mutairi', amount: 10000, dueDate: '2025-01-30', status: 'paid', course: 'Beauty Business' },
  { id: 5, studentName: 'Maha Al-Rashid', amount: 15000, dueDate: '2025-03-01', status: 'pending', course: 'Advanced Makeup' },
];

// Graduation Data
export const graduations = [
  { id: 1, name: 'Noor Al-Qahtani', course: 'Professional Makeup', graduationDate: '2024-12-20', gpa: 3.8, certificateId: 'CERT-2024-001' },
  { id: 2, name: 'Sarah Al-Harbi', course: 'Skincare Specialist', graduationDate: '2024-12-21', gpa: 3.9, certificateId: 'CERT-2024-002' },
  { id: 3, name: 'Hana Al-Otaibi', course: 'Hair Styling', graduationDate: '2024-12-22', gpa: 3.7, certificateId: 'CERT-2024-003' },
  { id: 4, name: 'Dina Al-Hazza', course: 'Beauty Business', graduationDate: '2024-12-23', gpa: 3.85, certificateId: 'CERT-2024-004' },
];

// Employees Data
export const employees = [
  { id: 1, name: 'Ahmed Al-Qahtani', role: 'Makeup Instructor', department: 'Training', joinDate: '2023-01-15', salary: 5000 },
  { id: 2, name: 'Dr. Sara Al-Dosari', role: 'Skincare Specialist', department: 'Training', joinDate: '2023-03-20', salary: 5500 },
  { id: 3, name: 'Rayan Al-Shehri', role: 'Hair Styling Instructor', department: 'Training', joinDate: '2023-06-10', salary: 4800 },
  { id: 4, name: 'Mohammed Al-Harbi', role: 'Administrative Manager', department: 'Administration', joinDate: '2022-09-01', salary: 6000 },
  { id: 5, name: 'Yasmin Al-Mutairi', role: 'Financial Officer', department: 'Finance', joinDate: '2023-11-05', salary: 5200 },
];

// Salary Data
export const salaries = [
  { id: 1, employeeName: 'Ahmed Al-Qahtani', month: 'January 2025', amount: 5000, status: 'paid', paymentDate: '2025-02-01' },
  { id: 2, employeeName: 'Dr. Sara Al-Dosari', month: 'January 2025', amount: 5500, status: 'paid', paymentDate: '2025-02-01' },
  { id: 3, employeeName: 'Rayan Al-Shehri', month: 'January 2025', amount: 4800, status: 'pending', paymentDate: '' },
  { id: 4, employeeName: 'Mohammed Al-Harbi', month: 'January 2025', amount: 6000, status: 'paid', paymentDate: '2025-02-01' },
  { id: 5, employeeName: 'Yasmin Al-Mutairi', month: 'January 2025', amount: 5200, status: 'pending', paymentDate: '' },
];

// Revenue Data for Charts
export const revenueData = [
  { month: 'Jan', revenue: 145000 },
  { month: 'Feb', revenue: 162000 },
  { month: 'Mar', revenue: 158000 },
  { month: 'Apr', revenue: 175000 },
  { month: 'May', revenue: 182000 },
  { month: 'Jun', revenue: 195000 },
];

// Enrollment Data for Charts
export const enrollmentData = [
  { month: 'Jan', students: 32 },
  { month: 'Feb', students: 28 },
  { month: 'Mar', students: 35 },
  { month: 'Apr', students: 30 },
  { month: 'May', students: 42 },
  { month: 'Jun', students: 38 },
];

// Course Distribution
export const courseDistribution = [
  { name: 'Professional Makeup', value: 45, color: '#d4a574' },
  { name: 'Skincare Specialist', value: 38, color: '#c9a961' },
  { name: 'Hair Styling', value: 32, color: '#b8934d' },
  { name: 'Beauty Business', value: 28, color: '#a07d39' },
  { name: 'Advanced Makeup', value: 102, color: '#886725' },
];

// Activity Timeline
export const activityTimeline = [
  { id: 1, action: 'New student enrolled', actor: 'Aisha Mohammed', timestamp: '2025-02-01 14:30', icon: 'user-plus' },
  { id: 2, action: 'Payment received', actor: 'Fatima Al-Dosari', amount: '15,000 SAR', timestamp: '2025-02-01 12:15', icon: 'check-circle' },
  { id: 3, action: 'Certificate issued', actor: 'Noor Al-Qahtani', timestamp: '2025-01-31 10:00', icon: 'award' },
  { id: 4, action: 'Salary processed', actor: 'Ahmed Al-Qahtani', amount: '5,000 SAR', timestamp: '2025-02-01 08:00', icon: 'credit-card' },
  { id: 5, action: 'New employee added', actor: 'Rayan Al-Shehri', timestamp: '2025-01-30 16:45', icon: 'briefcase' },
];
