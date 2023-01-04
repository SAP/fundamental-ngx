import { ChangeDetectorRef, Directive, ElementRef, Inject, Input, Optional, Output } from '@angular/core';
import { merge, Observable } from 'rxjs';
import { SelectableItemToken } from './selectable-item.token';
import { FN_SELECTABLE_ITEM_PROVIDER } from './selectable-list.tokens';
import { FnDisabledProvider } from '../disabled';
import { FnReadonlyProvider } from '../readonly';
import { SelectionService } from './selection.service';
import { FnClickedProvider } from '../clicked';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';

@Directive({
    selector: '[fdSelectableItem]',
    exportAs: 'fdSelectableItem',
    providers: [
        {
            provide: SelectableItemToken,
            useExisting: SelectableItemDirective
        },
        FnReadonlyProvider,
        FnDisabledProvider,
        FnClickedProvider
    ]
})
export class SelectableItemDirective<ValueType extends Element = HTMLElement>
    implements SelectableItemToken<ValueType>
{
    /** @hidden */
    @Input()
    set value(val: ValueType) {
        this._value = val;
    }
    get value(): ValueType {
        if (this.provider && this.provider.value) {
            return this.provider.value;
        }
        return this._value;
    }

    /** @hidden */
    @Input()
    set fnSelectableItem(value: BooleanInput) {
        const isSelectable = coerceBooleanProperty(value);
        if (isSelectable !== this._selectable) {
            this._selectable = isSelectable;
        }
    }

    get fnSelectableItem(): boolean {
        let selectable = this._selectable;
        if (typeof this.provider?.fnSelectableItem !== 'undefined') {
            selectable = this.provider.fnSelectableItem;
        }
        return (
            selectable &&
            (!this.disabled$ || !this.disabled$?.fdDisabled) &&
            (!this.readonly$ || !this.readonly$?.fdReadonly)
        );
    }

    /** @hidden */
    @Output()
    clicked: Observable<MouseEvent | KeyboardEvent>;

    /** @hidden */
    private _value!: ValueType;
    /** @hidden */
    private _selected = false;
    /** @hidden */
    private _selectable = true;

    /** @hidden */
    constructor(
        @Optional() @Inject(FN_SELECTABLE_ITEM_PROVIDER) private provider: Partial<SelectableItemToken<ValueType>>,
        private disabled$: FnDisabledProvider,
        private readonly$: FnReadonlyProvider,
        private selectionService: SelectionService<ValueType>,
        private _elementRef: ElementRef<ValueType>,
        private _cd: ChangeDetectorRef,
        _clicked: FnClickedProvider
    ) {
        this.clicked = this.provider?.clicked || _clicked.asObservable();
        this._listenToDisablingEvents();
    }

    /** @hidden */
    getSelected(): boolean {
        if (this.provider?.getSelected) {
            return this.provider.getSelected();
        }
        return this._selected;
    }

    /** @hidden */
    setSelected(isSelected: boolean): void {
        if (this.provider?.setSelected) {
            this.provider.setSelected(isSelected);
        } else {
            this._selected = isSelected;
            const htmlElement = this._elementRef.nativeElement;
            const { classList } = htmlElement;
            if (isSelected) {
                classList.add('is-selected');
            } else {
                classList.remove('is-selected');
            }
            htmlElement.setAttribute('aria-selected', `${isSelected}`);
        }
    }

    /** @hidden */
    elementRef(): ElementRef<ValueType> {
        return this._elementRef;
    }

    /** @hidden */
    private _listenToDisablingEvents(): void {
        const disablingEvents$: Observable<boolean>[] = [];
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
        if (this.disabled$?.fdDisabled) {
            this.selectionService.deselectItem(this);
        }
        this._updateSelectableWatcher();
    }

    /** @hidden */
    private _updateSelectableWatcher(): void {
        this.selectionService.listenToItemInteractions();
    }
}
