import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Draggable from 'react-draggable';
import html2canvas from 'html2canvas';
import axios from 'axios'; 
import { RgbaColorPicker } from 'react-colorful';
import tinycolor from 'tinycolor2';
import AWS from 'aws-sdk';

const REGION = 'ap-northeast-2';
const BUCKET = 'bookeating';
const S3_BASE_URL = `https://${BUCKET}.s3.${REGION}.amazonaws.com/`;

AWS.config.update({
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  region: REGION,
});

const s3 = new AWS.S3();

const uploadToS3 = async (file) => {
  const key = `cover/${file.name}`;
  const uploadParams = {
    Bucket: BUCKET,
    Key: key,
    Body: file,
    ContentType: file.type,
  };

  return new Promise((resolve, reject) => {
    s3.upload(uploadParams, (err, data) => {
      if (err) reject(err);
      else resolve(`${S3_BASE_URL}${key}`);
    });
  });
};

const CoverContainer = styled.div`
  display: flex;
  margin: 5rem auto 0; // 상단의 여백 후 가운데 정렬 
  width: 50vw;
  padding: 2rem;
  background-color: #f2f2f2;
  border-radius: 1rem;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  // flex-wrap: wrap;
  padding-bottom: 5rem;7o

  @media (max-width: 768px) {
    // width: 90vw;
    flex-direction: column;
    padding: 1rem;
    align-items: center;
  }
`;

const CanvasSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%
  height: 90%
`;

const Title = styled.div`
  font-size: 1.1rem;
  font-weight: 800;
  margin-bottom: 0.75rem;
  color: #001840;
  text-align: center;
`;

const Canvas = styled.div`
  aspect-ratio: 2 / 3;                    
  width: 100%;                          
  background-image: url('/back.png');  
  background-size: 100% 100%;          
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  border-radius: 1rem;
  overflow: hidden;

  @media (max-width: 768px) {
    width: 90%
  }
`;


const CapturedCanvas = styled.img`
  width: 500px;
  height: 340px;
  border-radius: 1rem;
  object-fit: cover;

  @media (max-width: 768px) {
    width: 90vw;
    height: 60vw;
  }
`;

const StickerWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const Sticker = styled.img`
  width: ${({ scale }) => 60 * scale}px;
  height: ${({ scale }) => 60 * scale}px;
  user-select: none;
  -webkit-user-drag: none;
  pointer-events: none;
`;

const DeleteButton = styled.button`
  position: absolute;
  top: -10px;
  right: -10px;
  background: red;
  color: white;
  border: none;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  font-size: 0.7rem;
  cursor: pointer;
  display: none;

  ${StickerWrapper}:hover & {
    display: block;
  }
`;

const CanvasText = styled.div`
  position: absolute;
  font-weight:  1000;
  font-size: 2rem;
  cursor: move;
  white-space: nowrap; /* 줄바꿈 방지 */
`;

const CanvasAuthor = styled.div`
  position: absolute;
  font-size: 1rem;
  font-weight: 800;
  cursor: move;
  white-space: nowrap;
`;


const InputArea = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  align-items: center;
`;

const Input = styled.input`
  width: 180px;
  padding: 0.5rem;
  border: 1px solid #aaa;
  border-radius: 0.375rem;
  font-size: 0.9rem;
`;

