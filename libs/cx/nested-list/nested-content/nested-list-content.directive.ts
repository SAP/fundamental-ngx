import {
    AfterContentInit,
    ChangeDetectorRef,
    ContentChild,
    DestroyRef,
    Directive,
    ElementRef,
    EventEmitter,
    HostBinding,
    HostListener,
    Input,
    Output,
    inject
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NestedItemService } from '../nested-item/nested-item.service';
import { NestedLinkComponent } from '../nested-link/nested-link.component';
import { NestedListExpandIconComponent } from '../nested-list-directives';

@Directive({
    selector: '[cxNestedListContent], [fdx-nested-list-content]',
    standalone: true,
    host: {
        tabindex: '0'
    }
})
export class NestedListContentDirective implements AfterContentInit {
    /** Whether this element is selected*/
    @Input()
    @HostBinding('class.is-selected')
    selected = false;

    /** @hidden */
    @HostBinding('attr.role')
    role = 'treeitem';

    /** @hidden */
    @HostBinding('attr.aria-expanded')
    ariaExpanded = false;

    /** Event thrown, when selected state is changed */
    @Output()
    selectedChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    /** Event that is thrown, when any keyboard event is dispatched on this element */
    @Output()
    readonly keyboardTriggered: EventEmitter<KeyboardEvent> = new EventEmitter<KeyboardEvent>();

    /** Event that is thrown, when this element is clicked */
    @Output()
    readonly clicked: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

    /** @hidden */
    @HostBinding('class.fdx-nested-list__content')
    cxNestedListContentClass = true;

    /**
     * @hidden
     * Attribute controlled by the parent `NestedItemComponent`
     */
    @HostBinding('class.has-child')
    hasChildren = false;

    /** @hidden */
    @ContentChild(NestedLinkComponent)
    nestedLink: NestedLinkComponent;

    /** @hidden */
    @ContentChild(NestedListExpandIconComponent)
    nestedExpandIcon: NestedListExpandIconComponent;

    /** @hidden */
    private readonly _destroyRef = inject(DestroyRef);

    /** @hidden */
    constructor(
        public changeDetRef: ChangeDetectorRef,
        private _elementRef: ElementRef,
        private _itemService: NestedItemService
    ) {}

    /** Keyboard Event Handler */
    @HostListener('keydown', ['$event'])
    onKeyDown(event: KeyboardEvent): void {
        this.keyboardTriggered.emit(event);
        this._itemService.keyDown.next(event);
    }

    /** Handler for mouse events */
    @HostListener('click', ['$event'])
    onClick(): void {
        this._itemService.click.next();
    }

    /** @hidden */
    ngAfterContentInit(): void {
        this._makeLinkUnFocusable();
        this._setFocusSubscription();
    }

    /** Method to trigger selected state change */
    changeSelected(selected: boolean): void {
        this.selected = selected;
        this.selectedChange.emit(selected);
    }

    /** Set focus on the element. */
    focus(): void {
        this._elementRef.nativeElement.focus();
    }

    /** Dispatches the click event on the element */
    click(): void {
        this.focus();
        if (this.nestedLink) {
            this.nestedLink.click();
        }
    }

    /** Add subscription for child focusing */
    private _setFocusSubscription(): void {
        this._itemService.focus.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(() => this.focus());
    }

    /** Hide link child element from tab key */
    private _makeLinkUnFocusable(): void {
        if (this.nestedLink) {
            this.nestedLink.elementRef.nativeElement.tabIndex = -1;
            this.changeDetRef.detectChanges();
        }
    }
}
