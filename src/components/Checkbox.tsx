import React from "react";
import styles from "@/styles/warframe.module.css";

interface CheckboxProps {
    checked: boolean;
    onChange: () => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ checked, onChange }) => {
    return (
        <span
            className={`${styles.checkbox} ${checked ? styles.checked : ""}`}
            onClick={onChange}
        >
            {checked ? "✔" : ""}
        </span>
    );
};

export default Checkbox;