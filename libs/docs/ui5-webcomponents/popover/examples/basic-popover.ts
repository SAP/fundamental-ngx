import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { Button } from '@fundamental-ngx/ui5-webcomponents/button';
import { Input } from '@fundamental-ngx/ui5-webcomponents/input';
import { Label } from '@fundamental-ngx/ui5-webcomponents/label';
import { Popover } from '@fundamental-ngx/ui5-webcomponents/popover';

@Component({
    selector: 'ui5-basic-popover',
    templateUrl: './basic-popover.html',
    styleUrls: ['./basic-popover.scss'],
    standalone: true,
    imports: [Popover, Button, Input, Label],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BasicPopoverExample {
    popoverOpen = signal(false);

    buttonLabel = computed(() => (this.popoverOpen() ? 'Close Popover' : 'Open Popover'));
    buttonLabel2 = computed(() => (this.popoverOpen() ? 'Close' : 'Open'));
}
