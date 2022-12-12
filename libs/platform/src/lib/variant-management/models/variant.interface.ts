export type VariantAccess = 'private' | 'public';

/** Base Variant interface. */
export interface Variant<T = any> {
    /** Variant ID. */
    id?: string;
    /** Variant name to be displayed in popover list. */
    name: string;
    /** Variant's author name. */
    createdBy: string;
    /** Whether variant is editable. */
    readonly: boolean;
    /** Whether variant is marked as favourite. */
    favourite: boolean;
    /** Whether to apply variant automatically. */
    isDefault: boolean;
    /** Visibility of the variant. If public, available for everyone. */
    access: VariantAccess;
    /** Variant data. Can contain any type of data. */
    data: T;
    /** Whether to automatically apply changes in preset managed component. */
    applyAutomatically?: boolean;
}

export type NewVariant = Partial<
    Pick<Variant, 'name' | 'isDefault' | 'access' | 'applyAutomatically' | 'readonly' | 'favourite'>
>;
