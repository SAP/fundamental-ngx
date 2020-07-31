import { DynamicComponentConfig } from '../../utils/dynamic-component/dynamic-component-config';

/**
 * @deprecated
 * Alert component is depricated since version 0.16.0
 * Message Strip component should be used instead.
 *
 * Configuration for opening an alert with the AlertService.
 */
export class AlertConfig implements DynamicComponentConfig {
    /** Whether the alert is dismissible. */
    dismissible = true;

    /** The type of the alert. Can be one of *warning*, *success*, *information*, *error* or null. */
    type?: string;

    /** Id for the alert component. If omitted, a unique one is generated. */
    id?: string;

    /** Width of the alert. */
    width = '33vw';

    /** Minimum width of the alert. */
    minWidth = '300px';

    /** Data being injected into the child component or template. */
    data?: any;

    /** Duration of time *in milliseconds* that the alert will be visible. Set to -1 for indefinite. */
    duration = 10000;

    /** Whether the alert should stay open if the mouse is hovering over it. */
    mousePersist = false;

    /** Id of the element that labels the alert. */
    ariaLabelledBy?: string = null;

    /** Aria label for the alert component element. */
    ariaLabel?: string = null;

    /** The container that the Alert is appended to. By default, it is appended to the body. */
    container?: HTMLElement | 'body' = 'body';
}
