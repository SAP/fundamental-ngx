import { moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, UP_ARROW } from '@angular/cdk/keycodes';
import { ChangeDetectorRef, Directive, Input, Optional } from '@angular/core';
import { Subject } from 'rxjs';
import { KeyUtil } from '../../functions';
import { RtlService } from '../../services/rtl.service';

/**
 * This directive is used to provide drag & drop with keyboard support.
 * It should be used together with directive fdDndKeyboardItem.
 */
@Directive({ selector: '[fdDndKeyboardGroup]' })
export class DndKeyboardGroupDirective {
    /** Group of items */
    @Input()
    groups: any[][];

    /** Whether to disable drag & drop */
    @Input()
    disableKeyboardDragDrop = false;

    /** Used to apply indexes when moving between groups */
    @Input()
    orientation: 'horizontal' | 'vertical' = 'vertical';

    /** @hidden */
    _onDndItemFocus$ = new Subject<[number, number]>();

    /** Custom function to call when moving item inside the group */
    @Input()
    customMoveFn = (group: any[], fromIndex: number, toIndex: number): void =>
        moveItemInArray(group, fromIndex, toIndex);

    /** Custom function to call when moving item between groups */
    @Input()
    customTransferFn = (group: any[], nextGroup: any[], fromIndex: number, toIndex: number): void =>
        transferArrayItem(group, nextGroup, fromIndex, toIndex);

    /** @hidden */
    constructor(private readonly _cdr: ChangeDetectorRef, @Optional() private readonly _rtlService: RtlService) {}

    /** Process drag & drop */
    processDragDrop(event: KeyboardEvent, itemIndex: number, groupIndex: number): void {
        if (this.disableKeyboardDragDrop || !event.altKey) {
            return;
        }

        const isRtl = this._rtlService.rtl.value;

        const group = this.groups[groupIndex];
        const indexInNextGroup = this.orientation === 'vertical' ? 0 : itemIndex;

        const nextGroupExists = this.groups.length > groupIndex + 1;
        const prevGroupExists = !!groupIndex;

        if (KeyUtil.isKeyCode(event, RIGHT_ARROW) && (isRtl ? prevGroupExists : nextGroupExists)) {
            event.preventDefault();

            const nextGroupIndex = groupIndex + (isRtl ? -1 : 1);
            const nextGroup = this.groups[nextGroupIndex];

            this.customTransferFn(group, nextGroup, itemIndex, indexInNextGroup);
            this._focusDndItem(nextGroupIndex, indexInNextGroup);
        } else if (KeyUtil.isKeyCode(event, LEFT_ARROW) && (isRtl ? nextGroupExists : prevGroupExists)) {
            event.preventDefault();

            const nextGroupIndex = groupIndex + (isRtl ? 1 : -1);
            const nextGroup = this.groups[nextGroupIndex];

            this.customTransferFn(group, nextGroup, itemIndex, indexInNextGroup);
            this._focusDndItem(nextGroupIndex, indexInNextGroup);
        } else if (KeyUtil.isKeyCode(event, DOWN_ARROW)) {
            event.preventDefault();

            this.customMoveFn(group, itemIndex, itemIndex + 1);
            this._focusDndItem(groupIndex, itemIndex + 1);
        } else if (KeyUtil.isKeyCode(event, UP_ARROW)) {
            event.preventDefault();

            this.customMoveFn(group, itemIndex, itemIndex - 1);
            this._focusDndItem(groupIndex, itemIndex - 1);
        }
    }

    /** @hidden Focus after moving elements with keyboard */
    private _focusDndItem(groupIndex: number, itemIndex: number): void {
        this._cdr.detectChanges();

        this._onDndItemFocus$.next([groupIndex, itemIndex]);
    }
}
