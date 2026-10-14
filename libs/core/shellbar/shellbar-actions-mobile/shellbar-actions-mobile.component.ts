import {
    AfterContentChecked,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    EventEmitter,
    input,
    Input,
    Output,
    QueryList,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { Nullable } from '@fundamental-ngx/cdk/utils';
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
        ContentDensityDirective,
        MenuAddonDirective,
        MenuComponent,
        MenuItemComponent,
        MenuInteractiveComponent,
        MenuTitleDirective,
        MenuTriggerDirective,
        FdTranslatePipe
    ]
})
export class ShellbarActionsMobileComponent implements AfterContentChecked {
    /** @hidden */
    @Input()
    shellbarActions: QueryList<ShellbarActionComponent>;

    /**
     * Whether the search is present in the shellbar.
     */
    @Input()
    searchExists = false;

    /**
     * Whether the title is hidden and should appear in the overflow menu.
     */
    @Input()
    titleHidden = false;

    /**
     * The text of the hidden title.
     */
    @Input()
    hiddenTitleText = '';

    /**
     * The logo element to display in the overflow menu.
     */
    @Input()
    hiddenLogoElement: HTMLElement | null = null;

    /** @hidden */
    @Input()
    assistiveToolsCallback: Nullable<(event: MouseEvent) => void>;

    /** @hidden */
    @Output()
    showSearch = new EventEmitter<void>();

    /** @hidden */
    @ViewChild('logoContainer', { read: ElementRef })
    logoContainer: ElementRef<HTMLElement>;

    /** @hidden */
    totalNotifications: number;

    /** The button type for styling (e.g., 'transparent', 'emphasized'). */
    readonly fdType = input<ButtonType>(defaultButtonType);

    /** Whether the button is in toggled state. */
    readonly toggled = input<boolean | undefined | null>();

    /** @hidden */
    actionClicked(item: ShellbarActionComponent): void {
        const callbackFn = item.callback();
        if (callbackFn) {
            // Create a synthetic mouse event since menu onSelect doesn't provide one
            const syntheticEvent = new MouseEvent('click');
            callbackFn(syntheticEvent);
        }
    }

    /** @hidden */
    assistiveToolsClickedHandler(): void {
        if (this.assistiveToolsCallback) {
            // Create a synthetic mouse event since menu onSelect doesn't provide one
            const syntheticEvent = new MouseEvent('click');
            this.assistiveToolsCallback(syntheticEvent);
        }
    }

    /** @hidden */
    ngAfterContentChecked(): void {
        this.totalNotifications = 0;

        this.shellbarActions?.forEach((action) => {
            const count = action.notificationCount();
            if (count && typeof count === 'number') {
                this.totalNotifications = this.totalNotifications + count;
            }
        });

        // Insert the logo element into the overflow menu if it exists
        if (this.hiddenLogoElement && this.logoContainer) {
            const container = this.logoContainer.nativeElement;
            // Clear existing content
            container.innerHTML = '';
            // Clone and append the logo
            const logoClone = this.hiddenLogoElement.cloneNode(true) as HTMLElement;
            // Remove display: none so the logo is visible in the overflow menu
            logoClone.style.display = '';
            container.appendChild(logoClone);
        }
    }
}
