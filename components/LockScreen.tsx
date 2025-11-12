import { useState, useEffect } from 'react';
import styles from './LockScreen.module.css';

interface LockScreenProps {
  onUnlock: () => void;
}

export default function LockScreen({ onUnlock }: LockScreenProps) {
  const [digits, setDigits] = useState([0, 0, 0, 0]);
  const [isShaking, setIsShaking] = useState(false);
  const correctCode = [1, 9, 0, 9];

  const handleDigitChange = (index: number, direction: 'up' | 'down') => {
    const newDigits = [...digits];
    if (direction === 'up') {
      newDigits[index] = (newDigits[index] + 1) % 10;
    } else {
      newDigits[index] = (newDigits[index] - 1 + 10) % 10;
    }
    setDigits(newDigits);
  };

  const handleUnlock = () => {
    const isCorrect = digits.every((digit, index) => digit === correctCode[index]);
    
    if (isCorrect) {
      onUnlock();
    } else {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    }
  };

  return (
    <div className={styles.container}>
      <div className={`card ${styles.card} ${isShaking ? styles.shake : ''}`}>
        <div className="card-body text-center p-4">
          <div className={styles.lockIcon}>
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
          </div>
          
          <h2 className={styles.title}>Desbloqueie para continuar</h2>
          <p className={styles.subtitle}>Digite o código especial ❤️</p>
          
          <div className={styles.lockContainer}>
            {digits.map((digit, index) => (
              <div key={index} className={styles.wheelContainer}>
                <button
                  className={`btn btn-sm ${styles.arrowBtn}`}
                  onClick={() => handleDigitChange(index, 'up')}
                  aria-label="Aumentar"
                >
                  ▲
                </button>
                <div className={styles.digitDisplay}>
                  {digit}
                </div>
                <button
                  className={`btn btn-sm ${styles.arrowBtn}`}
                  onClick={() => handleDigitChange(index, 'down')}
                  aria-label="Diminuir"
                >
                  ▼
                </button>
              </div>
            ))}
          </div>
          
          <button
            className={`btn btn-primary btn-lg mt-4 ${styles.unlockBtn}`}
            onClick={handleUnlock}
          >
            Desbloquear
          </button>
        </div>
      </div>
    </div>
  );
}
