import {
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
    constructor(protected _elementRef: ElementRef) {}

    /** @hidden Load received content */
    protected abstract _loadContent(): void;

    /** @hidden Load received content as component */
    protected _createFromComponent(content: Type<any>): void {
        this.containerRef.clear();
        this._componentRef = this.containerRef.createComponent(content);
    }

    /** @hidden Load received content as embedded view */
    protected _createFromTemplate(content: TemplateRef<any>, context: any): void {
        this.containerRef.clear();
        this._componentRef = this.containerRef.createEmbeddedView(content, context);
    }
}
