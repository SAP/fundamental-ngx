import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ComponentFactoryResolver,
    ComponentRef,
    ElementRef,
    EmbeddedViewRef,
    Inject,
    TemplateRef,
    Type,
    ViewChild,
    ViewContainerRef
} from '@angular/core';
import { DIALOG_REF, DialogRef } from './dialog-ref.class';
import { DIALOG_CONFIG, DialogConfig } from './dialog-config.class';

@Component({
    selector: 'fd-dialog-container',
    template: `
        <ng-container #contentContainer></ng-container>
    `
})
export class DialogContainerComponent implements AfterViewInit {

    /** @hidden */
    @ViewChild('contentContainer', {read: ViewContainerRef, static: false}) containerRef: ViewContainerRef;

    /** @hidden */
    childContent: TemplateRef<any> | Type<any> = undefined;

    /** @hidden */
    private _componentRef: ComponentRef<any> | EmbeddedViewRef<any>;

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
    private _loadDialog(): void {
        if (this.childContent instanceof Type) {
            this._createFromComponent(this.childContent);
        } else if (this.childContent instanceof TemplateRef) {
            this._createFromTemplate(this.childContent);
        }
        this._changeDetectorRef.detectChanges();
    }

    /** @hidden */
    private _createFromComponent(content: Type<any>): void {
        this.containerRef.clear();
        const componentFactory = this._componentFactoryResolver.resolveComponentFactory(content);
        this._componentRef = this.containerRef.createComponent(componentFactory);
    }

    /** @hidden */
    private _createFromTemplate(content: TemplateRef<any>): void {
        this.containerRef.clear();
        const context = {$implicit: this._dialogRef, dialogConfig: this.dialogConfig};
        this._componentRef = this.containerRef.createEmbeddedView(content, context);
    }
}
