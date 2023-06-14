import { DOCUMENT } from '@angular/common';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    ContentChildren,
    ElementRef,
    EventEmitter,
    forwardRef,
    HostListener,
    Inject,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Optional,
    Output,
    QueryList,
    Renderer2,
    ViewChild,
    ViewChildren,
    ViewContainerRef,
    ViewEncapsulation
} from '@angular/core';
import { A, BACKSPACE, DELETE, ENTER, LEFT_ARROW, RIGHT_ARROW, SPACE } from '@angular/cdk/keycodes';
import { BehaviorSubject, fromEvent, merge, Observable, startWith, Subject, Subscription } from 'rxjs';
import { filter, takeUntil, debounceTime, map } from 'rxjs/operators';
import { FormControlComponent } from '@fundamental-ngx/core/form';
import {
    applyCssClass,
    CssClassBuilder,
    KeyUtil,
    Nullable,
    resizeObservable,
    RtlService
} from '@fundamental-ngx/cdk/utils';
import { TokenComponent } from './token.component';
import { ContentDensityObserver, contentDensityObserverProviders } from '@fundamental-ngx/core/content-density';

@Component({
    selector: 'fd-tokenizer',
    templateUrl: './tokenizer.component.html',
    styleUrls: ['./tokenizer.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [contentDensityObserverProviders()]
})
export class TokenizerComponent implements AfterViewInit, OnDestroy, CssClassBuilder, OnInit, OnChanges {
    /** user's custom classes */
    @Input()
    class: string;

    /** Disables possibility to remove tokens by keyboard */
    @Input()
    disableKeyboardDeletion = false;

    /** @hidden */
    @ContentChildren(forwardRef(() => TokenComponent))
    tokenList: QueryList<TokenComponent>;

    /** @hidden */
    @ContentChild(forwardRef(() => FormControlComponent), { read: ElementRef })
    input: ElementRef<HTMLInputElement>;

    /** @hidden */
    @ViewChild('tokenizerInner')
    tokenizerInnerEl: ElementRef<HTMLDivElement>;

    /** @hidden */
    @ViewChild('moreElementSpan')
    moreElement: ElementRef<HTMLElement>;

    /** @hidden */
    @ViewChild('inputGroupAddOn') set content(content: ElementRef<HTMLElement>) {
        this.inputGroupAddonEl = content;
    }

    /** @hidden */
    @ViewChildren('viewContainer', { read: ViewContainerRef })
    readonly _viewContainer: QueryList<ViewContainerRef>;

    /** @hidden */
    get _hiddenTokens(): TokenComponent[] {
        return this.tokenList.filter((token) => token.elementRef.nativeElement.style.display === 'none');
    }

    /**
     * @hidden
     * Observable state of the compact mode.
     */
    get _compact$(): Observable<boolean> {
        return this._contentDensityObserver.isCompact$;
    }

    /**
     * @hidden
     * Component is in compact mode, determined by the consumer
     */
    get _compact(): boolean {
        return this._contentDensityObserver.isCompact;
    }

    /** @hidden */
    inputGroupAddonEl: ElementRef;

    /** Whether to use cozy visuals but compact collapsing behavior. */
    @Input()
    compactCollapse = false;

    /** Whether tokenizer should have fake focus indicator, when input is focused inside*/
    @Input()
    tokenizerFocusable = true;

    /** The value for the tokenizer input */
    @Input()
    inputValue: string;

    /** Icon of the button on the right of the input field. */
    @Input()
    glyph: string;

    /** Word to use for when there are extra tokens. */
    @Input()
    moreTerm = 'more';

    /** @hidden */
    @Input()
    open: boolean;

    /** Event emitted when the search term changes. Use *$event* to access the new term. */
    @Output()
    readonly moreClickedEvent: EventEmitter<any> = new EventEmitter<any>();

    /** @hidden */
    previousElementWidth: number;

    /** @hidden */
    moreTokensLeft: Array<TokenComponent> = [];

    /** @hidden */
    moreTokensRight: Array<TokenComponent> = [];

    /** @hidden */
    previousTokenCount: number;

    /** @hidden */
    tokenListChangesSubscription: Subscription;

    /** @hidden */
    tokenListClickSubscriptions: Subscription[] = [];

    /** @hidden */
    hiddenCozyTokenCount = 0;

    /** @hidden Used to add focus to tokenizer element */
    _tokenizerHasFocus = false;

    /** @hidden */
    _showOverflowPopover = true;

    /** @hidden */
    _showMoreElement = false;

    /** @hidden */
    _tokensContainerWidth = 'auto';

    /** @hidden
     * Variable which will keep the index of the first token pressed in the tokenizer
     */
    private _firstElementInSelection: number | null = null;

    /** @hidden
     * Variable which will keep the index of the last token pressed in the tokenizer
     */
    private _lastElementInSelection: number | null = null;

    /** @hidden
     * Flag which will say if the last keyboard and click operation they used was using control
     */
    private _ctrlPrevious: boolean;

    /** @hidden
     * Flag which will say if they held shift and clicked highlighting elements before or
     */
    private _directionShiftIsRight: boolean | null = null;

    /** An RxJS Subject that will kill the data stream upon destruction (for unsubscribing)  */
    private readonly _onDestroy$: Subject<void> = new Subject<void>();

    /** @hidden */
    private readonly _eventListeners: (() => void)[] = [];

    /** @hidden */
    private _forceAllTokensToDisplay = false;

    /** @hidden */
    private _tokenElementFocused = new BehaviorSubject(false);

    /** @hidden */
    private _inputElementFocused = false;

    /** @hidden */
    private _tokenElementFocusedSub: Nullable<Subscription>;

    /** @hidden */
    constructor(
        readonly _contentDensityObserver: ContentDensityObserver,
        public readonly elementRef: ElementRef,
        private _cdRef: ChangeDetectorRef,
        @Optional() private _rtlService: RtlService,
        private _renderer: Renderer2,
        @Inject(DOCUMENT) private readonly _document: Document
    ) {
        this._eventListeners.push(
            this._renderer.listen('window', 'click', (e: Event) => {
                if (this.elementRef.nativeElement.contains(e.target) === false) {
                    this.tokenList.forEach((token) => {
                        token.selected = false;
                    });
                }
            })
        );
    }

    /** @hidden */
    ngAfterViewInit(): void {
        if (this.input?.nativeElement) {
            this._inputKeydownEvent();
        }

        // watch for changes to the tokenList and attempt to expand/collapse tokens as needed
        this.tokenList.changes.pipe(startWith(null)).subscribe(() => {
            this.tokenListChangesSubscription?.unsubscribe();
            this.tokenListChangesSubscription = new Subscription();
            this._resetTokens();
            this.tokenList.forEach((token) => {
                this.tokenListChangesSubscription.add(
                    token.onCloseClick.subscribe(() => {
                        this._resetTokens();
                    })
                );
                this.tokenListChangesSubscription.add(
                    token.elementFocused.subscribe((isFocused) => {
                        this._tokenElementFocused.next(isFocused);
                    })
                );
            });
        });

        if (!this._compact && !this.compactCollapse) {
            this._handleCozyTokenCount();
        }
        this._listenElementEvents();
        this.previousElementWidth = this.elementRef.nativeElement.getBoundingClientRect().width;
        this._listenOnResize();
    }

    /** @hidden */
    ngOnDestroy(): void {
        this.tokenListChangesSubscription?.unsubscribe();
        this._tokenElementFocusedSub?.unsubscribe();
        this._onDestroy$.next();
        this._onDestroy$.complete();
        this._eventListeners.forEach((e) => e());
        this._unsubscribeClicks();
    }

    /** @hidden */
    ngOnInit(): void {
        this.buildComponentCssClass();
    }

    /** @hidden */
    ngOnChanges(): void {
        this.buildComponentCssClass();
    }

    /** @hidden
     * CssClassBuilder interface implementation
     * function must return single string
     * function is responsible for order which css classes are applied
     */
    @applyCssClass
    buildComponentCssClass(): string[] {
        return [this.class];
    }

    /** @hidden */
    handleTokenClickSubscriptions(): void {
        this._unsubscribeClicks();
        this.tokenList.forEach((token, index) => {
            if (token.tokenWrapperElement) {
                token.tokenWrapperElement.nativeElement.tabIndex = -1;
            }
            this.tokenListClickSubscriptions.push(
                token.onTokenClick.subscribe((event) => {
                    event.stopPropagation();
                    this.focusTokenElement(index);
                    if (this._isControlKey(event)) {
                        this._ctrlSelected(token, index);
                    } else if (!event.shiftKey || this._ctrlPrevious) {
                        this._basicSelected(token, index);
                    } else if (event.shiftKey) {
                        this.resetFirstAndLastElement();
                        this._shiftSelected(index);
                    }
                })
            );
            this.tokenListClickSubscriptions.push(
                token.onTokenKeydown.subscribe((event) => {
                    this.handleKeyDown(event, index);
                })
            );
        });
    }

    /** @hidden */
    focusTokenElement(newIndex: number): HTMLElement | undefined {
        let elementToFocus: HTMLElement | undefined;
        const tokenListArray: TokenComponent[] = this.tokenList.toArray();
        if (tokenListArray[newIndex]) {
            elementToFocus = tokenListArray[newIndex].tokenWrapperElement.nativeElement;
            // element needs tabindex in order to be focused
            elementToFocus!.focus();
        }

        return elementToFocus;
    }

    /** @hidden */
    @HostListener('keydown', ['$event'])
    keyDown(keyboardEvent: KeyboardEvent): void {
        if (
            KeyUtil.isKeyCode(keyboardEvent, [DELETE, BACKSPACE]) &&
            (!this._isInputFocused() || this._tokensSelected()) &&
            !this.disableKeyboardDeletion
        ) {
            const selectedElements = this._getActiveTokens();
            const focusedTokenIndex = this._getFocusedTokenIndex();
            selectedElements.forEach((element) => element.onCloseClick.emit());
            if (selectedElements.length > 0) {
                if (KeyUtil.isKeyCode(keyboardEvent, DELETE)) {
                    this._focusInput();
                } else {
                    this.focusTokenElement(focusedTokenIndex - 1);
                }
            }
        }

        if (
            KeyUtil.isKeyCode(keyboardEvent, BACKSPACE) &&
            this._isInputFocused() &&
            !this._getInputValue() &&
            !this.disableKeyboardDeletion
        ) {
            this.focusTokenElement(this.tokenList.length - 1);
        }
    }

    /** @hidden */
    onResize(): void {
        if (this.elementRef) {
            const elementWidth = this.elementRef.nativeElement.getBoundingClientRect().width;
            this._resetTokens();
            this.previousElementWidth = elementWidth;
            if (!this._compact && !this.compactCollapse) {
                this._handleCozyTokenCount();
            }
        }
    }

    /** @hidden */
    handleKeyDown(event: KeyboardEvent, fromIndex: number): void {
        let newIndex: number | undefined;
        const rtl = this._rtlService && this._rtlService.rtl ? this._rtlService.rtl.getValue() : false;
        if (KeyUtil.isKeyCode(event, SPACE) && !this._isInputFocused()) {
            const token = this.tokenList.find((_, index) => index === fromIndex);
            this.tokenList.forEach((shadowedToken) => {
                if (shadowedToken !== token) {
                    shadowedToken.selected = false;
                }
            });
            token && (token.selected = !token.selected);
            event.preventDefault();
        } else if (KeyUtil.isKeyCode(event, ENTER)) {
            this._focusInput();
        } else if ((KeyUtil.isKeyCode(event, LEFT_ARROW) && !rtl) || (KeyUtil.isKeyCode(event, RIGHT_ARROW) && rtl)) {
            this._handleArrowLeft(fromIndex);
            newIndex = fromIndex - 1;
        } else if ((KeyUtil.isKeyCode(event, RIGHT_ARROW) && !rtl) || (KeyUtil.isKeyCode(event, LEFT_ARROW) && rtl)) {
            this._handleArrowRight(fromIndex);
            newIndex = fromIndex + 1;
        } else if (KeyUtil.isKeyCode(event, A) && !this._getInputValue() && this._isControlKey(event)) {
            event.preventDefault();
            this.tokenList.forEach((token) => (token.selected = true));
        }
        if (
            newIndex === this.tokenList.length &&
            ((KeyUtil.isKeyCode(event, RIGHT_ARROW) && !rtl) || (KeyUtil.isKeyCode(event, LEFT_ARROW) && rtl))
        ) {
            this._focusInput();
        } else if (newIndex! > this.tokenList.length - this.moreTokensRight.length && this._isInputFocused()) {
            this.focusTokenElement(newIndex! - this.moreTokensRight.length);
        } else if (newIndex || newIndex === 0) {
            this.focusTokenElement(newIndex);
        }
    }

    /** @hidden */
    getCombinedTokenWidth(): number {
        let totalTokenWidth = this._getTokensAreaWidthWithoutTokens();
        // get the width of each token
        this.tokenList.forEach((token) => {
            totalTokenWidth = totalTokenWidth + token.elementRef.nativeElement.getBoundingClientRect().width;
        });

        return totalTokenWidth;
    }

    /** @hidden */
    private _getTokensAreaWidthWithoutTokens(): number {
        let totalTokenWidth = 0;
        // add input width
        if (this.input?.nativeElement) {
            totalTokenWidth = totalTokenWidth + this.input.nativeElement.getBoundingClientRect().width;
        }
        // add the width of the "____ more" element
        if (this.moreTokensLeft.length > 0 && this.moreElement && this.moreElement.nativeElement) {
            totalTokenWidth = totalTokenWidth + this.moreElement.nativeElement.getBoundingClientRect().width;
        }
        // add the input group addon
        if (this.inputGroupAddonEl && this.inputGroupAddonEl.nativeElement) {
            totalTokenWidth = totalTokenWidth + this.inputGroupAddonEl.nativeElement.getBoundingClientRect().width;
        }

        return totalTokenWidth;
    }

    /** @hidden */
    moreClicked(): void {
        this.moreClickedEvent.emit();
    }

    /** Removes all selected tokens */
    removeSelectedTokens(): void {
        const selectedElements = this._getActiveTokens();
        selectedElements.forEach((element) => element.onRemove.emit());
    }

    /** @hidden */
    private _handleArrowLeft(fromIndex: number): void {
        // if the leftmost visible token is selected, and there are moreTokensLeft, need to display a moreTokenLeft
        if (fromIndex === this.moreTokensLeft.length) {
            const poppedToken = this.moreTokensLeft.pop();
            if (poppedToken) {
                this._makeElementVisible(poppedToken.elementRef);
            }
            // and then hide any tokens from the right that no longer fit
            this._collapseTokens('right');

            this._cdRef.detectChanges();
        }
    }

    /** @hidden */
    _showAllTokens(): void {
        this._forceAllTokensToDisplay = true;
        this._inputElementFocused = true;
        this.tokenList.forEach((token) => {
            this._makeElementVisible(token.elementRef);
            token._viewContainer.createEmbeddedView(token._content);
        });
        this._tokensContainerWidth = 'auto';
        this._showMoreElement = false;
        this._cdRef.detectChanges();
        this.tokenizerInnerEl.nativeElement.scrollLeft = this.tokenizerInnerEl.nativeElement.scrollWidth;
    }

    /** @hidden */
    _hideTokens(): void {
        setTimeout(() => {
            this._inputElementFocused = false;
            const tokenFocused = this._getFocusedTokenIndex() > -1;

            if (tokenFocused) {
                this._waitForFocusToDisappear();
                return;
            }
            this._forceAllTokensToDisplay = false;
            this._resetTokens();
            this._cdRef.detectChanges();
            this.tokenizerInnerEl.nativeElement.scrollLeft = this.tokenizerInnerEl.nativeElement.scrollWidth;
        });
    }

    /** @hidden */
    private _waitForFocusToDisappear(): void {
        this._tokenElementFocusedSub?.unsubscribe();
        // 5 ms delay for other token to receive focus, check if _showAllTokens was called again
        this._tokenElementFocusedSub = this._tokenElementFocused
            .pipe(
                debounceTime(5),
                filter((isFocused) => isFocused && !this._inputElementFocused)
            )
            .subscribe(() => {
                this._hideTokens();
            });
    }

    /** @hidden */
    private _handleArrowRight(fromIndex: number): void {
        if (fromIndex === this.tokenList.length - this.moreTokensRight.length - 1 && this.moreTokensRight.length) {
            const poppedToken = this.moreTokensRight.pop();
            if (poppedToken) {
                this._makeElementVisible(poppedToken.elementRef);
            }
            // and then hide any tokens from the left that no longer fit
            this._collapseTokens('left');

            this._cdRef.detectChanges();
        }
    }

    /** @hidden */
    private _collapseTokens(side?: string): void {
        if (this._forceAllTokensToDisplay) {
            return;
        }
        if (!this._compact && !this.compactCollapse) {
            this._getHiddenCozyTokenCount();
            return;
        }
        this._cdRef.detectChanges();
        this._viewContainer.forEach((viewContainer) => viewContainer.clear());

        const availableWidth = this._getTokensAreaWidthWithoutTokens();

        if (this.tokenList.length === 1) {
            const tokenWidth = this.tokenList.get(0)?.elementRef.nativeElement.getBoundingClientRect().width;
            this._tokensContainerWidth = availableWidth < tokenWidth ? `calc(100% - ${availableWidth}px)` : 'auto';
            return;
        } else {
            this._tokensContainerWidth = 'auto';
        }

        this._checkMoreElementVisibility();

        this.tokenList.forEach((token) => token._viewContainer.createEmbeddedView(token._content));

        let elementWidth = this.elementRef.nativeElement.getBoundingClientRect().width;
        let combinedTokenWidth = this.getCombinedTokenWidth(); // the combined width of all tokens, the "____ more" text, and the input
        let i = 0;
        /*
         When resizing, we want to collapse the tokens on the left first. However, when the user is navigating through
         a group of overflowing tokens using the arrow left key, we may need to hide tokens on the right. So if this
         function has been called with the param 'right' it will collapse tokens from the right side of the list rather
         than the (default) left side.
         */
        if (side === 'right') {
            i = this.tokenList.length - 1;
        }
        while (combinedTokenWidth > elementWidth && (side === 'right' ? i >= 0 : i < this.tokenList.length)) {
            // loop through the tokens and hide them until the combinedTokenWidth fits in the elementWidth
            const token = this.tokenList.get(i);
            const moreTokens = side === 'right' ? this.moreTokensRight : this.moreTokensLeft;

            if (token) {
                if (moreTokens.indexOf(token) === -1) {
                    moreTokens.push(token);
                }
                token.elementRef.nativeElement.style.display = 'none';
            }
            // get the new elementWidth and combinedTokenWidth as these will have changed after setting a token display to 'none'
            elementWidth = this.elementRef.nativeElement.getBoundingClientRect().width;
            this._checkMoreElementVisibility();
            combinedTokenWidth = this.getCombinedTokenWidth();
            side === 'right' ? i-- : i++;
        }

        this._cdRef.detectChanges();
        this._hiddenTokens.forEach((hiddenToken, index) => {
            hiddenToken._viewContainer.clear();
            this._viewContainer.get(index)?.createEmbeddedView(hiddenToken._content);
        });
    }

    /** @hidden */
    private _resetTokens(): void {
        this.moreTokensLeft = [];
        this.moreTokensRight = [];
        if (this._compact || this.compactCollapse || this._forceAllTokensToDisplay) {
            this.tokenList.forEach((token) => {
                this._makeElementVisible(token.elementRef);
            });
            this._cdRef.markForCheck();
            this._collapseTokens();
        } else {
            this._getHiddenCozyTokenCount();
        }
        this.handleTokenClickSubscriptions();
        this.previousTokenCount = this.tokenList.length;
        this.tokenList.forEach((token) => token._setTotalCount(this.tokenList.length));
        this._cdRef.markForCheck();
    }

    /** @hidden */
    private _getHiddenCozyTokenCount(): void {
        const elementLeft = this.elementRef.nativeElement.getBoundingClientRect().left;
        this.hiddenCozyTokenCount = 0;
        this.tokenList.forEach((token) => {
            if (
                token.tokenWrapperElement &&
                token.tokenWrapperElement.nativeElement.getBoundingClientRect().right < elementLeft
            ) {
                this.hiddenCozyTokenCount += 1;
            }
        });

        this._checkMoreElementVisibility();
    }

    /** @hidden */
    private _handleCozyTokenCount(): void {
        // because justify-content breaks scrollbar, it cannot be used on cozy screens, so use JS to scroll to the end
        this.tokenizerInnerEl.nativeElement.scrollLeft = this.tokenizerInnerEl.nativeElement.scrollWidth;
        this._getHiddenCozyTokenCount();
        if (this.hiddenCozyTokenCount > 0) {
            // need to do this again in case "____ more" text was added
            this.tokenizerInnerEl.nativeElement.scrollLeft = this.tokenizerInnerEl.nativeElement.scrollWidth;
            this._getHiddenCozyTokenCount();
        }
    }

    /** @hidden */
    private _makeElementVisible(elementRef: ElementRef): void {
        elementRef.nativeElement.style.display = 'inline-block';
        elementRef.nativeElement.style.visibility = 'visible';
    }

    /** @hidden */
    private _unsubscribeClicks(): void {
        if (this.tokenListClickSubscriptions && this.tokenListClickSubscriptions.length) {
            this.tokenListClickSubscriptions.forEach((subscription) => {
                subscription.unsubscribe();
            });
        }
    }

    /** @hidden */
    private _inputKeydownEvent(): void {
        this._eventListeners.push(
            this._renderer.listen(this.input.nativeElement, 'keydown', (event: KeyboardEvent) => {
                this.handleKeyDown(event, this.tokenList.length);
            })
        );
    }

    /** @hidden Method which handles what happens to token when it is clicked and no key is being held down.*/
    private _basicSelected(token, index): void {
        this.tokenList.forEach((shadowedToken) => {
            if (shadowedToken !== token) {
                shadowedToken.selected = false;
            }
        });
        this._firstElementInSelection = index;
        this._lastElementInSelection = index;
        token.selected = true;
        this._ctrlPrevious = false;
    }

    /** @hidden Restart first and last elements for shift selection.*/
    private resetFirstAndLastElement(): void {
        const reset = !this.tokenList.some((token) => token.selected);
        if (reset) {
            this._firstElementInSelection = null;
            this._lastElementInSelection = null;
        }
    }

    /** @hidden Method which handles what happens to token when it is clicked and the shift key is being held down.*/
    private _shiftSelected(index): void {
        if (!this._firstElementInSelection && !this._lastElementInSelection) {
            this._firstElementInSelection = index;
            this._lastElementInSelection = index;
            this._directionShiftIsRight = null;
        } else {
            if (this._firstElementInSelection && index < this._firstElementInSelection) {
                if (this._directionShiftIsRight) {
                    this._lastElementInSelection = this._firstElementInSelection;
                }
                this._directionShiftIsRight = false;
                this._firstElementInSelection = index;
            } else if (this._lastElementInSelection && index > this._lastElementInSelection) {
                if (!this._directionShiftIsRight) {
                    this._firstElementInSelection = this._lastElementInSelection;
                }
                this._directionShiftIsRight = true;
                this._lastElementInSelection = index;
            }
            if (!this._directionShiftIsRight) {
                this._firstElementInSelection = index;
            } else if (this._directionShiftIsRight) {
                this._lastElementInSelection = index;
            }
        }

        this.tokenList.forEach((token, indexOfToken) => {
            token.selected =
                this._firstElementInSelection != null &&
                this._lastElementInSelection != null &&
                indexOfToken >= this._firstElementInSelection &&
                indexOfToken <= this._lastElementInSelection;
        });
        this._ctrlPrevious = false;
    }

    /** @hidden Method which handles what happens to token when it is clicked and the control or meta key is being held down.*/
    private _ctrlSelected(token, index): void {
        this._firstElementInSelection = null;
        this._lastElementInSelection = null;
        const selected = token.selected;
        token.selected = true;
        if (selected) {
            token.selected = false;
            this.tokenList.forEach((element, indexOfToken) => {
                if (!this._firstElementInSelection) {
                    if (element.selected) {
                        this._firstElementInSelection = indexOfToken;
                    }
                } else {
                    this._lastElementInSelection = indexOfToken;
                }
            });
            if (index === this._lastElementInSelection) {
                this._lastElementInSelection = this._lastElementInSelection! - 1;
            }
            if (index === this._firstElementInSelection) {
                this._firstElementInSelection = this._firstElementInSelection! - 1;
            }
        }
        this._ctrlPrevious = true;
    }

    /** Get selected and focused tokens */
    private _getActiveTokens(): TokenComponent[] {
        return this.tokenList.filter((item) => item.selected || this._isTokenFocused(item));
    }

    /** @hidden */
    private _getFocusedTokenIndex(): number {
        return this.tokenList.toArray().findIndex((token) => this._isTokenFocused(token));
    }

    /** @hidden */
    private _isTokenFocused(token: TokenComponent): boolean {
        return token.tokenWrapperElement.nativeElement === this._document.activeElement;
    }

    /** @hidden */
    private _isInputFocused(): boolean {
        return this._document.activeElement === this.input.nativeElement;
    }

    /** @hidden */
    private _tokensSelected(): boolean {
        return this.tokenList.some((t) => t.selected);
    }

    /** @hidden */
    private _getInputValue(): string {
        return this.input.nativeElement.value;
    }

    /** @hidden */
    private _focusInput(): void {
        this.input.nativeElement.focus();
    }

    /** @hidden */
    private _isControlKey(keyboardEvent: KeyboardEvent | MouseEvent): boolean {
        return keyboardEvent.ctrlKey || keyboardEvent.metaKey;
    }

    /** @hidden */
    private _listenElementEvents(): void {
        merge(
            fromEvent<Event>(this.elementRef.nativeElement, 'focus', { capture: true }).pipe(
                filter((event) => (event['target'] as any)?.tagName === 'INPUT' && this.tokenizerFocusable),
                map(() => true)
            ),
            fromEvent<Event>(this.elementRef.nativeElement, 'blur', { capture: true }).pipe(map(() => false))
        )
            .pipe(
                // debounceTime is needed in order to filter subsequent focus-blur events, that happen simultaneously
                debounceTime(10),
                takeUntil(this._onDestroy$)
            )
            .subscribe((focused) => {
                this._tokenizerHasFocus = focused;
                this._cdRef.markForCheck();
            });
    }

    /** @hidden Listen window resize and distribute cards on column change */
    private _listenOnResize(): void {
        this.onResize();
        resizeObservable(this.elementRef.nativeElement)
            .pipe(debounceTime(30), takeUntil(this._onDestroy$))
            .subscribe(() => this.onResize());
    }

    /** @hidden */
    private _checkMoreElementVisibility(): void {
        const showMoreElement =
            (this.moreTokensLeft.length > 0 || this.moreTokensRight.length > 0 || this.hiddenCozyTokenCount > 0) &&
            !this.open &&
            !this._tokenizerHasFocus;

        if (showMoreElement === this._showMoreElement) {
            return;
        }

        this._showMoreElement = showMoreElement;

        this._cdRef.detectChanges();
    }
}
