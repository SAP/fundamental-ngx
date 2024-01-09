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
    HostBinding,
    HostListener,
    Inject,
    Input,
    OnInit,
    Optional,
    TemplateRef,
    Type,
    ViewChild,
    ViewContainerRef,
    ViewEncapsulation,
    computed,
    inject
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationStart, Router } from '@angular/router';
import { AbstractFdNgxClass, KeyUtil, Nullable, RtlService } from '@fundamental-ngx/cdk/utils';
import { FD_POPOVER_COMPONENT, PopoverComponent } from '@fundamental-ngx/core/popover';
import { BehaviorSubject } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { NotificationConfig } from '../notification-utils/notification-config';
import { NotificationRef } from '../notification-utils/notification-ref';

@Component({
    selector: 'fd-notification',
    template: `
        <ng-content></ng-content>
        <ng-container #vc></ng-container>
    `,
    styleUrl: './notification.component.scss',
    encapsulation: ViewEncapsulation.None,
    host: {
        '[attr.aria-labelledby]': 'ariaLabelledBy',
        '[attr.aria-label]': 'ariaLabel',
        '[attr.dir]': '_dir$()',
        role: 'alertdialog',
        '[attr.id]': 'id'
    },
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})
export class NotificationComponent extends AbstractFdNgxClass implements OnInit, AfterViewInit {
    /** @hidden */
    @ViewChild('vc', { read: ViewContainerRef })
    containerRef: ViewContainerRef;

    /** User defined width for the notification */
    @HostBinding('style.width')
    @Input()
    width: string;

    /** Whether the notificatioon is in mobile mode */
    @Input() mobile: boolean;

    /**
     * @hidden
     */
    _dir$ = computed<Direction>(() => (this._rtlService?.rtlSignal() ? 'rtl' : 'ltr'));

    /** ID of the notification */
    id: string;

    /** Whether the notification is dismissed with the ESC key */
    escKeyCloseable = false;

    /** Whether the notification should close with router change */
    closeOnNavigation = true;

    /** aria-labelledby attribute for the notification component element. */
    ariaLabelledBy: Nullable<string>;

    /** aria-label attribute for the notification component element. */
    ariaLabel: Nullable<string>;

    /** aria-describedby attribute for the notification component element. */
    ariaDescribedBy: Nullable<string>;

    /** Reference to the child content */
    childContent: TemplateRef<any> | Type<any> | undefined = undefined;

    /** Reference to the component or the embedded view */
    public componentRef: ComponentRef<any> | EmbeddedViewRef<any>;

    /** @hidden */
    private readonly _destroyRef = inject(DestroyRef);

    /** @hidden */
    private readonly _afterViewInit$ = new BehaviorSubject(false);

    /** @hidden The class that traps and manages focus within the notification. */
    private _focusTrap: FocusTrap;

    /** @hidden */
    @HostBinding('class.fd-notification--in-dialog')
    get _inDialog(): boolean {
        return this._popover?.mobile;
    }

    /** @hidden */
    constructor(
        private _componentFactoryResolver: ComponentFactoryResolver,
        private _cdRef: ChangeDetectorRef,
        private _router: Router,
        private _focusTrapFactory: ConfigurableFocusTrapFactory,
        @Optional() private _notificationConfig: NotificationConfig,
        @Optional() private _notificationRef: NotificationRef,
        @Optional() private _rtlService: RtlService,
        @Optional() @Inject(FD_POPOVER_COMPONENT) private _popover: PopoverComponent
    ) {
        super();

        this._setNotificationConfig(this._notificationConfig);
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
        this._afterViewInit$.next(true);
        this._cdRef.detectChanges();
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

    /** @hidden Listen on NavigationStart event and dismiss the dialog */
    private _listenAndCloseOnNavigation(): void {
        if (this._router && this._notificationRef) {
            this._router.events
                .pipe(
                    filter((event) => event instanceof NavigationStart && this.closeOnNavigation),
                    takeUntilDestroyed(this._destroyRef)
                )
                .subscribe(() => this._notificationRef.dismiss());
        }
    }

    /** @hidden */
    private _loadFromComponent(content: Type<any>): void {
        this.containerRef.clear();
        const componentFactory = this._componentFactoryResolver.resolveComponentFactory(content);
        this.componentRef = this.containerRef.createComponent(componentFactory);
    }

    /** @hidden */
    private _loadFromTemplate(content: TemplateRef<any>): void {
        this.containerRef.clear();
        const context = {
            $implicit: this._notificationRef
        };
        this.componentRef = this.containerRef.createEmbeddedView(content, context);
    }

    /** @hidden */
    _setProperties(): void {
        this._addClassToElement('fd-notification');
        this._addClassToElement('fd-notification-custom-block');
        if (this.mobile) {
            this._addClassToElement('fd-notification--mobile');
        }
    }

    /** @hidden */
    private _setNotificationConfig(notificationConfig: NotificationConfig): void {
        Object.keys(notificationConfig || {})
            .filter((key) => key !== 'data' && key !== 'container')
            .forEach((key) => (this[key] = notificationConfig[key]));
    }
}
