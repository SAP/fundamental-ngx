import { Directive } from '@angular/core';
import { ToolHeaderButtonDirective } from '@fundamental-ngx/btp/button';
import { FocusableItemDirective, IndirectFocusableItemDirective } from '@fundamental-ngx/cdk/utils';

@Directive({
    selector: '[fd-button][fdbToolHeaderActionButton]',
    standalone: true,
    hostDirectives: [
        { directive: ToolHeaderButtonDirective, inputs: ['fdType'] },
        IndirectFocusableItemDirective,
        FocusableItemDirective
    ],
    host: {
        '[class.fd-tool-header__action-button]': 'true'
    }
})
export class ToolHeaderActionButtonDirective {}
