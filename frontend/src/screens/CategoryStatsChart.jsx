import React from 'react';
 import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';
 import styled from 'styled-components';
 
 const COLORS = [
   '#8884d8', '#82ca9d', '#ffc658', '#ff8042',
   '#ffbb28', '#00C49F', '#FF6699', '#3399FF',
 ];
 
 const ChartWrapper = styled.div`
   margin-bottom: 2rem;
 `;
 
 const ChartTitle = styled.h3`
   text-align: center;
   font-size: 1rem;
   margin-bottom: 0.5rem;
   color: white;
 `;
 
 const CategoryStatsChart = ({ title, data }) => {
   const hasData = data && Object.keys(data).length > 0;
 
   const defaultData = [
     { name: '예시1', value: 1 },
     { name: '예시2', value: 1 },
     { name: '예시3', value: 1 },
   ];
 
   const chartData = hasData
     ? Object.entries(data).map(([name, count]) => ({ name, value: count }))
     : defaultData;
 
   return (
     <ChartWrapper>
       <ChartTitle>{title}</ChartTitle>
       <ResponsiveContainer width="100%" height={250}>
         <PieChart>
           <Pie
             data={chartData}
             dataKey="value"
             nameKey="name"
             cx="50%"
             cy="50%"
             outerRadius={80}
             fill="#8884d8"
             label
           >
             {chartData.map((entry, index) => (
               <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
             ))}
           </Pie>
           <Tooltip />
           <Legend />
         </PieChart>
       </ResponsiveContainer>
     </ChartWrapper>
   );
 };
 
 export default CategoryStatsChart;