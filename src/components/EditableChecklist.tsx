import React, { useState, useEffect, useRef } from "react";
import Checkbox from "./Checkbox";
import styles from "@/styles/warframe.module.css";
import { loadChecklist, saveChecklist } from "@/utils/storage";

interface EditableChecklistProps {
    title: string;
    storageKey: string;
}

const EditableChecklist: React.FC<EditableChecklistProps> = ({
    title,
    storageKey,
}) => {
    const [tasks, setTasks] = useState<string[]>([""]);
    const [checkedItems, setCheckedItems] = useState<{ [index: number]: boolean }>(
        {}
    );
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const loadData = async () => {
            const savedTasks = await loadChecklist<string[]>(`${storageKey}-tasks`);
            const savedCheckedItems = await loadChecklist<{ [index: number]: boolean }>(storageKey);
            setTasks(savedTasks ?? [""]);
            setCheckedItems(savedCheckedItems ?? {});
        };
        loadData();
    }, [storageKey]);


    const handleTaskChange = (index: number, value: string) => {
      const newTasks = [...tasks];
      newTasks[index] = value;
      setTasks(newTasks);
  };

  const handleTaskBlur = async () => {
      await saveChecklist<string[]>(`${storageKey}-tasks`, tasks);
  };

    const handleItemToggle = async (index: number) => {
        const newCheckedItems = {
            ...checkedItems,
            [index]: !checkedItems[index],
        };
        setCheckedItems(newCheckedItems);
        await saveChecklist(storageKey, newCheckedItems);
    };

    const handleAddTask = () => {
        setTasks([...tasks, ""]);
        setTimeout(() => {
            inputRef.current?.focus();
        }, 0);
    };

    const handleDeleteTask = async (index: number) => {
      const newTasks = [...tasks];
      newTasks.splice(index, 1);
      setTasks(newTasks);

      const newCheckedItems = { ...checkedItems };
      delete newCheckedItems[index];
      setCheckedItems(newCheckedItems);

      await saveChecklist<string[]>(`${storageKey}-tasks`, newTasks);
      await saveChecklist<{ [index: number]: boolean }>(storageKey, newCheckedItems);
    };


    return (
        <div className={styles.checklist}>
            <h2 className={styles.checklistTitle}>{title}</h2>
            <ul className={styles.list}>
                {tasks.map((task, index) => (
                    <li key={index} className={styles.listItem}>
                        <Checkbox
                            checked={checkedItems[index] || false}
                            onChange={() => handleItemToggle(index)}
                        />
                        <input
                            ref={index === tasks.length - 1 ? inputRef : null}
                            type="text"
                            value={task}
                            onChange={(e) => handleTaskChange(index, e.target.value)}
                            onBlur={handleTaskBlur}
                            className={styles.listItemInput}
                        />
                        <button
                            onClick={() => handleDeleteTask(index)}
                            className={styles.deleteButton}
                        >
                            X
                        </button>
                    </li>
                ))}
            </ul>
            <button onClick={handleAddTask} className={styles.addButton}>
                + Add Task
            </button>
        </div>
    );
};

export default EditableChecklist;