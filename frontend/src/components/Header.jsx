import styled from 'styled-components';

const HeaderContainer = styled.div`
    display: flex;
    padding: 1.5rem;
    align-items: center;
    gap: 2rem;
    align-self: stretch;
    border-bottom: 0.2px solid rgba(0, 0, 0, 0.50);
    background: #001840;
    height:3rem;
    `
const Title = styled.div`
    color: #FDFCFA;
    text-align: left;
    font-family: Pretendard;
    font-size: 1.5rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: -0.03rem;
`
export default function Header({pageName}) {
    return (
        <HeaderContainer> 
        <Title>{pageName}</Title> 
    </HeaderContainer>
    );
}