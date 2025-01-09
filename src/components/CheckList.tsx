import React, { useState, useEffect } from "react";
import ListItem from "./ListItem";
import styles from "@/styles/warframe.module.css";
import { loadChecklist, saveChecklist } from "@/utils/storage";

interface ChecklistProps {
    title: string;
    tasks: string[];
    storageKey: string;
}

const Checklist: React.FC<ChecklistProps> = ({ title, tasks, storageKey }) => {
    const [checkedItems, setCheckedItems] = useState<{ [index: number]: boolean }>({});

    useEffect(() => {
        const load = async () => {
            const savedState = await loadChecklist<{ [index: number]: boolean }>(storageKey);
            setCheckedItems(savedState || {});
        };
        load();
    }, [storageKey]);

    const handleItemToggle = async (index: number) => {
        const newCheckedItems = {
            ...checkedItems,
            [index]: !checkedItems[index],
        };
        setCheckedItems(newCheckedItems);
        await saveChecklist(storageKey, newCheckedItems);
    };

    return (
        <div className={styles.checklist}>
            <h2 className={styles.checklistTitle}>{title}</h2>
            <ul className={styles.list}>
                {tasks.map((task, index) => (
                    <ListItem
                        key={index}
                        task={task}
                        checked={checkedItems[index] || false}
                        onToggle={() => handleItemToggle(index)}
                    />
                ))}
            </ul>
        </div>
    );
};

export default Checklist;