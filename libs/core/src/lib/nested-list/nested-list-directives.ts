import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Directive,
    ElementRef,
    HostBinding,
    HostListener,
    Input,
    OnChanges,
    OnInit,
    Optional,
    ViewEncapsulation
} from '@angular/core';
import { NestedItemService } from './nested-item/nested-item.service';
import { applyCssClass } from '@fundamental-ngx/core/utils';
import { CssClassBuilder } from '@fundamental-ngx/core/utils';
import { RtlService } from '@fundamental-ngx/core/utils';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Directive({
    selector: '[fdNestedDirectivesHeader], [fd-nested-list-header]'
})
export class NestedListHeaderDirective {
    /** @hidden */
    @HostBinding('class.fd-nested-list__group-header')
    fdNestedListHeaderClass = true;

    constructor(private _elementRef: ElementRef) {}

    /** Get the header title */
    get title(): string {
        return this._elementRef.nativeElement.textContent;
    }
}

@Directive({
    selector: '[fdNestedDirectivesIcon], [fd-nested-list-icon]'
})
export class NestedListIconDirective implements CssClassBuilder, OnChanges, OnInit {
    /** The property allows user to pass additional css classes */
    @Input()
    class = '';

    /**
     * The icon name to display. See the icon page for the list of icons
     * here: https://sap.github.io/fundamental-ngx/icon
     */
    @Input() glyph: string;

    /** Role attribute */
    @Input()
    @HostBinding('attr.role')
    role = 'presentation';

    /** @hidden */
    @HostBinding('class.fd-nested-list__icon')
    fdNestedListIconClass = true;

    /** @hidden */
    constructor(private _elementRef: ElementRef) {}

    /** @hidden */
    ngOnChanges(): void {
        this.buildComponentCssClass();
    }

    /** @hidden */
    ngOnInit(): void {
        this.buildComponentCssClass();
    }

    @applyCssClass
    /** CssClassBuilder interface implementation */
    buildComponentCssClass(): string[] {
        return ['fd-nested-list__icon', this.glyph ? `sap-icon--${this.glyph}` : '', this.class];
    }

    /** HasElementRef interface implementation */
    elementRef(): ElementRef<any> {
        return this._elementRef;
    }
}

@Directive({
    selector: '[fdNestedDirectivesTitle], [fd-nested-list-title]'
})
export class NestedListTitleDirective {
    /** @hidden */
    @HostBinding('class.fd-nested-list__title')
    fdNestedListTitleClass = true;

    /** @hidden */
    constructor(private elementRef: ElementRef) {}

    /** Returns element's InnerText */
    getInnerText(): string {
        return this.elementRef && this.elementRef.nativeElement.innerText;
    }
}

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: '[fdNestedListExpandIcon], [fd-nested-list-expand-icon]',
    template: `
        <ng-content></ng-content>
        <fd-icon [glyph]="expanded ? 'navigation-down-arrow' : (sideArrowIcon$ | async)"></fd-icon>
    `,
    host: {
        'aria-haspopup': 'true',
        tabindex: '-1'
    },
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class NestedListExpandIconComponent {
    /** @hidden */
    @HostBinding('class.fd-nested-list__button')
    fdNestedListTitleClass = true;

    /** @hidden */
    @HostBinding('class.fd-button')
    fdButtonClass = true;

    /**
     * @hidden
     * Attribute controlled by the parent `NestedItemDirective`
     */
    @HostBinding('class.is-expanded')
    @HostBinding('attr.aria-expanded')
    expanded = false;

    /** @hidden */
    @HostBinding('attr.aria-hidden')
    ariaHidden = true;

    /** @hidden */
    sideArrowIcon$: Observable<string>;

    constructor(
        private _itemService: NestedItemService,
        private _changeDetRef: ChangeDetectorRef,
        @Optional() private _rtlService: RtlService
    ) {
        this._listenOnTextDirection();
    }

    /** Mouse event handler */
    @HostListener('click', ['$event'])
    onClick(event: MouseEvent): void {
        this.expanded = !this.expanded;
        this._itemService.toggle.next(this.expanded);
        event.stopPropagation();
    }

    /** Handler for focus events */
    @HostListener('focus')
    onFocus(): void {
        this._itemService.focus.next();
    }

    /** @hidden */
    changeExpandedState(expanded: boolean): void {
        this.expanded = expanded;
        this._changeDetRef.detectChanges();
    }

    /** @hidden Sets expand arrow depending on text direction */
    private _listenOnTextDirection(): void {
        this.sideArrowIcon$ = this._rtlService
            ? this._rtlService.rtl.pipe(map((isRtl) => (isRtl ? 'navigation-left-arrow' : 'navigation-right-arrow')))
            : of('navigation-right-arrow');
    }
}
