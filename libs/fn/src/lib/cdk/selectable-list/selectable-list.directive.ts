import { AfterViewInit, ContentChildren, Directive, EventEmitter, Input, Output, QueryList } from '@angular/core';
import { coerceBoolean } from '@fundamental-ngx/fn/utils';
import { SelectionService } from './selection.service';
import { SelectComponentRootToken } from './SelectComponentRootToken';
import { SelectableItemToken } from './SelectableItemToken';

@Directive({
    selector: '[fnSelectableList]',
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

    onChange(value: ValueType | ValueType[]): void {
        this.selectedChange.emit(value);
    }

    ngAfterViewInit(): void {
        this._selectionService.initialize(this.selectableItems);
    }
}
