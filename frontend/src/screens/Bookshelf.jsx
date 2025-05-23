import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import Block from '../components/Block';
import Empty from '../components/Empty';
import PopCard from '../components/PopCard';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import defaultImg from '../assets/images/testImg.png';

const BookshelfContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  min-height: 100vh;
  position: relative;
`;

const EditButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding: 0 1rem 0.5rem 1rem;
`;

const EditButton = styled.button`
  border-radius: 6.25rem;
  border: 1px solid rgba(57, 61, 64, 0.5);
  background: rgba(243, 243, 243, 0.58);
  color: #1A202B;
  font-family: Pretendard;
  font-size: 1rem;
  font-weight: 300;
  display: flex;
  padding: 0.25rem 1rem;
  align-items: center;
  gap: 0.25rem;
  @media (max-width: 480px) {
    font-size: 0.9rem;
    padding: 0.2rem 0.75rem;
  }
`;

const Separator = styled.hr`
  width: 100%;
  border: none;
  border-top: 1px solid #e0e0e0;
  margin: 0.25rem 0;
`;

const CharacterCategoryWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  background-color: #fff;
  margin-top: 1rem;
`;

const CharacterCategoryContainer = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 0.75rem;
  padding: 0;
  width: max-content;
`;

const CharacterCircle = styled.div`
  width: 55px;
  height: 64px;
  overflow: hidden;
  border: ${(props) => (props.selected ? '2px solid #FFC75F' : '1px solid #ccc')};
  background-color: ${(props) => (props.selected ? '#FFF9EC' : '#fff')};
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  border-radius: 1.5rem 1.5rem 0 0;
`;

const CharacterImg = styled.img`
  width: auto;
  height: 180px;
  object-fit: cover;
  transform: translateY(60px);
`;

const CharacterLabel = styled.span`
  font-size: 0.75rem;
  color: ${(props) => (props.selected ? '#1A202B' : '#888')};
  font-weight: ${(props) => (props.selected ? '600' : '400')};
  margin-top: 0.3rem;
  width: 100%
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 480px) {
    font-size: 0.7rem;
  }
`;

const CharacterSectionTitle = styled.div`
  width: 100%;
  padding: 1rem 1rem 0.5rem 1rem;
  font-weight: 600;
  font-size: 0.95rem;
  color: #1A202B;
  text-align: center;
  background-color: ${(props) => (props.$hasContent ? '#FFF9EC' : '#fff')};
  @media (max-width: 480px) {
    font-size: 0.85rem;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 0.875rem 1rem 1.5rem 0.875rem;
  gap: 1rem;
  width: 100%;
  min-height: 50vh;
`;

const HighlightedWrapper = styled.div`
  width: 100%;
  background-color: ${(props) => (props.active ? '#FFF9EC' : '#fff')};
  height: 100vh;
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

export default function Bookshelf() {
  const [storyList, setStoryList] = useState([]);
  const [characterList, setCharacterList] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [selectedStory, setSelectedStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/mypage/story`);
        setCharacterList(res.data.characters || []);
        setStoryList(res.data.stories || []);
        console.log('캐릭터 불러오기 성공', res.data.characters);
        console.log('동화 불러오기 성공', res.data.stories);
      } catch (err) {
        console.error('데이터 불러오기 실패', err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);
  

  const handleBlockClick = (story) => setSelectedStory(story);
  const handleClosePopup = () => setSelectedStory(null);
  
  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}년 ${month}월 ${day}일`;    
  };
  const filteredStoryList = selectedCharacter
    ? storyList.filter((story) =>
        story.characters?.some((char) => char.charName === selectedCharacter)
      )
    : storyList;

  const isActiveBg = selectedCharacter !== null && filteredStoryList.length > 0;

  return (
    <BookshelfContainer>
        {!loading && storyList.length > 0 && (
      <Header pageName={"내 책장"} />
    )}

      <CharacterCategoryWrapper>
        <CharacterCategoryContainer>
          <CharacterCircle onClick={() => setSelectedCharacter(null)} selected={selectedCharacter === null}>
            <CharacterLabel selected={selectedCharacter === null}>전체</CharacterLabel>
          </CharacterCircle>

          {characterList.map((char) => (
            <CharacterCircle
              key={char.charId}
              onClick={() => setSelectedCharacter(char.charName)}
              selected={selectedCharacter === char.charName}
            >
              <CharacterImg src={char.charImg || defaultImg} alt={char.charName} />
              <CharacterLabel selected={selectedCharacter === char.charName}>{char.charName}</CharacterLabel>
            </CharacterCircle>
          ))}

        </CharacterCategoryContainer>
      </CharacterCategoryWrapper>

      <Separator />

      {selectedCharacter === null && (
        <EditButtonWrapper>
          <EditButton onClick={() => navigate('/edit-bookshelf')}>편집하기</EditButton>
        </EditButtonWrapper>
      )}

      {selectedCharacter && filteredStoryList.length > 0 && (
        <CharacterSectionTitle $hasContent={true}>
          {selectedCharacter}가 나오는 동화들
        </CharacterSectionTitle>
      )}

      <HighlightedWrapper active={isActiveBg}>
        <ContentContainer>
          {filteredStoryList.length > 0 ? (
            filteredStoryList.map((story) => (
              <Block
                key={story.storyId}
                blockImg={story.coverImg}
                blockName={story.title}
                creationDate={formatDate(story.creationDate)}
                storyId={story.storyId}
                showFavorite={true}
                onClick={() => handleBlockClick(story)}
                withShadow={false}
              />

            ))
          ) : (
            <div style={{ width: '100%', backgroundColor: '#fff', flexGrow: 1 }}>
              <Empty
                title="선택한 캐릭터의 동화가 없어요."
                description="다른 캐릭터를 선택해보세요!"
                buttonText="전체 보기"
                onButtonClick={() => setSelectedCharacter(null)}
              />
            </div>
          )}
        </ContentContainer>
      </HighlightedWrapper>

      {selectedStory && (
        <Overlay onClick={handleClosePopup}>
          <PopCard
            imageSrc={selectedStory.img?.[0] || selectedStory.cover?.testImg}
            imageSize="150px" 
            cardTitle={selectedStory.title}
            subTitle={formatDate(selectedStory.creationDate)}
            description={selectedStory.summary}
            positiveBtnText="열기"
            negativeBtnText="닫기"
            onPositiveClick={() => {
              handleClosePopup();
              navigate(`/reading?file=${selectedStory.content}`);

            }}
            onNegativeClick={handleClosePopup}
            titleFontSize="1.1rem"
            subFontSize="0.9rem"
            descriptionFontSize="0.8rem"
          />

        </Overlay>
      )}

      <BottomNav />
    </BookshelfContainer>
  );
}
