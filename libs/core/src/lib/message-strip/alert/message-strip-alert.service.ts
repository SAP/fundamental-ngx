import { ComponentRef, inject, Injectable, Injector, Type } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { BehaviorSubject, combineLatest, map, Subject, tap } from 'rxjs';
import { ResponsiveBreakpoints, ViewportSizeObservable } from '@fundamental-ngx/cdk/utils';
import { MessageStripAlertContainerComponent } from './message-strip-alert-container/message-strip-alert-container.component';
import { MessageStripAlertPosition } from './message-strip-alert.position';
import { OpenMessageStripAlertConfig } from './open-message-strip-alert.config';
import { MessageStripAlertRef } from './message-strip-alert.ref';
import { MessageStripAlertComponentData, MessageStripAlertContainerPosition } from './tokens';
import { applyDefaultConfig } from './default-config';
import { MessageStripAlert } from './message-strip-alert/message-strip-alert.interface';
import { MessageStripAlertComponent } from './message-strip-alert/message-strip-alert.component';
import { FD_LANGUAGE } from '@fundamental-ngx/i18n';

/**
 * Service that is responsible for opening and closing message strip alerts.
 * This should be only created once in entire application.
 * Service is responsible for creating and managing the overlays for the
 * message strip alerts. This also manages the footer components for any
 * given position.
 */
@Injectable({
    providedIn: 'root'
})
export class MessageStripAlertService {
    /** @hidden */
    private injector = inject(Injector);

    /** @hidden */
    private readonly _overlay: Overlay = inject(Overlay);

    /** @hidden */
    private viewportSize$ = inject(ViewportSizeObservable);

    /** @hidden */
    private readonly _messageStripAlertService = inject(MessageStripAlertService, { optional: true, skipSelf: true });

    /** @hidden */
    private _messageAlerts$ = new BehaviorSubject<
        Array<
            Required<OpenMessageStripAlertConfig> & {
                portal: ComponentPortal<MessageStripAlert>;
            }
        >
    >([]);

    /** @hidden */
    private _overlayRefs: Partial<
        Record<
            MessageStripAlertPosition,
            {
                ref: OverlayRef;
                containerRef: ComponentRef<MessageStripAlertContainerComponent>;
            }
        >
    > = {};

    /** @hidden */
    private _messageStripAlertContainerFooters$ = new BehaviorSubject<
        Partial<Record<MessageStripAlertPosition, Type<any>>>
    >({});

    /** @hidden */
    footerComponents$ = this._messageStripAlertContainerFooters$.asObservable();

    /** @hidden */
    constructor() {
        if (this._messageStripAlertService) {
            throw new Error('MessageStripAlertService is already provided');
        }
        this.listenToItemsChanges();
    }

    /**
     * Set the footer component for a given position.
     */
    setFooterComponent(position: MessageStripAlertPosition, component: Type<any>): void {
        this._messageStripAlertContainerFooters$.next({
            ...this._messageStripAlertContainerFooters$.value,
            [position]: component
        });
    }

    /**
     * Open a message strip alert with given configuration
     */
    open<ComponentType = unknown>(c: OpenMessageStripAlertConfig<ComponentType>): MessageStripAlertRef {
        const config = applyDefaultConfig<ComponentType>(c);
        const alertRef = this.getMessageStripAlertRef(config);
        this._messageAlerts$.next([{ ...config, portal: alertRef.portal }, ...this._messageAlerts$.value]);
        return alertRef;
    }

    /** @hidden */
    private getMessageStripAlertRef<ComponentType = unknown>(
        config: Required<OpenMessageStripAlertConfig<ComponentType>>
    ): MessageStripAlertRef {
        const onDismiss$ = new Subject<void>();
        const alertRef = {
            portal: new ComponentPortal(
                MessageStripAlertComponent<ComponentType>,
                null,
                Injector.create({
                    providers: [
                        {
                            provide: MessageStripAlertComponentData,
                            useValue: {
                                content: config.content,
                                messageStripConfig: {
                                    ...config.messageStrip,
                                    onDismiss: () => {
                                        this._messageAlerts$.next(
                                            this._messageAlerts$.value.filter((item) => item.portal !== alertRef.portal)
                                        );
                                        config.messageStrip &&
                                            config.messageStrip.onDismiss &&
                                            config.messageStrip.onDismiss();
                                        onDismiss$.next();
                                    }
                                }
                            }
                        },
                        {
                            provide: MessageStripAlertRef,
                            useFactory: () => alertRef
                        },
                        {
                            provide: FD_LANGUAGE,
                            useValue: this.injector.get(FD_LANGUAGE).pipe(
                                map((lang) => ({
                                    ...lang,
                                    coreMessageStrip: {
                                        ...lang.coreMessageStrip,
                                        dismissLabel:
                                            config.messageStrip.dismissLabel || lang.coreMessageStrip.dismissLabel
                                    }
                                }))
                            )
                        }
                    ],
                    parent: this.injector
                })
            ),
            dismiss: () => {
                this._messageAlerts$.next(this._messageAlerts$.value.filter((item) => item.portal !== alertRef.portal));
                config.messageStrip && config.messageStrip.onDismiss && config.messageStrip.onDismiss();
                onDismiss$.next();
                onDismiss$.complete();
            },
            onDismiss$: onDismiss$.asObservable()
        };
        return alertRef;
    }

