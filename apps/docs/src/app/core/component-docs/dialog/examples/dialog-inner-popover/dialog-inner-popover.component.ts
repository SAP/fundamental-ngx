import { Component } from '@angular/core';
import { DialogRef, DialogService } from '@fundamental-ngx/core/dialog';

@Component({
    selector: 'fd-dialog-inner-popover-example',
    template: `
        <button fd-button label="Open from Component" (click)="open()"></button>
        <p>{{ closeReason }}</p>
    `
})
export class DialogInnerPopoverComponent {

    closeReason: string;

    constructor(private _dialogService: DialogService) {}

    open(): void {
        const dialogRef = this._dialogService.open(DialogInnerPopoverExampleComponent, {
            data: {
                title: `Pineapple Fun Facts`,
                firstOptions: [
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
                ],
                secondOptions: [
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
                ]
            },
            width: '400px',
            ariaLabelledBy: 'fd-dialog-header-1',
            ariaDescribedBy: 'fd-dialog-body-1',
            responsivePadding: true
        });

        dialogRef.afterClosed.subscribe(
            (result) => {
                this.closeReason = 'Dialog closed with result: ' + result;
            },
            (error) => {
                this.closeReason = 'Dialog dismissed with result: ' + error;
            }
        );
    }

}

@Component({
    template: `
        <fd-dialog>
            <fd-dialog-header>
                <h1 id="fd-dialog-header-1" fd-title>{{ dialogRef.data.title }}</h1>
            </fd-dialog-header>

            <fd-dialog-body>
                <div id="fd-dialog-body-1" role="listbox">
                    <fd-multi-input
                        [dropdownValues]="firstOptions"
                        placeholder="Search here..."
                        [displayFn]="displayFunction"
                        [(ngModel)]="selected"
                    ></fd-multi-input>

                    <fd-multi-input
                        [dropdownValues]="secondOptions"
                        placeholder="Search here..."
                        [displayFn]="displayFunction"
                        [(ngModel)]="selected2"
                    ></fd-multi-input>
                </div>
            </fd-dialog-body>

            <fd-dialog-footer>
                <fd-button-bar
                        label="Interesting"
                        fdType="emphasized"
                        [compact]="true"
                        (click)="dialogRef.close('Interesting')"
                        ariaLabel="Interesting Emphasized">
                </fd-button-bar>
                <fd-button-bar
                        label="Cancel"
                        fdInitialFocus
                        fdType="transparent"
                        [compact]="true"
                        (click)="dialogRef.dismiss('Cancel')"
                        ariaLabel="Cancel">
                </fd-button-bar>
            </fd-dialog-footer>
        </fd-dialog>
    `
})
export class DialogInnerPopoverExampleComponent {
    constructor(public dialogRef: DialogRef) {
        this.firstOptions = this.dialogRef.data.firstOptions;
        this.secondOptions = this.dialogRef.data.secondOptions;
    }

    firstOptions: any[];

    selected = [];

    secondOptions: any[];

    selected2 = [];

    displayFunction(item: { name: string; icon: string }): string {
        if (item) {
            return item.name;
        } else {
            return '';
        }
    }
}
