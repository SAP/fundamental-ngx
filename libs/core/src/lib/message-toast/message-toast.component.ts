import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ComponentFactoryResolver,
    ComponentRef,
    ElementRef,
    EmbeddedViewRef,
    EventEmitter,
    HostBinding,
    HostListener,
    Input,
    NgZone,
    OnInit,
    Optional,
    Output,
    TemplateRef,
    Type,
    ViewChild,
    ViewContainerRef,
    ViewEncapsulation
} from '@angular/core';

import { Nullable } from '@fundamental-ngx/cdk/utils';
import { MessageToastConfig } from './message-toast-utils/message-toast-config';
import { MessageToastRef } from './message-toast-utils/message-toast-ref';

let messageToastUniqueId = 0;

/**
 * The component that represents a message toast.
 */
@Component({
    selector: 'fd-message-toast',
    template: `<ng-container #container>{{ message }}</ng-container>`,
    styleUrls: ['./message-toast.component.scss'],
    host: {
        '[attr.aria-label]': 'ariaLabel',
        '[attr.aria-live]': '"polite"',
        '[attr.id]': 'id',
        '[style.width]': 'width',
        '[style.min-width]': 'minWidth',
        '[style.max-width]': 'maxWidth'
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageToastComponent implements OnInit, AfterViewInit {
    /** @hidden */
    constructor(
        private _elRef: ElementRef,
        private cdRef: ChangeDetectorRef,
        private componentFactoryResolver: ComponentFactoryResolver,
        private ngZone: NgZone,
        @Optional() private messageToastConfig: MessageToastConfig,
        @Optional() private messageToastRef: MessageToastRef
    ) {
        this._setMessageToastConfig(messageToastConfig);
    }

    /** @hidden */
    @ViewChild('container', { read: ViewContainerRef })
    containerRef: ViewContainerRef;

    /** Id of the message toast. If omitted, a unique one is generated. */
    @Input()
    id: string = 'fd-message-toast-' + messageToastUniqueId++;

    /**
     * Duration of time *in milliseconds* that the message toast will be visible.
     * The standard value is 3000 ms.
     * The duration can be set to more than 3000 ms,
     * but it's not recommended to set it to less than 3000 ms.
     * Set to -1 for indefinite.
     */
    @Input()
    duration = 3000;

    /** Whether the message toast should stay open if the cursor is over it. */
    @Input()
    mousePersist = false;

    /** Aria label for the message toast component element. */
    @Input()
    ariaLabel: Nullable<string>;

    /** Alternative way of passing in a message to the message toast. */
    @Input()
    message: string;

    /** Width of the message toast. */
    @Input()
    width: string;

    /** Minimum width of the message toast. */
    @Input()
    minWidth: string;

    /**
     * Maximum width of the message toast.
     * The standard maximum width is 15rem.
     * It's not recommended to extend the width to more than 35rem.
     */
    @Input()
    maxWidth: string;

    /** Event fired when the message toast is timeout. */
    @Output()
    // eslint-disable-next-line @angular-eslint/no-output-on-prefix
    onHide: EventEmitter<undefined> = new EventEmitter<undefined>();

    /** @hidden */
    mouseOverMessageToast = false;

    /** @hidden */
    componentRef: ComponentRef<any> | EmbeddedViewRef<any>;

    /** @hidden */
    childContent: Type<any> | TemplateRef<any> | string | undefined = undefined;

    /** @hidden */
    @HostBinding('class.fd-message-toast')
    messageToastClass = true;

    /** @hidden */
    ngOnInit(): void {
        if (this.messageToastRef) {
            this.open();
        }
    }

    /** @hidden */
    ngAfterViewInit(): void {
        if (this.childContent) {
            if (this.childContent instanceof Type) {
                this._loadFromComponent(this.childContent);
            } else if (this.childContent instanceof TemplateRef) {
                this._loadFromTemplate(this.childContent);
            } else {
                this._loadFromString(this.childContent);
            }
            this.cdRef.detectChanges();
        }
    }

    /**
     * Closes the message toast
     */
    close(): void {
        if (this.messageToastRef) {
            this.messageToastRef.timeout();
        } else {
            this._elRef.nativeElement.classList.add('fd-has-display-none');
            this._elRef.nativeElement.classList.remove('fd-has-display-block');
        }
        this.onHide.emit();
    }

    /**
     * Opens the message toast.
     */
    open(): void {
        if (!this.messageToastRef) {
            if (this._elRef.nativeElement.style.display === 'block') {
                return;
            }
            this._elRef.nativeElement.classList.remove('fd-has-display-none');
            this._elRef.nativeElement.classList.add('fd-has-display-block');
        }
        if (this.duration >= 0) {
            this.ngZone.runOutsideAngular(() => {
                setTimeout(() => {
                    if (!this.mousePersist) {
                        this.ngZone.run(() => this.close());
                        return;
                    }
                    const wait = (): void => {
                        if (this.mouseOverMessageToast === true) {
                            setTimeout(wait, 500);
                        } else {
                            this.ngZone.run(() => this.close());
                        }
                    };
                    wait();
                }, this.duration);
            });
        }
    }

    /** @hidden */
    @HostListener('mouseenter')
    handleMessageToastMouseEnterEvent(): void {
        this.mouseOverMessageToast = true;
    }

    /** @hidden */
    @HostListener('mouseleave')
    handleMessageToastMouseLeaveEvent(): void {
        this.mouseOverMessageToast = false;
    }

    /** @hidden */
    private _loadFromTemplate(template: TemplateRef<any>): void {
        const context = {
            $implicit: this.messageToastRef
        };
        this.componentRef = this.containerRef.createEmbeddedView(template, context);
    }

    /** @hidden */
    private _loadFromComponent(componentType: Type<any>): void {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentType);
        this.containerRef.clear();
        this.componentRef = this.containerRef.createComponent(componentFactory);
    }

    /** @hidden */
    private _loadFromString(contentString: string): void {
        this.containerRef.clear();
        this.message = contentString;
    }

    /** @hidden */
    private _setMessageToastConfig(messageToastConfig: MessageToastConfig): void {
        Object.keys(messageToastConfig || {})
            .filter((key) => key !== 'data' && key !== 'container')
            .forEach((key) => (this[key] = messageToastConfig[key]));
    }
}
