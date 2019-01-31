import {
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    Inject,
    ElementRef,
    ChangeDetectorRef,
    ViewChild
} from '@angular/core';
import { HashService } from '../utils/hash.service';
import { AlertService } from './alert.service';

@Component({
    selector: 'fd-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.scss'],
    providers: [HashService]
})
export class AlertComponent implements OnInit {
    @Input() dismissible: boolean;

    @Input() type: string;

    @Input() id: string;

    @Output() close = new EventEmitter<string>();

    show: boolean = false;

    generatedId: string;

    @ViewChild('alertDiv') alertDiv;

    constructor(@Inject(HashService) private hasher: HashService,
                private elRef: ElementRef,
                private alertService: AlertService,
                private cd: ChangeDetectorRef) {}

    ngOnInit() {
        this.generatedId = this.hasher.hash();
        /*
         modal should be hidden on init
         */
        this.elRef.nativeElement.style.display = 'none';
        this.alertDiv.nativeElement.style.display = 'none';
    }

    getId() {
        if(this.id) {
            return this.id;
        } else {
            return this.generatedId;
        }
    }

    handleClose(result?, fromService?) {
        this.elRef.nativeElement.style.display = 'none';
        this.alertDiv.nativeElement.style.display = 'none';
        this.close.emit(this.id);
        if (!fromService) {
            this.alertService.popAlert();
        }
    }

    open() {
        // check to make sure this alert is not already opened
        if (this.elRef.nativeElement.style.display !== 'block') {
            const top = this.getTop();
            this.elRef.nativeElement.style.display = 'block';
            this.alertDiv.nativeElement.style.display = 'block';
            this.alertDiv.nativeElement.style.top = top;
            this.show = true;
            this.cd.detectChanges();
            setTimeout(() => {
                this.show = false;
                setTimeout(() => {
                    this.handleClose();
                }, 750);
            }, 10000);
        }
    }

    getTop() {
        // get the heights of each visible alert and return the top of the new alert
        const alerts = document.querySelectorAll('.fd-alert');
        const openAlerts = Array.prototype.filter.call(alerts, function(alert) {
            return alert.style.display === 'block';
        });
        let totalOffsetHeight = 10;
        openAlerts.forEach((alert) => {
            totalOffsetHeight = totalOffsetHeight + alert.offsetHeight + 10;
        });
        return totalOffsetHeight + 'px';
    }
}
