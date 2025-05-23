/*import styled from "styled-components";
import { BsExclamationTriangleFill } from 'react-icons/bs';

const CardContainer = styled.div`
  display: flex;
  padding: 2rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  border-radius: 1.5625rem;
  background: #1C212A;
  width: 268px;
  height: 430px;
`;

const IMG = styled.img`
  width: ${(props) => props.imageWidth || '100%'};
  aspect-ratio: 2 / 3;
  object-fit: contain;
  border-radius: ${(props) => props.cornerRadius || '10px'};
  background-color: transparent;
`;

const Title = styled.div`
  color: ${(props) => props.color || '#FFF'};
  text-align: center;
  font-family: Pretendard;
  font-size: ${(props) => props.fontSize || '1rem'};
  font-weight: 700;
`;

const SubTitle = styled.div`
  color: #FFF;
  text-align: center;
  font-family: Pretendard;
  font-size: ${(props) => props.fontSize || '0.9rem'};
  font-weight: 500;
`;

const DIV = styled.div`
  color: #FFF;
  text-align: center;
  font-family: Pretendard;
  font-size: ${(props) => props.fontSize || '0.8125rem'};
  font-weight: 400;
  white-space: pre-line;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: ${(props) => props.direction || 'row'};
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  align-self: stretch;
`;

const PositiveButton = styled.button`
  display: flex;
  padding: ${(props) => props.padding || '0.25rem 1rem'};
  justify-content: center;
  align-items: center;
  align-self: stretch;
  border-radius: 6.25rem;
  border: ${(props) => props.border || 'none'};
  background: ${(props) => props.background || '#FFC75F'};
  color: ${(props) => props.color || '#000'};
  font-weight: 600;
  cursor: pointer;
`;

const NegativeButton = styled.button`
  display: flex;
  padding: ${(props) => props.padding || '0.25rem 1rem'};
  justify-content: center;
  align-items: center;
  align-self: stretch;
  border-radius: 6.25rem;
  border: ${(props) => props.border || '1px solid #ccc'};
  background: ${(props) => props.background || '#FFF'};
  color: ${(props) => props.color || '#000'};
  font-weight: 600;
  cursor: pointer;
`;

export default function PopCard({
  imageSrc,
  imageSize,
  cornerRadius,
  cardTitle,
  subTitle,
  description,
  positiveBtnText,
  negativeBtnText,
  onPositiveClick,
  onNegativeClick,
  titleFontSize,
  subFontSize,
  descriptionFontSize,
  positiveBtnStyle = {},
  negativeBtnStyle = {},
}) {
  return (
    <CardContainer>
      <IMG
      src={imageSrc}
      imageWidth={imageSize}
      cornerRadius={cornerRadius}/>

      <Title fontSize={titleFontSize}>{cardTitle}</Title>
      <SubTitle fontSize={subFontSize}>{subTitle}</SubTitle>
      <DIV fontSize={descriptionFontSize}>{description}</DIV>
      <ButtonContainer>
        {positiveBtnText && (
          <PositiveButton
            onClick={onPositiveClick}
            {...positiveBtnStyle}
          >
            {positiveBtnText}
          </PositiveButton>
        )}
        {negativeBtnText && (
          <NegativeButton
            onClick={onNegativeClick}
            {...negativeBtnStyle}
          >
            {negativeBtnText}
          </NegativeButton>
        )}
      </ButtonContainer>
    </CardContainer>
  );
}
*/

import styled from "styled-components";
import { BsExclamationTriangleFill } from 'react-icons/bs';

const CardContainer = styled.div`
  display: flex;
  padding: 2rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  border-radius: 1.5625rem;
  background: #1C212A;
  width: 268px;
  height: 430px;
`;

const IMG = styled.img`
  width: ${(props) => props.imageWidth || '100%'};
  aspect-ratio: 2 / 3;
  object-fit: contain;
  border-radius: ${(props) => props.cornerRadius || '10px'};
  background-color: transparent;
`;

const Title = styled.div`
  color: ${(props) => props.color || '#FFF'};
  text-align: center;
  font-family: Pretendard;
  font-size: ${(props) => props.fontSize || '1rem'};
  font-weight: 700;
`;

const SubTitle = styled.div`
  color: #FFF;
  text-align: center;
  font-family: Pretendard;
  font-size: ${(props) => props.fontSize || '0.9rem'};
  font-weight: 500;
`;

const DIV = styled.div`
  color: #FFF;
  text-align: center;
  font-family: Pretendard;
  font-size: ${(props) => props.fontSize || '0.8125rem'};
  font-weight: 400;
  white-space: pre-line;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: ${(props) => props.direction || 'row'};
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  align-self: stretch;
`;

const PositiveButton = styled.button`
  display: flex;
  padding: ${(props) => props.padding || '0.25rem 1rem'};
  justify-content: center;
  align-items: center;
  align-self: stretch;
  border-radius: 6.25rem;
  border: ${(props) => props.border || 'none'};
  background: ${(props) => props.background || '#FFC75F'};
  color: ${(props) => props.color || '#000'};
  font-weight: 600;
  cursor: pointer;
`;

const NegativeButton = styled.button`
  display: flex;
  padding: ${(props) => props.padding || '0.25rem 1rem'};
  justify-content: center;
  align-items: center;
  align-self: stretch;
  border-radius: 6.25rem;
  border: ${(props) => props.border || '1px solid #ccc'};
  background: ${(props) => props.background || '#FFF'};
  color: ${(props) => props.color || '#000'};
  font-weight: 600;
  cursor: pointer;
`;

export default function PopCard({
  imageSrc,
  imageSize,
  cornerRadius,
  cardTitle,
  subTitle,
  description,
  positiveBtnText,
  negativeBtnText,
  onPositiveClick,
  onNegativeClick,
  titleFontSize,
  subFontSize,
  descriptionFontSize,
  positivePadding,
  positiveBorder,
  positiveBackground,
  positiveColor,
  negativePadding,
  negativeBorder,
  negativeBackground,
  negativeColor,
  useWarningIcon = false,
}) {
  return (
    <CardContainer>
      <IMG
      src= {imageSrc ? (
        <IMG src={imageSrc} imageWidth={imageSize} cornerRadius={cornerRadius} />
      ) : useWarningIcon ? (
        <BsExclamationTriangleFill size={50} color="#EE5555" />
      ) : null}
      imageWidth={imageSize}
      cornerRadius={cornerRadius}/>

      <Title fontSize={titleFontSize}>{cardTitle}</Title>
      <SubTitle fontSize={subFontSize}>{subTitle}</SubTitle>
      <DIV fontSize={descriptionFontSize}>{description}</DIV>
      <ButtonContainer>
        {positiveBtnText && (
          <PositiveButton
            padding={positivePadding}
            border={positiveBorder}
            background={positiveBackground}
            color={positiveColor}
            onClick={onPositiveClick}
          >
            {positiveBtnText}
          </PositiveButton>
        )}
        {negativeBtnText && (
          <NegativeButton
            padding={negativePadding}
            border={negativeBorder}
            background={negativeBackground}
            color={negativeColor}
            onClick={onNegativeClick}
          >
            {negativeBtnText}
          </NegativeButton>
        )}
      </ButtonContainer>
    </CardContainer>
  );
}
