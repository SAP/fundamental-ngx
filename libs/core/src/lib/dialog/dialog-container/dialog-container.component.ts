import {
    AfterContentChecked,
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
    ViewChild,
    ViewRef
} from '@angular/core';
import { AnimationEvent } from '@angular/animations';

import {
    applyCssClass,
    CssClassBuilder,
    DestroyedService,
    DynamicComponentContainer,
    Nullable
} from '@fundamental-ngx/cdk/utils';

import { DialogRef } from '../utils/dialog-ref.class';
import { DialogConfig } from '../utils/dialog-config.class';
import { DialogDefaultComponent } from '../dialog-default/dialog-default.component';
import { DialogDefaultContent } from '../utils/dialog-default-content.class';
import { DialogContentType } from '../dialog.types';
import { dialogFade } from '../utils/dialog.animations';
import { CdkPortalOutlet, CdkPortalOutletAttachedRef } from '@angular/cdk/portal';
import { takeUntil } from 'rxjs';

/** Dialog container where the dialog content is embedded. */
@Component({
    selector: 'fd-dialog-container',
    template: '<ng-template (attached)="_attached($event)" cdkPortalOutlet></ng-template>',
    styleUrls: ['./dialog-container.component.scss'],
    animations: [dialogFade],
    providers: [DestroyedService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogContainerComponent
    extends DynamicComponentContainer<DialogContentType>
    implements AfterViewInit, AfterContentChecked, CssClassBuilder
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
    _animationState = 'void';

    /** @hidden */
    private _class = '';

    /** @hidden */
    constructor(
        public dialogConfig: DialogConfig,
        private _dialogRef: DialogRef,
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
    ngAfterContentChecked(): void {
        if (this.portalOutlet) {
            this._cdr.markForCheck();
        }
    }

    /** @hidden */
    @applyCssClass
    buildComponentCssClass(): string[] {
        return [this.dialogConfig.containerClass ? this.dialogConfig.containerClass : '', this._class];
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
        this._animationState = 'visible';
        this._cdr.detectChanges();
    }

    /** @hidden Returns context for embedded template*/
    private _templateContext(): { $implicit: DialogRef; dialogConfig: DialogConfig } {
        return { $implicit: this._dialogRef, dialogConfig: this.dialogConfig };
    }

    /** @hidden Load Dialog component from passed object */
    private _createFromDefaultDialog(config: Nullable<DialogDefaultContent>): void {
        this._createFromComponent(DialogDefaultComponent);
        const instance = (this._componentRef as ComponentRef<DialogDefaultComponent>).instance;
        instance._defaultDialogContent = config;
        instance._defaultDialogConfiguration = this.dialogConfig;
    }

    /** Handle end of animations, updating the state of the Message Toast. */
    @HostListener('@state.done', ['$event'])
    onAnimationEnd(event: AnimationEvent): void {
        const { toState } = event;

        if (toState === 'hidden') {
            this._dialogRef._endClose$.next();
            this._dialogRef._endClose$.complete();
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
        this._dialogRef.afterClosed.pipe(takeUntil(this._destroy$)).subscribe({
            next: () => callback(),
            error: () => callback()
        });
    }
}
