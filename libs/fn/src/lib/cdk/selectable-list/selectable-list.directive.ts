import { AfterViewInit, ContentChildren, Directive, EventEmitter, Input, Output, QueryList } from '@angular/core';
import { coerceBoolean } from '@fundamental-ngx/fn/utils';
import { SelectionService } from './selection.service';
import { SelectComponentRootToken } from './select-component-root.token';
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
export class SelectableListDirective<ValueType = any> implements SelectComponentRootToken<ValueType>, AfterViewInit {
    @Output()
    selectedChange = new EventEmitter<ValueType | ValueType[]>();

    @Input()
    @coerceBoolean
    toggle = false;

    @Input()
    @coerceBoolean
    multiple = false;

    @Input()
    set selected(value: ValueType | ValueType[]) {
        this._selectionService.setValue(value);
    }

    @ContentChildren(SelectableItemToken) selectableItems!: QueryList<SelectableItemToken<ValueType>>;

    constructor(private _selectionService: SelectionService) {
        this._selectionService.registerRootComponent(this);
    }

    select(item: SelectableItemToken<ValueType>): void {
        this._selectionService.selectItem(item);
    }

    deselect(item: SelectableItemToken<ValueType>): void {
        this._selectionService.deselectItem(item);
    }

    toggleSelect(item: SelectableItemToken<ValueType>): void {
        if (item.getSelected()) {
            this.deselect(item);
        } else {
            this.select(item);
        }
    }

    onChange(value: ValueType | ValueType[]): void {
        this.selectedChange.emit(value);
    }

    ngAfterViewInit(): void {
        this._selectionService.initialize(this.selectableItems);
    }
}
