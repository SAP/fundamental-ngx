import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { FD_SHELLBAR_ACTION_COMPONENT } from '../tokens';
import { Nullable } from '@fundamental-ngx/cdk/utils';
import { NgIf } from '@angular/common';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { ButtonModule } from '@fundamental-ngx/core/button';

/**
 * The component that represents a shellbar action.
 * ```html
 *  <fd-shellbar-action *ngFor="let action of actions"
 *                      [glyph]="action.glyph"
 *                      [callback]="action.callback"
 *                      [label]="action.label"
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
    standalone: true,
    imports: [ButtonModule, ContentDensityDirective, NgIf]
})
export class ShellbarActionComponent {
    /** The glyph (icon) name */
    @Input()
    glyph: string;

    /** Callback that hanldles the response to clicks on any of the actions. */
    @Input()
    callback: Nullable<(event: MouseEvent) => void>;

    /** The action label. */
    @Input()
    label: string;

    /** The notification label. */
    @Input()
    notificationLabel: string;

    /** Represents the number of notifications. */
    @Input()
    notificationCount: number;
}
