import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[fd-list-label]',
    host: {
        'class': 'fd-list__label'
    }
})
export class ListLabelDirective {}

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[fd-list-title]',
    host: {
        'class': 'fd-list__title'
    }
})
export class ListTitleDirective {
    /**
     * Enabling this flag causes forcing title directive to not wrap text,
     * instead of wrapping there will be text truncation
     */
    @Input()
    @HostBinding('class.fd-list__title--no-wrap')
    noWrap: boolean = false;
}

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[fd-list-secondary]',
    host: {
        'class': 'fd-list__secondary'
    }
})
export class ListSecondaryDirective {
    /**
     * Enabling this flag causes forcing secondary item directive to not wrap text,
     * instead of wrapping there will be text truncation
     */
    @Input()
    @HostBinding('class.fd-list__secondary--no-wrap')
    noWrap: boolean = false;
}

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[fd-list-group-header]',
    host: {
        'class': 'fd-list__group-header'
    }
})
export class ListGroupHeaderDirective {}

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[fd-list-icon]',
    host: {
        'class': 'fd-list__icon'
    }
})
export class ListIconDirective {}

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[fd-list-footer]',
    host: {
        'class': 'fd-list__footer'
    }
})
export class ListFooterDirective {}
