import React, { useState, useRef } from 'react';
import { useRecoilState } from 'recoil';
import { characterInfoState } from '../recoil/atoms';
import { useNavigate } from 'react-router-dom';
import BaseScreenLayout from '../components/BaseScreenLayout';
import GallerySelectButton from '../components/GallerySelectButton';
import AWS from 'aws-sdk';

const REGION = 'ap-northeast-2';
const BUCKET = 'bookeating';
const S3_BASE_URL = `https://${BUCKET}.s3.${REGION}.amazonaws.com/`;

// AWS 설정 (환경변수 사용도 가능)
AWS.config.update({
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  region: REGION,
});

const s3 = new AWS.S3();

const uploadToS3 = async (file) => {
  const key = `character/${file.name}`;

  const uploadParams = {
    Bucket: BUCKET,
    Key: key,
    Body: file,
  };

  return new Promise((resolve, reject) => {
    s3.upload(uploadParams, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(`${S3_BASE_URL}${key}`);
      }
    });
  });
};

const CharacterCreationScreen = () => {
  const navigate = useNavigate();
  const [characterInfo, setCharacterInfo] = useRecoilState(characterInfoState);
  const [isFinished, setIsFinished] = useState(false);
  const fileInputRef = useRef(null);

  // "갤러리에서 사진 찾아오기" 버튼 클릭 -> 파일 인풋 클릭
  const handleSelectImage = () => {
    console.log('갤러리 버튼 클릭: 파일 선택 창 열기');
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // 파일 선택 완료 -> 선택된 파일을 지정된 엔드포인트로 전송
  const handleFileChange = async (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    try {
      const s3Url = await uploadToS3(file);
      console.log('S3 업로드 완료:', s3Url);

      // characterInfoState의 첫 번째 캐릭터 정보 업데이트 (이미지 URL 반영)
      setCharacterInfo(prev => {
        const first = prev[0] || {};
        const updated = { ...first, userImg: s3Url };
        return [updated, ...prev.slice(1)];
      });
      setIsFinished(true); 
      setTimeout(() => {
        navigate('/character-question');
      }, 1500);
    } catch (error) {
      console.error('파일 업로드 중 오류:', error);
    }
  };
  
  return (
    <BaseScreenLayout
      progressText="1/3"
      progressCurrent={1}
      progressTotal={3}
      title={`주인공은 어떻게\n생겼나요?`}
      subTitle={
        "주인공이 될 인물의 사진을 업로드 해주세요."
      }
      imageSrc={null}
    > 
      <GallerySelectButton
      onClick={handleSelectImage}
      isFinished={isFinished}
      />

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
    </BaseScreenLayout>
  );
};

export default CharacterCreationScreen;