import React from "react";
import styles from "./styles.module.css";

type PostTagsProps = {
  tags?: string[];
};

export const PostTags = ({
  tags = [
    "Blockchain",
    "Cryptocurrency",
    "DeFi",
    "NFTs",
    "Web3",
    "Smart Contracts",
    "Metaverse",
    "DApps",
    "Crypto Trading",
    "Crypto Wallets",
    "Crypto Mining",
    "Crypto Security",
  ],
}: PostTagsProps) => {
  return (
    <section className={styles.postTagsWrapper}>
      <h3 className={styles.postTagsTitle}>Tags</h3>
      <div className={styles.tagsContainer}>
        {tags.map((tag, idx) => (
          <span key={idx} className={styles.tagItem}>
            {tag}
          </span>
        ))}
      </div>
    </section>
  );
};
