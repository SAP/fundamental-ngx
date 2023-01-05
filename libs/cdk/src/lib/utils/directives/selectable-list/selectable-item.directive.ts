import { ChangeDetectorRef, Directive, ElementRef, Inject, Input, Optional, Output } from '@angular/core';
import { merge, Observable } from 'rxjs';
import { SelectableItemToken } from './selectable-item.token';
import { FDK_SELECTABLE_ITEM_PROVIDER } from './selectable-list.tokens';
import { FdkDisabledProvider } from '../disabled';
import { FdkReadonlyProvider } from '../readonly';
import { SelectionService } from './selection.service';
import { FdkClickedProvider } from '../clicked';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';

@Directive({
    selector: '[fdkSelectableItem]',
    exportAs: 'fdkSelectableItem',
    standalone: true,
    providers: [
        {
            provide: SelectableItemToken,
            useExisting: SelectableItemDirective
        },
        FdkReadonlyProvider,
        FdkDisabledProvider,
        FdkClickedProvider
    ]
})
export class SelectableItemDirective<ElementType extends Element = HTMLElement, ValueType = any>
    implements SelectableItemToken<ElementType, ValueType>
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
    set fdkSelectableItem(value: BooleanInput) {
        const isSelectable = coerceBooleanProperty(value);
        if (isSelectable !== this._selectable) {
            this._selectable = isSelectable;
        }
    }

    get fdkSelectableItem(): boolean {
        let selectable = this._selectable;
        if (typeof this.provider?.fdkSelectableItem !== 'undefined') {
            selectable = this.provider.fdkSelectableItem;
        }
        return (
            selectable &&
            (!this.disabled$ || !this.disabled$?.fdkDisabled) &&
            (!this.readonly$ || !this.readonly$?.fdkReadonly)
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
        @Optional()
        @Inject(FDK_SELECTABLE_ITEM_PROVIDER)
        private provider: Partial<SelectableItemToken<ElementType, ValueType>>,
        private disabled$: FdkDisabledProvider,
        private readonly$: FdkReadonlyProvider,
        private selectionService: SelectionService<ElementType, ValueType>,
        private _elementRef: ElementRef<ElementType>,
        private _cd: ChangeDetectorRef,
        _clicked: FdkClickedProvider
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
    elementRef(): ElementRef<ElementType> {
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
        if (this.disabled$?.fdkDisabled) {
            this.selectionService.deselectItem(this);
        }
        this._updateSelectableWatcher();
    }

    /** @hidden */
    private _updateSelectableWatcher(): void {
        this.selectionService.listenToItemInteractions();
    }
}
