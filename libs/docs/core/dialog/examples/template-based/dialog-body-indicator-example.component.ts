import { ChangeDetectorRef, Component } from '@angular/core';
import {
    DialogBodyComponent,
    DialogComponent,
    DialogFooterComponent,
    DialogHeaderComponent,
    DialogRef
} from '@fundamental-ngx/core/dialog';
import { NgForOf, NgIf } from '@angular/common';
import { BusyIndicatorComponent, ButtonBarComponent } from '@fundamental-ngx/core';

@Component({
    template: `
        <fd-dialog>
            <fd-dialog-header>
                <h1 id="fd-dialog-header-1" fd-title>{{ dialogRef.data.title }}</h1>
            </fd-dialog-header>

            <fd-dialog-body>
                <div *ngIf="!membersBusyIndicator">
                    <p id="fd-dialog-body-1" role="dialog" style="text-align: justify; margin: 0">
                        {{ dialogRef.data.pinnapleDescription }}
                    </p>
                    <ul style="margin-bottom: 0">
                        <li *ngFor="let fact of dialogRef.data.pineappleFunFacts">
                            {{ fact }}
                        </li>
                    </ul>
                </div>
                <fd-busy-indicator [loading]="membersBusyIndicator" size="m"> </fd-busy-indicator>
            </fd-dialog-body>

            <fd-dialog-footer>
                <fd-button-bar
                    label="Interesting"
                    fdType="emphasized"
                    (click)="dialogRef.close('Continue')"
                    ariaLabel="Interesting Emphasized"
                >
                </fd-button-bar>
                <fd-button-bar
                    label="Cancel"
                    fdType="transparent"
                    (click)="dialogRef.dismiss('Cancel')"
                    ariaLabel="Cancel"
                >
                </fd-button-bar>
            </fd-dialog-footer>
        </fd-dialog>
    `,
    imports: [DialogComponent, DialogHeaderComponent,DialogBodyComponent, DialogFooterComponent, NgIf, NgForOf, BusyIndicatorComponent, ButtonBarComponent],
    standalone: true
})
export class DialogBodyIndicatorExampleComponent {
    constructor(
        public dialogRef: DialogRef,
        public _cdRef: ChangeDetectorRef
    ) {}
    membersBusyIndicator = false;

    ngOnInit() {
        this.membersBusyIndicator = true;
        setTimeout(() => {
            this.membersBusyIndicator = false;
            console.log(this.membersBusyIndicator);
        }, 4000);
        setTimeout(() => (this.dialogRef.data.title = 'New Title'), 2000);
    }
}
