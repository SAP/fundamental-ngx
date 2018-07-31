import { Component } from '@angular/core';

@Component({
    selector: 'app-form',
    templateUrl: './form-docs.component.html'
})
export class FormDocsComponent {
    inputsFormHtml =
        '<div fd-form-set>\n' +
        '  <div fd-form-item>\n' +
        '    <fd-form-label forValue="input-1">Default Input</fd-form-label>\n' +
        '    <input fd-form-control [type]="\'text\'" id="input-1" placeholder="Field placeholder text">\n' +
        '  </div>\n' +
        '</div>\n' +
        '<div fd-form-set>\n' +
        '  <div fd-form-item>\n' +
        '    <fd-form-label forValue="input-2" [isRequired]="true">Required Input*</fd-form-label>\n' +
        '    <input fd-form-control [type]="\'text\'" id="input-2" placeholder="Field placeholder text">\n' +
        '  </div>\n' +
        '</div>\n' +
        '<div fd-form-set>\n' +
        '  <div fd-form-item>\n' +
        '    <fd-form-label forValue="input-3" [isRequired]="true">Password*</fd-form-label>\n' +
        '    <input fd-form-control [type]="\'password\'" id="input-3" placeholder="Field placeholder text">\n' +
        '  </div>\n' +
        '</div>\n' +
        '<div fd-form-set>\n' +
        '  <div fd-form-item>\n' +
        '    <fd-form-label forValue="textarea-1">Text area</fd-form-label>\n' +
        '    <textarea fd-form-control id="textarea-1">Pellentesque metus lacus commodo eget justo ut rutrum varius nunc.</textarea>\n' +
        '  </div>\n' +
        '</div>';

    inputsHelpFormHtml =
        '<div fd-form-set>\n' +
        '  <div fd-form-item>\n' +
        '    <fd-form-label forValue="input-41">\n' +
        '      Input with inline help\n' +
        '      <span class="fd-inline-help fd-has-float-right">\n' +
        '        <span class="fd-inline-help__content fd-inline-help__content--bottom-right">\n' +
        '          Lorem ipsum dolor sit amet, consectetur adipiscing.\n' +
        '        </span>\n' +
        '      </span>\n' +
        '    </fd-form-label>\n' +
        '    <input fd-form-control [type]="\'text\'" id="input-41">\n' +
        '  </div>\n' +
        '</div>\n' +
        '<div fd-form-set>\n' +
        '  <div fd-form-item>\n' +
        '    <fd-form-label forValue="input-42">\n' +
        '      Input with help message\n' +
        '    </fd-form-label>\n' +
        '    <input fd-form-control [type]="\'text\'" id="input-42">\n' +
        '    <fd-form-message [type]="\'help\'">Pellentesque metus lacus commodo eget justo ut rutrum varius nunc</fd-form-message>\n' +
        '  </div>\n' +
        '</div>';

    inputStatesFormHtml =
        '<div fd-form-item>\n' +
        '  <fd-form-label forValue="input-51">\n' +
        '    Normal Input\n' +
        '  </fd-form-label>\n' +
        '  <input fd-form-control [type]="\'text\'" id="input-51" placeholder="Field placeholder text">\n' +
        '  <fd-form-message>Pellentesque metus lacus commodo eget justo ut rutrum varius nunc</fd-form-message>\n' +
        '</div>\n' +
        '<div fd-form-item>\n' +
        '  <fd-form-label forValue="input-52">\n' +
        '    Valid Input\n' +
        '  </fd-form-label>\n' +
        '  <input fd-form-control [state]="\'valid\'" [type]="\'text\'" id="input-52">\n' +
        '</div>\n' +
        '<div fd-form-item>\n' +
        '  <fd-form-label forValue="input-53">\n' +
        '    Invalid Input\n' +
        '  </fd-form-label>\n' +
        '  <input fd-form-control [state]="\'invalid\'" [type]="\'text\'" id="input-53" placeholder="Field placeholder text">\n' +
        '  <fd-form-message [type]="\'error\'">Pellentesque metus lacus commodo eget justo ut rutrum varius nunc</fd-form-message>\n' +
        '</div>\n' +
        '<div fd-form-item>\n' +
        '  <fd-form-label forValue="input-54">\n' +
        '    Warning Input\n' +
        '  </fd-form-label>\n' +
        '  <input fd-form-control [state]="\'warning\'" [type]="\'text\'" id="input-54" placeholder="Field placeholder text">\n' +
        '  <fd-form-message [type]="\'warning\'">Pellentesque metus lacus commodo eget justo ut rutrum varius nunc</fd-form-message>\n' +
        '</div>\n' +
        '<div fd-form-item>\n' +
        '  <fd-form-label forValue="input-55">\n' +
        '    Disables Input\n' +
        '  </fd-form-label>\n' +
        '  <input fd-form-control [type]="\'text\'" id="input-55" placeholder="Field placeholder text" disabled>\n' +
        '</div>\n' +
        '<div fd-form-item>\n' +
        '  <fd-form-label forValue="input-56">\n' +
        '    Readonly Input\n' +
        '  </fd-form-label>\n' +
        '  <input fd-form-control [type]="\'text\'" id="input-56" placeholder="Field placeholder text" readonly>\n' +
        '</div>';

