/**
 * Configuration for opening a modal with the ModalService.
 */
import { ModalPosition } from './modal-position';
import { DynamicComponentConfig } from '../../utils/dynamic-component/dynamic-component-config';

export class ModalConfig implements DynamicComponentConfig {

    /** Id for the modal component. If omitted, a unique one is generated. */
    id?: string;

    /** Width of the modal. */
    width?: string;

    /** Height of the modal. */
    height?: string;

    /** Minimum width of the modal. */
    minWidth?: string;

    /** Minimum height of the modal. */
    minHeight?: string;

    /** Maximum width of the modal. */
    maxWidth?: string;

    /** Maximum height of the modal. */
    maxHeight?: string;

    /** Position of the modal. */
    position?: ModalPosition;

    /** Aria label for the modal component element. */
    ariaLabel?: string = null;

    /** Id of the element that labels the modal. */
    ariaLabelledBy?: string = null;

    /** Id of the element that describes the modal. */
    ariaDescribedBy?: string = null;

    /** Whether the modal should have a backdrop. */
    hasBackdrop?: boolean = true;

    /** Global classes to apply to the backdrop. */
    backdropClass?: string = '';

    /** Whether clicking on the backdrop should close the modal. Only works if hasBackdrop is true. */
    backdropClickCloseable?: boolean = true;

    /** Global classes to apply to the modal panel. */
    modalPanelClass?: string = '';

    /** Whether the escape key should close the modal. */
    escKeyCloseable?: boolean = true;

    /** Whether the modal should be focus trapped. */
    focusTrapped?: boolean = true;

    /** The container that the modal is appended to. By default, it is appended to the body. */
    container?: HTMLElement | 'body' = 'body';

    /** Data to pass along to the content through the ModalRef. */
    data?: any;
}
