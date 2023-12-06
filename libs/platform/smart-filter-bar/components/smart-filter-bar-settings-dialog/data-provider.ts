import { ArrayTableDataProvider } from '@fundamental-ngx/platform/table';
import { FieldFilterItem } from '../../interfaces/smart-filter-bar-field-filter-item';
import { SmartFilterBarVisibilityCategory } from '../../interfaces/smart-filter-bar-visibility-category';

export class SmartFilterBarOptionsDataProvider extends ArrayTableDataProvider<FieldFilterItem> {
    /** @hidden */
    constructor(items: FieldFilterItem[]) {
        super(items);
    }

    /**
     * Filters rows depending on applied filter.
     * @param option filter visibility category.
     */
    filter(option: SmartFilterBarVisibilityCategory): void {
        let items: FieldFilterItem[];

        switch (option) {
            case 'visible':
                items = this._getVisibleItems();
                break;
            case 'active':
                items = this._getActiveItems();
                break;
            case 'visibleAndActive':
                items = this._getVisibleAndActiveItems();
                break;
            case 'mandatory':
                items = this._getMandatoryItems();
                break;
            case 'all':
            default:
                items = this._getAllItems();
                break;
        }

        this.items$.next(items);
    }

    /** @hidden */
    private _getAllItems(): FieldFilterItem[] {
        return this.items;
    }

    /** @hidden */
    private _getVisibleItems(): FieldFilterItem[] {
        return this.items.filter((i) => i.visible);
    }

    /** @hidden */
    private _getActiveItems(): FieldFilterItem[] {
        return this.items.filter((i) => i.active);
    }

    /** @hidden */
    private _getVisibleAndActiveItems(): FieldFilterItem[] {
        return this.items.filter((i) => i.visible || i.active);
    }

    /** @hidden */
    private _getMandatoryItems(): FieldFilterItem[] {
        return this.items.filter((i) => i.mandatory);
    }
}
