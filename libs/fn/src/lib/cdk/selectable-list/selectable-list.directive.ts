import { BooleanInput } from '@angular/cdk/coercion';
import { AfterViewInit, ContentChildren, Directive, EventEmitter, Input, Output, QueryList } from '@angular/core';
import { coerceBoolean } from '@fundamental-ngx/fn/utils';
import { SelectionService } from './selection.service';
import { SelectableListValueType, SelectComponentRootToken } from './select-component-root.token';
import { SelectableItemToken } from './selectable-item.token';

@Directive({
    selector: '[fnSelectableList]',
    exportAs: 'fnSelectableList',
    providers: [
        {
            provide: SelectComponentRootToken,
            useExisting: SelectableListDirective
        },
        SelectionService
    ]
})
export class SelectableListDirective<T = any> implements SelectComponentRootToken<T>, AfterViewInit {
    @Output()
    selectedChange = new EventEmitter<SelectableListValueType<T>>();

    @Input()
    @coerceBoolean
    toggle: BooleanInput = false;

    @Input()
    @coerceBoolean
    multiple: BooleanInput = false;

    @Input()
    set selected(value: SelectableListValueType<T>) {
        this._selectionService.setValue(value);
    }

    @ContentChildren(SelectableItemToken) selectableItems!: QueryList<SelectableItemToken<T>>;

    constructor(private _selectionService: SelectionService<T>) {
        this._selectionService.registerRootComponent(this);
    }

    select(item: SelectableItemToken<T>): void {
        this._selectionService.selectItem(item);
    }

    deselect(item: SelectableItemToken<T>): void {
        this._selectionService.deselectItem(item);
    }

    toggleSelect(item: SelectableItemToken<T>): void {
        if (item.getSelected()) {
            this.deselect(item);
        } else {
            this.select(item);
        }
    }

    onChange(value: SelectableListValueType<T>): void {
        this.selectedChange.emit(value);
    }

    ngAfterViewInit(): void {
        this._selectionService.initialize(this.selectableItems);
    }
}
