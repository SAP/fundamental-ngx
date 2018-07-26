import { Component, ElementRef, Inject } from '@angular/core';
import { AbstractCustomClassManager } from '../utils/AbstractCustomClassManager';

@Component({
    selector: 'fd-action-bar-back',
    templateUrl: './action-bar-back.component.html'
})
export class ActionBarBackComponent extends AbstractCustomClassManager {
   
    _setProperties() {
        this._addClassToElement('fd-action-bar__back');
    }

    constructor(@Inject(ElementRef) elementRef: ElementRef) {
        super(elementRef);
    }
}
