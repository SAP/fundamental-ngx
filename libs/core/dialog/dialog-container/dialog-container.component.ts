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
    styleUrls: ['./dialog-container.component.scss', './dialog-container-animations.scss'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [PortalModule],
    host: {
        '[class]': '_containerClasses'
    }
})
export class DialogContainerComponent
    extends DynamicComponentContainer<DialogContentType>
    implements DialogContainer<any>, AfterViewInit, CssClassBuilder, OnDestroy
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
    private _animationStateSignal = signal<'void' | 'visible' | 'hidden'>('void');

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
        if (this.dialogConfig.containerClass) {
            classes.push(this.dialogConfig.containerClass);
        }
        if (this._class) {
            classes.push(this._class);
        }

        return classes.join(' ');
    }

    /** @hidden */
    private _class = '';

    /** @hidden */
    private _animationEndListener?: (event: AnimationEvent) => void;

    /** @hidden */
    constructor(
        public dialogConfig: DialogConfig,
        public ref: DialogRef,
        private _destroyRef: DestroyRef,
        private _elementRef: ElementRef,
        protected readonly _cdr: ChangeDetectorRef,
        injector: Injector
    ) {
        super(_elementRef, injector);
        this._setupAnimationEndListener();
    }

    /** @hidden */
    @applyCssClass
    buildComponentCssClass(): string[] {
        return [this.dialogConfig.containerClass ? this.dialogConfig.containerClass : '', this._class];
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
