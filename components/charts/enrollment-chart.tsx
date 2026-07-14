'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { enrollmentData } from '@/lib/data';

export function EnrollmentChart() {
  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="mb-6">
        <h2 className="text-lg font-bold text-foreground mb-1">Enrollment Trend</h2>
        <p className="text-sm text-muted-foreground">New students per month</p>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={enrollmentData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#ede5d9" />
          <XAxis dataKey="month" stroke="#5d5d5d" />
          <YAxis stroke="#5d5d5d" />
          <Tooltip 
            contentStyle={{
              backgroundColor: '#ffffff',
              border: '1px solid #ede5d9',
              borderRadius: '8px',
            }}
            formatter={(value) => `${value} students`}
          />
          <Line 
            type="monotone" 
            dataKey="students" 
            stroke="#c9a961" 
            strokeWidth={2}
            dot={{ fill: '#c9a961', r: 5 }}
            activeDot={{ r: 7 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
