import { Component, ElementRef, Inject } from '@angular/core';
import { AbstractCustomClassManager } from '../utils/AbstractCustomClassManager';

@Component({
    selector: 'fd-action-bar-header',
    templateUrl: './action-bar-header.component.html'
})
export class ActionBarHeaderComponent extends AbstractCustomClassManager {
    
    _setProperties() {
        this._addClassToElement('fd-action-bar__header');
    }

    constructor(@Inject(ElementRef) elementRef: ElementRef) {
        super(elementRef);
    }
}
