import { LocalizationEditorItemComponent } from '../localization-editor-item/localization-editor-item.component';
/**
 *  Component that represents the field which is always visible and is rendered outside the popover.
 *  ```html
 *  <fd-localization-editor-main [label]="'EN'">
 *       <input fd-localization-editor-input type="text" placeholder="EN">
 *  </fd-localization-editor-main>
 *  ```
 */
export declare class LocalizationEditorMainComponent extends LocalizationEditorItemComponent {
    /**
     * @hidden
     * This variable is controlled by parent component
     * */
    expanded: boolean;
}
