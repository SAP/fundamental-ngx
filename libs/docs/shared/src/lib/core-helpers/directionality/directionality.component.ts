import {
    ChangeDetectionStrategy,
    Component,
    computed,
    effect,
    inject,
    input,
    linkedSignal,
    ViewEncapsulation
} from '@angular/core';
import { RtlService } from '@fundamental-ngx/cdk/utils';
import { FormLabelComponent } from '@fundamental-ngx/core/form';
import { SwitchComponent } from '@fundamental-ngx/core/switch';

@Component({
    selector: 'rtl-switch',
    template: `
        <label fd-form-label for="fd-doc-rtl-switch">Simulate RTL</label>
        <fd-switch id="fd-doc-rtl-switch" [checked]="isChecked()" (checkedChange)="onChange($event)"></fd-switch>
    `,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [FormLabelComponent, SwitchComponent]
})
export class DirectionalityComponent {
    readonly label = input<string>();

    protected readonly isChecked = linkedSignal(() => this._rtlService?.rtl() ?? false);

    protected readonly id = computed(() => {
        const labelValue = this.label();
        return labelValue ? `${labelValue}${Date.now()}-rtl` : `${Date.now()}6`;
    });

    private readonly _rtlService = inject(RtlService, { optional: true });

    constructor() {
        effect(() => {
            const dirValue = this.isChecked() ? 'rtl' : 'ltr';
            const labelValue = this.label();
            if (labelValue) {
                const labelElement = document.getElementById(labelValue);
                if (labelElement) {
                    labelElement.dir = dirValue;
                }
            }
        });
    }

    protected onChange(checked: boolean): void {
        this._rtlService?.rtl.set(checked);
    }
}
