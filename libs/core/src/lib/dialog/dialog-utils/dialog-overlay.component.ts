import {
    Component,
    ElementRef,
    HostListener,
    Inject,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import { dialogFadeNgIf } from './dialog.animations';
import { DialogRef } from './dialog-ref.class';
import { Subscription } from 'rxjs';
import { DIALOG_CONFIG, DialogConfig } from './dialog-config.class';

@Component({
    selector: 'fd-dialog-overlay',
    template: `
        <ng-content></ng-content>`,
    host: {
        'tabindex': '-1',
        '[@dialog-fade]': '',
        '[class]': 'dialogConfig.backdropClass',
        '[class.fd-dialog]': 'dialogConfig.hasBackdrop',
        '[class.fd-dialog--active]': 'showDialogWindow'
    },
    animations: [
        dialogFadeNgIf
    ],
    encapsulation: ViewEncapsulation.None
})
export class DialogOverlay implements OnInit, OnDestroy {

    /** @hidden Whenever dialog should be visible */
    showDialogWindow: boolean;

    /** @hidden */
    private _subscriptions = new Subscription();

    constructor(
        @Inject(DIALOG_CONFIG) public dialogConfig: DialogConfig,
        private _dialogRef: DialogRef,
        private _elementRef: ElementRef) {
    }

    /** @hidden */
    ngOnInit(): void {
        this._listenOnHidden();
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
    }

    /** @hidden Listen and close dialog on Escape key */
    @HostListener('mousedown', ['$event.target'])
    closeModal(target: ElementRef): void {
        if (this.dialogConfig.backdropClickCloseable && target === this._elementRef.nativeElement) {
            this._dialogRef.dismiss('backdrop');
        }
    }

    /** @hidden Listen on dialog visibility */
    private _listenOnHidden(): void {
        this._subscriptions.add(
            this._dialogRef.onHide.subscribe(isHidden => this.showDialogWindow = !isHidden)
        );
    }
}
