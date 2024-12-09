import { Direction } from '@angular/cdk/bidi';
import { ChangeDetectionStrategy, Component, computed, effect, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent, FormLabelComponent, RtlService, SwitchComponent, TextComponent } from '@fundamental-ngx/core';

@Component({
    selector: 'fd-rtl-service-basic-example',
    templateUrl: 'rtl-service-basic-example.component.html',
    imports: [TextComponent, ButtonComponent, FormLabelComponent, SwitchComponent, FormsModule],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RtlServiceBasicExampleComponent {
    // Injecting the RtlService
    private _rtlService = inject(RtlService);

    // Example text
    text = `
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
    dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
    aliquip ex ea commodo consequat.

    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
    eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
    deserunt mollit anim id est laborum.`;

    // Signal to track RTL state
    rtl$ = computed(() => !!this._rtlService?.rtlSignal());
    // Signal to track a direction
    _dir$ = computed<Direction>(() => {
        return this.rtl$() ? 'rtl' : 'ltr';
    });

    constructor() {
        effect(() => {
            this._updateTextContainerDirection();
        });
    }

    // Method to update the direction of the text container
    private _updateTextContainerDirection() {
        const labelElement = document.getElementById('exampleTextContainer');
        labelElement && (labelElement.dir = this._dir$());
    }
    // Method to handle changes in RTL state
    simulateRTL(): void {
        this._rtlService.rtl.next(!this._rtlService.rtl.value);
    }
}
