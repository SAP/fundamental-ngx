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
import { HeaderSizes } from '../title/public_api';
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

    @Input()
    activeView: View;

    @Input()
    disabled: boolean;

    @Input()
    headerSize: HeaderSizes = 4;

    @Input()
    dirtyIndicator: string;

    @Output()
    updateView = new EventEmitter<View>();

    @Output()
    manageViews = new EventEmitter<View[]>();

    @Output()
    selectView = new EventEmitter<View>();

    @Output()
    saveView = new EventEmitter<{ view: View; autoApply: boolean }>();

    isViewsOpen = false;
    viewChanged = false;
    selectedView: View;
    draftView: View;

    defaultView: string = null;

    viewModel: Partial<View>;

    manageSearchValue = '';

    constructor(
        private readonly _dialogService: DialogService,
        private readonly _changeDetectorRef: ChangeDetectorRef
    ) {}

    ngOnChanges(changes: SimpleChanges): void {
        if ('views' in changes || 'activeView' in changes) {
            this._initActiveView();
        }
    }

    ngOnInit(): void {
        this._initActiveView();
    }

    updateDraftView(view: View): void {
        const currentView = this.views.find(v => v.id === view.id);
        this.viewChanged = !compareObjects(currentView, view);

        if (this.viewChanged) {
            this.selectedView = view;
        }
        this._changeDetectorRef.markForCheck();
    }

    /** @hidden */
    onSelectView(view: View): void {
        this.viewChanged = false;
        this.selectView.emit(view);
        this.isViewsOpen = false;
    }

    /** @hidden */
    onUpdate(): void {
        if (this.viewChanged) {
            this.updateView.emit(this.selectedView);
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
                autoApply: false,
                view: new View()
            }
        });

        dialogRef.afterClosed.subscribe((data: { autoApply: boolean; view: View }) => {
            if (data) {
                const selectedView = {
                    ...Object.assign({}, this.selectedView),
                    ...data.view
                };
                if (data.autoApply) {
                    this.viewChanged = false;
                }
                this.saveView.emit({
                    view: selectedView,
                    autoApply: data.autoApply
                });
            }
        });
    }

    /** @hidden */
    onManageDialog(dialog: TemplateRef<any>): void {
        this.isViewsOpen = false;
        this.defaultView = this.views.find((view) => view.default)?.id;
        const dialogRef = this._dialogService.open(dialog, {
            responsivePadding: true,
            draggable: true,
            width: '1000px',
            data: {
                views: this.views.map((view) => Object.assign({}, { ...view }))
            }
        });

        dialogRef.afterClosed.subscribe((result: View[]) => {
            if (result) {
                this.manageViews.emit(result);
            }
        });
    }

    /** @hidden */
    _onCancelView(dialog: DialogRef): void {
        dialog.close(false);
    }

    /** @hidden */
    _onSaveManage(dialog: DialogRef): void {
        dialog.close(dialog.data.views);
    }

    /** @hidden */
    _onCancelManage(dialog: DialogRef): void {
        dialog.dismiss();
    }

    /** @hidden */
    _onRemoveView(data: { views: View[] }, view: View): void {
        data.views = data.views.filter(v => v.id !== view.id);
    }

    /** @hidden */
    private _initActiveView(): void {
        this.selectedView = {
            ...JSON.parse(JSON.stringify(this.activeView || this.views.find((view) => view.default)))
        };
    }
}
