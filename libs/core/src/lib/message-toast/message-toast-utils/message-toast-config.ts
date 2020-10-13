import { DynamicComponentConfig } from '../../utils/dynamic-component/dynamic-component-config';

/**
 * Configuration for opening a message toast with the MessageToastService.
 */
export class MessageToastConfig implements DynamicComponentConfig {
    /** Id for the message toast component. If omitted, a unique one is generated. */
    id?: string;

    /** Data being injected into the child component or template. */
    data?: any;

    /** Duration of time *in milliseconds* that the message toast will be visible. Set to -1 for indefinite. */
    duration = 3000;

    /** Whether the message toast should stay visible if the cursor is over it. */
    mousePersist = false;

    /** Aria label for the message toast component element. */
    ariaLabel?: string = null;

    /** Width of the message toast. */
    width?: string;

    /** Minimum width of the message toast. */
    minWidth?: string;

    /** Maximum width of the message toast. */
    maxWidth?: string;

    /** The container that the message toast is appended to. By default, it is appended to the body. */
    container?: HTMLElement | 'body' = 'body';
}
