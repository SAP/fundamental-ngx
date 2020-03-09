import { Component, ElementRef, HostBinding, HostListener, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractFdNgxClass } from '../../utils/abstract-fd-ngx-class';
import { dialogFadeNgIf } from './dialog-animations';
import { DialogRef } from './dialog-ref';

@Component({
    selector: 'fd-dialog-overlay',
    template: ``,
    host: {
        'tabindex': '-1',
        '[@dialog-fade]': ''
    },
    animations: [
        dialogFadeNgIf
    ],
    encapsulation: ViewEncapsulation.None
})
export class DialogBackdrop extends AbstractFdNgxClass implements OnInit {

    backdropClass: string = '';
    backdropClickCloseable: boolean = true;

    @HostBinding('class.fd-overlay') overlayMain = true;
    @HostBinding('class.fd-overlay--modal') overlayModal = true;

    constructor(private elRef: ElementRef,
                private modalRef: DialogRef) {
        super(elRef);
    }

    ngOnInit(): void {
        this._setProperties();
    }

    _setProperties(): void {
        if (this.backdropClass) {
            this._addClassToElement(this.backdropClass);
        }
    }

    @HostListener('click')
    closeModal(): void {
        if (this.backdropClickCloseable) {
            this.modalRef.dismiss('backdrop');
        }
    }
}
