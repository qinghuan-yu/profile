import styles from '../../styles/Home.module.scss';

export default function ContactSection({
  contactSectionRef,
  handleCopyEmail,
  isEmailCopied,
}) {
  return (
    <div id="contact-section" ref={contactSectionRef} className={`${styles.contentSection} ${styles.contactSection}`}>
      <h2>CONTACT</h2>
      {/* Radar animation — part of the HUD design, not a replaceable image */}
      <div className={styles.radarDisplay}>
        <div className={styles.scanner}></div>
        <div className={`${styles.radarRipple} ${styles.ripple1}`}></div>
        <div className={`${styles.radarRipple} ${styles.radarRippleSmall} ${styles.smallRipple1}`}></div>
        <div className={`${styles.radarRipple} ${styles.radarRippleSmall} ${styles.smallRipple2}`}></div>
        <div className={`${styles.radarRipple} ${styles.radarRippleSmall} ${styles.smallRipple3}`}></div>
      </div>

      {/* Email — Replace with your own */}
      <button
        type="button"
        className={`${styles.logItem} ${styles.radarContact1}`}
        onClick={handleCopyEmail}
      >
        <div className={styles.logIconContainer}>
          <svg className={styles.logIcon} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M3.00977 5.83789C3 5.28561 3.44772 4.83789 4 4.83789H20C20.5523 4.83789 21 5.28561 21 5.83789V17.1621C21 17.7144 20.5523 18.1621 20 18.1621H4C3.44772 18.1621 3 17.7144 3 17.1621V5.83789H3.00977ZM5.01817 6.83789L11.0535 11.4847C11.6463 11.9223 12.4249 11.9223 13.0177 11.4847L19.053 6.83789H5.01817Z" fill="currentColor"/>
          </svg>
        </div>
        <div className={styles.contactIconRipple}></div>
        <span className={styles.emailText}>Reliarc.me@outlook.com</span>
        {isEmailCopied && <span className={styles.copyFeedback}>Copied!</span>}
      </button>

      {/* GitHub — Replace with your own */}
      <div className={`${styles.logItem} ${styles.radarContact2}`}>
        <a href="https://github.com/qinghuan-yu" target="_blank" rel="noopener noreferrer" className={styles.logLink} aria-label="GitHub">
          <div className={styles.logIconContainer}>
            <svg className={styles.logIcon} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" fill="currentColor"></path>
            </svg>
          </div>
          <div className={styles.contactIconRipple}></div>
        </a>
      </div>

      {/* Social Link 1 — Replace with your own (Bilibili, Twitter, etc.) */}
      <div className={`${styles.logItem} ${styles.radarContact3}`}>
        <a href="https://music.163.com/#/artist?id=100570638" target="_blank" rel="noopener noreferrer" className={styles.logLink} aria-label="NetEase Cloud Music">
          <div className={styles.logIconContainer}>
            <svg className={styles.logIcon} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path fill="currentColor" d="M14 3v11.1A4 4 0 1 1 12 10.65V5h8v4h-6V3Z"/>
            </svg>
          </div>
          <div className={styles.contactIconRipple}></div>
        </a>
      </div>

      {/* Social Link 2 — Replace with your own */}
      <div className={`${styles.logItem} ${styles.radarContact4}`}>
        <a href="https://steamcommunity.com/id/qing_uu/" target="_blank" rel="noopener noreferrer" className={styles.logLink} aria-label="Steam">
          <div className={styles.logIconContainer}>
            <svg className={styles.logIcon} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
              <path fill="currentColor" d="M15.974 0c-8.401 0-15.292 6.479-15.943 14.714l8.573 3.547c0.729-0.495 1.604-0.786 2.552-0.786 0.083 0 0.167 0.005 0.25 0.005l3.813-5.521v-0.078c0-3.328 2.703-6.031 6.031-6.031s6.036 2.708 6.036 6.036c0 3.328-2.708 6.031-6.036 6.031h-0.135l-5.438 3.88c0 0.073 0.005 0.141 0.005 0.214 0 2.5-2.021 4.526-4.521 4.526-2.177 0-4.021-1.563-4.443-3.635l-6.135-2.542c1.901 6.719 8.063 11.641 15.391 11.641 8.833 0 15.995-7.161 15.995-16s-7.161-16-15.995-16zM10.052 24.281l-1.964-0.813c0.349 0.724 0.953 1.328 1.755 1.667 1.729 0.719 3.724-0.104 4.443-1.833 0.349-0.844 0.349-1.76 0.005-2.599-0.344-0.844-1-1.495-1.839-1.844-0.828-0.349-1.719-0.333-2.5-0.042l2.026 0.839c1.276 0.536 1.88 2 1.349 3.276s-2 1.88-3.276 1.349zM25.271 11.875c0-2.214-1.802-4.021-4.016-4.021-2.224 0-4.021 1.807-4.021 4.021 0 2.219 1.797 4.021 4.021 4.021 2.214 0 4.016-1.802 4.016-4.021zM18.245 11.87c0-1.672 1.349-3.021 3.016-3.021s3.026 1.349 3.026 3.021c0 1.667-1.359 3.021-3.026 3.021s-3.016-1.354-3.016-3.021z"/>
            </svg>
          </div>
          <div className={styles.contactIconRipple}></div>
        </a>
      </div>

    </div>
  );
}
