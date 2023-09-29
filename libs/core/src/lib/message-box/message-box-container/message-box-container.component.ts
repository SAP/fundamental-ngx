/* eslint-disable @typescript-eslint/member-ordering */
import { AnimationEvent } from '@angular/animations';
import { CdkPortalOutlet, CdkPortalOutletAttachedRef } from '@angular/cdk/portal';
import {
    AfterViewInit,
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
import {
    CssClassBuilder,
    DestroyedService,
    DynamicComponentContainer,
    applyCssClass
} from '@fundamental-ngx/cdk/utils';
import { DialogContainer, dialogFade } from '@fundamental-ngx/core/dialog';
import { takeUntil } from 'rxjs';
import { MessageBoxContentType } from '../message-box-content.type';
import { MessageBoxDefaultComponent } from '../message-box-default/message-box-default.component';
import { MessageBoxConfig } from '../utils/message-box-config.class';
import { MessageBoxContent } from '../utils/message-box-content.class';
import { MessageBoxRef } from '../utils/message-box-ref.class';

/** Message box container where the message box content is embedded. */
@Component({
    selector: 'fd-message-box-container',
    template: '<ng-template (attached)="_attached($event)" cdkPortalOutlet></ng-template>',
    animations: [dialogFade],
    providers: [DestroyedService]
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
        public ref: MessageBoxRef,
        private _destroy$: DestroyedService,
        elementRef: ElementRef,
        changeDetectorRef: ChangeDetectorRef,
        injector: Injector
    ) {
        super(elementRef, injector, changeDetectorRef);
    }

    /** @hidden */
    @applyCssClass
    buildComponentCssClass(): string[] {
        return [this.messageBoxConfig.containerClass ? this.messageBoxConfig.containerClass : '', this._class];
    }

    /** Handle end of animations, updating the state of the Message Toast. */
    @HostListener('@state.done', ['$event'])
    onAnimationEnd(event: AnimationEvent): void {
        const { toState } = event;

        if (toState === 'hidden') {
            this.ref._endClose$.next();
            this.ref._endClose$.complete();
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
        this._animationState = 'visible';
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
            this._animationState = 'hidden';
            this._cdr.detectChanges();
        };
        this.ref.afterClosed.pipe(takeUntil(this._destroy$)).subscribe({
            next: () => callback(),
            error: () => callback()
        });
    }
}
