import styles from '../../styles/Home.module.scss';
import Noise from '../effects/Noise';

export default function AboutSection({
  aboutSectionRef,
  aboutContentRef,
  runtime,
  totalVisits,
  currentVisitors,
}) {
  return (
    <div id="about-section" ref={aboutSectionRef} className={`${styles.contentSection} ${styles.aboutSection}`}>
      <Noise />
      <div ref={aboutContentRef} className={styles.aboutContentInner}>
        <h2>ABOUT</h2>
        <div className={styles.siteStatsContainer}>
          <p>Qing-UU // Personal Node</p>
          <p>一名正在把数据科学、前端交互、音乐表达和硬件实验塞进同一个档案库的学生。</p>
          <p>System Uptime: {runtime}</p>
          <p>Total Visits: {totalVisits}</p>
          <p>Online Now: {currentVisitors}</p>
        </div>
        <div className={styles.footerInfo}>
           2025-PRESENT © Qing-UU
        </div>
      </div>
    </div>
  );
}
