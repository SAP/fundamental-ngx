import { ChangeDetectionStrategy, Component, ElementRef, effect, signal, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AvatarComponent } from '@fundamental-ngx/core/avatar';
import { ButtonComponent, ButtonType } from '@fundamental-ngx/core/button';
import { GenericTagComponent } from '@fundamental-ngx/core/generic-tag';
import { PopoverBodyComponent, PopoverComponent, PopoverControlComponent } from '@fundamental-ngx/core/popover';
import { ShellbarModule } from '@fundamental-ngx/core/shellbar';
import { SliderComponent } from '@fundamental-ngx/core/slider';
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
    selector: 'fd-shellbar-context-area-overflow-example',
    templateUrl: './shellbar-context-area-overflow-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        ShellbarModule,
        ButtonComponent,
        FormsModule,
        GenericTagComponent,
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
        UserMenuSublineDirective,
        SliderComponent
    ]
})
export class ShellbarContextAreaOverflowExampleComponent {
    shellbarWidth = signal(100);

    hiddenItems = signal<HTMLElement[]>([]);

    isOverflowOpen = signal(false);

    readonly overflowContainer = viewChild<ElementRef<HTMLElement>>('overflowContainer');

    actions = [
        {
            glyph: 'bell',
            callback: () => {},
            label: 'Notifications',
            ariaLabel: 'Notifications',
            title: 'Notifications',
            type: 'transparent' as ButtonType
        },
        {
            glyph: 'sys-help',
            callback: () => {},
            label: 'Help',
            ariaLabel: 'Help',
            title: 'Help',
            type: 'transparent' as ButtonType
        }
    ];

    constructor() {
        effect(() => {
            const container = this.overflowContainer()?.nativeElement;
            if (!container) {
                return;
            }
            container.innerHTML = '';
            this.hiddenItems().forEach((el) => {
                const clone = el.cloneNode(true) as HTMLElement;
                clone.style.display = '';
                container.appendChild(clone);
            });
        });
    }

    onVisibilityChange(items: HTMLElement[]): void {
        this.hiddenItems.set(items);
        if (items.length === 0) {
            this.isOverflowOpen.set(false);
        }
    }
}
