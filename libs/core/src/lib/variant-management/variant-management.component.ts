import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output, SimpleChanges,
    TemplateRef
} from '@angular/core';
import { DialogService } from '../dialog/dialog-service/dialog.service';

@Component({
    selector: 'fd-variant-management',
    templateUrl: './variant-management.component.html',
    styleUrls: ['./variant-management.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class VariantManagementComponent implements OnInit, OnChanges {
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

    _viewChanged = false;

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

    ngOnChanges(changes: SimpleChanges): void {
        if ('currentView' in changes) {
            this._viewChanged = this.currentView;
        }
    }

    ngOnInit(): void {
        this.appliedView = this.views.find(view => view.default)
        this.currentViewChange.emit(this.appliedView.id);

        console.log(this.appliedView);
    }

    openDialog(dialog: TemplateRef<any>): void {
        this.isViewsOpen = false;
        const dialogRef = this._dialogService.open(dialog, {
            responsivePadding: true,
            draggable: true,
            width: '300px'
        });

        dialogRef.afterClosed.subscribe(
            (result) => {
                console.log('result', result);
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
