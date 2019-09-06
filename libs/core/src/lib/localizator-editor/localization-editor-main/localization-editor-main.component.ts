import { Component, ViewEncapsulation } from '@angular/core';
import { LocalizationEditorItemComponent } from '../localization-editor-item/localization-editor-item.component';

/**
 *  Component that represents the field which is always visible and is rendered outside the popover.
 *  ```html
 *  <fd-localization-editor-main [label]="'EN'">
 *       <input fd-localization-editor-input type="text" placeholder="EN">
 *  </fd-localization-editor-main>
 *  ```
 */
@Component({
    selector: 'fd-localization-editor-main',
    templateUrl: './localization-editor-main.component.html',
    encapsulation: ViewEncapsulation.None
})
export class LocalizationEditorMainComponent extends LocalizationEditorItemComponent {

    /**
     * @hidden
     * This variable is controlled by parent component
     * */
    expanded: boolean;
}
