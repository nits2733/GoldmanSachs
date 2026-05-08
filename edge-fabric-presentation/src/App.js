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
import Slide6 from './slides/Slide6';
import Slide7 from './slides/Slide7';
import Slide8 from './slides/Slide8';
import SlideSDLC1 from './slides/SlideSDLC1';
import SlideSDLC2 from './slides/SlideSDLC2';
import SlideOps1 from './slides/SlideOps1';
import SlideOps3 from './slides/SlideOps3';
import SlideOps4 from './slides/SlideOps4';
import SlideOps5 from './slides/SlideOps5';
import SlideOps6 from './slides/SlideOps6';
import SlideEnd from './slides/SlideEnd';

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
  Slide5,    // Core Distributed System Features
  SlideSDLC1, // AI-Driven SDLC — System Architecture
  SlideSDLC2, // AI-Driven SDLC — feature.yml DAG
  SlideOps1,  // Agentic Ops 1 — The Problem (Story)
  Slide8,     // Agentic Ops 2 — Three-Layer Architecture (Eyes, Brain, Hands)
  SlideOps3,  // Agentic Ops 3 — MCP Observe (The Eyes)
  SlideOps4,  // Agentic Ops 4 — MCP Act (The Hands)
  SlideOps5,  // Agentic Ops 5 — Ops Agent (The Brain)
  SlideOps6,  // Agentic Ops 6 — The Approval Flow
  SlideEnd,   // Thank You & Q&A
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
