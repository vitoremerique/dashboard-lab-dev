import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, AreaChart, Area, ResponsiveContainer } from 'recharts';

function Sales() {
  const [salesData, setSalesData] = useState({
    barChartData: [
      { category: 'Arroz', vendas: 100 },
      { category: 'Macarrão', vendas: 70 },
      { category: 'Frango', vendas: 80 },
    ],
    pieChartData: [
      { name: 'Frios', vendas: 40 },
      { name: 'Limpeza', vendas: 35 },
      { name: 'Carnes', vendas: 25 },
    ],
    areaChartData: [
      { date: '2024-03-01', vendas: 250 },
      { date: '2024-04-01', vendas: 350 },
      { date: '2024-05-01', vendas: 3200 },
    ],
  });

  

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
      <div style={{ flex: 1 }}>
        <h2>Top 3 produtos mais vendidos</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={salesData.barChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="vendas" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div style={{ flex: 1 }}>
        <h2>Top 3 categorias mais vendidas</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={salesData.pieChartData} dataKey="vendas" nameKey="name" fill="#2196f3" label />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div style={{ flex: 1 }}>
        <h2>Vendas mensais</h2>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={salesData.areaChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="vendas" fill="#82ca9d" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Sales;

