import { BooleanInput } from '@angular/cdk/coercion';
import { AfterViewInit, ContentChildren, Directive, EventEmitter, Input, Output, QueryList } from '@angular/core';
import { SelectionService } from './selection.service';
import { SelectableListValueType, SelectComponentRootToken } from './select-component-root.token';
import { SelectableItemToken } from './selectable-item.token';
import { coerceBoolean } from '../../decorators/coerce-boolean';

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
    @Input()
    @coerceBoolean
    toggle: BooleanInput = false;

    /** @hidden */
    @Input()
    @coerceBoolean
    multiple: BooleanInput = false;

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
