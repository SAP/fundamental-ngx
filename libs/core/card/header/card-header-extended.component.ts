import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
    selector: 'fd-card-extended-header',
    template: `<ng-content></ng-content>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    host: {
        role: 'group',
        class: 'fd-card__header-extended',
        '[class.fd-card__header-extended--top-aligned]': 'align() === "top"',
        '[class.fd-card__header-extended--bottom-aligned]': 'align() === "bottom"',
        '[attr.aria-roledescription]': 'ariaRoleDescription()'
    }
})
export class CardExtendedHeaderComponent {
    /**
     * aria-roledescription for the container
     * default: 'Extended content'
     */
    ariaRoleDescription = input('Extended content');

    /**
     * vertical alignment of the elements inside the header columns
     * possible options: 'top' | 'bottom' | null
     * default: null (middle)
     */
    align = input<'top' | 'bottom' | null>(null);
}
