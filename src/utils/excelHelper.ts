/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import * as XLSX from 'xlsx';
import { TodayCheckItem, RoadmapItem } from '../types';

// Map Korean headers to English keys
const TODAY_CHECK_MAP: { [key: string]: keyof TodayCheckItem } = {
  '고유ID': 'id',
  'id': 'id',
  '날짜': 'date',
  'date': 'date',
  '요일': 'day_of_week',
  'day_of_week': 'day_of_week',
  '교시': 'period',
  'period': 'period',
  '분류': 'category',
  'category': 'category',
  '학습목표': 'learning_goal',
  'learning_goal': 'learning_goal',
  '학습내용': 'learning_content',
  'learning_content': 'learning_content',
  '완료여부': 'is_completed',
  'is_completed': 'is_completed'
};

const ROADMAP_MAP: { [key: string]: keyof RoadmapItem } = {
  '주차': 'week',
  'week': 'week',
  '목표': 'goal',
  'goal': 'goal',
  '분류': 'categories',
  'categories': 'categories',
  '상세내역': 'details',
  'details': 'details'
};

/**
 * Export today_check and roadmap data to an XLSX file
 */
export function exportToXLSX(todayCheck: TodayCheckItem[], roadmap: RoadmapItem[]) {
  // 1. Prepare today_check data with Korean Headers
  const todayCheckData = todayCheck.map(item => ({
    '고유ID': item.id,
    '날짜': item.date,
    '요일': item.day_of_week,
    '교시': item.period,
    '분류': item.category,
    '학습목표': item.learning_goal,
    '학습내용': item.learning_content,
    '완료여부': item.is_completed ? '완료' : '미완료'
  }));

  // 2. Prepare roadmap data with Korean Headers
  const roadmapData = roadmap.map(item => ({
    '주차': item.week,
    '목표': item.goal,
    '분류': item.categories.join(', '),
    '상세내역': item.details
  }));

  // 3. Create Workbook and Sheets
  const wb = XLSX.utils.book_new();
  
  const wsToday = XLSX.utils.json_to_sheet(todayCheckData);
  const wsRoadmap = XLSX.utils.json_to_sheet(roadmapData);

  // Set column widths for nicer excel auto-formatting
  wsToday['!cols'] = [
    { wch: 15 }, // ID
    { wch: 15 }, // 날짜
    { wch: 10 }, // 요일
    { wch: 25 }, // 교시
    { wch: 15 }, // 분류
    { wch: 30 }, // 학습목표
    { wch: 45 }, // 학습내용
    { wch: 10 }  // 완료여부
  ];

  wsRoadmap['!cols'] = [
    { wch: 10 }, // 주차
    { wch: 35 }, // 목표
    { wch: 20 }, // 분류
    { wch: 55 }  // 상세내역
  ];

  XLSX.utils.book_append_sheet(wb, wsToday, '오늘_체크');
  XLSX.utils.book_append_sheet(wb, wsRoadmap, '로드맵');

  // 4. Download file
  XLSX.writeFile(wb, '학습계획_데이터베이스.xlsx');
}

/**
 * Parse an uploaded XLSX file into JSON matching TodayCheckItem[] and RoadmapItem[]
 */
export function parseXLSX(file: File): Promise<{ todayCheck: TodayCheckItem[], roadmap: RoadmapItem[] }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });

        let parsedTodayCheck: TodayCheckItem[] = [];
        let parsedRoadmap: RoadmapItem[] = [];

        // 1. Parse '오늘_체크' or similar sheet
        const todayCheckSheetName = workbook.SheetNames.find(
          name => name.includes('오늘') || name.toLowerCase().includes('today')
        ) || workbook.SheetNames[0];

        if (todayCheckSheetName) {
          const sheet = workbook.Sheets[todayCheckSheetName];
          const rawRows = XLSX.utils.sheet_to_json<any>(sheet);

          parsedTodayCheck = rawRows.map((row, idx) => {
            const item: any = {
              id: `W1-D1-P1-${idx}`, // fallback ID
              date: new Date().toISOString().split('T')[0],
              day_of_week: '월요일',
              period: '1교시 [임시]',
              category: '일반',
              learning_goal: '',
              learning_content: '',
              is_completed: false
            };

            // Map spreadsheet keys using our dictionary
            Object.keys(row).forEach(header => {
              const cleanedHeader = header.trim();
              const key = TODAY_CHECK_MAP[cleanedHeader] || TODAY_CHECK_MAP[cleanedHeader.toLowerCase()];
              if (key) {
                let value = row[header];
                
                // Parse completions
                if (key === 'is_completed') {
                  if (typeof value === 'boolean') {
                    item[key] = value;
                  } else {
                    const strVal = String(value).trim().toLowerCase();
                    item[key] = strVal === '완료' || strVal === 'true' || strVal === 'yes' || strVal === 'y' || strVal === '1';
                  }
                } else if (key === 'date' && typeof value === 'number') {
                  // Excel serial date format
                  try {
                    const dateObj = XLSX.SSF.parse_date_code(value);
                    const y = dateObj.y;
                    const m = String(dateObj.m).padStart(2, '0');
                    const d = String(dateObj.d).padStart(2, '0');
                    item[key] = `${y}-${m}-${d}`;
                  } catch {
                    item[key] = String(value);
                  }
                } else {
                  item[key] = String(value);
                }
              }
            });

            // Double check that it has a valid ID, or assign one based on parsed date
            if (!item.id || item.id.includes('undefined') || item.id.startsWith('W1-D1-P1-')) {
              // Generate standard W[week]-D[day]-P[idx] slug if we can compute, or a neat hash
              const days = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
              const dayIdx = days.indexOf(item.day_of_week);
              item.id = `U-${item.date}-${idx}`;
            }

            return item as TodayCheckItem;
          });
        }

        // 2. Parse '로드맵' or similar sheet
        const roadmapSheetName = workbook.SheetNames.find(
          name => name.includes('로드') || name.toLowerCase().includes('roadmap') || name.toLowerCase().includes('plan')
        ) || workbook.SheetNames[1];

        if (roadmapSheetName) {
          const sheet = workbook.Sheets[roadmapSheetName];
          const rawRows = XLSX.utils.sheet_to_json<any>(sheet);

          parsedRoadmap = rawRows.map((row, idx) => {
            const item: any = {
              week: idx + 1,
              goal: '',
              categories: [],
              details: ''
            };

            // Map keys
            Object.keys(row).forEach(header => {
              const cleanedHeader = header.trim();
              const key = ROADMAP_MAP[cleanedHeader] || ROADMAP_MAP[cleanedHeader.toLowerCase()];
              if (key) {
                let value = row[header];
                if (key === 'week') {
                  item[key] = Number(value) || idx + 1;
                } else if (key === 'categories') {
                  if (typeof value === 'string') {
                    item[key] = value.split(',').map(s => s.trim()).filter(Boolean);
                  } else if (Array.isArray(value)) {
                    item[key] = value;
                  } else {
                    item[key] = [String(value)];
                  }
                } else {
                  item[key] = String(value);
                }
              }
            });

            return item as RoadmapItem;
          });
        }

        // Return empty or fallback only if true empty
        resolve({
          todayCheck: parsedTodayCheck,
          roadmap: parsedRoadmap
        });
      } catch (err) {
        reject(err);
      }
    };

    reader.onerror = (err) => reject(err);
    reader.readAsArrayBuffer(file);
  });
}
