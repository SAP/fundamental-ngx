import { HttpClient } from '@angular/common/http';
import { AfterViewInit, ChangeDetectionStrategy, Component, inject, Input, signal } from '@angular/core';
import { MarkdownComponent } from 'ngx-markdown';
import { catchError, map, Observable, of } from 'rxjs';

const PACKAGE_MAPPING: Record<string, string> = {
    '@ui5/webcomponents': '@ui5/webcomponents/dist/custom-elements-internal.json',
    '@ui5/webcomponents-fiori': '@ui5/webcomponents-fiori/dist/custom-elements-internal.json',
    '@ui5/webcomponents-ai': '@ui5/webcomponents-ai/dist/custom-elements-internal.json'
};

@Component({
    selector: 'description',
    template: `
        <div class="description">
            @if (componentDescription()) {
                <div class="component-description">
                    <markdown [data]="componentDescription()"></markdown>
                </div>
            }
            <div class="fallback-content">
                <ng-content></ng-content>
            </div>
        </div>
    `,
    imports: [MarkdownComponent],
    styles: [
        `
            :host {
                display: block;
            }

            .description {
                color: var(--sapTextColor);
                font-family: var(--sapFontFamily);
                font-weight: 400;
                font-size: var(--sapFontLargeSize);
                line-height: 1.7;
                margin-block-end: 1rem;
            }

            .component-description {
                margin-block-end: 0.5rem;
            }

            .component-description markdown {
                display: block;
            }

            .component-description markdown p {
                margin: 0 0 0.5rem 0;
            }

            .component-description markdown p:last-child {
                margin-block-end: 0;
            }

            .fallback-content:empty {
                display: none;
            }
        `
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DescriptionComponent implements AfterViewInit {
    /** Component name */
    @Input() component = '';

    /** Package name */
    @Input() package = '';

    componentDescription = signal<string | null>(null);

    private readonly http = inject(HttpClient);

    ngAfterViewInit(): void {
        if (this.component && this.package && !this.componentDescription()) {
            this.fetchComponentDescription().subscribe((description) => {
                this.componentDescription.set(description);
            });
        }
    }

    /** Fetch component description from the JSON manifest file */
    private fetchComponentDescription(): Observable<string | null> {
        const packageName = this.package;
        const componentName = this.component;
        const manifestPath = packageName ? PACKAGE_MAPPING[packageName] : undefined;

        if (!manifestPath || !componentName) {
            return of(null);
        }

        return this.http.get<any>(`/node_modules/${manifestPath}`).pipe(
            map((manifest) => {
                const module = manifest.modules?.find((mod) =>
                    mod.declarations?.some((decl: any) => decl.name === componentName && decl.kind === 'class')
                );

                const classDeclaration = module?.declarations?.find(
                    (decl: any) => decl.name === componentName && decl.kind === 'class'
                );

                return classDeclaration?.description || null;
            }),
            catchError(() => of(null))
        );
    }
}
