'use client';
import { useEffect, useState } from 'react';
import {
  BarChart, Bar, LineChart, Line,
  XAxis, YAxis, Tooltip, ResponsiveContainer
} from 'recharts';

export default function KPIPage() {
  const [data,setData]=useState<any>(null);

  useEffect(()=>{
    fetch('/api/kpi')
      .then(r=>r.json())
      .then(setData);
  },[]);

  if(!data) return <p>Loading KPIs…</p>;

  const coverage = ((data.totalSubmissions / data.expected) * 100).toFixed(1);

  return (
    <div className="p-4 space-y-6 bg-white min-h-screen">

      <h1 className="text-xl font-bold">
        Household Waste Source Segregation – KPI Dashboard
      </h1>

      {/* KPI CARDS */}
      <div className="grid grid-cols-2 gap-4">
        <Card title="Total Submissions" value={data.totalSubmissions} color="green"/>
        <Card title="Coverage %" value={`${coverage}%`} color="orange"/>
      </div>

      {/* TREND */}
      <Section title="Last 7 Days Trend">
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={data.trend}>
            <XAxis dataKey="day"/>
            <YAxis/>
            <Tooltip/>
            <Line type="monotone" dataKey="total" stroke="#10b981"/>
          </LineChart>
        </ResponsiveContainer>
      </Section>

      {/* USER PERFORMANCE */}
      <Section title="Field Worker Performance">
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={data.userStats}>
            <XAxis dataKey="username"/>
            <YAxis/>
            <Tooltip/>
            <Bar dataKey="submissions" fill="#22c55e"/>
          </BarChart>
        </ResponsiveContainer>
      </Section>

      {/* SEGREGATION */}
      <Section title="Segregation Status">
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={data.segregation}>
            <XAxis dataKey="status"/>
            <YAxis/>
            <Tooltip/>
            <Bar dataKey="total" fill="#16a34a"/>
          </BarChart>
        </ResponsiveContainer>
      </Section>

    </div>
  );
}

function Card({title,value,color}:any){
  return (
    <div className={`p-4 rounded shadow border-l-4 border-${color}-500`}>
      <p className="text-gray-500 text-sm">{title}</p>
      <p className="text-xl font-bold">{value}</p>
    </div>
  );
}

function Section({title,children}:any){
  return (
    <div className="bg-gray-50 p-4 rounded shadow">
      <h2 className="font-semibold mb-2">{title}</h2>
      {children}
    </div>
  );
}
