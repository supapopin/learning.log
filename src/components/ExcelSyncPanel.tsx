/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { Upload, Download, RefreshCw, FileSpreadsheet, Check, AlertCircle, HelpCircle } from 'lucide-react';
import { TodayCheckItem, RoadmapItem } from '../types';
import { exportToXLSX, parseXLSX } from '../utils/excelHelper';
import { DEFAULT_ROADMAP, DEFAULT_TODAY_CHECK } from '../data/sampleData';

interface ExcelSyncPanelProps {
  todayCheck: TodayCheckItem[];
  roadmap: RoadmapItem[];
  onImport: (todayCheck: TodayCheckItem[], roadmap: RoadmapItem[]) => void;
  onReset: () => void;
}

export default function ExcelSyncPanel({ todayCheck, roadmap, onImport, onReset }: ExcelSyncPanelProps) {
  const [dragActive, setDragActive] = useState(false);
  const [importStatus, setImportStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({
    type: null,
    message: ''
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Drag and Drop handlers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      await handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      await handleFile(e.target.files[0]);
    }
  };

  const handleFile = async (file: File) => {
    const extension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
    if (extension !== '.xlsx' && extension !== '.xls') {
      setImportStatus({
        type: 'error',
        message: '엑셀 파일(.xlsx, .xls)만 업로드할 수 있습니다.'
      });
      return;
    }

    try {
      setImportStatus({ type: null, message: '' });
      const result = await parseXLSX(file);
      
      if (result.todayCheck.length === 0 && result.roadmap.length === 0) {
        setImportStatus({
          type: 'error',
          message: '유효한 학습 데이터를 찾을 수 없습니다. 시트 명칭(오늘_체크, 로드맵)과 컬럼 구조를 확인해 주세요.'
        });
        return;
      }

      onImport(result.todayCheck, result.roadmap);
      setImportStatus({
        type: 'success',
        message: `동기화 성공! '오늘 체크' ${result.todayCheck.length}개, '로드맵' ${result.roadmap.length}개 데이터를 성공적으로 불러왔습니다.`
      });
    } catch (err: any) {
      setImportStatus({
        type: 'error',
        message: `엑셀 파싱 중 오류 발생: ${err.message || '다시 시도해 주세요.'}`
      });
    }
  };

  const handleExport = () => {
    try {
      exportToXLSX(todayCheck, roadmap);
    } catch (err: any) {
      alert(`엑셀 다운로드 중 오류가 발생했습니다: ${err.message}`);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm space-y-6">
      
      {/* Top title area */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5 text-emerald-600" />
            Excel(XLSX) DB 연동 센터
          </h3>
          <p className="text-xs text-gray-400 mt-1">
            이 플래너는 엑셀 파일을 데이터베이스 대용으로 사용합니다. 이곳에서 엑셀을 업로드하거나 다운로드하세요.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Export button */}
          <button
            onClick={handleExport}
            className="flex items-center gap-1.5 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-xs transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>XLSX 백업 다운로드</span>
          </button>

          {/* Reset button */}
          <button
            onClick={() => {
              if (confirm('현재 저장된 데이터가 모두 사라지고 기본 예시 데이터로 덮어씌워집니다. 진행하시겠습니까?')) {
                onReset();
                setImportStatus({
                  type: 'success',
                  message: '예시 구조 데이터로 복원이 완료되었습니다.'
                });
              }
            }}
            className="flex items-center gap-1.5 py-2 px-3 rounded-xl border border-gray-200 text-gray-655 hover:bg-gray-50 font-semibold text-xs transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>기본 데이터로 리셋</span>
          </button>
        </div>
      </div>

      {/* Database size status overview */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-50 rounded-xl p-3 text-center border border-slate-100">
          <span className="text-[10px] text-gray-400 font-bold block">오늘 체크 레코드 수</span>
          <span className="text-xl font-extrabold text-slate-800 font-mono">{todayCheck.length}개</span>
        </div>
        <div className="bg-slate-50 rounded-xl p-3 text-center border border-slate-100">
          <span className="text-[10px] text-gray-400 font-bold block">등록된 주간 로드맵 주차</span>
          <span className="text-xl font-extrabold text-slate-800 font-mono">{roadmap.length}개 수립</span>
        </div>
      </div>

      {/* Drag & drop upload box */}
      <div
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        onClick={triggerFileInput}
        className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer flex flex-col items-center justify-center transition-all ${
          dragActive 
            ? 'border-indigo-500 bg-indigo-50/30' 
            : 'border-slate-200 hover:border-indigo-400 hover:bg-slate-50/50'
        }`}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".xlsx,.xls"
          className="hidden"
        />

        <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
          <Upload className="w-5 h-5" />
        </div>

        <p className="text-sm font-bold text-gray-800">
          엑셀 파일을 여기에 끌어다 놓거나 클릭하여 업로드하세요
        </p>
        <p className="text-xs text-gray-400 mt-1">
          지원 형식: Excel ( .xlsx / .xls )
        </p>
      </div>

      {/* Import Feedback Banner */}
      {importStatus.type && (
        <div className={`p-4 rounded-xl flex items-start gap-2.5 text-xs font-medium leading-relaxed border ${
          importStatus.type === 'success' 
            ? 'bg-emerald-50 border-emerald-100 text-emerald-800' 
            : 'bg-rose-50 border-rose-100 text-rose-800'
        }`}>
          {importStatus.type === 'success' ? (
            <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-rose-600 mt-0.5 shrink-0" />
          )}
          <p>{importStatus.message}</p>
        </div>
      )}

      {/* Explanatory Help Card */}
      <div className="bg-indigo-50/40 rounded-2xl p-4 border border-indigo-100/50 flex gap-3 text-xs">
        <HelpCircle className="w-5 h-5 text-indigo-500 mt-0.5 shrink-0" />
        <div className="space-y-1.5">
          <h4 className="font-bold text-indigo-900">엑셀 구조 설명 및 템플릿 정보</h4>
          <p className="text-indigo-800/80 leading-relaxed font-medium">
            우측 상단의 <b>"XLSX 백업 다운로드"</b>를 눌러 다운로드한 파일이 이 앱에서 제공하는 완벽한 템플릿 규격입니다. 파일에는 2개의 워크시트가 들어있어, 외부 엑셀 편집기(웹용 액셀, 한쇼 등)에서 수정 후 언제든 이 자리에 재업로드할 수 있습니다. 
          </p>
          <ul className="list-disc pl-4 space-y-1 text-indigo-800/70">
            <li><b>오늘_체크 시트 필수 컬럼</b>: 고유ID, 날짜, 요일, 교시, 분류, 학습목표, 학습내용, 완료여부 ('완료' 혹은 '미완료')</li>
            <li><b>로드맵 시트 필수 컬럼</b>: 주차, 목표, 분류, 상세내역</li>
          </ul>
        </div>
      </div>

    </div>
  );
}
