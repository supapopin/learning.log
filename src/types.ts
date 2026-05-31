/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface RoadmapItem {
  week: number;
  goal: string;
  categories: string[];
  details: string;
}

export interface TodayCheckItem {
  id: string; // unique ID like "W1-D1-P1" or generated UUID
  date: string; // YYYY-MM-DD
  day_of_week: string; // 월요일, 화요일, ...
  period: string; // "1교시 (06:00~07:00)", etc.
  category: string; // 과목 분류
  learning_goal: string;
  learning_content: string;
  is_completed: boolean;
}
