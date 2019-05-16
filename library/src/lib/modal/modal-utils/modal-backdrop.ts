import { Component, ElementRef, HostBinding, HostListener, OnInit, ViewEncapsulation } from '@angular/core';
import { ModalRef } from './modal-ref';
import { AbstractFdNgxClass } from '../../utils/abstract-fd-ngx-class';
import { modalFadeNgIf } from './modal-animations';

@Component({
    selector: 'fd-modal-overlay',
    template: ``,
    host: {
        'tabindex': '-1',
        '[@modal-fade]': ''
    },
    animations: [
        modalFadeNgIf
    ],
    encapsulation: ViewEncapsulation.None
})
export class ModalBackdrop extends AbstractFdNgxClass implements OnInit {

    backdropClass: string = '';
    backdropClickCloseable: boolean = true;

    @HostBinding('class.fd-overlay') overlayMain = true;
    @HostBinding('class.fd-overlay--modal') overlayModal = true;

    constructor(private elRef: ElementRef,
                private modalRef: ModalRef) {
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
