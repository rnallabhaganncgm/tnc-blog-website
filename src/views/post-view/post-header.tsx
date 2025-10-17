import React from "react";
import styles from "./styles.module.css";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface Author {
  name: string;
  avatarUrl?: string;
}

interface PostHeaderProps {
  title: string;
  description: string;
  author: Author;
  readTime: string;
  published: string;
  updated?: string;
}

export default function PostHeader({
  title,
  description,
  author,
  readTime,
  published,
  updated,
}: PostHeaderProps) {
  return (
    <article className={styles.postHeaderWrapper}>
      {/* Header */}
      <header className={styles.postHeaderTitleWrapper}>
        <h1 className={styles.postHeaderTitle}>{title}</h1>
        <p className={styles.postHeaderDescription}>{description}</p>
      </header>

      {/* Author + Meta */}
      <div className={styles.postMetaWrapper}>
        {/* Avatar */}
        <Avatar className={styles.postAvatar}>
          {author.avatarUrl ? (
            <AvatarImage src={author.avatarUrl} alt={author.name} />
          ) : (
            <AvatarFallback>
              {author.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          )}
        </Avatar>

        {/* Author Info + Timestamps */}
        <div className={styles.authorInfoWrapper}>
          <div className={styles.authorNameReadTime}>
            <span>By {author.name}</span>
            <span className={styles.readTime}>{readTime}</span>
          </div>

          <div className={styles.timestampsWrapper}>
            <div className={styles.timestampItem}>
              <span className={styles.timestampLabel}>Published</span>
              <span className={styles.timestampValue}>{published}</span>
            </div>

            {updated && (
              <div className={styles.timestampItem}>
                <span className={styles.timestampValue}>{updated}</span>
                <span className={styles.timestampLabel}>Updated</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
