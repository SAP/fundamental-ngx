export interface DynamicComponentConfig {
    /** Data to pass along to the content through the dynamic component reference service. */
    data?: any;

    /** The container that the dynamic component is appended to. By default, it is appended to the body. */
    container?: HTMLElement | 'body';
}
