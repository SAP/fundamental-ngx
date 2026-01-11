import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RtlService } from '@fundamental-ngx/cdk/utils';
import {
    ActionBarActionsDirective,
    ActionBarBackDirective,
    ActionBarComponent,
    ActionBarDescriptionDirective,
    ActionBarHeaderDirective,
    ActionBarTitleComponent
} from '@fundamental-ngx/core/action-bar';
import { ButtonComponent } from '@fundamental-ngx/core/button';

@Component({
    selector: 'fd-action-bar-back-example',
    templateUrl: './action-bar-back-example.component.html',
    imports: [
        ActionBarComponent,
        ActionBarHeaderDirective,
        ActionBarBackDirective,
        ActionBarTitleComponent,
        ActionBarActionsDirective,
        ActionBarDescriptionDirective,
        ButtonComponent
    ]
})
export class ActionBarBackExampleComponent {
    protected readonly navigationArrow = computed(() =>
        this._isRtl() ? 'navigation-right-arrow' : 'navigation-left-arrow'
    );

    private readonly _rtlService = inject(RtlService);
    private readonly _isRtl = toSignal(this._rtlService.rtl, { initialValue: false });
}
