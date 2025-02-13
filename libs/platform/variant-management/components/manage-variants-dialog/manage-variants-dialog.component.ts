import { CdkScrollable } from '@angular/cdk/overlay';

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonBarComponent } from '@fundamental-ngx/core/bar';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import {
    DialogBodyComponent,
    DialogComponent,
    DialogFooterComponent,
    DialogHeaderComponent,
    DialogRef
} from '@fundamental-ngx/core/dialog';
import { IconComponent } from '@fundamental-ngx/core/icon';
import { RadioButtonComponent } from '@fundamental-ngx/core/radio';
import { ScrollbarDirective } from '@fundamental-ngx/core/scrollbar';
import { TitleComponent } from '@fundamental-ngx/core/title';
import { FdTranslatePipe } from '@fundamental-ngx/i18n';
import { CheckboxComponent, InputComponent } from '@fundamental-ngx/platform/form';
import { TableColumnComponent, TableComponent, TableDataSource } from '@fundamental-ngx/platform/table';
import {
    FdpCellDef,
    FdpTableCell,
    TableDataSourceDirective,
    TableHeaderResizerDirective,
    TableInitialStateDirective
} from '@fundamental-ngx/platform/table-helpers';
import { VariantItem } from '../../variant-item.class';
import { VariantManagementDataProvider } from './data-provider';

@Component({
    selector: 'fdp-manage-variants-dialog',
    templateUrl: './manage-variants-dialog.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        DialogComponent,
        DialogHeaderComponent,
        TitleComponent,
        CdkScrollable,
        ScrollbarDirective,
        DialogBodyComponent,
        TableDataSourceDirective,
        TableHeaderResizerDirective,
        TableComponent,
        TableInitialStateDirective,
        TableColumnComponent,
        FdpCellDef,
        FdpTableCell,
        IconComponent,
        InputComponent,
        FormsModule,
        RadioButtonComponent,
        CheckboxComponent,
        ButtonComponent,
        DialogFooterComponent,
        ButtonBarComponent,
        FdTranslatePipe
    ]
})
export class ManageVariantsDialogComponent {
    /** @hidden */
    _source: TableDataSource<VariantItem>;

    /**
     * @hidden
     * Used to apply typings in template.
     */
    _variantModel!: VariantItem;

    /** @hidden */
    private readonly _variants: VariantItem[] = [];

    /** @hidden */
    private readonly _dataProvider: VariantManagementDataProvider;

    /** @hidden */
    constructor(
        public dialog: DialogRef<VariantItem[]>,
        private readonly _cdr: ChangeDetectorRef
    ) {
        // We clone all variants, so we don't change original instances immediately.
        this._variants = this.dialog.data.map((oldVariant) => oldVariant.clone({}, false));
        this._dataProvider = new VariantManagementDataProvider(this._variants);
        this._source = new TableDataSource(this._dataProvider);
    }

    /** @Hidden */
    _markAsFavourite(item: VariantItem): void {
        item.favourite = !item.favourite;
    }

    /** @hidden */
    _removeVariant(item: VariantItem): void {
        this._variants.splice(
            this._variants.findIndex((variant) => item.id === variant.id),
            1
        );
        this._dataProvider.update(this._variants);
        this._cdr.detectChanges();
    }

    /**
     * @hidden
     * Closes dialog with updated variants array.
     */
    _saveVariants(): void {
        this.dialog.close(this._variants);
    }
}
