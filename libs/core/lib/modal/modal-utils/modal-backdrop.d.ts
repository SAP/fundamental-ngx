import { ElementRef, OnInit } from '@angular/core';
import { AbstractFdNgxClass } from '../../utils/abstract-fd-ngx-class';
import { ModalRef } from './modal-ref';
export declare class ModalBackdrop extends AbstractFdNgxClass implements OnInit {
    private elRef;
    private modalRef;
    backdropClass: string;
    backdropClickCloseable: boolean;
    overlayMain: boolean;
    overlayModal: boolean;
    constructor(elRef: ElementRef, modalRef: ModalRef);
    ngOnInit(): void;
    _setProperties(): void;
    closeModal(): void;
}
