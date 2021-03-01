import { CollectionPage } from '../interfaces';
import { Table } from '../table';

export class PageChange {
    constructor(public current: CollectionPage, public previous: CollectionPage) {}
}

export class TablePageChangeEvent extends PageChange {
    constructor(public source: Table, current: CollectionPage, previous: CollectionPage) {
        super(current, previous);
    }
}
