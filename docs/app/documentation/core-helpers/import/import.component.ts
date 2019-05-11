import { Component, Input } from '@angular/core';

@Component({
    selector: 'import',
    template: `
    <code>
        <span style="color: rgb(0, 0, 136);">import</span> 
        &#123; {{ module }} &#125;
        <span style="color: rgb(0, 0, 136);">from </span>
        <span style="color: rgb(0, 136, 0);">'{{ path }}'</span>;
    </code>
  `
})
export class ImportComponent {
    @Input() module: string;

    @Input() path: string;
}
