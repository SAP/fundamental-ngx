import { ChangeDetectionStrategy, Component, inject, OnInit, Signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent, FormLabelComponent, RtlService, SwitchComponent, TextComponent } from '@fundamental-ngx/core';

@Component({
    selector: 'fd-rtl-service-basic-example',
    templateUrl: 'rtl-service-basic-example.component.html',
    imports: [TextComponent, ButtonComponent, FormLabelComponent, SwitchComponent, FormsModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})
export class RtlServiceBasicExampleComponent implements OnInit {
    // Injecting the RtlService
    private rtlService = inject(RtlService);

    // Signal to track RTL state
    isRtl: Signal<boolean>;

    text = `
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
    dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
    aliquip ex ea commodo consequat.

    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
    eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
    deserunt mollit anim id est laborum.`;

    // Optional properties for additional functionality
    label: string;
    className: string;
    isChecked = false;

    ngOnInit() {
        // Initialize the RTL signal
        this.isRtl = this.rtlService.rtlSignal;
    }

    // Method to handle changes in RTL state
    onChange(): void {
        // Determine the direction value based on isChecked
        const dirValue = this.isChecked ? 'rtl' : 'ltr';

        // Update the RTL state in the service
        this.rtlService.rtl.next(this.isChecked);

        // Update the direction of the text container
        const labelElement = document.getElementById('exampleTextContainer');
        labelElement && (labelElement.dir = dirValue);
    }
}
