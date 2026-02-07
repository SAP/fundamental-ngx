import { ChangeDetectionStrategy, Component, ElementRef, inject, input, ViewEncapsulation } from '@angular/core';
import { Nullable } from '@fundamental-ngx/cdk/utils';
import { ButtonComponent, ButtonType } from '@fundamental-ngx/core/button';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { FD_DEFAULT_ICON_FONT_FAMILY, IconFont } from '@fundamental-ngx/core/icon';
import { FD_SHELLBAR_ACTION_COMPONENT } from '../tokens';

/**
 * The component that represents a shellbar action.
 * ```html
 *  <fd-shellbar-action *ngFor="let action of actions"
 *                      [glyph]="action.glyph"
 *                      [callback]="action.callback"
 *                      [label]="action.label"
 *                      [ariaLabel]="action.ariaLabel"
 *                      [title]="action.title"
 *                      [notificationCount]="action.notificationCount"
 *                      [notificationLabel]="action.notificationLabel">
 *  </fd-shellbar-action>
 * ```
 */
@Component({
    selector: 'fd-shellbar-action',
    templateUrl: './shellbar-action.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: FD_SHELLBAR_ACTION_COMPONENT,
            useExisting: ShellbarActionComponent
        }
    ],
    imports: [ButtonComponent, ContentDensityDirective]
})
export class ShellbarActionComponent {
    /** Icon name for the button. */
    readonly glyph = input<string>();

    /** Icon font family. */
    readonly glyphFont = input<IconFont>(FD_DEFAULT_ICON_FONT_FAMILY);

    /** Function to call when the action is clicked. */
    readonly callback = input<Nullable<(event: MouseEvent) => void>>(null);

    /** Accessible label for the action. */
    readonly label = input<string>('');

    /** ARIA label for screen readers. */
    readonly ariaLabel = input<string>('');

    /** Tooltip text shown on hover. */
    readonly title = input<string>('');

    /** ARIA label for the notification badge. */
    readonly notificationLabel = input<string>();

    /** Number of notifications to display in badge. */
    readonly notificationCount = input<number>();

    /** The button type for styling (e.g., 'transparent', 'emphasized'). */
    readonly fdType = input<ButtonType>('transparent');

    /** Whether the button is in toggled state. */
    readonly toggled = input<boolean | undefined | null>();

    /** @hidden */
    _elRef = inject(ElementRef);

    /** @hidden */
    protected _handleClick(event: MouseEvent): void {
        const callbackFn = this.callback();
        if (callbackFn) {
            callbackFn(event);
        }
    }
}
