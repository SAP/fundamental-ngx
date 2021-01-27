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
    activeFilters: any;

    @Output()
    activeViewChange = new EventEmitter<any>();

    @Output()
    viewsUpdate = new EventEmitter<any>();

    /** @hidden */
    isViewsOpen = false;
    confirmationReason: string;

    viewName: string;

    viewChanged = false;

    appliedView;

    constructor(private _dialogService: DialogService) {}

    chooseView(id: number) {
        this.appliedView = this.views.find(view => view.id === id);
        this.activeViewChange.emit(this.appliedView.data);
        this.isViewsOpen = false;
    }

    openMyView(): void  {
        this.isViewsOpen = true;
    }

    ngOnInit(): void {
        console.log('activeView', this.activeFilters.subscribe(
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
        this.activeViewChange.emit(this.appliedView.data);
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
                this.viewsUpdate.emit([
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
