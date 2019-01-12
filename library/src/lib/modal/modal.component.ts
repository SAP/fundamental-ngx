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

    constructor(@Inject(ModalService) private modalService: ModalService, private elRef: ElementRef) {}

    close(result?) {
        this.elRef.nativeElement.style.display = 'none';
        this.resolve(result);
    }

    dismiss(reason?) {
        this.elRef.nativeElement.style.display = 'none';
        this.reject(reason);
    }

    open() {
        this.result = new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        });
        this.result.then(null, () => {});
        this.elRef.nativeElement.style.display = 'block';
    }

    ngOnInit() {
        /*
         modal should be hidden on init
         */
        this.elRef.nativeElement.style.display = 'none';
    }
}
