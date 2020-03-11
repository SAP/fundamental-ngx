import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { dialogFadeNgIf } from './dialog.animations';
import { DialogRef } from './dialog-ref.class';
import { Subscription } from 'rxjs';

@Component({
    selector: 'fd-dialog-overlay',
    template: `
        <ng-content></ng-content>`,
    host: {
        'tabindex': '-1',
        '[@dialog-fade]': '',
        '[class]': 'backdropClass',
        '[class.fd-dialog]': 'hasBackdrop',
        '[class.fd-dialog--active]': 'showDialogWindow'
    },
    animations: [
        dialogFadeNgIf
    ],
    encapsulation: ViewEncapsulation.None
})
export class DialogOverlay implements OnInit, OnDestroy {

    /** @hidden Custom backdrop class | ModalConfig */
    hasBackdrop: boolean = true;

    /** @hidden Custom backdrop class | ModalConfig */
    backdropClass: string = '';

    /** @hidden Whenever dialog should be closed on overlay click | ModalConfig */
    backdropClickCloseable: boolean = true;

    /** @hidden Whenever dialog should be visible */
    showDialogWindow: boolean;

    /** @hidden */
    private _subscriptions = new Subscription();

    constructor(private _modalRef: DialogRef,
                private _elementRef: ElementRef) {
    }

    ngOnInit(): void {
        this._listenOnHidden();
    }

    ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
    }

    @HostListener('mousedown', ['$event.target'])
    closeModal(target): void {
        if (this.backdropClickCloseable && target === this._elementRef.nativeElement) {
            this._modalRef.dismiss('backdrop');
        }
    }

    private _listenOnHidden() {
        this._subscriptions.add(
            this._modalRef.onHide.subscribe(isHidden => this.showDialogWindow = !isHidden)
        );
    }
}
