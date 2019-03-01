import { Component, Input } from '@angular/core';
import { AlertRef } from '../../../../../../library/src/lib/alert/alert-ref';

@Component({
    selector: 'fd-alert-content',
    template: `
        <div>yooooooooooo</div> <button fd-button (click)="ref.dismiss()">lol</button>
    `
})
export class AlertContentComponent {

    @Input() alertText: string;

    @Input() alertType: string;

    constructor(public ref: AlertRef) {}

    ngOnInit(): void {

    }
}
