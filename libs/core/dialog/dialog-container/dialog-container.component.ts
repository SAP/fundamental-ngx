import { AnimationEvent } from '@angular/animations';
import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ComponentRef,
    DestroyRef,
    ElementRef,
    EmbeddedViewRef,
    HostBinding,
    HostListener,
    Injector,
    Input,
    signal,
    TemplateRef,
    Type,
    ViewChild,
    ViewEncapsulation,
    ViewRef
} from '@angular/core';

import { applyCssClass, CssClassBuilder, DynamicComponentContainer, Nullable } from '@fundamental-ngx/cdk/utils';

import { CdkPortalOutlet, CdkPortalOutletAttachedRef, PortalModule } from '@angular/cdk/portal';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DialogDefaultComponent } from '../dialog-default/dialog-default.component';
import { DialogContentType } from '../dialog.types';
import { DialogTemplateDirectiveContext } from '../directives/dialog-template.directive';
import { DialogConfig } from '../utils/dialog-config.class';
import { DialogContainer } from '../utils/dialog-container.model';
import { DialogDefaultContent } from '../utils/dialog-default-content.class';
import { DialogRef } from '../utils/dialog-ref.class';
import { dialogFade } from '../utils/dialog.animations';

/** Dialog container where the dialog content is embedded. */
@Component({
    selector: 'fd-dialog-container',
    template: '<ng-template (attached)="_attached($event)" cdkPortalOutlet></ng-template>',
    styleUrl: './dialog-container.component.scss',
    animations: [dialogFade],
    encapsulation: ViewEncapsulation.None,
    imports: [PortalModule]
})
export class DialogContainerComponent
    extends DynamicComponentContainer<DialogContentType>
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

    /** The state of the Dialog animations. */
    @HostBinding('@state')
    private get _animationState(): string {
        return this._animationStateSignal();
    }

    /** @hidden */
    private _class = '';

    /** @hidden */
    private _animationStateSignal = signal('void');

    /** @hidden */
    constructor(
        public dialogConfig: DialogConfig,
        public ref: DialogRef,
        private _destroyRef: DestroyRef,
        elementRef: ElementRef,
        protected readonly _cdr: ChangeDetectorRef,
        injector: Injector
    ) {
        super(elementRef, injector);
    }

    /** @hidden */
    @applyCssClass
    buildComponentCssClass(): string[] {
        return [this.dialogConfig.containerClass ? this.dialogConfig.containerClass : '', this._class];
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
        if ((this._cdr as ViewRef).destroyed) {
            return;
        }
        if (this.childContent instanceof Type) {
            this._createFromComponent(this.childContent);
        } else if (this.childContent instanceof TemplateRef) {
            this._createFromTemplate(this.childContent, this._templateContext());
        } else {
            this._createFromDefaultDialog(this.childContent);
        }
        this._animationStateSignal.set('visible');
    }

    /** @hidden Returns context for embedded template*/
    private _templateContext(): DialogTemplateDirectiveContext {
        return { $implicit: this.ref, dialogConfig: this.dialogConfig };
    }

    /** @hidden Load Dialog component from passed object */
    private _createFromDefaultDialog(config: Nullable<DialogDefaultContent>): void {
        this._createFromComponent(DialogDefaultComponent);
        const instance = (this._componentRef as ComponentRef<DialogDefaultComponent>).instance;
        instance._defaultDialogContent = config;
        instance._defaultDialogConfiguration = this.dialogConfig;
    }

    /**
     * @hidden
     * We need to wait until animation plays, and then send signal to the service to destroy the component.
     */
    private _listenOnClose(): void {
        const callback: () => void = () => {
            this._animationStateSignal.set('hidden');
        };
        this.ref.afterClosed.pipe(takeUntilDestroyed(this._destroyRef)).subscribe({
            next: () => callback(),
            error: () => callback()
        });
    }
}
