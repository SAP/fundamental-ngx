import { ChangeDetectionStrategy, Component, ContentChild, Input, TemplateRef, ViewEncapsulation } from '@angular/core';

import { FormInputMessageGroupComponent } from '@fundamental-ngx/core/form';
import { TriggerConfig } from '@fundamental-ngx/core/popover';

/**
 * This extends core implementation  to support richer extensibility and instead of relying
 * only on ng-content selector this will allow you to put any content as trigger.
 *
 * Let's think of u
 */
@Component({
    selector: 'fdp-input-message-group',
    templateUrl: './input-message-group-with-template.component.html',
    styleUrls: ['./input-message-group-with-template.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class InputMessageGroupWithTemplate extends FormInputMessageGroupComponent {
    /**
     * To allow user to determine what event he wants to trigger the messages to show
     * Accepts any [HTML DOM Events](https://www.w3schools.com/jsref/dom_obj_event.asp).
     */
    @Input()
    triggers: (string | TriggerConfig)[] = [
        {
            trigger: 'focusin',
            openAction: true,
            closeAction: false
        },
        {
            trigger: 'focusout',
            openAction: false,
            closeAction: true
        }
    ];
    /**
     * Custom trigger element.
     */
    @ContentChild('triggerItem', { static: false })
    triggerItemTemplate: TemplateRef<any>;
}
