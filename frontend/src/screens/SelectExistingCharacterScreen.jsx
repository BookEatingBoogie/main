import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { characterInfoState } from '../recoil/atoms';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Block from '../components/Block';
import Empty from '../components/Empty';
import PopCard from '../components/PopCard';
import styled from 'styled-components';

const CharacterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  min-height: 100vh;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 0.875rem 1rem 1.5rem 0.875rem;
  gap: 1rem;
  width: 100%;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(28, 28, 28, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export default function SelectExistingCharacterScreen() {
  const [characterInfo, setCharacterInfo] = useRecoilState(characterInfoState);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const navigate = useNavigate();

  // ✅ 서버에서 캐릭터 목록 fetch로 불러오기
  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/mypage/character`);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();

        const mapped = data.map((char) => ({
          charId: char.charId,
          name: char.charName,
          age: '',         // 백엔드에 없으면 빈 문자열 유지
          gender: '',
          job: '',
          speciality: '',
          note: char.charNote,
          img: char.charImg,
          userImg: '',
        }));

        setCharacterInfo(mapped);
      } catch (error) {
        console.error("캐릭터 불러오기 실패:", error);
      }
    };

    fetchCharacters();
  }, [setCharacterInfo]);

  const handleBlockClick = (character) => {
    setSelectedCharacter(character);
  };

  const handleClosePopup = () => {
    setSelectedCharacter(null);
  };

  const handleSelectCharacter = () => {
    setCharacterInfo((prev) => [
      selectedCharacter,
      ...prev.filter((c) => c.charId !== selectedCharacter.charId),
    ]);
    navigate('/confirm-character');
  };

  return (
    <CharacterContainer>
      <Header pageName="기존 캐릭터 선택" />
      <ContentContainer>
        {characterInfo.length > 0 ? (
          characterInfo.map((char, index) => (
            <Block
              key={index}
              blockImg={char.img || '/default-character.png'}
              blockName={char.name}
              onClick={() => handleBlockClick(char)}
              hideDate={true}
              hideFavorite={true}
              customSize={true}
              withShadow={true}
            />
          ))
        ) : (
          <Empty
            title="기존 캐릭터가 없어요..."
            description="이야기를 생성하면 캐릭터가 추가돼요."
            buttonText="새 이야기 만들기"
            onButtonClick={() => navigate("/character-select")}
          />
        )}
      </ContentContainer>

      {selectedCharacter && (
        <Overlay onClick={handleClosePopup}>
          <div onClick={(e) => e.stopPropagation()}>
            <PopCard
              imageSrc={selectedCharacter.img || '/default-character.png'}
              imageSize="150px"
              cardTitle={selectedCharacter.name}
              subTitle={`${selectedCharacter.gender} | 나이 ${selectedCharacter.age}세 | ${selectedCharacter.job}`}
              description={`${selectedCharacter.speciality}\n${selectedCharacter.note}`}
              positiveBtnText="닫기"
              onPositiveClick={handleClosePopup}
              negativeBtnText="선택하기"
              onNegativeClick={handleSelectCharacter}
              titleFontSize="1.1rem"
              subFontSize="0.9rem"
              descriptionFontSize="0.8rem"
            />
          </div>
        </Overlay>
      )}
    </CharacterContainer>
  );
}