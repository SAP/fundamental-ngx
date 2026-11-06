import { afterNextRender, Component, DOCUMENT, ElementRef, inject, signal, viewChildren } from '@angular/core';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { TableModule } from '@fundamental-ngx/core/table';
import { TooltipDirective } from '@fundamental-ngx/core/tooltip';

interface AriaSnapshot {
    name: string;
    describedBy: string;
    description: string;
    keyShortcuts: string;
}

@Component({
    selector: 'fd-tooltip-accessibility-example',
    templateUrl: './tooltip-accessibility-example.component.html',
    styles: [
        `
            .fd-tooltip-a11y-example {
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
                gap: 1rem;
                margin-block: 1rem;
            }
        `
    ],
    imports: [ButtonComponent, TableModule, TooltipDirective]
})
export class TooltipAccessibilityExampleComponent {
    protected readonly snapshots = signal<AriaSnapshot[]>([]);

    private readonly _targets = viewChildren('target', { read: ElementRef });

    private readonly _document = inject(DOCUMENT);

    constructor() {
        afterNextRender({ read: () => this.inspect() });
    }

    protected inspect(): void {
        this.snapshots.set(
            this._targets().map(({ nativeElement }: ElementRef<HTMLElement>) => {
                const describedBy = nativeElement.getAttribute('aria-describedby');
                const description = (describedBy ?? '')
                    .split(' ')
                    .map((id) => this._document.getElementById(id)?.textContent?.trim())
                    .filter(Boolean)
                    .join(' ');

                const rawShortcuts = nativeElement.getAttribute('aria-keyshortcuts');
                const formattedShortcuts = rawShortcuts
                    ? rawShortcuts.replace(/Control\+(\w) Meta\+\1/g, 'Ctrl+$1 / Cmd+$1')
                    : '—';

                return {
                    name: nativeElement.getAttribute('aria-label') ?? nativeElement.textContent?.trim() ?? '',
                    describedBy: describedBy ?? '—',
                    description: description || '—',
                    keyShortcuts: formattedShortcuts
                };
            })
        );
    }
}
