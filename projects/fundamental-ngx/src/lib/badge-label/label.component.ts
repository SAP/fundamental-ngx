import { Component, ElementRef, Inject, Input } from '@angular/core';
import { AbstractCustomClassManager } from '../utils/AbstractCustomClassManager';

@Component({
    selector: 'fd-label',
    templateUrl: './badge-label.component.html'
})
export class LabelComponent extends AbstractCustomClassManager {
    @Input() status: string = '';
    @Input() isStatusLabel: boolean = false;
    @Input() statusIcon: string = '';
    @Input() indicator: string = '';
    @Input() icon: string = '';
    @Input() semantic: string = '';

    _setProperties() {
        if (this.isStatusLabel) {
            this._addClassToElement('fd-status-label');
            if (this.status) {
                this._addClassToElement('fd-status-label--' + this.status);
            }
            if (this.statusIcon) {
                this._addClassToElement('fd-status-label--' + this.statusIcon);
            }
            if (this.icon) {
                this._addClassToElement('sap-icon--' + this.icon);
            }
        } else {
            this._addClassToElement('fd-label');
        if (this.status) {
              this._addClassToElement('fd-label--' + this.status);
            }
        }
    }

    constructor(@Inject(ElementRef) elementRef: ElementRef) {
        super(elementRef);
    }
}
