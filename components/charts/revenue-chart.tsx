'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface RevenueChartProps {
  data: { month: string; revenue: number }[];
}

export function RevenueChart({ data }: RevenueChartProps) {
  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="mb-6">
        <h2 className="text-lg font-bold text-foreground mb-1">Revenue Overview</h2>
        <p className="text-sm text-muted-foreground">Monthly revenue trends</p>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#ede5d9" />
          <XAxis dataKey="month" stroke="#5d5d5d" />
          <YAxis stroke="#5d5d5d" />
          <Tooltip
            contentStyle={{
              backgroundColor: '#ffffff',
              border: '1px solid #ede5d9',
              borderRadius: '8px',
            }}
            formatter={(value) => `${value} ETB`}
          />
          <Bar dataKey="revenue" fill="#d4a574" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
