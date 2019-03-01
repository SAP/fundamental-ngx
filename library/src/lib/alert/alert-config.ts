export class AlertConfig {
    dismissible?: boolean = true;
    type?: string;
    id?: string;
    width?: string;
    data?: any;
    persist?: boolean = false;
    visibleTime?: number = 10000;
    mousePersist?: boolean = false;
    ariaLabelledBy?: string = null;
    ariaLabel?: string = null;

    // TODO: Maybe not needed. Check later.
    inline?: string;
}
