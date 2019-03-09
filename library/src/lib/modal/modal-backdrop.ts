import { Component, ElementRef, HostListener, OnInit, ViewEncapsulation } from '@angular/core';
import { ModalRef } from './modal-ref';
import { AbstractFdNgxClass } from '../utils/abstract-fd-ngx-class';
import { modalFadeNgIf } from './modal-animations';

@Component({
    selector: 'fd-modal-overlay',
    template: ``,
    host: {
        class: 'fd-overlay',
        'tabindex': '-1',
        '[@modal-fade]': ''
    },
    styles: [`        
        :host {
            background-color: var(--fd-overlay-background-color);
            top: 0;
            bottom: 0;
            right: 0;
            left: 0;
            z-index: 1000;
        }
    `],
    animations: [
        modalFadeNgIf
    ]
})
export class ModalBackdrop extends AbstractFdNgxClass implements OnInit {

    backdropClass: string = '';
    backdropClickCloseable: boolean = true;

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
