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
    TemplateRef,
    Type,
    ViewChild,
    ViewRef,
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
    imports: [PortalModule],
    host: {
        style: 'opacity: 0; position: relative; z-index: 999'
    }
})
export class MessageBoxContainerComponent
    extends DynamicComponentContainer<MessageBoxContentType>
    implements DialogContainer<any>, AfterViewInit, CssClassBuilder
{
    /** Custom classes */
    @Input()
    set class(userClass: string) {
        this._class = userClass;
        this.buildComponentCssClass();
    }

    /** @hidden */
    @ViewChild(CdkPortalOutlet)
    portalOutlet: CdkPortalOutlet;

    /** @hidden */
    private _class = '';

    /** @hidden Tracks the current animation phase for lifecycle management. */
    private _animationStateSignal = signal('void');

    /** @hidden Reference to the current Web Animation for cleanup. */
    private _currentAnimation: Animation | null = null;

    /** @hidden */
    constructor(
        public messageBoxConfig: MessageBoxConfig,
        public ref: MessageBoxRef,
        private _destroyRef: DestroyRef,
        elementRef: ElementRef,
        private readonly _cdr: ChangeDetectorRef,
        injector: Injector
    ) {
        super(elementRef, injector);

        this._destroyRef.onDestroy(() => {
            this._currentAnimation?.cancel();
            this._currentAnimation = null;
        });
    }

    /** @hidden */
    @applyCssClass
    buildComponentCssClass(): string[] {
        return [this.messageBoxConfig.containerClass ? this.messageBoxConfig.containerClass : '', this._class];
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
        if ((this._cdr as ViewRef).destroyed) {
            return;
        }
        if (this.childContent instanceof Type) {
            this._createFromComponent(this.childContent);
        } else if (this.childContent instanceof TemplateRef) {
            this._createFromTemplate(this.childContent, this._templateContext());
        } else {
            this._createFromDefaultMessageBox(this.childContent ?? null);
        }
        this._enter();
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

    /** @hidden Animate the message box container entrance (opacity 0 → 1). */
    private _enter(): void {
        const el: HTMLElement = this.elementRef.nativeElement;

        if (typeof el.animate !== 'function') {
            el.style.opacity = '1';
            this._animationStateSignal.set('visible');
            return;
        }

        this._currentAnimation = el.animate([{ opacity: 0 }, { opacity: 1 }], {
            duration: 150,
            easing: 'cubic-bezier(0, 0, 0.2, 1)',
            fill: 'forwards'
        });

        this._currentAnimation.finished
            .then(() => {
                el.style.opacity = '1';
                this._currentAnimation?.cancel();
                this._currentAnimation = null;
                this._animationStateSignal.set('visible');
            })
            .catch(() => {
                this._currentAnimation = null;
            });
    }

    /** @hidden Animate the message box container exit (opacity 1 → 0). */
    private _exit(): void {
        const el: HTMLElement = this.elementRef.nativeElement;
        this._animationStateSignal.set('hidden');
        this._cdr.detectChanges();

        if (typeof el.animate !== 'function') {
            return;
        }

        this._currentAnimation?.cancel();

        this._currentAnimation = el.animate([{ opacity: 1 }, { opacity: 0 }], {
            duration: 75,
            easing: 'cubic-bezier(0.4, 0, 1, 1)',
            fill: 'forwards'
        });

        this._currentAnimation.finished
            .then(() => {
                this._currentAnimation = null;
            })
            .catch(() => {
                this._currentAnimation = null;
            });
    }

    /**
     * @hidden
     * Listen for message box close/dismiss and trigger exit animation.
     */
    private _listenOnClose(): void {
        this.ref.afterClosed.pipe(takeUntilDestroyed(this._destroyRef)).subscribe({
            next: () => this._exit(),
            error: () => this._exit()
        });
    }
}
