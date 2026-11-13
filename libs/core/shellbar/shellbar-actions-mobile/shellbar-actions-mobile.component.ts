import {
    ChangeDetectionStrategy,
    Component,
    computed,
    DestroyRef,
    effect,
    ElementRef,
    inject,
    input,
    output,
    QueryList,
    viewChild,
    ViewEncapsulation
} from '@angular/core';
import { ClickedDirective, Nullable } from '@fundamental-ngx/cdk/utils';
import { ButtonComponent, ButtonType, defaultButtonType } from '@fundamental-ngx/core/button';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import {
    MenuAddonDirective,
    MenuComponent,
    MenuInteractiveComponent,
    MenuItemComponent,
    MenuTitleDirective,
    MenuTriggerDirective
} from '@fundamental-ngx/core/menu';
import { TextComponent } from '@fundamental-ngx/core/text';
import { FdTranslatePipe } from '@fundamental-ngx/i18n';
import { ShellbarActionComponent } from '../shellbar-action/shellbar-action.component';

@Component({
    selector: 'fd-shellbar-actions-mobile',
    templateUrl: './shellbar-actions-mobile.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        ButtonComponent,
        ClickedDirective,
        ContentDensityDirective,
        MenuAddonDirective,
        MenuComponent,
        MenuItemComponent,
        MenuInteractiveComponent,
        MenuTitleDirective,
        MenuTriggerDirective,
        FdTranslatePipe,
        TextComponent
    ]
})
export class ShellbarActionsMobileComponent {
    /** @hidden */
    readonly shellbarActions = input<QueryList<ShellbarActionComponent>>();

    /** @hidden */
    readonly searchExists = input(false);

    /** @hidden */
    readonly titleHidden = input(false);

    /** @hidden */
    readonly hiddenTitleText = input('');

    /** @hidden */
    readonly hiddenLogoElement = input<HTMLElement | null>(null);

    /** @hidden */
    readonly brandingAriaLabel = input('');

    /** @hidden */
    readonly assistiveToolsCallback = input<Nullable<(event: MouseEvent) => void>>();

    /** @hidden */
    readonly showSearch = output<void>();

    /** @hidden */
    readonly logoContainer = viewChild<ElementRef<HTMLElement>>('logoContainer');

    /** The button type for styling (e.g., 'transparent', 'emphasized'). */
    readonly fdType = input<ButtonType>(defaultButtonType);

    /** Whether the button is in toggled state. */
    readonly toggled = input<boolean | undefined | null>();

    /** @hidden */
    protected readonly totalNotifications = computed(() => {
        let total = 0;
        this.shellbarActions()?.forEach((action) => {
            const count = action.notificationCount();
            if (count && typeof count === 'number') {
                total = total + count;
            }
        });
        return total;
    });

    /** @hidden */
    private readonly _destroyRef = inject(DestroyRef);

    /** @hidden */
    constructor() {
        // Insert logo when either the logo element or container changes
        // The effect automatically handles both initial render and updates
        effect(() => {
            const logo = this.hiddenLogoElement();
            const container = this.logoContainer();

            // Clear container first, then insert logo if both are available
            if (container) {
                const containerEl = container.nativeElement;
                containerEl.textContent = '';

                if (logo) {
                    // Clone and append the logo
                    const logoClone = logo.cloneNode(true) as HTMLElement;
                    // Remove display: none so the logo is visible in the overflow menu
                    logoClone.style.display = '';
                    containerEl.appendChild(logoClone);
                }
            }
        });
    }

    /** @hidden */
    actionClicked(item: ShellbarActionComponent, event: MouseEvent | KeyboardEvent): void {
        const callbackFn = item.callback();
        if (callbackFn) {
            callbackFn(event as MouseEvent);
        }
    }

    /** @hidden */
    assistiveToolsClickedHandler(event: MouseEvent | KeyboardEvent): void {
        const callback = this.assistiveToolsCallback();
        if (callback) {
            callback(event as MouseEvent);
        }
    }
}
