import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
    TemplateRef,
    ViewEncapsulation
} from '@angular/core';

import { DialogService } from '../dialog/dialog-service/dialog.service';
import { DialogRef } from '../dialog/public_api';
import { compareObjects } from '../utils/functions';
import { View } from './models/view.model';

@Component({
    selector: 'fd-variant-management',
    templateUrl: './variant-management.component.html',
    styleUrls: ['./variant-management.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'fd-variant-management'
    }
})
export class VariantManagementComponent implements OnInit, OnChanges {
    @Input()
    views: View[];

    @Output()
    currentViewChange = new EventEmitter<string>();

    @Output()
    saveView = new EventEmitter<View>();

    isViewsOpen = false;

    viewChanged = false;

    appliedView: View;

    viewModel: Partial<View>;

    defaultViewId = 1;

    constructor(
        private readonly _dialogService: DialogService,
        private readonly _changeDetectorRef: ChangeDetectorRef
    ) {}

    ngOnChanges(changes: SimpleChanges): void {
        if ('views' in changes && !changes.views.firstChange) {
            this.viewChanged = changes.views.previousValue.some((view: View) => this._compareViewSettings(view, this.views.find(({ id }) => view.id === id)));
        }
    }

    ngOnInit(): void {
        this.appliedView = this.views.find(view => view.default);
        this.currentViewChange.emit(this.appliedView.id);

        this.viewModel = {...this.appliedView};
    }

    updateViews(views: View[]): void {
        this.viewChanged = views.some(view => this._compareViewSettings(this.views.find(({ id }) => view.id === id), view));
        if (this.viewChanged) {
            this.views = views;
            this._changeDetectorRef.markForCheck();
        }
    }


    /** @hidden */
    selectView(id: string): void {
        this.appliedView = this.views.find(view => view.id === id);
        this.currentViewChange.emit(this.appliedView.id);
        this.isViewsOpen = false;
    }

    /** @hidden */
    saveCurrentView(): void {
        if (this.viewChanged) {
            this.saveView.emit(this.appliedView);
            this.viewChanged = false;
            this.isViewsOpen = false;
        }
    }

    /** @hidden */
    onSaveAs(dialog: TemplateRef<any>): void {
        this.isViewsOpen = false;
        const dialogRef = this._dialogService.open(dialog, {
            responsivePadding: true,
            draggable: true,
            width: '320px',
            data: {
                view: new View()
            }
        });
        console.log(dialogRef)

        dialogRef.afterClosed.subscribe((view: View) => {
            const appliedView = {
                ...this.viewModel,
                ...view,
            };
            this.saveView.emit(appliedView);
            this.viewChanged = false;
        });
    }

    /** @hidden */
    onManageDialog(dialog: TemplateRef<any>): void {
        this.isViewsOpen = false;
        const dialogRef = this._dialogService.open(dialog, {
            responsivePadding: true,
            draggable: true,
            width: '1000px'
        });

        dialogRef.afterClosed.subscribe(
            (result) => {
                console.log(result);
            }
        );
    }

    /** @hidden */
    _onSaveView(dialog: DialogRef): void {
        console.log('save view')
        console.log(dialog);
    }

    /** @hidden */
    _onCancelView(dialog: DialogRef): void {
        console.log('cancel view')
        console.log(dialog);
        dialog.close();
    }

    /** @hidden */
    _onSaveManage(dialog: DialogRef): void {
        console.log('save manager')
        console.log(dialog);
    }

    /** @hidden */
    _onCancelManage(dialog: DialogRef): void {
        console.log('cancel manager')
        console.log(dialog);
        dialog.close();
    }

    /** @hidden */
    private _compareViewSettings(origin: View, newView: View): boolean {
        console.log(compareObjects(origin.settings, newView.settings));
        return compareObjects(origin.settings, newView.settings);
    }
}
