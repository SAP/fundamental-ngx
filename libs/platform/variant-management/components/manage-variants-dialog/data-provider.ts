import { ArrayTableDataProvider } from '@fundamental-ngx/platform/table';
import { VariantItem } from '../../variant-item.class';

export class VariantManagementDataProvider extends ArrayTableDataProvider<VariantItem> {
    /** @hidden */
    constructor(items: VariantItem[]) {
        super(items);
    }

    /** Updates items list. */
    update(items: VariantItem[]): void {
        this.items$.next(items);
    }
}
