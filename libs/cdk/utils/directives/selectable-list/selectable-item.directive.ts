import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectorRef, Directive, ElementRef, EventEmitter, Inject, Input, Optional, Output } from '@angular/core';
import { Observable, merge } from 'rxjs';
import { FdkClickedProvider } from '../clicked';
import { FdkDisabledProvider } from '../disabled';
import { FdkReadonlyProvider } from '../readonly';
import { SelectableItemToken } from './selectable-item.token';
import { FDK_SELECTABLE_ITEM_PROVIDER } from './selectable-list.tokens';
import { SelectionService } from './selection.service';

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
    /** @ignore */
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

    /** @ignore */
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

    /** @ignore */
    @Output()
    clicked: Observable<MouseEvent | KeyboardEvent>;

    /** Event emitted when selection state being changed for selectable item. */
    @Output()
    selected = new EventEmitter<boolean>();

    /** @ignore */
    private _value!: ValueType;
    /** @ignore */
    private _selected = false;
    /** @ignore */
    private _selectable = true;

    /** @ignore */
    constructor(
        @Optional()
        @Inject(FDK_SELECTABLE_ITEM_PROVIDER)
        private provider: Partial<SelectableItemToken<ElementType, ValueType>>,
        private disabled$: FdkDisabledProvider,
        private readonly$: FdkReadonlyProvider,
        private selectionService: SelectionService<ElementType, ValueType>,
        public readonly elementRef: ElementRef<ElementType>,
        private _cd: ChangeDetectorRef,
        _clicked: FdkClickedProvider
    ) {
        this.clicked = this.provider?.clicked || _clicked.asObservable();
        this._listenToDisablingEvents();
    }

    /** @ignore */
    getSelected(): boolean {
        if (this.provider?.getSelected) {
            return this.provider.getSelected();
        }
        return this._selected;
    }

    /** @ignore */
    setSelected(isSelected: boolean): void {
        if (this.provider?.setSelected) {
            this.provider.setSelected(isSelected);
        } else {
            this._selected = isSelected;
            const htmlElement = this.elementRef.nativeElement;
            const { classList } = htmlElement;
            if (isSelected) {
                classList.add('is-selected');
            } else {
                classList.remove('is-selected');
            }
            htmlElement.setAttribute('aria-selected', `${isSelected}`);
        }

        this.selected.emit(isSelected);
    }

    /** @ignore */
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

    /** @ignore */
    private _updateSelectionAndSelectableWatcher(): void {
        if (this.disabled$?.fdkDisabled) {
            this.selectionService.deselectItem(this);
        }
        this._updateSelectableWatcher();
    }

    /** @ignore */
    private _updateSelectableWatcher(): void {
        this.selectionService.listenToItemInteractions();
    }
}
