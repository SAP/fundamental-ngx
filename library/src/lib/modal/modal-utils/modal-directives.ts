import { Directive, HostBinding } from '@angular/core';

@Directive({
    // TODO to be discussed
    // tslint:disable-next-line:directive-selector
    selector: '[fd-modal-title]'
})
export class ModalTitleDirective {
    @HostBinding('class.fd-modal__title') modalTitle = true;
}

@Directive({
    // TODO to be discussed
    // tslint:disable-next-line:directive-selector
    selector: '[fd-modal-close-btn]'
})
export class ModalCloseButtonDirective {
    @HostBinding('class.fd-button--light') lightButton = true;
    @HostBinding('class.fd-modal__close') modalClose = true;
}
