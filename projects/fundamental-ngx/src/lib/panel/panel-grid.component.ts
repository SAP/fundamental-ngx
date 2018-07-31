import { Component, ElementRef, Inject, Input } from '@angular/core';
import { AbstractFdNgxClass } from '../utils/abstract-fd-ngx-class';

@Component({
    selector: 'fd-panel-grid',
    templateUrl: './panel-grid.component.html'
})
export class PanelGridComponent extends AbstractFdNgxClass {
    @Input() col;
    @Input() nogap: boolean = false;

    _setProperties() {
        this._addClassToElement('fd-panel-grid');
        if (this.col) {
            this._addClassToElement('fd-panel-grid--' + this.col + 'col');
        }
        if (this.nogap) {
            this._addClassToElement('fd-panel-grid--nogap');
        }
    }

    constructor(@Inject(ElementRef) elementRef: ElementRef) {
        super(elementRef);
    }
}
