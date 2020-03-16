import {
    AfterContentInit, ChangeDetectionStrategy,
    Component,
    ContentChild,
    Input,
    OnChanges,
    OnInit,
    TemplateRef,
    ViewEncapsulation
} from '@angular/core';
import {
    LocalizationEditorLabel
} from '../localization-editor.directives';

/**
 *  Component that represents field with add-on.
 *  ```html
 *  <fd-localization-editor-item [label]="'EN'">
 *      <input fd-localization-editor-input type="text" placeholder="EN">
 *  </fd-localization-editor-item>
 *  ```
 */
@Component({
    selector: 'fd-localization-editor-item',
    templateUrl: './localization-editor-item.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LocalizationEditorItemComponent {

    /** @hidden */
    type: string;

    /** The text for the add-on on the right side. */
    @Input()
    label: string;

    /** Whether to apply compact mode to to field. */
    @Input()
    compact: boolean;

    /** @hidden */
    @ContentChild(LocalizationEditorLabel, { read: TemplateRef })
    labelTemplate: TemplateRef<any>;
}
