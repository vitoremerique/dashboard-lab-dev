import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, AreaChart, Area, ResponsiveContainer } from 'recharts';
import axios from 'axios';

function Sales() {
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://91da-179-124-25-9.ngrok-free.app/api/sales');
        const salesInventories = response.data;

        // Mapear os dados para os formatos necessários para cada gráfico
        const barChartData = [];
        const pieChartData = [];
        const areaChartData = [];

        salesInventories.forEach(sale => {
          sale.products.forEach(product => {
            const categoryName = product.product.category.name;
            const quantitySold = product.quantity;

            // Atualizar dados do gráfico de barras por categoria
            const existingBarData = barChartData.find(item => item.categoria === categoryName);
            if (existingBarData) {
              existingBarData.vendas += quantitySold;
            } else {
              barChartData.push({ categoria: categoryName, vendas: quantitySold });
            }

            // Atualizar dados do gráfico de pizza por categoria
            const existingPieData = pieChartData.find(item => item.name === categoryName);
            if (existingPieData) {
              existingPieData.vendas += quantitySold;
            } else {
              pieChartData.push({ name: categoryName, vendas: quantitySold });
            }

            // Atualizar dados do gráfico de área
            const saleDate = new Date(sale.datetime);
            const areaDate = `${saleDate.getFullYear()}-${saleDate.getMonth() + 1}-01`;
            const existingAreaData = areaChartData.find(item => item.date === areaDate);
            if (existingAreaData) {
              existingAreaData.vendas += quantitySold;
            } else {
              areaChartData.push({ date: areaDate, vendas: quantitySold });
            }
          });
        });

        setSalesData({ barChartData, pieChartData, areaChartData });
      } catch (error) {
        console.error('Erro ao obter dados da API:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
      <div style={{ flex: 1 }}>
        <h2>Gráfico de Barras por categoria</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={salesData.barChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="categoria" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="vendas" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div style={{ flex: 1 }}>
        <h2>Gráfico de Pizza por categoria</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={salesData.pieChartData} dataKey="vendas" nameKey="name" fill="#2196f3" label />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div style={{ flex: 1 }}>
        <h2>Gráfico de Área </h2>
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
