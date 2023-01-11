import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { DynamicComponentService, RtlService } from '@fundamental-ngx/cdk/utils';
import { DATA_PROVIDERS, DataProvider } from '@fundamental-ngx/platform/shared';
import { StandardListItemModule } from '@fundamental-ngx/platform/list';
import { FdpFormGroupModule } from '../form-group/fdp-form.module';
import { PlatformMultiInputComponent } from './multi-input.component';
import { PlatformMultiInputModule } from './multi-input.module';
import { CVATestSteps, runValueAccessorTests } from 'ngx-cva-test-suite';
import { ContentDensityMode } from '@fundamental-ngx/core/content-density';

@Component({
    selector: 'fdp-mulit-input-test',
    template: `
        <fdp-form-group #fg>
            <fdp-form-field
                #ffl1
                label="Default Multi Input Field"
                id="input-simple"
                rank="1"
                placeholder="Field placeholder text"
            >
                <fdp-multi-input
                    [formControl]="ffl1.formControl"
                    placeholder="Field placeholder text"
                    type="text"
                    id="fdp-id"
                    name="input1"
                    [dataSource]="LIST_ELEMENTS"
                    displayKey="name"
                    [fdContentDensity]="contentDensity"
                >
                </fdp-multi-input>
            </fdp-form-field>
        </fdp-form-group>
    `
})
class PlatformMulitiInputTestComponent {
    @ViewChild(PlatformMultiInputComponent)
    platformMultiInputComponent: PlatformMultiInputComponent;

    contentDensity: ContentDensityMode = ContentDensityMode.COZY;
    LIST_ELEMENTS = [{ name: 'Name1' }, { name: 'Name2' }, { name: 'Name3' }, { name: 'Name4' }];
}

describe('PlatformMultiInputComponent', () => {
    let component: PlatformMulitiInputTestComponent;
    let fixture: ComponentFixture<PlatformMulitiInputTestComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PlatformMulitiInputTestComponent],
            imports: [
                PlatformMultiInputModule,
                ReactiveFormsModule,
                FdpFormGroupModule,
                StandardListItemModule,
                RouterTestingModule
            ],
            providers: [DynamicComponentService, RtlService, { provide: DATA_PROVIDERS, useClass: DataProvider as any }]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PlatformMulitiInputTestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should open and close the dropdown', async () => {
        component.contentDensity = ContentDensityMode.COMPACT;
        fixture.detectChanges();
        const toggleButton = fixture.nativeElement.querySelectorAll('fd-input--compact');
        expect(toggleButton.length).toBe(0);
    });
    it('should check adding number of tokens in the component', async () => {
        component.platformMultiInputComponent.addToArray('name1');
        fixture.detectChanges();
        const toggleButton = fixture.nativeElement.querySelectorAll('.fd-token');
        expect(toggleButton.length).toBe(1);
    });
});

const MULTI_INPUT_IDENTIFIER = 'platform-multi-input-unit-test';

runValueAccessorTests({
    component: PlatformMultiInputComponent,
    name: 'Multi input',
    testModuleMetadata: {
        imports: [PlatformMultiInputModule],
        providers: [DynamicComponentService]
    },
    additionalSetup: (fixture, done) => {
        fixture.componentInstance.id = MULTI_INPUT_IDENTIFIER;
        fixture.componentInstance.name = MULTI_INPUT_IDENTIFIER;
        done();
    },
    supportsOnBlur: false,
    nativeControlSelector: `input[id="${MULTI_INPUT_IDENTIFIER}"]`,
    internalValueChangeSetter: (fixture, value) => {
        fixture.componentInstance.value = value;
    },
    getComponentValue: (fixture) => fixture.componentInstance.value,
    getValues: () => [['a'], ['b'], ['c']],
    excludeSteps: [CVATestSteps.ValueChangedInternally]
});
