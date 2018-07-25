import { Component, ElementRef, Inject, Input } from '@angular/core';
import { AbstractCustomClassManager } from '../utils/AbstractCustomClassManager';

@Component({
    selector: 'fd-panel',
    templateUrl: './panel.component.html'
})
export class PanelComponent extends AbstractCustomClassManager {
    @Input() span;

    _setProperties() {
        this._addClassToElement('fd-panel');
        if (this.span) {
            this._addClassToElement('fd-has-grid-column-span-' + this.span);
        }
    }

    constructor(@Inject(ElementRef) elementRef: ElementRef) {
        super(elementRef);
    }
}