import { ConfigurableFocusTrapFactory, FocusTrap } from '@angular/cdk/a11y';
import { Direction } from '@angular/cdk/bidi';
import { ESCAPE } from '@angular/cdk/keycodes';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ComponentFactoryResolver,
    ComponentRef,
    DestroyRef,
    EmbeddedViewRef,
    HostListener,
    OnDestroy,
    OnInit,
    TemplateRef,
    Type,
    ViewContainerRef,
    ViewEncapsulation,
    computed,
    contentChild,
    effect,
    inject,
    input,
    signal,
    viewChild
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationStart, Router } from '@angular/router';
import { AbstractFdNgxClass, KeyUtil, Nullable, RtlService } from '@fundamental-ngx/cdk/utils';
import { BehaviorSubject, fromEvent } from 'rxjs';
import { debounceTime, filter, take } from 'rxjs/operators';
import { NotificationParagraphDirective } from '../directives/notification-paragraph.directive';
import { NotificationTitleDirective } from '../directives/notification-title.directive';
import { NotificationFooterComponent } from '../notification-footer/notification-footer.component';
import { NotificationConfig } from '../notification-utils/notification-config';
import { NotificationRef } from '../notification-utils/notification-ref';
import { FD_NOTIFICATION, FD_NOTIFICATION_FOOTER, FD_NOTIFICATION_PARAGRAPH, FD_NOTIFICATION_TITLE } from '../token';

