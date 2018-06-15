import { Component, EventEmitter, Input, OnInit, Output, Inject } from '@angular/core';
import { HashService } from '../utils/hash.service';

@Component({
    selector: 'fd-alert',
    templateUrl: './alert.component.html',
    host: {
        class: 'fd-alert',
        role: 'alert',
        '[id]': 'id',
        '[class.fd-alert--dismissible]': 'dismissible == true',
        '[class.fd-alert--warning]': 'type == "warning"',
        '[class.fd-alert--error]': 'type == "error"'
    },
    styleUrls: ['./alert.component.scss'],
    providers: [HashService]
})
export class AlertComponent implements OnInit {
    @Input() dismissible: boolean;

    @Input() type: string;

    @Output() close = new EventEmitter<string>();

    id: string;

    constructor(@Inject(HashService) private hasher: HashService) {}

    ngOnInit() {
        this.id = this.hasher.hash();
    }

    handleClose() {
        this.close.emit(this.id);
    }
}
