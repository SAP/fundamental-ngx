import { ChangeDetectionStrategy, Component, inject, OnInit, Signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent, FormLabelComponent, RtlService, SwitchComponent, TextComponent } from '@fundamental-ngx/core';

@Component({
    selector: 'fd-rtl-service-basic-example',
    template: `<div id="exampleTextContainer">
        <h3>Is <code>RTL</code>: {{ isRtl() }}</h3>
        <h3>Whitespaces disabled</h3>
        <fd-text [text]="text"></fd-text>

        <h3>Whitespaces enabled</h3>
        <fd-text id="example-text" [text]="text" [whitespaces]="true"></fd-text>

        <label fd-form-label> Simulate RTL </label>
        <fd-switch [(ngModel)]="isChecked" (ngModelChange)="onChange()"></fd-switch>
    </div> `,
    imports: [TextComponent, ButtonComponent, FormLabelComponent, SwitchComponent, FormsModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})
export class RtlServiceBasicExampleComponent implements OnInit {
    private rtlService = inject(RtlService);
    isRtl: Signal<boolean>;

    text = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
aliquip ex ea commodo consequat.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
deserunt mollit anim id est laborum.
`;

    label: string;
    className: string;
    isChecked = false;

    ngOnInit() {
        this.isRtl = this.rtlService.rtlSignal;
    }

    onChange(): void {
        const dirValue = this.isChecked ? 'rtl' : 'ltr';
        this.rtlService.rtl.next(this.isChecked);
        const labelElement = document.getElementById('exampleTextContainer');
        labelElement && (labelElement.dir = dirValue);
    }
}
