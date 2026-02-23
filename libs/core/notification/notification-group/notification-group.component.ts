import {
    AfterViewInit,
    Component,
    DestroyRef,
    OnInit,
    computed,
    contentChild,
    inject,
    input,
    signal
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Nullable } from '@fundamental-ngx/cdk/utils';
import { FD_LANGUAGE, FdLanguage, TranslationResolver } from '@fundamental-ngx/i18n';
import { NotificationGroupHeaderTitleDirective } from '../directives/notification-group-header-title.directive';
import { NotificationGroupHeaderComponent } from '../notification-group-header/notification-group-header.component';
import { NotificationGroupListComponent } from '../notification-group-list/notification-group-list.component';
import { FD_NOTIFICATION_GROUP_HEADER, FD_NOTIFICATION_GROUP_HEADER_TITLE, FD_NOTIFICATION_GROUP_LIST } from '../token';

@Component({
    selector: 'fd-notification-group',
    standalone: true,
    template: `<div class="fd-notification-group__wrapper">
        <ng-content select="fd-notification-group-header"></ng-content>
        @if (isExpanded()) {
            <ng-content select="fd-notification-group-list"></ng-content>
            <ng-content select="fd-notification-group-growing-item"></ng-content>
        }
    </div>`,
    host: {
        class: 'fd-notification-group',
        role: 'listitem',
        '[tabindex]': '-1',
        '[attr.aria-level]': '1',
        '[attr.aria-label]': 'ariaLabel()',
        '[attr.aria-labelledby]': 'ariaLabelledBy()',
        '[attr.aria-description]': 'ariaDescription()'
    }
})
export class NotificationGroupComponent implements OnInit, AfterViewInit {
    /**
     * Whether the group is expanded
     * default value is false
     */
    expanded = input(false);

    /**
     * input property to set aria-label
     * accepts a string value
     */
    ariaLabel = input<string>();

    /** @hidden */
    readonly ariaLabelledBy = computed(() => this.groupTitle()?.id());

    /** @hidden */
    readonly ariaDescription = computed(
        () =>
            `${this._descriptionString()} ${
                this.groupHeader()?.expanded() ? this._expandedString() : this._collapsedString()
            }`
    );

    /** @hidden */
    readonly isExpanded = computed(() => this.groupHeader()?.expanded());

    /** @hidden */
    readonly groupHeader = contentChild<NotificationGroupHeaderComponent>(FD_NOTIFICATION_GROUP_HEADER);

    /** @hidden */
    readonly groupTitle = contentChild<NotificationGroupHeaderTitleDirective>(FD_NOTIFICATION_GROUP_HEADER_TITLE);

    /** @hidden */
    readonly groupList = contentChild<NotificationGroupListComponent>(FD_NOTIFICATION_GROUP_LIST);

    /** @hidden */
    private _descriptionString = signal<Nullable<string>>('');

    /** @hidden */
    private _expandedString = signal<Nullable<string>>('');

    /** @hidden */
    private _collapsedString = signal<Nullable<string>>('');

    /** @hidden */
    private readonly _destroyRef = inject(DestroyRef);

    /** @hidden */
    private readonly _lang$ = inject(FD_LANGUAGE);

    /** @hidden */
    private _translationResolver = new TranslationResolver();

    /** @hidden */
    ngAfterViewInit(): void {
        this.groupHeader()?.ariaControls.set(this.groupList()?.id() ?? null);
        this.groupHeader()?.expanded.set(this.expanded());
    }

    /** @hidden */
    ngOnInit(): void {
        this._lang$.pipe(takeUntilDestroyed(this._destroyRef)).subscribe((lang: FdLanguage) => {
            this._expandedString.set(
                this._translationResolver.resolve(lang, 'coreNotification.groupAriaDescriptionExpanded')
            );

            this._collapsedString.set(
                this._translationResolver.resolve(lang, 'coreNotification.groupAriaDescriptionCollapsed')
            );

            this._descriptionString.set(
                this._translationResolver.resolve(lang, 'coreNotification.groupAriaDescription')
            );
        });
    }
}
