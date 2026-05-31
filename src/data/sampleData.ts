import { RoadmapItem, TodayCheckItem } from '../types';

export const DEFAULT_ROADMAP: RoadmapItem[] = [
  {
    "week": 1,
    "goal": "토익 문법/독해 기본기 확립 및 오픽 설문 주제별 기본 발화 패턴 숙지",
    "categories": ["토익", "오픽"],
    "details": "토익 Part 5·6 빈출 문법 요약 및 Part 7 단문·다중 지문 정독 훈련, 오픽 설문조사 기반 기본 신상 및 여가 활동 시제 맞춤 발화 연습"
  },
  {
    "week": 2,
    "goal": "토익 취약 파트 집중 보완 및 오픽 고난도 묘사/비교 유형 정복",
    "categories": ["토익", "오픽"],
    "details": "토익 LC 호주/영국 발음 및 RC 취약 품사 집중 문제 풀이, 오픽 과거 경험 및 현재-과거 비교/묘사 유형 발화 훈련"
  },
  {
    "week": 3,
    "goal": "오픽 최종 스퍼트 및 시험 응시, 토익 실전 모의고사 중심 시간 관리 훈련",
    "categories": ["토익", "오픽"],
    "details": "오픽 돌발 주제 및 롤플레이(11~13번) 최종 스크립트 키워드 점검 후 3째주 주말 응시, 토익 LC 스키밍 및 RC 시간 안배 연습"
  },
  {
    "week": 4,
    "goal": "토익 고난도 삼중 지문 및 LC 함정 소거 집중 훈련 후 최종 시험 응시",
    "categories": ["토익"],
    "details": "오픽 종료 후 토익 100% 올인, 매일 실전 200문항 모의고사 응시 및 오답노트 완벽 분석 후 4째주 주말 최종 응시"
  }
];

