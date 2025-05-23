import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { storyCreationState, characterInfoState } from '../recoil/atoms';
import BaseScreenLayout from '../components/BaseScreenLayout';
import styled from 'styled-components';
import cloudMkGif from '../assets/images/cloudmk4.gif';
import Lottie from 'react-lottie-player';
import thinkAnimation from '../assets/thinkAnimation.json';

const displayToBackendMap = {
  // 장르 (genre)
  '일상': 'life',
  '마법': 'magic',
  '영웅': 'hero',
  '액션': 'action',
  '모험': 'adventure',

  // 장소 (place)
  '우주': 'space',
  '왕국': 'kingdom',
  '산': 'mountain',
  '바다': 'sea',
  '학교': 'school',
  '집': 'home',
};

const storyQuestions = [
  { key: 'genre', question: '장르를 선택해 주세요.', options: ['일상', '마법', '영웅', '액션', '모험'] },
  { key: 'place', question: '장소를 선택해 주세요.', options: ['우주', '왕국', '산', '바다', '학교', '집'] },
];

const OptionsContainer = styled.div`
  position: relative;
  width: 100%;
  height: 13.75rem;
  margin-top: -4rem;
  z-index: 2;
`;

const OptionItem = styled.div`
  position: absolute;
`;

/* active 여부에 따라 크게(1.2) 혹은 작게(0.8) 스케일, transition 0.6s */
const CloudButton = styled.div`
  background: url(${props => props.gif}) no-repeat center/contain;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  font-weight: bold;
  color: #333;
  cursor: default; /* pointer 아닌 기본 커서 */
  user-select: none;
  transition: transform 0.6s ease;
  transform: scale(${props => (props.active ? 1.3 : 1.15)});
  &:hover {
    transform: scale(${props => (props.active ? 1.6 : 1.6)});
    transform: scale(1.6);
  }
  pointer-events: none; /* 이 컨테이너는 클릭 못함 */
  position: relative;
  @media (min-width: 360px) {
    width: 4.5rem;
    height: 4.5rem;
  }
  @media (min-width: 720px) {
    width: 5.5rem;
    height: 5.5rem;
  }
  @media (min-width: 1080px) {
    width: 6.5rem;
    height: 6.5rem;
  }
  @media (min-width: 1440px) {
    width: 6.5rem;
    height: 6.5rem;
  }
`;

const ClickableText = styled.div`
  pointer-events: all;  /* 클릭 가능 */
  cursor: pointer;
  background: rgba(255, 255, 255, 0.001); /* 클릭 안정성용 투명 배경 */
  padding: 0.25rem 0.5rem;
  border-radius: 0.5rem;
  z-index: 2;
  font-weight: bold;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const ResponsiveLottie = styled(Lottie)`
  position: fixed;
  left: 50%;
  bottom: 0.7rem;
  transform: translateX(-50%);
  height: 26rem;
  min-width: 40rem;
  z-index: 1;

  @media (min-height: 700px) {
    height: 32rem;
  }

  @media (min-height: 800px) {
    height: 36rem;
  }

  @media (min-height: 900px) {
    height: 40rem;
  }

  @media (min-height: 1000px) {
    height: 44rem;
  }
