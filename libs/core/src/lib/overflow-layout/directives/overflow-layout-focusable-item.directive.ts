import {
    Directive,
    ElementRef,
    EventEmitter,
    HostBinding,
    HostListener,
    Inject,
    Input,
    OnInit,
    Optional,
    Output
} from '@angular/core';
import { OverflowLayoutFocusableItem } from '../interfaces/overflow-focusable-item.interface';
import { OverflowItem } from '../interfaces/overflow-item.interface';
import { OverflowLayoutComponent } from '../overflow-layout.component';
import { FD_OVERFLOW_FOCUSABLE_ITEM } from '../tokens/overflow-focusable-item.token';
import { FD_OVERFLOW_ITEM } from '../tokens/overflow-item.token';

@Directive({
    selector: '[fdOverflowLayoutFocusableItem], [fdOverflowLayoutItem][focusable]',
    providers: [
        {
            provide: FD_OVERFLOW_FOCUSABLE_ITEM,
            useExisting: OverflowLayoutFocusableItemDirective
        }
    ]
})
export class OverflowLayoutFocusableItemDirective implements OverflowLayoutFocusableItem, OnInit {
    /** Whether the item should be focusable. */
    @Input()
    focusable = true;

    /** Whether the item should be navigable via keyboard. */
    @Input()
    navigable = true;

    /** Event emitted when user selected item via keyboard (enter or space key was pressed). */
    @Output()
    keyboardSelected = new EventEmitter<KeyboardEvent>();

    /** @hidden */
    @HostBinding('attr.tabindex')
    private get _tabindex(): number {
        return this.focusable ? 0 : -1;
    }

    /** Whether the item is hidden. */
    get hidden(): boolean {
        return !!this._overflowItem?.hidden;
    }

    /** @hidden */
    @HostListener('focus')
    private _onFocus(): void {
        this._overflowContainer.setFocusedElement(this);
    }

    /** @hidden */
    @HostListener('keyup.enter', ['$event'])
    @HostListener('keyup.space', ['$event'])
    private _onSelect(event: KeyboardEvent): void {
        this.keyboardSelected.emit(event);
    }

    /** @hidden */
    constructor(
        private readonly _overflowContainer: OverflowLayoutComponent,
        @Inject(FD_OVERFLOW_ITEM) @Optional() private readonly _overflowItem: OverflowItem,
        public readonly elementRef: ElementRef<HTMLElement>
    ) {}

    /** @hidden */
    ngOnInit(): void {
        if (this._overflowItem) {
            this._overflowItem.focusableItem = this;
        }
    }

    /** @hidden */
    focus(): void {
        this.elementRef.nativeElement.focus();
    }
}
