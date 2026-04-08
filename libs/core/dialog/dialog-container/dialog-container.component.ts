import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ComponentRef,
    DestroyRef,
    ElementRef,
    EmbeddedViewRef,
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

/** Dialog container where the dialog content is embedded. */
@Component({
    selector: 'fd-dialog-container',
    template: '<ng-template (attached)="_attached($event)" cdkPortalOutlet></ng-template>',
    styleUrls: ['./dialog-container.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [PortalModule],
    host: {
        style: 'opacity: 0; position: relative; z-index: 999'
    }
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

    /** @hidden */
    private _class = '';

    /** @hidden Tracks the current animation phase for lifecycle management. */
    private _animationStateSignal = signal('void');

    /** @hidden Reference to the current Web Animation for cleanup. */
    private _currentAnimation: Animation | null = null;

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

        this._destroyRef.onDestroy(() => {
            this._currentAnimation?.cancel();
            this._currentAnimation = null;
        });
    }

    /** @hidden */
    @applyCssClass
    buildComponentCssClass(): string[] {
        return [this.dialogConfig.containerClass ? this.dialogConfig.containerClass : '', this._class];
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
        this._enter();
    }

    /** @hidden Returns context for embedded template */
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

    /** @hidden Animate the dialog container entrance (opacity 0 → 1). */
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

    /** @hidden Animate the dialog container exit (opacity 1 → 0). */
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
     * Listen for dialog close/dismiss and trigger exit animation.
     */
    private _listenOnClose(): void {
        this.ref.afterClosed.pipe(takeUntilDestroyed(this._destroyRef)).subscribe({
            next: () => this._exit(),
            error: () => this._exit()
        });
    }
}
