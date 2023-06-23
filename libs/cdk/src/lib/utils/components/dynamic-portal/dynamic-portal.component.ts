import {
    AfterViewInit,
    Component,
    ComponentRef,
    ElementRef,
    EmbeddedViewRef,
    EventEmitter,
    inject,
    Input,
    Output,
    Renderer2,
    TemplateRef,
    ViewChild,
    ViewContainerRef
} from '@angular/core';
import {
    CdkPortalOutlet,
    ComponentPortal,
    ComponentType,
    DomPortal,
    PortalModule,
    TemplatePortal
} from '@angular/cdk/portal';
import { coerceElement } from '@angular/cdk/coercion';
import { BehaviorSubject, filter, map, takeUntil, tap } from 'rxjs';
import { DestroyedService } from '../../services';

/**
 * A component that can be used to attach a portal to a DOM element, without explicitly creating portal instances on place.
 * This is useful when you have a list of the components or templates, or HTMLElmets, and you want to attach them to the DOM
 * dynamically in a loop.
 */
@Component({
    selector: 'fdk-dynamic-portal',
    standalone: true,
    imports: [PortalModule],
    template: ` <ng-template cdkPortalOutlet></ng-template>`,
    providers: [DestroyedService]
})
export class DynamicPortalComponent implements AfterViewInit {
    /** The DOM element to attach */
    @Input()
    set domElement(value: HTMLElement | ElementRef<HTMLElement> | string) {
        this.portalContent$.next(value);
    }

    /** The component to attach */
    @Input()
    set component(value: ComponentType<any>) {
        this.portalContent$.next(value);
    }

    /** The template to attach */
    @Input()
    set template(value: TemplateRef<any>) {
        this.portalContent$.next(value);
    }

    /** The Content which should be attached and can be any of the items */
    @Input()
    set auto(value: DynamicPortalComponent['domElement' | 'component' | 'template']) {
        this.portalContent$.next(value);
    }

    /** Emits when the portal is attached */
    @Output()
    attached = new EventEmitter<ComponentRef<any> | EmbeddedViewRef<any> | Element>();

    /** @hidden */
    @ViewChild(CdkPortalOutlet)
    portalOutlet?: CdkPortalOutlet;

    /** @hidden */
    private portalContent$ = new BehaviorSubject<
        DynamicPortalComponent['domElement' | 'component' | 'template'] | undefined
    >(undefined);

    /** @hidden */
    private destroy$ = inject(DestroyedService);

    /** @hidden */
    private viewContainerRef = inject(ViewContainerRef);

    /** @hidden */
    private renderer = inject(Renderer2);

    /** @hidden */
    private elementRef = inject(ElementRef);

    /** @hidden */
    ngAfterViewInit(): void {
        const portalOutlet = this.portalOutlet as CdkPortalOutlet;
        this.portalContent$
            .pipe(
                tap(() => portalOutlet.detach()),
                filter(Boolean),
                map((content) => {
                    if (typeof content === 'string') {
                        const textElement = this.renderer.createText(content);
                        this.renderer.appendChild(this.elementRef.nativeElement, textElement);
                        return new DomPortal(textElement);
                    } else if (content instanceof HTMLElement || content instanceof ElementRef) {
                        return new DomPortal(coerceElement(content as HTMLElement | ElementRef<HTMLElement>));
                    } else if (content instanceof TemplateRef) {
                        return new TemplatePortal(content, this.viewContainerRef);
                    }
                    return new ComponentPortal(content);
                }),
                filter(Boolean),
                takeUntil(this.destroy$)
            )
            .subscribe((portal) => {
                const ref = portalOutlet.attach(portal);
                if (portal instanceof DomPortal) {
                    // DomPortal Attachment does not refer return Ref, like other portals
                    this.attached.emit(portal.element);
                } else {
                    this.attached.emit(ref);
                }
            });
    }
}
