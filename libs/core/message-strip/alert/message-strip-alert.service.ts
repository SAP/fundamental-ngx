import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ComponentRef, Injectable, Injector, Type, inject, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { ResponsiveBreakpoints, ViewportSizeObservable } from '@fundamental-ngx/cdk/utils';
import { patchLanguage } from '@fundamental-ngx/i18n';
import { Observable, Subject, combineLatest, map, tap } from 'rxjs';
import { applyDefaultConfig } from './default-config';
import { MessageStripAlertContainerComponent } from './message-strip-alert-container/message-strip-alert-container.component';
import { MessageStripAlertPosition } from './message-strip-alert.position';
import { MessageStripAlertRef } from './message-strip-alert.ref';
import { MessageStripAlertComponent } from './message-strip-alert/message-strip-alert.component';
import { MessageStripAlert } from './message-strip-alert/message-strip-alert.interface';
import { OpenMessageStripAlertConfig } from './open-message-strip-alert.config';
import { MessageStripAlertComponentData, MessageStripAlertContainerPosition } from './tokens';

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
    footerComponents$: Observable<Partial<Record<MessageStripAlertPosition, Type<any>>>>;

    /** @hidden */
    private readonly _injector = inject(Injector);

    /** @hidden */
    private readonly _overlay = inject(Overlay);

    /** @hidden */
    private readonly _viewportSize$ = inject(ViewportSizeObservable);

    /** @hidden */
    private readonly _messageStripAlertService = inject(MessageStripAlertService, { optional: true, skipSelf: true });

    /**
     * Signal holding all message alerts
     * @hidden
     */
    private readonly _messageAlerts = signal<
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

    /**
     * Signal holding footer components
     * @hidden
     */
    private readonly _messageStripAlertContainerFooters = signal<Partial<Record<MessageStripAlertPosition, Type<any>>>>(
        {}
    );
    /** @hidden */
    constructor() {
        if (this._messageStripAlertService) {
            throw new Error('MessageStripAlertService is already provided');
        }
        this.footerComponents$ = toObservable(this._messageStripAlertContainerFooters);
        this._listenToItemsChanges();
    }

    /**
     * Set the footer component for a given position.
     * @param position - The position where the footer should be displayed
     * @param component - The component type to be rendered as footer
     */
    setFooterComponent(position: MessageStripAlertPosition, component: Type<any>): void {
        this._messageStripAlertContainerFooters.update((footers) => ({
            ...footers,
            [position]: component
        }));
    }

    /**
     * Open a message strip alert with given configuration.
     * @param c - Configuration for the message strip alert
     * @returns Reference to the opened alert for programmatic control
     */
    open<ComponentType = unknown>(c: OpenMessageStripAlertConfig<ComponentType>): MessageStripAlertRef {
        const config = applyDefaultConfig<ComponentType>(c);
        const alertRef = this._getMessageStripAlertRef(config);
        this._messageAlerts.update((alerts) => [{ ...config, portal: alertRef.portal }, ...alerts]);
        return alertRef;
    }

    /** @hidden */
    private _getMessageStripAlertRef<ComponentType = unknown>(
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
                                closeOnNavigation: config.closeOnNavigation,
                                messageStripConfig: {
                                    ...config.messageStrip,
                                    onDismiss: () => {
                                        this._messageAlerts.update((alerts) =>
                                            alerts.filter((item) => item.portal !== alertRef.portal)
                                        );
                                        config.messageStrip &&
                                            config.messageStrip.onDismiss &&
                                            config.messageStrip.onDismiss();
                                        onDismiss$.next();
                                        onDismiss$.complete();
                                    }
                                }
                            }
                        },
                        {
                            provide: MessageStripAlertRef,
                            useFactory: () => alertRef
                        },
                        patchLanguage((lang) => ({
                            coreMessageStrip: {
                                dismissLabel: config.messageStrip.dismissLabel || lang.coreMessageStrip.dismissLabel
                            }
                        }))
                    ],
                    parent: this._injector
                })
            ),
            dismiss: () => {
                this._messageAlerts.update((alerts) => alerts.filter((item) => item.portal !== alertRef.portal));
                config.messageStrip && config.messageStrip.onDismiss && config.messageStrip.onDismiss();
                onDismiss$.next();
                onDismiss$.complete();
            },
            onDismiss$: onDismiss$.asObservable()
        };
        return alertRef;
    }

    /** @hidden */
    private _listenToItemsChanges(): void {
        combineLatest([this._viewportSize$, toObservable(this._messageAlerts)])
            .pipe(
                map(
                    ([viewportSize, messageAlerts]): Record<
                        MessageStripAlertPosition,
                        Array<ComponentPortal<MessageStripAlert>>
                    > => {
                        if (viewportSize < ResponsiveBreakpoints.M) {
                            return messageAlerts.reduce(
                                (acc, next) => {
                                    const position = next.position?.startsWith('top') ? 'top-middle' : 'bottom-middle';
                                    acc[position] = [...(acc[position] || []), next.portal];
                                    return acc;
                                },
                                {} as Record<MessageStripAlertPosition, Array<ComponentPortal<MessageStripAlert>>>
                            );
                        }
                        return messageAlerts.reduce(
                            (acc, next) => {
                                acc[next.position] = [...(acc[next.position] || []), next.portal];
                                return acc;
                            },
                            {} as Record<MessageStripAlertPosition, Array<ComponentPortal<MessageStripAlert>>>
                        );
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
                            const { containerRef } = this._getOverlayRef(position);
                            containerRef.instance.attachedElements.set(portals);
                        });
                        this._syncExistingOverlays(messageAlertsByPosition, bottomSectionIsOpened, topSectionIsOpened);
                    }
                )
            )
            .subscribe();
    }

    /**
     * Synchronizes existing overlay states based on current message alerts.
     * @hidden
     */
    private _syncExistingOverlays(
        messageAlertsByPosition: Partial<Record<MessageStripAlertPosition, ComponentPortal<MessageStripAlert>[]>>,
        bottomSectionIsOpened: boolean,
        topSectionIsOpened: boolean
    ): void {
        (Object.keys(this._overlayRefs) as MessageStripAlertPosition[]).forEach((position) => {
            const overlayRef = this._overlayRefs[position];
            if (!overlayRef) {
                return;
            }
            if (!messageAlertsByPosition[position]) {
                overlayRef.ref.dispose();
                delete this._overlayRefs[position];
            } else {
                const ref = overlayRef.ref;
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

    /**
     * Gets or creates an overlay reference for the specified position.
     * @hidden
     */
    private _getOverlayRef(position: MessageStripAlertPosition): {
        ref: OverlayRef;
        containerRef: ComponentRef<MessageStripAlertContainerComponent>;
    } {
        if (!this._overlayRefs[position]) {
            const [verticalPosition, horizontalPosition] = position.split('-');
            const overlayRef = this._createOverlay(verticalPosition, horizontalPosition);
            const containerRef = overlayRef.attach(
                new ComponentPortal(
                    MessageStripAlertContainerComponent,
                    null,
                    Injector.create({
                        parent: this._injector,
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
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return this._overlayRefs[position]!;
    }

    /**
     * Creates an overlay for message strip alerts at the specified position.
     * @hidden
     */
    private _createOverlay(verticalPosition: string, horizontalPosition: string): OverlayRef {
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
