import { Component } from '@angular/core';

@Component({
    selector: 'fd-tile-generic-example',
    templateUrl: './tile-generic-example.component.html'
})
export class TileGenericExampleComponent {
    window: any;

    constructor() {
        this.window = window;
    }
}

@Component({
    selector: 'fd-tile-columns-example',
    templateUrl: './tile-columns-example.component.html'
})
export class TileColumnsExampleComponent {}

@Component({
    selector: 'fd-launch-tile-example',
    templateUrl: './launch-tile-example.component.html'
})
export class LaunchTileExampleComponent {
    window: any;

    constructor() {
        this.window = window;
    }
}

@Component({
    selector: 'fd-kpi-tile-example',
    templateUrl: './kpi-tile-example.component.html'
})
export class KpiTileExampleComponent {
    window: any;

    constructor() {
        this.window = window;
    }
}

@Component({
    selector: 'fd-slide-tile-example',
    templateUrl: './slide-tile-example.component.html'
})
export class SlideTileExampleComponent {}

@Component({
    selector: 'fd-action-tile-example',
    templateUrl: './action-tile-example.component.html'
})
export class ActionTileExampleComponent {
    window: any;

    constructor() {
        this.window = window;
    }
}

@Component({
    selector: 'fd-line-tile-example',
    templateUrl: './line-tile-example.component.html'
})
export class LineTileExampleComponent {
    window: any;

    constructor() {
        this.window = window;
    }
}

@Component({
    selector: 'fd-badge-tile-example',
    templateUrl: './badge-tile-example.component.html'
})
export class BadgeTileExampleComponent {}

@Component({
    selector: 'fd-feed-tile-example',
    templateUrl: './feed-tile-example.component.html'
})
export class FeedTileExampleComponent {}

@Component({
    selector: 'fd-clickable-tile-example',
    templateUrl: './clickable-tile-example.component.html'
})
export class ClickableTileExampleComponent {
    onTileClick(): void {
        console.log('tile clicked!');
    }
}
