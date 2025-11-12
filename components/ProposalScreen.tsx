import { useState } from 'react';
import confetti from 'canvas-confetti';
import styles from './ProposalScreen.module.css';

export default function ProposalScreen() {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleYes = () => {
    setAccepted(true);
    launchConfetti();
  };

  const handleNo = () => {
    setShowConfirmModal(true);
    setIsError(false); // Reset error state when opening modal
  };

  const handleConfirmNo = () => {
    // Si confirma que no, muestra error y mantiene el modal abierto
    setIsError(true);
    setTimeout(() => {
      setIsError(false);
    }, 500);
  };

  const handleCancelNo = () => {
    // Si cancela (dice "não" en el modal), cierra el modal
    setShowConfirmModal(false);
    setIsError(false);
  };

  const launchConfetti = () => {
    const duration = 5000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 7,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#667eea', '#764ba2', '#f093fb', '#4facfe', '#ff6b6b', '#ffd93d']
      });
      
      confetti({
        particleCount: 7,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#667eea', '#764ba2', '#f093fb', '#4facfe', '#ff6b6b', '#ffd93d']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();
  };

  if (accepted) {
    return (
      <div className={styles.container}>
        <div className={`card ${styles.card} ${styles.successCard}`}>
          <div className="card-body text-center p-5">
            <div className={styles.heartIcon}>
              <svg width="100" height="100" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </div>
            <h1 className={styles.successTitle}>Sim! ❤️</h1>
            <p className={styles.successMessage}>
              Você me fez a pessoa mais feliz do mundo! 🎉
            </p>
            <p className={styles.successSubtext}>
              Te amo muito! 💕
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={styles.container}>
        <div className={`card ${styles.card}`}>
          <div className="card-body text-center p-5">
            <div className={styles.heartIcon}>
              <svg width="80" height="80" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </div>
            
            <h1 className={styles.question}>Quer namorar comigo?</h1>
            
            <div className={styles.buttonContainer}>
              <button
                className={`btn btn-lg ${styles.yesBtn}`}
                onClick={handleYes}
              >
                Sim
              </button>
              
              <button
                className={`btn btn-lg ${styles.noBtn}`}
                onClick={handleNo}
              >
                Não
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de confirmación */}
      {showConfirmModal && (
        <div className={styles.modalOverlay}>
          <div className={`${styles.modal} ${isError ? styles.modalError : ''}`}>
            <div className={styles.modalContent}>
              <h3 className={styles.modalTitle}>Tem certeza?</h3>
              <div className={styles.modalButtons}>
                <button
                  className={`btn btn-lg ${styles.modalYesBtn}`}
                  onClick={handleConfirmNo}
                >
                  Sim
                </button>
                <button
                  className={`btn btn-lg ${styles.modalNoBtn}`}
                  onClick={handleCancelNo}
                >
                  Não
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
