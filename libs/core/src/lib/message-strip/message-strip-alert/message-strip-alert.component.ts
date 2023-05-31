import {
    Component,
    ElementRef,
    inject,
    InjectionToken,
    Renderer2,
    TemplateRef,
    Type,
    ViewChild,
    ViewContainerRef
} from '@angular/core';
import { MessageStripConfiguration } from '../message-strip-configuration-type';
import { ComponentPortal, DomPortal, Portal, TemplatePortal, PortalModule } from '@angular/cdk/portal';
import { MessageStripComponent } from '../message-strip.component';

export const MessageStripAlertComponentData = new InjectionToken<{
    content: string | TemplateRef<any> | Type<any>;
    messageStripConfig: MessageStripConfiguration;
}>('MessageStripAlertComponentData');

@Component({
    templateUrl: `./message-strip-alert.component.html`,
    standalone: true,
    imports: [MessageStripComponent, PortalModule]
})
export class MessageStripAlertComponent {
    /** @hidden */
    data = inject(MessageStripAlertComponentData);
    /** Configuration for the message strip appearance */
    messageStripConfig: MessageStripConfiguration;
    /** @hidden */
    contentPortal?: Portal<any>;

    /** @hidden */
    @ViewChild(TemplateRef) templateRef: TemplateRef<any>;

    /** @hidden */
    private elementRef = inject(ElementRef);
    /** @hidden */
    private viewContainerRef = inject(ViewContainerRef);
    /** @hidden */
    private renderer2 = inject(Renderer2);

    /** @hidden */
    private autoDismissTimeout: ReturnType<typeof setTimeout>;

    /** @hidden */
    constructor() {
        this.messageStripConfig = this.data.messageStripConfig;
        this.contentPortal = this.getPortal(this.data.content);
        if (this.messageStripConfig.duration) {
            this.autoDismissTimeout = setTimeout(() => {
                this.onDismissHandler();
            }, this.messageStripConfig.duration);
            if (this.messageStripConfig.mousePersist) {
                this.renderer2.listen(this.elementRef.nativeElement, 'mouseenter', () => {
                    clearTimeout(this.autoDismissTimeout);
                });
                this.renderer2.listen(this.elementRef.nativeElement, 'mouseleave', () => {
                    this.autoDismissTimeout = setTimeout(() => {
                        this.onDismissHandler();
                    }, this.messageStripConfig.duration);
                });
            }
        }
    }

    /** @hidden */
    onDismissHandler(): void {
        this.messageStripConfig.onDismiss();
    }

    /** @hidden */
    private getPortal(content: string | TemplateRef<any> | Type<any>): Portal<any> {
        if (typeof content === 'string') {
            const textEl = this.renderer2.createText(content);
            this.renderer2.appendChild(this.viewContainerRef.element.nativeElement, textEl);
            return new DomPortal(textEl);
        }
        if (content instanceof TemplateRef) {
            return new TemplatePortal(content, this.viewContainerRef);
        }
        return new ComponentPortal(content);
    }
}
