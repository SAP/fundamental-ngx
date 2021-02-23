import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'fd-illustrated-message-illustration',
    template: `
    <svg class="fd-illustrated-message__illustration">
        <use [attr.xlink:href]="svgUrl + '#' + svgId"></use>
    </svg>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class IllustratedMessageIllustrationComponent {
    /** 
     * The url of the svg that is part of forms xlink:href
     */
    @Input() svgUrl: string;
    
    /** 
     * The id of the svg that is part of forms xlink:href
     */
    @Input() svgId: string;
}
