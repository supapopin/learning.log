/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from 'recharts';
import { Award, CheckCircle, Calendar, BookOpen, Clock, Activity, BarChart2 } from 'lucide-react';
import { TodayCheckItem } from '../types';

const CustomXAxisTick = (props: any) => {
  const { x, y, payload } = props;
  return (
    <text
      x={x}
      y={y + 12}
      textAnchor="middle"
      fill="#000000"
      style={{ fill: '#000000', color: '#000000' }}
      fontSize={12}
      fontWeight="bold"
    >
      {payload.value}
    </text>
  );
};

interface WeeklyReportTabProps {
  items: TodayCheckItem[];
}

export default function WeeklyReportTab({ items }: WeeklyReportTabProps) {
  // We can choose to filter the report by a specific week.
  // Let's group all items by "Week of Date" or calculate weeks dynamically.
  // A week can be identified by the Monday of its calendar week.
  
  const weeklyGroups = useMemo(() => {
    const groups: { [key: string]: TodayCheckItem[] } = {};
    
    items.forEach(item => {
      if (!item.date) return;
      
      // Parse the date string strictly in UTC to avoid local timezone skews (e.g. US vs Korea)
      const parts = item.date.split('-');
      const year = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const day = parseInt(parts[2], 10);
      
      const dateObj = new Date(Date.UTC(year, month, day));
      const utcDay = dateObj.getUTCDay();
      
      // Calculate Monday of the week (0 is Sunday, 1 is Monday, etc.)
      const diff = (utcDay === 0) ? -6 : (1 - utcDay);
      const monday = new Date(Date.UTC(year, month, day + diff));
      const weekKey = monday.toISOString().split('T')[0];
      
      if (!groups[weekKey]) {
        groups[weekKey] = [];
      }
      groups[weekKey].push(item);
    });
    
    return groups;
  }, [items]);

  // Determine current calendar week YYYY-MM-DD (Monday starts the week)
  const currentWeekKey = useMemo(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const date = today.getDate();
    
    const localToday = new Date(year, month, date);
    const day = localToday.getDay(); // 0 is Sunday, 1 is Monday, etc.
    const diff = (day === 0) ? -6 : (1 - day);
    const monday = new Date(year, month, date + diff);
    
    const y = monday.getFullYear();
    const m = String(monday.getMonth() + 1).padStart(2, '0');
    const d = String(monday.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }, []);

  const [selectedWeek, setSelectedWeek] = useState<string>(() => {
    return currentWeekKey;
  });

  const weekKeys = useMemo(() => {
    const keysSet = new Set(Object.keys(weeklyGroups));
    keysSet.add(currentWeekKey); // Ensure the current calendar week is always present and selectable
    return Array.from(keysSet).sort((a, b) => b.localeCompare(a));
  }, [weeklyGroups, currentWeekKey]);

  // Ensure selectedWeek stays synchronized if weekKeys changes or becomes empty/invalid
  useEffect(() => {
    if (weekKeys.length > 0) {
      if (!weekKeys.includes(selectedWeek)) {
        if (weekKeys.includes(currentWeekKey)) {
          setSelectedWeek(currentWeekKey);
        } else {
          setSelectedWeek(weekKeys[0]);
        }
      }
    } else {
      setSelectedWeek('all');
    }
  }, [weekKeys, selectedWeek, currentWeekKey]);

  // Filter items based on selected week
  const filteredItems = useMemo(() => {
    if (selectedWeek === 'all') {
      return items;
    }
    return weeklyGroups[selectedWeek] || [];
  }, [items, selectedWeek, weeklyGroups]);

  // Calculations for selected dataset
  const stats = useMemo(() => {
    const total = filteredItems.length;
    const completed = filteredItems.filter(item => item.is_completed).length;
    const rate = total > 0 ? Math.round((completed / total) * 100) : 0;
    
    return { total, completed, rate };
  }, [filteredItems]);

  // 1. 요일별 달성률 (Day of Week)
  const dayOfWeekData = useMemo(() => {
    const daysOrder = ['월요일', '화요일', '수요일', '목요일', '금요일', '토요일', '일요일'];
    const groups: { [key: string]: { total: number; completed: number } } = {};
    
    daysOrder.forEach(day => {
      groups[day] = { total: 0, completed: 0 };
    });

    filteredItems.forEach(item => {
      if (groups[item.day_of_week]) {
        groups[item.day_of_week].total += 1;
        if (item.is_completed) {
          groups[item.day_of_week].completed += 1;
        }
      }
    });

    return daysOrder.map(day => {
      const g = groups[day];
      const rate = g.total > 0 ? Math.round((g.completed / g.total) * 100) : 0;
      return {
        name: day.substring(0, 1), // (e.g. 월요일 -> 월)
        fullName: day,
        rate: rate,
        total: g.total,
        completed: g.completed,
      };
    });
  }, [filteredItems]);

  // 2. 과목별 달성률 (Category)
  const categoryData = useMemo(() => {
    const groups: { [key: string]: { total: number; completed: number } } = {};
    
    filteredItems.forEach(item => {
      const cat = item.category || '기타';
      if (!groups[cat]) {
        groups[cat] = { total: 0, completed: 0 };
      }
      groups[cat].total += 1;
      if (item.is_completed) {
          groups[cat].completed += 1;
      }
    });

    return Object.keys(groups).map(cat => {
      const g = groups[cat];
      const rate = g.total > 0 ? Math.round((g.completed / g.total) * 100) : 0;
      return {
        name: cat,
        rate: rate,
        total: g.total,
        completed: g.completed
      };
    }).sort((a, b) => b.rate - a.rate);
  }, [filteredItems]);

  // 3. 일비 상세 달성률 (Date Details)
  const dailyDetailData = useMemo(() => {
    const groups: { [key: string]: { total: number; completed: number; dayName: string } } = {};

    filteredItems.forEach(item => {
      const date = item.date;
      if (!groups[date]) {
        groups[date] = { total: 0, completed: 0, dayName: item.day_of_week };
      }
      groups[date].total += 1;
      if (item.is_completed) {
        groups[date].completed += 1;
      }
    });

    return Object.keys(groups).map(date => {
      const g = groups[date];
      const rate = g.total > 0 ? Math.round((g.completed / g.total) * 100) : 0;
      const formattedDate = date.substring(5); // MM-DD
      return {
        dateStr: date,
        name: `${formattedDate} (${g.dayName.substring(0,1)})`,
        rate: rate,
        total: g.total,
        completed: g.completed
      };
    }).sort((a, b) => a.dateStr.localeCompare(b.dateStr));
  }, [filteredItems]);

  // Week range formatting helper
  const getWeekRangeLabel = (mondayStr: string) => {
    if (mondayStr === 'all') return '전체 데이터 합산';
    const monday = new Date(mondayStr);
    const sunday = new Date(mondayStr);
    sunday.setDate(monday.getDate() + 6);
    
    const format = (d: Date) => `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
    return `${format(monday)} ~ ${format(sunday)}`;
  };

  const COLORS = {
    primary: '#4f46e5', // indigo-600
    success: '#10b981', // emerald-500
    violet: '#8b5cf6', // violet-500
    rose: '#f43f5e', // rose-500
    blue: '#0ea5e9', // sky-500
    lightGray: '#f3f4f6'
  };

  return (
    <div className="space-y-6">
      {/* Top filter select */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4 md:p-5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <BarChart2 className="w-5 h-5 text-indigo-600" />
            주간 분석 리포트
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">
            오늘 체크 완료여부를 분석하여 실시간 대시보드를 제공합니다.
          </p>
        </div>

        <div className="flex items-center gap-2 text-sm font-semibold">
          <span className="text-gray-500 shrink-0">분석 주차:</span>
          <select
            value={selectedWeek}
            onChange={(e) => setSelectedWeek(e.target.value)}
            className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-gray-700 font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500/15"
          >
            <option value="all">전체 일정 보기</option>
            {weekKeys.map(key => (
              <option key={key} value={key}>
                {getWeekRangeLabel(key)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="bg-gray-50 rounded-2xl p-12 text-center border-2 border-dashed border-gray-200 flex flex-col items-center justify-center">
          <Activity className="w-10 h-10 text-gray-300 mb-3" />
          <h4 className="font-bold text-gray-600 text-sm">분석할 리포트 데이터가 수집되지 않았습니다.</h4>
          <p className="text-gray-400 text-xs mt-1">
            "오늘 체크"에 공부 일정을 등록하고, 완료 여부를 체크해야 통계 대시보드가 그려집니다.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* 1. 주간 전체 달성률 radial ringcard (3 cols) */}
          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm md:col-span-4 flex flex-col justify-between">
            <div className="space-y-1">
              <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider block">
                전체 진행 피드백
              </span>
              <h3 className="text-base font-bold text-gray-900">주간 전체 달성률</h3>
            </div>

            {/* Circular Achievement Dial */}
            <div className="my-6 flex flex-col items-center justify-center relative">
              <div className="relative w-36 h-36 flex items-center justify-center">
                {/* SVG Radial Wheel */}
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="72"
                    cy="72"
                    r="60"
                    stroke="#f1f5f9"
                    strokeWidth="12"
                    fill="transparent"
                  />
                  <circle
                    cx="72"
                    cy="72"
                    r="60"
                    stroke={stats.rate >= 80 ? COLORS.success : stats.rate >= 50 ? COLORS.primary : COLORS.rose}
                    strokeWidth="12"
                    fill="transparent"
                    strokeDasharray={2 * Math.PI * 60}
                    strokeDashoffset={2 * Math.PI * 60 * (1 - stats.rate / 100)}
                    strokeLinecap="round"
                    className="transition-all duration-500 ease-out"
                  />
                </svg>
                <div className="absolute flex flex-col items-center justify-center text-center">
                  <span className={`text-3xl font-extrabold tracking-tight ${
                    stats.rate >= 80 ? 'text-emerald-500' : stats.rate >= 50 ? 'text-indigo-600' : 'text-rose-500'
                  }`}>
                    {stats.rate}%
                  </span>
                  <span className="text-[10px] text-gray-450 font-medium">완료성공</span>
                </div>
              </div>
            </div>

            {/* Breakdown text */}
            <div className="p-3 bg-gray-50 rounded-xl space-y-2 text-xs">
              <div className="flex justify-between items-center text-gray-600">
                <span className="flex items-center gap-1">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  계획된 일정수
                </span>
                <span className="font-bold text-gray-900">{stats.total}개</span>
              </div>
              <div className="flex justify-between items-center text-gray-600">
                <span className="flex items-center gap-1">
                  <Award className="w-4 h-4 text-amber-500" />
                  실제 달성수
                </span>
                <span className="font-bold text-gray-900 text-indigo-600">{stats.completed}개</span>
              </div>
              <div className="h-px bg-gray-200/60 my-1" />
              <p className="text-[11px] text-gray-500 leading-relaxed text-center font-medium">
                {stats.rate >= 80 
                  ? "🎉 완벽에 가까운 습관 달성도입니다! 페이스를 유지해 보세요." 
                  : stats.rate >= 50 
                  ? "👍 체계적으로 잘 가고 있습니다! 조금만 더 채워보세요." 
                  : "💡 오늘 체크를 켜서 작은 목표부터 밀도 높게 실천해 봅시다!"}
              </p>
            </div>
          </div>

          {/* 2. 요일별 달성률 세로 그래프 (8 cols) */}
          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm md:col-span-8 flex flex-col justify-between">
            <div className="space-y-1">
              <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider block">
                요일별 패턴 분석
              </span>
              <h3 className="text-base font-bold text-gray-900">요일별 달성률</h3>
            </div>

            <div className="h-64 mt-6">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dayOfWeekData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                  <XAxis 
                    dataKey="name" 
                    tickLine={false} 
                    axisLine={false} 
                    interval={0}
                    tick={<CustomXAxisTick />}
                  />
                  <YAxis 
                    domain={[0, 100]} 
                    tickSize={5} 
                    axisLine={false} 
                    tickLine={false}
                    tick={{ fill: '#000000', fontSize: 11, fontWeight: 'bold' }}
                  />
                  <Tooltip
                    cursor={{ fill: 'rgba(79, 70, 229, 0.03)' }}
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="bg-slate-900/95 text-white p-3 rounded-xl shadow-lg border border-slate-800 text-xs space-y-1">
                            <p className="font-bold">{data.fullName}</p>
                            <p className="text-indigo-300">달성률: {data.rate}%</p>
                            <p className="text-gray-400">완료: {data.completed} / 전체: {data.total}</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar dataKey="rate" radius={[6, 6, 0, 0]} maxBarSize={32}>
                    {dayOfWeekData.map((entry, index) => {
                      // Color based on completion rate
                      const color = entry.total === 0 
                        ? '#e5e7eb' 
                        : entry.rate >= 85 
                        ? COLORS.success 
                        : entry.rate >= 40 
                        ? COLORS.primary 
                        : COLORS.rose;
                      return <Cell key={`cell-${index}`} fill={color} />;
                    })}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 3. 과목별 달성률 가로 그래프 (6 cols) */}
          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm md:col-span-6 flex flex-col justify-between">
            <div className="space-y-1">
              <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider block">
                전공/과목별 경쟁력
              </span>
              <h3 className="text-base font-bold text-gray-900">과목별 달성률</h3>
            </div>

            {categoryData.length === 0 ? (
              <div className="py-12 text-center text-gray-450 text-xs">일정이 등록되지 않았습니다.</div>
            ) : (
              <div className="h-64 mt-6">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    layout="vertical"
                    data={categoryData}
                    margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f3f4f6" />
                    <XAxis type="number" domain={[0, 100]} tickLine={false} axisLine={false} tick={{ fill: '#9ca3af', fontSize: 10 }} />
                    <YAxis
                      type="category"
                      dataKey="name"
                      tickLine={false}
                      axisLine={false}
                      tick={{ fill: '#374151', fontSize: 11, fontWeight: 'bold' }}
                      width={65}
                    />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="bg-slate-900/95 text-white p-3 rounded-xl shadow border border-slate-800 text-xs">
                              <p className="font-bold">{data.name}</p>
                              <p className="text-indigo-300 font-medium">달성률: {data.rate}%</p>
                              <p className="text-gray-400 text-[10px]">완료: {data.completed} / 계획: {data.total}</p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar dataKey="rate" radius={[0, 6, 6, 0]} maxBarSize={18}>
                      {categoryData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={index === 0 ? COLORS.violet : index === 1 ? COLORS.blue : COLORS.primary} 
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>

          {/* 4. 일별 상세 달성률 % 가로 그래프 (6 cols) */}
          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm md:col-span-6 flex flex-col justify-between">
            <div className="space-y-1">
              <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider block">
                일별 성취 디테일
              </span>
              <h3 className="text-base font-bold text-gray-900">일별 상세 달성률</h3>
            </div>

            {dailyDetailData.length === 0 ? (
              <div className="py-12 text-center text-gray-450 text-xs">일정이 등록되지 않았습니다.</div>
            ) : (
              <div className="h-64 mt-6">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    layout="vertical"
                    data={dailyDetailData}
                    margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f3f4f6" />
                    <XAxis type="number" domain={[0, 100]} tickLine={false} axisLine={false} tick={{ fill: '#9ca3af', fontSize: 10 }} />
                    <YAxis
                      type="category"
                      dataKey="name"
                      tickLine={false}
                      axisLine={false}
                      tick={{ fill: '#374151', fontSize: 11, fontWeight: 'medium' }}
                      width={70}
                    />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="bg-slate-900/95 text-white p-3 rounded-xl shadow border border-slate-800 text-xs">
                              <p className="font-bold">{data.dateStr}</p>
                              <p className="text-indigo-300 font-medium font-mono">성취도: {data.rate}%</p>
                              <p className="text-gray-400 text-[10px]">달성 교시수: {data.completed} / {data.total}개</p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar dataKey="rate" radius={[0, 6, 6, 0]} maxBarSize={16}>
                      {dailyDetailData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={entry.rate === 100 ? COLORS.success : entry.rate >= 50 ? COLORS.primary : COLORS.rose} 
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>

        </div>
      )}
    </div>
  );
}
