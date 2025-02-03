import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RtlService } from '@fundamental-ngx/cdk/utils';
import { FormLabelComponent } from '@fundamental-ngx/core/form';
import { SwitchComponent } from '@fundamental-ngx/core/switch';

@Component({
    selector: 'rtl-switch',
    template: `
        <label fd-form-label> Simulate RTL </label>
        <fd-switch [(ngModel)]="isChecked" (ngModelChange)="onChange()"></fd-switch>
    `,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [FormLabelComponent, SwitchComponent, FormsModule]
})
export class DirectionalityComponent implements OnInit {
    @Input()
    label: string;
    @Input()
    element: string;

    @Input()
    className: string;

    id: string;
    isChecked = false;

    constructor(
        private rtlService: RtlService,
        private cdr: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        if (this.label) {
            this.id = this.label + Date.now() + '-rtl';
        } else {
            this.id = Date.now() + 6 + '';
        }
        this.rtlService.rtl.subscribe((rtl) => {
            this.isChecked = rtl;
            this.cdr.detectChanges();
        });
    }

    onChange(): void {
        const dirValue = this.isChecked ? 'rtl' : 'ltr';
        this.rtlService.rtl.next(this.isChecked);

        if (this.className) {
            Array.from(document.getElementsByClassName(this.className)).forEach(
                (element) => ((<HTMLElement>element).dir = dirValue)
            );
        }
        if (this.element) {
            Array.from(document.getElementsByTagName(this.element)).forEach(
                (element) => ((<HTMLElement>element).dir = dirValue)
            );
        }
        if (this.label) {
            const labelElement = document.getElementById(this.label);
            labelElement && (labelElement.dir = dirValue);
        }
    }
}
