const posts = [
  {
    sports: 'futsal',
    title: '골잡이 선수 1명 구합니다!',
    division: 'member',
    content: '골 냄새를 잘 맡는 최전방 공격수 1명을 모집합니다!!!',
    startTime: '2021-11-13 13:00',
    endTime: '2021-11-13 14:00',
    status: '모집중',
    phoneOpen: true,
    addressName: '경기 용인시 처인구 유방동 405-1',
    userId: 1,
    groundId: 1
  },
  {
    sports: 'futsal',
    title: '수비수 선수 2명 구한다. 질문은 받지 않는다.',
    division: 'member',
    content: '수비수 2명을 모집한다!!!',
    startTime: '2021-11-14 15:00',
    endTime: '2021-11-14 16:00',
    status: '모집완료',
    phoneOpen: true,
    addressName: '경기 용인시 기흥구 영덕동 1266',
    userId: 1,
    groundId: 2
  },
  {
    sports: 'futsal',
    title: '짧고 굵게 한 판 붙으실 팀을 구합니다!',
    division: 'match',
    content: '분당차량사업소 하부풋살장에서 경기하실 팀을 찾아요.',
    startTime: '2021-11-20 17:00',
    endTime: '2021-11-20 18:00',
    status: '모집중',
    phoneOpen: false,
    addressName: '경기 용인시 기흥구 보정동 195-6',
    userId: 1,
    groundId: 3
  },
  {
    sports: 'futsal',
    title: '패스의 신 모십니다!!',
    division: 'member',
    content: '대지를 가르는 패스의 소유자 킹갓사비님 모십니다.',
    startTime: '2021-11-20 10:00',
    endTime: '2021-11-20 11:00',
    status: '모집중',
    phoneOpen: true,
    addressName: '경기 용인시 수지구 풍덕천동 29-7',
    userId: 2,
    groundId: 4
  },
  {
    sports: 'futsal',
    title: '플레이스풋볼 토너먼트 참여하실 팀을 모집합니다.',
    division: 'match',
    content: '토너먼트 참여가 가능하신 팀은 연락주세요!',
    startTime: '2021-11-20 10:00',
    endTime: '2021-11-20 11:00',
    status: '모집완료',
    phoneOpen: true,
    addressName: '경기 용인시 처인구 모현읍 매산리 563-3',
    userId: 2,
    groundId: 5
  },
  {
    sports: 'futsal',
    title: '수비2, 공격수1 모집해요~',
    division: 'member',
    content: '팀원 구하고 있어요!! 채팅에 소개 남겨주시기 바랍니다~',
    startTime: '2021-11-20 10:00',
    endTime: '2021-11-20 11:00',
    status: '모집중',
    phoneOpen: false,
    addressName: '경기 용인시 처인구 모현읍 일산리 12-8',
    userId: 3,
    groundId: 6
  },
  {
    sports: 'futsal',
    title: '경기 꾸준히 함께 같이 하실 팀이면 좋겠네요',
    division: 'team',
    content: '정기적으로 경기를 함께 할 팀이라면 더 좋을 것 같습니다!',
    startTime: '2021-11-20 10:00',
    endTime: '2021-11-20 11:00',
    status: '모집중',
    phoneOpen: false,
    addressName: '경기 용인시 기흥구 상하동 202-124',
    userId: 3,
    groundId: 7
  },
  {
    sports: 'futsal',
    title: '개인기 좋으신 분 구해요',
    division: 'member',
    content: '발재간이 좋은 선수 구합니다. 번호로 연락주세요~',
    startTime: '2021-11-13 19:00',
    endTime: '2021-11-13 20:00',
    status: '모집중',
    phoneOpen: true,
    addressName: '경기 용인시 처인구 남사읍 전궁리 17',
    userId: 4,
    groundId: 8
  },
  {
    sports: 'futsal',
    title: '센터링 마스터 구합니다요',
    division: 'member',
    content: '센터링 잘 뿌려주시는 분 구합니다용~',
    startTime: '2021-11-14 15:00',
    endTime: '2021-11-14 16:00',
    status: '모집중',
    phoneOpen: true,
    addressName: '경기 용인시 처인구 남사읍 봉명리 646-2',
    userId: 4,
    groundId: 9
  },
  {
    sports: 'futsal',
    title: '경기 뛰고 회식까지 함께 달리실 팀 구해요!',
    division: 'match',
    content: '회식은 삼겹살에 소주입니답!',
    startTime: '2021-11-14 15:00',
    endTime: '2021-11-14 16:00',
    status: '모집완료',
    phoneOpen: true,
    addressName: '경기 용인시 처인구 남동 555',
    userId: 5,
    groundId: 10
  },
  {
    sports: 'futsal',
    title: '감아차기 오지는 분 구합니다',
    division: 'member',
    content: '내가 공을 오지게 잘 감는다? 언제든 연락주십쇼',
    startTime: '2021-11-14 15:00',
    endTime: '2021-11-14 16:00',
    status: '모집중',
    phoneOpen: true,
    addressName: '경기 용인시 기흥구 구갈동 350',
    userId: 5,
    groundId: 11
  },
  {
    sports: 'futsal',
    title: '슬슬 몸 푸시면서 경기 뛸 팀을 찾습니다.',
    division: 'match',
    content: '가볍게 경기감 찾으실 팀을 구해용',
    startTime: '2021-11-20 18:00',
    endTime: '2021-11-20 19:00',
    status: '모집중',
    phoneOpen: false,
    addressName: '경기 용인시 기흥구 구갈동 569',
    userId: 5,
    groundId: 12
  },
]

module.exports = posts
