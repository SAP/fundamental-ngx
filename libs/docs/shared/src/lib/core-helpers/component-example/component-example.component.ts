import {
    ChangeDetectionStrategy,
    Component,
    computed,
    effect,
    inject,
    input,
    linkedSignal,
    signal,
    ViewEncapsulation
} from '@angular/core';
import { RtlService } from '@fundamental-ngx/cdk/utils';
import {
    ContentDensityDirective,
    ContentDensityMode,
    contentDensityObserverProviders
} from '@fundamental-ngx/core/content-density';
import { DialogService } from '@fundamental-ngx/core/dialog';
import { IconComponent } from '@fundamental-ngx/core/icon';
import { WizardDialogGeneratorService } from '@fundamental-ngx/platform/wizard-generator';
import { DensityDialChoice, FdDocsDensityDialComponent } from '../density-dial/fd-docs-density-dial.component';

@Component({
    selector: 'component-example',
    templateUrl: './component-example.component.html',
    styleUrls: ['./component-example.component.scss'],
    providers: [
        RtlService,
        DialogService,
        WizardDialogGeneratorService,
        contentDensityObserverProviders({
            supportedContentDensity: [ContentDensityMode.COMPACT, ContentDensityMode.COZY],
            defaultContentDensity: ContentDensityMode.COZY
        })
    ],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [IconComponent, FdDocsDensityDialComponent],
    hostDirectives: [
        {
            directive: ContentDensityDirective,
            inputs: ['fdContentDensity']
        }
    ]
})
export class ComponentExampleComponent {
    readonly hasBackground = input(true);
    readonly contentDensityPassthrough = input(false);

    protected readonly rtlEnabled = signal(false);
    protected readonly showBackground = linkedSignal(() => this.hasBackground());
    protected readonly densityChoice = signal<DensityDialChoice>('global');
    protected readonly responsiveEnabled = signal(false);
    protected readonly viewportWidth = signal<string | null>(null);

    protected readonly direction = computed(() => (this.rtlEnabled() ? 'rtl' : 'ltr'));

    protected readonly activePreset = computed(() => {
        const w = this.viewportWidth();
        if (!w) {
            return 'full';
        }
        if (w === '23.4375rem') {
            return 'phone';
        }
        if (w === '48rem') {
            return 'tablet';
        }
        return 'custom';
    });

    private readonly _rtlService = inject(RtlService);
    private readonly _contentDensityDirective = inject(ContentDensityDirective);

    constructor() {
        effect(() => {
            this._rtlService.rtl.set(this.rtlEnabled());
        });
        effect(() => {
            if (this.contentDensityPassthrough()) {
                this._contentDensityDirective.setDensity('global');
                return;
            }
            const choice = this.densityChoice();
            if (choice === 'global') {
                this._contentDensityDirective.setDensity('global');
            } else {
                this._contentDensityDirective.setDensity(choice as ContentDensityMode);
            }
        });
    }

    protected toggleResponsive(): void {
        this.responsiveEnabled.update((v) => !v);
    }

    protected setPreset(preset: 'phone' | 'tablet' | 'full'): void {
        switch (preset) {
            case 'phone':
                this.viewportWidth.set('23.4375rem');
                break;
            case 'tablet':
                this.viewportWidth.set('48rem');
                break;
            case 'full':
                this.viewportWidth.set(null);
                break;
        }
    }
}
