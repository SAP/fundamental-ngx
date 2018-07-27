import { Component, OnInit } from '@angular/core';
import { Schema } from '../../../schema/models/schema.model';
import { SchemaFactoryService } from '../../../schema/services/schema-factory/schema-factory.service';

@Component({
    selector: 'app-panel',
    templateUrl: './panel-docs.component.html'
})
export class PanelDocsComponent implements OnInit {
    panelHtml =
        '<fd-panel>\n' +
        '  <fd-panel-header>\n' +
        '    <fd-panel-title>Panel Title</fd-panel-title>\n' +
        '    <fd-panel-actions>\n' +
        '      <button fd-button [size]="\'s\'" [glyph]="\'add\'">Add New Item</button>\n' +
        '    </fd-panel-actions>\n' +
        '  </fd-panel-header>\n' +
        '  <fd-panel-filters>\n' +
        '    <fd-dropdown>Color</fd-dropdown>\n' +
        '    <fd-dropdown>Size</fd-dropdown>\n' +
        '  </fd-panel-filters>\n' +
        '  <fd-panel-filters>\n' +
        '    <span class="fd-tag" role="button">Blue</span>\n' +
        '    <span class="fd-tag" role="button">Small</span>\n' +
        '  </fd-panel-filters>\n' +
        '  <fd-panel-body>\n' +
        '    Panel Content\n' +
        '  </fd-panel-body>\n' +
        '  <fd-panel-footer>\n' +
        '    Panel Footer\n' +
        '  </fd-panel-footer>\n' +
        '</fd-panel>';

    ngOnInit() {}
}
