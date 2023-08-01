import { AfterViewInit, Component, DestroyRef, inject, Injector, Input } from '@angular/core';
import { MessageStripAlertService } from '../message-strip-alert.service';
import { Nullable } from '@fundamental-ngx/cdk/utils';
import { BehaviorSubject, map, tap } from 'rxjs';
import { ComponentPortal, PortalModule } from '@angular/cdk/portal';
import { MessageStripAlertRef } from '../message-strip-alert.ref';
import { MessageStripAlertContainerAlertRefs, MessageStripAlertContainerPosition } from '../tokens';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

/**
 * The component that represents the footer of the message strip alert container.
 * if user has provided the footer component through service, then this component
 * will render it inside itself.
 * Bear in mind that this component is always created, just sometimes if there is nothing to render
 * it will be empty.
 */
@Component({
    selector: 'fd-message-strip-alert-container-footer',
    template: ` <ng-template [cdkPortalOutlet]="footerComponentPortal"></ng-template> `,
    styles: [
        `
            :host {
                display: block;
            }
        `
    ],
    standalone: true,
    imports: [PortalModule]
})
export class MessageStripAlertContainerFooterComponent implements AfterViewInit {
    /** @hidden */
    @Input()
    set alertRefs(alertRefs: Nullable<MessageStripAlertRef[]>) {
        this.alertRefs$.next(alertRefs);
    }

    /**
     * Reference to the user provided component's portal.
     */
    footerComponentPortal?: ComponentPortal<any>;

    /**
     * Position of the overlay in which this component is rendered.
     */
    private position = inject(MessageStripAlertContainerPosition);

    /** @hidden */
    private _destroyRef = inject(DestroyRef);

    /** @hidden */
    private messageStripAlertService = inject(MessageStripAlertService);

    /**
     * Observable that emits the alert references that are currently rendered in the container.
     */
    private alertRefs$ = new BehaviorSubject<Nullable<MessageStripAlertRef[]>>([]);

    /** @hidden */
    ngAfterViewInit(): void {
        this.messageStripAlertService.footerComponents$
            .pipe(
                map((components) => components[this.position]),
                tap((footerComponent) => {
                    if (footerComponent) {
                        this.footerComponentPortal = new ComponentPortal(
                            footerComponent,
                            null,
                            Injector.create({
                                providers: [
                                    {
                                        provide: MessageStripAlertContainerAlertRefs,
                                        useValue: this.alertRefs$.pipe(takeUntilDestroyed(this._destroyRef))
                                    }
                                ]
                            })
                        );
                    } else {
                        this.footerComponentPortal = undefined;
                    }
                }),
                takeUntilDestroyed(this._destroyRef)
            )
            .subscribe();
    }
}
