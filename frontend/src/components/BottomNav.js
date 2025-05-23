import React from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';

// Ionicons
import {
  IoHomeOutline,
  IoHome,
  IoFolderOpenOutline,
  IoFolderOpen,
  IoSettingsOutline,
  IoSettings,
  IoPersonOutline,
  IoPerson,
  IoStarOutline,
  IoStar,
  IoEllipsisHorizontalSharp,
  IoEllipsisHorizontalOutline,
} from 'react-icons/io5';

/* 하단 네비게이션 바 스타일 */
const NavBar = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 60px;

  /* 사진처럼 어두운 바탕 + 흰색 아이콘/텍스트 */
  background: #FDFCFA;
  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index: 10;

  /* 상단 구분선  */
  border-top: 0.3px solid #1A202B;
`;

/* 각 아이템(아이콘 + 라벨) */
const NavItem = styled.div`
  display: flex;
  flex-direction: column; /* 아이콘 위, 텍스트 아래 */
  align-items: center;
  justify-content: center;
  cursor: pointer;

  /* 활성/비활성 시 색상 구분 (예: 활성=흰색, 비활성=회색) */
  color: #333;

  &:hover {
    color: #000; /* 호버 시 흰색으로 강조 */
  }

  /* 아이콘도 부모의 color를 물려받도록 */
  & svg {
    fill: currentColor;
  }
`;

/* 아이템 라벨 (텍스트) */
const NavLabel = styled.span`
  font-size: 12px;
  margin-top: 4px; /* 아이콘과 텍스트 사이 간격 */
`;

/**
 * 5개 탭 예시: 내 캐릭터, 내 책장, 홈, 즐겨찾기, 설정
 * path는 실제 라우트와 맞춰주세요.
 */
const navItems = [
  {
    label: '내 캐릭터',
    path: '/character-storage',
    activeIcon: <IoPerson size={20} />,
    inactiveIcon: <IoPersonOutline size={20} />,
  },
  {
    label: '내 책장',
    path: '/bookshelf',
    activeIcon: <IoFolderOpen size={20} />,
    inactiveIcon: <IoFolderOpenOutline size={20} />,
  },
  {
    label: '홈',
    path: '/',
    activeIcon: <IoHome size={20} />,
    inactiveIcon: <IoHomeOutline size={20} />,
  },
  {
    label: '즐겨찾기',
    path: '/favorite',
    activeIcon: <IoStar size={20} />,
    inactiveIcon: <IoStarOutline size={20} />,
  },
  {
    label: '더보기',
    path: '/settings',
    activeIcon: <IoEllipsisHorizontalSharp size={20} />,
    inactiveIcon: <IoEllipsisHorizontalOutline size={20} />,
  },
];

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <NavBar>
      {navItems.map((item) => {
        // 현재 경로와 아이템의 path가 일치하면 활성 상태
        const isActive = location.pathname === item.path;

        return (
          <NavItem
            key={item.path}
            onClick={() => navigate(item.path)}
            isActive={isActive}
          >
            {isActive ? item.activeIcon : item.inactiveIcon}
            <NavLabel>{item.label}</NavLabel>
          </NavItem>
        );
      })}
    </NavBar>
  );
};

export default BottomNav;