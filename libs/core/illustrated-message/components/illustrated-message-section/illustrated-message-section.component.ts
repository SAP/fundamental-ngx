import { booleanAttribute, ChangeDetectionStrategy, Component, computed, contentChild, input } from '@angular/core';
import { IllustratedMessageTitleDirective } from '../../directives/illustrated-message-title/illustrated-message-title.directive';

let illustratedMessageSectionId = 0;

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: '[fd-illustrated-message-section]',
    template: `<span [attr.id]="id()" class="fd-illustrated-message__sr-only">{{ ariaLabel() }}</span>
        <ng-content></ng-content>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        role: 'region',
        '[attr.aria-labelledby]': 'ariaLabelledby()',
        '[class.fd-illustrated-message-responsive-container]': 'responsive()'
    },
    standalone: true
})
export class IllustratedMessageSectionComponent {
    /** Aria label for the Illustrated Message */
    ariaLabel = input<string>();

    /** Whether the Illustrated Message is responsive
     *  Default value is false  */
    responsive = input(false, { transform: booleanAttribute });

    /** Illustrated Message Section ID
     *  Default value is provided if not set  */
    id = input('fd-illustrated-message-section-id-' + ++illustratedMessageSectionId);

    /** @hidden */
    illustratedMessageTitle = contentChild<IllustratedMessageTitleDirective>(IllustratedMessageTitleDirective, {
        descendants: true
    });

    /** @hidden */
    ariaLabelledby = computed(() => `${this.id()} ${this.illustratedMessageTitle()?.id()}`);
}
