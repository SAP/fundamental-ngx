import {
    ChangeDetectorRef,
    ContentChild,
    Directive,
    ElementRef,
    HostBinding,
    HostListener,
    Input,
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
    onClickCallback: Function;

    /** Whether this element is selected*/
    @Input()
    @HostBinding('class.is-selected')
    selected: boolean = false;

    /** @hidden */
    @HostBinding('class.fd-nested-list__link')
    fdNestedListItemClass: boolean = true;

    /**
     * @hidden
     */
    @HostBinding('attr.tabindex')
    tabIndex: number = 0;

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
    onClick(event: MouseEvent): void {
        if (this.onClickCallback) {
            this.onClickCallback();
        }
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
