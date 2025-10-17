import styles from "./styles.module.css";

export const BannerSidebar = () => {
  return (
    <div className={styles.bannerSidebarWrapper}>
      <div className={styles.bannerAdContainer}>
        <p className={styles.bannerAdText}>Advertisement</p>
        <div className={styles.bannerAdImage} />
      </div>
    </div>
  );
};
