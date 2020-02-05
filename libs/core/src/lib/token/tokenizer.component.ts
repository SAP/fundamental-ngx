import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ContentChild,
    ContentChildren,
    forwardRef,
    Input,
    QueryList,
    ViewEncapsulation
} from '@angular/core';
import { FormControlDirective, TokenComponent } from '@fundamental-ngx/core';

@Component({
  selector: 'fd-tokenizer',
  templateUrl: './tokenizer.component.html',
  styleUrls: ['./tokenizer.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TokenizerComponent implements AfterViewInit {

    @ContentChildren(forwardRef(() => TokenComponent))
    tokenList: QueryList<TokenComponent>;

    @ContentChild(forwardRef(() => FormControlDirective), {static: true})
    input: FormControlDirective;

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
    ngAfterViewInit(): void {
        if (this.input && this.input.elementRef) {
            this.input.elementRef.nativeElement.addEventListener('keydown', (event) => {
                this.handleKeyDown(event, this.tokenList.length);
            });
        }
    }

    /** @hidden */
    handleKeyDown(event, fromIndex): void {
        let newIndex;
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
    focusTokenElement(event, newIndex): HTMLElement {
        // function needs to be defined in order to be referenced later by addEventListener/removeEventListener
        const handleFunctionReference = (e) => {
            if (newIndex || newIndex === 0) {
                this.handleKeyDown(e, newIndex);
            }
        };
        let elementToFocus;
        if (newIndex >= 0 && newIndex < this.tokenList.length) {
            elementToFocus = this.tokenList.filter((element, index) => index === newIndex)[0]
                .elementRef.nativeElement.querySelector('.fd-token');
            // element needs tabindex in order to be focused
            elementToFocus.setAttribute('tabindex', '0');
            elementToFocus.focus();
            elementToFocus.addEventListener('keydown', handleFunctionReference);
            elementToFocus.addEventListener('blur', () => {
                elementToFocus.setAttribute('tabindex', '-1');
                elementToFocus.removeEventListener('keydown', handleFunctionReference);
            });
        }

        return elementToFocus;
    }

}
