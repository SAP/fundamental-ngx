export interface ProductSwitchItem {
    /** Title of product */
    title: string;

    /** Subtitle of product */
    subtitle?: string;

    /** Callback function that will be called on selecting this product from dropdown */
    callback?: (event: MouseEvent) => void;

    /** Icon of product item */
    icon?: string;

    /** Whether user wants to mark this element ass selected */
    selected?: boolean;

    /** Whether user wants to disable drag and drop functionality from single element */
    disabledDragAndDrop?: boolean;

    /** Whether this element should stick in one place, without changing position */
    stickToPosition?: boolean;
}
