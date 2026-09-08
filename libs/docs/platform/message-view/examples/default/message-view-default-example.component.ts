import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    ViewChild,
    ViewEncapsulation,
    signal
} from '@angular/core';
import { ButtonComponent } from '@fundamental-ngx/platform/button';
import { MessagePopoverErrorGroup, MessageViewComponent } from '@fundamental-ngx/platform/message-view';

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
                    {
                        type: 'error',
                        state: 'negative',
                        heading: {
                            type: 'string',
                            message: 'Required Field'
                        },
                        description: {
                            type: 'string',
                            message:
                                'The username field is required and cannot be empty. Please provide a valid username to continue.'
                        },
                        name: 'username',
                        fieldName: 'Username',
                        errors: null
                    },
                    {
                        type: 'error',
                        state: 'negative',
                        heading: {
                            type: 'string',
                            message: 'Invalid Email'
                        },
                        description: {
                            type: 'string',
                            message:
                                'Please enter a valid email address in the format: user@example.com. This email will be used for account notifications.'
                        },
                        name: 'email',
                        fieldName: 'Email',
                        errors: null,
                        link: {
                            text: 'Learn more about email validation',
                            href: 'https://www.example.com/email-help'
                        },
                        subtitle: 'Occurred on 2024-03-15 at 10:30 AM'
                    },
                    {
                        type: 'warning',
                        state: 'critical',
                        heading: {
                            type: 'string',
                            message: 'Weak Password'
                        },
                        description: {
                            type: 'string',
                            message:
                                'Your password should contain at least 8 characters, including uppercase, lowercase, numbers, and special characters. This ensures better account security.'
                        },
                        name: 'password',
                        fieldName: 'Password',
                        errors: null
                    }
                ]
            },
            {
                group: 'Account Settings',
                errors: [
                    {
                        type: 'success',
                        state: 'positive',
                        heading: {
                            type: 'string',
                            message: 'Profile Saved'
                        },
                        description: {
                            type: 'string',
                            message:
                                'Your profile changes have been saved successfully. The changes will be reflected across all your devices.'
                        },
                        name: 'profile',
                        fieldName: 'Profile',
                        errors: null,
                        element: this.profileButton,
                        link: {
                            text: 'Profile',
                            href: '#/platform/message-view'
                        }
                    },
                    {
                        type: 'information',
                        state: 'informative',
                        heading: {
                            type: 'string',
                            message: 'Account Setup'
                        },
                        description: {
                            type: 'string',
                            message:
                                'Please complete your account setup by adding a profile picture. This helps other users recognize you.'
                        },
                        name: 'account',
                        fieldName: 'Account',
                        errors: null,
                        link: {
                            text: 'Upload profile picture',
                            callback: () => alert('Upload profile picture clicked!')
                        }
                    }
                ]
            }
        ]);
    }

    showMessageView(): void {
        this.messageView?.open();
    }
}
