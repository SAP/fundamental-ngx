import { Component, ViewEncapsulation, Inject, ElementRef, OnInit } from '@angular/core';
import { ModalService } from './modal.service';

@Component({
    selector: 'fd-modal',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['modal.component.scss'],
    templateUrl: './modal.component.html'
})
export class ModalComponent implements OnInit {
    constructor(@Inject(ModalService) private modalService: ModalService, private elRef: ElementRef) {}

    close() {
        this.elRef.nativeElement.style.display = 'none';
    }

    open() {
        this.elRef.nativeElement.style.display = 'block';
    }

    ngOnInit() {
        /*
         modal should be hidden on init
         */
        this.elRef.nativeElement.style.display = 'none';
    }
}
