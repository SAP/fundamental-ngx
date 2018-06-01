import { Component, Input } from '@angular/core';

@Component({
  selector: 'fd-image',
  template: `
    <span 
    [ngClass]='(size ? "fd-image--" + size : "") + (circle ? " fd-image--circle" : "") '
    [attr.aria-label]='label'
    [ngStyle]= "{'background-image': 'url(' + photo + ')'}">
    </span>
  `
})
export class Image {
  @Input() size: string = 'm';

  @Input() circle: boolean = false;

  @Input() label: string = 'Image label';

  @Input() photo: string;
}
