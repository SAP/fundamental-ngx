import { ComponentPortal, PortalModule } from '@angular/cdk/portal';
import { Component, DestroyRef, effect, inject, Injector, input, signal } from '@angular/core';
import { takeUntilDestroyed, toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Nullable } from '@fundamental-ngx/cdk/utils';
import { Observable } from 'rxjs';
import { MessageStripAlertRef } from '../message-strip-alert.ref';
import { MessageStripAlertService } from '../message-strip-alert.service';
import { MessageStripAlertContainerAlertRefs, MessageStripAlertContainerPosition } from '../tokens';

/**
 * The component that represents the footer of the message strip alert container.
 * if user has provided the footer component through service, then this component
 * will render it inside itself.
 * Bear in mind that this component is always created, just sometimes if there is nothing to render
 * it will be empty.
 */
@Component({
    selector: 'fd-message-strip-alert-container-footer',
    template: ` <ng-template [cdkPortalOutlet]="_footerComponentPortal()"></ng-template> `,
    styles: [
        `
            :host {
                display: block;
            }
        `
    ],
    imports: [PortalModule]
})
export class MessageStripAlertContainerFooterComponent {
    /** @hidden */
    readonly alertRefs = input<Nullable<MessageStripAlertRef[]>>([]);

    /**
     * Reference to the user provided component's portal.
     * @hidden
     */
    protected readonly _footerComponentPortal = signal<ComponentPortal<any> | undefined>(undefined);

    /**
     * Position of the overlay in which this component is rendered.
     */
    private readonly _position = inject(MessageStripAlertContainerPosition);

    /** @hidden */
    private readonly _destroyRef = inject(DestroyRef);

    /** @hidden */
    private readonly _messageStripAlertService = inject(MessageStripAlertService);

    /**
     * Observable representation of the alertRefs input for use in injected components.
     */
    private readonly _alertRefs$: Observable<Nullable<MessageStripAlertRef[]>>;

    /**
     * Footer component from service as signal.
     */
    private readonly _footerComponent = toSignal(this._messageStripAlertService.footerComponents$, {
        initialValue: {}
    });

    /** @hidden */
    constructor() {
        // Convert alertRefs signal to observable in injection context
        this._alertRefs$ = toObservable(this.alertRefs).pipe(takeUntilDestroyed(this._destroyRef));

        effect(() => {
            const footerComponent = this._footerComponent()[this._position];

            if (footerComponent) {
                this._footerComponentPortal.set(
                    new ComponentPortal(
                        footerComponent,
                        null,
                        Injector.create({
                            providers: [
                                {
                                    provide: MessageStripAlertContainerAlertRefs,
                                    useValue: this._alertRefs$
                                }
                            ]
                        })
                    )
                );
            } else {
                this._footerComponentPortal.set(undefined);
            }
        });
    }
}
