import { Component, Input, OnInit, Output, TemplateRef, EventEmitter } from '@angular/core';
import { DialogService } from '../dialog/dialog-service/dialog.service';

@Component({
  selector: 'fd-variant-management',
  templateUrl: './variant-management.component.html',
  styleUrls: ['./variant-management.component.scss']
})
export class VariantManagementComponent implements OnInit {
    @Input()
    views: any;

    @Input()
    currentView: any;

    @Output()
    currentViewChange = new EventEmitter<any>();

    @Output()
    saveViews = new EventEmitter<any>();

    /** @hidden */
    isViewsOpen = false;
    confirmationReason: string;

    viewName: string;

    viewChanged = false;

    appliedView: any; // view

    constructor(private _dialogService: DialogService) {}

    selectView(id: number): void {
        this.appliedView = this.views.find(view => view.id === id);
        this.currentViewChange.emit(this.appliedView.id);
        this.isViewsOpen = false;
    }

    openMyView(): void  {
        this.isViewsOpen = true;
    }

    ngOnInit(): void {
        console.log('activeView', this.currentView.subscribe(
            result => {
                console.log(result);
                if (result.name) {
                    this.viewName = result.name;
                } else {
                    this.viewChanged = true;
                }
            })
        );
        this.appliedView = this.views.find(view => view.default)
        this.currentViewChange.emit(this.appliedView.id);
    }

    openDialog(dialog: TemplateRef<any>): void {
        this.isViewsOpen = false;
        const dialogRef = this._dialogService.open(dialog, {
            responsivePadding: true,
            draggable: true,
            width: '1000px'
        });

        dialogRef.afterClosed.subscribe(
            (result) => {
                this.saveViews.emit([
                    {
                        id: 2,
                        favorite: false,
                        name: 'Second View',
                        sharing: 'Public',
                        default: false,
                        autoApply: true,
                        createdBy: 'Self'
                    }]
                )
            },
            (error) => {
                throw new Error('Dialog dismissed with result');
            }
        );
    }
}
