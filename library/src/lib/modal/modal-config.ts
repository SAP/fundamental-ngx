export class ModalConfig {
    id?: string;

    width?: number;
    height?: number;
    minWidth?: number;
    minHeight?: number;
    maxWidth?: number;
    maxHeight?: number;

    ariaLabel?: string;
    ariaLabelledBy?: string;

    hasBackdrop?: boolean;
    backdropClass?: string = '';
    backdropClickCloseable?: boolean = true;
    escKeyCloseable?: boolean = true;

    data?: any;
}
