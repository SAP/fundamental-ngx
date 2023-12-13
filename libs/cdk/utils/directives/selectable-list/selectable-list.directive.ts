import { BooleanInput } from '@angular/cdk/coercion';
import { AfterViewInit, ContentChildren, Directive, EventEmitter, Input, Output, QueryList } from '@angular/core';
import { coerceBoolean } from '../../decorators/coerce-boolean';
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
    /** @ignore */
    @Output()
    selectedChange = new EventEmitter<SelectableListValueType<T>>();

    /** @ignore */
    @Input()
    @coerceBoolean
    toggle: BooleanInput = false;

    /** @ignore */
    @Input()
    @coerceBoolean
    multiple: BooleanInput = false;

    /** @ignore */
    @Input()
    set selected(value: SelectableListValueType<T>) {
        this._selectionService.setValue(value);
    }

    /** @ignore */
    @ContentChildren(SelectableItemToken) selectableItems!: QueryList<SelectableItemToken<T, V>>;

    /** @ignore */
    constructor(private _selectionService: SelectionService<T, V>) {
        this._selectionService.registerRootComponent(this);
    }

    /** @ignore */
    select(item: SelectableItemToken<T, V>): void {
        this._selectionService.selectItem(item);
    }

    /** @ignore */
    deselect(item: SelectableItemToken<T, V>): void {
        this._selectionService.deselectItem(item);
    }

    /** @ignore */
    toggleSelect(item: SelectableItemToken<T, V>): void {
        if (item.getSelected()) {
            this.deselect(item);
        } else {
            this.select(item);
        }
    }

    /** @ignore */
    onChange(value: SelectableListValueType<T>): void {
        this.selectedChange.emit(value);
    }

    /** @ignore */
    ngAfterViewInit(): void {
        this._selectionService.initialize(this.selectableItems);
    }
}
