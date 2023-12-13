import { ConfigurableFocusTrapFactory, FocusTrap } from '@angular/cdk/a11y';
import { ESCAPE } from '@angular/cdk/keycodes';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ComponentFactoryResolver,
    ComponentRef,
    ElementRef,
    EmbeddedViewRef,
    HostBinding,
    HostListener,
    Inject,
    Input,
    OnDestroy,
    OnInit,
    Optional,
    TemplateRef,
    Type,
    ViewChild,
    ViewContainerRef,
    ViewEncapsulation
} from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { AbstractFdNgxClass, KeyUtil, Nullable, RtlService } from '@fundamental-ngx/cdk/utils';
import { FD_POPOVER_COMPONENT, PopoverComponent } from '@fundamental-ngx/core/popover';
import { BehaviorSubject, Subject } from 'rxjs';
import { filter, take, takeUntil } from 'rxjs/operators';
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
        '[attr.dir]': '_dir',
        role: 'alertdialog',
        '[attr.id]': 'id'
    },
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})
export class NotificationComponent extends AbstractFdNgxClass implements OnInit, AfterViewInit, OnDestroy {
    /** @ignore */
    @ViewChild('vc', { read: ViewContainerRef })
    containerRef: ViewContainerRef;

    /**
     * @ignore
     */
    _dir: string;

    /** User defined width for the notification */
    @HostBinding('style.width')
    @Input()
    width: string;

    /** Whether the notificatioon is in mobile mode */
    @Input() mobile: boolean;

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

    /** @ignore */
    private readonly _onDestroy$ = new Subject<void>();

    /** @ignore */
    private readonly _afterViewInit$ = new BehaviorSubject(false);

    /** @ignore The class that traps and manages focus within the notification. */
    private _focusTrap: FocusTrap;

    /** @ignore */
    @HostBinding('class.fd-notification--in-dialog')
    get _inDialog(): boolean {
        return this._popover?.mobile;
    }

    /** @ignore */
    constructor(
        private _elRef: ElementRef,
        private _componentFactoryResolver: ComponentFactoryResolver,
        private _cdRef: ChangeDetectorRef,
        private _router: Router,
        private _focusTrapFactory: ConfigurableFocusTrapFactory,
        @Optional() private _notificationConfig: NotificationConfig,
        @Optional() private _notificationRef: NotificationRef,
        @Optional() private _rtlService: RtlService,
        @Optional() @Inject(FD_POPOVER_COMPONENT) private _popover: PopoverComponent
    ) {
        super(_elRef);

        this._setNotificationConfig(this._notificationConfig);
    }

    /** @ignore */
    ngOnInit(): void {
        this._rtlService?.rtl.pipe(takeUntil(this._onDestroy$)).subscribe((isRtl) => {
            this._dir = isRtl ? 'rtl' : 'ltr';
            this._cdRef.markForCheck();
        });

        this._listenAndCloseOnNavigation();
        this._setProperties();
    }

    /** @ignore */
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
        await this._afterViewInit$.pipe(filter(Boolean), take(1), takeUntil(this._onDestroy$)).toPromise();
        if (!this._focusTrap) {
            this._focusTrap = this._focusTrapFactory.create(this._elRef.nativeElement);
        }
        return this._focusTrap.focusFirstTabbableElementWhenReady();
    }

    /** @ignore */
    ngOnDestroy(): void {
        this._onDestroy$.next();
    }

    /** @ignore Listen and close notification on Escape key */
    @HostListener('window:keyup', ['$event'])
    _closeNotificationEsc(event: KeyboardEvent): void {
        if (this.escKeyCloseable && KeyUtil.isKeyCode(event, ESCAPE) && this._notificationRef) {
            this._notificationRef.dismiss('escape');
        }
    }

    /** @ignore Listen on NavigationStart event and dismiss the dialog */
    private _listenAndCloseOnNavigation(): void {
        if (this._router && this._notificationRef) {
            this._router.events
                .pipe(
                    filter((event) => event instanceof NavigationStart && this.closeOnNavigation),
                    takeUntil(this._onDestroy$)
                )
                .subscribe(() => this._notificationRef.dismiss());
        }
    }

    /** @ignore */
    private _loadFromComponent(content: Type<any>): void {
        this.containerRef.clear();
        const componentFactory = this._componentFactoryResolver.resolveComponentFactory(content);
        this.componentRef = this.containerRef.createComponent(componentFactory);
    }

    /** @ignore */
    private _loadFromTemplate(content: TemplateRef<any>): void {
        this.containerRef.clear();
        const context = {
            $implicit: this._notificationRef
        };
        this.componentRef = this.containerRef.createEmbeddedView(content, context);
    }

    /** @ignore */
    _setProperties(): void {
        this._addClassToElement('fd-notification');
        this._addClassToElement('fd-notification-custom-block');
        if (this.mobile) {
            this._addClassToElement('fd-notification--mobile');
        }
    }

    /** @ignore */
    private _setNotificationConfig(notificationConfig: NotificationConfig): void {
        Object.keys(notificationConfig || {})
            .filter((key) => key !== 'data' && key !== 'container')
            .forEach((key) => (this[key] = notificationConfig[key]));
    }
}
