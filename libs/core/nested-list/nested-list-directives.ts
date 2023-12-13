import { AsyncPipe } from '@angular/common';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Directive,
    ElementRef,
    HostBinding,
    HostListener,
    Input,
    Optional,
    ViewEncapsulation
} from '@angular/core';
import { RtlService } from '@fundamental-ngx/cdk/utils';
import { IconComponent } from '@fundamental-ngx/core/icon';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { NestedItemService } from './nested-item/nested-item.service';

let uniqueId = 0;

@Directive({
    selector: '[fdNestedDirectivesHeader], [fd-nested-list-header]',
    standalone: true
})
export class NestedListHeaderDirective {
    /** Id of the element. */
    @Input()
    @HostBinding('attr.id')
    id: string | null = `fd-nested-list-group-header-${++uniqueId}`;

    /** @ignore */
    @HostBinding('class.fd-nested-list__group-header')
    fdNestedListHeaderClass = true;

    /** @ignore */
    constructor(private _elementRef: ElementRef) {}

    /** Get the header title */
    get title(): string {
        return this._elementRef.nativeElement.textContent;
    }
}

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: '[fdNestedDirectivesIcon], [fd-nested-list-icon]',
    template: `<ng-content></ng-content>`,
    standalone: true
})
export class NestedListIconComponent extends IconComponent {
    /** Role attribute */
    @Input()
    @HostBinding('attr.role')
    role = 'presentation';

    /** @ignore */
    @HostBinding('class.fd-nested-list__icon')
    fdNestedListIconClass = true;
}

@Directive({
    selector: '[fdNestedDirectivesTitle], [fd-nested-list-title]',
    standalone: true
})
export class NestedListTitleDirective {
    /** @ignore */
    @HostBinding('class.fd-nested-list__title')
    fdNestedListTitleClass = true;

    /** @ignore */
    constructor(private elementRef: ElementRef) {}

    /** Returns element's InnerText */
    getInnerText(): string {
        return this.elementRef && this.elementRef.nativeElement.textContent;
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
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [IconComponent, AsyncPipe]
})
export class NestedListExpandIconComponent {
    /** @ignore */
    @HostBinding('class.fd-nested-list__button')
    fdNestedListTitleClass = true;

    /** @ignore */
    @HostBinding('class.fd-button')
    fdButtonClass = true;

    /**
     * @ignore
     * Attribute controlled by the parent `NestedItemDirective`
     */
    @HostBinding('class.is-expanded')
    @HostBinding('attr.aria-expanded')
    expanded = false;

    /** @ignore */
    @HostBinding('attr.aria-hidden')
    ariaHidden = true;

    /** @ignore */
    sideArrowIcon$: Observable<string>;

    /** @ignore */
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

    /** @ignore */
    changeExpandedState(expanded: boolean): void {
        this.expanded = expanded;
        this._changeDetRef.detectChanges();
    }

    /** @ignore Sets expand arrow depending on text direction */
    private _listenOnTextDirection(): void {
        this.sideArrowIcon$ = this._rtlService
            ? this._rtlService.rtl.pipe(map((isRtl) => (isRtl ? 'navigation-left-arrow' : 'navigation-right-arrow')))
            : of('navigation-right-arrow');
    }
}
