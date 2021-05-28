import { Component } from '@angular/core';
import { DialogService } from '@fundamental-ngx/core/dialog';
import { DialogExampleComponent } from './dialog-example.component';

@Component({
    selector: 'fd-component-based-dialog-example',
    template: `
        <button fd-button label="Open from Component" (click)="open()"></button>
        <p>{{ closeReason }}</p>
    `
})
export class ComponentBasedDialogExampleComponent {
    closeReason: string;

    constructor(private _dialogService: DialogService) {}

    open(): void {
        const dialogRef = this._dialogService.open(DialogExampleComponent, {
            data: {
                title: `Pineapple Fun Facts`,
                pineappleFunFacts: [
                    `You can grow your own pineapple by planting the top of the pineapple in soil`,
                    `Pulling leaves from a pineapple is not an indication of ripeness as many people think`,
                    `James Dole is considered the “King of Pineapples“`,
                    `A pineapple cannot continue to ripen after it has been picked`,
                    `An unripe pineapple not only tastes awful, but can also be poisonous`,
                    `One of the ways you can tell if a pineapple is ripe is by smelling it`,
                    `In Hawaii, the word for pineapple is “Hala kahiki“`
                ]
            },
            width: '400px',
            ariaLabelledBy: 'fd-dialog-header-1'
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
