import { ChangeDetectorRef, Directive, Input } from '@angular/core';
import { Subject } from 'rxjs';

@Directive({ selector: '[fdDndKeyboardGroup]' })
export class DndKeyboardGroupDirective {
    @Input()
    groups: any[][];

    /** @hidden */
    _enableKeyboard = false;

    /** @hidden */
    _onDndItemFocus$ = new Subject<[number, number]>();

    constructor(public cdr: ChangeDetectorRef) {}   

    /** add focus after moving elements with keyboard */
    focusDndItem(groupIndex: number, itemIndex: number): void {
        this.cdr.detectChanges();
        this._onDndItemFocus$.next([groupIndex, itemIndex]);
    }
}
