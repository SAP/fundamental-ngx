import { ChangeDetectionStrategy, Input, Component, ViewEncapsulation } from '@angular/core';
import { LocalizationEditorItemComponent } from '../localization-editor-item/localization-editor-item.component';
import { FormStates } from '../../form/form-control/form-states';

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
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LocalizationEditorMainComponent extends LocalizationEditorItemComponent {

    /**
     * @hidden
     * This variable is controlled by parent component
     * */
    expanded: boolean;

    /**
     *  The state of the form control - applies css classes.
     *  Can be `success`, `error`, `warning`, `information` or blank for default.
     */
    @Input()
    state: FormStates;

    /**
     * Whether AddOn Button should be focusable, set to true by default
     */
    @Input()
    buttonFocusable: boolean = true;
}
