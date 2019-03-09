import { Component } from '@angular/core';
import { ModalService } from '../../../../../../../library/src/lib/modal/modal-service/modal.service';
import { ModalContentComponent } from './modal-content.component';

@Component({
    selector: 'fd-modal-component-as-content-example',
    template: `
        <button fd-button (click)="open()">Open from Component</button>
        <span style="margin-left: 24px;">{{closeReason}}</span>
    `
})
export class ModalComponentAsContentExampleComponent {

    closeReason: string;

    constructor(private modalService: ModalService) {}

    open(): void {
        const modalRef = this.modalService.open(ModalContentComponent, {
            data: {
                title: 'About Pineapples',
                firstParagraph: 'The pineapple is a tropical plant with an edible multiple fruit consisting of coalesced berries.',
                secondParagraph: 'In 2016, Costa Rica, Brazil and the Philippines accounted for ' +
                    'nearly one-third of the world\'s production of pineapples.',
                thirdParagraph: 'The flesh and juice of the pineapple are used in cuisines around the world.'
            },
            maxWidth: '300px'
        });

        // TODO Subscribe to result
        modalRef.afterClosed.subscribe(result => {
            this.closeReason = 'Modal closed with result: ' + result;
        }, error => {
            this.closeReason = 'Modal dismissed with result: ' + error;
        });
    }
}
