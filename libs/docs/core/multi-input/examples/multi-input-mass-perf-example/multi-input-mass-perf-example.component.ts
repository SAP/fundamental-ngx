import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    Injector,
    afterNextRender,
    computed,
    inject,
    signal,
    viewChild
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { MultiInputComponent } from '@fundamental-ngx/core/multi-input';
import { SegmentedButtonComponent } from '@fundamental-ngx/core/segmented-button';

@Component({
    selector: 'fd-multi-input-mass-perf-example',
    templateUrl: './multi-input-mass-perf-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [MultiInputComponent, FormsModule, ButtonComponent, SegmentedButtonComponent]
})
export class MultiInputMassPerfExampleComponent {
    readonly tokenCount = signal<10 | 100 | 200 | 1000>(1000);
    readonly setTokensMs = signal<number | null>(null);
    readonly focusReflowMs = signal<number | null>(null);

    readonly options = computed(() => Array.from({ length: this.tokenCount() }, (_, i) => `Option ${i + 1}`));
    selected: string[] = [...this.options()];

    private readonly _injector = inject(Injector);
    private readonly _multiInputEl = viewChild('multiInput', { read: ElementRef<HTMLElement> });

    setCount(n: 10 | 100 | 200 | 1000): void {
        const start = performance.now();
        this.tokenCount.set(n);
        this.selected = [...this.options()];
        this.setTokensMs.set(null);
        this.focusReflowMs.set(null);
        afterNextRender(() => this.setTokensMs.set(Math.round(performance.now() - start)), {
            injector: this._injector
        });
    }

    measureFocus(): void {
        const inputEl = this._multiInputEl()?.nativeElement.querySelector('input.fd-input') as HTMLInputElement;
        if (!inputEl) {
            return;
        }
        const start = performance.now();
        inputEl.focus();
        afterNextRender(() => this.focusReflowMs.set(Math.round(performance.now() - start)), {
            injector: this._injector
        });
    }
}
