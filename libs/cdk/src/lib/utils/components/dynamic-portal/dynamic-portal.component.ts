import {
    Component,
    ElementRef,
    inject,
    Input,
    OnChanges,
    SimpleChanges,
    TemplateRef,
    ViewContainerRef
} from '@angular/core';
import { ComponentPortal, ComponentType, DomPortal, Portal, PortalModule, TemplatePortal } from '@angular/cdk/portal';
import { coerceElement } from '@angular/cdk/coercion';

/**
 * A component that can be used to attach a portal to a DOM element, without explicitly creating portal instances on place.
 * This is useful when you have a list of the components or templates, or HTMLElmets, and you want to attach them to the DOM
 * dynamically in a loop.
 */
@Component({
    selector: 'fdk-dynamic-portal',
    standalone: true,
    imports: [PortalModule],
    template: ` <ng-template [cdkPortalOutlet]="portal"></ng-template>`
})
export class DynamicPortalComponent implements OnChanges {
    /** The DOM element to attach */
    @Input() domElement: HTMLElement | ElementRef<HTMLElement>;

    /** The component to attach */
    @Input()
    component: ComponentType<any>;

    /** The template to attach */
    @Input()
    template: TemplateRef<any>;

    /** Portal associated with the Portal outlet. */
    portal?: Portal<any>;

    /** @hidden */
    private viewContainerRef = inject(ViewContainerRef);

    /** @hidden */
    ngOnChanges(changes: SimpleChanges): void {
        this.portal?.detach();
        if (changes['domElement']) {
            this.portal = new DomPortal(coerceElement(this.domElement));
        } else if (changes['component']) {
            this.portal = new ComponentPortal(this.component);
        } else if (changes['template']) {
            this.portal = new TemplatePortal(this.template, this.viewContainerRef);
        }
    }
}
