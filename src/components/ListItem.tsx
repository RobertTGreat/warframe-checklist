import React from "react";
import Checkbox from "./Checkbox";
import styles from "@/styles/warframe.module.css";

interface ListItemProps {
  task: string;
  checked: boolean;
  onToggle: () => void;
}

const ListItem: React.FC<ListItemProps> = ({ task, checked, onToggle }) => {
    return (
        <li className={styles.listItem}>
            <Checkbox checked={checked} onChange={onToggle} />
            <span className={styles.listItemText}>
                {task}
            </span>
        </li>
    );
};

export default ListItem;