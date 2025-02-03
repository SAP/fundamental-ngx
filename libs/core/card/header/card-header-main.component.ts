import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, contentChild, input } from '@angular/core';
import { FD_AVATAR_COMPONENT } from '@fundamental-ngx/core/avatar';
import {
    FD_CARD_COUNTER,
    FD_CARD_HEADER_ACTION,
    FD_CARD_KPI_HEADER,
    FD_CARD_MAIN_HEADER,
    FD_CARD_SECOND_SUBTITLE,
    FD_CARD_SUBTITLE,
    FD_CARD_TITLE
} from '../token';

@Component({
    selector: 'fd-card-main-header',
    templateUrl: './card-header-main.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: FD_CARD_MAIN_HEADER,
            useExisting: CardMainHeaderComponent
        }
    ],
    imports: [NgClass]
})
export class CardMainHeaderComponent {
    /**
     * whether the main header is interactive
     * default: false
     */
    interactive = input(false);

    /**
     * Text for the title, aria-label and aria-description
     * of the main container with role button
     * when the card main header is interactive
     * default: "Activate for action/navigation"
     */
    title = input('Activate for action/navigation');

    /** @hidden */
    readonly _cardTitle = contentChild(FD_CARD_TITLE);

    /** @hidden */
    readonly _cardSubtitle = contentChild(FD_CARD_SUBTITLE);

    /** @hidden */
    readonly _cardCounter = contentChild(FD_CARD_COUNTER);

    /** @hidden */
    readonly _cardHeaderAction = contentChild(FD_CARD_HEADER_ACTION);

    /** @hidden */
    readonly _cardKpiHeader = contentChild(FD_CARD_KPI_HEADER);

    /** @hidden */
    readonly _cardSecondSubtitle = contentChild(FD_CARD_SECOND_SUBTITLE);

    /** @hidden */
    readonly _cardAvatar = contentChild(FD_AVATAR_COMPONENT);
}
