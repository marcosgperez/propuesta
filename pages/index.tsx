import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import LockScreen from '../components/LockScreen';
import ProposalScreen from '../components/ProposalScreen';

export default function Home() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // Intentar reproducir el audio cuando el componente se monta
    const playAudio = () => {
      if (audioRef.current) {
        audioRef.current.play().catch((error) => {
          console.log('Autoplay bloqueado, esperando interacción del usuario:', error);
        });
      }
    };

    // Intentar reproducir inmediatamente
    playAudio();

    // También intentar reproducir en el primer click/touch del usuario
    const handleFirstInteraction = () => {
      playAudio();
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
    };

    document.addEventListener('click', handleFirstInteraction);
    document.addEventListener('touchstart', handleFirstInteraction);

    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Uma pergunta especial ❤️</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      </Head>
      
      {/* Audio de fondo */}
      <audio ref={audioRef} loop>
        <source src="/tema.mp3" type="audio/mpeg" />
      </audio>

      <main>
        {!isUnlocked ? (
          <LockScreen onUnlock={() => setIsUnlocked(true)} />
        ) : (
          <ProposalScreen />
        )}
      </main>
    </>
  );
}
