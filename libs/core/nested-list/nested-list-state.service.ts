import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class NestedListStateService {
    /**
     * @ignore
     * The condensed state is modified by the parent and read by nested lists.
     */
    condensed = false;

    /**
     * @ignore
     */
    selectable = true;

    /** @ignore */
    onSelected: Subject<string> = new Subject<string>();
}
