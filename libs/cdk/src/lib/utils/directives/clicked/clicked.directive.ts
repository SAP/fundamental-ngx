import { Directive, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';
import {
    DeprecatedSelector,
    FD_DEPRECATED_DIRECTIVE_SELECTOR,
    getDeprecatedModel
} from '../../deprecated-selector.class';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fnClicked]',
    standalone: true,
    providers: [
        {
            provide: FD_DEPRECATED_DIRECTIVE_SELECTOR,
            useValue: getDeprecatedModel('[fdkClicked]', '[fnClicked]')
        }
    ]
})
export class DeprecatedClickedDirective extends DeprecatedSelector {}

@Directive({
    selector: '[fdkClicked]'
})
export class ClickedDirective {
    /**
     * Event name.
     */
    static eventName = 'fdkClicked';
    /**
     * FdkClicked output. Sole purpose of existence of this directive is to just silence Angular Language Service.
     * This is only viable solution, since NO_ERRORS_SCHEMA silences everything and valuable exception might slip
     * through your eyes.
     */
    @Output() fdkClicked: Observable<MouseEvent | KeyboardEvent> = new EventEmitter();
}
