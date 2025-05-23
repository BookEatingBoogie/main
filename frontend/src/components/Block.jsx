import styled from "styled-components";
import FavoriteButton from './FavoriteButton';

const BlockContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  width: 128px;
  cursor: pointer;
  position: relative;
   overflow: hidden; 
`;

const Shadow = styled.div`
  margin-top: -1rem;  /* 이미지와의 간격 조절 */
  width: 60%;
  height: 10px;
  background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0.7), transparent 70%);
  border-radius: 50%;
  align-self: center;
  pointer-events: none;
`;


const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 2 / 3;
  max-width: 180px;
  overflow: hidden;
`;


const IMG = styled.img`
  width: 100%;
  aspect-ratio: 2 / 3; /* 512:768 비율 유지 */
  height: auto;
  object-fit: cover;
  border-radius: 0.3125rem;
`;

const Title = styled.div`
  color: #000;
  text-align: center;
  font-family: Roboto;
  font-size: 0.625rem;
  font-weight: 400;
  margin-bottom: 0.3rem;
  margin-top:1rem;
`;

const Date = styled.div`
  color: #000;
  text-align: center;
  font-family: Roboto;
  font-size: 0.625rem;
  font-weight: 400;
`;

const Checkbox = styled.input`
  position: absolute;
  top: 5px;
  left: 5px;
  transform: scale(1.2);
`;


export default function Block({
  blockImg,
  blockName,
  creationDate,
  storyId,
  isEditing = false,
  isSelected = false,
  onToggleSelect = () => {},
  showFavorite = true,
  hideDate = false,
  hideFavorite = false,
  onClick,
  withShadow = false,
}) {
  return (
    <BlockContainer onClick={onClick}>
      <ImageWrapper>
      <IMG src={blockImg} alt={blockName || "story image"} />
      {!hideFavorite && showFavorite && storyId && !isEditing && (
        <FavoriteButton storyId={storyId} />
      )}
    </ImageWrapper>
    {withShadow && <Shadow />}

      <Title>{blockName}</Title>
      {!hideDate && <Date>{creationDate}</Date>}
    </BlockContainer>
  );
}