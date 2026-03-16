import {
    AfterContentChecked,
    AfterViewInit,
    Directive,
    effect,
    ElementRef,
    inject,
    input,
    numberAttribute,
    untracked
} from '@angular/core';

const DEFAULT_TRUNCATE_WIDTH = 200;

@Directive({
    selector: '[fdkTruncate]',
    standalone: true
})
export class TruncateDirective implements AfterViewInit {
    /**
     * Width in pixel for truncation of an element, by default 200
     */
    readonly fdkTruncateWidth = input(DEFAULT_TRUNCATE_WIDTH, { transform: numberAttribute });

    /**
     * Truncating state
     */
    readonly fdkTruncateState = input(false);

    /** @hidden */
    private readonly _elementRef = inject(ElementRef);

    /** @hidden */
    private _truncateTarget: HTMLElement;

    /** @hidden
     * saves default style of element before truncating
     */
    private _defaultStyle: string;

    /** @hidden */
    private _defaultStyleCaptured = false;

    /**
     * Root native element
     */
    get rootElement(): HTMLElement {
        return this._elementRef.nativeElement;
    }

    /** @hidden */
    constructor() {
        effect(() => {
            const state = this.fdkTruncateState();
            const width = this.fdkTruncateWidth();
            untracked(() => this._truncate(state, width));
        });
    }

    /**
     * Method saves default style of target element before first truncate.
     */
    setDefaultStyle(): void {
        if (!this._defaultStyleCaptured) {
            this._defaultStyle = this._truncateTarget.style.cssText;
            this._defaultStyleCaptured = true;
        }
    }

    /** @hidden */
    ngAfterViewInit(): void {
        if (this.rootElement) {
            this._truncate(this.fdkTruncateState(), this.fdkTruncateWidth());
        }
    }

    /** @hidden */
    private _truncate(state: boolean, width: number): void {
        this._truncateTarget = this.rootElement;

        if (!this._truncateTarget) {
            return;
        }
        this.setDefaultStyle();
        const truncationStyle = `${this._defaultStyle} max-width: ${width}px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;`;
        this._truncateTarget.style.cssText = state ? truncationStyle : this._defaultStyle;
    }
}

@Directive({
    selector: '[fdkTruncatedTitle], [fdTruncatedTitle], [fd-truncate-title]',
    standalone: true
})
export class TruncatedTitleDirective implements AfterContentChecked {
    /** @hidden */
    constructor(private _elRef: ElementRef) {}

    /** @hidden */
    ngAfterContentChecked(): void {
        const el = this._elRef.nativeElement;
        if (el.scrollWidth > el.offsetWidth) {
            el.title = el.innerText;
        }
    }
}
