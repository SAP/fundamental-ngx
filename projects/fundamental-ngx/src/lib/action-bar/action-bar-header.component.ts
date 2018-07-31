import { Component, ElementRef, Inject } from '@angular/core';
import { AbstractFdNgxClass } from '../utils/abstract-fd-ngx-class';

@Component({
    selector: 'fd-action-bar-header',
    templateUrl: './action-bar-header.component.html'
})
export class ActionBarHeaderComponent extends AbstractFdNgxClass {
    _setProperties() {
        this._addClassToElement('fd-action-bar__header');
    }

    constructor(@Inject(ElementRef) elementRef: ElementRef) {
        super(elementRef);
    }
}
