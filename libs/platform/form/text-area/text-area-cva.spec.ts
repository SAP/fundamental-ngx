import { CVATestSteps, runValueAccessorTests } from 'ngx-cva-test-suite';
import { TextAreaComponent } from './text-area.component';
import { PlatformTextAreaModule } from './text-area.module';

const TEXTAREA_IDENTIFIER = 'platform-textarea-unit-test';

runValueAccessorTests({
    component: TextAreaComponent,
    name: 'Textarea',
    testModuleMetadata: {
        imports: [PlatformTextAreaModule]
    },
    resetCustomValue: {
        value: ''
    },
    supportsOnBlur: false,
    nativeControlSelector: `textarea[id="${TEXTAREA_IDENTIFIER}"]`,
    internalValueChangeSetter: (fixture, value) => {
        fixture.componentInstance.value = value;
    },
    getValues: () => ['some text string', 'some text string', 'some text string'],
    getComponentValue: (fixture) => fixture.componentInstance.value,
    excludeSteps: [CVATestSteps.ValueChangedInternally]
});
