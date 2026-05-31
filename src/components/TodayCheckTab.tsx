/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Edit2, Trash2, CheckCircle2, Circle, Search, Filter, Calendar, BookOpen, Clock, AlertCircle } from 'lucide-react';
import { TodayCheckItem } from '../types';

interface TodayCheckTabProps {
  items: TodayCheckItem[];
  onUpdate: (updatedItems: TodayCheckItem[]) => void;
}

export default function TodayCheckTab({ items, onUpdate }: TodayCheckTabProps) {
  // Active "Today" representation state. Defaults to '2026-06-01' because sampleData starts there.
  const [todayDate, setTodayDate] = useState<string>(() => {
    const todayStr = new Date().toISOString().split('T')[0];
    const hasToday = items.some(item => item.date === todayStr);
    return hasToday ? todayStr : '2026-06-01';
  });

  const handleNavigateDate = (offset: number) => {
    if (!todayDate) return;
    const parts = todayDate.split('-');
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const day = parseInt(parts[2], 10);
    
    const curr = new Date(Date.UTC(year, month, day));
    curr.setUTCDate(curr.getUTCDate() + offset);
    
    const y = curr.getUTCFullYear();
    const m = String(curr.getUTCMonth() + 1).padStart(2, '0');
    const d = String(curr.getUTCDate()).padStart(2, '0');
    setTodayDate(`${y}-${m}-${d}`);
  };

  // Filters & Search
  const [search, setSearch] = useState('');
  const [selectedDay, setSelectedDay] = useState<string>('전체');
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const [selectedStatus, setSelectedStatus] = useState<string>('전체');

  // Edit / Add Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<TodayCheckItem | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Form State
  const [formDate, setFormDate] = useState('');
  const [formPeriod, setFormPeriod] = useState('1교시 (06:00~07:00)');
  const [formCategory, setFormCategory] = useState('토익');
  const [formGoal, setFormGoal] = useState('');
  const [formContent, setFormContent] = useState('');
  const [formCompleted, setFormCompleted] = useState(false);

  // Auto-calculate day of the week from date
  const handleDateChange = (dateStr: string) => {
    setFormDate(dateStr);
  };

  const getDayOfWeekStr = (dateStr: string): string => {
    if (!dateStr) return '월요일';
    const parts = dateStr.split('-');
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const day = parseInt(parts[2], 10);
    
    const date = new Date(Date.UTC(year, month, day));
    const days = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
    return days[date.getUTCDay()];
  };

  // Toggle Completion State
  const handleToggleComplete = (id: string) => {
    const newItems = items.map(item => 
      item.id === id ? { ...item, is_completed: !item.is_completed } : item
    );
    onUpdate(newItems);
  };

  // Open Modal for Create
  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormDate(new Date().toISOString().split('T')[0]);
    setFormPeriod('1교시 (06:00~07:00)');
    setFormCategory('토익');
    setFormGoal('');
    setFormContent('');
    setFormCompleted(false);
    setIsModalOpen(true);
  };

  // Open Modal for Edit
  const handleOpenEdit = (item: TodayCheckItem) => {
    setEditingItem(item);
    setFormDate(item.date);
    setFormPeriod(item.period);
    setFormCategory(item.category);
    setFormGoal(item.learning_goal);
    setFormContent(item.learning_content);
    setFormCompleted(item.is_completed);
    setIsModalOpen(true);
  };

  // Delete Action
  const handleDelete = (id: string) => {
    const newItems = items.filter(item => item.id !== id);
    onUpdate(newItems);
  };

  // Form Submit Action
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formDate || !formGoal) {
      alert('날짜와 학습 목표는 필수 입력 항목입니다.');
      return;
    }

    const calculatedDay = getDayOfWeekStr(formDate);

    if (editingItem) {
      // Edit mode
      const updated = items.map(item => 
        item.id === editingItem.id ? {
          ...item,
          date: formDate,
          day_of_week: calculatedDay,
          period: formPeriod,
          category: formCategory,
          learning_goal: formGoal,
          learning_content: formContent,
          is_completed: formCompleted
        } : item
      );
      onUpdate(updated);
    } else {
      // Add mode
      // Generate standard ID sequence
      const newId = `TC-${Date.now()}`;
      const newItem: TodayCheckItem = {
        id: newId,
        date: formDate,
        day_of_week: calculatedDay,
        period: formPeriod,
        category: formCategory,
        learning_goal: formGoal,
        learning_content: formContent,
        is_completed: formCompleted
      };
      onUpdate([newItem, ...items]);
    }
    setIsModalOpen(false);
  };

  // Unique lists for filtering
  const daysOfWeek = ['전체', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일', '일요일'];
  const categoriesList = ['전체', ...Array.from(new Set(items.map(item => item.category))).filter(Boolean)];
  const statusList = ['전체', '완료', '미완료'];

  // Filter items
  const filteredItems = items.filter(item => {
    const matchesTodayDate = item.date === todayDate;

    const matchesSearch = 
      item.learning_goal.toLowerCase().includes(search.toLowerCase()) ||
      item.learning_content.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase());

    const matchesDay = selectedDay === '전체' || item.day_of_week === selectedDay;
    const matchesCategory = selectedCategory === '전체' || item.category === selectedCategory;
    
    let matchesStatus = true;
    if (selectedStatus === '완료') matchesStatus = item.is_completed;
    if (selectedStatus === '미완료') matchesStatus = !item.is_completed;

    return matchesTodayDate && matchesSearch && matchesDay && matchesCategory && matchesStatus;
  });

  // Unique common category items for quick-clicks in form
  const commonCategories = ['토익', '오픽', '회화', '어휘', '종합', '기타'];
  const commonPeriods = [
    '1교시 (06:00~07:00)',
    '2교시 (19:00~20:00)',
    '3교시 (20:00~21:00)',
    '4교시 (21:00~22:00)'
  ];

  return (
    <div className="space-y-6">
      {/* 📅 플래너 오늘 날짜 네비게이터 */}
      <div className="bg-gradient-to-r from-indigo-50/80 to-slate-50/80 border border-indigo-100 rounded-2xl p-4 flex items-center justify-center shadow-sm">
        <div className="flex items-center justify-center gap-2 w-full">
          <button
            type="button"
            onClick={() => handleNavigateDate(-1)}
            className="px-3 py-1.5 text-xs bg-white border border-slate-200 hover:border-slate-300 text-slate-700 rounded-xl font-extrabold transition-all shadow-2xs hover:shadow-1xs cursor-pointer shrink-0"
            title="이전날"
          >
            ◀
          </button>
          
          <input
            type="date"
            value={todayDate}
            onChange={(e) => setTodayDate(e.target.value)}
            className="bg-white border border-slate-200 hover:border-slate-300 rounded-xl px-2.5 py-1.5 text-xs font-bold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500/15 focus:border-indigo-500 transition-all cursor-pointer"
          />

          <button
            type="button"
            onClick={() => {
              const todayStr = new Date().toISOString().split('T')[0];
              setTodayDate(todayStr);
            }}
            className="px-3 py-1.5 text-xs bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-700 rounded-xl font-extrabold transition-all shadow-2xs hover:shadow-xs hover:scale-105 active:scale-95 cursor-pointer shrink-0"
            title="오늘 날짜로 가기"
          >
            오늘
          </button>

          <button
            type="button"
            onClick={() => handleNavigateDate(1)}
            className="px-3 py-1.5 text-xs bg-white border border-slate-200 hover:border-slate-300 text-slate-700 rounded-xl font-extrabold transition-all shadow-2xs hover:shadow-1xs cursor-pointer shrink-0"
            title="다음날"
          >
            ▶
          </button>
        </div>
      </div>

      {/* Search and Filters panel */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4 md:p-5 shadow-sm space-y-4">
        {/* Top bar: Search input and small Add button inline */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="학습목표, 내용, 과목 검색..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold placeholder:text-gray-400 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition-colors"
            />
          </div>
          <button
            type="button"
            onClick={handleOpenAdd}
            className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold shadow-xs transition-all hover:shadow-xs hover:scale-105 active:scale-95 shrink-0 flex items-center justify-center cursor-pointer"
            title="오늘 체크 추가"
          >
            <Plus className="w-5 h-5 stroke-[3px]" />
          </button>
        </div>

        {/* Dropdown Filters in a sleek single row - compressed to a single row on mobile too */}
        <div className="grid grid-cols-3 gap-1.5 md:gap-4 pt-3.5 border-t border-slate-100/85">
          {/* 1. 요일 필터 */}
          <div className="space-y-1 text-xs">
            <label className="text-gray-500 font-extrabold flex items-center gap-1 sm:gap-1.5 truncate text-[10px] sm:text-xs">
              <Calendar className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
              <span>요일 필터</span>
            </label>
            <select
              value={selectedDay}
              onChange={(e) => setSelectedDay(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg sm:rounded-xl px-1 py-1 sm:px-3 sm:py-2 text-slate-750 font-bold text-[11px] sm:text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/15 focus:border-indigo-500 cursor-pointer"
            >
              {daysOfWeek.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          {/* 2. 과목 필터 */}
          <div className="space-y-1 text-xs">
            <label className="text-gray-500 font-extrabold flex items-center gap-1 sm:gap-1.5 truncate text-[10px] sm:text-xs">
              <BookOpen className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span>과목 필터</span>
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg sm:rounded-xl px-1 py-1 sm:px-3 sm:py-2 text-slate-750 font-bold text-[11px] sm:text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/15 focus:border-indigo-500 cursor-pointer"
            >
              {categoriesList.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* 3. 달성 여부 */}
          <div className="space-y-1 text-xs">
            <label className="text-gray-500 font-extrabold flex items-center gap-1 sm:gap-1.5 truncate text-[10px] sm:text-xs">
              <CheckCircle2 className="w-3.5 h-3.5 text-violet-500 shrink-0" />
              <span>달성 여부</span>
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg sm:rounded-xl px-1 py-1 sm:px-3 sm:py-2 text-slate-750 font-bold text-[11px] sm:text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/15 focus:border-indigo-500 cursor-pointer"
            >
              {statusList.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Today Checklist rendering */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <span className="text-sm font-semibold text-gray-500">
            검색 결과: <span className="text-indigo-600">{filteredItems.length}</span>개 일정
          </span>
          {items.length === 0 && (
            <span className="text-xs text-amber-500 bg-amber-50 px-2 py-1 rounded-full flex items-center gap-1 font-semibold">
              <AlertCircle className="w-3" /> 데이터가 없습니다. 상단에서 연동하거나 추가해 보세요!
            </span>
          )}
        </div>

        {/* Tabular Glass-Card Listing Container */}
        <div className="glass-card rounded-2xl overflow-hidden shadow-xs flex flex-col">
          
          {/* Table Header Row: Hidden on Mobile */}
          <div className="hidden md:grid grid-cols-12 bg-slate-50/80 border-b border-gray-200/60 p-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">
            <div className="col-span-2">교시 / 시간</div>
            <div className="col-span-2">과목 / 분류</div>
            <div className="col-span-5">학습 목표 및 상세</div>
            <div className="col-span-1 text-center">완료</div>
            <div className="col-span-2 text-right pr-4">작업관리</div>
          </div>

          <div className="divide-y divide-gray-100">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item) => {
                // Color mapping for categories
                const getCategoryColors = (cat: string) => {
                  const c = cat.toLowerCase();
                  if (c === '토익') return 'bg-emerald-100 text-emerald-700 font-bold';
                  if (c === '오픽') return 'bg-orange-100 text-orange-700 font-bold';
                  if (c === '회화') return 'bg-indigo-100 text-indigo-700 font-bold';
                  if (c === '어휘') return 'bg-violet-100 text-violet-700 font-bold';
                  return 'bg-blue-100 text-blue-700 font-bold';
                };

                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    className={`grid grid-cols-1 md:grid-cols-12 p-4.5 gap-3 md:gap-4 items-center hover:bg-slate-50/40 transition-colors ${
                      item.is_completed ? 'bg-emerald-50/5' : ''
                    }`}
                  >
                    {/* Column 1: Time / Date Context */}
                    <div className="col-span-2 flex flex-row md:flex-col justify-between items-center md:items-start">
                      <div className="text-xs">
                        <p className="font-bold text-slate-800">{item.period.split(' ')[0] || '시간'}</p>
                        <p className="text-[10px] text-slate-450 mt-0.5">{item.period.match(/\(([^)]+)\)/)?.[1] || item.period}</p>
                      </div>
                      <span className="text-[10px] font-semibold text-slate-400 bg-slate-100/50 border border-slate-200/40 px-2 py-0.5 rounded-sm md:mt-1">
                        {item.date} ({item.day_of_week.substring(0, 1)})
                      </span>
                    </div>

                    {/* Column 2: Category Badge */}
                    <div className="col-span-2 flex items-center">
                      <span className={`px-2 py-0.5 text-[10px] rounded uppercase tracking-wide inline-block ${getCategoryColors(item.category)}`}>
                        {item.category}
                      </span>
                    </div>

                    {/* Column 3: Learning Goals / Contents */}
                    <div className="col-span-5 space-y-1.5 flex-1 min-w-0">
                      <p className={`text-sm font-bold text-slate-900 leading-snug break-words ${
                        item.is_completed ? 'line-through text-slate-400 decoration-1' : ''
                      }`}>
                        {item.learning_goal}
                      </p>
                      {item.learning_content && (
                        <p className={`text-xs text-slate-500 leading-relaxed font-medium whitespace-pre-line break-words max-w-xl ${
                          item.is_completed ? 'text-slate-450 font-normal' : ''
                        }`}>
                          {item.learning_content}
                        </p>
                      )}
                    </div>

                    {/* Column 4: Checkbox Toggle */}
                    <div className="col-span-1 flex items-center justify-between md:justify-center border-t md:border-t-0 pt-2.5 md:pt-0 border-gray-100">
                      <span className="text-xs font-semibold text-slate-400 md:hidden">완료 여부</span>
                      <button
                        type="button"
                        onClick={() => handleToggleComplete(item.id)}
                        className="flex items-center justify-center rounded-lg transition-transform active:scale-95 cursor-pointer"
                        aria-label={item.is_completed ? "미완료" : "완료"}
                      >
                        {item.is_completed ? (
                          <CheckCircle2 className="w-5.5 h-5.5 text-emerald-500 fill-emerald-50" />
                        ) : (
                          <Circle className="w-5.5 h-5.5 text-slate-300 hover:text-indigo-500 transition-colors" />
                        )}
                      </button>
                    </div>

                    {/* Column 5: Edit / Delete Controls */}
                    <div className="col-span-2 flex items-center justify-end gap-2 w-full pt-1 md:pt-0">
                      {deleteConfirmId === item.id ? (
                        <div className="flex items-center gap-1.5 animate-in fade-in zoom-in-95 duration-100">
                          <button
                            type="button"
                            onClick={() => {
                              handleDelete(item.id);
                              setDeleteConfirmId(null);
                            }}
                            className="py-1 px-2.5 rounded bg-red-600 hover:bg-red-700 text-white text-[11px] font-extrabold transition-all cursor-pointer shadow-xs active:scale-95"
                          >
                            확인
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeleteConfirmId(null)}
                            className="py-1 px-2 py-1 px-2.5 rounded border border-slate-200 text-slate-500 hover:bg-slate-50 text-[11px] font-bold transition-all cursor-pointer"
                          >
                            취소
                          </button>
                        </div>
                      ) : (
                        <>
                          <button
                            type="button"
                            onClick={() => handleOpenEdit(item)}
                            className="py-1 px-2.5 rounded border border-slate-200 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 hover:border-indigo-100 text-[11px] font-bold transition-all flex items-center gap-1 cursor-pointer"
                          >
                            <Edit2 className="w-3 h-3" />
                            <span>편집</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => setDeleteConfirmId(item.id)}
                            className="py-1 px-2.5 rounded border border-red-100 text-red-500 hover:text-white hover:bg-red-500 hover:border-red-500 text-[11px] font-bold transition-all flex items-center gap-1 cursor-pointer"
                          >
                            <Trash2 className="w-3 h-3" />
                            <span>삭제</span>
                          </button>
                        </>
                      )}
                    </div>

                  </motion.div>
                );
              })}
            </AnimatePresence>

            {filteredItems.length === 0 && (
              <div className="bg-white rounded-b-2xl p-12 text-center flex flex-col items-center justify-center">
                <Calendar className="w-10 h-10 text-slate-300 mb-2.5" />
                <p className="text-slate-500 text-sm font-bold">검색 조건에 맞는 일정이 없습니다.</p>
                <p className="text-slate-400 text-xs mt-1">필터를 조정하거나 위 버튼으로 새 오늘체크 일정을 추가해 보세요.</p>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Form Dialog Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ scale: 0.95, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 15, opacity: 0 }}
              className="bg-white rounded-2xl shadow-xl border w-full max-w-lg overflow-hidden relative z-10 flex flex-col max-h-[90vh]"
            >
              <div className="p-5 border-b border-gray-100">
                <h3 className="text-lg font-bold text-gray-900">
                  {editingItem ? '오늘 체크 수정' : '오늘 체크 추가'}
                </h3>
                <p className="text-xs text-gray-400 mt-1">
                  날짜에 따라 요일이 자동으로 셋팅됩니다.
                </p>
              </div>

              {/* Scrollable Form */}
              <form onSubmit={handleSubmit} className="p-5 space-y-4 overflow-y-auto flex-1 text-sm">
                {/* Date Row */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">날짜</label>
                  <input
                    type="date"
                    value={formDate}
                    onChange={(e) => handleDateChange(e.target.value)}
                    className="w-full bg-white border border-gray-200 p-2.5 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/15 focus:border-indigo-500"
                    required
                  />
                  {formDate && (
                    <span className="text-xs text-indigo-600 font-semibold mt-1 block">
                      요일 매칭: {getDayOfWeekStr(formDate)}
                    </span>
                  )}
                </div>

                {/* Period Row */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">교시 / 고정 시간대</label>
                  <input
                    type="text"
                    value={formPeriod}
                    onChange={(e) => setFormPeriod(e.target.value)}
                    placeholder="예: 2교시 (19:00~20:00)"
                    className="w-full bg-white border border-gray-200 p-2.5 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/15 focus:border-indigo-500"
                    required
                  />
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {commonPeriods.map(p => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setFormPeriod(p)}
                        className={`text-xs px-2.5 py-1 rounded-md border transition-colors ${
                          formPeriod === p 
                            ? 'bg-indigo-50 border-indigo-200 text-indigo-700 font-medium' 
                            : 'bg-gray-50 border-gray-200 text-gray-500 hover:bg-gray-100'
                        }`}
                      >
                        {p.split(' ')[0]}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Category Row */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">분류 / 학습 과목</label>
                  <input
                    type="text"
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    placeholder="예: 토익, 오픽"
                    className="w-full bg-white border border-gray-200 p-2.5 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/15 focus:border-indigo-500"
                    required
                  />
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {commonCategories.map(cat => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setFormCategory(cat)}
                        className={`text-xs px-2.5 py-0.5 rounded-md border transition-colors ${
                          formCategory === cat 
                            ? 'bg-indigo-50 border-indigo-200 text-indigo-700 font-medium' 
                            : 'bg-gray-50 border-gray-200 text-gray-500 hover:bg-gray-100'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Goal Row */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">학습 목표</label>
                  <input
                    type="text"
                    value={formGoal}
                    onChange={(e) => setFormGoal(e.target.value)}
                    placeholder="해당 시간에 달성해야 함 구체적 목표"
                    className="w-full bg-white border border-gray-200 p-2.5 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/15 focus:border-indigo-500"
                    required
                  />
                </div>

                {/* Content Row */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">구체적인 학습내용</label>
                  <textarea
                    rows={3}
                    value={formContent}
                    onChange={(e) => setFormContent(e.target.value)}
                    placeholder="독해 기출 풀이, 단어 50개 암기 등 상세 행동"
                    className="w-full bg-white border border-gray-200 p-2.5 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/15 focus:border-indigo-500 resize-none"
                  />
                </div>

                {/* Checkbox Complete */}
                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="is_completed"
                    checked={formCompleted}
                    onChange={(e) => setFormCompleted(e.target.checked)}
                    className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                  <label htmlFor="is_completed" className="text-gray-700 font-semibold select-none cursor-pointer">
                    완료 상태로 등록
                  </label>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 py-2.5 px-4 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-700 text-center font-medium transition-colors"
                  >
                    취소
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-center font-medium shadow transition-colors"
                  >
                    {editingItem ? '수정 완료' : '추가하기'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
