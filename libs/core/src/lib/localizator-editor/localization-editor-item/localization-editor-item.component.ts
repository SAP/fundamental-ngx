import {
    AfterContentInit,
    Component,
    ContentChild,
    Input,
    OnChanges,
    OnInit,
    TemplateRef,
    ViewEncapsulation
} from '@angular/core';
import {
    LocalizationEditorInputDirective,
    LocalizationEditorLabel,
    LocalizationEditorTextareaDirective
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
    encapsulation: ViewEncapsulation.None
})
export class LocalizationEditorItemComponent implements OnInit, AfterContentInit, OnChanges {

    /** @hidden */
    type: string;

    /** The text for the add-on on the right side. */
    @Input()
    label: string;

    /** Whether to apply compact mode to to field. */
    @Input()
    compact: boolean;

    /** @hidden */
    @ContentChild(LocalizationEditorInputDirective)
    input: LocalizationEditorInputDirective;

    /** @hidden */
    @ContentChild(LocalizationEditorTextareaDirective)
    textarea: LocalizationEditorTextareaDirective;

    /** @hidden */
    @ContentChild(LocalizationEditorLabel, { read: TemplateRef })
    labelTemplate: TemplateRef<any>;

    /** @hidden */
    ngOnInit(): void {
        this.refreshChildInput();
    }

    ngOnChanges(): void {
        this.refreshChildInput();
    }

    ngAfterContentInit(): void {
        if (this.textarea) {
            this.type = 'textarea';
        }
    }

    private refreshChildInput(): void {
        if (this.input) {
            this.input.compact = this.compact;
        }
        if (this.textarea) {
            this.textarea.compact = this.compact;
        }
    }
}
