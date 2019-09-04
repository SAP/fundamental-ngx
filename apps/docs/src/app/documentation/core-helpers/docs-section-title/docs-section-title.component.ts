import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'fd-docs-section-title',
  template: `
    <h2 [id]="id" class="docs-header-link"> 
      <a class="docs-markdown-a" [attr.aria-describedby]="id" href="/{{componentName}}#{{id}}">
          <span class="sap-icon--chain-link"></span>
      </a>
      <ng-content></ng-content>
  </h2>
`,
  styleUrls: ['./docs-section-title.component.scss']
})
export class DocsSectionTitleComponent implements OnInit {

  @Input() id: string = '';

  @Input() componentName: string = '';

  constructor() { }

  ngOnInit() {
  }

}
