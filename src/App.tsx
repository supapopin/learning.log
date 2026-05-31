/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { TodayCheckItem, RoadmapItem } from './types';
import { DEFAULT_ROADMAP, DEFAULT_TODAY_CHECK } from './data/sampleData';
import TodayCheckTab from './components/TodayCheckTab';
import RoadmapTab from './components/RoadmapTab';
import WeeklyReportTab from './components/WeeklyReportTab';
import ExcelSyncPanel from './components/ExcelSyncPanel';
import { CalendarCheck, Milestone, BarChart3, Database, RefreshCw, FileSpreadsheet, ChevronDown, ChevronUp, Menu } from 'lucide-react';

export default function App() {
  // 1. Initialize states from localStorage or defaults
  const [todayCheck, setTodayCheck] = useState<TodayCheckItem[]>(() => {
    try {
      const saved = localStorage.getItem('study_planner_today_check_v7');
      if (saved) {
        return JSON.parse(saved);
      }
      return DEFAULT_TODAY_CHECK.map(item => ({ ...item, is_completed: false }));
    } catch {
      return DEFAULT_TODAY_CHECK.map(item => ({ ...item, is_completed: false }));
    }
  });

  const [roadmap, setRoadmap] = useState<RoadmapItem[]>(() => {
    try {
      const saved = localStorage.getItem('study_planner_roadmap_v7');
      return saved ? JSON.parse(saved) : DEFAULT_ROADMAP;
    } catch {
      return DEFAULT_ROADMAP;
    }
  });

  // Active Tab
  const [activeTab, setActiveTab] = useState<'today_check' | 'roadmap' | 'report'>('today_check');
  
  // Collapse state for XLSX database sync center
  const [isSyncOpen, setIsSyncOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Sync to local storage on changes
  useEffect(() => {
    localStorage.setItem('study_planner_today_check_v7', JSON.stringify(todayCheck));
  }, [todayCheck]);

  useEffect(() => {
    localStorage.setItem('study_planner_roadmap_v7', JSON.stringify(roadmap));
  }, [roadmap]);

  // CRUD actions for entire app level imports
  const handleImport = (newTodayCheck: TodayCheckItem[], newRoadmap: RoadmapItem[]) => {
    if (newTodayCheck && newTodayCheck.length > 0) {
      // Ensure all imported items are set to uncompleted to satisfy Requirement 4
      const uncompletedImports = newTodayCheck.map(item => ({ ...item, is_completed: false }));
      setTodayCheck(uncompletedImports);
    }
    if (newRoadmap && newRoadmap.length > 0) {
      setRoadmap(newRoadmap);
    }
  };

  const handleReset = () => {
    const uncompletedDefault = DEFAULT_TODAY_CHECK.map(item => ({ ...item, is_completed: false }));
    setTodayCheck(uncompletedDefault);
    setRoadmap(DEFAULT_ROADMAP);
    localStorage.setItem('study_planner_today_check_v7', JSON.stringify(uncompletedDefault));
    localStorage.setItem('study_planner_roadmap_v7', JSON.stringify(DEFAULT_ROADMAP));
  };

  // Safe updates for tabs
  const handleTodayCheckUpdate = (updated: TodayCheckItem[]) => {
    setTodayCheck(updated);
  };

  const handleRoadmapUpdate = (updated: RoadmapItem[]) => {
    setRoadmap(updated);
  };

  // Dynamic achievement score for the sidebar
  const overallAchievementRate = (() => {
    const total = todayCheck.length;
    if (total === 0) return 0;
    const completed = todayCheck.filter(item => item.is_completed).length;
    return Math.round((completed / total) * 100);
  })();

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-150/60 text-slate-800 antialiased font-sans">
      
      {/* 1. Left Sidebar: optimized for desktop, turns into a sleek header on mobile */}
      <aside className="w-full md:w-64 bg-[#0F172A] text-white flex flex-col p-5 md:p-6 shrink-0 md:h-screen md:sticky md:top-0 pb-[5px] md:pb-[5px]">
        
        {/* Logo Header */}
        <div className="mb-6 md:mb-10 flex md:block justify-between items-center">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-blue-400">LEARN.LOG</h1>
            <p className="text-[10px] text-slate-300 font-extrabold uppercase mt-0.5">
              세영이 아자아자
            </p>
          </div>
          <div className="flex md:hidden items-center gap-2 bg-slate-800 rounded-full py-1 px-3">
            <span className="text-[10px] text-slate-400">달성률</span>
            <span className="text-xs font-bold text-blue-400">{overallAchievementRate}%</span>
          </div>
        </div>

        {/* Sidebar Nav Buttons */}
        <nav className="flex md:flex-col gap-2 flex-wrap sm:flex-nowrap flex-1 w-full md:space-y-1.5 md:gap-0 pb-3 md:pb-0">
          <button
            onClick={() => setActiveTab('today_check')}
            className={`flex-1 md:flex-initial w-auto md:w-full flex items-center justify-center md:justify-start space-x-3 pt-[4px] pb-[4px] pl-[4px] pr-[4px] rounded-xl transition-all cursor-pointer text-[12px] ${
              activeTab === 'today_check'
                ? 'bg-white text-blue-600 shadow-sm font-semibold'
                : 'text-slate-400 hover:bg-slate-850 hover:text-white'
            }`}
          >
            <span className="text-base">📅</span>
            <span>오늘 체크</span>
          </button>

          <button
            onClick={() => setActiveTab('roadmap')}
            className={`flex-1 md:flex-initial w-auto md:w-full flex items-center justify-center md:justify-start space-x-3 pt-[4px] pb-[4px] pl-[4px] pr-[4px] rounded-xl transition-all cursor-pointer text-[10px] ${
              activeTab === 'roadmap'
                ? 'bg-white text-blue-600 shadow-sm font-semibold'
                : 'text-slate-400 hover:bg-slate-850 hover:text-white'
            }`}
          >
            <span className="text-base">🗺️</span>
            <span className="text-[12px]">로드맵</span>
          </button>

          <button
            onClick={() => setActiveTab('report')}
            className={`flex-1 md:flex-initial w-auto md:w-full flex items-center justify-center md:justify-start space-x-3 pt-[4px] pb-[4px] pl-[4px] pr-[4px] rounded-xl transition-all cursor-pointer text-[10px] ${
              activeTab === 'report'
                ? 'bg-white text-blue-600 shadow-sm font-semibold'
                : 'text-slate-400 hover:bg-slate-850 hover:text-white'
            }`}
          >
            <span className="text-base">📊</span>
            <span className="text-[11px]">주간 리포트</span>
          </button>
        </nav>

        {/* Real Dynamic Progress Widget at the bottom */}
        <div className="hidden md:block mt-auto p-4 bg-slate-850 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-400 font-semibold">학습 완료율</span>
            <span className="text-xs font-bold text-blue-400">{overallAchievementRate}%</span>
          </div>
          <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
            <div 
              className="bg-blue-400 h-1.5 rounded-full transition-all duration-300" 
              style={{ width: `${overallAchievementRate}%` }}
            />
          </div>
        </div>

      </aside>

      {/* 2. Main content area: layout on right side */}
      <main className="flex-1 flex flex-col h-full overflow-visible md:overflow-hidden">
        
        {/* Dynamic header containing title & student identity bar */}
        <header className="bg-white border-b border-gray-200/80 px-6 py-4 flex items-center justify-between shadow-xs sticky top-0 md:relative z-20">
          <div className="flex items-center gap-3">
            <h2 className="text-base font-extrabold text-slate-900 tracking-tight">
              {activeTab === 'today_check' && '오늘 체크 플래너'}
              {activeTab === 'roadmap' && '체계적 학습 로드맵'}
              {activeTab === 'report' && '성과 분석 대시보드'}
            </h2>
            <div className="h-4 w-px bg-slate-200 hidden sm:block" />
            <span className="text-[11px] font-bold text-indigo-650 bg-indigo-50/70 border border-indigo-100/60 px-2 py-0.5 rounded-md hidden sm:block">
              현재 학기 스마트 스케줄러
            </span>
          </div>

          <div className="flex items-center gap-3 relative">
            <span className="text-xs font-bold text-slate-500 hidden md:block">
              Excel Sync: <span className="text-emerald-600">Active</span>
            </span>
            <div className="h-4 w-px bg-slate-200 hidden md:block" />
            
            {/* Hamburger Dropdown Menu styled with Tailwind */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-xl text-slate-600 hover:text-indigo-600 hover:bg-slate-100/70 border border-transparent hover:border-slate-200 transition-all cursor-pointer flex items-center justify-center"
                aria-label="메뉴"
              >
                <Menu className="w-5 h-5" />
              </button>

              {isMenuOpen && (
                <>
                  {/* Invisible background click interceptor to close dropdown */}
                  <div
                    className="fixed inset-0 z-30"
                    onClick={() => setIsMenuOpen(false)}
                  />
                  
                  {/* Dropdown Menu Container */}
                  <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-2xl shadow-lg py-2 z-40 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-4 py-1.5 border-b border-slate-100">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">학습 플래너 메뉴</p>
                    </div>
                    
                    <button
                      type="button"
                      onClick={() => {
                        setIsSyncOpen(true);
                        setIsMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2.5 hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center gap-2.5 transition-colors cursor-pointer"
                    >
                      <Database className="w-4 h-4 text-emerald-600" />
                      <span>XLSX 파일 연동 및 관리</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        const resetStatus = todayCheck.map(item => ({ ...item, is_completed: false }));
                        setTodayCheck(resetStatus);
                        setIsMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2.5 hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center gap-2.5 transition-colors cursor-pointer"
                    >
                      <RefreshCw className="w-4 h-4 text-indigo-500" />
                      <span>모두 미완료로 설정</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Outer content container scrollable */}
        <div className="flex-1 p-4 md:p-6 space-y-6 max-w-5xl w-full mx-auto md:overflow-y-auto">
          
          {/* Core Tab UI Injection */}
          <div className="transition-all duration-300">
            {activeTab === 'today_check' && (
              <TodayCheckTab
                items={todayCheck}
                onUpdate={handleTodayCheckUpdate}
              />
            )}

            {activeTab === 'roadmap' && (
              <RoadmapTab
                roadmapItems={roadmap}
                onUpdate={handleRoadmapUpdate}
              />
            )}

            {activeTab === 'report' && (
              <WeeklyReportTab
                items={todayCheck}
              />
            )}
          </div>

        </div>

        {/* Hidden Modal Sync Dialogue accessible upon request */}
        {isSyncOpen && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl w-full max-w-2xl border border-slate-200 shadow-xl overflow-hidden transform scale-100 transition-all">
              <div className="bg-slate-55 border-b border-slate-200/80 px-5 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Database className="w-4.5 h-4.5 text-emerald-600" />
                  <h3 className="font-extrabold text-slate-900 text-sm.5">XLSX 로컬 데이터베이스 연동 및 관리</h3>
                </div>
                <button
                  onClick={() => setIsSyncOpen(false)}
                  className="px-2.5 py-1 text-slate-450 hover:text-slate-800 transition-colors font-bold text-xs.5 hover:bg-slate-100 rounded-lg cursor-pointer"
                >
                  닫기 ✕
                </button>
              </div>
              <div className="p-5 max-h-[80vh] overflow-y-auto">
                <ExcelSyncPanel
                  todayCheck={todayCheck}
                  roadmap={roadmap}
                  onImport={handleImport}
                  onReset={handleReset}
                />
              </div>
            </div>
          </div>
        )}

      </main>

    </div>
  );
}
