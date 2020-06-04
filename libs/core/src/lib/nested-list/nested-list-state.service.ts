import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class NestedListStateService {
    /**
     * @hidden
     * The condensed state is modified by the parent and read by nested lists.
     */
    condensed: boolean = false;

    /**
     * @hidden
     */
    selectable: boolean = true;

    /** @hidden */
    onSelected: Subject<string> = new Subject<string>();
}
