import { ChangeDetectorRef, Directive, ElementRef, HostBinding, Inject, Input } from '@angular/core';
import { SelectableItemToken, SelectComponentRootToken, SelectionService } from '@fundamental-ngx/fn/cdk';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';

@Directive({
    selector: 'fn-list-item[selectable], [fn-list-item][selectable]',
    exportAs: 'selectableListItem',
    providers: [
        {
            provide: SelectableItemToken,
            useExisting: SelectableDirective
        }
    ]
})
export class SelectableDirective<ValueType> implements SelectableItemToken<ValueType> {
    @Input()
    @HostBinding('class.is-selected')
    set selected(value: BooleanInput) {
        this.setSelected(coerceBooleanProperty(value));
    }

    get selected(): boolean {
        return this._selected;
    }

    @Input()
    value!: ValueType;

    @Input()
    get selectable(): boolean {
        return this._selectable;
    }

    set selectable(value: boolean) {
        if (this._selectable !== value) {
            this._selectable = value;
            this.selectionService.listenToItemInteractions();
        }
    }

    private _selected = false;
    private _selectable = true;

    constructor(
        @Inject(SelectComponentRootToken) private rootComponent: SelectComponentRootToken<ValueType>,
        private _elementRef: ElementRef<HTMLElement>,
        private _changeDetectorRef: ChangeDetectorRef,
        private selectionService: SelectionService
    ) {}

    elementRef(): ElementRef<HTMLElement> {
        return this._elementRef;
    }

    getSelected(): boolean {
        return this.selected;
    }

    setSelected(isSelected: boolean): void {
        if (isSelected !== this._selected) {
            this._selected = isSelected;
            this._changeDetectorRef.markForCheck();
            this._forceUpdateSelectedClass();
        }
    }

    private _forceUpdateSelectedClass(): void {
        const { classList } = this.elementRef().nativeElement;
        const className = 'is-selected';
        if (this.selected && !classList.contains(className)) {
            classList.add(className);
        }
        if (!this.selected) {
            classList.remove(className);
        }
    }
}
