import { CdkScrollable } from '@angular/cdk/overlay';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BarModule } from '@fundamental-ngx/core/bar';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import {
    DialogBodyComponent,
    DialogComponent,
    DialogFooterComponent,
    DialogHeaderComponent,
    DialogRef,
    DialogService
} from '@fundamental-ngx/core/dialog';
import { MultiInputComponent } from '@fundamental-ngx/core/multi-input';
import { ScrollbarDirective } from '@fundamental-ngx/core/scrollbar';
import { TitleComponent } from '@fundamental-ngx/core/title';

interface Option {
    name: string;
}

@Component({
    selector: 'fd-dialog-inner-popover-example',
    template: `
        <button fd-button label="Open from Component" (click)="open()"></button>
        <p>{{ closeReason }}</p>
    `,
    imports: [ButtonComponent]
})
export class DialogInnerPopoverComponent {
    closeReason: string;

    constructor(private _dialogService: DialogService) {}

    open(): void {
        const dialogRef = this._dialogService.open(DialogInnerPopoverExampleComponent, {
            data: {
                title: `Pineapple Fun Facts`,
                firstOptions: [
                    { name: 'Photo Voltaic' },
                    { name: 'Settings' },
                    { name: 'Heating Cooling' },
                    { name: 'Competitor' },
                    { name: 'Chalkboard' },
                    { name: 'Database' },
                    { name: 'Passenger Train' },
                    { name: 'World' },
                    { name: 'Shield' },
                    { name: 'Journey Change' }
                ],
                secondOptions: [
                    { name: 'Apple' },
                    { name: 'Tomato' },
                    { name: 'Banana' },
                    { name: 'Grapes' },
                    { name: 'Pumpkin' },
                    { name: 'Kiwi' },
                    { name: 'Mango' },
                    { name: 'Cucumber' },
                    { name: 'Garlic' },
                    { name: 'Pear' }
                ]
            },
            width: '400px',
            ariaLabelledBy: 'fd-dialog-header-pop',
            ariaDescribedBy: 'fd-dialog-body-pop',
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
                <h1 id="fd-dialog-header-pop" fd-title>{{ dialogRef.data.title }}</h1>
            </fd-dialog-header>

            <fd-dialog-body>
                <div id="fd-dialog-body-pop" role="listbox">
                    <label for="first-list">The first list of options:</label>
                    <fd-multi-input
                        inputId="first-list"
                        [dropdownValues]="firstOptions"
                        placeholder="Search here..."
                        [displayFn]="displayFunction"
                        [(ngModel)]="selected"
                        [style.margin-bottom.rem]="1"
                    ></fd-multi-input>

                    <label for="second-list">The second list of options:</label>
                    <fd-multi-input
                        inputId="second-list"
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
                    (click)="dialogRef.close('Interesting')"
                    ariaLabel="Interesting"
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
    imports: [
        TitleComponent,
        CdkScrollable,
        ScrollbarDirective,
        MultiInputComponent,
        FormsModule,
        BarModule,
        DialogFooterComponent,
        DialogBodyComponent,
        DialogHeaderComponent,
        DialogComponent
    ]
})
export class DialogInnerPopoverExampleComponent {
    firstOptions: Option[];

    selected: Option[] = [];

    secondOptions: Option[];

    selected2: Option[] = [];

    constructor(public dialogRef: DialogRef) {
        this.firstOptions = this.dialogRef.data.firstOptions;
        this.secondOptions = this.dialogRef.data.secondOptions;
    }

    displayFunction(item: Option): string {
        if (item) {
            return item.name;
        } else {
            return '';
        }
    }
}
