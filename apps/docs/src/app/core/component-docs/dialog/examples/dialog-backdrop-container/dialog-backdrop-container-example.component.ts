import { Component, ViewEncapsulation } from '@angular/core';
import { DialogService } from '@fundamental-ngx/core';

@Component({
    selector: 'fd-dialog-backdrop-container-example',
    templateUrl: './dialog-backdrop-container-example.component.html',
    encapsulation: ViewEncapsulation.None,
    styles: [`
        .static-dialog {
            position: static !important;
        }
    `]
})
export class DialogBackdropContainerExampleComponent {

    constructor(private _dialogService: DialogService) {}

    openCustomBackdrop(modal): void {
        this._dialogService.open(modal, {
            width: '300px',
            responsivePadding: true,
            backdropClass: 'modal-custom-overlay-example',
            data: `This modal has a custom backdrop!`,
        });
    }

    openInCustomContainer(modal, containerRef: HTMLElement): void {
        this._dialogService.open(modal, {
            width: '300px',
            container: containerRef,
            responsivePadding: true,
            data: `This modal has been opened inside local div!`,
        });
    }

    openStaticDialog(modal, containerRef: HTMLElement): void {
        this._dialogService.open(modal, {
            width: '300px',
            hasBackdrop: false,
            container: containerRef,
            responsivePadding: true,
            dialogPanelClass: 'static-dialog',
            data: `This modal has been opened inside local div and displayed as static element!`
        });
    }
}
