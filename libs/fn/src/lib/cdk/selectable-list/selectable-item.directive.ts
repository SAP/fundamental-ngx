import { Directive, ElementRef, Inject, Input, Optional, Output } from '@angular/core';
import { merge, Observable } from 'rxjs';
import { SelectableItemToken } from './selectable-item.token';
import { FN_SELECTABLE_ITEM_PROVIDER } from './selectable-list.tokens';
import { DisabledBehavior, FN_DISABLED, FnDisabledProvider } from '../disabled';
import { FN_READONLY, FnReadonlyProvider, ReadonlyBehavior } from '../readonly';
import { SelectionService } from './selection.service';
import { ClickedObservable } from '../clicked';

@Directive({
    selector: '[fnSelectableItem]',
    providers: [
        {
            provide: SelectableItemToken,
            useExisting: SelectableItemDirective
        },
        FnReadonlyProvider,
        FnDisabledProvider
    ]
})
export class SelectableItemDirective<ValueType = any> implements SelectableItemToken<ValueType> {
    @Input()
    get value(): ValueType {
        if (this.provider && this.provider.value) {
            return this.provider.value;
        }
        return this._value;
    }

    set value(val: ValueType) {
        this._value = val;
    }

    @Output()
    clicked: Observable<MouseEvent | KeyboardEvent> = new ClickedObservable(this);

    get selectable(): boolean {
        // eslint-disable-next-line no-prototype-builtins
        if (typeof this.provider?.selectable !== 'undefined') {
            return this.provider.selectable;
        }
        return (!this.disabled$ || !this.disabled$?.fnDisabled) && (!this.readonly$ || !this.readonly$?.fnReadonly);
    }

    private _value!: ValueType;
    private _selected = false;

    constructor(
        @Optional() @Inject(FN_SELECTABLE_ITEM_PROVIDER) private provider: Partial<SelectableItemToken<ValueType>>,
        @Inject(FN_DISABLED) private disabled$: DisabledBehavior,
        @Inject(FN_READONLY) private readonly$: ReadonlyBehavior,
        private selectionService: SelectionService,
        private _elementRef: ElementRef<HTMLElement>
    ) {
        this.clicked = this.provider?.clicked || this.clicked;
        this._listenToDisablingEvents();
    }

    getSelected(): boolean {
        if (this.provider?.getSelected) {
            return this.provider.getSelected();
        }
        return this._selected;
    }

    setSelected(isSelected: boolean): void {
        if (this.provider?.setSelected) {
            this.provider.setSelected(isSelected);
        } else {
            this._selected = isSelected;
            const htmlElement = this._elementRef.nativeElement;
            const { classList } = htmlElement;
            if (isSelected) {
                classList.add('fn-tabs__item--selected');
            } else {
                classList.remove('fn-tabs__item--selected');
            }
            htmlElement.setAttribute('aria-selected', `${isSelected}`);
        }
    }

    elementRef(): ElementRef<HTMLElement> {
        return this._elementRef;
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
}
