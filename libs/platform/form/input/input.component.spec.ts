import { runValueAccessorTests } from 'ngx-cva-test-suite';
import { InputComponent } from '../';
import { PlatformInputModule } from './fdp-input.module';

const INPUT_IDENTIFIER = 'platform-input-unit-test';

runValueAccessorTests({
    component: InputComponent,
    name: 'Input',
    testModuleMetadata: {
        imports: [PlatformInputModule]
    },
    additionalSetup: (fixture, done) => {
        fixture.componentInstance.id = INPUT_IDENTIFIER;
        fixture.componentInstance.name = INPUT_IDENTIFIER;
        done();
    },
    supportsOnBlur: true,
    nativeControlSelector: `input[id="${INPUT_IDENTIFIER}"]`,
    internalValueChangeSetter: (fixture, value) => {
        fixture.componentInstance.value = value;
    },
    getComponentValue: (fixture) => fixture.componentInstance.value
});
