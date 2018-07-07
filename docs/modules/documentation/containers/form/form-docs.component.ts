import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-form',
    templateUrl: './form-docs.component.html'
})
export class FormDocsComponent implements OnInit {
    
inputsFormHtml = `<div fd-form-set>
    <fd-form-item>
        <fd-form-label [forValue]="'input-1'">Default Input</fd-form-label>
        <input fd-form-control type="text" id="input-1" placeholder="Field placeholder text">
    </fd-form-item>
</div>
<div fd-form-set>
    <fd-form-item>
        <fd-form-label [forValue]="'input-2'" [isRequired]="true">Required Input*</fd-form-label>
        <input fd-form-control type="text" id="input-2" placeholder="Field placeholder text">
    </fd-form-item>
</div>
<div fd-form-set>
    <fd-form-item>
        <fd-form-label [forValue]="'input-3'" [isRequired]="true">Password*</fd-form-label>
        <input fd-form-control type="password" id="input-3" placeholder="Field placeholder text">
    </fd-form-item>
</div>
<div fd-form-set>
    <fd-form-item>
        <fd-form-label [forValue]="'textarea-1'">Text area</fd-form-label>
        <textarea fd-form-control id="textarea-1">Pellentesque metus lacus commodo eget justo ut rutrum varius nunc.</textarea>
    </fd-form-item>
</div>`;
    
inputsHelpFormHtml = `<div fd-form-set>
    <fd-form-item>
        <fd-form-label [forValue]="'input-41'">
            Input with inline help
            <span class="fd-inline-help fd-has-float-right">
                <span class="fd-inline-help__content fd-inline-help__content--bottom-right">
                Lorem ipsum dolor sit amet, consectetur adipiscing.
                </span>
            </span>
        </fd-form-label>
        <input fd-form-control type="text" id="input-41">
    </fd-form-item>
</div>
<div fd-form-set>
    <fd-form-item>
        <fd-form-label [forValue]="'input-42'">
            Input with help message
        </fd-form-label>
        <input fd-form-control type="text" id="input-42">
        <fd-form-message [type]="'help'">Pellentesque metus lacus commodo eget justo ut rutrum varius nunc</fd-form-message>
    </fd-form-item>
</div>`;
    
inputStatesFormHtml = `<fd-form-item>
    <fd-form-label [forValue]="'input-51'">
        Normal Input
    </fd-form-label>
    <input fd-form-control type="text" id="input-51" placeholder="Field placeholder text">
    <fd-form-message>Pellentesque metus lacus commodo eget justo ut rutrum varius nunc</fd-form-message>
</fd-form-item>

<fd-form-item>
    <fd-form-label [forValue]="'input-52'">
        Valid Input
    </fd-form-label>
    <input fd-form-control [state]="'valid'" type="text" id="input-52">
</fd-form-item>

<fd-form-item>
    <fd-form-label [forValue]="'input-53'">
        Invalid Input
    </fd-form-label>
    <input fd-form-control [state]="'invalid'" type="text" id="input-53" placeholder="Field placeholder text">
    <fd-form-message [type]="'error'">Pellentesque metus lacus commodo eget justo ut rutrum varius nunc</fd-form-message>
</fd-form-item>

<fd-form-item>
    <fd-form-label [forValue]="'input-53'">
        Warning Input
    </fd-form-label>
    <input fd-form-control [state]="'warning'" type="text" id="input-53" placeholder="Field placeholder text">
    <fd-form-message [type]="'warning'">Pellentesque metus lacus commodo eget justo ut rutrum varius nunc</fd-form-message>
</fd-form-item>

<fd-form-item>
    <fd-form-label [forValue]="'input-53'">
        Disables Input
    </fd-form-label>
    <input fd-form-control type="text" id="input-53" placeholder="Field placeholder text" disabled>
</fd-form-item>

<fd-form-item>
    <fd-form-label [forValue]="'input-53'">
        Readonly Input
    </fd-form-label>
    <input fd-form-control type="text" id="input-53" placeholder="Field placeholder text" readonly>
</fd-form-item>`;
    
selectFormHtml = `<div fd-form-set>
    <fd-form-item>
        <fd-form-label [forValue]="'select-1'">
            Default Select
        </fd-form-label>
        <select fd-form-control id="select-1" name="">
            <option value="1">Duis malesuada odio volutpat elementum</option>
            <option value="2">Suspendisse ante ligula</option>
            <option value="3">Sed bibendum sapien at posuere interdum</option>
        </select>
    </fd-form-item>
</div>

<div fd-form-set>
    <fd-form-item>
        <fd-form-label [forValue]="'select-1'">
            Disabled Select
        </fd-form-label>
        <select fd-form-control id="select-1" name="" disabled>
            <option value="1">Duis malesuada odio volutpat elementum</option>
            <option value="2">Suspendisse ante ligula</option>
            <option value="3">Sed bibendum sapien at posuere interdum</option>
        </select>
    </fd-form-item>
</div>`;
    
radioButtonsFormHtml = `<fieldset fd-form-set>
    <fd-form-legend>Radio buttons</fd-form-legend>
    <fd-form-group> 
        <fd-form-item [isCheck]="true">
            <input fd-form-control type="radio" id="radio-1" name="radio-name-1" value="" checked>
            <fd-form-label [forValue]="'radio-1'">Option One</fd-form-label>
        </fd-form-item>
        <fd-form-item [isCheck]="true">
            <input fd-form-control type="radio" id="radio-2" name="radio-name-1" value="">
            <fd-form-label [forValue]="'radio-2'">Option Two</fd-form-label>
        </fd-form-item>
        <fd-form-item [isCheck]="true">
            <input fd-form-control type="radio" id="radio-3" name="radio-name-1" value="">
            <fd-form-label [forValue]="'radio-3'">Option Three</fd-form-label>
        </fd-form-item>
    </fd-form-group> 
</fieldset>

<fieldset fd-form-set>
    <fd-form-legend>Inline Radio buttons</fd-form-legend>
    <fd-form-group> 
        <fd-form-item [isInline]="true" [isCheck]="true">
            <input fd-form-control type="radio" id="radio-4" name="radio-name-2" value="" checked>
            <fd-form-label [forValue]="'radio-4'">Option One</fd-form-label>
        </fd-form-item>
        <fd-form-item [isInline]="true" [isCheck]="true">
            <input fd-form-control type="radio" id="radio-5" name="radio-name-2" value="">
            <fd-form-label [forValue]="'radio-5'">Option Two</fd-form-label>
        </fd-form-item>
        <fd-form-item [isInline]="true" [isCheck]="true">
            <input fd-form-control type="radio" id="radio-6" name="radio-name-2" value="">
            <fd-form-label [forValue]="'radio-6'">Option Three</fd-form-label>
        </fd-form-item>
    </fd-form-group>
</fieldset>`;

checkboxFormHtml = `<fieldset fd-form-set>
    <fd-form-legend>Checkboxes</fd-form-legend>
    <fd-form-item [isCheck]="true">
        <input fd-form-control type="checkbox" id="checkbox-1" name="checkbox-name-1" checked>
        <fd-form-label [forValue]="'checkbox-1'">Option One</fd-form-label>
    </fd-form-item>
    <fd-form-item [isCheck]="true">
        <input fd-form-control type="checkbox" id="checkbox-2" name="checkbox-name-1">
        <fd-form-label [forValue]="'checkbox-2'">Option Two</fd-form-label>
    </fd-form-item>
    <fd-form-item [isCheck]="true">
        <input fd-form-control type="checkbox" id="checkbox-3" name="checkbox-name-1">
        <fd-form-label [forValue]="'checkbox-3'">Option Three</fd-form-label>
    </fd-form-item>
</fieldset>

<fieldset fd-form-set>
    <fd-form-legend>Checkboxes inline</fd-form-legend>
    <fd-form-group>
        <fd-form-item [isInline]="true" [isCheck]="true">
            <input fd-form-control type="checkbox" id="checkbox-1" name="checkbox-name-1" checked>
            <fd-form-label [forValue]="'checkbox-1'">Option One</fd-form-label>
        </fd-form-item>
        <fd-form-item [isInline]="true" [isCheck]="true">
            <input fd-form-control type="checkbox" id="checkbox-2" name="checkbox-name-1">
            <fd-form-label [forValue]="'checkbox-2'">Option Two</fd-form-label>
        </fd-form-item>
        <fd-form-item [isInline]="true" [isCheck]="true">
            <input fd-form-control type="checkbox" id="checkbox-3" name="checkbox-name-1">
            <fd-form-label [forValue]="'checkbox-3'">Option Three</fd-form-label>
        </fd-form-item>
    </fd-form-group>
</fieldset>
`;

    constructor() {}

    ngOnInit() {}
}
