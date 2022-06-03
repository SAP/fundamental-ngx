import { ChangeDetectionStrategy, Component, Inject, Input, OnInit } from '@angular/core';
import { CURRENT_LIB, Libraries } from '../../utilities/libraries';
import { ExampleFile } from '../code-example/example-file';

@Component({
    selector: 'import',
    template: ` <fd-code-snippet [file]="file"></fd-code-snippet>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImportComponent implements OnInit {
    @Input() module: string;
    @Input() subPackage: string;

    library: string;

    get file(): ExampleFile {
        return {
            code: `import { ${this.module} } from '${this.library}';`,
            language: 'ts'
        };
    }

    constructor(@Inject(CURRENT_LIB) private currentLib: Libraries) {}

    ngOnInit(): void {
        const libraryPath = ['@fundamental-ngx', this.currentLib];

        if (this.subPackage) {
            libraryPath.push(this.subPackage);
        }

        this.library = libraryPath.join('/');
    }
}
