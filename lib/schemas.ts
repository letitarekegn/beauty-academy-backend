import { z } from 'zod';

export const studentSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  batch: z.string().min(1, 'Please select a batch'),
  course: z.string().min(1, 'Please select a course'),
});

export type StudentFormData = z.infer<typeof studentSchema>;

export const employeeSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  role: z.string().min(2, 'Role must be at least 2 characters'),
  department: z.string().min(1, 'Please select a department'),
  salary: z.string().regex(/^\d+$/, 'Salary must be a number'),
});

export type EmployeeFormData = z.infer<typeof employeeSchema>;

export const paymentSchema = z.object({
  studentName: z.string().min(1, 'Please select a student'),
  amount: z.string().regex(/^\d+$/, 'Amount must be a number'),
  dueDate: z.string().min(1, 'Please select a due date'),
  course: z.string().min(1, 'Please select a course'),
});

export type PaymentFormData = z.infer<typeof paymentSchema>;
