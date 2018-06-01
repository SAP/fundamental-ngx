import { Component, OnInit } from '@angular/core';
import { Schema } from '../../../schema/models/schema.model';
import { SchemaFactoryService } from '../../../schema/services/schema-factory/schema-factory.service';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html'
})
export class PanelComponent implements OnInit {
  panelHtml = `<fd-panel>
  <fd-panel-header>
    <fd-panel-title>Panel Title</fd-panel-title>
    <fd-panel-actions>
      <button fd-button size="s" [glyph]="'add'">Add New Item</button>
    </fd-panel-actions>
  </fd-panel-header>
  <fd-panel-filters>
    <fd-dropdown>Color</fd-dropdown>
    <fd-dropdown>Size</fd-dropdown>
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

  ngOnInit() {}
}
