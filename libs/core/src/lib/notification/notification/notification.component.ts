import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ComponentFactoryResolver,
    ComponentRef,
    ElementRef,
    EmbeddedViewRef,
    HostListener,
    HostBinding,
    Input,
    Optional,
    OnInit,
    OnDestroy,
    TemplateRef,
    Type,
    ViewChild,
    ViewContainerRef,
    ViewEncapsulation
} from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { NotificationRef } from '../notification-utils/notification-ref';
import { AbstractFdNgxClass, RtlService, KeyUtil } from '@fundamental-ngx/cdk/utils';
import { NotificationConfig } from '../notification-utils/notification-config';
import { Nullable } from '@fundamental-ngx/cdk/utils';
import { PopoverComponent } from '@fundamental-ngx/core/popover';
import { ESCAPE } from '@angular/cdk/keycodes';
import { BehaviorSubject, Subject } from 'rxjs';
import { filter, take, takeUntil } from 'rxjs/operators';
import { FocusTrap, ConfigurableFocusTrapFactory } from '@angular/cdk/a11y';

@Component({
    selector: 'fd-notification',
    template: `
        <ng-content></ng-content>
        <ng-container #vc></ng-container>
    `,
    styleUrls: ['./notification.component.scss'],
    encapsulation: ViewEncapsulation.None,
    host: {
        '[attr.aria-labelledby]': 'ariaLabelledBy',
        '[attr.aria-label]': 'ariaLabel',
        '[attr.dir]': '_dir',
        role: 'alertdialog',
        '[attr.id]': 'id'
    },
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationComponent extends AbstractFdNgxClass implements OnInit, AfterViewInit, OnDestroy {
    /** @hidden */
    @ViewChild('vc', { read: ViewContainerRef })
    containerRef: ViewContainerRef;

    /**
     * @hidden
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

    /** @hidden */
    private readonly _onDestroy$ = new Subject<void>();

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
        private _elRef: ElementRef,
        private _componentFactoryResolver: ComponentFactoryResolver,
        private _cdRef: ChangeDetectorRef,
        private _router: Router,
        private _focusTrapFactory: ConfigurableFocusTrapFactory,
        @Optional() private _notificationConfig: NotificationConfig,
        @Optional() private _notificationRef: NotificationRef,
        @Optional() private _rtlService: RtlService,
        @Optional() private _popover: PopoverComponent
    ) {
        super(_elRef);

        this._setNotificationConfig(this._notificationConfig);
    }

    /** @hidden */
    ngOnInit(): void {
        this._rtlService?.rtl.pipe(takeUntil(this._onDestroy$)).subscribe((isRtl) => {
            this._dir = isRtl ? 'rtl' : 'ltr';
            this._cdRef.markForCheck();
        });

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
        await this._afterViewInit$.pipe(filter(Boolean), take(1), takeUntil(this._onDestroy$)).toPromise();
        if (!this._focusTrap) {
            this._focusTrap = this._focusTrapFactory.create(this._elRef.nativeElement);
        }
        return this._focusTrap.focusFirstTabbableElementWhenReady();
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._onDestroy$.next();
    }

    /** @hidden Listen and close notification on Escape key */
    @HostListener('window:keyup', ['$event'])
    _closeNotificationEsc(event: KeyboardEvent): void {
        if (this.escKeyCloseable && KeyUtil.isKeyCode(event, ESCAPE) && this._notificationRef) {
            this._notificationRef.dismiss('escape');
        }
    }

    /** @hidden Listen on NavigationStart event and dismiss the dialog */
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
