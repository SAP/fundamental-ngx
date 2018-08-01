import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-panel',
    templateUrl: './panel-docs.component.html'
})
export class PanelDocsComponent implements OnInit {
        panelHtml = `<fd-panel>
  <fd-panel-header>
    <fd-panel-head>
      <fd-panel-title>Panel Title</fd-panel-title>
      <fd-panel-description>Panel Description</fd-panel-description>
    </fd-panel-head>
    <fd-panel-actions>
      <button fd-button [size]="'s'" [glyph]="'add'">Add New Item</button>
    </fd-panel-actions>
  </fd-panel-header>
  <fd-panel-filters>
    <fd-popover [isDropdown]="true">
        Color
    </fd-popover>
    <fd-popover [isDropdown]="true">
        Size
    </fd-popover>
  </fd-panel-filters>
  <fd-panel-filters>
    <span class="fd-tag" role="button">Blue</span>
    <span class="fd-tag" role="button">Small</span>
    <button fd-modal-button-secondary size="s">Clear All</button>
  </fd-panel-filters>
  <fd-panel-body>
    Panel Content
  </fd-panel-body>
  <fd-panel-footer>
    Panel Footer
  </fd-panel-footer>
</fd-panel>`;

    defaultPanelGridHtml = `<fd-panel-grid>
  <fd-panel>
    <fd-panel-body>
      Panel Content
    </fd-panel-body>
  </fd-panel>
  <fd-panel>
    <fd-panel-body>
      Panel Content
    </fd-panel-body>
  </fd-panel>
  <fd-panel>
    <fd-panel-body>
      Panel Content
    </fd-panel-body>
  </fd-panel>
  <fd-panel>
    <fd-panel-body>
      Panel Content
    </fd-panel-body>
  </fd-panel>
  <fd-panel>
    <fd-panel-body>
      Panel Content
    </fd-panel-body>
  </fd-panel>
  <fd-panel>
    <fd-panel-body>
      Panel Content
    </fd-panel-body>
  </fd-panel>
</fd-panel-grid>`;

    nogapPanelGridHtml = `<fd-panel-grid [col]="2" [nogap]="true">
  <fd-panel>
    <fd-panel-body>
      Panel Content
    </fd-panel-body>
  </fd-panel>
  <fd-panel>
    <fd-panel-body>
      Panel Content
    </fd-panel-body>
  </fd-panel>
  <fd-panel>
    <fd-panel-body>
      Panel Content
    </fd-panel-body>
  </fd-panel>
  <fd-panel>
    <fd-panel-body>
      Panel Content
    </fd-panel-body>
  </fd-panel>
</fd-panel-grid>`;

    twoColumnsPanelGridHtml = `<fd-panel-grid [col]="2">
  <fd-panel>
    <fd-panel-body>
      Panel Content
    </fd-panel-body>
  </fd-panel>
  <fd-panel>
    <fd-panel-body>
      Panel Content
    </fd-panel-body>
  </fd-panel>
  <fd-panel>
    <fd-panel-body>
      Panel Content
    </fd-panel-body>
  </fd-panel>
  <fd-panel>
    <fd-panel-body>
      Panel Content
    </fd-panel-body>
  </fd-panel>
</fd-panel-grid>`;

    columnSpanPanelGridHtml = `<fd-panel-grid [col]="6">
  <fd-panel [span]="2">
    <fd-panel-body>
      Panel Content with span 2
    </fd-panel-body>
  </fd-panel>
  <fd-panel>
    <fd-panel-body>
      Panel Content
    </fd-panel-body>
  </fd-panel>
  <fd-panel>
    <fd-panel-body>
      Panel Content
    </fd-panel-body>
  </fd-panel>
  <fd-panel>
    <fd-panel-body>
      Panel Content
    </fd-panel-body>
  </fd-panel>
  <fd-panel>
    <fd-panel-body>
      Panel Content
    </fd-panel-body>
  </fd-panel>
  <fd-panel [span]="3">
    <fd-panel-body>
      Panel Content with span 3
    </fd-panel-body>
  </fd-panel>
  <fd-panel>
    <fd-panel-body>
      Panel Content
    </fd-panel-body>
  </fd-panel>
  <fd-panel>
    <fd-panel-body>
      Panel Content
    </fd-panel-body>
  </fd-panel>
  <fd-panel>
    <fd-panel-body>
      Panel Content
    </fd-panel-body>
  </fd-panel>
  <fd-panel>
    <fd-panel-body>
      Panel Content
    </fd-panel-body>
  </fd-panel>
  <fd-panel>
    <fd-panel-body>
      Panel Content
    </fd-panel-body>
  </fd-panel>
  <fd-panel [span]="4">
    <fd-panel-body>
      Panel Content with span 4
    </fd-panel-body>
  </fd-panel>
  <fd-panel [span]="5">
    <fd-panel-body>
      Panel Content with span 5
    </fd-panel-body>
  </fd-panel>
  <fd-panel>
    <fd-panel-body>
      Panel Content
    </fd-panel-body>
  </fd-panel>
  <fd-panel [span]="6">
    <fd-panel-body>
      Panel Content with span 6
    </fd-panel-body>
  </fd-panel>
</fd-panel-grid>`;

    ngOnInit() {}
}
