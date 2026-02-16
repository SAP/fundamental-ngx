import { DynamicComponentConfig } from '@fundamental-ngx/cdk/utils';
import { ContentDensityMode } from '@fundamental-ngx/core/content-density';
import { DialogPosition } from '../utils/dialog-position.class';

/** Dimension value that can be a numeric pixel value or string with units */
type DimensionValue = string | number;

export class DialogConfigBase<T> implements DynamicComponentConfig {
    /**
     * Id for the dialog component.
     */
    id?: string;

    /**
     * Width of the dialog.
     * Accepts numeric values (interpreted as pixels) or string values with units.
     * @example '500px', 500, '50%', '50vw'
     */
    width?: DimensionValue;

    /**
     * Height of the dialog.
     * Accepts numeric values (interpreted as pixels) or string values with units.
     * @example '600px', 600, '80vh'
     */
    height?: DimensionValue;

    /**
     * Minimum width of the dialog.
     * Accepts numeric values (interpreted as pixels) or string values with units.
     * @example '400px', 400, '30%'
     */
    minWidth?: DimensionValue;

    /**
     * Minimum height of the dialog.
     * Accepts numeric values (interpreted as pixels) or string values with units.
     * @example '300px', 300, '40vh'
     */
    minHeight?: DimensionValue;

    /**
     * Maximum width of the dialog.
     * Accepts numeric values (interpreted as pixels) or string values with units.
     * @example '1200px', 1200, '90vw'
     */
    maxWidth?: DimensionValue;

    /**
     * Maximum height of the dialog.
     * Accepts numeric values (interpreted as pixels) or string values with units.
     * @example '800px', 800, '95vh'
     */
    maxHeight?: DimensionValue;

    /**
     * Position of the dialog within the viewport.
     * Allows precise placement using top, bottom, left, and right coordinates.
     */
    position?: DialogPosition;

    /**
     * Aria Modal for the dialog component element.
     * @default false
     */
    ariaModal?: boolean = false;

    /**
     * Aria label for the dialog component element.
     * Provides an accessible name when no visible title is present.
     */
    ariaLabel?: string | undefined | null;

    /**
     * Id of the element that labels the dialog.
     * References an element (typically a heading) that serves as the dialog's title.
     */
    ariaLabelledBy?: string | undefined | null;

    /**
     * Id of the element that describes the dialog.
     * References an element that provides additional context about the dialog.
     */
    ariaDescribedBy?: string | undefined | null;

    /**
     * Whether the dialog should have a backdrop (overlay).
     * The backdrop appears behind the dialog and typically dims the background content.
     * @default true
     */
    hasBackdrop?: boolean = true;

    /**
     * Whether clicking on the backdrop should close the dialog.
     * Only works if hasBackdrop is true.
     * @default false
     */
    backdropClickCloseable?: boolean = false;

    /**
     * Global classes to apply to the backdrop element.
     * Useful for custom backdrop styling or animations.
     * @example 'custom-backdrop dark-backdrop'
     */
    backdropClass?: string;

    /**
     * Classes to apply to the `fd-dialog-container` element.
     * The container wraps the entire dialog structure.
     * @example 'custom-container compact-dialog'
     */
    containerClass?: string;

    /**
     * Global classes to apply to the dialog panel element.
     * The panel is the main dialog content area.
     * @example 'custom-panel elevated-dialog'
     */
    dialogPanelClass?: string;

    /**
     * Whether the escape key should close the dialog.
     * When true, pressing ESC will dismiss the dialog.
     * @default true
     */
    escKeyCloseable?: boolean = true;

    /**
     * Whether the dialog should be focus trapped.
     * When true, keyboard focus is constrained within the dialog for accessibility.
     * Users cannot tab to elements outside the dialog while it's open.
     * @default true
     */
    focusTrapped?: boolean = true;

    /**
     * The container that the dialog is appended to.
     * Can be a specific HTMLElement or 'body' for document body.
     * @default 'body'
     */
    container?: HTMLElement | 'body' = 'body';

    /**
     * Data to pass along to the content through the DialogRef.
     * This data is accessible in the dialog component via the DialogRef.
     */
    data?: T;

    /**
     * Whether the dialog should be displayed in mobile mode.
     * Mobile mode adapts the dialog layout for smaller screens.
     */
    mobile?: boolean;

    /**
     * Whether the dialog in mobile mode should have outer space.
     * Adds margin around the dialog in mobile view.
     */
    mobileOuterSpacing?: boolean;

    /**
     * Whether the dialog should have vertical padding (top and bottom).
     * @default true
     */
    verticalPadding?: boolean = true;

    /**
     * Whether the dialog should have horizontal padding (left and right).
     * @default true
     */
    horizontalPadding?: boolean = true;

    /**
     * Whether to completely disable all dialog body paddings.
     * When true, overrides verticalPadding and horizontalPadding settings.
     * @default false
     */
    disablePaddings?: boolean = false;

    /**
     * Whether the dialog is a Settings dialog.
     * Applies specific styling appropriate for settings/configuration dialogs.
     */
    settings?: boolean;

    /**
     * Minimum height for the dialog body.
     * Workaround for older browsers where `flex-grow: 1` on dialog body doesn't work
     * when 'min-height' is set on the dialog container.
     * @example '400px', '50vh'
     */
    bodyMinHeight?: string;

    /**
     * Whether the dialog should have responsive horizontal padding that changes with dialog width.
     * Padding classes are applied based on dialog width breakpoints:
     * - max-width: 599px → .fd-dialog__content--s
     * - min-width: 600px and max-width: 1023px → .fd-dialog__content--m
     * - min-width: 1024px and max-width: 1439px → .fd-dialog__content--l
     * - min-width: 1440px → .fd-dialog__content--xl
     * @default false
     */
    responsivePadding?: boolean = false;

    /**
     * Whether to close the dialog when Angular router navigation starts.
     * Useful to automatically clean up dialogs when user navigates away.
     * @default true
     */
    closeOnNavigation?: boolean = true;

    /**
     * Content density mode for the dialog.
     * Controls spacing and sizing of dialog elements.
     * @example 'compact', 'cozy', 'comfortable'
     */
    contentDensity?: ContentDensityMode;
}
