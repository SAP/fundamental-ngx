import { Component } from '@angular/core';
import { Icons } from '../../../../documentation/utilities/icons';

@Component({
    selector: 'fd-icon-example',
    templateUrl: './icon-example.component.html',
    styleUrls: ['icon-example.component.scss']
})
export class IconExampleComponent {

    icons: string[] = Icons;
}
