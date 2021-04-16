import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { DynamicComponentService, RtlService } from '@fundamental-ngx/core';

import { DataProvider, DATA_PROVIDERS } from '../../../domain';
import { PlatformListModule } from '../../list/list.module';
import { StandardListItemModule } from '../../list/standard-list-item/standard-list-item.module';
import { ContentDensity } from '../form-control';
import { FdpFormGroupModule } from '../form-group/fdp-form.module';
import { PlatformMultiInputComponent } from './multi-input.component';
import { PlatformMultiInputModule } from './multi-input.module';

@Component({
    selector: 'fdp-mulit-input-test',
    template: `
        <fdp-form-group #fg>
            <fdp-form-field
                #ffl1
                label="Default Multi Input Field"
                id="input-simple"
                name="reactiveFormInput"
                zone="zLeft"
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
                    [contentDensity]="contentDensity"
                >
                </fdp-multi-input>
            </fdp-form-field>
        </fdp-form-group>
    `
})
class PlatformMulitiInputTest {
    @ViewChild(PlatformMultiInputComponent)
    platformMultiInputComponent: PlatformMultiInputComponent;

    contentDensity: ContentDensity = 'cozy';
    LIST_ELEMENTS = [{ name: 'Name1' }, { name: 'Name2' }, { name: 'Name3' }, { name: 'Name4' }];
}

describe('PlatformMultiInputComponent', () => {
    let component: PlatformMulitiInputTest;
    let fixture: ComponentFixture<PlatformMulitiInputTest>;
    let multiInput: PlatformMultiInputComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PlatformMulitiInputTest, PlatformMultiInputComponent],
            imports: [
                CommonModule,
                FormsModule,
                PlatformMultiInputModule,
                ReactiveFormsModule,
                FdpFormGroupModule,
                PlatformListModule,
                StandardListItemModule,
                RouterTestingModule
            ],
            providers: [DynamicComponentService, RtlService, { provide: DATA_PROVIDERS, useClass: DataProvider as any }]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PlatformMulitiInputTest);
        component = fixture.componentInstance;
        multiInput = component.platformMultiInputComponent;
        fixture.detectChanges();
    });

    async function wait(componentFixture: ComponentFixture<any>): Promise<void> {
        componentFixture.detectChanges();
        await componentFixture.whenStable();
    }

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should open and close the dropdown', async () => {
        component.contentDensity = 'compact';
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
