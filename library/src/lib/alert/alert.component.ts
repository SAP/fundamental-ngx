import { Component, EventEmitter, Input, OnInit, Output, Inject } from '@angular/core';
import { HashService } from '../utils/hash.service';

@Component({
    selector: 'fd-alert',
    templateUrl: './alert.component.html',
    host: {
        class: 'fd-alert',
        role: 'alert',
        '[id]': 'this.getId()',
        '[class.fd-alert--dismissible]': 'dismissible == true',
        '[class.fd-alert--warning]': 'type == "warning"',
        '[class.fd-alert--error]': 'type == "error"',
        '[class.fd-alert--information]': 'type == "information"',
        '[class.fd-alert--success]': 'type == "success"'
    },
    styleUrls: ['./alert.component.scss'],
    providers: [HashService]
})
export class AlertComponent implements OnInit {
    @Input() dismissible: boolean;

    @Input() type: string;

    @Input() id: string;

    @Output() close = new EventEmitter<string>();

    generatedId: string;

    constructor(@Inject(HashService) private hasher: HashService) {}

    ngOnInit() {
        this.generatedId = this.hasher.hash();
    }

    getId() {
        if(this.id) {
            return this.id;
        } else {
            return this.generatedId;
        }
    }

    handleClose() {
        this.close.emit(this.id);
    }
}
