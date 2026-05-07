import React, { useState, useCallback } from 'react';
import GlobalStyle from './assets/styles/global';
import SlideNavigation from './components/SlideNavigation';

/* ── Slides — import each slide here as you build them ── */
import Slide1 from './slides/Slide1';
import Slide2 from './slides/Slide2';
import Slide3_5 from './slides/Slide3_5';
import Slide3 from './slides/Slide3';
import Slide4 from './slides/Slide4';
import Slide5 from './slides/Slide5';

/**
 * SLIDES registry — add new slide components to this array
 * in order. The presentation controller handles everything else.
 */
const SLIDES = [
  Slide1,
  Slide2,
  Slide3_5,  // "Meet EdgeFabric" now comes BEFORE Architecture
  Slide3,    // Architecture
  Slide4,    // Consistent Hashing
  Slide5,    // Availability Problem & SWIM Protocol
];

const App = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNavigate = useCallback(
    (index) => {
      if (index >= 0 && index < SLIDES.length) {
        setCurrentSlide(index);
      }
    },
    []
  );

  const ActiveSlide = SLIDES[currentSlide];

  return (
    <>
      <GlobalStyle />

      {/* Render active slide */}
      <ActiveSlide />

      {/* Navigation — dots + arrows + keyboard */}
      {SLIDES.length > 1 && (
        <SlideNavigation
          current={currentSlide}
          total={SLIDES.length}
          onNavigate={handleNavigate}
        />
      )}
    </>
  );
};

export default App;