export const DEFAULT_TODAY_CHECK: TodayCheckItem[] = [
  {
    "id": "W1-D1-P1",
    "date": "2026-06-01",
    "day_of_week": "월요일",
    "period": "1교시 (06:00~07:00)",
    "category": "오픽",
    "learning_goal": "Background Survey 및 난이도 설정 전략 수립",
    "learning_content": "선택할 서베이 항목(12개) 확정 및 난이도 5-5 설정 시 출제 흐름 파악",
    "is_completed": false
  },
  {
    "id": "W1-D1-P2",
    "date": "2026-06-01",
    "day_of_week": "월요일",
    "period": "2교시 (19:00~20:00)",
    "category": "토익",
    "learning_goal": "Part 5·6 빈출 문법 개념 정리",
    "learning_content": "동사의 시제, 수일치, 태 핵심 공식 암기 및 기초 예제 풀이",
    "is_completed": false
  },
  {
    "id": "W1-D1-P3",
    "date": "2026-06-01",
    "day_of_week": "월요일",
    "period": "3교시 (20:00~21:00)",
    "category": "토익",
    "learning_goal": "Part 7 단문 독해 속도 향상",
    "learning_content": "단문 지문 5개 풀이 및 정확한 문장 구조 분석을 통한 직독직해 연습",
    "is_completed": false
  },
  {
    "id": "W1-D1-P4",
    "date": "2026-06-01",
    "day_of_week": "월요일",
    "period": "4교시 (21:00~22:00)",
    "category": "토익",
    "learning_goal": "오답 원인 분석 및 정리",
    "learning_content": "오늘 푼 토익 파트별 틀린 문제 오답 노트 작성 및 취약 단어 정리",
    "is_completed": false
  },
  {
    "id": "W1-D2-P1",
    "date": "2026-06-02",
    "day_of_week": "화요일",
    "period": "1교시 (06:00~07:00)",
    "category": "오픽",
    "learning_goal": "Survey 주제 1 일상 영역 발화 훈련",
    "learning_content": "학생/직장인/거주지 관련 키워드 중심 현재 시제 활용 기본 신상 소개 연습",
    "is_completed": false
  },
  {
    "id": "W1-D2-P2",
    "date": "2026-06-02",
    "day_of_week": "화요일",
    "period": "2교시 (19:00~20:00)",
    "category": "토익",
    "learning_goal": "Part 5·6 준동사 개념 정복",
    "learning_content": "투부정사·동명사·분사 개념 및 문제 풀이, 동사별 목적어 취하는 형태 암기",
    "is_completed": false
  },
  {
    "id": "W1-D2-P3",
    "date": "2026-06-02",
    "day_of_week": "화요일",
    "period": "3교시 (20:00~21:00)",
    "category": "토익",
    "learning_goal": "Part 1·2 청취 훈련 및 함정 제거",
    "learning_content": "의문사 의문문(Who/Where/When) 유사 발음 및 소거법 연습",
    "is_completed": false
  },
  {
    "id": "W1-D2-P4",
    "date": "2026-06-02",
    "day_of_week": "화요일",
    "period": "4교시 (21:00~22:00)",
    "category": "토익",
    "learning_goal": "LC 청취 보완 및 문법 복습",
    "learning_content": "준동사 문법 복습 및 LC 틀린 음원 반복 청취(딕테이션/섀도잉)",
    "is_completed": false
  },
  {
    "id": "W1-D3-P1",
    "date": "2026-06-03",
    "day_of_week": "수요일",
    "period": "1교시 (06:00~07:00)",
    "category": "오픽",
    "learning_goal": "Survey 주제 2 여가 활동 묘사",
    "learning_content": "영화/공연 보기 주제 발화 연습 및 장소/대상 묘사(Description) 패턴 익히기",
    "is_completed": false
  },
  {
    "id": "W1-D3-P2",
    "date": "2026-06-03",
    "day_of_week": "수요일",
    "period": "2교시 (19:00~20:00)",
    "category": "토익",
    "learning_goal": "Part 5·6 관계사 및 접/전/부 구별",
    "learning_content": "관계대명사 뼈대 분석 및 접속사·전치사·부사 자리 찾기 3초 컷 문제 해결력 훈련",
    "is_completed": false
  },
  {
    "id": "W1-D3-P3",
    "date": "2026-06-03",
    "day_of_week": "수요일",
    "period": "3교시 (20:00~21:00)",
    "category": "토익",
    "learning_goal": "Part 7 이중 지문 독해 매칭",
    "learning_content": "이중 지문 3세트 독해 및 질문-지문 간 연계 정답 단서 찾기 훈련",
    "is_completed": false
  },
  {
    "id": "W1-D3-P4",
    "date": "2026-06-03",
    "day_of_week": "수요일",
    "period": "4교시 (21:00~22:00)",
    "category": "토익",
    "learning_goal": "단어장 업데이트 및 독해 오답 리뷰",
    "learning_content": "지문 내 미암기 어휘 단어장 정리 및 이중 지문 오답 논리 분석",
    "is_completed": false
  },
  {
    "id": "W1-D4-P1",
    "date": "2026-06-04",
    "day_of_week": "목요일",
    "period": "1교시 (06:00~07:00)",
    "category": "오픽",
    "learning_goal": "Survey 주제 3 취미·관심사 발화",
    "learning_content": "요리하기/음악 감상 주제 연습 및 감정 표현 형용사 다채롭게 활용하기",
    "is_completed": false
  },
  {
    "id": "W1-D4-P2",
    "date": "2026-06-04",
    "day_of_week": "목요일",
    "period": "19:00~20:00",
    "category": "토익",
    "learning_goal": "Part 5·6 품사 및 어휘 적응",
    "learning_content": "형용사·부사·명사 자리 고르기 및 고빈출 핵심 어휘 문맥 파악 문제 풀이",
    "is_completed": false
  },
  {
    "id": "W1-D4-P3",
    "date": "2026-06-04",
    "day_of_week": "목요일",
    "period": "3교시 (20:00~21:00)",
    "category": "토익",
    "learning_goal": "Part 3·4 스키밍 타이밍 훈련",
    "learning_content": "긴 대화/담화 청취 및 시각 자료 연계 문제 정답 스포팅 연습",
    "is_completed": false
  },
  {
    "id": "W1-D4-P4",
    "date": "2026-06-04",
    "day_of_week": "목요일",
    "period": "4교시 (21:00~22:00)",
    "category": "토익",
    "learning_goal": "LC 스크립트 분석 및 연음 체크",
    "learning_content": "호주/영국 발음 차이점 정리 및 안 들렸던 연음 구간 섀도잉",
    "is_completed": false
  },
  {
    "id": "W1-D5-P1",
    "date": "2026-06-05",
    "day_of_week": "금요일",
    "period": "1교시 (06:00~07:00)",
    "category": "오픽",
    "learning_goal": "Survey 주제 4 운동·휴가 경험 발화",
    "learning_content": "걷기/조깅/국내 여행 테마 연습 및 완벽한 과거 시제(Past Tense) 사용 훈련",
    "is_completed": false
  },
  {
    "id": "W1-D5-P2",
    "date": "2026-06-05",
    "day_of_week": "금요일",
    "period": "2교시 (19:00~20:00)",
    "category": "토익",
    "learning_goal": "주중 Part 5·6 취약점 누적 보완",
    "learning_content": "월~목 틀렸던 문법/어휘 오답 노트를 활용한 취약 개념 최종 재정립",
    "is_completed": false
  },
  {
    "id": "W1-D5-P3",
    "date": "2026-06-05",
    "day_of_week": "금요일",
    "period": "3교시 (20:00~21:00)",
    "category": "토익",
    "learning_goal": "Part 7 삼중 지문 고난도 독해",
    "learning_content": "삼중 지문 2세트 독해를 통한 연계 정보 파악 및 추론 문제 해결력 기르기",
    "is_completed": false
  },
  {
    "id": "W1-D5-P4",
    "date": "2026-06-05",
    "day_of_week": "금요일",
    "period": "4교시 (21:00~22:00)",
    "category": "토익",
    "learning_goal": "1주차 어휘 최종 점검",
    "learning_content": "주중 학습한 토익 필수 어휘 자가 테스트 및 암기율 80% 이상 확보",
    "is_completed": false
  },
  {
    "id": "W1-D6-P1",
    "date": "2026-06-06",
    "day_of_week": "토요일",
    "period": "1교시 (09:00~11:00)",
    "category": "토익",
    "learning_goal": "실전 모의고사 1회 응시",
    "learning_content": "실제 시험 시간과 동일하게 120분 타이머 설정 후 LC+RC 200문항 풀이",
    "is_completed": false
  },
  {
    "id": "W1-D6-P2",
    "date": "2026-06-06",
    "day_of_week": "토요일",
    "period": "2교시 (11:00~13:00)",
    "category": "토익",
    "learning_goal": "모의고사 가채점 및 분석",
    "learning_content": "전체 문항 상세 오답 분석 및 파트별 정답률 확인을 통한 현재 위치 진단",
    "is_completed": false
  },
  {
    "id": "W1-D6-P3",
    "date": "2026-06-06",
    "day_of_week": "토요일",
    "period": "3교시 (14:30~16:30)",
    "category": "오픽",
    "learning_goal": "오픽 돌발 주제 키워드 정리",
    "learning_content": "날씨/명절/테크놀로지 등 예상치 못한 질문에 유연하게 대처하는 흐름 잡기",
    "is_completed": false
  },
  {
    "id": "W1-D6-P4",
    "date": "2026-06-06",
    "day_of_week": "토요일",
    "period": "4교시 (16:30~17:30)",
    "category": "오픽",
    "learning_goal": "발화 녹음 및 자가 피드백",
    "learning_content": "1~5번 주제별 발화 녹음 후 발음, 억양, Filler Words 사용 빈도 체크",
    "is_completed": false
  },
  {
    "id": "W1-D7-P1",
    "date": "2026-06-07",
    "day_of_week": "일요일",
    "period": "1교시 (09:00~11:30)",
    "category": "토익",
    "learning_goal": "고난도 독해 구문 정독",
    "learning_content": "주말 모의고사 중 에러율이 높았던 고난도 Part 7 지문 정독 및 구문 해석 완벽 파악",
    "is_completed": false
  },
  {
    "id": "W1-D7-P2",
    "date": "2026-06-07",
    "day_of_week": "일요일",
    "period": "2교시 (11:30~13:00)",
    "category": "토익",
    "learning_goal": "LC 고득점 섀도잉 훈련",
    "learning_content": "LC 취약 대화 지문 음원 성우의 속도와 억양을 그대로 따라 말하는 섀도잉 훈련",
    "is_completed": false
  },
  {
    "id": "W1-D7-P3",
    "date": "2026-06-07",
    "day_of_week": "일요일",
    "period": "3교시 (14:30~16:30)",
    "category": "오픽",
    "learning_goal": "롤플레이 유형 패턴 익히기",
    "learning_content": "오픽 롤플레이(11~13번) 기본 패턴(질문하기, 문제 해결 대안 제시) 숙지 및 연습",
    "is_completed": false
  },
  {
    "id": "W1-D7-P4",
    "date": "2026-06-07",
    "day_of_week": "일요일",
    "period": "4교시 (16:30~17:30)",
    "category": "종합",
    "learning_goal": "1주차 진도 점검 및 피드백",
    "learning_content": "오늘체크 완료여부 기반 주간 리포트 기능 검증 및 2주차 계획 반영",
    "is_completed": false
  },
  {
    "id": "W2-D1-P1",
    "date": "2026-06-08",
    "day_of_week": "월요일",
    "period": "1교시 (06:00~07:00)",
    "category": "오픽",
    "learning_goal": "과거 경험 묘사 심화 훈련",
    "learning_content": "가장 기억에 남는 경험(Memorable Experience) 육하원칙에 맞춘 발화 뼈대 구성",
    "is_completed": false
  },
  {
    "id": "W2-D1-P2",
    "date": "2026-06-08",
    "day_of_week": "월요일",
    "period": "2교시 (19:00~20:00)",
    "category": "토익",
    "learning_goal": "Part 5·6 특수구문 문법 정리",
    "learning_content": "도치 구문, 강조 구문, 비교 구문 고난도 유형 이론 정리 및 기출 풀이",
    "is_completed": false
  },
  {
    "id": "W2-D1-P3",
    "date": "2026-06-08",
    "day_of_week": "월요일",
    "period": "3교시 (20:00~21:00)",
    "category": "토익",
    "learning_goal": "Part 7 단문/이중 지문 속도 단축",
    "learning_content": "지문당 문제 풀이 제한시간 설정 후 속독 및 정답 근거 스포팅 연계 훈련",
    "is_completed": false
  },
  {
    "id": "W2-D1-P4",
    "date": "2026-06-08",
    "day_of_week": "월요일",
    "period": "4교시 (21:00~22:00)",
    "category": "토익",
    "learning_goal": "구문 독해 오답 분석",
    "learning_content": "잘못 해석하여 오답으로 이어진 복합 문장 구조 분석 및 단어 암기",
    "is_completed": false
  },
  {
    "id": "W2-D2-P1",
    "date": "2026-06-09",
    "day_of_week": "화요일",
    "period": "1교시 (06:00~07:00)",
    "category": "오픽",
    "learning_goal": "현재와 과거 비교 유형 정복",
    "learning_content": "과거와 현재의 상태/트렌드를 비교하는 문형 패턴과 대조 연결어(On the other hand) 훈련",
    "is_completed": false
  },
  {
    "id": "W2-D2-P2",
    "date": "2026-06-09",
    "day_of_week": "화요일",
    "period": "2교시 (19:00~20:00)",
    "category": "토익",
    "learning_goal": "Part 5·6 혼동 어휘 정복",
    "learning_content": "비슷한 형태의 형용사/부사 및 품사 변형 어휘 세트 비교 암기 및 예제 풀이",
    "is_completed": false
  },
  {
    "id": "W2-D2-P3",
    "date": "2026-06-09",
    "day_of_week": "화요일",
    "period": "3교시 (20:00~21:00)",
    "category": "토익",
    "learning_goal": "Part 3·4 화자의 의도 파악 훈련",
    "learning_content": "따옴표 문항(\" \") 전후 맥락을 파악하여 숨은 의도를 찾아내는 고난도 청취 연습",
    "is_completed": false
  },
  {
    "id": "W2-D2-P4",
    "date": "2026-06-09",
    "day_of_week": "화요일",
    "period": "4교시 (21:00~22:00)",
    "category": "토익",
    "learning_goal": "LC 패러프레이징 노트 정리",
    "learning_content": "듣기 음원의 단어가 보문에서 어떻게 재표현(Paraphrasing)되었는지 매칭 정리",
    "is_completed": false
  },
  {
    "id": "W2-D3-P1",
    "date": "2026-06-10",
    "day_of_week": "수요일",
    "period": "1교시 (06:00~07:00)",
    "category": "오픽",
    "learning_goal": "돌발 주제 계절/날씨 심화",
    "learning_content": "자국의 계절적 특징 및 기후 변화로 인한 에피소드 스토리라인 구성 및 발화",
    "is_completed": false
  },
  {
    "id": "W2-D3-P2",
    "date": "2026-06-10",
    "day_of_week": "수요일",
    "period": "2교시 (19:00~20:00)",
    "category": "토익",
    "learning_goal": "Part 5·6 전치사 vs 접속사 완벽 구별",
    "learning_content": "구조 분석을 통해 뒤에 명사구가 오는지 절이 오는지 구별하는 실전 문제 풀이",
    "is_completed": false
  },
  {
    "id": "W2-D3-P3",
    "date": "2026-06-10",
    "day_of_week": "수요일",
    "period": "3교시 (20:00~21:00)",
    "category": "토익",
    "learning_goal": "Part 7 삼중 지문 연계 분석",
    "learning_content": "지문 3개의 정보가 유기적으로 얽힌 고난도 삼중 지문 4세트 정밀 분석 풀이",
    "is_completed": false
  },
  {
    "id": "W2-D3-P4",
    "date": "2026-06-10",
    "day_of_week": "수요일",
    "period": "4교시 (21:00~22:00)",
    "category": "토익",
    "learning_goal": "RC 고난도 문제 오답 노트",
    "learning_content": "삼중 지문 추론 문제 틀린 원인 도출 및 정답 근거 문장 형광펜 매칭",
    "is_completed": false
  },
  {
    "id": "W2-D4-P1",
    "date": "2026-06-11",
    "day_of_week": "목요일",
    "period": "1교시 (06:00~07:00)",
    "category": "오픽",
    "learning_goal": "롤플레이 11-12번 문제 해결 유형",
    "learning_content": "상황극 중 거절하거나 대안을 제시해야 하는 고난도 템플릿 입에 붙이기",
    "is_completed": false
  },
  {
    "id": "W2-D4-P2",
    "date": "2026-06-11",
    "day_of_week": "목요일",
    "period": "2교시 (19:00~20:00)",
    "category": "토익",
    "learning_goal": "Part 5·6 동사 어휘 마스터",
    "learning_content": "자동사+전치사 수거 및 타동사 목적어 어울림(Collocation) 100선 암기 및 풀이",
    "is_completed": false
  },
  {
    "id": "W2-D4-P3",
    "date": "2026-06-11",
    "day_of_week": "목요일",
    "period": "3교시 (20:00~21:00)",
    "category": "토익",
    "learning_goal": "Part 3·4 영국/호주 발음 적응",
    "learning_content": "영국/호주 성우 비중이 높은 담화 세트 집중 청취 및 주요 연음 현상 정리",
    "is_completed": false
  },
  {
    "id": "W2-D4-P4",
    "date": "2026-06-11",
    "day_of_week": "목요일",
    "period": "4교시 (21:00~22:00)",
    "category": "토익",
    "learning_goal": "LC 스크립트 딕테이션 마무리",
    "learning_content": "안 들리는 단어가 호주 발음 탈락 현상인지 구별하여 단어장에 누적 기록",
    "is_completed": false
  },
  {
    "id": "W2-D5-P1",
    "date": "2026-06-12",
    "day_of_week": "금요일",
    "period": "1교시 (06:00~07:00)",
    "category": "오픽",
    "learning_goal": "돌발 주제 호텔/집안일 훈련",
    "learning_content": "예상치 못한 테마 출제 시 범용으로 쓸 수 있는 만능 스토리라인(문제 발생-해결) 대입 연습",
    "is_completed": false
  },
  {
    "id": "W2-D5-P2",
    "date": "2026-06-12",
    "day_of_week": "금요일",
    "period": "2교시 (19:00~20:00)",
    "category": "토익",
    "learning_goal": "주중 오답 및 어휘 총정리",
    "learning_content": "2주차 평일 동안 틀렸던 모든 토익 RC 문법/어휘 무한 복습",
    "is_completed": false
  },
  {
    "id": "W2-D5-P3",
    "date": "2026-06-12",
    "day_of_week": "금요일",
    "period": "3교시 (20:00~21:00)",
    "category": "토익",
    "learning_goal": "Part 7 문장 삽입 고난도 훈련",
    "learning_content": "주어진 문장이 들어갈 알맞은 위치 고르기 유형의 지시어/연결어 단서 찾기 집중 훈련",
    "is_completed": false
  },
  {
    "id": "W2-D5-P4",
    "date": "2026-06-12",
    "day_of_week": "금요일",
    "period": "4교시 (21:00~22:00)",
    "category": "종합",
    "learning_goal": "2주차 어휘 테스트 및 마감",
    "learning_content": "누적 단어 300개 테스트 진행 및 정답률 90% 달성 여부 확인",
    "is_completed": false
  },
  {
    "id": "W2-D6-P1",
    "date": "2026-06-13",
    "day_of_week": "토요일",
    "period": "1교시 (09:00~11:00)",
    "category": "토익",
    "learning_goal": "실전 모의고사 2회 응시",
    "learning_content": "OMR 마킹지 출력을 포함하여 실전과 동일한 긴장감 속에서 200문항 풀이",
    "is_completed": false
  },
  {
    "id": "W2-D6-P2",
    "date": "2026-06-13",
    "day_of_week": "토요일",
    "period": "2교시 (11:00~13:00)",
    "category": "토익",
    "learning_goal": "2회 모의고사 피드백 및 채점",
    "learning_content": "1회 대비 정답률 추이 분석 및 시간 부족 파트(대개 Part 7 후반부) 정밀 진단",
    "is_completed": false
  },
  {
    "id": "W2-D6-P3",
    "date": "2026-06-13",
    "day_of_week": "토요일",
    "period": "14:30~16:30",
    "category": "오픽",
    "learning_goal": "오픽 하프 모의고사 1회",
    "learning_content": "실제 프로그램 인터페이스 환경에서 7문항 연속 답변 녹음 진행",
    "is_completed": false
  },
  {
    "id": "W2-D6-P4",
    "date": "2026-06-13",
    "day_of_week": "토요일",
    "period": "4교시 (16:30~17:30)",
    "category": "오픽",
    "learning_goal": "녹음본 크리틱 및 자가 교정",
    "learning_content": "AL 달성의 걸림돌인 무음(Pause) 구간 길이를 줄이기 위한 필러 대체 연습",
    "is_completed": false
  },
  {
    "id": "W2-D7-P1",
    "date": "2026-06-14",
    "day_of_week": "일요일",
    "period": "1교시 (09:00~11:30)",
    "category": "토익",
    "learning_goal": "2회 모의고사 RC 심화 분석",
    "learning_content": "틀린 문법 문제 개념 역추적 및 Part 7 패러프레이징 단어 일치 작업",
    "is_completed": false
  },
  {
    "id": "W2-D7-P2",
    "date": "2026-06-14",
    "day_of_week": "일요일",
    "period": "2교시 (11:30~13:00)",
    "category": "토익",
    "learning_goal": "LC 틀린 문항 쉐도잉 2차",
    "learning_content": "Part 3·4 긴 지문 중 흐름을 놓친 세트 전체 스크립트 보며 연음 따라하기",
    "is_completed": false
  },
  {
    "id": "W2-D7-P3",
    "date": "2026-06-14",
    "day_of_week": "일요일",
    "period": "3교시 (14:30~16:30)",
    "category": "오픽",
    "learning_goal": "14-15번 고난도 시사/이슈 대비",
    "learning_content": "AL 등급 판별 문항인 14~15번 최근 환경 이슈, 산업 트렌드 관련 만능 어휘 암기",
    "is_completed": false
  },
  {
    "id": "W2-D7-P4",
    "date": "2026-06-14",
    "day_of_week": "일요일",
    "period": "4교시 (16:30~17:30)",
    "category": "종합",
    "learning_goal": "중간 점검 및 3주차 오픽 스퍼트 준비",
    "learning_content": "다음 주 오픽 시험 전 최종 스퍼트를 위한 주간 달성률 점검 및 스케줄 확정",
    "is_completed": false
  },
  {
    "id": "W3-D1-P1",
    "date": "2026-06-15",
    "day_of_week": "월요일",
    "period": "1교시 (06:00~07:00)",
    "category": "오픽",
    "learning_goal": "전체 Survey 주제 무작위 스피킹",
    "learning_content": "1~2주차에 연습한 서베이 주제 질문을 무작위 셔플하여 즉흥 발화 순발력 테스트",
    "is_completed": false
  },
  {
    "id": "W3-D1-P2",
    "date": "2026-06-15",
    "day_of_week": "월요일",
    "period": "2교시 (19:00~20:00)",
    "category": "토익",
    "learning_goal": "Part 5·6 실전 3세트 타임어택",
    "learning_content": "세트당 8분 제한 시간을 두고 빠르고 정확하게 품사/문법 스크리닝 풀이",
    "is_completed": false
  },
  {
    "id": "W3-D1-P3",
    "date": "2026-06-15",
    "day_of_week": "월요일",
    "period": "3교시 (20:00~21:00)",
    "category": "토익",
    "learning_goal": "Part 7 다중 지문 단서 링크 훈련",
    "learning_content": "이중·삼중 지문 단서들을 선으로 연결해가며 정답 매칭 속도를 올리는 훈련",
    "is_completed": false
  },
  {
    "id": "W3-D1-P4",
    "date": "2026-06-15",
    "day_of_week": "월요일",
    "period": "4교시 (21:00~22:00)",
    "category": "오픽",
    "learning_goal": "오픽 발화 키워드 최종 점검",
    "learning_content": "시험 전 암기 스크립트 티가 나지 않도록 인트로-본론-결론 연결어구 래핑 연습",
    "is_completed": false
  },
  {
    "id": "W3-D2-P1",
    "date": "2026-06-16",
    "day_of_week": "화요일",
    "period": "1교시 (06:00~07:00)",
    "category": "오픽",
    "learning_goal": "돌발 주제 무작위 스피킹",
    "learning_content": "테크놀로지, 가구, 명절 등 기출 돌발 질문에 대처하는 오프닝 필러 템플릿 실전 적용",
    "is_completed": false
  },
  {
    "id": "W3-D2-P2",
    "date": "2026-06-16",
    "day_of_week": "화요일",
    "period": "2교시 (19:00~20:00)",
    "category": "토익",
    "learning_goal": "Part 2 고난도 우회적 답변 정복",
    "learning_content": "\"모른다\", \"제3자에게 물어봐라\" 등 최근 트렌드인 우회적/거절형 정답 패턴 집중 청취",
    "is_completed": false
  },
  {
    "id": "W3-D2-P3",
    "date": "2026-06-16",
    "day_of_week": "화요일",
    "period": "3교시 (20:00~21:00)",
    "category": "토익",
    "learning_goal": "Part 3·4 시각 자료 완전 정복",
    "learning_content": "그래프, 지도, 영수증 등 시각 정보와 대화 내용을 동시에 매칭하는 고난도 세트 풀이",
    "is_completed": false
  },
  {
    "id": "W3-D2-P4",
    "date": "2026-06-16",
    "day_of_week": "화요일",
    "period": "4교시 (21:00~22:00)",
    "category": "오픽",
    "learning_goal": "과거시제 오발화 자가 스크리닝",
    "learning_content": "녹음된 파일을 들으며 과거형 동사(-ed, 불규칙 동사) 누락 여부를 스스로 검출 수정",
    "is_completed": false
  },
  {
    "id": "W3-D3-P1",
    "date": "2026-06-17",
    "day_of_week": "수요일",
    "period": "1교시 (06:00~07:00)",
    "category": "오픽",
    "learning_goal": "롤플레이 11-13번 최종 모의 훈련",
    "learning_content": "상황 제시(11번) - 대안 제시(12번) - 유사 경험(13번) 콤보 끊김 없이 스피킹하기",
    "is_completed": false
  },
  {
    "id": "W3-D3-P2",
    "date": "2026-06-17",
    "day_of_week": "수요일",
    "period": "2교시 (19:00~20:00)",
    "category": "토익",
    "learning_goal": "Part 5·6 전범위 오답 슬라이싱",
    "learning_content": "기존에 틀렸던 문법 이론 중 혼동되는 파트 요약집 확인 및 단기 암기",
    "is_completed": false
  },
  {
    "id": "W3-D3-P3",
    "date": "2026-06-17",
    "day_of_week": "수요일",
    "period": "3교시 (20:00~21:00)",
    "category": "토익",
    "learning_goal": "Part 7 전체 문항 실전 배분 풀이",
    "learning_content": "단문·이중·삼중 지문 총 54문항을 70분 안에 푸는 실전 독해 타임 프레셔 훈련",
    "is_completed": false
  },
  {
    "id": "W3-D3-P4",
    "date": "2026-06-17",
    "day_of_week": "수요일",
    "period": "4교시 (21:00~22:00)",
    "category": "오픽",
    "learning_goal": "자신감 및 억양 페이스 리프트",
    "learning_content": "평이한 어조(IM2의 원인) 탈피를 위해 과장된 억양 및 감정 형용사 악센트 부여 연습",
    "is_completed": false
  },
  {
    "id": "W3-D4-P1",
    "date": "2026-06-18",
    "day_of_week": "목요일",
    "period": "1교시 (06:00~07:00)",
    "category": "오픽",
    "learning_goal": "오픽 풀 세트 모의고사 1회",
    "learning_content": "실제 시험과 동일하게 난이도 5-5 설정 후 40분간 15문항 전체 답변 녹음 시뮬레이션",
    "is_completed": false
  },
  {
    "id": "W3-D4-P2",
    "date": "2026-06-18",
    "day_of_week": "목요일",
    "period": "2교시 (19:00~20:00)",
    "category": "토익",
    "learning_goal": "LC 고난도 파트 음원 청취",
    "learning_content": "가장 오답률이 높은 Part 3 후반부 및 Part 4 긴 담화 집중 배속 청취 훈련",
    "is_completed": false
  },
  {
    "id": "W3-D4-P3",
    "date": "2026-06-18",
    "day_of_week": "목요일",
    "period": "3교시 (20:00~21:00)",
    "category": "토익",
    "learning_goal": "Part 7 고난도 추론 문항 스캐닝",
    "learning_content": "\"What is implied about...?\" 문항의 정답 단서가 숨어있는 문맥 찾아내기 훈련",
    "is_completed": false
  },
  {
    "id": "W3-D4-P4",
    "date": "2026-06-18",
    "day_of_week": "목요일",
    "period": "4교시 (21:00~22:00)",
    "category": "오픽",
    "learning_goal": "오픽 최종 모의고사 오답 교정",
    "learning_content": "답변 중 말이 막혔던 문항의 우회 루트(IDK 전략 후 다른 이야기로 전환) 공식 점검",
    "is_completed": false
  },
  {
    "id": "W3-D5-P1",
    "date": "2026-06-19",
    "day_of_week": "금요일",
    "period": "1교시 (06:00~07:00)",
    "category": "오픽",
    "learning_goal": "시험 전날 최종 마인드 컨트롤 및 발화 예열",
    "learning_content": "시험장에서 쓸 필러 단어 루틴화 및 자신감 유지를 위한 마인드셋 셋팅",
    "is_completed": false
  },
  {
    "id": "W3-D5-P2",
    "date": "2026-06-19",
    "day_of_week": "금요일",
    "period": "2교시 (19:00~20:00)",
    "category": "토익",
    "learning_goal": "기출 문법 최종 요약집 복습",
    "learning_content": "내일 주말 토익 모의고사 전 품사, 구조, 접속사 핵심 포인트 최종 눈도장",
    "is_completed": false
  },
  {
    "id": "W3-D5-P3",
    "date": "2026-06-19",
    "day_of_week": "금요일",
    "period": "3교시 (20:00~21:00)",
    "category": "토익",
    "learning_goal": "RC 고빈출 패러프레이징 동의어 정리",
    "learning_content": "자주 출제되는 다의어(provide, accommodate 등)의 문맥상 동의어 매칭 리스트 암기",
    "is_completed": false
  },
  {
    "id": "W3-D5-P4",
    "date": "2026-06-19",
    "day_of_week": "금요일",
    "period": "4교시 (21:00~22:00)",
    "category": "종합",
    "learning_goal": "오픽 시험 준비물 및 고사장 확인",
    "learning_content": "신분증 구비 및 내일 시험 응시 동선 체크, 오픽 공부 마무리",
    "is_completed": false
  },
  {
    "id": "W3-D6-P1",
    "date": "2026-06-20",
    "day_of_week": "토요일",
    "period": "1교시 (09:00~11:00)",
    "category": "토익",
    "learning_goal": "실전 모의고사 3회 응시",
    "learning_content": "실전과 동일한 환경 세팅 후 토익 200문항 풀이 및 타임 아웃 체크",
    "is_completed": false
  },
  {
    "id": "W3-D6-P2",
    "date": "2026-06-20",
    "day_of_week": "토요일",
    "period": "2교시 (11:00~13:00)",
    "category": "토익",
    "learning_goal": "3회 모의고사 가채점 및 오답 분류",
    "learning_content": "틀린 파트를 명밀히 분석하여 다음 주 최종 토익 올인 주간의 타겟 파트 설정",
    "is_completed": false
  },
  {
    "id": "W3-D6-P3",
    "date": "2026-06-20",
    "day_of_week": "토요일",
    "period": "14:30~16:00",
    "category": "오픽",
    "learning_goal": "오픽 공식 시험 응시",
    "learning_content": "고사장 입실 후 에바(Eva) 앞에서 기량을 펼쳐 AL 목표 발화 달성하기",
    "is_completed": false
  },
  {
    "id": "W3-D6-P4",
    "date": "2026-06-20",
    "day_of_week": "토요일",
    "period": "4교시 (16:30~17:30)",
    "category": "종합",
    "learning_goal": "오픽 시험 리뷰 및 휴식",
    "learning_content": "시험 복기(어떤 질문이 나왔는지 간단히 기록) 및 휴식",
    "is_completed": false
  },
  {
    "id": "W3-D7-P1",
    "date": "2026-06-21",
    "day_of_week": "일요일",
    "period": "1교시 (09:00~11:30)",
    "category": "토익",
    "learning_goal": "3회 모의고사 RC 취약 지문 격파",
    "learning_content": "독해 중 오답 확률이 높았던 이중/삼중 지문 완벽 구문 독해 및 오답 교정",
    "is_completed": false
  },
  {
    "id": "W3-D7-P2",
    "date": "2026-06-21",
    "day_of_week": "일요일",
    "period": "2교시 (11:30~13:00)",
    "category": "토익",
    "learning_goal": "LC 고난도 소거법 훈련",
    "learning_content": "Part 2 우회적 답변 문항 음원을 다시 들으며 오답 지문을 소거하는 정교한 청취 훈련",
    "is_completed": false
  },
  {
    "id": "W3-D7-P3",
    "date": "2026-06-21",
    "day_of_week": "일요일",
    "period": "3교시 (14:30~16:30)",
    "category": "토익",
    "learning_goal": "Part 5·6 빈출 단어 바스켓 정리",
    "learning_content": "지금까지 풀었던 모든 기출 단어 중 헷갈렸던 고난도 어휘 무한 암기 체제 돌입",
    "is_completed": false
  },
  {
    "id": "W3-D7-P4",
    "date": "2026-06-21",
    "day_of_week": "일요일",
    "period": "4교시 (16:30~17:30)",
    "category": "종합",
    "learning_goal": "4주차 토익 100% 올인 로드맵 셋팅",
    "learning_content": "오픽이 완전히 끝났으므로 남은 1주일간 토익 점수 극대화를 위한 전방위 계획 수립",
    "is_completed": false
  },
  {
    "id": "W4-D1-P1",
    "date": "2026-06-22",
    "day_of_week": "월요일",
    "period": "1교시 (06:00~07:00)",
    "category": "토익",
    "learning_goal": "아침 RC Part 5 어휘 적응 훈련",
    "learning_content": "잠 깨는 아침 시간을 활용해 품사 구별 및 명사/동사 어휘 매칭 30문항 풀이",
    "is_completed": false
  },
  {
    "id": "W4-D1-P2",
    "date": "2026-06-22",
    "day_of_week": "월요일",
    "period": "2교시 (19:00~20:00)",
    "category": "토익",
    "learning_goal": "실전 봉투 모의고사 4회 - LC 파트",
    "learning_content": "실전용 LC 음원을 틀어두고 Part 1~4까지 중간 마킹을 포함해 정독 청취 풀이",
    "is_completed": false
  },
  {
    "id": "W4-D1-P3",
    "date": "2026-06-22",
    "day_of_week": "월요일",
    "period": "3교시 (20:00~21:00)",
    "category": "토익",
    "learning_goal": "실전 봉투 모의고사 4회 - RC 파트",
    "learning_content": "정확히 75분을 타이머 셋팅하고 마킹 시간 5분을 제외한 시간 내에 100문항 풀이",
    "is_completed": false
  },
  {
    "id": "W4-D1-P4",
    "date": "2026-06-22",
    "day_of_week": "월요일",
    "period": "4교시 (21:00~22:00)",
    "category": "토익",
    "learning_goal": "4회 모의고사 오답 신속 분석",
    "learning_content": "풀이 직후 바로 채점하여 틀린 문제의 문법 구조 분석 및 단어장 누적",
    "is_completed": false
  },
  {
    "id": "W4-D2-P1",
    "date": "2026-06-23",
    "day_of_week": "화요일",
    "period": "1교시 (06:00~07:00)",
    "category": "토익",
    "learning_goal": "아침 LC 파트 음원 청취 훈련",
    "learning_content": "Part 2 빈출 함정 유형(동음이의어 소거) 음원 청취 및 직관적 정답 고르기 훈련",
    "is_completed": false
  },
  {
    "id": "W4-D2-P2",
    "date": "2026-06-23",
    "day_of_week": "화요일",
    "period": "2교시 (19:00~20:00)",
    "category": "토익",
    "learning_goal": "실전 봉투 모의고사 5회 - LC 파트",
    "learning_content": "LC 100문항 실전 연속 응시 및 스키밍 리듬 완벽 유지",
    "is_completed": false
  },
  {
    "id": "W4-D2-P3",
    "date": "2026-06-23",
    "day_of_week": "화요일",
    "period": "3교시 (20:00~21:00)",
    "category": "토익",
    "learning_goal": "실전 봉투 모의고사 5회 - RC 파트",
    "learning_content": "실전 모의고사 RC 100문항 타임어택 풀이 및 Part 7 후반부 시간 초과 여부 확인",
    "is_completed": false
  },
  {
    "id": "W4-D2-P4",
    "date": "2026-06-23",
    "day_of_week": "화요일",
    "period": "4교시 (21:00~22:00)",
    "category": "토익",
    "learning_goal": "5회 모의고사 피드백 및 교정",
    "learning_content": "연계 정보 파악 실패로 틀린 삼중 지문 연계 고리 역추적 및 오답노트 정리",
    "is_completed": false
  },
  {
    "id": "W4-D3-P1",
    "date": "2026-06-24",
    "day_of_week": "수요일",
    "period": "1교시 (06:00~07:00)",
    "category": "토익",
    "learning_goal": "RC Part 6 문장 삽입 단서 잡기",
    "learning_content": "Part 6 지문 내 알맞은 문장 고르기 유연성 확보를 위한 앞뒤 맥락 추론 훈련",
    "is_completed": false
  },
  {
    "id": "W4-D3-P2",
    "date": "2026-06-24",
    "day_of_week": "수요일",
    "period": "2교시 (19:00~20:00)",
    "category": "토익",
    "learning_goal": "실전 봉투 모의고사 6회 - LC 파트",
    "learning_content": "Part 3·4 성우가 정답 단서를 던지기 전 문제를 완벽히 파악하는 스키밍 고도화",
    "is_completed": false
  },
  {
    "id": "W4-D3-P3",
    "date": "2026-06-24",
    "day_of_week": "수요일",
    "period": "3교시 (20:00~21:00)",
    "category": "토익",
    "learning_goal": "실전 봉투 모의고사 6회 - RC 파트",
    "learning_content": "실전 난이도 6회 RC 파트 풀이 진행 및 Part 5 고난도 어휘 정답률 체크",
    "is_completed": false
  },
  {
    "id": "W4-D3-P4",
    "date": "2026-06-24",
    "day_of_week": "수요일",
    "period": "4교시 (21:00~22:00)",
    "category": "토익",
    "learning_goal": "6회 모의고사 오답 분석 완료",
    "learning_content": "LC 패러프레이징 단어 매칭 및 RC 품사 혼동 문제 최종 오답 정리",
    "is_completed": false
  },
  {
    "id": "W4-D4-P1",
    "date": "2026-06-25",
    "day_of_week": "목요일",
    "period": "1교시 (06:00~07:00)",
    "category": "토익",
    "learning_goal": "고난도 RC 어휘 누적 리스트 암기",
    "learning_content": "1~4주차 동안 오답노트에 정리했던 모든 고난도 어휘 눈으로 빠르게 스캔 및 암기",
    "is_completed": false
  },
  {
    "id": "W4-D4-P2",
    "date": "2026-06-25",
    "day_of_week": "목요일",
    "period": "2교시 (19:00~20:00)",
    "category": "토익",
    "learning_goal": "실전 봉투 모의고사 7회 - LC 파트",
    "learning_content": "최종 시험 직전 마지막 실전 모의고사 LC 파트 집중력 흐트러짐 없이 풀이",
    "is_completed": false
  },
  {
    "id": "W4-D4-P3",
    "date": "2026-06-25",
    "day_of_week": "목요일",
    "period": "3교시 (20:00~21:00)",
    "category": "토익",
    "learning_goal": "실전 봉투 모의고사 7회 - RC 파트",
    "learning_content": "마지막 모의고사 RC 100문항 풀이 및 940점 이상 목표 달성 가능성 최종 타겟팅",
    "is_completed": false
  },
  {
    "id": "W4-D4-P4",
    "date": "2026-06-25",
    "day_of_week": "목요일",
    "period": "4교시 (21:00~22:00)",
    "category": "토익",
    "learning_goal": "7회 모의고사 파이널 오답노트 작성",
    "learning_content": "마지막으로 틀린 문제를 완벽 분석하여 시험장에 들고 갈 핵심 오답 바스켓 완성",
    "is_completed": false
  },
  {
    "id": "W4-D5-P1",
    "date": "2026-06-26",
    "day_of_week": "금요일",
    "period": "1교시 (06:00~07:00)",
    "category": "토익",
    "learning_goal": "최종 시험 전날 RC 파이널 스크리닝",
    "learning_content": "취약 문법 공식 30선 및 고난도 전치사/접속사 리스트 최종 눈도장",
    "is_completed": false
  },
  {
    "id": "W4-D5-P2",
    "date": "2026-06-26",
    "day_of_week": "금요일",
    "period": "2교시 (19:00~20:00)",
    "category": "토익",
    "learning_goal": "LC Part 2 우회적 답변 음원 100선 청취",
    "learning_content": "정답이 바로 들리지 않는 고난도 청취 지문에 유연하게 소거법 적용하는 최종 감각 예열",
    "is_completed": false
  },
  {
    "id": "W4-D5-P3",
    "date": "2026-06-26",
    "day_of_week": "금요일",
    "period": "3교시 (20:00~21:00)",
    "category": "토익",
    "learning_goal": "누적 오답노트 전면 정독",
    "learning_content": "6월 한 달 동안 생성한 나만의 토익 오답노트를 처음부터 끝까지 정독하며 약점 봉쇄",
    "is_completed": false
  },
  {
    "id": "W4-D5-P4",
    "date": "2026-06-26",
    "day_of_week": "금요일",
    "period": "4교시 (21:00~22:00)",
    "category": "종합",
    "learning_goal": "토익 수험표 및 준비물 셋팅",
    "learning_content": "연필, 지우개, 신분증 구비 및 고사장 위치 재확인 후 최상의 컨디션을 위해 조기 취침",
    "is_completed": false
  },
  {
    "id": "W4-D6-P1",
    "date": "2026-06-27",
    "day_of_week": "토요일",
    "period": "1교시 (09:00~12:30)",
    "category": "토익",
    "learning_goal": "토익 정기 변경 실전 응시 및 940점 돌파",
    "learning_content": "고사장 입실 후 시간 안배 루틴(Part 5,6 15분 마감 후 Part 7 진입) 준수하여 최종 응시",
    "is_completed": false
  },
  {
    "id": "W4-D6-P2",
    "date": "2026-06-27",
    "day_of_week": "토요일",
    "period": "2교시 (14:00~16:00)",
    "category": "종합",
    "learning_goal": "시험 복기 및 한달간의 어학 레이스 마무리",
    "learning_content": "커뮤니티 정답 맞춰보기 기능을 통한 대략적인 가채점 및 6월 어학 대장정 종료",
    "is_completed": false
  },
  {
    "id": "W4-D6-P3",
    "date": "2026-06-27",
    "day_of_week": "토요일",
    "period": "3교시 (16:00~18:00)",
    "category": "종합",
    "learning_goal": "개인 정비 및 자유 시간",
    "learning_content": "치열했던 한 달을 보상하는 리프레시 타임 확보",
    "is_completed": false
  },
  {
    "id": "W4-D6-P4",
    "date": "2026-06-27",
    "day_of_week": "토요일",
    "period": "4교시 (18:00~22:00)",
    "category": "종합",
    "learning_goal": "7월 자격증(정보처리기사/한국사) 교재 준비",
    "learning_content": "다음 달 시작할 정보처리기사 실기 및 한국사 교재 서칭 및 구매 예약 완료",
    "is_completed": false
  },
  {
    "id": "W4-D7-P1",
    "date": "2026-06-28",
    "day_of_week": "일요일",
    "period": "1교시 (09:00~12:00)",
    "category": "종합",
    "learning_goal": "전체 6월 앱 구동 및 리포트 검증",
    "learning_content": "한 달 치 '오늘체크'의 true/false 값을 토대로 주간 및 월간 전체 리포트 그래프 최종 마감",
    "is_completed": false
  },
  {
    "id": "W4-D7-P2",
    "date": "2026-06-28",
    "day_of_week": "일요일",
    "period": "2교시 (13:00~15:00)",
    "category": "종합",
    "learning_goal": "7월 로드맵 JSON 빌드업 준비",
    "learning_content": "한국사 및 정보처리기사 실기 과목을 앱 데이터베이스에 적재할 로드맵 뼈대 설계",
    "is_completed": false
  },
  {
    "id": "W4-D7-P3",
    "date": "2026-06-28",
    "day_of_week": "일요일",
    "period": "3교시 (15:00~18:00)",
    "category": "종합",
    "learning_goal": "자유 휴식 및 충전",
    "learning_content": "7월 하반기 자격증 연쇄 취득 레이스를 위한 체력 충전 및 휴식",
    "is_completed": false
  },
  {
    "id": "W4-D7-P4",
    "date": "2026-06-28",
    "day_of_week": "일요일",
    "period": "4교시 (19:00~22:00)",
    "category": "종합",
    "learning_goal": "6월 마감 피드백 작성",
    "learning_content": "어학 목표 점수 도달 예측 분석 및 7월 학습 앱 탭 전환 최종 확인 완료",
    "is_completed": false
  }
];
