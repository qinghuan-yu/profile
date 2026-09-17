import styles from '../../styles/Home.module.scss';
import ActivationLever from '../interactive/ActivationLever';

export default function LeftPanel({
  leftPanelAnimated,
  mainVisible,
  leversVisible,
  handleActivateTesseract,
  isTesseractActivated,
  handleDischargeLeverPull,
  isDischarging,
  activeSection,
  handleGlobalBackClick,
  navLinks,
  handleLeftNavLinkClick,
  powerLevel,
  isFateTypingActive,
  displayedFateText,
  isEnvParamsTyping,
  displayedEnvParams,
  isInverted,
  drawerOpen = false,
  isStandalone = false,
}) {

  const showBackAndNav =
    leftPanelAnimated && (
      activeSection === 'content' ||
      activeSection === 'workDetail' ||
      activeSection === 'experienceDetail'
    );

  return (
    <div className={`${styles.leftPanel} ${leftPanelAnimated ? styles.animated : ''} ${drawerOpen ? styles.drawerOpen : ''} ${isStandalone ? styles.standaloneHide : ''}`}>
      <div className={styles.topRightDecoration}></div>
      <div className={`${styles.identityPanel} ${isTesseractActivated ? styles.identityMuted : ''}`}>
        <span className={styles.identityEyebrow}>PERSONAL ARCHIVE / QING-UU</span>
        <div className={styles.identityMonogram} aria-hidden="true">Q<span> / </span>U</div>
        <h1 className={styles.identityName}>Ideas into<br />working things.</h1>
        <p className={styles.identityDescription}>在数据、声音与交互之间，<br />记录探索，构建有趣的事物。</p>
        <div className={styles.identityFields}>
          <span>DATA SCIENCE</span><span>MUSIC & CODE</span><span>HARDWARE</span>
        </div>
      </div>
      <div className={styles.leverGroup}>
        {mainVisible && (
          <ActivationLever
            onActivate={handleActivateTesseract}
            isActive={isTesseractActivated}
            iconType="discharge"
            isAnimated={leversVisible}
          />
        )}
        {mainVisible && (
          <ActivationLever
            onActivate={handleDischargeLeverPull}
            isActive={isDischarging}
            iconType="drain"
            isAnimated={leversVisible}
          />
        )}
      </div>
    <button
      className={`${styles.globalBackButton} ${showBackAndNav ? styles.visible : ''}`}
      onClick={handleGlobalBackClick}
      data-cursor-label="BACK"
      aria-label="返回"
    >
    </button>
      <div className={`${styles.globalBackButtonDivider} ${showBackAndNav ? styles.visible : ''}`}></div>
      <div className={`${styles.leftNavLinks} ${showBackAndNav ? styles.visible : ''}`}>
        {navLinks.map((link) => (
          <button
            key={link.label}
            className={styles.leftNavLink}
            onClick={() => handleLeftNavLinkClick(link)}
          >
            {link.label}
          </button>
        ))}
      </div>
      <div className={styles.powerDisplay}>
        <div className={styles.batteryIcon}>
          {[...Array(5)].map((_, i) => {
            const shouldBeFilled = powerLevel >= (i + 1) * 20;
            const isFilled = (i === 4 && powerLevel === 100) || shouldBeFilled;
            return (
              <span
                key={i}
                className={`${styles.batteryLevelSegment} ${isFilled ? styles.filled : ''}`}
              ></span>
            );
          })}
        </div>
        <span className={styles.powerText}>{powerLevel}%</span>
      </div>
      <div className={`${styles.fateTextContainer} ${isFateTypingActive ? styles.typingActive : ''}`}>
        <span className={styles.fateText}>{displayedFateText}</span>
        <div className={styles.fateLine}></div>
      </div>
      <div className={`${styles.envParamsContainer} ${isEnvParamsTyping ? styles.typingActive : ''} ${leftPanelAnimated ? styles.animated : ''}`}>
        <pre className={styles.envParamsText}>
          {displayedEnvParams}
        </pre>
      </div>
    
    </div>
  );
}
