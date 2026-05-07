import styled from 'styled-components';
import colors from '../../assets/styles/variables/colors';
import typography from '../../assets/styles/variables/typography';

/**
 * SlideWrapper — Full-screen slide container
 * DEFAULT: No scrolling (for hero slides like Slide 1)
 */
export const SlideWrapper = styled.section`
  position: relative;
  width: 100vw;
  height: 100vh;
  background: ${colors.background};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  overflow: hidden;
`;

/**
 * ScrollableSlideWrapper — Full-screen slide with vertical scrolling
 * Use this for content-heavy slides (Slide 2, 3, 4+)
 */
export const ScrollableSlideWrapper = styled(SlideWrapper)`
  overflow-y: auto;
  overflow-x: hidden;

  /* Custom cyan scrollbar */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.2);
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(0, 200, 232, 0.4);
    border-radius: 4px;

    &:hover {
      background: rgba(0, 200, 232, 0.6);
    }
  }
`;

/**
 * SlideContent — centred content area
 */
export const SlideContent = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 1200px;
  padding: 0 80px;
  display: flex;
  flex-direction: column;
  align-items: ${({ align }) => align || 'center'};
  text-align: ${({ align }) => align || 'center'};
  gap: ${({ gap }) => gap || '0'};
`;

/**
 * SlideNumber — bottom-right indicator
 */
export const SlideNumber = styled.span`
  position: absolute;
  bottom: 28px;
  right: 48px;
  font-family: ${typography.fontBody};
  font-size: ${typography.size.xs};
  font-weight: ${typography.weightLight};
  letter-spacing: ${typography.tracking.wider};
  color: ${colors.textMuted};
  z-index: 10;
`;

/**
 * TeamBadge — bottom-left
 */
export const TeamBadge = styled.span`
  position: absolute;
  bottom: 28px;
  left: 48px;
  font-family: ${typography.fontDisplay};
  font-size: ${typography.size.xs};
  font-weight: ${typography.weightLight};
  letter-spacing: ${typography.tracking.widest};
  text-transform: uppercase;
  color: ${colors.textMuted};
  z-index: 10;
`;

/**
 * GlowCircle — ambient background glow blob
 */
export const GlowCircle = styled.div`
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  filter: blur(${({ blur }) => blur || '120px'});
  opacity: ${({ opacity }) => opacity || '0.15'};
  width: ${({ size }) => size || '600px'};
  height: ${({ size }) => size || '600px'};
  background: ${({ color }) => color || '#00d4ff'};
  top: ${({ top }) => top || 'auto'};
  bottom: ${({ bottom }) => bottom || 'auto'};
  left: ${({ left }) => left || 'auto'};
  right: ${({ right }) => right || 'auto'};
  z-index: 0;
`;

/**
 * GoldRule — decorative line
 */
export const GoldRule = styled.div`
  width: ${({ width }) => width || '80px'};
  height: 2px;
  background: ${colors.cyan};
  border-radius: 1px;
  margin: ${({ my }) => my || '0'};
`;
