/**
 * Configuration for opening an alert with the AlertService.
 */
import { DynamicComponentConfig } from '../../utils/dynamic-component/dynamic-component-config';

export class AlertConfig implements DynamicComponentConfig {

    /** Whether the alert is dismissible. */
    dismissible?: boolean = true;

    /** The type of the alert. Can be one of *warning*, *success*, *information*, *error* or null. */
    type?: string;

    /** Id for the alert component. If omitted, a unique one is generated. */
    id?: string;

    /** Width of the alert. */
    width?: string = '33vw';

    /** Minimum width of the alert. */
    minWidth?: string = '300px';

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

    /** The container that the Alert is appended to. By default, it is appended to the body. */
    container?: HTMLElement | 'body' = 'body';
}
