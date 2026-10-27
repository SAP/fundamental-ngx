import {
    AfterContentChecked,
    ChangeDetectionStrategy,
    Component,
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
export class ShellbarActionsMobileComponent implements AfterContentChecked {
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

    /** @hidden */
    totalNotifications: number;

    /** The button type for styling (e.g., 'transparent', 'emphasized'). */
    readonly fdType = input<ButtonType>(defaultButtonType);

    /** Whether the button is in toggled state. */
    readonly toggled = input<boolean | undefined | null>();

    /** @hidden */
    private readonly _destroyRef = inject(DestroyRef);

    /** @hidden */
    private _needsLogoUpdate = true; // Start as true for initial render

    /** @hidden */
    constructor() {
        // Watch for hiddenLogoElement changes and trigger re-insertion
        effect(() => {
            // Track the signal
            const logo = this.hiddenLogoElement();
            // Set flag to trigger update on next AfterContentChecked
            if (logo !== null) {
                this._needsLogoUpdate = true;
            }
        });
    }

    /** @hidden */
    ngAfterContentChecked(): void {
        // Only insert logo when flagged and view child is available
        const container = this.logoContainer();
        if (this._needsLogoUpdate && container) {
            this._insertLogo();
        }
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

    /** @hidden */
    getTotalNotifications(): number {
        let total = 0;
        this.shellbarActions()?.forEach((action) => {
            const count = action.notificationCount();
            if (count && typeof count === 'number') {
                total = total + count;
            }
        });
        return total;
    }

    /** @hidden */
    private _insertLogo(): void {
        // Guard against missing elements
        const logo = this.hiddenLogoElement();
        const container = this.logoContainer();
        if (!logo || !container) {
            return;
        }

        const containerEl = container.nativeElement;
        // Clear existing content to replace with new logo
        containerEl.textContent = '';
        // Clone and append the logo
        const logoClone = logo.cloneNode(true) as HTMLElement;
        // Remove display: none so the logo is visible in the overflow menu
        logoClone.style.display = '';
        containerEl.appendChild(logoClone);

        // Clear flag to prevent unnecessary re-renders
        this._needsLogoUpdate = false;
    }
}
