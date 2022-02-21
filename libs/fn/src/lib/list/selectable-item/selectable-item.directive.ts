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
import { merge } from 'rxjs';

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

    /** @hidden */
    private _selected = false;
    /** @hidden */
    private _selectable = true;

    /** @hidden */
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

    /** @hidden */
    ngAfterViewInit(): void {
        this._listenToDisablingEvents();
    }

    /** @hidden */
    private _listenToDisablingEvents(): void {
        const disablingEvents$ = [];
        if (this.disabled$) {
            disablingEvents$.push(this.disabled$);
        }
        if (this.readonly$) {
            disablingEvents$.push(this.readonly$);
        }
        merge(...disablingEvents$).subscribe(() => this._updateSelectionAndSelectableWatcher());
    }

    /** @hidden */
    private _updateSelectionAndSelectableWatcher(): void {
        if (this.disabled$?.fnDisabled) {
            this.selectionService.deselectItem(this);
        }
        this._updateSelectableWatcher();
    }

    /** @hidden */
    private _updateSelectableWatcher(): void {
        this.selectionService.listenToItemInteractions();
    }

    /** @hidden */
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
