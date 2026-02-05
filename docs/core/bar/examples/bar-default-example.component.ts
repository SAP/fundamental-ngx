import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RtlService } from '@fundamental-ngx/cdk/utils';
import { AvatarComponent } from '@fundamental-ngx/core/avatar';
import { BarModule } from '@fundamental-ngx/core/bar';

@Component({
    selector: 'fd-bar-default-example',
    templateUrl: './bar-default-example.component.html',
    imports: [BarModule, AvatarComponent],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BarDefaultExampleComponent {
    protected readonly navigationArrow = computed(() =>
        this._rtlService?.rtl() ? 'navigation-right-arrow' : 'navigation-left-arrow'
    );

    private readonly _rtlService = inject(RtlService, { optional: true });
}
