import { Component, Input, ViewEncapsulation } from '@angular/core';

/**
 * The component that represents an image. 
 *
 * ```html
 * <fd-image style="margin-right: 10px;" [size]="'l'" [circle]="true" [photo]="'https://placeimg.com/400/400/nature'"></fd-image>
 * ```
 */
@Component({
    selector: 'fd-image',
    templateUrl: './image.component.html',
    styleUrls: ['./image.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ImageComponent {
    /** 
     * The size of the image. 
     * The predefined values for the size are *s*, *m*, and *l*.
     */
    @Input() size: string = 'm';

    /** 
     * Whether to render a circle style for the image. 
     */
    @Input() circle: boolean = false;

    /** 
     * The image label. 
     */
    @Input() label: string = 'Image label';

    /** 
     * The image url. 
     */
    @Input() photo: string;
}
