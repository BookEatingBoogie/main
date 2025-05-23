import React, { useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import BaseScreenLayout from '../components/BaseScreenLayout';
import dokkaebiFrame1 from '../assets/images/dokkaebi_loading1.png';
import dokkaebiFrame2 from '../assets/images/dokkaebi_loading2.png';

const frames = [dokkaebiFrame1, dokkaebiFrame2];

const CreatingStoryScreen = () => {
  const navigate = useNavigate();
  const [frameIndex, setFrameIndex] = useState(0);

  useEffect(() => {
    // 1) 실제론 AI API 호출 or WebSocket 대기
    // 2) 여기선 예시로 3초 후 ResultScreen 이동
    const interval = setInterval(() => {
        setFrameIndex((prev) => (prev === 0 ? 1 : 0));
      }, 500);

    const timer = setTimeout(() => {
      navigate('/result'); // 로딩 끝 -> ResultScreen
    }, 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [navigate]);

  return (
    <BaseScreenLayout
      progressText="이야기 생성 중"
      title="도깨비가 이야기를 만들고 있어요!"
      subTitle="잠시만 기다려 주세요..."
      imageSrc={frames[frameIndex]}
      alt="도깨비 로딩"
      imageWidth={200}
    >
    </BaseScreenLayout>
  );
};

export default CreatingStoryScreen;