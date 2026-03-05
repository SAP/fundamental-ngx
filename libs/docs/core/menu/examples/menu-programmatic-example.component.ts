import { Component, signal, viewChild } from '@angular/core';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import {
    MenuComponent,
    MenuInteractiveComponent,
    MenuItemComponent,
    MenuTitleDirective,
    MenuTriggerDirective
} from '@fundamental-ngx/core/menu';
import { PopoverConfig } from '@fundamental-ngx/core/popover';

@Component({
    selector: 'fd-menu-programmatic-example',
    template: `
        <!-- Menu with programmatic control -->
        <h4 class="fd-title fd-title--h5 fd-margin-bottom--sm">Programmatic Control</h4>
        <div class="fd-margin-bottom--md" style="display: flex; gap: 0.5rem; align-items: center;">
            <button fd-button #trigger [fdMenuTrigger]="menu">Open Menu</button>
            <button fd-button fdType="transparent" (click)="menuComponent()?.open()">Open</button>
            <button fd-button fdType="transparent" (click)="menuComponent()?.close()">Close</button>
            <button fd-button fdType="transparent" (click)="menuComponent()?.toggle()">Toggle</button>
        </div>

        <fd-menu
            #menu
            [(isOpen)]="isOpen"
            [config]="menuConfig"
            (beforeOpen)="onBeforeOpen()"
            (isOpenChange)="onOpenChange($event)"
            (activePath)="onActivePath($event)"
        >
            <li fd-menu-item>
                <a href="#" fd-menu-interactive>
                    <span fd-menu-title>Option 1</span>
                </a>
            </li>
            <li fd-menu-item>
                <a href="#" fd-menu-interactive>
                    <span fd-menu-title>Option 2</span>
                </a>
            </li>
            <li fd-menu-item>
                <a href="#" fd-menu-interactive>
                    <span fd-menu-title>Option 3</span>
                </a>
            </li>
        </fd-menu>

        <!-- Event Log -->
        <h4 class="fd-title fd-title--h5 fd-margin-top--md fd-margin-bottom--sm">Event Log</h4>
        <div class="event-log">
            @if (eventLog().length === 0) {
                <p class="event-log__empty">No events yet. Open the menu to see events.</p>
            } @else {
                <ul class="fd-list fd-list--no-border">
                    @for (event of eventLog(); track event) {
                        <li class="fd-list__item">{{ event }}</li>
                    }
                </ul>
                <button fd-button label="Clear Log" fdType="transparent" (click)="clearLog()"></button>
            }
        </div>
    `,
    styles: [
        `
            .event-log {
                max-height: 9.375rem;
                overflow-y: auto;
                border: 1px solid var(--sapGroup_ContentBorderColor, #d9d9d9);
                border-radius: var(--sapElement_BorderCornerRadius, 0.25rem);
                padding: 0.5rem;
                background: var(--sapGroup_ContentBackground, #fff);
            }

            .event-log__empty {
                color: var(--sapContent_LabelColor, #6a6d70);
                font-style: italic;
                margin: 0;
            }
        `
    ],
    imports: [
        ButtonComponent,
        MenuComponent,
        MenuItemComponent,
        MenuInteractiveComponent,
        MenuTitleDirective,
        MenuTriggerDirective
    ]
})
export class MenuProgrammaticExampleComponent {
    /** Reference to menu component for programmatic control */
    readonly menuComponent = viewChild<MenuComponent>('menu');

    /** Signal-based open state for two-way binding */
    isOpen = signal(false);

    /** Config object for menu settings */
    menuConfig: PopoverConfig = {
        placement: 'bottom-start',
        closeOnEscapeKey: true,
        focusTrapped: true
    };

    /** Track events */
    eventLog = signal<string[]>([]);

    /** Called before menu opens */
    onBeforeOpen(): void {
        this.addToLog('beforeOpen event fired');
    }

    /** Called when open state changes */
    onOpenChange(isOpen: boolean): void {
        this.addToLog(`isOpenChange: ${isOpen}`);
    }

    /** Called when active path changes */
    onActivePath(path: MenuItemComponent[]): void {
        if (path.length > 0) {
            this.addToLog(`activePath: ${path.length} item(s) active`);
        }
    }

    /** Clear event log */
    clearLog(): void {
        this.eventLog.set([]);
    }

    private addToLog(message: string): void {
        this.eventLog.update((log) => [...log, `${new Date().toLocaleTimeString()}: ${message}`]);
    }
}