    selectFormHtml =
        '<div fd-form-set>\n' +
        '  <div fd-form-item>\n' +
        '    <fd-form-label forValue="select-1">\n' +
        '      Default Select\n' +
        '    </fd-form-label>\n' +
        '    <select fd-form-control id="select-1" name="">\n' +
        '      <option value="1">Duis malesuada odio volutpat elementum</option>\n' +
        '      <option value="2">Suspendisse ante ligula</option>\n' +
        '      <option value="3">Sed bibendum sapien at posuere interdum</option>\n' +
        '    </select>\n' +
        '  </div>\n' +
        '</div>\n' +
        '<div fd-form-set>\n' +
        '  <div fd-form-item>\n' +
        '    <fd-form-label forValue="select-2">\n' +
        '      Disabled Select\n' +
        '    </fd-form-label>\n' +
        '    <select fd-form-control id="select-2" name="" disabled>\n' +
        '      <option value="1">Duis malesuada odio volutpat elementum</option>\n' +
        '      <option value="2">Suspendisse ante ligula</option>\n' +
        '      <option value="3">Sed bibendum sapien at posuere interdum</option>\n' +
        '    </select>\n' +
        '  </div>\n' +
        '</div>';

    radioButtonsFormHtml =
        '<fieldset fd-form-set>\n' +
        '  <fd-form-legend>Radio buttons</fd-form-legend>\n' +
        '  <fd-form-group>\n' +
        '    <div fd-form-item [isCheck]="true">\n' +
        '      <input fd-form-control [type]="\'radio\'" id="radio-1" name="radio-name-1" value="" checked>\n' +
        '      <fd-form-label forValue="radio-1">Option One</fd-form-label>\n' +
        '    </div>\n' +
        '    <div fd-form-item [isCheck]="true">\n' +
        '      <input fd-form-control [type]="\'radio\'" id="radio-2" name="radio-name-1" value="">\n' +
        '      <fd-form-label forValue="radio-2">Option Two</fd-form-label>\n' +
        '    </div>\n' +
        '    <div fd-form-item [isCheck]="true">\n' +
        '      <input fd-form-control [type]="\'radio\'" id="radio-3" name="radio-name-1" value="">\n' +
        '      <fd-form-label forValue="radio-3">Option Three</fd-form-label>\n' +
        '    </div>\n' +
        '  </fd-form-group>\n' +
        '</fieldset>\n' +
        '\n' +
        '<fieldset fd-form-set>\n' +
        '  <fd-form-legend>Radio buttons disabled</fd-form-legend>\n' +
        '  <fd-form-group>\n' +
        '    <div fd-form-item [isCheck]="true">\n' +
        '      <input fd-form-control [type]="\'radio\'" id="radio-4" name="radio-name-2" value="" checked disabled>\n' +
        '      <fd-form-label forValue="radio-4">Option One</fd-form-label>\n' +
        '    </div>\n' +
        '    <div fd-form-item [isCheck]="true">\n' +
        '      <input fd-form-control [type]="\'radio\'" id="radio-5" name="radio-name-2" value="" disabled>\n' +
        '      <fd-form-label forValue="radio-5">Option Two</fd-form-label>\n' +
        '    </div>\n' +
        '    <div fd-form-item [isCheck]="true">\n' +
        '      <input fd-form-control [type]="\'radio\'" id="radio-6" name="radio-name-2" value="" disabled>\n' +
        '      <fd-form-label forValue="radio-6">Option Three</fd-form-label>\n' +
        '    </div>\n' +
        '  </fd-form-group>\n' +
        '</fieldset>\n' +
        '\n' +
        '<fieldset fd-form-set>\n' +
        '  <fd-form-legend>Inline Radio buttons</fd-form-legend>\n' +
        '  <fd-form-group>\n' +
        '    <div fd-form-item [isInline]="true" [isCheck]="true">\n' +
        '      <fd-form-label forValue="radio-7">\n' +
        '        <input fd-form-control [type]="\'radio\'" id="radio-7" name="radio-name-3" value="" checked> Option One\n' +
        '      </fd-form-label>\n' +
        '    </div>\n' +
        '    <div fd-form-item [isInline]="true" [isCheck]="true">\n' +
        '      <fd-form-label forValue="radio-8">\n' +
        '        <input fd-form-control [type]="\'radio\'" id="radio-8" name="radio-name-3" value=""> Option Two\n' +
        '      </fd-form-label>\n' +
        '    </div>\n' +
        '    <div fd-form-item [isInline]="true" [isCheck]="true">\n' +
        '      <fd-form-label forValue="radio-9">\n' +
        '        <input fd-form-control [type]="\'radio\'" id="radio-9" name="radio-name-3" value=""> Option Three\n' +
        '      </fd-form-label>\n' +
        '    </div>\n' +
        '  </fd-form-group>\n' +
        '</fieldset>';

