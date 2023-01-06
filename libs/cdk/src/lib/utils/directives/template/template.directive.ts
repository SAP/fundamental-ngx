import { Directive, Input, TemplateRef } from '@angular/core';
import {
    DeprecatedSelector,
    FD_DEPRECATED_DIRECTIVE_SELECTOR,
    getDeprecatedModel
} from '../../deprecated-selector.class';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fdTemplate]',
    standalone: true,
    providers: [
        {
            provide: FD_DEPRECATED_DIRECTIVE_SELECTOR,
            useValue: getDeprecatedModel('[fdkTemplate]', '[fdTemplate]')
        }
    ]
})
export class DeprecatedTemplateSelectorDirective extends DeprecatedSelector {}

@Directive({
    selector: '[fdkTemplate], [fdTemplate]',
    standalone: true
})
export class TemplateDirective {
    /** Name of the template */
    @Input('fdkTemplate')
    name: string;

    /** @hidden */
    constructor(public templateRef: TemplateRef<any>) {}

    /** @hidden */
    getName(): string {
        return this.name;
    }
}
