export interface ProductSwitchItem {

    /** Title of product */
    title: string;

    /** Subtitle of product */
    subtitle?: string;

    /** Url of product image */
    image?: string;

    /** Callback function that will be called on selecting this product from dropdown */
    callback?: Function;

    /** Icon of product item */
    icon?: string;

    /** Whether user wants to mark this element ass selected */
    selected?: boolean;

    /** Whether user wants to disable drag and drop functionality from single element */
    disabledDragAndDrop?: boolean;
}
