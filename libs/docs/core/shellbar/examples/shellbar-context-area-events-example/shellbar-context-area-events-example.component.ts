import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { AvatarComponent } from '@fundamental-ngx/core/avatar';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { InfoLabelComponent } from '@fundamental-ngx/core/info-label';
import { ObjectStatusComponent } from '@fundamental-ngx/core/object-status';
import { PopoverBodyComponent, PopoverComponent, PopoverControlComponent } from '@fundamental-ngx/core/popover';
import { ShellbarModule } from '@fundamental-ngx/core/shellbar';
import {
    UserMenuBodyComponent,
    UserMenuComponent,
    UserMenuControlComponent,
    UserMenuControlElementDirective,
    UserMenuHeaderContainerDirective,
    UserMenuHeaderDirective,
    UserMenuSublineDirective,
    UserMenuUserNameDirective
} from '@fundamental-ngx/core/user-menu';

@Component({
    selector: 'fd-shellbar-context-area-events-example',
    templateUrl: './shellbar-context-area-events-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        ShellbarModule,
        ButtonComponent,
        InfoLabelComponent,
        ObjectStatusComponent,
        PopoverComponent,
        PopoverControlComponent,
        PopoverBodyComponent,
        AvatarComponent,
        UserMenuComponent,
        UserMenuBodyComponent,
        UserMenuControlComponent,
        UserMenuControlElementDirective,
        UserMenuHeaderContainerDirective,
        UserMenuHeaderDirective,
        UserMenuUserNameDirective,
        UserMenuSublineDirective
    ]
})
export class ShellbarContextAreaEventsExampleComponent {
    hiddenElements = signal<HTMLElement[]>([]);
    isPopoverOpen = signal(false);

    onElementHidden(element: HTMLElement): void {
        // Add the hidden element to the signal
        this.hiddenElements.update((elements) => [...elements, element]);
    }

    onElementShown(element: HTMLElement): void {
        // Remove the shown element from the signal
        this.hiddenElements.update((elements) => elements.filter((el) => el !== element));
    }

    togglePopover(): void {
        this.isPopoverOpen.update((open) => !open);
    }
}
