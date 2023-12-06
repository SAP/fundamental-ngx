import { CdkPortalOutlet, ComponentPortal, TemplatePortal } from '@angular/cdk/portal';
import {
    ChangeDetectorRef,
    ComponentRef,
    ElementRef,
    EmbeddedViewRef,
    Injector,
    TemplateRef,
    Type,
    ViewContainerRef
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Nullable } from '../models/nullable';

export abstract class DynamicComponentContainer<T = TemplateRef<any> | Type<any>> {
    /** @hidden */
    abstract portalOutlet: CdkPortalOutlet;

    /** @hidden */
    childContent: Nullable<T> = undefined;

    /** @hidden */
    protected _componentRef: ComponentRef<any> | EmbeddedViewRef<any>;

    /** @hidden */
    protected _contentLoaded$ = new BehaviorSubject<boolean>(false);

    /** @hidden */
    protected constructor(
        public elementRef: ElementRef,
        protected _injector: Injector,
        protected _cdr: ChangeDetectorRef
    ) {}

    /** @hidden Load received content */
    protected abstract _loadContent(): void;

    /** @hidden Load received content as component */
    protected _createFromComponent(content: Type<any>): void {
        this.portalOutlet?.attachedRef?.destroy();
        const injector = Injector.create({
            parent: this._injector,
            providers: []
        });
        this._componentRef = this.portalOutlet.attach(new ComponentPortal(content, null, injector));
    }

    /** @hidden Load received content as embedded view */
    protected _createFromTemplate(content: TemplateRef<any>, context: any): void {
        this.portalOutlet?.attachedRef?.destroy();
        if (this.portalOutlet.hasAttached()) {
            this.portalOutlet.detach();
        }
        this._componentRef = this.portalOutlet.attach(
            new TemplatePortal(content, null as unknown as ViewContainerRef, context)
        );
    }
}
