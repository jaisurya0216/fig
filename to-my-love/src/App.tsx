import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Landing } from '@pages/Landing/Landing';
import { Story } from '@pages/Story/Story';
import { MemoryBook } from '@pages/MemoryBook/MemoryBook';
import { Gallery } from '@pages/Gallery/Gallery';
import { SecretGarden } from '@pages/SecretGarden/SecretGarden';
import { Ending } from '@pages/Ending/Ending';
import { CursorTrail } from '@components/Intro/CursorTrail';
import { MusicPlayer } from '@components/Intro/MusicPlayer';
import { useLenis } from '@/hooks/useLenis';
import { useStore } from '@/store/useStore';

function Experience() {
  const introComplete = useStore((s) => s.introComplete);
  const setIntroComplete = useStore((s) => s.setIntroComplete);
  const [showJourney, setShowJourney] = useState(false);

  useLenis(showJourney);

  const handleEnterStory = () => {
    setIntroComplete(true);
    setShowJourney(true);
  };

  return (
    <>
      <CursorTrail />
      {introComplete && <MusicPlayer />}

      {!showJourney && <Landing onEnterStory={handleEnterStory} />}

      {showJourney && (
        <div className="relative">
          <Story />
          <MemoryBook />
          <Gallery />
          <SecretGarden />
          <Ending />
        </div>
      )}
    </>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Experience />} />
    </Routes>
  );
}

export default App;
