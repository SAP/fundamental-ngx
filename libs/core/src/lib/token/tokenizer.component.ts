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
    ngAfterViewInit() {
        this.input.elementRef.nativeElement.addEventListener('keydown', (event) => this.inputKeyDown(event));
    }

    /** @hidden */
    inputKeyDown(event) {
        if (event.key === 'ArrowLeft') {
            this.handleTokenFocus(event, this.tokenList.length);
        }
    }

    /** @hidden */
    handleTokenFocus(event, fromIndex) {
        let newIndex;
        // function needs to be defined in order to be referenced later by addEventListener/removeEventListener
        const handleFunctionReference = (e) => {
            if (newIndex || newIndex === 0) {
                this.handleTokenFocus(e, newIndex);
            }
        };
        if (event.code === 'ArrowLeft' || event.code === 'ArrowRight') {
            let elementToFocus;
            if (event.code === 'ArrowLeft') {
                newIndex = fromIndex - 1;
            } else if (event.code === 'ArrowRight') {
                newIndex = fromIndex + 1;
            }
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
            } else if (newIndex === this.tokenList.length && event.code === 'ArrowRight') {
                this.input.elementRef.nativeElement.focus();
            }
        }
    }

}
