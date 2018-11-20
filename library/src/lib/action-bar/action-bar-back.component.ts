import { Component, ElementRef, Inject } from '@angular/core';
import { AbstractFdNgxClass } from '../utils/abstract-fd-ngx-class';

@Component({
    selector: 'fd-action-bar-back',
    templateUrl: './action-bar-back.component.html'
})
export class ActionBarBackComponent extends AbstractFdNgxClass {
    _setProperties() {
        this._addClassToElement('fd-action-bar__back');
    }

    constructor(@Inject(ElementRef) elementRef: ElementRef) {
        super(elementRef);
    }
}
