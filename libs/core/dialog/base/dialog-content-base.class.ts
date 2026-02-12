/**
 * Base class for dialog content configuration.
 * Defines common properties for dialog titles, content, buttons, and accessibility attributes.
 */
export class DialogContentBase<ContentType = unknown> {
    /**
     * Unique identifier for the dialog title element.
     */
    titleId?: string;

    /**
     * Text content for the dialog title.
     * Displayed in the dialog header.
     */
    title?: string;

    /**
     * Semantic heading level for the dialog title.
     * Determines which HTML heading tag (h1-h6) to use for proper document outline.
     * @default 1
     * @example 2 // renders as <h2>
     */
    titleHeadingLevel?: 1 | 2 | 3 | 4 | 5 | 6 = 1;

    /**
     * Main content to be displayed in the dialog body.
     * Can be a template, component, or any custom content type.
     */
    content?: ContentType;

    /**
     * Unique identifier for the dialog content/body element.
     */
    contentId?: string;

    /**
     * Aria Modal attribute for the dialog component element.
     * When true, indicates the dialog is modal and content outside is inert.
     * @default false
     */
    ariaModal?: boolean;

    /**
     * ARIA label for the dialog component element.
     * Provides an accessible name when no visible title is present.
     */
    ariaLabel?: string | null | undefined;

    /**
     * ID of the element that labels the dialog.
     * References an element (typically the title) that serves as the dialog's accessible name.
     */
    ariaLabelledBy?: string | null | undefined;

    /**
     * ID of the element that describes the dialog.
     * References an element that provides additional context about the dialog's purpose.
     */
    ariaDescribedBy?: string | null | undefined;

    /**
     * Label text for the approve/confirm button.
     * If provided, displays a primary action button in the dialog footer.
     */
    approveButton?: string;

    /**
     * Unique identifier for the approve button element.
     */
    approveButtonId?: string;

    /**
     * Callback function executed when the approve button is clicked.
     * Use this to handle the primary action of the dialog.
     */
    approveButtonCallback?: () => void;

    /**
     * ARIA label for the approve button element.
     * Provides an accessible name for screen readers, especially when the button text is not descriptive.
     */
    approveButtonAriaLabel?: string;

    /**
     * Label text for the cancel/dismiss button.
     * If provided, displays a secondary action button in the dialog footer.
     */
    cancelButton?: string;

    /**
     * Unique identifier for the cancel button element.
     */
    cancelButtonId?: string;

    /**
     * Callback function executed when the cancel button is clicked.
     * Use this to handle cancellation or dismissal logic.
     */
    cancelButtonCallback?: () => void;

    /**
     * Callback function executed when the close button (X icon) is clicked.
     * Typically used to dismiss the dialog without taking action.
     */
    closeButtonCallback?: () => void;

    /**
     * Callback function executed when the full screen toggle button is clicked.
     * Use this to handle expanding or minimizing the dialog to full screen.
     */
    fullScreenButtonCallback?: () => void;

    /**
     * Title/tooltip text for the close button.
     * Displayed on hover to provide context for the close action.
     */
    closeButtonTitle?: string;

    /**
     * ARIA label for the close button element.
     * Provides an accessible name for screen readers.
     */
    closeButtonAriaLabel?: string;
}
