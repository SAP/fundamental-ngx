import { Component } from '@angular/core';
import { TextComponent } from '@fundamental-ngx/core/text';

@Component({
    selector: 'fd-text-max-lines',
    templateUrl: './text-max-lines.component.html',
    imports: [TextComponent]
})
export class TextMaxLinesComponent {
    protected readonly text = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vestibulum justo non dui viverra mattis. Fusce venenatis tortor sit amet neque volutpat, eu mollis eros pulvinar. Duis sagittis aliquam lacus, quis tempor nisi vulputate et. Integer sagittis, metus ac hendrerit luctus, enim diam hendrerit nisl, et pretium turpis magna sed felis. Etiam volutpat condimentum justo at auctor. Sed imperdiet elementum ex, at semper metus vestibulum vitae. Quisque orci odio, tincidunt sed felis et, porta ultricies ligula. Etiam finibus, diam nec ultrices ultricies, odio nisi pretium augue, eget pharetra ipsum massa quis purus. Curabitur ante sapien, pharetra sed convallis non, vehicula nec leo.`;
}