const SaveButton = styled.button`
  position: fixed;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  padding: 0.6rem 1.5rem;
  background-color: #ffc75f;
  color: #1A202B;
  border: none;
  border-radius: 1.5rem;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  z-index: 200;

  &:hover {
    background-color: #ffb830;
  }
`;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ddd;
  padding: 1rem;
  border-radius: 1rem;
  min-width: 130px;
  max-height: 500px;

  @media (max-width: 768px) {
    flex-direction: row;
    max-height: none;
    overflow-y: visible;
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const SidebarTitle = styled.div`
  font-size: 0.95rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 0.5rem;
  text-align: center;
  flex-shrink: 0;
`;

const StickerList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  overflow-y: auto;
  max-height: 420px;

  @media (max-width: 768px) {
    flex-direction: row;
    max-height: none;
    overflow-y: visible;
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const StickerOption = styled.img`
  width: 80px;
  height: 80px;
  cursor: pointer;
  background-color: #fff;
  border: 2px solid #aaa;
  border-radius: 0.5rem;
  padding: 0.25rem;

  &:hover {
    border-color: #444;
  }
`;
const ResizeHandle = styled.div`
  position: absolute;
  right: -6px;
  bottom: -6px;
  width: 12px;
  height: 12px;
  cursor: nwse-resize;
  z-index: 2;
`;
const TextColorInput = styled.input`
  margin-top: 0.5rem;
  width: 60px;
  height: 30px;
  border: none;
  cursor: pointer;
`;

const TextPositionControls = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const TextAlignButton = styled.button`
  padding: 0.3rem 0.6rem;
  border: 1px solid #aaa;
  border-radius: 0.375rem;
  background-color: white;
  cursor: pointer;
  font-size: 0.8rem;

  &:hover {
    background-color: #eee;
  }
`;


const TextAlignColorRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 0.5rem;
`;
const InputWithColorWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  gap: 0.5rem;
`;

const ColorButton = styled.button`
  margin-left: 0.5rem;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 0.375rem;
  padding: 0.3rem 0.5rem;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background-color: #f1f1f1;
  }
`;

const ColorPopover = styled.div`
  position: absolute;
  top: 2.5rem;
  left: 100%;
  margin-left: 0.5rem;
  z-index: 100;
`;

export default function MakingBookCover() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [stickers, setStickers] = useState([]);
  const [resizingId, setResizingId] = useState(null);
  const [selectedStickerId, setSelectedStickerId] = useState(null);
  const [titleColor, setTitleColor] = useState({ r: 26, g: 32, b: 43, a: 1 });
const [authorColor, setAuthorColor] = useState({ r: 26, g: 32, b: 43, a: 1 });
const [showTitleColorPicker, setShowTitleColorPicker] = useState(false);
const [showAuthorColorPicker, setShowAuthorColorPicker] = useState(false);

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [textColor, setTextColor] = useState('#1A202B');
  
  const [textPos, setTextPos] = useState({ x: 0, y: 0 });
  const [authorPos, setAuthorPos] = useState({ x: 0, y: 0 });
  const canvasRef = useRef(null);
  const [stickerOptions, setStickerOptions] = useState([]); 

  
  const handleAddSticker = (src) => {
    setStickers([...stickers, { src, id: Date.now(), scale: 1, x: 0, y: 0 }]);
  };

  const removeSticker = (id) => {
    setStickers((prev) => prev.filter((s) => s.id !== id));
  };

  const handleMouseDown = (id) => {
    setSelectedStickerId(id);
  };

  const handleMouseMove = (e) => {
    if (resizingId !== null) {
      setStickers((prev) =>
        prev.map((s) =>
          s.id === resizingId
            ? { ...s, scale: Math.max(0.3, Math.min(3, s.scale + (e.movementX + e.movementY) * 0.005)) }
            : s
        )
      );
    }
  };

  const handleMouseUp = () => {
    setResizingId(null);
  };
  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [resizingId]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/sticker/list`)
      .then((res) => {
        setStickers((prev) => prev.length ? prev : []);
        setStickerOptions(res.data);
      })
      .catch((err) => {
        console.error('스티커 리스트 불러오기 실패:', err);
      });
  }, []);
  useEffect(() => {
    const c = tinycolor('#1A202B').toRgb(); 
    setTitleColor({ r: c.r, g: c.g, b: c.b, a: 1 });
  }, []);
  const handleSave = async () => {
    if (step === 1) {
      setStep(2); // 스티커에서 텍스트 입력단계로
      return;
    }
  
    if (canvasRef.current) {
      try {
        const canvasElement = canvasRef.current;
        const canvasImage = await html2canvas(canvasElement);
        const blob = await new Promise(resolve => canvasImage.toBlob(resolve, 'image/png'));
        const file = new File([blob], `cover_${Date.now()}.png`, { type: 'image/png' });
  
        const s3Url = await uploadToS3(file);
        console.log('S3 업로드 성공:', s3Url);
        alert('표지 저장 완료');
        navigate('/bookshelf');
      } catch (err) {
        console.error('캡처 또는 업로드 실패:', err);
        alert('저장에 실패');
      }
    }
  };
  

  return (
    <CoverContainer>
      <CanvasSection>
        <Title>동화책에 들어갈 그림을 만들어보아요!</Title>
        <Canvas ref={canvasRef}>
          {step === 1 &&
            stickers.map((s) => (
              <Draggable
                key={s.id}
                bounds="parent"
                defaultPosition={{ x: s.x, y: s.y }}
                onStop={(e, data) =>
                  setStickers((prev) =>
                    prev.map((item) =>
                      item.id === s.id ? { ...item, x: data.x, y: data.y } : item
                    )
                  )
                }
              >
                <StickerWrapper>
                <Sticker
                  src={s.src}
                  scale={s.scale}
                  onMouseDown={() => handleMouseDown(s.id)}
                  style={{
                    border: resizingId === s.id ? '2px dashed #ff9900' : 'none',
                    boxSizing: 'border-box'
                  }}
                />

                  <DeleteButton onClick={() => removeSticker(s.id)}>×</DeleteButton>
                  <ResizeHandle onMouseDown={() => setResizingId(s.id)} />
                </StickerWrapper>
              </Draggable>
            ))}
  
          {step === 2 &&
            stickers.map((s) => (
              <StickerWrapper
                key={s.id}
                style={{ position: 'absolute', left: `${s.x}px`, top: `${s.y}px` }}
              >
                <Sticker src={s.src} scale={s.scale} />
              </StickerWrapper>
            ))}
  
          {step === 2 && (
            <>
              <Draggable
                bounds="parent"
                defaultPosition={textPos}
                onStop={(e, data) => setTextPos({ x: data.x, y: data.y })}
              >
                <CanvasText 
                style={{ color: `rgba(${titleColor.r}, ${titleColor.g}, ${titleColor.b}, ${titleColor.a})` }}>{title}
              </CanvasText>

              </Draggable>
  
              <Draggable
                bounds="parent"
                defaultPosition={authorPos}
                onStop={(e, data) => setAuthorPos({ x: data.x, y: data.y })}
              >
                <CanvasAuthor
                style={{ color: `rgba(${authorColor.r}, ${authorColor.g}, ${authorColor.b}, ${authorColor.a})` }}>
                  지은이: {author}
                </CanvasAuthor>
              </Draggable>
            </>
          )}
        </Canvas>
  
        {step === 2 && (
          <InputArea>
            <InputWithColorWrapper>
              <Input
                type="text"
                maxLength={10}
                placeholder="제목 (10자 이내)"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <ColorButton onClick={() => setShowTitleColorPicker((prev) => !prev)}>
                색상
              </ColorButton>
              {showTitleColorPicker && (
  <ColorPopover>
    <RgbaColorPicker
      color={titleColor}
      onChange={(newColor) => {
        setTitleColor(newColor);
      }}
    />
  </ColorPopover>
)}


            </InputWithColorWrapper>
  
            <InputWithColorWrapper>
              <Input
                type="text"
                maxLength={5}
                placeholder="만든 사람 이름"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
              <ColorButton onClick={() => setShowAuthorColorPicker((prev) => !prev)}>
                색상
              </ColorButton>
              {showAuthorColorPicker && (
              <ColorPopover>
                <RgbaColorPicker
                  color={authorColor}
                  onChange={(newColor) => setAuthorColor(newColor)}
                />
              </ColorPopover>
            )}

            </InputWithColorWrapper>
          </InputArea>
        )}
      </CanvasSection>
  
      {step === 1 && (
        <Sidebar>
          <SidebarTitle>스티커 사용하기</SidebarTitle>
          <StickerList>
            {stickerOptions.map((src, i) => (
              <StickerOption key={i} src={src} onClick={() => handleAddSticker(src)} />
            ))}
          </StickerList>
        </Sidebar>
      )}
  
      <SaveButton onClick={handleSave}>
        {step === 1 ? '다음 단계로' : '저장하기'}
      </SaveButton>
    </CoverContainer>
  );
  
}
