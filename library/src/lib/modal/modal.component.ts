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
    resolve: Function;
    reject: Function;
    result: Promise<any>;

    private _openModalCount: number;

    private _focusTrapped: boolean;

    private _focusableElems;

    constructor(@Inject(ModalService) private modalService: ModalService, private elRef: ElementRef) {}

    close(result?, closedByService: boolean = false) {
        this._focusTrapped = false;
        this.elRef.nativeElement.style.display = 'none';
        this.resolve(result);

        if (!closedByService) {
            this.modalService.popModal();
        }
        this._openModalCount = this.modalService.getModalCount();
    }

    dismiss(reason?, closedByService: boolean = false) {
        this._focusTrapped = false;
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
        this.focusModal();
    }

    focusModal() {
        this._focusTrapped = true;
        // get all focus-able elements in the modal
        this._focusableElems =
            this.elRef.nativeElement.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        // focus the first element
        if (this._focusableElems.length) {
            this._focusableElems[0].focus();
        }
    }

    onModalKeydown(event) {
        if (this._focusTrapped) {
            const focusedEl = document.activeElement;
            if (event.key === 'Tab' && !event.shiftKey) {
                if (this._focusableElems.length && focusedEl === this._focusableElems[this._focusableElems.length - 1]) {
                    event.preventDefault();
                    this._focusableElems[0].focus();
                }
            } else if (event.key === 'Tab' && event.shiftKey) {
                if (this._focusableElems.length && focusedEl === this._focusableElems[0]) {
                    event.preventDefault();
                    this._focusableElems[this._focusableElems.length - 1].focus();
                }
            }
        }
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
