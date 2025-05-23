import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { characterInfoState } from '../recoil/atoms';
import { useNavigate } from 'react-router-dom';
import BaseScreenLayout from '../components/BaseScreenLayout';
import silhouetteImg from '../assets/images/silhouette.png';
import RoundedButton from '../components/RoundedButton';
import { postCharacter } from '../api/character';
import styled from 'styled-components';
import dokkaebiJumping from '../assets/images/dokkaebi_jumping.gif';

const Overlay = styled.div`
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6); /* 썬팅 느낌 */
  display: flex;
  align-items: center;
  justify-content: center;
`;

const OverlayImage = styled.img`
  width: 25rem;
  height: auto;
  border-radius: 40px;
`;

export default function CharacterQuestionScreen() {
  const navigate = useNavigate();
  const [characterInfo, setCharacterInfo] = useRecoilState(characterInfoState);
  const [name, setName] = useState(characterInfo[0]?.name || '');
  const [loading, setLoading] = useState(false);
  const questionText = '주인공의 이름이 무엇인가요?';

  // 마운트 시 TTS 자동 실행
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          "http://localhost:5001/tts",
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: questionText }),
          }
        );
        if (!res.ok) throw new Error('TTS 요청 실패');
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const audio = new Audio(url);
        audio.play();
      } catch (err) {
        console.error('TTS 오류:', err);
      }
    })();
  }, []); // 빈 배열: 최초 1회만 실행

  const handleNext = async () => {
    if (!name.trim()) return;
    setLoading(true);

    // 1) Recoil에 이름 저장
    setCharacterInfo(prev => {
      const first = prev[0];
      return [{ ...first, name: name.trim() }, ...prev.slice(1)];
    });

    try {
      // 2) API 호출
      const payload = {
        charName: name.trim(),
        userImg: characterInfo[0]?.userImg,  // 방금 S3에 업로드된 URL
      };
      const result = await postCharacter(payload);
      console.log('✅ BASE URL:', process.env.REACT_APP_API_BASE_URL)
      console.log("📦 서버 응답:", result);
      console.log("🔎 status:", result.status);
      console.log("🔎 message:", result.message);
      console.log("🔎 charImg:", result.charImg);

      console.log("🚀 요청 payload:", payload);
      if (result.success) {
        setCharacterInfo(prev => {
          const first = prev[0];
          return [{ ...first, img: result.charImg, charId: result.charId, }, ...prev.slice(1)];
        });
        navigate('/confirm-character');
      } else {
        alert(result.message || '캐릭터 생성에 실패했습니다.');
      }
    } catch (error) {
      console.error('postCharacter error:', error);
      alert('서버 오류로 캐릭터 정보를 등록하지 못했습니다.');
      //navigate('/confirm-character');
    }
    finally {
    setLoading(false); // 🔥 로딩 종료 (성공/실패와 상관없이)
  }
  };

  return (
    <>
    <BaseScreenLayout
      progressText="2/3"
      progressCurrent={2}
      progressTotal={3}
      title={`주인공의 이름이\n무엇인가요?`}
      subTitle="이름을 입력하고 다음으로 넘어가세요."
      imageSrc={silhouetteImg}
      imageBottom={50}
    >
      <input
        type="text"
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="이름 입력"
        style={{
          width: '100%',
          padding: '12px',
          fontSize: '16px',
          borderRadius: '8px',
          border: '1px solid #ccc',
          marginBottom: '20px'
        }}
      />
      <RoundedButton onClick={handleNext}>
        확인
      </RoundedButton>
    </BaseScreenLayout>

    {loading && (
        <Overlay>
          <OverlayImage src={dokkaebiJumping} alt="로딩 중..." />
        </Overlay>
      )}
    </>
  );
}