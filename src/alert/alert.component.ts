import { Component, EventEmitter, Input, OnInit, Output, Inject } from '@angular/core';
import { HashService } from '../utils/hash.service';

@Component({
    selector: 'fd-alert',
    template: `    
    <button 
      class="fd-alert__close"
      *ngIf="dismissible"
      (click)="handleClose()"
      [attr.aria-controls]="id"
      aria-label="Close">
    </button>
    <ng-content></ng-content>
  `,
    host: {
        class: 'fd-alert',
        role: 'alert',
        '[id]': 'id',
        '[class.fd-alert--dismissible]': 'dismissible == true',
        '[class.fd-alert--warning]': 'type == "warning"',
        '[class.fd-alert--error]': 'type == "error"'
    },
    styles: [
        `
            :host {
                display: block;
                position: relative;
            }
        `
    ]
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
