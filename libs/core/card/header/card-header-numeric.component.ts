import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
    selector: 'fd-card-numeric-header',
    template: `<ng-content></ng-content>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [],
    host: {
        role: 'group',
        class: 'fd-card__header-numeric',
        '[attr.aria-roledescription]': 'ariaRoleDescription()'
    }
})
export class CardNumericHeaderComponent {
    /**
     * aria-roledescription for the container
     * default: 'Numeric content'
     */
    ariaRoleDescription = input('Numeric content');
}
