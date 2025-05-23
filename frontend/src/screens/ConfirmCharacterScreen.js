import React from 'react';
import { useRecoilValue } from 'recoil';
import { characterInfoState } from '../recoil/atoms';
import { useNavigate } from 'react-router-dom';
import BaseScreenLayout from '../components/BaseScreenLayout';
import RoundedButton from '../components/RoundedButton';
import styled from 'styled-components';

const FixedButtonWrapper = styled.div`
  position: fixed;
  bottom: 2rem;           // 하단 여백 (조정 가능)
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 200rem;
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  z-index: 10;
`;

// 반응형 이미지 컴포넌트
const CharacterImage = styled.img`
  display: block;
  width: auto;
  height: 18rem;
  border-radius: 50%;
  margin: 0 auto 1.25rem;

  @media (min-height: 700px) {
    height: 22rem;
  }

  @media (min-height: 800px) {
    height: 28rem;
  }

  @media (min-height: 900px) {
    height: 34rem;
  }

  @media (min-height: 1000px) {
    height: 38rem;
  }
`;

export default function ConfirmCharacterScreen() {
  const navigate = useNavigate();
  const characterInfo = useRecoilValue(characterInfoState)[0] || {};
  const characterName = characterInfo.name || '인물이름';
  const characterImg  = characterInfo.img  || null;

  const handleMakeStory = () => {
    navigate('/story-question');
  };

  const handleChangeCharacter = () => {
    navigate('/character-select');
  };

  return (
    <BaseScreenLayout
      progressText="3/3"
      progressCurrent={3}
      progressTotal={3}
      title={`${characterName}!\n이렇게 생겼군요!`}
      subTitle="이 인물로 이야기를 만들어볼까요?"
      imageSrc={null}
    >
      {characterImg && (
        <CharacterImage
          src={characterImg}
          alt={characterName}
        />
      )}

      <FixedButtonWrapper>
        <RoundedButton onClick={handleMakeStory}>
          이야기를 만들래요!
        </RoundedButton>

        <RoundedButton onClick={handleChangeCharacter}>
          다른 인물로 바꿀래요.
        </RoundedButton>
      </FixedButtonWrapper>
    </BaseScreenLayout>
  );
}
