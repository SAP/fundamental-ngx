import { Component, Inject } from '@angular/core';
import { DIALOG_REF, DialogRef } from '@fundamental-ngx/core';

@Component({
    template: `
        <fd-dialog>
            <fd-dialog-header>
                <h1 fd-dialog-title>{{ dialogRef.data.title }}</h1>
                <button fd-dialog-close-button (click)="dialogRef.dismiss('Close button')"></button>
            </fd-dialog-header>

            <fd-dialog-body>
                <ul>
                    <li *ngFor="let fact of dialogRef.data.pineappleFunFacts">
                        {{ fact }}
                    </li>
                </ul>
                <fd-select placeholder="Select an option" [(value)]="selectedValue1">
                  <fd-option *ngFor="let option of options" [value]="option">{{ option }}</fd-option>
                </fd-select>
            </fd-dialog-body>

            <fd-dialog-footer>
                <fd-dialog-footer-button>
                    <button
                        fd-button
                        fdType="emphasized"
                        fd-dialog-decisive-button
                        [compact]="true"
                        (click)="this.dialogRef.close('Continue')"
                    >
                        Interesting
                    </button>
                </fd-dialog-footer-button>

                <fd-dialog-footer-button>
                    <button
                        fd-button
                        fdType="transparent"
                        fd-dialog-decisive-button
                        [compact]="true"
                        (click)="this.dialogRef.dismiss('Cancel')"
                    >
                        Cancel
                    </button>
                </fd-dialog-footer-button>
            </fd-dialog-footer>
        </fd-dialog>
    `
})
export class DialogExampleComponent {
    constructor(@Inject(DIALOG_REF) public dialogRef: DialogRef) {}
    options: string[] = ['Apple', 'Pineapple', 'Tomato', 'Strawberry'];
    selectedValue1: string;
    selectedValue2: string;
    selectedValue3: string;
    selectedValue4: string;
    selectedValue5: string = this.options[0];
  }
