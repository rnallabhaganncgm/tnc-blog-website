import Link from "next/link";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { FaArrowRightLong } from "react-icons/fa6";
import styles from "./styles.module.css";

interface Author {
  name: string;
  slug: string;
  image?: string;
  bio?: string;
}

export default function AuthorBio({ author }: { author: Author }) {
  if (!author) return null;

  return (
    <section className={styles.authorBioSection}>
      <div className={styles.authorBioWrapper}>
        <div className={styles.authorBioFlex}>
          {/* Avatar */}
          <div className={styles.authorAvatarWrapper}>
            <Avatar className={styles.authorAvatar}>
              {author.image ? (
                <AvatarImage src={author.image} alt={`Portrait of ${author.name}`} />
              ) : (
                <AvatarFallback className={styles.authorAvatarFallback}>
                  {author.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              )}
            </Avatar>
          </div>

          {/* Text content */}
          <div className={styles.authorText}>
            <div className={styles.authorNameRow}>
              <h1 className={styles.authorName}>{author.name}</h1>
              <Link
                href={`/author/${author.slug}`}
                aria-label={`Read more about ${author.name}`}
                className={`${styles.authorReadMore} group`}

              >
                Read more
                <FaArrowRightLong className={`${styles.authorReadMoreIcon} group-hover:translate-x-1`} />
              </Link>
            </div>

            {author.bio && <p className={styles.authorBioText}>{author.bio}</p>}
          </div>
        </div>
      </div>
    </section>
  );
}
