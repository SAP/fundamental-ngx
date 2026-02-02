import { Directive } from '@angular/core';

@Directive({
    // TODO to be discussed
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-layout-panel-title]',
    host: {
        class: 'fd-title fd-title--h5'
    }
})
export class LayoutPanelTitleDirective {}
