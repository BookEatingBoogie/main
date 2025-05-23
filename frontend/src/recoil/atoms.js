import { atom } from 'recoil';
import testImg from '../assets/images/마법사 유원이.webp';
import 서영이 from '../assets/images/testImg.png'
import 유원이 from '../assets/images/유원이.png';
import 민지 from '../assets/images/민지.png';
import 코코 from '../assets/images/코코.png';
import 코코1 from '../assets/images/코코1.png';
import 코코2 from '../assets/images/코코2.png';

export const characterInfoState = atom({
  key: 'characterInfo',
  default: [
    {
      id: '0',
      name: '서영이',
      age: '5',
      gender: '몰라',
      job: '다람쥐',
      speciality: '돈을 잘 벌어',
      ability:'슈퍼맨',
      note: '사람으로 변했다.',
      charId: 4,
      img: 서영이,
      userImg: 'https://bookeating.s3.ap-northeast-2.amazonaws.com/character/img2.jpg"',
    },
    {
      id: '2',
      id: '2',
      name: '유원이',
      age: '5',
      gender: '여자',
      job: '수의사',
      speciality: '동물과 소통이 가능해',
      ability:'소통능력',
      note: '사라지는 동물들을 찾으러 떠난 소녀',
      img: 민지,
      userImg: '',
      charId: 8,
    },
    {
      id: '3',
      name: '코코',
      age: '5',
      gender: '여자',
      job: '수의사',
      speciality: '동물과 소통이 가능해',
      ability:'소통능력',
      note: '사라지는 동물들을 찾으러 떠난 소녀',
      img: 코코,
      userImg: '',
    },
  ],
});

export const storyCreationState = atom({
  key: 'storyCreationState',
  default: {
    charId: 1,                     // 예시 캐릭터 ID
    genre: '모험',                 // 예시 장르
    place: '산',                  // 예시 장소
    history: [
      '옛날 옛적에 용감한 주인공이 산에서 살고 있었어요.',
    ],                            // 예시 히스토리 배열
    story: '깊은 숲속에 꼬마 토끼 토비는 매일같이 새롭고 신나는 것을 찾으러 다녔어요.', // 최신 스토리
    question: '토비는 처음에 어디로 갔을까요?',
    story: '깊은 숲속에 꼬마 토끼 토비는 매일같이 새롭고 신나는 것을 찾으러 다녔어요.깊은 숲속에 꼬마 토끼 토비는 매일같이 새롭고 신나는 것을 찾으러 다녔어요.깊은 숲속에 꼬마 토끼 토비는 매일같이 새롭고 신나는 것을 찾으러 다녔어요.', // 최신 스토리
    question: '토비는 처음에 어디로 갔을까요?토비는 처음에 어디로 갔을까요?',
    image: testImg, // 예시 배경 이미지 URL
    choices: ['산 아래로', '가만히', '정상으로'], // 예시 선택지
    step: 1,                       // 현재 진행 단계
    selectedChoice: '',           // 마지막 선택 값
  },
});

export const storyInfoState = atom({
  key: 'storyInfo',
  default: [
    {
      id: '1',
      title: '코코의 모험기',
      date: '2025.02.01',
      favorite: 'false',
      summary: '마법사 코코와 네로와 함께하는 모험 이야기',
      img: Array(10).fill(코코1),
      cover: testImg,
      characters: ['코코'], // 
    },
    {
      id: '2',
      title: '마법사 코코',
      date: '2025.02.01',
      favorite: 'false',
      summary: '마법사 코코와 네로와 함께하는 모험 이야기',
      img: Array(10).fill(코코2),
      cover: testImg,
      characters: ['코코'], // 
    },
  ],
});

export const userInfoState = atom({
  key: 'userInfo',
  default: [{
    id: 'qwer',
    password: '',
    nickname: '',
    pNumber: '',
  }]
});

export const conversationState = atom({
  key:'conversation',
  default:[{
    conversationId:'',// 메세지 한줄한줄이 들어있는 대화 한 묶음
    userId:'',
    characterId:'',
    qType:'', //질문 종류 
  }]
});

export const messageState = atom({
  key: 'message',
  default: [{
    conversationId: '',
    speaker: '',
    message: '',
    timestamp: '',
  }]
});

export const favoriteStoryIdsState = atom({
  key: 'favoriteStoryIdsState',
  default: [],
});
