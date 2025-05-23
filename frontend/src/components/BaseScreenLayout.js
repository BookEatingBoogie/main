import React from 'react';
import styled from 'styled-components';

const breakpoints = {
  sm: '360px',
  md: '720px',
  lg: '1080px',
  xl: '1440px',
};

const Container = styled.div`
  width: 100%;
  height: calc(var(--vh, 1vh) * 100); /* 모바일 대응 */
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  padding: 1.25rem; /* 기본 여백 */
`;

const ProgressContainer = styled.div`
  width: 100%;
  max-width: 80rem;
  color: #fff;
  font-size: 0.875rem;
`;

const ProgressText = styled.div`
  white-space: nowrap;
`;

const ProgressBarBackground = styled.div`
  width: 100%;
  height: 0.5rem;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 0.25rem;
  overflow: hidden;
  margin-top: 0.25rem;
`;

const ProgressBarFill = styled.div`
  height: 100%;
  background: #ffae00;
  width: ${({ fillPercent }) => fillPercent}%;
  transition: width 0.3s ease;
`;

const TextSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1rem 0;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  color: #fff;
  margin-bottom: 1rem;
  white-space: pre-line;
  @media (min-width: ${breakpoints.md}) {
    font-size: 1.6rem;
    white-space: normal;
  }
  @media (min-width: ${breakpoints.lg}) {
    font-size: 1.8rem;
  }
  @media (min-width: ${breakpoints.xl}) {
    font-size: 2rem;
  }
`;

const SubTitle = styled.p`
  font-size: 0.875rem;
  color: #fff;
  line-height: 1.4;
  max-width: 40rem;
  white-space: pre-line;
  @media (min-width: ${breakpoints.md}) {
    font-size: 1rem;
  }
  @media (min-width: ${breakpoints.lg}) {
    font-size: 1.125rem;
  }
`;

const ContentWrapper = styled.div`
  width: 100%;
  flex: 1;
  z-index: 2;
  @media (min-width: ${breakpoints.md}) {
    top: 13rem;
    max-width: 40rem;
  }
  @media (min-width: ${breakpoints.lg}) {
    top: 14rem;
    max-width: 60rem;
  }
  @media (min-width: ${breakpoints.xl}) {
    top: 15rem;
    max-width: 80rem;
  }
  max-width: 40rem;
`;

const LayoutImage = styled.img`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  height: auto;
  z-index: 1;
  bottom: ${({ imageBottom }) => imageBottom || '6.25rem'};
  width: 22.5rem;

  @media (min-height: ${breakpoints.md}) {
    width: 28rem;
  }

  @media (min-height: 900px) {
    width: 32rem;
  }

  @media (min-height: 1000px) {
    width: 36rem;
  }
`;

/**
 * BaseScreenLayout
 */
const BaseScreenLayout = ({
  progressText,
  progressCurrent,
  progressTotal,
  title,
  subTitle,
  children,
  imageSrc,
  imageAlt = "",
  imageWidth = 360,
  imageBottom = 100,
}) => {
  let fillPercent = 0;
  if (
    typeof progressCurrent === 'number' &&
    typeof progressTotal === 'number' &&
    progressTotal > 0
  ) {
    fillPercent = (progressCurrent / progressTotal) * 100;
  }

  return (
    <Container>
      {(progressText || (progressCurrent && progressTotal)) && (
        <ProgressContainer>
          {progressText && <ProgressText>{progressText}</ProgressText>}
          {progressCurrent !== undefined && progressTotal !== undefined && (
            <ProgressBarBackground>
              <ProgressBarFill fillPercent={fillPercent} />
            </ProgressBarBackground>
          )}
        </ProgressContainer>
      )}

      <TextSection>
        {title && <Title>{title}</Title>}
        {subTitle && <SubTitle>{subTitle}</SubTitle>}
      </TextSection>

      <ContentWrapper>{children}</ContentWrapper>

      {imageSrc && (
        <LayoutImage
          src={imageSrc}
          alt={imageAlt}
          imageBottom={`${imageBottom / 16}rem`}
        />
      )}
    </Container>
  );
};

export default BaseScreenLayout;