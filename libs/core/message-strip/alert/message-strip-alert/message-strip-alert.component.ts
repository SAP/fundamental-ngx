import { ComponentPortal, DomPortal, Portal, PortalModule, TemplatePortal } from '@angular/cdk/portal';
import {
    AfterViewInit,
    Component,
    OnDestroy,
    Renderer2,
    TemplateRef,
    Type,
    ViewChild,
    ViewContainerRef,
    inject
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs';
import { AutoDismissMessageStripDirective } from '../../auto-dismiss-message-strip.directive';
import { MessageStripComponent } from '../../message-strip.component';
import { MessageStripAlertRef } from '../message-strip-alert.ref';
import { MessageStripConfiguration } from '../message-strip-configuration-type';
import { MessageStripAlertComponentData } from '../tokens';
import { MessageStripAlert } from './message-strip-alert.interface';

export type MessageStripAlertPortalType<ComponentType> =
    | DomPortal
    | TemplatePortal<{
          $implicit: MessageStripAlertRef;
      }>
    | ComponentPortal<ComponentType>;

/**
 * The wrapper component, which is wrapping the Message Strip and passes
 * configuration to it, also generates the content which will appear in it.
 */
@Component({
    templateUrl: `./message-strip-alert.component.html`,
    imports: [MessageStripComponent, PortalModule, AutoDismissMessageStripDirective]
})
export class MessageStripAlertComponent<ComponentType = unknown>
    implements MessageStripAlert, OnDestroy, AfterViewInit
{
    /** @hidden */
    @ViewChild(AutoDismissMessageStripDirective)
    autoDismissMessageStripDirective: AutoDismissMessageStripDirective;

    /** User provided data. Full of it */
    data = inject(MessageStripAlertComponentData);
    /** Configuration for the message strip appearance */
    messageStripConfig: MessageStripConfiguration;
    /** Portal, which is responsible for correctly rendering user provided content. It can be any type of the portal */
    contentPortal: Portal<unknown>;

    /**
     * Reference to the message strip alert, which is used to close it from the outside, or access the data and/or the component instance
     *  */
    readonly alertRef = inject(MessageStripAlertRef);
    /** @hidden */
    private viewContainerRef = inject(ViewContainerRef);

    /** @hidden */
    private renderer2 = inject(Renderer2);

    /**
     * Timeout, which is responsible for auto-dismissing the message strip.
     * It should be properly cleared on component destroy.
     */
    private autoDismissTimeout: ReturnType<typeof setTimeout>;

    /** @hidden */
    constructor() {
        this.messageStripConfig = this.data.messageStripConfig;
        this.contentPortal = this.getPortal(this.data.content);
        if (this.data.closeOnNavigation) {
            inject(Router, { optional: true })
                ?.events.pipe(
                    filter((event) => event instanceof NavigationStart),
                    takeUntilDestroyed()
                )
                .subscribe(() => this.onDismissHandler());
        }
    }

    /**
     * Handler for the dismiss button click.
     *  */
    onDismissHandler(): void {
        this.messageStripConfig.onDismiss();
    }

    /** @hidden */
    ngOnDestroy(): void {
        clearTimeout(this.autoDismissTimeout);
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this.autoDismissMessageStripDirective.open();
    }

    /**
     * Method, which is responsible for generating the portal, which will be rendered inside the message strip.
     * It can be any type of the portal, depending on the user provided content.
     *  */
    private getPortal(
        content:
            | string
            | TemplateRef<{
                  $implicit: MessageStripAlertRef;
              }>
            | Type<ComponentType>
    ): MessageStripAlertPortalType<ComponentType> {
        if (typeof content === 'string') {
            const textEl = this.renderer2.createText(content);
            this.renderer2.appendChild(this.viewContainerRef.element.nativeElement, textEl);
            return new DomPortal(textEl);
        }
        if (content instanceof TemplateRef) {
            return new TemplatePortal(content, this.viewContainerRef, { $implicit: this.alertRef });
        }
        return new ComponentPortal(content);
    }
}
