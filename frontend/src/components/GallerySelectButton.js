import React from 'react';
import styled from 'styled-components';
import { IoImageOutline } from 'react-icons/io5';
import Lottie from 'react-lottie-player';
import finishAnimation from '../assets/finishAnimation.json'; // Lottie JSON 파일 경로

const ButtonContainer = styled.div`
  width: 80%;
  background-color: rgba(255, 255, 255, 0.2);
  border: 2px dashed #fff;
  border-radius: 10px;
  color: #fff;
  font-weight: bold;
  font-size: 20px;
  cursor: pointer;
  text-align: center;
  padding: 48px 0;
  white-space: pre-line;
  margin: 0 auto;
  max-width: 21rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;

  &:hover { opacity: 0.9; }
  &:active { opacity: 0.8; }
`;

/**
 * @param {string} label 버튼 텍스트 (기본값)
 * @param {function} onClick 클릭 핸들러
 * @param {boolean} isFinished 완료 상태 플래그
 */
const GallerySelectButton = ({ 
  label = "갤러리에서 \n사진 찾아오기", 
  onClick, 
  isFinished = false 
}) => {
  return (
    <ButtonContainer onClick={onClick}>
      {isFinished
        ? (
          <Lottie
            loop={false}
            play
            animationData={finishAnimation}
            style={{ width: 128, height: 128 }}
          />
        ) : (
          <>
            <IoImageOutline size={60} />
            <span>{label}</span>
          </>
        )
      }
    </ButtonContainer>
  );
};

export default GallerySelectButton;