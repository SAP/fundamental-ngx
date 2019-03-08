import { Component, ElementRef, HostBinding, Inject, Input } from '@angular/core';
import { AbstractFdNgxClass } from '../utils/abstract-fd-ngx-class';

@Component({
    selector: 'fd-panel',
    templateUrl: './panel.component.html',
    styles: [':host {display: block;}']
})
export class PanelComponent extends AbstractFdNgxClass {
    @Input() columnSpan: number;

    @Input() backgroundImage: string;

    @HostBinding('class.fd-panel') true;

    _setProperties() {
        if (this.columnSpan) {
            this._addClassToElement('fd-has-grid-column-span-' + this.columnSpan);
        }
        if (this.backgroundImage) {
            this._addStyleToElement('background-image', 'url("' + this.backgroundImage + '")');
        }
    }

    constructor(@Inject(ElementRef) elementRef: ElementRef) {
        super(elementRef);
    }
}
