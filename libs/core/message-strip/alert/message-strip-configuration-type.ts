import { Nullable } from '@fundamental-ngx/cdk/utils';
import { MessageStripIndicationColor } from '../message-strip-indication-color';
import { MessageStripType } from '../message-strip-type';

export interface MessageStripConfiguration {
    class: string;
    dismissible: boolean;
    mousePersist: boolean;
    duration: number;
    noIcon: boolean;
    type: MessageStripType;
    indicationColor: MessageStripIndicationColor;
    id: string;
    ariaLabelledBy: Nullable<string>;
    ariaLabel: Nullable<string>;
    dismissLabel: string;
    onDismiss: () => void;
}
