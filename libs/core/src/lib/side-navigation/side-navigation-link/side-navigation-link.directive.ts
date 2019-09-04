import {
    Input,
    ElementRef,
    Output,
    EventEmitter,
    Directive, HostListener, Inject, HostBinding
} from '@angular/core';
import { AbstractFdNgxClass } from '../../utils/abstract-fd-ngx-class';

/**
 * The component that represents a navigation link.
 * ```html
 *    <a fd-side-nav-link>
 *        <a [attr.href]="'#'">Link Item</a>
 *    </a>
 * ```
 */
@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[fd-side-nav-link]',
})
export class SideNavigationLinkDirective extends AbstractFdNgxClass {

    /** Whether the link has a sublist. */
    @Input()
    hasSublist: boolean = false;

    /** Whether the sub list is opened or closed */
    @Output()
    onSubListOpenChange = new EventEmitter<boolean>();

    @Input()
    sublistIsOpen: boolean = false;

    @HostBinding('attr.role') role = this.hasSublist ? 'button' : '';
    @HostBinding('attr.aria-haspopup') hasPopup = this.hasSublist;
    @HostBinding('tabindex') tabindex = this.hasSublist ? '0' : '';

    /** @hidden */
    _setProperties() {
        this._addClassToElement('fd-side-nav__link');
        if (this.hasSublist) {
            this._addClassToElement('has-child');
            this._addStyleToElement('cursor', 'pointer');
            this.elementRef.nativeElement.setAttribute('aria-expanded', this.sublistIsOpen);
        }
        if (this.sublistIsOpen && this.hasSublist) {
            this._addClassToElement('is-selected');
        }
    }

    /** @hidden */
    constructor(@Inject(ElementRef) private elementRef: ElementRef) {
        super(elementRef);
    }

    /** @hidden */
    @HostListener('keypress', ['$event'])
    onKeypressHandler(event) {
        if (this.hasSublist && (event.code === 'Enter' || event.code === 'Space')) {
            event.preventDefault();
            this.changeSubListIsOpen();
        }
    }

    @HostListener('click', ['$event.target'])
    changeSubListIsOpen() {
        if (this.hasSublist) {
            this.sublistIsOpen = !this.sublistIsOpen;
            this.onSubListOpenChange.emit(this.sublistIsOpen);
            this.ngOnChanges();
        }
    }
}
