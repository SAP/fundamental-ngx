import {
    AfterViewInit,
    ContentChildren,
    Directive,
    EventEmitter,
    Input,
    Output,
    QueryList,
    booleanAttribute
} from '@angular/core';
import { SelectComponentRootToken, SelectableListValueType } from './select-component-root.token';
import { SelectableItemToken } from './selectable-item.token';
import { SelectionService } from './selection.service';

@Directive({
    selector: '[fdkSelectableList]',
    exportAs: 'fdkSelectableList',
    standalone: true,
    providers: [
        {
            provide: SelectComponentRootToken,
            useExisting: SelectableListDirective
        },
        SelectionService
    ]
})
export class SelectableListDirective<T extends Element = HTMLElement, V = any>
    implements SelectComponentRootToken<T>, AfterViewInit
{
    /** @hidden */
    @Output()
    selectedChange = new EventEmitter<SelectableListValueType<T>>();

    /** @hidden */
    @Input({ transform: booleanAttribute })
    toggle = false;

    /** @hidden */
    @Input({ transform: booleanAttribute })
    multiple = false;

    /** @hidden */
    @Input()
    set selected(value: SelectableListValueType<T>) {
        this._selectionService.setValue(value);
    }

    /** @hidden */
    @ContentChildren(SelectableItemToken) selectableItems!: QueryList<SelectableItemToken<T, V>>;

    /** @hidden */
    constructor(private _selectionService: SelectionService<T, V>) {
        this._selectionService.registerRootComponent(this);
    }

    /** @hidden */
    select(item: SelectableItemToken<T, V>): void {
        this._selectionService.selectItem(item);
    }

    /** @hidden */
    deselect(item: SelectableItemToken<T, V>): void {
        this._selectionService.deselectItem(item);
    }

    /** @hidden */
    toggleSelect(item: SelectableItemToken<T, V>): void {
        if (item.getSelected()) {
            this.deselect(item);
        } else {
            this.select(item);
        }
    }

    /** @hidden */
    onChange(value: SelectableListValueType<T>): void {
        this.selectedChange.emit(value);
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this._selectionService.initialize(this.selectableItems);
    }
}
