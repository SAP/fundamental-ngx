import { CoreBaseComponentPo } from './core-base-component.po';
import { waitForElDisplayed, waitForPresent } from '../../driver/wdio';

export class ObjectMarkerPo extends CoreBaseComponentPo {
    private url = '/object-marker';
    root = '#page-content';

    marker = '.fd-object-marker';
    iconOnlyMarkers = 'fd-object-marker-example span';
    clickableMarkers = '[ng-reflect-clickable="true"]';

    open(): void {
        super.open(this.url);
        waitForElDisplayed(this.root);
        waitForPresent(this.marker);
    }
}
