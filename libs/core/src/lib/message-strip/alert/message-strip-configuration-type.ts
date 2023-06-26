import { Nullable } from '@fundamental-ngx/cdk/utils';
import { MessageStripType } from '../message-strip-type';
import { MessageStripIndicationColor } from '../message-strip-indication-color';

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
