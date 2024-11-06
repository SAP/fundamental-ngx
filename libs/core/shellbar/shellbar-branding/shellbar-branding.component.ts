import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { Nullable } from '@fundamental-ngx/cdk/utils';
import { FD_SHELLBAR_BRANDING_COMPONENT } from '../tokens';

@Component({
    selector: 'fd-shellbar-branding',
    standalone: true,
    templateUrl: './shellbar-branding.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: FD_SHELLBAR_BRANDING_COMPONENT,
            useExisting: ShellbarBrandingComponent
        }
    ]
})
export class ShellbarBrandingComponent {
    /** Callback that hanldles the response to clicks on any of the actions. */
    @Input()
    callback: Nullable<(event: MouseEvent) => void>;

    /** add aria label dynamically to add to the button */
    @Input()
    ariaLabel: Nullable<string>;
}
