import React from 'react';
import { useNavigate } from 'react-router-dom';
import BaseScreenLayout from '../components/BaseScreenLayout';
import RoundedButton from '../components/RoundedButton';
import dokkaebiImg from '../assets/images/mainCharactor.png';

const CharacterSelectScreen = () => {
  const navigate = useNavigate();

  const handleUseExisting = () => {
    navigate('/select-existing-character');
  };

  const handleUseNew = () => {
    navigate('/create-character');
  };

  return (
    <BaseScreenLayout
      progressText="1/3"
      progressCurrent={1}
      progressTotal={3}
      title={"이야기에는\n주인공이 필요해요!"}
      subTitle="기존 캐릭터를 사용하거나, 새 캐릭터를 만들어 보세요."
      imageSrc={dokkaebiImg}
      imageAlt="도깨비"
    >
      {/* 가운데 영역에 버튼 2개 */}
      <div style={{ marginBottom: '10px' }}>
      <RoundedButton
          onClick={handleUseExisting}
        >
          기존 캐릭터를 사용하기
        </RoundedButton>

        <RoundedButton
          onClick={handleUseNew}
        >
          새 캐릭터를 사용하기
        </RoundedButton>
      </div>
    </BaseScreenLayout>
  );
};

export default CharacterSelectScreen;