import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ComponentRef,
    ElementRef,
    EmbeddedViewRef,
    HostBinding,
    HostListener,
    Injector,
    Input,
    TemplateRef,
    Type,
    ViewChild
} from '@angular/core';
import { AnimationEvent } from '@angular/animations';
import { applyCssClass, DestroyedService } from '@fundamental-ngx/cdk/utils';
import { CssClassBuilder } from '@fundamental-ngx/cdk/utils';
import { DynamicComponentContainer } from '@fundamental-ngx/cdk/utils';
import { takeUntil } from 'rxjs';
import { MessageBoxConfig } from '../utils/message-box-config.class';
import { MessageBoxRef } from '../utils/message-box-ref.class';
import { MessageBoxContent } from '../utils/message-box-content.class';
import { MessageBoxDefaultComponent } from '../message-box-default/message-box-default.component';
import { MessageBoxContentType } from '../message-box-content.type';
import { CdkPortalOutlet, CdkPortalOutletAttachedRef } from '@angular/cdk/portal';
import { dialogFade } from '@fundamental-ngx/core/dialog';

/** Message box container where the message box content is embedded. */
@Component({
    selector: 'fd-message-box-container',
    template: '<ng-template (attached)="_attached($event)" cdkPortalOutlet></ng-template>',
    animations: [dialogFade],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [DestroyedService]
})
export class MessageBoxContainerComponent
    extends DynamicComponentContainer<MessageBoxContentType>
    implements AfterViewInit, CssClassBuilder
{
    /** Custom classes */
    @Input()
    set class(userClass: string) {
        this._class = userClass;
        this.buildComponentCssClass();
    }

    /** The state of the Dialog animations. */
    @HostBinding('@state')
    _animationState = 'void';

    /** @hidden */
    @ViewChild(CdkPortalOutlet)
    portalOutlet: CdkPortalOutlet;

    /** @hidden */
    private _class = '';

    /** @hidden */
    constructor(
        public messageBoxConfig: MessageBoxConfig,
        private _messageBoxRef: MessageBoxRef,
        private _destroy$: DestroyedService,
        elementRef: ElementRef,
        changeDetectorRef: ChangeDetectorRef,
        injector: Injector
    ) {
        super(elementRef, injector, changeDetectorRef);
    }

    /** @hidden */
    ngAfterViewInit(): void {
        setTimeout(() => {
            this._loadContent();
            this._listenOnClose();
        });
    }

    /** @hidden */
    @applyCssClass
    buildComponentCssClass(): string[] {
        return [this.messageBoxConfig.containerClass ? this.messageBoxConfig.containerClass : '', this._class];
    }

    /** @hidden */
    elementRef(): ElementRef {
        return this._elementRef;
    }

    /** @hidden */
    protected _attached(event: CdkPortalOutletAttachedRef): void {
        if (event instanceof ComponentRef<any>) {
            event.changeDetectorRef.markForCheck();
        } else if (event instanceof EmbeddedViewRef<any>) {
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
        this._animationState = 'visible';
        this._cdr.detectChanges();
    }

    /** @hidden Returns context for embedded template*/
    private _templateContext(): { $implicit: MessageBoxRef; messageBoxConfig: MessageBoxConfig } {
        return { $implicit: this._messageBoxRef, messageBoxConfig: this.messageBoxConfig };
    }

    /** @hidden Load Dialog component from passed object */
    private _createFromDefaultMessageBox(content: MessageBoxContent | null): void {
        this._createFromComponent(MessageBoxDefaultComponent);
        const instance = (this._componentRef as ComponentRef<MessageBoxDefaultComponent>).instance;
        instance._messageBoxContent = content;
    }

    /** Handle end of animations, updating the state of the Message Toast. */
    @HostListener('@state.done', ['$event'])
    onAnimationEnd(event: AnimationEvent): void {
        const { toState } = event;

        if (toState === 'hidden') {
            this._messageBoxRef._endClose$.next();
            this._messageBoxRef._endClose$.complete();
        }
    }

    /**
     * @hidden
     * We need to wait until animation plays, and then send signal to the service to destroy the component.
     */
    private _listenOnClose(): void {
        const callback: () => void = () => {
            this._animationState = 'hidden';
            this._cdr.detectChanges();
        };
        this._messageBoxRef.afterClosed.pipe(takeUntil(this._destroy$)).subscribe({
            next: () => callback(),
            error: () => callback()
        });
    }
}
