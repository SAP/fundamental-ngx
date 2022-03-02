import {
    ChangeDetectorRef,
    ContentChild,
    Directive,
    ElementRef,
    EventEmitter,
    HostBinding,
    HostListener,
    Input,
    Output,
    Renderer2
} from '@angular/core';
import { NestedListTitleDirective } from '../nested-list-directives';
import { NestedItemService } from '../nested-item/nested-item.service';

@Directive({
    selector: '[fdNestedLink], [fd-nested-list-link]'
})
export class NestedLinkDirective {
    /** Function that is called on click event dispatch on this element. */
    @Input()
    onClickCallback: () => void;

    /** Whether this element is selected*/
    @Input()
    @HostBinding('class.is-selected')
    selected = false;

    /** @hidden */
    @HostBinding('attr.aria-label')
    _ariaLabel: string;

    /** Event thrown, when selected state is changed */
    @Output()
    selectedChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    /** @hidden */
    @HostBinding('class.fd-nested-list__link')
    fdNestedListItemClass = true;

    /**
     * @hidden
     */
    @HostBinding('attr.tabindex')
    tabIndex = 0;

    /**
     *  @hidden
     *  Reference to title element, it is used, to get title for condensed mode.
     */
    @ContentChild(NestedListTitleDirective)
    title: NestedListTitleDirective;

    /** @hidden */
    constructor(
        public changeDetRef: ChangeDetectorRef,
        private _renderer: Renderer2,
        private _elementRef: ElementRef,
        private _itemService: NestedItemService
    ) {}

    /** Handler for keyboard events */
    @HostListener('keydown', ['$event'])
    onKeyDown(event: KeyboardEvent): void {
        this._itemService.keyDown.next(event);
    }

    /** Handler for mouse events */
    @HostListener('click', ['$event'])
    onClick(): void {
        this._itemService.click.next();
        if (this.onClickCallback) {
            this.onClickCallback();
        }
    }

    /** Handler for focus events */
    @HostListener('focus')
    onFocus(): void {
        this._itemService.focus.next();
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
        this._elementRef.nativeElement.click();
    }

    /** Returns the title value of the title directive */
    getTitle(): string {
        return this.title && this.title.getInnerText();
    }
}
