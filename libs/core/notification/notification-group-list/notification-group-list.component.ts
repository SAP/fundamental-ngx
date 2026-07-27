import { DOWN_ARROW, END, HOME, UP_ARROW } from '@angular/cdk/keycodes';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    ViewEncapsulation,
    contentChildren,
    inject,
    input
} from '@angular/core';
import { KeyUtil } from '@fundamental-ngx/cdk/utils';
import { NotificationComponent } from '../notification/notification.component';
import { FD_NOTIFICATION, FD_NOTIFICATION_GROUP_LIST } from '../token';

let notificationGroupListCounter = 0;

@Component({
    selector: 'fd-notification-group-list',
    template: `<ng-content></ng-content>`,
    host: {
        class: 'fd-notification-group__list',
        role: 'list',
        '[attr.id]': 'id()',
        '(keydown)': '_onListKeydown($event)'
    },
    providers: [
        {
            provide: FD_NOTIFICATION_GROUP_LIST,
            useExisting: NotificationGroupListComponent
        }
    ],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: []
})
export class NotificationGroupListComponent implements AfterViewInit {
    /**
     * id of the element labelling the group list
     */
    ariaLabelledBy = input<string>();

    /**
     * id for the notification group list
     * if not set, a default value is provided
     */
    id = input('fd-notification-group-list-' + ++notificationGroupListCounter);

    /**
     * @hidden
     */
    notifications = contentChildren<NotificationComponent>(FD_NOTIFICATION);

    /** @hidden */
    private readonly _hostElement = inject(ElementRef<HTMLElement>);

    /**
     * @hidden
     */
    ngAfterViewInit(): void {
        this.notifications()?.forEach((notification) => {
            notification.role.set('listitem');
            notification.ariaLevel.set(2);
        });
    }

    /** @hidden Handles list keyboard navigation and moves focus to the target notification. */
    protected _onListKeydown(event: KeyboardEvent): void {
        if (!this._shouldHandleNavigation(event)) {
            return;
        }

        const notificationList = this.notifications() ?? [];

        if (!notificationList.length) {
            return;
        }

        const currentIndex = this._resolveCurrentIndex(event.target, notificationList);
        const targetIndex = this._resolveTargetIndex(event, currentIndex, notificationList.length);

        if (targetIndex === null || targetIndex === currentIndex) {
            return;
        }

        const focusedPath =
            currentIndex >= 0 ? (notificationList[currentIndex].getPathToChild(event.target) ?? []) : [];

        notificationList[targetIndex].focusByPath(focusedPath);
        event.preventDefault();
    }

    /** @hidden Returns the index of the notification that contains the current event target. */
    private _resolveCurrentIndex(
        target: EventTarget | null,
        notificationList: readonly NotificationComponent[]
    ): number {
        if (!(target instanceof HTMLElement)) {
            return -1;
        }

        return notificationList.findIndex((notification) =>
            (notification.elementRef.nativeElement as HTMLElement).contains(target)
        );
    }

    /** @hidden Calculates which notification should receive focus for Arrow, Home, and End keys. */
    private _resolveTargetIndex(event: KeyboardEvent, currentIndex: number, listLength: number): number | null {
        if (KeyUtil.isKeyCode(event, HOME)) {
            return 0;
        }

        if (KeyUtil.isKeyCode(event, END)) {
            return listLength - 1;
        }

        if (KeyUtil.isKeyCode(event, DOWN_ARROW)) {
            if (currentIndex === -1) {
                return 0;
            }

            return currentIndex < listLength - 1 ? currentIndex + 1 : currentIndex;
        }

        if (KeyUtil.isKeyCode(event, UP_ARROW)) {
            if (currentIndex === -1) {
                return listLength - 1;
            }

            return currentIndex > 0 ? currentIndex - 1 : currentIndex;
        }

        return null;
    }

    /** @hidden Allows navigation only for supported keys and non-editable targets inside the list. */
    private _shouldHandleNavigation(event: KeyboardEvent): boolean {
        const isNavigationKey =
            KeyUtil.isKeyCode(event, DOWN_ARROW) ||
            KeyUtil.isKeyCode(event, UP_ARROW) ||
            KeyUtil.isKeyCode(event, HOME) ||
            KeyUtil.isKeyCode(event, END);

        if (!isNavigationKey) {
            return false;
        }

        const target = event.target;
        if (!(target instanceof HTMLElement)) {
            return false;
        }

        if (!this._hostElement.nativeElement.contains(target)) {
            return false;
        }

        if (target.isContentEditable) {
            return false;
        }

        return !['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName);
    }
}
