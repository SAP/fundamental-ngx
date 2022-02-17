import {
    AfterViewInit,
    ChangeDetectorRef,
    Directive,
    ElementRef,
    HostBinding,
    Inject,
    Input,
    Optional
} from '@angular/core';
import {
    DestroyedBehavior,
    DisabledBehavior,
    FN_DISABLED,
    FN_READONLY,
    ReadonlyBehavior,
    SelectableItemToken,
    SelectComponentRootToken,
    SelectionService
} from '@fundamental-ngx/fn/cdk';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { tap } from 'rxjs/operators';

@Directive({
    selector: 'fn-list-item[selectable], [fn-list-item][selectable]',
    exportAs: 'fnListItemSelectable',
    providers: [
        {
            provide: SelectableItemToken,
            useExisting: SelectableItemDirective
        }
    ]
})
export class SelectableItemDirective<ValueType> implements SelectableItemToken<ValueType>, AfterViewInit {
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
        return (
            this._selectable &&
            (!this.disabled$ || !this.disabled$?.fnDisabled) &&
            (!this.readonly$ || !this.readonly$?.fnReadonly)
        );
    }

    set selectable(value: BooleanInput) {
        const selectable = coerceBooleanProperty(value);
        if (this._selectable !== selectable) {
            this._selectable = selectable;
            this._updateSelectableWatcher();
        }
    }

    private _selected = false;
    private _selectable = true;

    constructor(
        private _destroy$: DestroyedBehavior,
        @Inject(SelectComponentRootToken) private rootComponent: SelectComponentRootToken<ValueType>,
        private _elementRef: ElementRef<HTMLElement>,
        private _changeDetectorRef: ChangeDetectorRef,
        private selectionService: SelectionService,
        @Optional() @Inject(FN_DISABLED) private disabled$: DisabledBehavior,
        @Optional() @Inject(FN_READONLY) private readonly$: ReadonlyBehavior
    ) {
        if (!rootComponent) {
            throw new Error('Usage of selectable list item without [selectable] list is not supported');
        }
    }

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

    ngAfterViewInit(): void {
        this.disabled$?.subscribe(() => this._updateSelectionAndSelectableWatcher());
        this.readonly$
            ?.pipe(tap((readonly) => console.log({ readonly })))
            .subscribe(() => this._updateSelectionAndSelectableWatcher());
    }

    private _updateSelectionAndSelectableWatcher(): void {
        if (this.disabled$?.fnDisabled) {
            this.selectionService.deselectItem(this);
        }
        this.selectionService.listenToItemInteractions();
    }

    private _updateSelectableWatcher(): void {
        this.selectionService.listenToItemInteractions();
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
