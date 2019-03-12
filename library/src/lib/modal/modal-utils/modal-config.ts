export class ModalConfig {
    id?: string;
    width?: string;
    height?: string;
    minWidth?: string;
    minHeight?: string;
    maxWidth?: string;
    maxHeight?: string;
    ariaLabel?: string = null;
    ariaLabelledBy?: string = null;
    ariaDescribedBy?: string = null;
    hasBackdrop?: boolean = true;
    backdropClass?: string = '';
    backdropClickCloseable?: boolean = true;
    modalPanelClass?: string = '';
    escKeyCloseable?: boolean = true;
    focusTrapped?: boolean = true;
    data?: any;
}
