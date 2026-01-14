import { Directionality } from '@angular/cdk/bidi';
import { ChangeDetectionStrategy, Component, computed, effect, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BidiService } from '@fundamental-ngx/cdk/utils';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { FormLabelComponent } from '@fundamental-ngx/core/form';
import { SwitchComponent } from '@fundamental-ngx/core/switch';
import { TextComponent } from '@fundamental-ngx/core/text';

/**
 * Local container component demonstrating component-level BidiService.
 * Each instance has its own independent direction state.
 */
@Component({
    selector: 'fd-bidi-local-container',
    template: `
        <div
            class="sapUiContentPadding sapUiTinyMarginTopBottom sapUiBorderRadius sapUiBaseBG"
            style="border: 2px solid var(--sapGroup_ContentBorderColor);"
            [attr.dir]="direction()"
        >
            <h4 class="sapUiTinyMarginBottom" style="color: var(--sapTitleColor);">{{ title }}</h4>
            <div
                class="sapUiDisplayFlex sapUiTinyMarginTopBottom"
                style="color: var(--sapContent_LabelColor); font-size: 0.875rem;"
            >
                <span class="sapUiSmallMarginEnd"><strong>Direction:</strong> {{ direction() }}</span>
                <span><strong>Is RTL:</strong> {{ isRtl() }}</span>
            </div>
            <div class="sapUiDisplayFlex sapUiDisplayFlexAlignItemsCenter sapUiTinyMarginTopBottom">
                <label fd-form-label class="sapUiTinyMarginEnd">Local RTL</label>
                <fd-switch [(ngModel)]="localSwitch" (ngModelChange)="toggleLocal()" />
            </div>
            <fd-text [text]="text" [whitespaces]="true" />
        </div>
    `,
    styles: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [TextComponent, FormLabelComponent, SwitchComponent, FormsModule],
    providers: [BidiService, Directionality] // Local providers - independent instance
})
export class BidiLocalContainerComponent {
    protected readonly title = 'Local Container ' + Math.floor(Math.random() * 1000);
    protected readonly text =
        'This container has its own independent BidiService. Changes here do not affect other containers.';
    protected readonly isRtl: Signal<boolean>;
    protected readonly direction: Signal<'rtl' | 'ltr'>;
    protected localSwitch = false;

    private readonly _bidiService = inject(BidiService);
    private readonly _cdk = inject(Directionality);

    constructor() {
        this.isRtl = this._bidiService.rtl;
        this.direction = this._bidiService.dir;

        effect(() => {
            this.localSwitch = this.isRtl();
        });
    }

    protected toggleLocal(): void {
        const newDirection = this.localSwitch ? 'rtl' : 'ltr';
        // Manually emit direction change to trigger BidiService updates
        this._cdk.change.emit(newDirection);
    }
}

/**
 * Main example component demonstrating both global and local BidiService usage.
 */
@Component({
    selector: 'fd-bidi-service-basic-example',
    templateUrl: './bidi-service-basic-example.component.html',
    styleUrl: './bidi-service-basic-example.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        ButtonComponent,
        TextComponent,
        FormLabelComponent,
        SwitchComponent,
        FormsModule,
        BidiLocalContainerComponent
    ],
    providers: [BidiService, Directionality] // Global providers for this example
})
export class BidiServiceBasicExampleComponent {
    // Example text to demonstrate direction changes
    protected readonly globalText = `
    This text uses the GLOBAL BidiService instance. When you toggle the global direction,
    this text changes but local containers remain independent unless they also change.
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.`;

    // Global state signals
    protected readonly isRtl: Signal<boolean>;
    protected readonly direction: Signal<'rtl' | 'ltr'>;
    protected readonly toggleLabel: Signal<string>;
    protected globalSwitch = false;

    private readonly _bidiService = inject(BidiService);
    private readonly _cdk = inject(Directionality);

    constructor() {
        this.isRtl = this._bidiService.rtl;
        this.direction = this._bidiService.dir;
        this.toggleLabel = computed(() => (this.isRtl() ? 'LTR' : 'RTL'));

        // Sync switch with BidiService state
        effect(() => {
            this.globalSwitch = this.isRtl();
            this._updateGlobalContainerDirection();
        });
    }

    /**
     * Toggle global direction
     */
    protected toggleGlobalDirection(): void {
        const newDirection = this.direction() === 'rtl' ? 'ltr' : 'rtl';
        // Manually emit direction change to trigger BidiService updates
        this._cdk.change.emit(newDirection);
    }

    /**
     * Handle global switch changes
     */
    protected onGlobalSwitchChange(): void {
        const newDirection = this.globalSwitch ? 'rtl' : 'ltr';
        // Manually emit direction change to trigger BidiService updates
        this._cdk.change.emit(newDirection);
    }

    /**
     * Update the direction attribute on the global container
     */
    private _updateGlobalContainerDirection(): void {
        const container = document.getElementById('globalContainer');
        if (container) {
            container.dir = this.direction();
        }
    }
}
