import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ComponentFactoryResolver,
    ComponentRef,
    ElementRef,
    EmbeddedViewRef,
    Inject,
    Input,
    TemplateRef,
    Type,
    ViewChild,
    ViewContainerRef
} from '@angular/core';
import { DIALOG_REF, DialogRef } from '../dialog-utils/dialog-ref.class';
import { DIALOG_CONFIG, DialogConfig } from '../dialog-utils/dialog-config.class';
import { applyCssClass } from '../../utils/decorators/apply-css-class.decorator';
import { CssClassBuilder } from '../../utils/interfaces/css-class-builder.interface';

@Component({
    selector: 'fd-dialog-container',
    template: '<ng-container #contentContainer></ng-container>'
})
export class DialogContainerComponent implements AfterViewInit, CssClassBuilder {

    /** Custom classes */
    @Input()
    set class(userClass: string) {
        this._class = userClass;
        this.buildComponentCssClass();
    }

    /** @hidden */
    @ViewChild('contentContainer', {read: ViewContainerRef}) containerRef: ViewContainerRef;

    /** @hidden Content that should be placed inside container */
    childContent: TemplateRef<any> | Type<any> = undefined;

    /** @hidden */
    private _class: string = '';

    /** @hidden */
    private _componentRef: ComponentRef<any> | EmbeddedViewRef<any>;

    /** @hidden */
    constructor(
        @Inject(DIALOG_CONFIG) public dialogConfig: DialogConfig,
        @Inject(DIALOG_REF) private _dialogRef: DialogRef,
        private _elementRef: ElementRef,
        private _changeDetectorRef: ChangeDetectorRef,
        private _componentFactoryResolver: ComponentFactoryResolver) {
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this._loadDialog();
    }

    /** @hidden */
    @applyCssClass
    buildComponentCssClass(): string {
        return [
            this.dialogConfig.containerClass,
            this._class
        ].filter(x => x !== '').join(' ');
    }

    /** @hidden */
    elementRef(): ElementRef {
        return this._elementRef;
    }

    /** @hidden Load received content */
    private _loadDialog(): void {
        if (this.childContent instanceof Type) {
            this._createFromComponent(this.childContent);
        } else if (this.childContent instanceof TemplateRef) {
            this._createFromTemplate(this.childContent);
        }
        this._changeDetectorRef.detectChanges();
    }

    /** @hidden Load received content as component */
    private _createFromComponent(content: Type<any>): void {
        this.containerRef.clear();
        const componentFactory = this._componentFactoryResolver.resolveComponentFactory(content);
        this._componentRef = this.containerRef.createComponent(componentFactory);
    }

    /** @hidden Load received content as embedded view */
    private _createFromTemplate(content: TemplateRef<any>): void {
        this.containerRef.clear();
        const context = {$implicit: this._dialogRef, dialogConfig: this.dialogConfig};
        this._componentRef = this.containerRef.createEmbeddedView(content, context);
    }
}
