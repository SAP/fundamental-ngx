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

    @Input() inline: boolean = false;

    @Input() persist: boolean = false;

    @Input() visibleTime: number = 10000;

    @Input() mousePersist: boolean = false;

    mouseInAlert: boolean = false;

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
        if (!this.inline) {
            this.elRef.nativeElement.style.display = 'none';
            this.alertDiv.nativeElement.style.display = 'none';
        }
    }

    getId() {
        if (this.id) {
            return this.id;
        } else {
            return this.generatedId;
        }
    }

    handleClose(result?, fromService?) {
        this.show = false;
        this.close.emit(this.id);
        setTimeout(() => {
            this.elRef.nativeElement.style.display = 'none';
            this.alertDiv.nativeElement.style.display = 'none';
            if (!fromService && !this.inline) {
                this.alertService.popAlert();
            }
        }, 750)
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
            if (!this.persist) {
                setTimeout(() => {
                    if (this.mousePersist) {
                        const wait = () => {
                            if (this.mouseInAlert === true) {
                                setTimeout(wait, 500);
                            } else {
                                this.handleClose();
                            }
                        }
                        wait();
                    } else {
                        this.handleClose();
                    }
                }, this.visibleTime);
            }
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

    handleAlertMouseEvent(event) {
        if (event.type === 'mouseenter') {
            this.mouseInAlert = true;
        } else if (event.type === 'mouseleave') {
            this.mouseInAlert = false;
        }
    }
}
