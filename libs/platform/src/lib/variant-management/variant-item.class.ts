import { cloneDeep } from 'lodash-es';
import { NewVariant, Variant, VariantAccess } from './models/variant.interface';

let defaultVariantId = 0;

export class VariantItem<T = any> implements Variant<T> {
    /** Visibility of the variant. If public, available for everyone. */
    access: VariantAccess = 'public';
    /** Whether to automatically apply changes in preset managed component. */
    applyAutomatically? = false;
    /** Variant's author name. */
    createdBy: string;
    /** Variant data. Can contain any type of data. */
    data: T;
    /** Whether variant is marked as favourite. */
    favourite = false;
    /** Variant ID. */
    id = `variant-item-${++defaultVariantId}`;
    /** Whether to apply variant automatically. */
    isDefault = false;
    /** Variant name to be displayed in popover list. */
    name: string;
    /** Whether variant is editable. */
    readonly = false;

    /** @hidden */
    constructor(config: Partial<Variant>) {
        Object.keys(config).forEach((configKey) => {
            this[configKey] = config[configKey];
        });
    }

    /**
     * Clones current variant and applies new config on top of it.
     * @param newVariantData New config.
     * @param refreshId Whether to assign new ID to the new variant.
     */
    clone(newVariantData: NewVariant = {}, refreshId = true): VariantItem {
        const currentVariantData: Variant = Object.assign({}, this, newVariantData);

        currentVariantData.data = cloneDeep(currentVariantData.data);

        if (refreshId) {
            delete currentVariantData.id;
        }
        const newVariant = new VariantItem(currentVariantData);
        return newVariant;
    }
}
