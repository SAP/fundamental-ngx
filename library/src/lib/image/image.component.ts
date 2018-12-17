import { Component, Input } from '@angular/core';

@Component({
    selector: 'fd-image',
    templateUrl: './image.component.html'
})
export class ImageComponent {
    @Input() size: string = 'm';

    @Input() circle: boolean = false;

    @Input() label: string = 'Image label';

    @Input() photo: string;
}
