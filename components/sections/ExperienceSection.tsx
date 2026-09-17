import styles from '../../styles/Home.module.scss';

export default function ExperienceSection({
  experienceSectionRef,
  experienceData,
  handleExperienceItemClick,
}) {
  return (
    <div id="experience-section" ref={experienceSectionRef} className={`${styles.contentSection} ${styles.experienceSection}`}>
      <h2 className={styles.experienceTitleWithBackground}>EXPERIENCE</h2>
      <p className={styles.experienceIntro}>学习经历 / 从虚拟现实开发，到计算机科学。</p>
      <div className={styles.archiveTimeline}>
        {experienceData.map((item, index) => (
          <button
            type="button"
            key={`${item.id}-${item.duration}`}
            className={styles.archiveCard}
            data-cursor-no-magnetic
            onClick={(e) => handleExperienceItemClick(item, e)}
          >
            <span className={styles.archiveDate}>{item.duration}<span>0{index + 1}</span></span>
            <span className={styles.archiveSchool}>{item.title}<span>EDUCATION</span></span>
            <span className={styles.archiveLocation}>{item.location}</span>
              {item.details && item.details.length > 0 && (
                <span className={styles.archiveDetails}>
                  {item.details.map((detail, i) => (
                    <span key={i}>
                      {detail}
                    </span>
                  ))}
                </span>
              )}
            <span className={styles.archiveAction}>探索这段经历 <span aria-hidden="true">↗</span></span>
          </button>
        ))}
      </div>
    </div>
  );
}
