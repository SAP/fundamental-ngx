export interface SaveRowsEvent<T> {
    /**
     * Callback function. Call it when newly added items has been saved and new data source fetch is needed.
     */
    done: () => void;
    /**
     * Array of newly created items.
     */
    items: T[];
}
