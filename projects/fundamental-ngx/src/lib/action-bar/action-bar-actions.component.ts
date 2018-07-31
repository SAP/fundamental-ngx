import { Component, ElementRef, Inject } from '@angular/core';
import { AbstractFdNgxClass } from '../utils/abstract-fd-ngx-class';

@Component({
    selector: 'fd-action-bar-actions',
    templateUrl: './action-bar-actions.component.html'
})
export class ActionBarActionsComponent extends AbstractFdNgxClass {
    
    _setProperties() {
        this._addClassToElement('fd-action-bar__actions');
    }

    constructor(@Inject(ElementRef) elementRef: ElementRef) {
        super(elementRef);
    }
}
