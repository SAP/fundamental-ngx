import {
    ChangeDetectorRef,
    ContentChild,
    Directive,
    ElementRef,
    EventEmitter,
    HostBinding,
    HostListener,
    Input,
    Output
} from '@angular/core';
import { Nullable } from '@fundamental-ngx/cdk/utils';
import { NestedItemLink } from '../nested-item/nested-item.interface';
import { NestedItemService } from '../nested-item/nested-item.service';
import { NestedListTitleDirective } from '../nested-list-directives';

@Directive({
    selector: '[fdNestedLink], [fd-nested-list-link]',
    standalone: true
})
export class NestedLinkDirective implements NestedItemLink {
    /** Function that is called on click event dispatch on this element. */
    @Input()
    onClickCallback: () => void;

    /** Whether this element is selected*/
    @Input()
    @HostBinding('class.is-selected')
    selected = false;

    /** @ignore */
    @HostBinding('attr.aria-label')
    _ariaLabel: string;

    /** @ignore */
    @Input()
    @HostBinding('attr.aria-describedby')
    ariaDescribedby: Nullable<string | number>;

    /** Event thrown, when selected state is changed */
    @Output()
    selectedChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    /** @ignore */
    @HostBinding('class.fd-nested-list__link')
    fdNestedListItemClass = true;

    /** @ignore */
    @HostBinding('attr.tabindex')
    tabIndex = 0;

    /** @ignore */
    @HostBinding('attr.role')
    role = 'treeitem';

    /**
     *  @ignore
     *  Reference to title element, it is used, to get title for condensed mode.
     */
    @ContentChild(NestedListTitleDirective)
    title: NestedListTitleDirective;

    /** @ignore */
    constructor(
        public changeDetRef: ChangeDetectorRef,
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
