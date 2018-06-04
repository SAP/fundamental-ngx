import { Component, Input, Directive, ViewEncapsulation, Inject } from '@angular/core';
import { NgModule } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalService } from './modal.service';

@Component({
    selector: 'fd-modal',
    encapsulation: ViewEncapsulation.None,
    styles: [
        `
            .fd-modal__body {
                overflow: hidden;
            }

            .fd-modal__footer {
                border-top: 1px solid #eeeeef;
            }

            .fd-modal {
                margin: 0 auto;
            }

            /*!
              * Bootstrap (http://getbootstrap.com)
              * Copyright 2011-2018 Twitter, Inc.
              * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
              */

            .modal-backdrop {
                position: fixed;
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
                z-index: 1040;
                background-color: rgba(0, 0, 0, 0.5);
            }

            .modal-open {
                position: fixed;
                z-index: 9999;
                left: 0;
                top: 0;
                margin: auto;
                width: fit-content;
                overflow: hidden;
                background-color: rgba(0, 0, 0, 0.4);
            }

            .modal {
                position: fixed;
                z-index: 9999;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                background-color: #ffffff;
                margin: auto;
                width: 460px;
                min-height: 150px;
                outline: none;
                border-radius: 4px;
            }
        `
    ],
    template: `
    <div class="fd-modal">
      <div class="fd-modal__content" role="document">
        <ng-content select="fd-modal-header"></ng-content>
        <ng-content select="fd-modal-body"></ng-content>
        <ng-content select="fd-modal-footer"></ng-content>
      </div>
    </div>
  `
})
export class ModalComponent {
    constructor(@Inject(NgbModal) private modalService: NgbModal) {}

    open() {
        this.modalService.open(ModalComponent);
    }
}

@Component({
    selector: 'fd-modal-header',
    template: `
    <div class="fd-modal__header">
      <h1 class="fd-modal__title">
        <ng-content></ng-content>
      </h1>
      <button class="fd-modal__close" aria-label="close" (click)="modalService.close()"></button>
    </div>
  `
})
export class ModalHeader {
    constructor(@Inject(ModalService) public modalService: ModalService) {}
}

@Component({
    selector: 'fd-modal-body',
    template: `
    <div class="fd-modal__body">
      <ng-content></ng-content>
    </div>
  `
})
export class ModalBody {}

@Component({
    selector: 'fd-modal-footer',
    template: `
    <footer class="fd-modal__footer">
      <div class="fd-modal__actions">
        <ng-content></ng-content>
      </div>
    </footer>
  `
})
export class ModalFooter {}
