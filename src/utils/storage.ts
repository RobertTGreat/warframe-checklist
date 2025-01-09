import localforage from 'localforage';

export const saveChecklist = async <T>(key:string, data:T) => {
    try {
        await localforage.setItem(key, data);
    } catch (error) {
        console.error("Failed to save checklist:", error);
    }
};

export const loadChecklist = async <T>(key: string): Promise<T | undefined> => {
    try {
        const data = await localforage.getItem<T>(key)
        return data || undefined;
    } catch (error) {
        console.error("Failed to load checklist:", error);
        return undefined;
    }
}