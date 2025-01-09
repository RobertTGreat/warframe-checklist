"use client";
import React from "react";
import EditableChecklist from "@/components/EditableChecklist";
import styles from "@/styles/warframe.module.css";

export default function Home() {
    return (
        <main className={styles.container}>
            <h1 className={styles.title}>Warframe Checklist</h1>
            <div className={styles.dualChecklistContainer}>
                <EditableChecklist
                    title="Daily Checklist"
                    storageKey="daily-checklist"
                />
                <EditableChecklist
                    title="Weekly Checklist"
                    storageKey="weekly-checklist"
                />
            </div>
        </main>
    );
}