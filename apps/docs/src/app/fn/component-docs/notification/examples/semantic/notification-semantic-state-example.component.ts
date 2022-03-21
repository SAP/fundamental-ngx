import { Component, TemplateRef } from '@angular/core';
import { ButtonType } from '@fundamental-ngx/fn/button';
import { take } from 'rxjs/operators';
import { NotificationService, NotificationState } from '@fundamental-ngx/fn/notification';
import { NotificationExampleData } from '../default/notification-default-example.component';

@Component({
    selector: 'fn-notification-semantic-state-example',
    templateUrl: './notification-semantic-state-example.component.html',
    styles: [
        `
            .fn-notification-example-control-buttons .fn-button {
                margin: 1rem;
            }
        `
    ]
})
export class NotificationSemanticStateExampleComponent {
    states: ButtonType[] = ['positive', 'negative', 'critical', 'info'] as ButtonType[];

    constructor(private _notificationService: NotificationService<NotificationExampleData>) {}

    dismissAll(): void {
        this._notificationService.dismissAll();
    }

    openFromTemplate(template: TemplateRef<any>, state: NotificationState = 'positive'): void {
        const notificationRef = this._notificationService.openFromTemplate(template, {
            message: 'Modi doloremque nesciunt nemo delectus cum dignissimos est voluptas commodi.',
            title: 'Notification opened from template.',
            duration: 3000,
            data: {
                avatar: 'https://picsum.photos/id/1025/400'
            },
            semantic: {
                state,
                title: state,
                icon: state === 'info' ? 'information' : `status-${state}`
            }
        });

        notificationRef
            .onAction()
            .pipe(take(1))
            .subscribe((result) => alert(`Notification dismissed with ${result}`));
    }
}
