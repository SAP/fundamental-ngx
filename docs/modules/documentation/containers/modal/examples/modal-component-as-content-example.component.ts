import { Component } from '@angular/core';
import { ModalService } from '../../../../../../library/src/lib/modal/modal.service';
import { ModalContentComponent } from './modal-content.component';

@Component({
    selector: 'fd-modal-component-as-content-example',
    template: `
        <button fd-button (click)="open()">Open from Component</button>
    `
})
export class ModalComponentAsContentExampleComponent {

    constructor(private modalService: ModalService) {}

    open(): void {
        this.modalService.open(ModalContentComponent, {
            data: {
                title: 'About Pineapples',
                firstParagraph: 'The pineapple is a tropical plant with an edible multiple fruit consisting of coalesced berries.',
                secondParagraph: 'In 2016, Costa Rica, Brazil and the Philippines accounted for ' +
                    'nearly one-third of the world\'s production of pineapples.',
                thirdParagraph: 'The flesh and juice of the pineapple are used in cuisines around the world.'
            },
            maxHeight: '300px'
        });
    }
}
