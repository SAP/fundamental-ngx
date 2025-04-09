import { CdkScrollable } from '@angular/cdk/scrolling';
import { AsyncPipe, NgStyle } from '@angular/common';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    TemplateRef,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { InitialFocusDirective } from '@fundamental-ngx/cdk/utils';
import { BarModule } from '@fundamental-ngx/core/bar';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import {
    DialogBodyComponent,
    DialogComponent,
    DialogDefaultContent,
    DialogFooterComponent,
    DialogFullScreenTogglerButtonComponent,
    DialogHeaderComponent,
    DialogRef,
    DialogService
} from '@fundamental-ngx/core/dialog';
import { InputGroupModule } from '@fundamental-ngx/core/input-group';
import { ScrollbarDirective } from '@fundamental-ngx/core/scrollbar';
import { TitleComponent } from '@fundamental-ngx/core/title';

@Component({
    selector: 'fd-dialog-full-screen-inner-example',
    template: ` <fd-dialog>
        <fd-dialog-header>
            <h1 id="fd-dialog-header-1" fd-title>{{ dialogRef.data.title }}</h1>
            <button
                fd-dialog-full-screen-toggler-button
                [title]="(dialogRef.fullScreen | async) === true ? 'Leave full-screen mode' : 'Enter full-screen mode'"
                (click)="dialogRef.toggleFullScreen()"
            ></button>
        </fd-dialog-header>
        <fd-dialog-body>
            <p
                id="fd-dialog-body-1"
                [ngStyle]="{
                    'text-align': 'justify',
                    margin: 0
                }"
            >
                {{ dialogRef.data.pinnapleDescription }}
            </p>
            <ul [style.margin-bottom]="0">
                @for (fact of dialogRef.data.pineappleFunFacts; track fact) {
                    <li>
                        {{ fact }}
                    </li>
                }
            </ul>
        </fd-dialog-body>
        <fd-dialog-footer>
            <fd-button-bar
                label="Interesting"
                fdType="emphasized"
                (click)="dialogRef.close('Continue')"
                ariaLabel="Interesting Emphasized"
            >
            </fd-button-bar>
            <fd-button-bar label="Cancel" fdType="transparent" (click)="dialogRef.dismiss('Cancel')" ariaLabel="Cancel">
            </fd-button-bar>
        </fd-dialog-footer>
    </fd-dialog>`,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        TitleComponent,
        CdkScrollable,
        ScrollbarDirective,
        BarModule,
        AsyncPipe,
        NgStyle,
        DialogFooterComponent,
        DialogBodyComponent,
        DialogFullScreenTogglerButtonComponent,
        DialogHeaderComponent,
        DialogComponent
    ]
})
export class DialogFullScreenInnerExampleComponent {
    constructor(public dialogRef: DialogRef) {}
}

@Component({
    selector: 'fd-dialog-full-screen-example',
    imports: [
        ButtonComponent,
        BarModule,
        InputGroupModule,
        InitialFocusDirective,
        AsyncPipe,
        DialogFooterComponent,
        DialogBodyComponent,
        DialogFullScreenTogglerButtonComponent,
        TitleComponent,
        DialogHeaderComponent,
        DialogComponent
    ],
    templateUrl: './dialog-full-screen-example.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogFullScreenExampleComponent {
    @ViewChild('dialogContent', { read: TemplateRef })
    dialogContent: TemplateRef<any>;

    @ViewChild('dialogSubHeader', { read: TemplateRef })
    dialogSubHeader: TemplateRef<any>;

    closeReason = '';

    templateBasedConfirmationReason = '';

    componentCloseReason = '';

    private _dialogReference: DialogRef;

    constructor(
        private _dialogService: DialogService,
        private _cdr: ChangeDetectorRef
    ) {}

    openFromComponent(): void {
        const dialogRef = this._dialogService.open(DialogFullScreenInnerExampleComponent, {
            data: {
                title: `Pineapple Fun Facts`,
                pinnapleDescription: `
                The pineapple (Ananas comosus) is a tropical plant with an edible fruit
                and the most economically significant plant in the family Bromeliaceae.
                The pineapple is indigenous to South America,
                where it has been cultivated for many centuries.
                The introduction of the pineapple to Europe in the 17th
                century made it a significant cultural icon of luxury.
                Since the 1820s, pineapple has been commercially grown in
                greenhouses and many tropical plantations.
                `,
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
            ariaLabelledBy: 'fd-dialog-header-1',
            ariaDescribedBy: 'fd-dialog-body-1',
            responsivePadding: true,
            draggable: true,
            resizable: true,
            focusTrapped: true
        });

        dialogRef.afterClosed.subscribe(
            (result) => {
                this.componentCloseReason = 'Dialog closed with result: ' + result;
                this._cdr.detectChanges();
            },
            (error) => {
                this.componentCloseReason = 'Dialog dismissed with result: ' + error;
                this._cdr.detectChanges();
            }
        );
    }

    openDialogFromTemplate(dialog: TemplateRef<any>): void {
        const dialogRef = this._dialogService.open(dialog, {
            responsivePadding: true,
            draggable: true,
            resizable: true,
            ariaLabelledBy: 'fd-dialog-header-full-screen',
            ariaDescribedBy: 'fd-dialog-header-full-screen',
            focusTrapped: true
        });

        dialogRef.afterClosed.subscribe(
            (result) => {
                this.templateBasedConfirmationReason = 'Dialog closed with result: ' + result;
                this._cdr.detectChanges();
            },
            (error) => {
                this.templateBasedConfirmationReason = 'Dialog dismissed with result: ' + error;
                this._cdr.detectChanges();
            }
        );
    }

    openDialog(): void {
        const object: DialogDefaultContent = {
            title: 'Dialog Title',
            titleId: 'fd-dialog-header-full-screen',
            content: this.dialogContent,
            subHeader: this.dialogSubHeader,
            approveButton: 'Ok',
            approveButtonAriaLabel: 'Ok Emphasized',
            approveButtonCallback: () => this._dialogReference.close('Approved'),
            cancelButton: 'Cancel',
            cancelButtonCallback: () => this._dialogReference.close('Canceled'),
            closeButtonCallback: () => this._dialogReference.dismiss('Dismissed'),
            fullScreenButtonCallback: () => this._dialogReference.toggleFullScreen(),
            closeButtonTitle: 'close',
            allowFullScreen: true,
            fullScreenExpandButtonText: 'Enter full-screen mode',
            fullScreenMinifyButtonText: 'Exit full-screen mode'
        };

        this._dialogReference = this._dialogService.open(object, {
            ariaLabelledBy: 'fd-dialog-header-full-screen',
            ariaDescribedBy: 'fd-dialog-body-full-screen',
            focusTrapped: true,
            resizable: true,
            draggable: true
        });

        this._dialogReference.afterClosed.subscribe(
            (result) => {
                this.closeReason = 'Dialog closed with result: ' + result;
                this._cdr.detectChanges();
            },
            (error) => {
                this.closeReason = 'Dialog dismissed with result: ' + error;
                this._cdr.detectChanges();
            }
        );
    }
}
