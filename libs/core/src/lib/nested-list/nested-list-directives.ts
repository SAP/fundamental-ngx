import { ChangeDetectorRef, Directive, ElementRef, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';
import { AbstractFdNgxClass } from '../utils/abstract-fd-ngx-class';
import { NestedItemService } from './nested-item/nested-item.service';

@Directive({
    selector: '[fdNestedDirectivesHeader], [fd-nested-list-header]'
})
export class NestedListHeaderDirective {

    /** @hidden */
    @HostBinding('class.fd-nested-list__group-header')
    fdNestedListHeaderClass: boolean = true;

}

@Directive({
    selector: '[fdNestedDirectivesIcon], [fd-nested-list-icon]'
})
export class NestedListIconDirective extends AbstractFdNgxClass {

    /** @hidden */
    @HostBinding('class.fd-nested-list__icon')
    fdNestedListIconClass: boolean = true;

    /**
     * The icon name to display. See the icon page for the list of icons
     * here: https://sap.github.io/fundamental-ngx/icon
     */
    @Input() glyph: string;

    /** @hidden */
    _setProperties() {
        if (this.glyph) {
            this._addClassToElement('sap-icon--' + this.glyph);
        }
        this._addClassToElement('fd-nested-list__icon');
    }

    /** @hidden */
    constructor(private elementRef: ElementRef) {
        super(elementRef);
    }

}

@Directive({
    selector: '[fdNestedDirectivesTitle], [fd-nested-list-title]'
})
export class NestedListTitleDirective {

    /** @hidden */
    @HostBinding('class.fd-nested-list__title')
    fdNestedListTitleClass: boolean = true;

    /** @hidden */
    constructor(
        private elementRef: ElementRef
    ) {
    }

    /** Returns element's InnerText */
    public getInnerText(): string {
        return this.elementRef && this.elementRef.nativeElement.innerText;
    }
}

@Directive({
    selector: '[fdNestedListExpandIcon], [fd-nested-list-expand-icon]',
    host: {
        'aria-haspopup': 'true'
    }
})
export class NestedListExpandIconDirective {

    /** @hidden */
    @HostBinding('class.fd-nested-list__expand-icon')
    fdNestedListTitleClass: boolean = true;

    /**
     * @hidden
     * Attribute controlled by the parent `NestedItemDirective`
     */
    @HostBinding('class.is-expanded')
    @HostBinding('attr.aria-expanded')
    expanded: boolean = false;

    /** TODO */
    @Output()
    clicked: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

    constructor (
        private _itemService: NestedItemService
    ) {}

    /** TODO */
    @HostListener('click', ['$event'])
    onClick(event: MouseEvent): void {
        this.expanded = !this.expanded;
        this._itemService.toggle.next(this.expanded);
        this.clicked.emit(event);
    }
}
