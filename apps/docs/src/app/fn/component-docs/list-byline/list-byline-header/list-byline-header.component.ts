import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-list-header',
    templateUrl: './list-byline-header.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListBylineHeaderComponent {}
