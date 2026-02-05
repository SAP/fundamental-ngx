import { Direction } from '@angular/cdk/bidi';
import { ChangeDetectionStrategy, Component, computed, effect, inject } from '@angular/core';
import { RtlService } from '@fundamental-ngx/cdk/utils';
import { ButtonComponent, TextComponent } from '@fundamental-ngx/core';

@Component({
    selector: 'fd-rtl-service-basic-example',
    templateUrl: 'rtl-service-basic-example.component.html',
    imports: [TextComponent, ButtonComponent],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RtlServiceBasicExampleComponent {
    // Example text
    text = `
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
    dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
    aliquip ex ea commodo consequat.

    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
    eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
    deserunt mollit anim id est laborum.`;

    protected readonly isRtl = computed(() => this._rtlService.rtl());

    protected readonly direction = computed<Direction>(() => (this.isRtl() ? 'rtl' : 'ltr'));

    private readonly _rtlService = inject(RtlService);

    constructor() {
        effect(() => {
            const dir = this.direction();
            const labelElement = document.getElementById('exampleTextContainer');
            if (labelElement) {
                labelElement.dir = dir;
            }
        });
    }

    // Method to toggle RTL state
    protected simulateRTL(): void {
        this._rtlService.rtl.update((current) => !current);
    }
}
