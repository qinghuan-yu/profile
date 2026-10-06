import { memo, useEffect, useRef } from 'react';
import styles from '../../styles/Home.module.scss';
import { useResponsive } from '../../hooks/useMediaQuery';

function GlobalHud({ currentTime, hudVisible }) {
  const { isMobile } = useResponsive();
  const cursorXRef = useRef<HTMLSpanElement>(null);
  const cursorYRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (isMobile) return;
    const onMouseMove = (e: MouseEvent) => {
      if (cursorXRef.current) cursorXRef.current.textContent = String(Math.round(e.clientX)).padStart(4, '0');
      if (cursorYRef.current) cursorYRef.current.textContent = String(Math.round(e.clientY)).padStart(4, '0');
    };
    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, [isMobile]);

  if (isMobile) {
    return (
      <>
        <div className={`${styles.hudElement} ${styles.topLeft} ${hudVisible ? styles.visible : ''}`}>
          <div>TIME: {currentTime}</div>
          <div>PERSONAL WEBSITE</div>
        </div>
        <div className={`${styles.hudElement} ${styles.topRight} ${hudVisible ? styles.visible : ''}`}>
          <div>QING-UU</div>
          <div>NOTES & PROJECTS</div>
        </div>
        <div className={`${styles.hudElement} ${styles.bottomLeft} ${hudVisible ? styles.visible : ''}`}>
          <div>QING-UU</div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className={`${styles.hudElement} ${styles.topLeft} ${hudVisible ? styles.visible : ''}`}>
        <div>TIME: {currentTime}</div>
        <div>PERSONAL WEBSITE</div>
      </div>
      <div className={`${styles.hudElement} ${styles.topRight} ${hudVisible ? styles.visible : ''}`}>
        <div>CURSOR_X: <span ref={cursorXRef}>0000</span></div>
        <div>CURSOR_Y: <span ref={cursorYRef}>0000</span></div>
      </div>
      <div className={`${styles.hudElement} ${styles.bottomLeft} ${hudVisible ? styles.visible : ''}`}>
        <div>QING-UU</div>
        <div>PERSONAL WEBSITE</div>
      </div>
      <div className={`${styles.hudElement} ${styles.bottomRight} ${hudVisible ? styles.visible : ''}`}>
        <div>NOTES & PROJECTS</div>
        <div>LEARNING IN PROGRESS</div>
      </div>
    </>
  );
}

export default memo(GlobalHud);
