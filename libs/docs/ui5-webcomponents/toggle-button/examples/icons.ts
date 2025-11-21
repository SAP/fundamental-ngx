import { Component, signal } from '@angular/core';
import { ToggleButton } from '@fundamental-ngx/ui5-webcomponents/toggle-button';

// Import SAP Icons
import '@ui5/webcomponents-icons/dist/bookmark.js';
import '@ui5/webcomponents-icons/dist/favorite.js';
import '@ui5/webcomponents-icons/dist/media-pause.js';
import '@ui5/webcomponents-icons/dist/media-play.js';
import '@ui5/webcomponents-icons/dist/sound-off.js';
import '@ui5/webcomponents-icons/dist/sound.js';
import '@ui5/webcomponents-icons/dist/unfavorite.js';

@Component({
    selector: 'ui5-toggle-button-icons-sample',
    templateUrl: './icons.html',
    standalone: true,
    imports: [ToggleButton]
})
export class ToggleButtonIconsSample {
    readonly favoritePressed = signal(false);
    readonly bookmarkPressed = signal(false);
    readonly playPressed = signal(false);
    readonly soundPressed = signal(true);

    toggleFavorite(): void {
        this.favoritePressed.update(() => !this.favoritePressed());
    }

    toggleBookmark(): void {
        this.bookmarkPressed.update(() => !this.bookmarkPressed());
    }

    togglePlay(): void {
        this.playPressed.update(() => !this.playPressed());
    }

    toggleSound(): void {
        this.soundPressed.update(() => !this.soundPressed());
    }
}
