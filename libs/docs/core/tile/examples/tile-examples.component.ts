import { Component } from '@angular/core';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { TileModule } from '@fundamental-ngx/core/tile';

@Component({
    selector: 'fd-tile-generic-example',
    templateUrl: './tile-generic-example.component.html',
    standalone: true,
    imports: [TileModule]
})
export class TileGenericExampleComponent {
    window: any;

    constructor() {
        this.window = window;
    }
}

@Component({
    selector: 'fd-tile-columns-example',
    templateUrl: './tile-columns-example.component.html',
    standalone: true,
    imports: [TileModule]
})
export class TileColumnsExampleComponent {}

@Component({
    selector: 'fd-launch-tile-example',
    templateUrl: './launch-tile-example.component.html',
    standalone: true,
    imports: [TileModule]
})
export class LaunchTileExampleComponent {
    window: any;

    constructor() {
        this.window = window;
    }
}

@Component({
    selector: 'fd-kpi-tile-example',
    templateUrl: './kpi-tile-example.component.html',
    standalone: true,
    imports: [TileModule]
})
export class KpiTileExampleComponent {
    window: any;

    constructor() {
        this.window = window;
    }
}

@Component({
    selector: 'fd-slide-tile-example',
    templateUrl: './slide-tile-example.component.html',
    standalone: true,
    imports: [TileModule]
})
export class SlideTileExampleComponent {}

@Component({
    selector: 'fd-action-tile-example',
    templateUrl: './action-tile-example.component.html',
    standalone: true,
    imports: [TileModule, ButtonModule, ContentDensityDirective]
})
export class ActionTileExampleComponent {
    window: any;

    constructor() {
        this.window = window;
    }
}

@Component({
    selector: 'fd-line-tile-example',
    templateUrl: './line-tile-example.component.html',
    standalone: true,
    imports: [TileModule, ContentDensityDirective, ButtonModule]
})
export class LineTileExampleComponent {
    window: any;

    constructor() {
        this.window = window;
    }
}

@Component({
    selector: 'fd-badge-tile-example',
    templateUrl: './badge-tile-example.component.html',
    standalone: true,
    imports: [TileModule]
})
export class BadgeTileExampleComponent {}

@Component({
    selector: 'fd-feed-tile-example',
    templateUrl: './feed-tile-example.component.html',
    standalone: true,
    imports: [TileModule]
})
export class FeedTileExampleComponent {}

@Component({
    selector: 'fd-clickable-tile-example',
    templateUrl: './clickable-tile-example.component.html',
    standalone: true,
    imports: [TileModule]
})
export class ClickableTileExampleComponent {
    onTileClick(): void {
        console.log('tile clicked!');
    }
}
