import {
    AfterContentInit,
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    ContentChildren,
    ElementRef,
    forwardRef,
    HostListener,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Optional,
    QueryList,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { FormControlDirective } from '../form/form-control/form-control.directive';
import { TokenComponent } from './token.component';
import { RtlService } from '../utils/services/rtl.service';
import { Subscription } from 'rxjs';
import { applyCssClass, CssClassBuilder } from '../utils/public_api';

@Component({
    selector: 'fd-tokenizer',
    templateUrl: './tokenizer.component.html',
    styleUrls: ['./tokenizer.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TokenizerComponent implements AfterViewInit, AfterContentInit, OnDestroy, CssClassBuilder, OnInit, OnChanges {
    /** user's custom classes */
    @Input()
    class: string;
    /** @hidden */
    @ContentChildren(forwardRef(() => TokenComponent))
    tokenList: QueryList<TokenComponent>;

    /** @hidden */
    @ContentChild(forwardRef(() => FormControlDirective))
    input: FormControlDirective;

    /** @hidden */
    @ViewChild('tokenizerInner')
    tokenizerInnerEl: ElementRef;

    /** @hidden */
    @ViewChild('moreElement')
    moreElement: ElementRef;

    /** @hidden */
    @ViewChild('inputGroupAddOn') set content(content: ElementRef) {
        this.inputGroupAddonEl = content;
    }

    /** @hidden */
    inputGroupAddonEl: ElementRef;

    /** Used to add focus class to the tokenizer-example */
    @Input()
    tokenizerHasFocus: boolean = false;

    /** Whether the tokenizer is compact */
    @Input()
    compact: boolean = false;

    /** The value for the tokenizer input */
    @Input()
    inputValue: string;

    /** Icon of the button on the right of the input field. */
    @Input()
    glyph: string;

    /** Word to use for when there are extra tokens. */
    @Input()
    moreTerm: string = 'more';

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
    ngAfterViewInit(): void {
        if (this.input && this.input.elementRef()) {
            this.input.elementRef().nativeElement.addEventListener('keydown', (event) => {
                this.handleKeyDown(event, this.tokenList.length);
            });
        }
        if (this.tokenList) {
            this.previousTokenCount = this.tokenList.length;
        }
        this.handleTokenClickSubscriptions();
        // watch for changes to the tokenList and attempt to expand/collapse tokens as needed
        this.tokenListChangesSubscription = this.tokenList.changes.subscribe(() => {
            this.previousTokenCount > this.tokenList.length ? this._expandTokens() : this._collapseTokens();
            this.previousTokenCount = this.tokenList.length;
            this.handleTokenClickSubscriptions();
        });
        if (!this.compact) {
            // because justify-content breaks scrollbar, it cannot be used on cozy screens, so use JS to scroll to the end
            this.tokenizerInnerEl.nativeElement.scrollLeft =
                this.tokenizerInnerEl.nativeElement.scrollWidth - this.tokenizerInnerEl.nativeElement.clientWidth;
        }
    }

    /** @hidden */
    ngAfterContentInit() {
        this.previousElementWidth = this._elementRef.nativeElement.getBoundingClientRect().width;
        this.onResize();
    }

    /** @hidden */
    ngOnDestroy(): void {
        this.tokenList.forEach((token) => {
            if (token.onTokenClick) {
                token.onTokenClick.unsubscribe();
            }
        });
        if (this.tokenListChangesSubscription) {
            this.tokenListChangesSubscription.unsubscribe();
        }
    }

    /** @hidden */
    ngOnInit(): void {
        this.buildComponentCssClass();
    }

    /** @hidden */
    ngOnChanges(): void {
        this.buildComponentCssClass();
    }

    constructor(private _elementRef: ElementRef, private cdRef: ChangeDetectorRef, @Optional() private _rtlService: RtlService) {}

    @applyCssClass
    /** CssClassBuilder interface implementation
     * function must return single string
     * function is responsible for order which css classes are applied
     */
    buildComponentCssClass(): string {
        return [
            this.class
        ]
            .filter((x) => x !== '')
            .join(' ');
    }

    elementRef(): ElementRef<any> {
        return this._elementRef;
    }

    /** @hidden */
    handleTokenClickSubscriptions(): void {
        this.tokenList.forEach((token, index) => {
            token.onTokenClick.subscribe((event) => {
                this.focusTokenElement(event, index);
            });
        });
    }

    /** @hidden */
    focusTokenElement(event: Event, newIndex: number): HTMLElement {
        let elementToFocus: HTMLElement;
        if (newIndex >= 0 && newIndex < this.tokenList.length) {
            elementToFocus = this.tokenList
                .filter((element, index) => index === newIndex)[0]
                .elementRef.nativeElement.querySelector('.fd-token');
            // element needs tabindex in order to be focused
            elementToFocus.setAttribute('tabindex', '0');
            elementToFocus.focus();
            this.addKeyboardListener(elementToFocus, newIndex);
        }

        return elementToFocus;
    }

    /** @hidden */
    addKeyboardListener(element: HTMLElement, newIndex: number): void {
        // function needs to be defined in order to be referenced later by addEventListener/removeEventListener
        const handleFunctionReference = (e) => {
            if (newIndex || newIndex === 0) {
                this.handleKeyDown(e, newIndex);
            }
        };
        element.addEventListener('keydown', handleFunctionReference);
        element.addEventListener('blur', () => {
            element.setAttribute('tabindex', '-1');
            element.removeEventListener('keydown', handleFunctionReference);
        });
    }

    /** @hidden */
    @HostListener('window:resize', [])
    onResize(): void {
        if (this._elementRef) {
            const elementWidth = this._elementRef.nativeElement.getBoundingClientRect().width;
            // if the element is geting smaller, try collapsing tokens
            if (elementWidth <= this.previousElementWidth) {
                this._collapseTokens();
            } else {
                this._expandTokens(); // if it's getting bigger, try expanding
            }
            this.previousElementWidth = elementWidth;
        }
    }

    /** @hidden */
    handleKeyDown(event: KeyboardEvent, fromIndex: number): void {
        let newIndex: number;
        const rtl = this._rtlService && this._rtlService.rtl ? this._rtlService.rtl.getValue() : false;
        if ((event.code === 'ArrowLeft' && !rtl) || (event.code === 'ArrowRight' && rtl)) {
            this._handleArrowLeft(fromIndex);
            newIndex = fromIndex - 1;
        } else if ((event.code === 'ArrowRight' && !rtl) || (event.code === 'ArrowLeft' && rtl)) {
            this._handleArrowRight(fromIndex);
            newIndex = fromIndex + 1;
        }
        if (
            newIndex === this.tokenList.length &&
            ((event.code === 'ArrowRight' && !rtl) || (event.code === 'ArrowLeft' && rtl))
        ) {
            this.input.elementRef().nativeElement.focus();
        } else if (
            newIndex > this.tokenList.length - this.moreTokensRight.length &&
            document.activeElement === this.input.elementRef().nativeElement
        ) {
            this.focusTokenElement(event, newIndex - this.moreTokensRight.length);
        } else if (newIndex || newIndex === 0) {
            this.focusTokenElement(event, newIndex);
        }
    }

    /** @hidden */
    getCombinedTokenWidth(): number {
        let totalTokenWidth = 0;
        // get the width of each token
        this.tokenList.forEach((token) => {
            totalTokenWidth = totalTokenWidth + token.elementRef.nativeElement.getBoundingClientRect().width;
        });
        // add input width
        if (this.input && this.input.elementRef()) {
            totalTokenWidth = totalTokenWidth + this.input.elementRef().nativeElement.getBoundingClientRect().width;
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
    private _handleArrowLeft(fromIndex: number): void {
        // if the leftmost visible token is selected, and there are moreTokensLeft, need to display a moreTokenLeft
        if (fromIndex === this.moreTokensLeft.length) {
            const poppedToken = this.moreTokensLeft.pop();
            if (poppedToken) {
                this._makeElementVisible(poppedToken.elementRef);
            }
            // and then hide any tokens from the right that no longer fit
            this._collapseTokens('right');
        }
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
        }
    }

    /** @hidden */
    private _collapseTokens(side?: string): void {
        if (this.compact) {
            let elementWidth = this._elementRef.nativeElement.getBoundingClientRect().width;
            let combinedTokenWidth = this.getCombinedTokenWidth(); // the combined width of all tokens, the "____ more" text, and the input
            let i = 0;
            /*
             When resizing, we want to collapse the tokens on the left first. However when the user is navigating through a
             a group of overflowing tokens using the arrow left key, we may need to hide tokens on the right. So if this
             function has been called with the param 'right' it will collapse tokens from the right side of the list rather
             than the (default) left side.
             */
            if (side === 'right') {
                i = this.tokenList.length - 1;
            }
            while (combinedTokenWidth > elementWidth && (side === 'right' ? i >= 0 : i < this.tokenList.length)) {
                // loop through the tokens and hide them until the combinedTokenWidth fits in the elementWidth
                const token = this.tokenList.filter((item, index) => index === i)[0];
                const moreTokens = side === 'right' ? this.moreTokensRight : this.moreTokensLeft;
                if (moreTokens.indexOf(token) === -1) {
                    moreTokens.push(token);
                }
                token.elementRef.nativeElement.style.display = 'none';
                // get the new elementWidth and combinedTokenWidth as these will have changed after setting a token display to 'none'
                elementWidth = this._elementRef.nativeElement.getBoundingClientRect().width;
                combinedTokenWidth = this.getCombinedTokenWidth();
                side === 'right' ? i-- : i++;
                this.cdRef.markForCheck();
            }
        }
    }

    /** @hidden */
    private _expandTokens(): void {
        if (this.compact) {
            let elementWidth = this._elementRef.nativeElement.getBoundingClientRect().width;
            let combinedTokenWidth = this.getCombinedTokenWidth(); // the combined width of all tokens, the "____ more" text, and the input

            let breakLoop = false;
            let i = this.moreTokensLeft.length - 1 + this.moreTokensRight.length;
            while (combinedTokenWidth < elementWidth && i >= 0 && !breakLoop) {
                // we want to get the first hidden token and check to see if it can fit in the whole tokenizer
                const tokenToCheck = this.tokenList.filter(
                    (token) => token.elementRef.nativeElement.style.display === 'none'
                )[i];
                /*
                  set display: 'inline-block' and visibility: 'hidden' - this way, the tokenizer width will
                  contain the width of the token we might display, without actually making the token visible to the user
                 */
                tokenToCheck.elementRef.nativeElement.style.display = 'inline-block';
                tokenToCheck.elementRef.nativeElement.style.visibility = 'hidden';
                elementWidth = this._elementRef.nativeElement.getBoundingClientRect().width;
                combinedTokenWidth = this.getCombinedTokenWidth();
                /*
                  if the width of the inner tokenizer component is still smaller than the whole tokenizer component, we'll
                  make the token visible and reduce the hidden count
                */
                if (combinedTokenWidth < elementWidth) {
                    tokenToCheck.elementRef.nativeElement.style.visibility = 'visible';
                    if (this.moreTokensLeft.length) {
                        this.moreTokensLeft.pop();
                    } else if (this.moreTokensRight.length) {
                        this.moreTokensRight.pop();
                    }
                } else {
                    // otherwise, stop looping and set the token's display back to 'none'
                    tokenToCheck.elementRef.nativeElement.style.display = 'none';
                    breakLoop = true;
                }
                i--;
                this.cdRef.markForCheck();
            }
        }
    }

    /** @hidden */
    private _makeElementVisible(elementRef: ElementRef): void {
        elementRef.nativeElement.style.display = 'inline-block';
        elementRef.nativeElement.style.visibility = 'visible';
    }
}
