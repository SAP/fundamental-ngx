export class AlertConfig {
    dismissible?: boolean = true;
    type?: string;
    id?: string;
    width?: string = '33vw';
    data?: any;
    persist?: boolean = false;
    duration?: number = 10000;
    mousePersist?: boolean = false;
    ariaLabelledBy?: string = null;
    ariaLabel?: string = null;
}
