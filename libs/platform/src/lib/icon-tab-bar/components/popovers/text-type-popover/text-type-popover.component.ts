import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    SimpleChanges
} from '@angular/core';
import { IconTabBarPopoverBase } from '../icon-tab-bar-popover-base.class';
import { IconTabBarItem } from '../../../interfaces/icon-tab-bar-item.interface';

@Component({
    selector: 'fdp-text-type-popover',
    templateUrl: './text-type-popover.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextTypePopoverComponent extends IconTabBarPopoverBase implements OnChanges {
    /**
     * @description Is extra items mode or subitems mode
     */
    @Input()
    isExtraItemsMode = false;

    /**
     * @description Parent tab need for subItems mode
     */
    @Input()
    parentTab: IconTabBarItem;

    /**
     * @description uId of selected subItem
     */
    @Input()
    selectedSubItemUid: string;

    /**
     * @description Emits when some subTab is selected and isExtraItemsMode is disabled
     */
    @Output()
    selectedSubItem: EventEmitter<any> = new EventEmitter<any>();

    /** @hidden */
    _containsSelected = false;

    /** @hidden */
    constructor(protected _cd: ChangeDetectorRef) {
        super(_cd);
    }

    /** @hidden */
    ngOnChanges(changes: SimpleChanges): void {
        super.ngOnChanges(changes);
        if (!this.isExtraItemsMode && changes.parentTab) {
            this._setStyles(this.parentTab.subItems);
        }
        if (changes.selectedSubItemUid) {
            this._calculateIfContainsSelected();
        }
    }

    /**
     * @hidden
     * @param selectedItem
     */
    _selectItem(selectedItem: IconTabBarItem): void {
        this.isExtraItemsMode ? this.selectedExtraItem.emit(selectedItem) : this.selectedSubItem.emit(selectedItem);
        this.popover.close();
    }

    /**
     * @hidden
     * @param item
     * @returns uId
     */
    _trackBy(item: IconTabBarItem): string {
        return item.uId;
    }

    /** @hidden */
    private _calculateIfContainsSelected(): void {
        this._containsSelected = this._getChildren(this.parentTab.subItems).some(
            ({ uId }) => uId === this.selectedSubItemUid
        );
    }

    /** @hidden */
    private _getChildren(items: IconTabBarItem[]): IconTabBarItem[] {
        return items.reduce((acc: IconTabBarItem[], item: IconTabBarItem) => {
            acc = acc.concat(item);
            if (item.subItems) {
                acc = acc.concat(this._getChildren(item.subItems));
            }
            return acc;
        }, []);
    }
}
