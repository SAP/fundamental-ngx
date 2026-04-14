import { ChangeDetectionStrategy, Component, contentChild, input } from '@angular/core';
import { CLASS_NAME } from '../constants';
import { FD_CARD_MAIN_HEADER } from '../token';

@Component({
    selector: 'fd-card-header',
    template: `<ng-content></ng-content>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [],
    host: {
        role: 'group',
        class: CLASS_NAME.cardHeader,
        '[class.fd-card__header--interactive]': 'cardMainHeader()?.interactive()',
        '[attr.aria-roledescription]': 'ariaRoleDescription()'
    }
})
export class CardHeaderComponent {
    /**
     * aria-roledescription for the container
     * default: 'Card Header'
     */
    readonly ariaRoleDescription = input('Card Header');

    /** @hidden */
    readonly cardMainHeader = contentChild(FD_CARD_MAIN_HEADER);
}
