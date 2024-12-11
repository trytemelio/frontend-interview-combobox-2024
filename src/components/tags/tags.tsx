import type { FC } from "react";
import styles from "./tag.module.css";

export type TagProps = {
  id: string;
  name: string | { name: string; id: any };
  onRemove?: (id: string) => void;
};

const Tag: FC<TagProps> = ({ id, name, onRemove }) => {
  const tagName = typeof name === "object" ? name?.name : name;

  return (
    <div className={styles.tagName}>
      <span className={styles.tagtext}>{tagName}</span>
      {!!onRemove && (
        <div className={styles.tagRemove} onClick={() => onRemove(id)}>
          x
        </div>
      )}
    </div>
  );
};

export default Tag;
