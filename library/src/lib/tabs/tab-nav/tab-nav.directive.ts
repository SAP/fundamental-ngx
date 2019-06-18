import { Directive } from '@angular/core';

@Directive({
    // TODO to be discussed
    // tslint:disable-next-line:directive-selector
    selector: '[fd-tab-nav]',
    host: {
        class: 'fd-tabs',
        role: 'tablist'
    }
})
export class TabNavDirective {}