    checkboxFormHtml =
        '    <fieldset fd-form-set>\n' +
        '      <fd-form-legend>Checkboxes</fd-form-legend>\n' +
        '      <div fd-form-item [isCheck]="true">\n' +
        '        <input fd-form-control [type]="\'checkbox\'" id="checkbox-1" name="checkbox-name-1" checked>\n' +
        '        <fd-form-label forValue="checkbox-1">Option One</fd-form-label>\n' +
        '      </div>\n' +
        '      <div fd-form-item [isCheck]="true">\n' +
        '        <input fd-form-control [type]="\'checkbox\'" id="checkbox-2" name="checkbox-name-1">\n' +
        '        <fd-form-label forValue="checkbox-2">Option Two</fd-form-label>\n' +
        '      </div>\n' +
        '      <div fd-form-item [isCheck]="true">\n' +
        '        <input fd-form-control [type]="\'checkbox\'" id="checkbox-3" name="checkbox-name-1">\n' +
        '        <fd-form-label forValue="checkbox-3">Option Three</fd-form-label>\n' +
        '      </div>\n' +
        '    </fieldset>\n' +
        '\n' +
        '    <fieldset fd-form-set>\n' +
        '      <fd-form-legend>Checkboxes disabled</fd-form-legend>\n' +
        '      <div fd-form-item [isCheck]="true">\n' +
        '        <input fd-form-control [type]="\'checkbox\'" id="checkbox-4" name="checkbox-name-2" disabled>\n' +
        '        <fd-form-label forValue="checkbox-4">Option One</fd-form-label>\n' +
        '      </div>\n' +
        '      <div fd-form-item [isCheck]="true">\n' +
        '        <input fd-form-control [type]="\'checkbox\'" id="checkbox-5" name="checkbox-name-2" checked disabled>\n' +
        '        <fd-form-label forValue="checkbox-5">Option Two</fd-form-label>\n' +
        '      </div>\n' +
        '      <div fd-form-item [isCheck]="true">\n' +
        '        <input fd-form-control [type]="\'checkbox\'" id="checkbox-6" name="checkbox-name-2" disabled>\n' +
        '        <fd-form-label forValue="checkbox-6">Option Three</fd-form-label>\n' +
        '      </div>\n' +
        '    </fieldset>\n' +
        '\n' +
        '    <div fd-form-set>\n' +
        '        <div fd-form-item>\n' +
        '            <fd-form-label forValue="input-21" [isRequired]="true">Required Input*</fd-form-label>\n' +
        '            <input fd-form-control [type]="\'text\'" id="input-21" placeholder="Field placeholder text">\n' +
        '        </div>\n' +
        '    </div>\n' +
        '\n' +
        '    <fieldset fd-form-set>\n' +
        '      <fd-form-legend>Checkboxes inline</fd-form-legend>\n' +
        '      <fd-form-group>\n' +
        '        <div fd-form-item [isInline]="true" [isCheck]="true">\n' +
        '          <fd-form-label forValue="checkbox-7">\n' +
        '            <input fd-form-control [type]="\'checkbox\'" id="checkbox-7" name="checkbox-name-3" checked> Option One\n' +
        '          </fd-form-label>\n' +
        '        </div>\n' +
        '        <div fd-form-item [isInline]="true" [isCheck]="true">\n' +
        '          <fd-form-label forValue="checkbox-8">\n' +
        '            <input fd-form-control [type]="\'checkbox\'" id="checkbox-8" name="checkbox-name-3"> Option Two\n' +
        '          </fd-form-label>\n' +
        '        </div>\n' +
        '        <div fd-form-item [isInline]="true" [isCheck]="true">\n' +
        '          <fd-form-label forValue="checkbox-9">\n' +
        '            <input fd-form-control [type]="\'checkbox\'" id="checkbox-9" name="checkbox-name-3"> Option Three\n' +
        '          </fd-form-label>\n' +
        '        </div>\n' +
        '      </fd-form-group>\n' +
        '    </fieldset>';
}
