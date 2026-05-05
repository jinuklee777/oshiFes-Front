export const events = [
  {
    id: 1,
    titleLines: ['원피스 25주년', '기념 전시'],
    shortTitle: '원피스 25주년 기념 전시',
    ip: 'ONE PIECE',
    ipKo: '원피스',
    ipColor: '#D32F2F',
    ipColorDark: '#B71C1C',
    startDate: '4.15',
    endDate: '4.29',
    daysLeft: 0,
    isUrgent: true,
    urgencyLabel: '오늘 마감',
    location: '여의도 더현대 6F',
    type: '아트전시',
    description:
      '원피스 연재 25주년을 기념한 대규모 아트 전시입니다. 오다 에이이치로의 미공개 원화와 전 세계 팬아트가 함께하는 특별한 전시로, 한국 단독 전시 기간이 오늘 마감됩니다.',
    tags: ['아트전시', '원화', '25주년', '한정굿즈']
  },
  {
    id: 2,
    titleLines: ['블루 아카이브', '3.5주년 팝업스토어'],
    shortTitle: '블루 아카이브 3.5주년 팝업',
    ip: 'BLUE ARCHIVE',
    ipKo: '블루 아카이브',
    ipColor: '#1E88E5',
    ipColorDark: '#1565C0',
    startDate: '4.25',
    endDate: '4.30',
    daysLeft: 1,
    isUrgent: true,
    urgencyLabel: 'D-1',
    location: '홍대 무신사 스탠다드 2F',
    type: '팝업스토어',
    description:
      '블루 아카이브 3.5주년을 기념하여 홍대 무신사 스탠다드에서 공식 팝업스토어를 운영합니다. 한정 굿즈 판매, 포토 부스 체험, 특별 이벤트가 준비되어 있습니다.',
    tags: ['팝업스토어', '한정굿즈', '포토부스']
  },
  {
    id: 3,
    titleLines: ['스파이×패밀리', '콜라보 카페'],
    shortTitle: '스파이×패밀리 콜라보 카페',
    ip: 'SPY×FAMILY',
    ipKo: '스파이×패밀리',
    ipColor: '#7B1FA2',
    ipColorDark: '#4A148C',
    startDate: '4.29',
    endDate: '5.14',
    daysLeft: 15,
    isUrgent: false,
    urgencyLabel: null,
    location: '신사 스타필드 B1',
    type: '콜라보카페',
    description:
      '스파이×패밀리 공식 콜라보 카페입니다. 아냐, 로이드, 요르를 테마로 한 한정 음료와 디저트를 즐기고, 전용 포토존에서 인증샷을 남겨보세요.',
    tags: ['콜라보카페', '한정메뉴', '포토존']
  },
  {
    id: 4,
    titleLines: ['하이큐!!', '굿즈 페어'],
    shortTitle: '하이큐!! 굿즈 페어',
    ip: 'HAIKYU!!',
    ipKo: '하이큐!!',
    ipColor: '#F57C00',
    ipColorDark: '#E65100',
    startDate: '5.2',
    endDate: '5.15',
    daysLeft: null,
    isUrgent: false,
    urgencyLabel: null,
    location: '코엑스 B2 아티움홀',
    type: '굿즈페어',
    description:
      '하이큐!! 공식 굿즈 페어입니다. 한정판 아크릴 스탠드, 클리어파일, 의류 등 다양한 상품을 만나볼 수 있습니다. 사전 예약이 필요한 행사입니다.',
    tags: ['굿즈페어', '한정판', '사전예약']
  },
  {
    id: 5,
    titleLines: ['귀멸의 칼날', '아트 트리뷰트전'],
    shortTitle: '귀멸의 칼날 아트전',
    ip: 'KIMETSU',
    ipKo: '귀멸의 칼날',
    ipColor: '#388E3C',
    ipColorDark: '#1B5E20',
    startDate: '5.10',
    endDate: '6.7',
    daysLeft: null,
    isUrgent: false,
    urgencyLabel: null,
    location: 'DDP 동대문 디자인플라자 2F',
    type: '아트전시',
    description:
      '국내외 아티스트가 참여한 귀멸의 칼날 아트 트리뷰트 전시입니다. 공식 일러스트와 팬아트가 어우러지는 대형 전시로 구성됩니다.',
    tags: ['아트전시', '팬아트', '트리뷰트']
  }
];

export const birthday = {
  characterName: '히나타 쇼요',
  series: '하이큐!!',
  ipColor: '#F57C00',
  ipColorDark: '#E65100',
  date: '4월 29일'
};

const addDot = (target, day, color) => {
  if (!target[day]) {
    target[day] = [];
  }
  if (target[day].length < 3) {
    target[day].push(color);
  }
};

export const calendarDots = (() => {
  const dots = {};

  for (let day = 15; day <= 29; day += 1) {
    addDot(dots, day, '#D32F2F');
  }
  for (let day = 25; day <= 30; day += 1) {
    addDot(dots, day, '#1E88E5');
  }
  addDot(dots, 29, '#7B1FA2');
  addDot(dots, 30, '#7B1FA2');

  return dots;
})();
