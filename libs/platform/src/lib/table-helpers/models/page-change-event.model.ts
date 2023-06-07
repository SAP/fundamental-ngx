import { CollectionPage } from '../interfaces';
import { Table } from '../table';

export class PageChange {
    /**
     * Page change event
     * @param current Current page
     * @param previous Previous page
     */
    constructor(public current: CollectionPage, public previous: CollectionPage) {}
}

export class TablePageChangeEvent extends PageChange {
    /**
     * Table page change event
     * @param source Table component
     * @param current Current page
     * @param previous Previous page
     */
    constructor(public source: Table, current: CollectionPage, previous: CollectionPage) {
        super(current, previous);
    }
}