@Component({
    selector: 'fd-notification',
    template: `
        <ng-content></ng-content>
        <ng-container #vc></ng-container>
    `,
    styleUrl: './notification.component.scss',
    encapsulation: ViewEncapsulation.None,
    host: {
        '[attr.aria-labelledby]': 'ariaLabelledBy()',
        '[attr.aria-label]': 'ariaLabel',
        '[attr.aria-level]': 'ariaLevel()',
        '[attr.role]': 'role()',
        '[attr.dir]': '_dir$()',
        '[attr.id]': 'id',
        '[tabindex]': '0',
        '[style.width]': 'width'
    },
    providers: [
        {
            provide: FD_NOTIFICATION,
            useExisting: NotificationComponent
        }
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})
export class NotificationComponent extends AbstractFdNgxClass implements OnInit, AfterViewInit, OnDestroy {
    /** @hidden */
    containerRef = viewChild('vc', { read: ViewContainerRef });

    /** User defined width for the notification */
    width = input<Nullable<string>>();

    /** Whether the notificatioon is in mobile mode */
    mobile = input(false);

    /** @hidden */
    _dir$ = computed<Direction>(() => (this._rtlService?.rtlSignal() ? 'rtl' : 'ltr'));

    /** ID of the notification */
    id: string;

    /**
     * aria-level of the Notificaion
     * should be set to 2 in Notification Group
     * default value is undefined
     */
    ariaLevel = signal<Nullable<number>>(undefined);

    /**
     * role of the Notificaion
     * should be set to 'listitem' in Notification Group
     * default value is undefined
     */
    role = signal<Nullable<string>>(undefined);

    /**
     * whether the Notificaion is selected
     * default is set to false
     */
    selected = input(false);

    /** Whether the notification is dismissed with the ESC key */
    escKeyCloseable = false;

    /** Whether the notification should close with router change */
    closeOnNavigation = true;

    /** aria-labelledby attribute for the notification component element. */
    ariaLabelledBy = signal<Nullable<string>>(null);

    /** aria-label attribute for the notification component element. */
    ariaLabel: Nullable<string>;

    /** aria-describedby attribute for the notification component element. */
    ariaDescribedBy: Nullable<string>;

    /** Reference to the child content */
    childContent: TemplateRef<any> | Type<any> | undefined = undefined;

    /** Reference to the component or the embedded view */
    public componentRef: ComponentRef<any> | EmbeddedViewRef<any> | undefined;

    /** @hidden */
    private _notificationTitle = contentChild<NotificationTitleDirective>(FD_NOTIFICATION_TITLE);

    /** @hidden */
    private _notificationParagraph = contentChild<NotificationParagraphDirective>(FD_NOTIFICATION_PARAGRAPH);

    /** @hidden */
    private _notificationFooter = contentChild<NotificationFooterComponent>(FD_NOTIFICATION_FOOTER);

    /** @hidden */
    private readonly _destroyRef = inject(DestroyRef);

    /** @hidden */
    private readonly _afterViewInit$ = new BehaviorSubject(false);

    /** @hidden The class that traps and manages focus within the notification. */
    private _focusTrap: FocusTrap;

    /** @hidden */
    private _cdRef = inject(ChangeDetectorRef);

    /** @hidden */
    private _componentFactoryResolver = inject(ComponentFactoryResolver);

    /** @hidden */
    private _router = inject(Router);

    /** @hidden */
    private _focusTrapFactory = inject(ConfigurableFocusTrapFactory);

    /** @hidden */
    private _notificationConfig = inject(NotificationConfig, { optional: true });

    /** @hidden */
    private _notificationRef = inject(NotificationRef, { optional: true });

    /** @hidden */
    private _rtlService = inject(RtlService, { optional: true });

    /** @hidden */
    private _isTitleTruncated = signal(false);

    /** @hidden */
    private _isParagraphTruncated = signal(false);

    /** @hidden */
    private _hasTruncation = computed(() => this._isTitleTruncated() || this._isParagraphTruncated());

    /** @hidden */
    private _expanded = computed(() => this._notificationFooter()?.expanded() ?? false);

    /** @hidden */
    private _observer: ResizeObserver;

    /** @hidden */
    constructor() {
        super();
        if (this._notificationConfig) {
            this._setNotificationConfig(this._notificationConfig);
        }

        effect(() => {
            this._updateExpandedClass();
        });
    }

    /** @hidden Listen and close notification on Escape key */
    @HostListener('window:keyup', ['$event'])
    _closeNotificationEsc(event: KeyboardEvent): void {
        if (this.escKeyCloseable && KeyUtil.isKeyCode(event, ESCAPE) && this._notificationRef) {
            this._notificationRef.dismiss('escape');
        }
    }

    /** @hidden */
    ngOnInit(): void {
        this._listenAndCloseOnNavigation();
        this._setProperties();
        this._attachResizeListener();
    }

    /** @hidden */
    ngAfterViewInit(): void {
        if (this.childContent) {
            if (this.childContent instanceof Type) {
                this._loadFromComponent(this.childContent);
            }

            if (this.childContent instanceof TemplateRef) {
                this._loadFromTemplate(this.childContent);
            }
        }

        if (this._notificationTitle()) {
            this.ariaLabelledBy.set(this._notificationTitle()?.id());
        } else if (this._notificationParagraph()) {
            this.ariaLabelledBy.set(this._notificationParagraph()?.id());
        }

        this._checkTruncation();
        this._observeNotificationResize();
        this._afterViewInit$.next(true);
        this._cdRef.detectChanges();
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._observer?.disconnect();
    }

    /**
     * Moves the focus inside the focus trap.
     * @returns
     * Returns a promise that resolves with a boolean, depending on whether focus was moved successfully.
     */
    async trapFocus(): Promise<boolean> {
        // waiting for afterViewInit hook to fire
        await this._afterViewInit$.pipe(filter(Boolean), take(1), takeUntilDestroyed(this._destroyRef)).toPromise();
        if (!this._focusTrap) {
            this._focusTrap = this._focusTrapFactory.create(this.elementRef.nativeElement);
        }
        return this._focusTrap.focusFirstTabbableElementWhenReady();
    }

    /** @hidden */
    _setProperties(): void {
        this._addClassToElement('fd-notification');
    }

    /** @hidden */
    private _observeNotificationResize(): void {
        const el = this.elementRef.nativeElement;

        if (typeof ResizeObserver !== 'undefined') {
            this._observer = new ResizeObserver(() => {
                this._checkTruncation();
                this._cdRef.markForCheck();
            });
            this._observer.observe(el);
        }
    }

    /** @hidden */
    private _updateExpandedClass(): void {
        const isExpanded = this._expanded();

        [this._notificationTitle(), this._notificationParagraph()].forEach((ref) => {
            ref?.elementRef.nativeElement.classList.toggle('is-expanded', isExpanded);
        });
    }

    /** @hidden */
    private _checkTruncation(): void {
        const titleEl = this._notificationTitle()?.elementRef.nativeElement;
        const paragraphEl = this._notificationParagraph()?.elementRef.nativeElement;
        const footer = this._notificationFooter();

        if (titleEl) {
            this._isTitleTruncated.set(titleEl.scrollHeight > titleEl.clientHeight);
        }

        if (paragraphEl) {
            this._isParagraphTruncated.set(paragraphEl.scrollHeight > paragraphEl.clientHeight);
        }

        if (footer) {
            footer.showTrigger.set(this._hasTruncation() || this._expanded());
        }

        this._updateExpandedClass();
    }

    /** @hidden */
    private _attachResizeListener(): void {
        fromEvent(window, 'resize', { passive: true })
            .pipe(debounceTime(100), takeUntilDestroyed(this._destroyRef))
            .subscribe(() => this._onWindowResize());
    }

    /** @hidden */
    private _onWindowResize(): void {
        this._checkTruncation();
        this._cdRef.markForCheck();
    }

    /** @hidden Listen on NavigationStart event and dismiss the dialog */
    private _listenAndCloseOnNavigation(): void {
        if (this._router && this._notificationRef) {
            this._router.events
                .pipe(
                    filter(
                        (event) => event instanceof NavigationStart && !!this._notificationConfig?.closeOnNavigation
                    ),
                    takeUntilDestroyed(this._destroyRef)
                )
                .subscribe(() => this._notificationRef?.dismiss());
        }
    }

    /** @hidden */
    private _loadFromComponent(content: Type<any>): void {
        this.containerRef()?.clear();
        const componentFactory = this._componentFactoryResolver.resolveComponentFactory(content);
        this.componentRef = this.containerRef()?.createComponent(componentFactory);
    }

    /** @hidden */
    private _loadFromTemplate(content: TemplateRef<any>): void {
        this.containerRef()?.clear();
        const context = {
            $implicit: this._notificationRef
        };
        this.componentRef = this.containerRef()?.createEmbeddedView(content, context);
    }

    /** @hidden */
    private _setNotificationConfig(notificationConfig: NotificationConfig): void {
        Object.keys(notificationConfig || {})
            .filter((key) => key !== 'data' && key !== 'container')
            .forEach((key) => (this[key] = notificationConfig[key]));
    }
}
