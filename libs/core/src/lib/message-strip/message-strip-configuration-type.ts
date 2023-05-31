import { Nullable } from '@fundamental-ngx/cdk/utils';

export type MessageStripType = Nullable<'warning' | 'success' | 'information' | 'error'>;

export interface MessageStripConfiguration {
    class: string;
    dismissible: boolean;
    mousePersist: boolean;
    duration: number;
    noIcon: boolean;
    type: MessageStripType;
    id: string;
    ariaLabelledBy: Nullable<string>;
    ariaLabel: Nullable<string>;
    dismissLabel: string;
    onDismiss: () => void;
}
