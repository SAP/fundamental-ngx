import { Component, ViewEncapsulation } from '@angular/core';
import { DialogService } from '@fundamental-ngx/core';

@Component({
    selector: 'fd-dialog-backdrop-container-example',
    templateUrl: './dialog-backdrop-container-example.component.html',
    encapsulation: ViewEncapsulation.None,
    styles: [
        `
            .static-dialog.fd-dialog--active {
                display: inline-block;
            }

            .static-dialog > .fd-dialog__content {
                position: static;
            }
        `
    ]
})
export class DialogBackdropContainerExampleComponent {
    constructor(private _dialogService: DialogService) {}

    openCustomBackdrop(dialog): void {
        this._dialogService.open(dialog, {
            width: '300px',
            responsivePadding: true,
            backdropClass: 'dialog-custom-overlay-example',
            data: `This dialog has a custom backdrop!`
        });
    }

    openInCustomContainer(dialog, containerRef: HTMLElement): void {
        this._dialogService.open(dialog, {
            width: '300px',
            container: containerRef,
            responsivePadding: true,
            data: `This dialog has been opened inside a local div!`
        });
    }

    openStaticDialog(dialog, containerRef: HTMLElement): void {
        this._dialogService.open(dialog, {
            width: '300px',
            hasBackdrop: false,
            container: containerRef,
            responsivePadding: true,
            backdropClass: 'static-dialog',
            data: `This dialog has been opened inside a local div and displayed as a static element!`
        });
    }
}
