import {
    ComponentFactoryResolver,
    ComponentRef,
    ElementRef,
    EmbeddedViewRef,
    TemplateRef,
    Type,
    ViewContainerRef
} from '@angular/core';

export abstract class DynamicComponentContainer<T = TemplateRef<any> | Type<any>> {
    /** @hidden */
    abstract containerRef: ViewContainerRef;

    /** @hidden */
    childContent: T | undefined = undefined;

    /** @hidden */
    protected _componentRef: ComponentRef<any> | EmbeddedViewRef<any>;

    /** @hidden */
    constructor(protected _elementRef: ElementRef, protected _componentFactoryResolver: ComponentFactoryResolver) {}

    /** @hidden Load received content */
    protected abstract _loadContent(): void;

    /** @hidden Load received content as component */
    protected _createFromComponent(content: Type<any>): void {
        this.containerRef.clear();
        const componentFactory = this._componentFactoryResolver.resolveComponentFactory(content);
        this._componentRef = this.containerRef.createComponent(componentFactory);
    }

    /** @hidden Load received content as embedded view */
    protected _createFromTemplate(content: TemplateRef<any>, context: any): void {
        this.containerRef.clear();
        this._componentRef = this.containerRef.createEmbeddedView(content, context);
    }
}
