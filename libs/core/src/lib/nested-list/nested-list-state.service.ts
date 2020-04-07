import { Injectable } from '@angular/core';

@Injectable()
export class NestedListStateService {
    /**
     * @hidden
     * The condensed state is modified by the parent and read by nested lists.
     */
    condensed: boolean = false;
}
