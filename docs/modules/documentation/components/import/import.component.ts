import { Component, Input } from '@angular/core';

@Component({
    selector: 'import',
    template: `
    <code>import &#123; {{ module }} &#125; from '{{ path }}';</code>
  `
})
export class ImportComponent {
    @Input() module: string;

    @Input() path: string;
}
