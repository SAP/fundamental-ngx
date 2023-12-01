import { OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, TemplatePortal } from '@angular/cdk/portal';
import { ComponentRef, EmbeddedViewRef } from '@angular/core';
import { Subject } from 'rxjs';

export interface ToastContainerComponent<P> {
    config: P;
    readonly onExit$: Subject<void>;
    readonly onEnter$: Subject<void>;
    overlayRef: OverlayRef;
    enter(): void;
    exit(): void;
    attachComponentPortal<T>(portal: ComponentPortal<T>): ComponentRef<T>;
    attachTemplatePortal<C>(portal: TemplatePortal<C>): EmbeddedViewRef<C>;
}
