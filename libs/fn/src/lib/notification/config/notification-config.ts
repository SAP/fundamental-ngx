import { IconFont } from '@fundamental-ngx/core/icon';
import { BaseToastDurationDismissibleConfig } from '@fundamental-ngx/cdk/utils';

export type NotificationState = 'positive' | 'info' | 'negative' | 'critical';

export interface NotificationSemanticState {
    /** Notification state. */
    state?: NotificationState;
    /** Semantic state icon. */
    icon?: string;
    /**
     * The icon font.
     * Options include: 'SAP-icons', 'BusinessSuiteInAppSymbols' and 'SAP-icons-TNT'
     */
    font?: IconFont;
    /** Notification Semantic State Title. */
    title?: string;
    /** Aria-label for semantic state icon. */
    iconAriaLabel?: string;
}

export class NotificationConfig<T = any> extends BaseToastDurationDismissibleConfig<T> {
    /** Notification Semantic State. */
    semantic?: NotificationSemanticState = {
        font: 'SAP-icons'
    };

    /** Whether to show 'x' icon. Default is false. */
    dismissIcon? = false;

    /** Notification title */
    title?: string;

    /** Notification message */
    message!: string;
}
