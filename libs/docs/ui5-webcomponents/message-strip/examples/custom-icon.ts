import { Component, signal } from '@angular/core';
import { Icon } from '@fundamental-ngx/ui5-webcomponents/icon';
import { MessageStrip } from '@fundamental-ngx/ui5-webcomponents/message-strip';
import { MessageStripDesign } from '@fundamental-ngx/ui5-webcomponents/types';

// Import Fundamental Styles
import 'fundamental-styles/dist/margins.css';

@Component({
    selector: 'ui5-message-strip-custom-icon-sample',
    templateUrl: './custom-icon.html',
    standalone: true,
    imports: [MessageStrip, Icon]
})
export class MessageStripCustomIconSample {
    readonly customMessages = signal([
        {
            id: 'user-profile',
            design: MessageStripDesign.Information,
            icon: 'person-placeholder',
            message: 'Profile update completed successfully. Your changes are now live.',
            customColor: '#0070f3'
        },
        {
            id: 'security',
            design: MessageStripDesign.Negative,
            icon: 'shield',
            message: 'Security: Two-factor authentication is recommended for your account.',
            customColor: '#ff9500'
        },
        {
            id: 'data-sync',
            design: MessageStripDesign.Positive,
            icon: 'synchronize',
            message: 'Data synchronization completed. All your files are up to date.',
            customColor: '#30d158'
        },
        {
            id: 'system-error',
            design: MessageStripDesign.Critical,
            icon: 'error',
            message: 'System error detected. Please contact support if the issue persists.',
            customColor: '#ff453a'
        }
    ]);
}