`;

export default function StoryQuestionScreen() {
  const navigate = useNavigate();
  const [storyData, setStoryData] = useRecoilState(storyCreationState);
  const [characterInfo] = useRecoilState(characterInfoState);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [positions, setPositions] = useState([]);
  const [showThree, setShowThree] = useState(true); // true → 3개, false → 2개
  const audioRef = useRef(null);

  const current = storyQuestions[questionIndex];
  const optionsCount = current.options.length;
  const firstGroupSize = 3;

  // 옵션 위치 계산 (기존 로직 그대로)
  useEffect(() => {
    const count = optionsCount;
    const rows = Math.ceil(Math.sqrt(count));
    const cols = Math.ceil(count / rows);
    const cellW = 100 / cols;
    const cellH = 100 / rows;
    const cells = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        cells.push([r, c]);
      }
    }
    const shuffled = cells.sort(() => Math.random() - 0.5).slice(0, count);
    const newPos = shuffled.map(([r, c]) => {
      const padX = cellW * 0.42;
      const padY = cellH * 0.42;
      const left = c * cellW + padX + Math.random() * (cellW - 2 * padX);
      const top = r * cellH + padY + Math.random() * (cellH - 2 * padY);
      return { left: `${left}%`, top: `${top}%` };
    });
    setPositions(newPos);
  }, [questionIndex, optionsCount]);

  // 1.5초마다 3개/2개 토글
  useEffect(() => {
    setShowThree(true);
    const iv = setInterval(() => {
      setShowThree(prev => !prev);
    }, 1500);
    return () => clearInterval(iv);
  }, [questionIndex]);

  // TTS 읽기 (기존 로직 그대로)
  useEffect(() => {
    const speak = async () => {
      if (audioRef.current) {
        audioRef.current.pause();
        URL.revokeObjectURL(audioRef.current.src);
      }
      try {
        const res = await fetch('http://localhost:5001/tts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: current.question })
        });
        if (!res.ok) throw new Error('TTS 요청 실패');
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const audio = new Audio(url);
        audioRef.current = audio;
        audio.play();
      } catch (err) {
        console.error('TTS 에러:', err);
      }
    };
    speak();
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        URL.revokeObjectURL(audioRef.current.src);
      }
    };
  }, [current.question]);

  const handleSelect = async (option) => {
    const key = current.key;
    const charID = parseInt(characterInfo[0].charId, 10);
    const backendOption = displayToBackendMap[option];
    setStoryData(prev => ({
      ...prev,
      charId: charID,
      ...(key === 'genre' && { genre: backendOption }),
      ...(key === 'place' && { place: backendOption }),
    }));

    if (questionIndex < storyQuestions.length - 1) {
      setQuestionIndex(i => i + 1);
      return;
    }

    try {
      const payload = {
        charId: charID,
        genre: key === 'genre' ? backendOption : storyData.genre,
        place: key === 'place' ? backendOption : storyData.place,
      };

      console.log('보내는 payload:', payload);

      const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/intro`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      console.log('응답 코드:', res.status);

      if (!res.ok) {
        const errorText = await res.text();
        console.error('❌ 스토리 생성 실패:', errorText);
        throw new Error('초기 스토리 생성 실패');
      }

      const contentType = res.headers.get('Content-Type');
      let data;

      if (contentType && contentType.includes('application/json')) {
        data = await res.json();
      } else {
        const resText = await res.text();
        console.warn('⚠️ 예상 외의 텍스트 응답:', resText);
        try {
          data = JSON.parse(resText);
        } catch (err) {
          throw new Error('응답 파싱 실패: JSON 형식이 아님');
        }
      }

      setStoryData(prev => ({
        ...prev,
        step: 1,
        history: [data.story],
        story: data.story,
        image: data.imgUrl,
        choices: data.choices,
        question: data.question,
      }));

      navigate('/confirm-story');
    } catch (error) {
      console.error('스토리 생성 중 에러 발생:', error);
      alert('초기 스토리 생성에 실패했습니다.');
    }
  };

  return (
    <BaseScreenLayout
      progressText={`${questionIndex + 1} / ${storyQuestions.length}`}
      progressCurrent={questionIndex + 1}
      progressTotal={storyQuestions.length}
      title={current.question}
      subTitle="이야기에 대해 말해 주세요."
    >
      <OptionsContainer>
        {current.options.map((opt, idx) => {
          // showThree=true면 idx<3, false면 idx>=3만 active
          const isActive = showThree ? idx < firstGroupSize : idx >= firstGroupSize;
          return (
            <OptionItem key={opt} style={positions[idx]}>
              <CloudButton gif={cloudMkGif} active={isActive}>
                <ClickableText onClick={() => handleSelect(opt)}>
                  {opt}
                </ClickableText>
              </CloudButton>
            </OptionItem>
          );
        })}
      </OptionsContainer>

      <ResponsiveLottie
        loop
        animationData={thinkAnimation}
        play
      />
    </BaseScreenLayout>
  );
}