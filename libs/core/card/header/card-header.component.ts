import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
    selector: 'fd-card-header',
    template: `<ng-content></ng-content>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [],
    host: {
        role: 'group',
        class: 'fd-card__header',
        '[attr.aria-roledescription]': 'ariaRoleDescription()'
    }
})
export class CardHeaderComponent {
    /**
     * aria-roledescription for the container
     * default: 'Card Header'
     */
    ariaRoleDescription = input('Card Header');
}
