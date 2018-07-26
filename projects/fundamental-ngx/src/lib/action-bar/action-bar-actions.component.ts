import { Component, ElementRef, Inject } from '@angular/core';
import { AbstractCustomClassManager } from '../utils/AbstractCustomClassManager';

@Component({
    selector: 'fd-action-bar-actions',
    templateUrl: './action-bar-actions.component.html'
})
export class ActionBarActionsComponent extends AbstractCustomClassManager {
    
    _setProperties() {
        this._addClassToElement('fd-action-bar__actions');
    }

    constructor(@Inject(ElementRef) elementRef: ElementRef) {
        super(elementRef);
    }
}
