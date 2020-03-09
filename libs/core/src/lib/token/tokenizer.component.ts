import {
    AfterContentInit,
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    ContentChildren, ElementRef,
    forwardRef, HostListener,
    Input,
    QueryList,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { FormControlDirective } from '../form/form-control/form-control.directive';
import { TokenComponent } from './token.component';
import { InputGroupAddOnDirective } from '../input-group/input-group-directives';

@Component({
  selector: 'fd-tokenizer',
  templateUrl: './tokenizer.component.html',
  styleUrls: ['./tokenizer.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TokenizerComponent implements AfterViewInit, AfterContentInit {

    /** @hidden */
    @ContentChildren(forwardRef(() => TokenComponent))
    tokenList: QueryList<TokenComponent>;

    /** @hidden */
    @ContentChild(forwardRef(() => FormControlDirective), {static: true})
    input: FormControlDirective;

    /** @hidden */
    @ViewChild('moreElement', {static: true})
    moreElement: ElementRef;

    @ViewChild(InputGroupAddOnDirective, {static: true})
    inputGroupAddonEl: ElementRef;

    /** Used to add focus class to the tokenizer-example */
    @Input()
    tokenizerHasFocus: boolean = false;

    /** Whether the tokenizer-example is compact */
    @Input()
    compact: boolean = false;

    /** The value for the tokenizer input */
    @Input()
    inputValue: string;

    /** @hidden */
    @Input()
    inMultiInput: boolean = false;

    /** @hidden */
    previousElementWidth: number;

    /** @hidden */
    moreTokens: Array<TokenComponent> = [];

    /** @hidden */
    previousTokenCount: number;

    /** @hidden */
    ngAfterViewInit(): void {
        if (this.input && this.input.elementRef) {
            this.input.elementRef.nativeElement.addEventListener('keydown', (event) => {
                this.handleKeyDown(event, this.tokenList.length);
            });
        }
        if (this.tokenList) {
            this.previousTokenCount = this.tokenList.length;
        }
        this.tokenList.changes.subscribe(() => {
            this.previousTokenCount > this.tokenList.length ? this.expandTokens() : this.collapseTokens();
            this.previousTokenCount = this.tokenList.length;
        });
    }

    /** @hidden */
    handleKeyDown(event: KeyboardEvent, fromIndex: number): void {
        let newIndex: number;
        if (event.code === 'ArrowLeft') {
            newIndex = fromIndex - 1;
        } else if (event.code === 'ArrowRight') {
            newIndex = fromIndex + 1;
        }
        if (newIndex === this.tokenList.length && event.code === 'ArrowRight') {
            this.input.elementRef.nativeElement.focus();
        } else if (newIndex || newIndex === 0) {
            this.focusTokenElement(event, newIndex);
        }
    }

    /** @hidden */
    focusTokenElement(event: KeyboardEvent, newIndex: number): HTMLElement {
        let elementToFocus: HTMLElement;
        if (newIndex >= 0 && newIndex < this.tokenList.length) {
            elementToFocus = this.tokenList.filter((element, index) => index === newIndex)[0]
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
        if (this.elementRef) {
            const elementWidth = this.elementRef.nativeElement.getBoundingClientRect().width;
            // if the element is geting smaller, try collapsing tokens
            if (elementWidth <= this.previousElementWidth) {
                this.collapseTokens();
            } else {
                this.expandTokens(); // if it's getting bigger, try expanding
            }
            this.previousElementWidth = elementWidth;
        }
    }

    /** @hidden */
    collapseTokens(): void {
        if (this.inMultiInput) {
            let elementWidth = this.elementRef.nativeElement.getBoundingClientRect().width; // the fd-tokenizer element
            let innerWidth = this.getInnerWidth(); // the combined width of all tokens, the "____ more" text, and the input
            let i = 0;
            while (innerWidth >= elementWidth && i < this.tokenList.length) {
                // loop through the tokens and hide them until the innerWidth fits in the elementWidth
                const token = this.tokenList.filter((item, index) => index === i)[0];
                if (this.moreTokens.indexOf(token) === -1) {
                    this.moreTokens.push(token);
                }
                token.elementRef.nativeElement.style.display = 'none';
                // get the new elementWidth and innerWidth as these will have changed after setting a token display to 'none'
                elementWidth = this.elementRef.nativeElement.getBoundingClientRect().width;
                innerWidth = this.getInnerWidth();
                i++;
                this.cdRef.detectChanges();
            }
        }
    }

    /** @hidden */
    expandTokens(): void {
        if (this.inMultiInput) {
            let elementWidth = this.elementRef.nativeElement.getBoundingClientRect().width; // the fd-tokenizer element
            let innerWidth = this.getInnerWidth(); // the combined width of all tokens, the "____ more" text, and the input
            let breakLoop = false;
            let i = this.moreTokens.length - 1;
            while (innerWidth < elementWidth && i >= 0 && !breakLoop) {
                // we want to get the first hidden token and check to see if it can fit in the whole tokenizer
                const tokenToCheck = this.tokenList.filter(token => token.elementRef.nativeElement.style.display === 'none')[i];
                /*
                  set display: 'inline-block' and visibility: 'hidden' - this way, the tokenizer width will
                  contain the width of the token we might display, without actually making the token visible to the user
                 */
                tokenToCheck.elementRef.nativeElement.style.display = 'inline-block';
                tokenToCheck.elementRef.nativeElement.style.visibility = 'hidden';
                elementWidth = this.elementRef.nativeElement.getBoundingClientRect().width;
                innerWidth = this.getInnerWidth();
                /*
                  if the width of the inner tokenizer component is still smaller than the whole tokenizer component, we'll
                  make the token visible and reduce the hidden count
                */
                if (innerWidth < elementWidth) {
                    tokenToCheck.elementRef.nativeElement.style.visibility = 'visible';
                    this.moreTokens.pop();
                } else {
                    // otherwise, stop looping and set the token's display back to 'none'
                    tokenToCheck.elementRef.nativeElement.style.display = 'none';
                    breakLoop = true;
                }
                i--;
                this.cdRef.detectChanges();
            }
        }
    }

    /** @hidden */
    getInnerWidth(): number {
        let totalTokenWidth = 0;
        // get the width of each token
        this.tokenList.forEach(token => {
            totalTokenWidth = totalTokenWidth + token.elementRef.nativeElement.getBoundingClientRect().width;
        });
        // add input width
        if (this.input && this.input.elementRef) {
            totalTokenWidth = totalTokenWidth + this.input.elementRef.nativeElement.getBoundingClientRect().width;
        }
        // add the width of the "____ more" element
        if (this.moreTokens.length > 0 && this.moreElement && this.moreElement.nativeElement) {
            totalTokenWidth = totalTokenWidth + this.moreElement.nativeElement.getBoundingClientRect().width;
        }
        // add the input group addon
        if (this.inputGroupAddonEl && this.inputGroupAddonEl.nativeElement) {
            totalTokenWidth = totalTokenWidth + this.inputGroupAddonEl.nativeElement.getBoundingClientRect().width;
        }

        return totalTokenWidth;
    }

    /** @hidden */
    ngAfterContentInit() {
        this.previousElementWidth = this.elementRef.nativeElement.getBoundingClientRect().width;
        this.onResize();
    }

    constructor(public elementRef: ElementRef, private cdRef: ChangeDetectorRef) {}

}
