/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Edit2, Trash2, Milestone, Layers, FileText, Check } from 'lucide-react';
import { RoadmapItem } from '../types';

interface RoadmapTabProps {
  roadmapItems: RoadmapItem[];
  onUpdate: (updatedRoadmap: RoadmapItem[]) => void;
}

export default function RoadmapTab({ roadmapItems, onUpdate }: RoadmapTabProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<RoadmapItem | null>(null);

  // Form states
  const [formWeek, setFormWeek] = useState(1);
  const [formGoal, setFormGoal] = useState('');
  const [formCategories, setFormCategories] = useState('');
  const [formDetails, setFormDetails] = useState('');

  // Handle Add Click
  const handleOpenAdd = () => {
    setEditingItem(null);
    // Auto-compute next week number
    const nextWeek = roadmapItems.length > 0 
      ? Math.max(...roadmapItems.map(item => item.week)) + 1 
      : 1;
    setFormWeek(nextWeek);
    setFormGoal('');
    setFormCategories('');
    setFormDetails('');
    setIsModalOpen(true);
  };

  // Handle Edit Click
  const handleOpenEdit = (item: RoadmapItem) => {
    setEditingItem(item);
    setFormWeek(item.week);
    setFormGoal(item.goal);
    setFormCategories(item.categories.join(', '));
    setFormDetails(item.details);
    setIsModalOpen(true);
  };

  // Handle Delete
  const handleDelete = (week: number) => {
    if (confirm(`${week}주차 로드맵 계획을 삭제하시겠습니까?`)) {
      const updated = roadmapItems.filter(item => item.week !== week);
      // Sort after delete just in case
      onUpdate(updated.sort((a,b) => a.week - b.week));
    }
  };

  // Form Submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formGoal) {
      alert('목표를 입력해주세요.');
      return;
    }

    const categoriesArray = formCategories
      .split(',')
      .map(cat => cat.trim())
      .filter(Boolean);

    const newItem: RoadmapItem = {
      week: Number(formWeek),
      goal: formGoal,
      categories: categoriesArray,
      details: formDetails
    };

    let updatedList: RoadmapItem[] = [];

    if (editingItem) {
      // Editing may have changed the week, handle duplicates
      const filtered = roadmapItems.filter(item => item.week !== editingItem.week);
      
      // If the new week number already exists elsewhere (and isn't the original), show warning or replace
      if (filtered.some(item => item.week === newItem.week)) {
        if (!confirm(`${newItem.week}주차 계획이 이미 존재합니다. 덮어쓰시겠습니까?`)) {
          return;
        }
      }
      
      updatedList = [...filtered.filter(item => item.week !== newItem.week), newItem];
    } else {
      // Create mode
      if (roadmapItems.some(item => item.week === newItem.week)) {
        if (!confirm(`${newItem.week}주차 계획이 이미 존재합니다. 덮어쓰시겠습니까?`)) {
          return;
        }
      }
      updatedList = [...roadmapItems.filter(item => item.week !== newItem.week), newItem];
    }

    // Sort by week number asc
    updatedList.sort((a, b) => a.week - b.week);
    onUpdate(updatedList);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header bar and Add trigger */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-gray-900">주차별 학습 로드맵</h2>
          <p className="text-xs text-gray-500 mt-0.5">
            장기적이고 거시적인 주차별 성공 목표와 공부할 대과목을 설정하세요.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-1.5 py-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-xs shadow-sm hover:shadow transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>로드맵 추가</span>
        </button>
      </div>

      {/* Grid of Roadmap milestones */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <AnimatePresence mode="popLayout">
          {roadmapItems.map((item, idx) => (
            <motion.div
              key={`week-${item.week}`}
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2, delay: idx * 0.05 }}
              className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-all relative overflow-hidden group flex flex-col justify-between"
            >
              {/* Highlight ribbon representing week */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-indigo-500" />
              
              <div className="space-y-4">
                {/* Milestone Rank Indicator */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold text-sm">
                      W{item.week}
                    </div>
                    <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider">
                      {item.week}주차 목표 및 대과목
                    </span>
                  </div>

                  {/* Actions buttons */}
                  <div className="flex items-center gap-1 opacity-80 md:opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleOpenEdit(item)}
                      className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                      title="로드맵 수정"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.week)}
                      className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      title="로드맵 삭제"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Core Objective */}
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-gray-900 leading-snug">
                    {item.goal}
                  </h3>
                </div>

                {/* Subject Category tag pills */}
                {item.categories.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 items-center">
                    <Layers className="w-3.5 h-3.5 text-gray-400" />
                    {item.categories.map((cat, cIdx) => (
                      <span
                        key={cIdx}
                        className="px-2.5 py-0.5 rounded-md bg-indigo-50/70 border border-indigo-100 text-indigo-700 font-medium text-xs"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                )}

                {/* Detailed descriptions */}
                {item.details && (
                  <div className="pt-3 border-t border-gray-50 flex items-start gap-2">
                    <FileText className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-gray-600 whitespace-pre-wrap leading-relaxed">
                      {item.details}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {roadmapItems.length === 0 && (
          <div className="col-span-full bg-slate-50 border-2 border-dashed border-slate-200 p-12 text-center rounded-2xl flex flex-col items-center justify-center">
            <Milestone className="w-10 h-10 text-gray-300 mb-3" />
            <h4 className="font-bold text-gray-600 text-sm">로드맵이 아직 구축되지 않았습니다.</h4>
            <p className="text-gray-400 text-xs mt-1 max-w-sm">
              위의 추가 버튼을 누르거나 Excel 파일을 드래그하여 학습 주차별 거시 목표 체계를 정립해 보세요!
            </p>
          </div>
        )}
      </div>

      {/* Roadmap Form Dialog Modal */}
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
              className="bg-white rounded-2xl shadow-xl border w-full max-w-md overflow-hidden relative z-10 text-sm"
            >
              <div className="p-5 border-b border-gray-100">
                <h3 className="text-lg font-bold text-gray-900">
                  {editingItem ? '학습 로드맵 수정' : '새 학습 로드맵 추가'}
                </h3>
                <p className="text-xs text-gray-400 mt-1">
                  1주일에 1개의 포괄적인 목표를 설정해 효율적인 성장을 이끌어냅니다.
                </p>
              </div>

              {/* Form elements */}
              <form onSubmit={handleSubmit} className="p-5 space-y-4">
                {/* Week field */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">학습 주차 (숫자만)</label>
                  <input
                    type="number"
                    min={1}
                    max={52}
                    value={formWeek}
                    onChange={(e) => setFormWeek(Number(e.target.value))}
                    className="w-full bg-white border border-gray-200 p-2.5 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/15 focus:border-indigo-500"
                    required
                  />
                </div>

                {/* Main Goal field */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">주간 핵심 목표</label>
                  <input
                    type="text"
                    value={formGoal}
                    onChange={(e) => setFormGoal(e.target.value)}
                    placeholder="예: 실전 테스트 및 틀린 문장 쉐도잉 훈련"
                    className="w-full bg-white border border-gray-200 p-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/15 focus:border-indigo-500"
                    required
                  />
                </div>

                {/* Subject Categories comma separated */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">
                    과목 분류 (쉼표로 여러개 구분)
                  </label>
                  <input
                    type="text"
                    value={formCategories}
                    onChange={(e) => setFormCategories(e.target.value)}
                    placeholder="예: 토익, 오픽, 어휘"
                    className="w-full bg-white border border-gray-200 p-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/15 focus:border-indigo-500"
                  />
                  <span className="text-[11px] text-gray-400 mt-1 block">
                    쉼표(,)를 기준으로 각각 다른 태그로 변환됩니다.
                  </span>
                </div>

                {/* Detailed plans */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">상세내역</label>
                  <textarea
                    rows={4}
                    value={formDetails}
                    onChange={(e) => setFormDetails(e.target.value)}
                    placeholder="해당 주차에 수행할 세부 전략이나 교재 범위, 오답 처리 기획 등"
                    className="w-full bg-white border border-gray-200 p-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/15 focus:border-indigo-500 resize-none"
                  />
                </div>

                {/* Actions */}
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
