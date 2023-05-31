import { ComponentRef, inject, Injectable, Injector, TemplateRef, Type } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { BehaviorSubject, combineLatest, map, tap } from 'rxjs';
import { ResponsiveBreakpoints, ViewportSizeObservable } from '@fundamental-ngx/cdk/utils';
import { MessageStripConfiguration } from './message-strip-configuration-type';
import { MessageStripAlertContainerComponent } from './message-strip-alert-container/message-strip-alert-container.component';
import {
    MessageStripAlertComponent,
    MessageStripAlertComponentData
} from './message-strip-alert/message-strip-alert.component';

type MessageStripAlertVerticalPosition = 'top' | 'bottom';
type MessageStripAlertHorizontalPosition = 'start' | 'middle' | 'end';
type MessageStripAlertPosition = `${MessageStripAlertVerticalPosition}-${MessageStripAlertHorizontalPosition}`;

interface OpenMessageStripAlertConfig {
    position?: MessageStripAlertPosition;
    content: string | TemplateRef<any> | Type<any>;
    messageStrip?: Partial<MessageStripConfiguration>;
}

const defaultConfig: Required<Omit<OpenMessageStripAlertConfig, 'content'>> = {
    position: 'top-middle',
    messageStrip: {}
};

function applyDefaultConfig(config: OpenMessageStripAlertConfig): Required<OpenMessageStripAlertConfig> {
    return { ...defaultConfig, ...config };
}

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
                portal: ComponentPortal<MessageStripAlertComponent>;
            }
        >
    >([]);

    /** @hidden */
    private _overlayRefs: Partial<
        Record<
            MessageStripAlertPosition,
            {
                ref: OverlayRef;
                componentRef: ComponentRef<MessageStripAlertContainerComponent>;
            }
        >
    > = {};

    /** @hidden */
    constructor() {
        if (this._messageStripAlertService) {
            throw new Error('MessageStripAlertService is already provided');
        }
        this.listenToItemsChanges();
    }

    /** @hidden */
    open(c: OpenMessageStripAlertConfig): void {
        const config = applyDefaultConfig(c);
        const portal = this.getComponentPortal(config, () => {
            this._messageAlerts$.next(this._messageAlerts$.value.filter((item) => item.portal !== portal));
            config.messageStrip && config.messageStrip.onDismiss && config.messageStrip.onDismiss();
        });
        this._messageAlerts$.next([...this._messageAlerts$.value, { ...config, portal }]);
    }

    /** @hidden */
    private getComponentPortal(
        config: Required<OpenMessageStripAlertConfig>,
        onDismiss: () => void
    ): ComponentPortal<MessageStripAlertComponent> {
        return new ComponentPortal(
            MessageStripAlertComponent,
            null,
            Injector.create({
                providers: [
                    {
                        provide: MessageStripAlertComponentData,
                        useValue: {
                            content: config.content,
                            messageStripConfig: {
                                ...config.messageStrip,
                                onDismiss
                            }
                        }
                    }
                ],
                parent: this.injector
            })
        );
    }

    /** @hidden */
    private listenToItemsChanges(): void {
        combineLatest([this.viewportSize$, this._messageAlerts$.asObservable()])
            .pipe(
                map(
                    ([viewportSize, messageAlerts]): Record<
                        MessageStripAlertPosition,
                        Array<ComponentPortal<MessageStripAlertComponent>>
                    > => {
                        if (viewportSize < ResponsiveBreakpoints.M) {
                            return messageAlerts.reduce((acc, next) => {
                                const position = next.position?.startsWith('top') ? 'top-middle' : 'bottom-middle';
                                acc[position] = [...(acc[position] || []), next.portal];
                                return acc;
                            }, {} as Record<MessageStripAlertPosition, Array<ComponentPortal<MessageStripAlertComponent>>>);
                        }
                        return messageAlerts.reduce((acc, next) => {
                            acc[next.position] = [...(acc[next.position] || []), next.portal];
                            return acc;
                        }, {} as Record<MessageStripAlertPosition, Array<ComponentPortal<MessageStripAlertComponent>>>);
                    }
                ),
                tap(
                    (
                        messageAlertsByPosition: Partial<
                            Record<MessageStripAlertPosition, Array<ComponentPortal<MessageStripAlertComponent>>>
                        >
                    ) => {
                        let topSectionIsOpened = false;
                        let bottomSectionIsOpened = false;
                        (
                            Object.entries(messageAlertsByPosition) as Array<
                                [MessageStripAlertPosition, ComponentPortal<MessageStripAlertComponent>[]]
                            >
                        ).forEach(([position, portals]) => {
                            topSectionIsOpened = topSectionIsOpened || position.startsWith('top');
                            bottomSectionIsOpened = bottomSectionIsOpened || position.startsWith('bottom');
                            const { componentRef } = this.getOverlayRef(position);
                            componentRef.instance.attachedElements = portals;
                            componentRef.changeDetectorRef.detectChanges();
                        });
                        this.syncExistingOverlays(messageAlertsByPosition, bottomSectionIsOpened, topSectionIsOpened);
                    }
                )
            )
            .subscribe();
    }

    /** @hidden */
    private syncExistingOverlays(
        messageAlertsByPosition: Partial<
            Record<MessageStripAlertPosition, ComponentPortal<MessageStripAlertComponent>[]>
        >,
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
        componentRef: ComponentRef<MessageStripAlertContainerComponent>;
    } {
        if (!this._overlayRefs[position]) {
            const [verticalPosition, horizontalPosition] = position.split('-');
            const overlayRef = this.createOverlay(verticalPosition, horizontalPosition);
            const containerRef = overlayRef.attach(new ComponentPortal(MessageStripAlertContainerComponent));
            this._overlayRefs[position] = { ref: overlayRef, componentRef: containerRef };
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
