import React, { useCallback } from 'react';
import styled from 'styled-components';
import colors from '../../assets/styles/variables/colors';

const NavContainer = styled.nav`
  position: fixed;
  bottom: 28px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 10px;
  z-index: 100;
`;

const NavDot = styled.button`
  width: ${({ $active }) => ($active ? '26px' : '7px')};
  height: 7px;
  border-radius: 4px;
  background: ${({ $active }) =>
    $active ? colors.cyan : 'rgba(0,212,255,0.2)'};
  border: 1px solid ${({ $active }) => ($active ? colors.cyan : 'rgba(0,212,255,0.25)')};
  box-shadow: ${({ $active }) => ($active ? `0 0 10px ${colors.cyan}` : 'none')};
  transition: all 0.3s ease;
  cursor: pointer;
  padding: 0;

  &:hover {
    background: ${colors.cyanDim};
    border-color: ${colors.cyanDim};
  }
`;

const ArrowButton = styled.button`
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  ${({ $direction }) => ($direction === 'prev' ? 'left: 28px;' : 'right: 28px;')}
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgba(0,212,255,0.06);
  border: 1px solid rgba(0,212,255,0.2);
  color: ${colors.textSecondary};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.25s ease;
  z-index: 100;
  opacity: ${({ $disabled }) => ($disabled ? '0.15' : '0.6')};
  cursor: ${({ $disabled }) => ($disabled ? 'default' : 'pointer')};
  pointer-events: ${({ $disabled }) => ($disabled ? 'none' : 'auto')};

  &:hover {
    background: rgba(0,212,255,0.12);
    border-color: ${colors.cyan};
    color: ${colors.cyan};
    opacity: 1;
    box-shadow: 0 0 16px rgba(0,212,255,0.25);
  }

  svg {
    width: 16px;
    height: 16px;
    fill: none;
    stroke: currentColor;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
`;

const SlideNavigation = ({ current, total, onNavigate }) => {
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') onNavigate(current + 1);
      if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')   onNavigate(current - 1);
    },
    [current, onNavigate]
  );

  React.useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <>
      <ArrowButton
        $direction="prev"
        $disabled={current === 0}
        disabled={current === 0}
        onClick={() => onNavigate(current - 1)}
        aria-label="Previous slide"
      >
        <svg viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6" /></svg>
      </ArrowButton>

      <NavContainer>
        {Array.from({ length: total }).map((_, i) => (
          <NavDot
            key={i}
            $active={i === current}
            onClick={() => onNavigate(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </NavContainer>

      <ArrowButton
        $direction="next"
        $disabled={current === total - 1}
        disabled={current === total - 1}
        onClick={() => onNavigate(current + 1)}
        aria-label="Next slide"
      >
        <svg viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6" /></svg>
      </ArrowButton>
    </>
  );
};

export default SlideNavigation;
