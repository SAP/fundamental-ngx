import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';
import { DialogRef } from '@fundamental-ngx/core/dialog';
import { TableDataSource } from '@fundamental-ngx/platform/table';
import { VariantItem } from '../../variant-item.class';
import { VariantManagementDataProvider } from './data-provider';

@Component({
    selector: 'fdp-manage-variants-dialog',
    templateUrl: './manage-variants-dialog.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
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
    constructor(public dialog: DialogRef<VariantItem[]>, private readonly _cdr: ChangeDetectorRef) {
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