    /** @hidden */
    private listenToItemsChanges(): void {
        combineLatest([this.viewportSize$, this._messageAlerts$.asObservable()])
            .pipe(
                map(
                    ([viewportSize, messageAlerts]): Record<
                        MessageStripAlertPosition,
                        Array<ComponentPortal<MessageStripAlert>>
                    > => {
                        if (viewportSize < ResponsiveBreakpoints.M) {
                            return messageAlerts.reduce((acc, next) => {
                                const position = next.position?.startsWith('top') ? 'top-middle' : 'bottom-middle';
                                acc[position] = [...(acc[position] || []), next.portal];
                                return acc;
                            }, {} as Record<MessageStripAlertPosition, Array<ComponentPortal<MessageStripAlert>>>);
                        }
                        return messageAlerts.reduce((acc, next) => {
                            acc[next.position] = [...(acc[next.position] || []), next.portal];
                            return acc;
                        }, {} as Record<MessageStripAlertPosition, Array<ComponentPortal<MessageStripAlert>>>);
                    }
                ),
                tap(
                    (
                        messageAlertsByPosition: Partial<
                            Record<MessageStripAlertPosition, Array<ComponentPortal<MessageStripAlert>>>
                        >
                    ) => {
                        let topSectionIsOpened = false;
                        let bottomSectionIsOpened = false;
                        (
                            Object.entries(messageAlertsByPosition) as Array<
                                [MessageStripAlertPosition, ComponentPortal<MessageStripAlert>[]]
                            >
                        ).forEach(([position, portals]) => {
                            topSectionIsOpened = topSectionIsOpened || position.startsWith('top');
                            bottomSectionIsOpened = bottomSectionIsOpened || position.startsWith('bottom');
                            const { containerRef } = this.getOverlayRef(position);
                            containerRef.instance.attachedElements = portals;
                            containerRef.changeDetectorRef.detectChanges();
                        });
                        this.syncExistingOverlays(messageAlertsByPosition, bottomSectionIsOpened, topSectionIsOpened);
                    }
                )
            )
            .subscribe();
    }

    /** @hidden */
    private syncExistingOverlays(
        messageAlertsByPosition: Partial<Record<MessageStripAlertPosition, ComponentPortal<MessageStripAlert>[]>>,
        bottomSectionIsOpened: boolean,
        topSectionIsOpened: boolean
    ): void {
        (Object.keys(this._overlayRefs) as MessageStripAlertPosition[]).forEach((position) => {
            if (!messageAlertsByPosition[position]) {
                this._overlayRefs[position]!.ref.dispose();
                delete this._overlayRefs[position];
            } else {
                const ref = this._overlayRefs[position]!.ref;
                if (position.startsWith('top')) {
                    if (bottomSectionIsOpened) {
                        ref.overlayElement.classList.add('fd-message-strip-alert-overlay--bottom-opened');
                    } else {
                        ref.overlayElement.classList.remove('fd-message-strip-alert-overlay--bottom-opened');
                    }
                }
                if (position.startsWith('bottom')) {
                    if (topSectionIsOpened) {
                        ref.overlayElement.classList.add('fd-message-strip-alert-overlay--top-opened');
                    } else {
                        ref.overlayElement.classList.remove('fd-message-strip-alert-overlay--top-opened');
                    }
                }
            }
        });
    }

    /** @hidden */
    private getOverlayRef(position: MessageStripAlertPosition): {
        ref: OverlayRef;
        containerRef: ComponentRef<MessageStripAlertContainerComponent>;
    } {
        if (!this._overlayRefs[position]) {
            const [verticalPosition, horizontalPosition] = position.split('-');
            const overlayRef = this.createOverlay(verticalPosition, horizontalPosition);
            const containerRef = overlayRef.attach(
                new ComponentPortal(
                    MessageStripAlertContainerComponent,
                    null,
                    Injector.create({
                        parent: this.injector,
                        providers: [
                            {
                                provide: MessageStripAlertContainerPosition,
                                useValue: position
                            }
                        ]
                    })
                )
            );
            this._overlayRefs[position] = { ref: overlayRef, containerRef };
        }
        return this._overlayRefs[position]!;
    }

    /** @hidden */
    private createOverlay(verticalPosition: string, horizontalPosition: string): OverlayRef {
        return this._overlay.create({
            panelClass: [
                'fd-message-strip-alert-overlay',
                `fd-message-strip-alert-overlay--${verticalPosition}`,
                `fd-message-strip-alert-overlay--${horizontalPosition}`
            ],
            hasBackdrop: false
        });
    }
}
