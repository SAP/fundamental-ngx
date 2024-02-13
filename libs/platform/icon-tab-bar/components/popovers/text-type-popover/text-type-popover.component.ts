import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    QueryList,
    SimpleChanges,
    ViewChild,
    ViewChildren
} from '@angular/core';

import { Nullable } from '@fundamental-ngx/cdk/utils';

import { NgClass, NgTemplateOutlet } from '@angular/common';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { IconComponent } from '@fundamental-ngx/core/icon';
import {
    PopoverBodyComponent,
    PopoverComponent,
    PopoverControlComponent,
    TriggerConfig
} from '@fundamental-ngx/core/popover';
import { IconBarDndItemDirective } from '../../../directives/dnd/icon-bar-dnd-item.directive';
import { IconBarDndListDirective } from '../../../directives/dnd/icon-bar-dnd-list.directive';
import { IconTabBarItem } from '../../../interfaces/icon-tab-bar-item.interface';
import { IconTabBarTextTypeTabItemComponent } from '../../text-type-tab-item/icon-tab-bar-text-type-tab-item.component';
import { IconTabBarPopoverBase } from '../icon-tab-bar-popover-base.class';

@Component({
    selector: 'fdp-text-type-popover',
    templateUrl: './text-type-popover.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        PopoverComponent,
        PopoverControlComponent,
        PopoverBodyComponent,
        IconBarDndListDirective,
        NgTemplateOutlet,
        IconBarDndItemDirective,
        NgClass,
        ButtonComponent,
        IconComponent,
        IconTabBarTextTypeTabItemComponent
    ]
})
export class TextTypePopoverComponent extends IconTabBarPopoverBase implements OnChanges {
    /** @hidden reference for html element, that opens dropdown and can receive focus */
    @ViewChild('dropdownTrigger', { read: ElementRef }) _dropdownTrigger: ElementRef<HTMLElement>;
    /** @hidden list of tab html elements, that can receive focus */
    @ViewChildren('tabItem', { read: ElementRef }) _tabExtraUIElements: QueryList<ElementRef<HTMLElement>>;

    /** Whether to render item as a multi-click variant. */
    @Input()
    multiClick = false;

    /**
     * @description Layout type for tab.
     */
    @Input()
    layoutMode: 'row' | 'column';

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
    selectedSubItemUid: Nullable<string>;

    /**
     * @description tabIndex of the particular item. Aplicable only for subitems mode
     */
    @Input()
    tabindex = -1;

    /**
     * @description Emits when some subTab is selected and isExtraItemsMode is disabled
     */
    @Output()
    selectedSubItem: EventEmitter<any> = new EventEmitter<any>();

    /** Emits when root item is being selected. Applicable for multi-click variant only. */
    @Output()
    selectedItem = new EventEmitter<void>();

    /** @hidden */
    _containsSelected = false;

    /** @hidden */
    _popoverTriggers: TriggerConfig[] = [
        { trigger: 'click', openAction: true, closeAction: true, stopPropagation: true }
    ];

    /** @hidden */
    ngOnChanges(changes: SimpleChanges): void {
        super.ngOnChanges(changes);
        if (!this.isExtraItemsMode && changes.parentTab && this.parentTab.subItems) {
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

    /** @hidden */
    _textPopoverKeyDownHandler(event: KeyboardEvent, tab: IconTabBarItem): void {
        // using relative index within popover (first popover tab should start from 0)
        const baseIndex = this.parentTab ? this.parentTab.flatIndex + 1 : this.extraTabs[0].flatIndex;
        const currentIndex = tab.flatIndex - baseIndex;
        super._keyDownHandler(event, tab, currentIndex);
    }

    /** @hidden */
    private _calculateIfContainsSelected(): void {
        this._containsSelected =
            (this.multiClick && this.parentTab.uId === this.selectedSubItemUid) ||
            (!!this.parentTab.subItems &&
                this._getChildren(this.parentTab.subItems).some(({ uId }) => uId === this.selectedSubItemUid));
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
