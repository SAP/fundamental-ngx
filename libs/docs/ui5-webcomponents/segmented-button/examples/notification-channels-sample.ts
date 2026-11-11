import { Component, computed, viewChild } from '@angular/core';
import { SegmentedButton } from '@fundamental-ngx/ui5-webcomponents/segmented-button';
import { SegmentedButtonItem } from '@fundamental-ngx/ui5-webcomponents/segmented-button-item';

@Component({
    selector: 'ui5-notification-channels-sample',
    templateUrl: './notification-channels-sample.html',
    imports: [SegmentedButton, SegmentedButtonItem]
})
export class NotificationChannelsSample {
    protected readonly channelPicker = viewChild(SegmentedButton);

    protected readonly selectedChannelsSummary = computed(() => {
        const selectedItems = this.channelPicker()?.selectedItems() ?? [];
        const channels = selectedItems
            .map((item) => item.textContent?.trim() ?? '')
            .filter((channel) => channel.length > 0);

        if (channels.length === 0) {
            return 'No channels selected — 0 channels';
        }

        const names =
            channels.length === 1
                ? channels[0]
                : channels.slice(0, -1).join(', ') + ' and ' + channels[channels.length - 1];
        const countLabel = channels.length === 1 ? 'channel' : 'channels';

        return names + ' selected — ' + channels.length + ' ' + countLabel;
    });
}
