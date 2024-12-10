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
        <button
          className={styles.tagName}
          onClick={() => onRemove(id)}
          type="button"
        >
          x
        </button>
      )}
    </div>
  );
};

export default Tag;
