import { Component } from '@angular/core';
import { DialogRef } from '@fundamental-ngx/core/dialog';

@Component({
    template: `
        <fd-dialog>
            <fd-dialog-header>
                <h1 id="fd-dialog-header-1" fd-title>{{ dialogRef.data.title }}</h1>
            </fd-dialog-header>

            <fd-dialog-body>

            <fd-multi-input
                [dropdownValues]="values"
                placeholder="Search here..."
                [displayFn]="displayFunction"
                [(ngModel)]="selected"
            ></fd-multi-input>

            <fd-multi-input
                [dropdownValues]="values2"
                placeholder="Search here..."
                [displayFn]="displayFunction"
                [(ngModel)]="selected2"
            ></fd-multi-input>

                <p id="fd-dialog-body-1" role="dialog" style="text-align: justify; margin: 0">
                    {{ dialogRef.data.pinnapleDescription }}
                </p>
                <ul style="margin-bottom: 0">
                    <li *ngFor="let fact of dialogRef.data.pineappleFunFacts">
                        {{ fact }}
                    </li>
                </ul>
            </fd-dialog-body>

            <fd-dialog-footer>
                <fd-button-bar
                        label="Interesting"
                        fdType="emphasized"
                        [compact]="true"
                        (click)="this.dialogRef.close('Continue')">
                </fd-button-bar>
                <fd-button-bar
                        label="Cancel"
                        fdInitialFocus
                        fdType="transparent"
                        [compact]="true"
                        (click)="this.dialogRef.dismiss('Cancel')">
                </fd-button-bar>
            </fd-dialog-footer>
        </fd-dialog>
    `
})
export class DialogExampleComponent {
    constructor(public dialogRef: DialogRef) {}

    values = [
        { name: 'Photo Voltaic', icon: 'photo-voltaic' },
        { name: 'Settings', icon: 'settings' },
        { name: 'Heating Cooling', icon: 'heating-cooling' },
        { name: 'Competitor', icon: 'competitor' },
        { name: 'Chalkboard', icon: 'chalkboard' },
        { name: 'Database', icon: 'database' },
        { name: 'Passenger Train', icon: 'passenger-train' },
        { name: 'World', icon: 'world' },
        { name: 'Shield', icon: 'shield' },
        { name: 'Journey Change', icon: 'journey-change' }
    ];

    selected = [];

    values2 = [
        { name: 'Photo Voltaic', icon: 'photo-voltaic' },
        { name: 'Settings', icon: 'settings' },
        { name: 'Heating Cooling', icon: 'heating-cooling' },
        { name: 'Competitor', icon: 'competitor' },
        { name: 'Chalkboard', icon: 'chalkboard' },
        { name: 'Database', icon: 'database' },
        { name: 'Passenger Train', icon: 'passenger-train' },
        { name: 'World', icon: 'world' },
        { name: 'Shield', icon: 'shield' },
        { name: 'Journey Change', icon: 'journey-change' }
    ];

    selected2 = [];

    displayFunction(item: { name: string; icon: string }): string {
        if (item) {
            return item.name;
        } else {
            return '';
        }
    }
}
