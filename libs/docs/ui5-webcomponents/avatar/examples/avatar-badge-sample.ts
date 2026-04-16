import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, signal } from '@angular/core';
import { Avatar } from '@fundamental-ngx/ui5-webcomponents/avatar';
import { getIconData } from '@ui5/webcomponents-base/dist/asset-registries/Icons.js';
import '@ui5/webcomponents/dist/AvatarBadge.js';

// Workaround: AvatarBadge uses getIconDataSync() in onBeforeRendering(), which returns undefined
// if icons haven't loaded yet (they load asynchronously). This causes the badge to set invalid=true
// and hide via CSS. The Icon component handles this correctly with async getIconData().
// We pre-load icons and defer rendering until they're registered.
const badgeIcons = ['edit', 'camera', 'add', 'accept', 'alert', 'error', 'hint'];

@Component({
    selector: 'ui5-avatar-badge-sample',
    templateUrl: './avatar-badge-sample.html',
    imports: [Avatar],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AvatarBadgeSample {
    iconsLoaded = signal(false);

    constructor() {
        Promise.all(badgeIcons.map((icon) => getIconData(icon))).then(() => {
            this.iconsLoaded.set(true);
        });
    }
}
