export class SaveRowsEvent<T> {
    /**
     * Table save rows event
     * @param done Callback function. Call it when newly added items has been saved and new data source fetch is needed.
     * @param items Array of newly created items.
     */
    constructor(public done: () => void, public items: T[]) {}
}
