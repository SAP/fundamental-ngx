import { Component, ChangeDetectionStrategy, TemplateRef } from '@angular/core';
import { NotificationConfig, NotificationService } from '@fundamental-ngx/fn/notification';
import { take } from 'rxjs/operators';
import { NotificationWithComponentExampleComponent } from './component/notification-with-component-example.component';

export interface NotificationExampleData {
    avatar: string;
}

@Component({
    selector: 'fundamental-ngx-notification-default-example',
    templateUrl: './notification-default-example.component.html',
    styles: [
        `
            .fn-notification-example-control-buttons .fn-button {
                margin: 1rem;
            }
        `
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationDefaultExampleComponent {
    constructor(private _notificationService: NotificationService<NotificationExampleData>) {}

    dismissAll(): void {
        this._notificationService.hideAll();
    }

    openFromString(): void {
        this._notificationService.open({
            dismissIcon: true,
            duration: 3000,
            message: 'Modi doloremque nesciunt nemo delectus cum dignissimos est voluptas commodi.',
            title: 'Notification opened from string.'
        });
    }

    openFromTemplate(template: TemplateRef<any>): void {
        const notificationRef = this._notificationService.openFromTemplate(template, {
            message: 'Modi doloremque nesciunt nemo delectus cum dignissimos est voluptas commodi.',
            title: 'Notification opened from template.',
            dismissIcon: true,
            duration: 3000,
            data: {
                avatar: 'https://picsum.photos/id/1025/400'
            }
        });

        notificationRef
            .onAction()
            .pipe(take(1))
            .subscribe((result) => alert(`Notification dismissed with ${result}`));
    }

    openFromComponent(): void {
        const config: NotificationConfig<NotificationExampleData> = {
            message: 'Modi doloremque nesciunt nemo delectus cum dignissimos est voluptas commodi.',
            title: 'Notification opened from component.',
            dismissIcon: true,
            duration: 3000,
            data: {
                avatar: 'https://picsum.photos/id/1025/400'
            }
        };

        this._notificationService.openFromComponent(NotificationWithComponentExampleComponent, config);
    }
}
