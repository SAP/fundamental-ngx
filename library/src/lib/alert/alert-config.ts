
/**
 * Configuration for opening an alert with the AlertService.
 */
export class AlertConfig {

    /** Whether the alert is dismissible. */
    dismissible?: boolean = true;

    /** The type of the alert. Can be one of *warning*, *success*, *information*, *error* or null. */
    type?: string;

    /** Id for the alert component. If omitted, a unique one is generated. */
    id?: string;

    /** Width of the alert. */
    width?: string = '33vw';

    /** Data being injected into the child component or template. */
    data?: any;

    /** Duration of time *in milliseconds* that the alert will be visible. Set to -1 for indefinite. */
    duration?: number = 10000;

    /** Whether the alert should stay open if the mouse is hovering over it. */
    mousePersist?: boolean = false;

    /** Id of the element that labels the alert. */
    ariaLabelledBy?: string = null;

    /** Aria label for the alert component element. */
    ariaLabel?: string = null;
}
