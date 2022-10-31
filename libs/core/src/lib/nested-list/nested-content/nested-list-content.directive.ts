import {
    AfterContentInit,
    ChangeDetectorRef,
    ContentChild,
    Directive,
    ElementRef,
    EventEmitter,
    HostBinding,
    HostListener,
    Input,
    OnDestroy,
    Output,
    Renderer2
} from '@angular/core';
import { NestedLinkDirective } from '../nested-link/nested-link.directive';
import { NestedListExpandIconComponent } from '../nested-list-directives';
import { NestedItemService } from '../nested-item/nested-item.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Directive({
    selector: '[fdNestedListContent], [fd-nested-list-content]',
    host: {
        tabindex: '0'
    }
})
export class NestedListContentDirective implements AfterContentInit, OnDestroy {
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
    @HostBinding('class.fd-nested-list__content')
    fdNestedListContentClass = true;

    /**
     * @hidden
     * Attribute controlled by the parent `NestedItemDirective`
     */
    @HostBinding('class.has-child')
    hasChildren = false;

    /** @hidden */
    @ContentChild(NestedLinkDirective)
    nestedLink: NestedLinkDirective;

    /** @hidden */
    @ContentChild(NestedListExpandIconComponent)
    nestedExpandIcon: NestedListExpandIconComponent;

    /** An RxJS Subject that will kill the data stream upon component’s destruction (for unsubscribing)  */
    private readonly onDestroy$: Subject<void> = new Subject<void>();

    /** @hidden */
    constructor(
        public changeDetRef: ChangeDetectorRef,
        private _renderer: Renderer2,
        private _elementRef: ElementRef,
        private _itemService: NestedItemService
    ) {}

    /** @hidden */
    ngAfterContentInit(): void {
        this._makeLinkUnFocusable();
        this._setFocusSubscription();
    }

    /** @hidden */
    ngOnDestroy(): void {
        this.onDestroy$.next();
        this.onDestroy$.complete();
    }

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

    /** Method to trigger selected state change */
    changeSelected(selected: boolean): void {
        this.selected = selected;
        this.selectedChange.emit(selected);
    }

    /** Expanded state change propagation method */
    changeExpandedState(expanded: boolean): void {
        if (this.nestedExpandIcon) {
            this.nestedExpandIcon.changeExpandedState(expanded);
        }
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
        this._itemService.focus.pipe(takeUntil(this.onDestroy$)).subscribe(() => this.focus());
    }

    /** Hide link child element from tab key */
    private _makeLinkUnFocusable(): void {
        if (this.nestedLink) {
            this.nestedLink.tabIndex = -1;
            this.changeDetRef.detectChanges();
        }
    }
}
