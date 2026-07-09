import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { UI5WrapperCustomEvent } from '@fundamental-ngx/ui5-webcomponents-base';
import { Button } from '@fundamental-ngx/ui5-webcomponents/button';
import { Label } from '@fundamental-ngx/ui5-webcomponents/label';
import { Popover } from '@fundamental-ngx/ui5-webcomponents/popover';
import { Slider } from '@fundamental-ngx/ui5-webcomponents/slider';

@Component({
    selector: 'ui5-min-width-popover',
    templateUrl: './min-width-popover.html',
    styleUrls: ['./min-width-popover.scss'],
    imports: [Popover, Button, Label, Slider],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MinWidthPopoverExample {
    readonly popoverOpen = signal(false);
    readonly minWidth = signal(200);

    onSliderChange(event: UI5WrapperCustomEvent<Slider, 'ui5Change'>): void {
        this.minWidth.set(event.currentTarget.value);
    }

    togglePopover(): void {
        this.popoverOpen.update((open) => !open);
    }
}
