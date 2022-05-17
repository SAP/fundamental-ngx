import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ComponentFactoryResolver,
    ElementRef,
    Input,
    TemplateRef,
    Type,
    ViewChild,
    ViewContainerRef
} from '@angular/core';

import { applyCssClass, CssClassBuilder, DynamicComponentContainer } from '@fundamental-ngx/core/utils';

import { DialogRef } from '../utils/dialog-ref.class';
import { DialogConfig } from '../utils/dialog-config.class';
import { DialogDefaultComponent } from '../dialog-default/dialog-default.component';
import { DialogDefaultContent } from '../utils/dialog-default-content.class';
import { DialogContentType } from '../dialog-service/dialog.service';

/** Dialog container where the dialog content is embedded. */
@Component({
    selector: 'fd-dialog-container',
    template: '<ng-container #contentContainer></ng-container>',
    styleUrls: ['./dialog-container.component.scss']
})
export class DialogContainerComponent
    extends DynamicComponentContainer<DialogContentType>
    implements AfterViewInit, CssClassBuilder
{
    /** Custom classes */
    @Input()
    set class(userClass: string) {
        this._class = userClass;
        this.buildComponentCssClass();
    }

    /** @hidden */
    @ViewChild('contentContainer', { read: ViewContainerRef })
    containerRef: ViewContainerRef;

    /** @hidden */
    private _class = '';

    /** @hidden */
    constructor(
        public dialogConfig: DialogConfig,
        private _dialogRef: DialogRef,
        elementRef: ElementRef,
        componentFactoryResolver: ComponentFactoryResolver,
        private _changeDetectorRef: ChangeDetectorRef
    ) {
        super(elementRef, componentFactoryResolver);
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this._loadContent();
    }

    /** @hidden */
    @applyCssClass
    buildComponentCssClass(): string[] {
        return [this.dialogConfig.containerClass ? this.dialogConfig.containerClass : '', this._class];
    }

    /** @hidden */
    elementRef(): ElementRef {
        return this._elementRef;
    }

    /** @hidden Load received content */
    protected _loadContent(): void {
        if (this.childContent instanceof Type) {
            this._createFromComponent(this.childContent);
        } else if (this.childContent instanceof TemplateRef) {
            this._createFromTemplate(this.childContent, this._templateContext());
        } else {
            this._createFromDefaultDialog(this.childContent);
        }
        this._changeDetectorRef.detectChanges();
    }

    /** @hidden Returns context for embedded template*/
    private _templateContext(): { $implicit: DialogRef; dialogConfig: DialogConfig } {
        return { $implicit: this._dialogRef, dialogConfig: this.dialogConfig };
    }

    /** @hidden Load Dialog component from passed object */
    private _createFromDefaultDialog(config?: DialogDefaultContent): void {
        this.containerRef.clear();
        const componentFactory = this._componentFactoryResolver.resolveComponentFactory(DialogDefaultComponent);
        this._componentRef = this.containerRef.createComponent(componentFactory);
        this._componentRef.instance._defaultDialogContent = config;
        this._componentRef.instance._defaultDialogConfiguration = this.dialogConfig;
    }
}
