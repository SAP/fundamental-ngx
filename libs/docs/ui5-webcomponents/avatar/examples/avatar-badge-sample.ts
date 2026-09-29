import { ChangeDetectionStrategy, Component, computed, CUSTOM_ELEMENTS_SCHEMA, signal } from '@angular/core';
import { Avatar } from '@fundamental-ngx/ui5-webcomponents/avatar';
import { getIconData } from '@ui5/webcomponents-base/dist/asset-registries/Icons.js';
import '@ui5/webcomponents/dist/AvatarBadge.js';

// Workaround: AvatarBadge uses getIconDataSync() in onBeforeRendering(), which returns undefined
// if icons haven't loaded yet (they load asynchronously). This causes the badge to set invalid=true
// and hide via CSS. The Icon component handles this correctly with async getIconData().
// We pre-load icons and defer rendering until they're registered.
const badgeIcons = ['edit', 'camera', 'add', 'accept', 'alert', 'error', 'hint', 'employee'];

@Component({
    selector: 'ui5-avatar-badge-sample',
    templateUrl: './avatar-badge-sample.html',
    imports: [Avatar],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    changeDetection: ChangeDetectionStrategy.OnPush,
    styles: [
        `
            section {
                display: flex;
                gap: 1rem;
                align-items: center;
                padding: 1rem;
                flex-wrap: wrap;
            }
        `
    ]
})
export class AvatarBadgeSample {
    iconsLoaded = signal(false);

    readonly colorSchemes = computed(() => Array.from({ length: 10 }, (_, i) => (i + 1).toString()));

    constructor() {
        Promise.all(badgeIcons.map((icon) => getIconData(icon))).then(() => {
            this.iconsLoaded.set(true);
        });
    }
}
