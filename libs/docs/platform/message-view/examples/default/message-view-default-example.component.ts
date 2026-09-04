import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    ViewChild,
    ViewEncapsulation,
    signal
} from '@angular/core';
import { ObjectStatus } from '@fundamental-ngx/core/object-status';
import { ButtonComponent } from '@fundamental-ngx/platform/button';
import {
    MessagePopoverEntry,
    MessagePopoverEntryLink,
    MessagePopoverErrorGroup,
    MessageViewComponent
} from '@fundamental-ngx/platform/message-view';

@Component({
    selector: 'fdp-message-view-default-example',
    templateUrl: './message-view-default-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [MessageViewComponent, ButtonComponent]
})
export class MessageViewDefaultExampleComponent implements AfterViewInit {
    @ViewChild(MessageViewComponent)
    messageView: MessageViewComponent;

    @ViewChild('profileButton', { read: ElementRef })
    profileButton: ElementRef;

    readonly messages = signal<MessagePopoverErrorGroup[]>([]);

    ngAfterViewInit(): void {
        this.messages.set([
            {
                group: 'Personal Information',
                errors: [
                    this.createMessage(
                        'error',
                        'Required Field',
                        'The username field is required and cannot be empty. Please provide a valid username to continue.',
                        'Username'
                    ),
                    this.createMessage(
                        'error',
                        'Invalid Email',
                        'Please enter a valid email address in the format: user@example.com. This email will be used for account notifications.',
                        'Email',
                        undefined,
                        {
                            text: 'Learn more about email validation',
                            href: 'https://www.example.com/email-help'
                        },
                        'Occurred on 2024-03-15 at 10:30 AM'
                    ),
                    this.createMessage(
                        'warning',
                        'Weak Password',
                        'Your password should contain at least 8 characters, including uppercase, lowercase, numbers, and special characters. This ensures better account security.',
                        'Password'
                    )
                ]
            },
            {
                group: 'Account Settings',
                errors: [
                    this.createMessage(
                        'success',
                        'Profile Saved',
                        'Your profile changes have been saved successfully. The changes will be reflected across all your devices.',
                        'Profile',
                        this.profileButton,
                        {
                            text: 'Profile',
                            href: '#/platform/message-view'
                        }
                    ),
                    this.createMessage(
                        'information',
                        'Account Setup',
                        'Please complete your account setup by adding a profile picture. This helps other users recognize you.',
                        'Account',
                        undefined,
                        {
                            text: 'Upload profile picture',
                            callback: () => alert('Upload profile picture clicked!')
                        }
                    )
                ]
            }
        ]);
    }

    showMessageView(): void {
        this.messageView?.open();
    }

    private createMessage(
        type: 'error' | 'warning' | 'success' | 'information',
        heading: string,
        description: string,
        fieldName: string,
        element?: ElementRef,
        link?: MessagePopoverEntryLink,
        subtitle?: string
    ): MessagePopoverEntry {
        return {
            type,
            state: this.getObjectStatus(type),
            heading: {
                type: 'string',
                message: heading
            },
            description: {
                type: 'string',
                message: description
            },
            name: fieldName.toLowerCase(),
            fieldName,
            errors: null,
            element,
            link,
            subtitle
        };
    }

    private getObjectStatus(type: 'error' | 'warning' | 'success' | 'information'): ObjectStatus {
        switch (type) {
            case 'success':
                return 'positive';
            case 'error':
                return 'negative';
            case 'warning':
                return 'critical';
            case 'information':
                return 'informative';
            default:
                return 'neutral';
        }
    }
}
