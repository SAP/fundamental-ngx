import { Directive, ElementRef, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

import { DndKeyboardGroupDirective } from '../dnd-keyboard-group/dnd-keyboard-group.directive';

/**
 * This directive is used to provide drag & drop with keyboard support.
 * It should be used together with directive fdDndKeyboardGroup.
 * We are using _groups from fdDndKeyboardGroup and adding a possibility to move cards.
 * Please see example below:
 * @Component({
 * selector: 'cdk-drag-drop-example',
 * template: `<div
 *               cdkDragListGroup
 *               fdDndKeyboardGroup
 *               [groups]="groups"
 *           >
 *               <div
 *                   *ngFor="let group of groups; let groupIndex = index"
 *                   cdkDragList
 *               >
 *                   Group #{{ groupIndex }}
 *                   <div
 *                       *ngFor="let item of group; let index = index"
 *                       cdkDrag
 *                       fdDndKeyboardItem
 *                       [itemIndex]="index"
 *                       [groupIndex]="groupIndex"
 *                       [dndKeyboardDisabled]="flag for disable/enable keyboard navigation if needed"
 *                       tabindex="0"
 *                   >
 *                       Item #{{ item }}
 *                   </div>
 *               </div>
 *           </div>`,
 * })
 * export class CdkDragDropExample {
 *   groups = [
 *        [1, 2, 3],
 *        [4, 5, 6],
 *      ];
 *   }
 */
@Directive({ selector: '[fdDndKeyboardItem]' })
export class DndKeyboardItemDirective implements OnInit, OnDestroy {
    /** item index in group(column) */
    @Input()
    itemIndex: number;

    /** group(column) index */
    @Input()
    groupIndex: number;

    /** @hidden */
    private readonly _onDestroy$ = new Subject<void>();

    /** @hidden */
    constructor(private readonly _dndGroup: DndKeyboardGroupDirective, private readonly _elementRef: ElementRef) {}

    /** @hidden */
    ngOnInit(): void {
        this._dndGroup._onDndItemFocus$.subscribe(([groupIndex, itemIndex]) => {
            if (this.groupIndex === groupIndex && this.itemIndex === itemIndex) {
                this._elementRef.nativeElement.focus();
            }
        });
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._onDestroy$.next();
        this._onDestroy$.complete();
    }

    /** @hidden */
    @HostListener('keydown', ['$event'])
    _onKeyDown(event: KeyboardEvent): void {
        this._dndGroup.processDragDrop(event, this.itemIndex, this.groupIndex);
    }
}
