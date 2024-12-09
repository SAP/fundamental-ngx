import { ChangeDetectionStrategy, Component, contentChild, input } from '@angular/core';
import { FD_CARD_MAIN_HEADER } from '../token';

@Component({
    selector: 'fd-card-header',
    template: `<ng-content></ng-content>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [],
    host: {
        role: 'group',
        class: 'fd-card__header',
        '[class.fd-card__header--interactive]': '_cardMainHeader()?.interactive()',
        '[attr.aria-roledescription]': 'ariaRoleDescription()'
    }
})
export class CardHeaderComponent {
    /**
     * aria-roledescription for the container
     * default: 'Card Header'
     */
    ariaRoleDescription = input('Card Header');

    /** @hidden */
    readonly _cardMainHeader = contentChild(FD_CARD_MAIN_HEADER);
}
