import { Component, TemplateRef, ViewEncapsulation } from '@angular/core';
import { DialogService, FdDate } from '@fundamental-ngx/core';

@Component({
    selector: 'fd-calendar-mobile-example',
    template: `
        <ng-template let-dialog let-dialogConfig="dialogConfig" #landScapeDialog>
            <fd-dialog [dialogConfig]="dialogConfig" [dialogRef]="dialog">
                <fd-dialog-body>
                    <fd-calendar #landscapeCalendar [mobileLandscape]="true" [ngModel]="datePicked" (closeClicked)="dialog.close()"></fd-calendar>
                </fd-dialog-body>

                <fd-dialog-footer>
                    <fd-dialog-footer-button>
                        <button fd-button
                                fdType="emphasized"
                                fd-dialog-decisive-button
                                (click)="dialog.close('Continue'); dateChanged(landscapeCalendar.selectedDate)">
                            Ok
                        </button>
                    </fd-dialog-footer-button>
                </fd-dialog-footer>
            </fd-dialog>
        </ng-template>

        <button fd-button (click)="openLandScapeDialog(landScapeDialog)">Open Calendar in landscape mobile mode</button>
        
        <ng-template let-dialog let-dialogConfig="dialogConfig" #portraitDialog>
            <fd-dialog [dialogConfig]="dialogConfig" [dialogRef]="dialog">
                <fd-dialog-body>
                    <fd-calendar #portraitCalendar [mobilePortrait]="true" [ngModel]="datePicked" (closeClicked)="dialog.close()"></fd-calendar>
                </fd-dialog-body>

                <fd-dialog-footer>
                    <fd-dialog-footer-button>
                        <button fd-button
                                fdType="emphasized"
                                fd-dialog-decisive-button
                                (click)="dialog.close('Continue'); dateChanged(portraitCalendar.selectedDate);">
                            Ok
                        </button>
                    </fd-dialog-footer-button>
                </fd-dialog-footer>
            </fd-dialog>
        </ng-template>

        <button fd-button (click)="openPortraitDialog(portraitDialog)">Open Calendar in portrait mobile mode</button>
        
        <div>
            <label fd-label>Date Picked: {{ datePicked.toDateString() }}</label>
        </div>
    `,
    styles: [
        `
            button {
                margin-top: 1rem;
            }
            .fd-calendar--mobile-landscape .fd-calendar__navigation--main {
                padding-right: calc(640px - 320px)!important;
            }
        `
    ],
    encapsulation: ViewEncapsulation.None
})
export class CalendarMobileExampleComponent {

    datePicked: FdDate = FdDate.getToday();

    constructor(private _dialogService: DialogService) { }

    openLandScapeDialog(dialog: TemplateRef<any>): void {
        this._dialogService.open(
            dialog,
            { mobile: true, verticalPadding: false, width: '640px', height: '400px' }
        );
    }

    openPortraitDialog(dialog: TemplateRef<any>): void {
        this._dialogService.open(
            dialog,
            { mobile: true, verticalPadding: false, width: '360px', height: '640px' }
        );
    }

    dateChanged(date: FdDate): void {
        this.datePicked = date;
    }
}
