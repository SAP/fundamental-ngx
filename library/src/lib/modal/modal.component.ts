import {
    Component,
    ViewEncapsulation,
    Inject,
    ElementRef,
    OnInit
} from '@angular/core';
import { ModalService } from './modal.service';

@Component({
    selector: 'fd-modal',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['modal.component.scss'],
    templateUrl: './modal.component.html'
})
export class ModalComponent implements OnInit {
    private resolve: Function;
    private reject: Function;
    result: Promise<any>;

    private _openModalCount: number;

    constructor(@Inject(ModalService) private modalService: ModalService, private elRef: ElementRef) {}

    close(result?, closedByService: boolean = false) {
        this.elRef.nativeElement.style.display = 'none';
        this.resolve(result);

        if (!closedByService) {
            this.modalService.popModal();
        }
        this._openModalCount = this.modalService.getModalCount();
    }

    dismiss(reason?, closedByService: boolean = false) {
        this.elRef.nativeElement.style.display = 'none';
        this.reject(reason);

        if (!closedByService) {
            this.modalService.popModal();
        }
        this._openModalCount = this.modalService.getModalCount();
    }

    open() {
        this.result = new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        });
        this.result.then(null, () => {});
        this.elRef.nativeElement.style.display = 'block';
        this._openModalCount = this.modalService.getModalCount();
    }

    ngOnInit() {
        /*
         modal should be hidden on init
         */
        this.elRef.nativeElement.style.display = 'none';
    }

    get openModalCount(): number {
        return this._openModalCount;
    }
}
