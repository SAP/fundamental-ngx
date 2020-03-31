/**
 * Interface SelectItem is used to deal with complex object in order to be able to format
 * custom label that is shown in the options.
 *
 * Used in various controls: Select, RadioGroup, CheckboxGroup
 */
export interface SelectItem {
    /**
     * Item text shown in the popup
     */
    label: string;

    /**
     * References to the object instance
     */
    value: any;
    disabled?: boolean;

    icon?: string;
    /**
     * Trigger values is a text for selected item
     */
    triggerValue?: string;
}

export function isSelectItem(item: SelectItem): item is SelectItem {
    return item && item.label !== undefined && item.value !== undefined;
}

/**
 * To unify the work with domain objects we have these set of interfaces that each Entity or Value
 * must use to leverage some of the functionality we have in the core
 *
 */
export interface CompositeType {

  className(): string;
}
export interface Deserializable {
  getTypes(): any;
}

/**
 * EntityComposite having identity that can be identified in the storage by its ID. Entities are
 * mutable objects
 */
export interface Entity extends Identity,
  Deserializable,
  CompositeType {
}

export interface Identity {

  identity(): string;

}
