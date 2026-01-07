import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { CURRENT_LIB, Libraries } from '../../utilities';
import { ExampleFile } from '../code-example/example-file';
import { CodeSnippetComponent } from '../code-snippet/code-snippet.component';

@Component({
    selector: 'import',
    template: ` <fd-code-snippet [file]="file()"></fd-code-snippet>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CodeSnippetComponent]
})
export class ImportComponent {
    /**
     * Name of the module to import.
     *
     * @deprecated Use `componentName` input instead. This will be removed in a future version.
     * @type {string | null}
     * @default null
     */
    readonly module = input<string | null>(null);

    /**
     * Name of the component to import.
     *
     * This is the preferred way to specify what to import.
     * Falls back to `module` if not provided.
     *
     * @type {string | null}
     * @default null
     */
    readonly componentName = input<string | null>(null);

    /**
     * Optional sub-package path within the library.
     *
     * @type {string | null}
     * @default null
     * @example 'skeleton', 'button', 'dialog'
     */
    readonly subPackage = input<string | null>(null);

    /**
     * Computed import statement example file.
     * @hidden
     */
    protected readonly file = computed<ExampleFile>(() => {
        const name = this.componentName() ?? this.module();

        return {
            code: `import { ${name ?? ''} } from '${this.library()}';`,
            language: 'typescript'
        };
    });

    /**
     * Current library context.
     * @hidden
     */
    private readonly currentLib = inject<Libraries>(CURRENT_LIB);

    /**
     * Computed library path based on current library and sub-package.
     * @hidden
     */
    private readonly library = computed(() => {
        const libraryPath = ['@fundamental-ngx', this.currentLib];

        const sub = this.subPackage();
        if (sub) {
            libraryPath.push(sub);
        }

        return libraryPath.join('/');
    });
}
