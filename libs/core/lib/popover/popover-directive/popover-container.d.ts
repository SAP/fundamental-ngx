import { AfterViewInit, ChangeDetectorRef, ElementRef, EventEmitter, OnDestroy, TemplateRef, ViewContainerRef } from '@angular/core';
/**
 * Not intended for external use.
 */
export declare class PopoverContainer implements AfterViewInit, OnDestroy {
    private elRef;
    private cdRef;
    containerRef: ViewContainerRef;
    noArrow: boolean;
    isSetup: EventEmitter<undefined>;
    content: TemplateRef<any> | string;
    contentString: string;
    context: any;
    placement: string;
    focusTrapped: boolean;
    closeOnEscapeKey: boolean;
    private componentRef;
    private focusTrap;
    constructor(elRef: ElementRef, cdRef: ChangeDetectorRef);
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    private loadFromTemplate;
    private setupFocusTrap;
    escapeHandler(): void;
}
