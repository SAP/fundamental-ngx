import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { IconComponent } from '@fundamental-ngx/core/icon';

@Component({
    selector: 'fd-guide-chat',
    imports: [CommonModule, IconComponent, ButtonComponent],
    templateUrl: './fd-guide-chat.component.html',
    styleUrls: ['./fd-guide-chat.component.scss']
})
export class FdGuideChatComponent {
    isOpen = signal(false);
    isExpanded = signal(false);

    toggleChat(): void {
        this.isOpen.update((v) => !v);
        if (!this.isOpen()) {
            this.isExpanded.set(false);
        }
    }

    toggleExpand(): void {
        this.isExpanded.update((v) => !v);
    }

    closeChat(): void {
        this.isOpen.set(false);
        this.isExpanded.set(false);
    }
}
