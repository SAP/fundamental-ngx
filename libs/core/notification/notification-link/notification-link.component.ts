import { Component, signal } from '@angular/core';

@Component({
    selector: 'fd-notification-link',
    standalone: true,
    template: `<span class="fd-link__content">{{ showMore() ? 'Less' : 'More' }}</span>`,
    host: {
        class: 'fd-link fd-notification__link',
        tabindex: '0',
        role: 'link',
        '(click)': 'toggleShowMore()'
    }
})
export class NotificationLinkComponent {
    /**
     * signal to control the show more/less
     * default value is false
     */
    showMore = signal(false);

    /**
     * Method to toggle show more functionality
     */
    toggleShowMore(): void {
        this.showMore.update((value) => !value);
    }
}
