import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
    TemplateRef
} from '@angular/core';
import { DialogService } from '../dialog/dialog-service/dialog.service';

interface View {
    id: number,
    favorite: boolean,
    name: string,
    sharing: string,
    autoApply: boolean,
    default: boolean,
    createdBy: string,
    settings?: any;
}

@Component({
    selector: 'fd-variant-management',
    templateUrl: './variant-management.component.html',
    styleUrls: ['./variant-management.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class VariantManagementComponent implements OnInit, OnChanges {
    @Input()
    views: View[];

    @Input()
    settingsChanged: boolean;

    @Output()
    currentViewChange = new EventEmitter<number>();

    @Output()
    saveViews = new EventEmitter<View[]>();

    isViewsOpen = false;

    viewName: string;

    viewChanged = false;

    appliedView: View;

    viewModel: any;

    defaultViewId = 1;

    constructor(private _dialogService: DialogService) {}

    ngOnChanges(changes: SimpleChanges): void {
        if ('settingsChanged' in changes) {
            this.viewChanged = this.settingsChanged;
        }
    }

    ngOnInit(): void {
        this.appliedView = this.views.find(view => view.default);
        this.currentViewChange.emit(this.appliedView.id);

        this.viewModel = {...this.appliedView};
    }

    selectView(id: number): void {
        this.appliedView = this.views.find(view => view.id === id);
        this.currentViewChange.emit(this.appliedView.id);
        this.isViewsOpen = false;
    }

    openMyView(): void  {
        this.isViewsOpen = true;
    }

    saveCurrentView(): void {
        if (this.viewChanged) {
            this.saveViews.emit([
                this.appliedView
            ]);
            this.viewChanged = false;
            this.isViewsOpen = false;
        }
    }

    openDialog(dialog: TemplateRef<any>): void {
        this.isViewsOpen = false;
        const dialogRef = this._dialogService.open(dialog, {
            responsivePadding: true,
            draggable: true,
            width: '320px'
        });

        dialogRef.afterClosed.subscribe(() => {
            this.saveViews.emit([{
                ...this.viewModel,
                id: this.views[this.views.length - 1].id + 1
            }]);
                this.viewChanged = false;
                this.appliedView = {...this.viewModel};
            },
            (error) => {
                throw new Error('Dialog dismissed with result');
            }
        );
    }

    openManageDialog(dialog: TemplateRef<any>): void {
        this.isViewsOpen = false;
        const dialogRef = this._dialogService.open(dialog, {
            responsivePadding: true,
            draggable: true,
            width: '1000px'
        });

        dialogRef.afterClosed.subscribe(
            (result) => {},
            (error) => {
                throw new Error('Dialog dismissed with result');
            }
        );
    }
}
