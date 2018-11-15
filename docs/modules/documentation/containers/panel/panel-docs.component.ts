import { Component, OnInit } from '@angular/core';

import * as panelColumnsSrc from '!raw-loader!./examples/panel-columns-example.component.html';
import * as panelEdgeBleedSrc from '!raw-loader!./examples/panel-edge-bleed-example.component.html';
import * as panelSrc from '!raw-loader!./examples/panel-example.component.html';
import * as panelGridSrc from '!raw-loader!./examples/panel-grid-example.component.html';
import * as panelGridNoGapSrc from '!raw-loader!./examples/panel-grid-nogap-example.component.html';
import * as panelRowColumnSrc from '!raw-loader!./examples/panel-row-column-example.component.html';

@Component({
    selector: 'app-panel',
    templateUrl: './panel-docs.component.html'
})
export class PanelDocsComponent implements OnInit {
    panelHtml = panelSrc;

    tableBleedHtml = panelEdgeBleedSrc;

    defaultPanelGridHtml = panelGridSrc;

    nogapPanelGridHtml = panelGridNoGapSrc;

    twoColumnsPanelGridHtml = panelColumnsSrc;

    columnSpanPanelGridHtml = panelRowColumnSrc;

    ngOnInit() {}
}
