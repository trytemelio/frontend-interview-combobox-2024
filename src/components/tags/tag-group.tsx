import Tag from "./tags";
import styles from "./tag.module.css";

export type TagItem = string | { label: string; id: string };

export type TagsGroupProps<Item extends TagItem = string> = {
  list: Item[];
  onTagRemove?: (tag: Item) => void;
};

function TagsGroup<Item extends TagItem = string>({
  list,
  onTagRemove,
}: TagsGroupProps<Item>) {
  return (
    <div className={styles.taggroup}>
      {list?.map((tag: any, index: any) => {
        const label = typeof tag === "object" ? tag?.label : (tag as string);
        const id = typeof tag === "object" ? tag?.id : index.toString();

        return (
          <Tag
            key={id || label}
            id={id}
            name={label}
            onRemove={onTagRemove ? () => onTagRemove(tag) : undefined}
          />
        );
      })}
    </div>
  );
}

export default TagsGroup;
