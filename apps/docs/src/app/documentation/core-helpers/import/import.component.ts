import { Component, Inject, Input, OnInit } from '@angular/core';
import { CURRENT_LIB, Libraries } from '../../utilities/libraries';

@Component({
    selector: 'import',
    template: `
        <code>
            <span style="color: rgb(0, 0, 136);">import</span>
            &#123; {{ module }} &#125;
            <span style="color: rgb(0, 0, 136);">from </span>
            <span style="color: rgb(0, 136, 0);">'{{ library }}'</span>;
        </code>
    `
})
export class ImportComponent implements OnInit {
    @Input() module: string;
    @Input() subPackage: string;

    library: string;

    constructor(@Inject(CURRENT_LIB) private currentLib: Libraries) {}

    ngOnInit(): void {
        const libraryPath = ['@fundamental-ngx', this.currentLib];

        if (this.subPackage) {
            libraryPath.push(this.subPackage);
        }

        this.library = libraryPath.join('/');
    }
}
