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

    ngAfterViewInit() {
        this.input.elementRef.nativeElement.addEventListener('keydown', (event) => this.inputKeyDown(event));
    }

    inputKeyDown(event) {
        if (event.key === 'ArrowLeft') {
            const lastToken = this.tokenList.last.elementRef.nativeElement.querySelector('.fd-token');
            lastToken.setAttribute('tabindex', '0');
            lastToken.focus();
            lastToken.addEventListener('blur', () => lastToken.setAttribute('tabindex', '-1'));
        }
    }

}
