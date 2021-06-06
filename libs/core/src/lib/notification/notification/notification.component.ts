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
import { AbstractFdNgxClass } from '@fundamental-ngx/core/utils';
import { NotificationConfig } from '../notification-utils/notification-config';
import { KeyUtil } from '@fundamental-ngx/core/utils';
import { ESCAPE } from '@angular/cdk/keycodes';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

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
        role: 'alertdialog',
        '[attr.id]': 'id'
    },
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationComponent extends AbstractFdNgxClass implements OnInit, AfterViewInit, OnDestroy {
    /** @hidden */
    @ViewChild('vc', { read: ViewContainerRef })
    containerRef: ViewContainerRef;

    /** User defined width for the notification */
    @HostBinding('style.width')
    @Input() width:  string;

    /** Whether the notificatioon is in mobile mode */
    @Input() mobile: boolean;

    /** ID of the notification */
    id: string;

    /** Whether the notification is dismissed with the ESC key */
    escKeyCloseable = false;

    /** Whether the notification should close with router change */
    closeOnNavigation = true;

    /** aria-labelledby attribute for the notification component element. */
    ariaLabelledBy: string = null;

    /** aria-label attribute for the notification component element. */
    ariaLabel: string = null;

    /** aria-describedby attribute for the notification component element. */
    ariaDescribedBy: string = null;

    /** Reference to the child content */
    childContent: TemplateRef<any> | Type<any> = undefined;

    /** Reference to the component or the embedded view */
    public componentRef: ComponentRef<any> | EmbeddedViewRef<any>;

    /** @hidden */
    private _subscriptions = new Subscription();

    // @ts-ignore
    constructor(
        private elRef: ElementRef,
        private componentFactoryResolver: ComponentFactoryResolver,
        private cdRef: ChangeDetectorRef,
        private _router: Router,
        @Optional() private notificationConfig: NotificationConfig,
        @Optional() private notificationRef: NotificationRef
    ) {
        super(elRef);
        this._setNotificationConfig(notificationConfig);
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
        this.cdRef.detectChanges();
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
    }

    /** @hidden Listen and close notification on Escape key */
    @HostListener('window:keyup', ['$event'])
    _closeNotificationEsc(event: KeyboardEvent): void {
        if (this.escKeyCloseable && KeyUtil.isKeyCode(event, ESCAPE) && this.notificationRef) {
            this.notificationRef.dismiss('escape');
        }
    }

    /** @hidden Listen on NavigationStart event and dismiss the dialog */
    private _listenAndCloseOnNavigation(): void {
        if (this._router && this.notificationRef) {
            this._subscriptions.add(
                this._router.events.pipe(
                    filter(event => event instanceof NavigationStart && this.closeOnNavigation)
                ).subscribe(() => this.notificationRef.dismiss())
            );
        }
    }

    /** @hidden */
    private _loadFromComponent(content: Type<any>): void {
        this.containerRef.clear();
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(content);
        this.componentRef = this.containerRef.createComponent(componentFactory);
    }

    /** @hidden */
    private _loadFromTemplate(content: TemplateRef<any>): void {
        this.containerRef.clear();
        const context = {
            $implicit: this.notificationRef
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
