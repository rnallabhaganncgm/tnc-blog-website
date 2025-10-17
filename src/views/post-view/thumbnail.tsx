import React from "react";
import Image from "next/image";
import { IoEye, IoShareSocialSharp } from "react-icons/io5";
import styles from "./styles.module.css";

interface ThumbnailProps {
  thumbnailUrl?: string;
}

export const Thumbnail = ({ thumbnailUrl }: ThumbnailProps) => {
  return (
    <div className={styles.thumbnailWrapper}>
      {/* Image */}
      <div className={styles.thumbnailImageWrapper}>
        <Image
          src={thumbnailUrl || "/assets/thumbnail.png"}
          alt="Post Thumbnail"
          fill
          className={styles.thumbnailImage}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={true}
        />
      </div>

      {/* Stats */}
      <div className={styles.thumbnailStats}>
        <div className={styles.thumbnailStatItem}>
          <span>1.2k</span>
          <IoEye className={styles.thumbnailStatIcon} />
        </div>
        <div className={styles.thumbnailStatItem}>
          <span>30</span>
          <IoShareSocialSharp className={styles.thumbnailStatIcon} />
        </div>
      </div>
    </div>
  );
};
