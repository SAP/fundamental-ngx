import {
    AfterContentInit,
    ChangeDetectorRef, ContentChild,
    Directive,
    ElementRef,
    EventEmitter,
    HostBinding, HostListener,
    Input,
    OnInit,
    Output,
    Renderer2
} from '@angular/core';
import { NestedLinkDirective } from '../nested-link/nested-link.directive';
import { NestedListExpandIconDirective } from '../nested-list-directives';
import { NestedItemService } from '../nested-item/nested-item.service';

@Directive({
    selector: '[fdNestedListContent], [fd-nested-list-content]',
    host: {
        'tabindex': '0'
    }
})
export class NestedListContentDirective implements AfterContentInit {

    /** @hidden */
    @HostBinding('class.fd-nested-list__content')
    fdNestedListContentClass: boolean = true;

    /** Event that is thrown, when any keyboard event is dispatched on this element */
    @Output()
    readonly keyboardTriggered: EventEmitter<KeyboardEvent> = new EventEmitter<KeyboardEvent>();

    /** Event that is thrown, when this element is clicked */
    @Output()
    readonly clicked: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

    /** @hidden */
    constructor(
        public changeDetRef: ChangeDetectorRef,
        private _renderer: Renderer2,
        private _elementRef: ElementRef,
        private _itemService: NestedItemService,
    ) {}

    /**
     * @hidden
     * Attribute controlled by the parent `NestedItemDirective`
     */
    @HostBinding('class.has-child')
    hasChildren: boolean = false;

    /** Whether this element is selected*/
    @Input()
    @HostBinding('class.is-selected')
    selected: boolean = false;

    @ContentChild(NestedLinkDirective)
    nestedLink: NestedLinkDirective;

    @ContentChild(NestedListExpandIconDirective)
    nestedExpandIcon: NestedListExpandIconDirective;


    /** @hidden */
    ngAfterContentInit(): void {
        if (this.nestedLink) {
            this.nestedLink.tabIndex = -1;
            this.changeDetRef.detectChanges();
        }
    }

    /** Keyboard Event Handler */
    @HostListener('keydown', ['$event'])
    onKeyDown(event: KeyboardEvent): void {
        this.keyboardTriggered.emit(event);
        this._itemService.keyDown.next(event);
    }

    /** Expanded state change propagation method */
    changeExpandedState(expanded: boolean): void {
        if (this.nestedExpandIcon) {
            this.nestedExpandIcon.expanded = expanded;
            this.changeDetRef.detectChanges();
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
            this.nestedLink.click()
        }
    }

}
