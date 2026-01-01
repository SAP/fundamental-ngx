import { CdkPortalOutlet, CdkPortalOutletAttachedRef, PortalModule } from '@angular/cdk/portal';
import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ComponentRef,
    DestroyRef,
    ElementRef,
    EmbeddedViewRef,
    Injector,
    Input,
    OnDestroy,
    TemplateRef,
    Type,
    ViewChild,
    signal
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CssClassBuilder, DynamicComponentContainer, applyCssClass } from '@fundamental-ngx/cdk/utils';
import { DialogContainer } from '@fundamental-ngx/core/dialog';
import { MessageBoxContentType } from '../message-box-content.type';
import { MessageBoxDefaultComponent } from '../message-box-default/message-box-default.component';
import { MessageBoxConfig } from '../utils/message-box-config.class';
import { MessageBoxContent } from '../utils/message-box-content.class';
import { MessageBoxRef } from '../utils/message-box-ref.class';

/** Message box container where the message box content is embedded. */
@Component({
    selector: 'fd-message-box-container',
    template: '<ng-template (attached)="_attached($event)" cdkPortalOutlet></ng-template>',
    styleUrl: '../../dialog/dialog-container/dialog-container-animations.scss',
    imports: [PortalModule],
    host: {
        '[class]': '_containerClasses'
    }
})
export class MessageBoxContainerComponent
    extends DynamicComponentContainer<MessageBoxContentType>
    implements DialogContainer<any>, AfterViewInit, CssClassBuilder, OnDestroy
{
    /** Custom classes */
    @Input()
    set class(userClass: string) {
        this._class = userClass;
        this.buildComponentCssClass();
    }

    /** @hidden */
    protected get _containerClasses(): string {
        const state = this._animationStateSignal();
        const classes = ['fd-dialog-container', `fd-dialog-container--${state}`];

        if (state === 'visible') {
            classes.push('fd-dialog-container--entering');
        } else if (state === 'hidden') {
            classes.push('fd-dialog-container--exiting');
        }

        // Add custom container classes
        if (this.messageBoxConfig.containerClass) {
            classes.push(this.messageBoxConfig.containerClass);
        }
        if (this._class) {
            classes.push(this._class);
        }

        return classes.join(' ');
    }

    /** @hidden */
    @ViewChild(CdkPortalOutlet)
    portalOutlet: CdkPortalOutlet;

    /** The state of the Dialog animations. */
    private _animationStateSignal = signal<'void' | 'visible' | 'hidden'>('void');

    /** @hidden */
    private _class = '';

    /** @hidden */
    private _animationEndListener?: (event: AnimationEvent) => void;

    /** @hidden */
    constructor(
        public messageBoxConfig: MessageBoxConfig,
        public ref: MessageBoxRef,
        private _destroyRef: DestroyRef,
        private _elementRef: ElementRef,
        private readonly _cdr: ChangeDetectorRef,
        injector: Injector
    ) {
        super(_elementRef, injector);
        this._setupAnimationEndListener();
    }

    /** @hidden */
    @applyCssClass
    buildComponentCssClass(): string[] {
        return [this.messageBoxConfig.containerClass ? this.messageBoxConfig.containerClass : '', this._class];
    }

    /** @hidden */
    ngOnDestroy(): void {
        if (this._animationEndListener) {
            this._elementRef.nativeElement.removeEventListener('animationend', this._animationEndListener);
        }
    }

    /** @hidden */
    ngAfterViewInit(): void {
        setTimeout(() => {
            this._loadContent();
            this._listenOnClose();
        });
    }

    /** @hidden */
    protected _attached(event: CdkPortalOutletAttachedRef): void {
        if (event instanceof ComponentRef) {
            event.changeDetectorRef.markForCheck();
        } else if (event instanceof EmbeddedViewRef) {
            event.markForCheck();
        }
    }

    /** @hidden Load received content */
    protected _loadContent(): void {
        if (this.childContent instanceof Type) {
            this._createFromComponent(this.childContent);
        } else if (this.childContent instanceof TemplateRef) {
            this._createFromTemplate(this.childContent, this._templateContext());
        } else {
            this._createFromDefaultMessageBox(this.childContent ?? null);
        }
        this._animationStateSignal.set('visible');
        this._cdr.detectChanges();
    }

    /** @hidden Returns context for embedded template*/
    private _templateContext(): { $implicit: MessageBoxRef; messageBoxConfig: MessageBoxConfig } {
        return { $implicit: this.ref, messageBoxConfig: this.messageBoxConfig };
    }

    /** @hidden Load Dialog component from passed object */
    private _createFromDefaultMessageBox(content: MessageBoxContent | null): void {
        this._createFromComponent(MessageBoxDefaultComponent);
        const instance = (this._componentRef as ComponentRef<MessageBoxDefaultComponent>).instance;
        instance._messageBoxContent = content;
    }

    /**
     * @hidden
     * We need to wait until animation plays, and then send signal to the service to destroy the component.
     */
    private _listenOnClose(): void {
        const callback: () => void = () => {
            this._animationStateSignal.set('hidden');
            this._cdr.detectChanges();
        };
        this.ref.afterClosed.pipe(takeUntilDestroyed(this._destroyRef)).subscribe({
            next: () => callback(),
            error: () => callback()
        });
    }

    /**
     * @hidden
     * Set up native animationend event listener
     */
    private _setupAnimationEndListener(): void {
        this._animationEndListener = (event: AnimationEvent) => {
            // Only handle our own animations, not child animations
            if (event.target !== this._elementRef.nativeElement) {
                return;
            }

            const state = this._animationStateSignal();

            if (state === 'hidden') {
                this.ref._endClose$.next();
                this.ref._endClose$.complete();
            }
        };

        this._elementRef.nativeElement.addEventListener('animationend', this._animationEndListener);
    }
}
