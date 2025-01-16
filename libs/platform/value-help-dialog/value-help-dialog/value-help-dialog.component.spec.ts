import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { RtlService } from '@fundamental-ngx/cdk/utils';
import { FD_LANGUAGE, FD_LANGUAGE_ENGLISH } from '@fundamental-ngx/i18n';
import { of } from 'rxjs';
import { PlatformValueHelpDialogModule } from '../value-help-dialog.module';
import { PlatformValueHelpDialogComponent } from './value-help-dialog.component';

@Component({
    template: `
        <fdp-value-help-dialog
            #vhd
            dialogTitle="Simple value help dialog"
            uniqueKey="id"
            tokenViewField="name"
            [dataSource]="data"
        >
            <fdp-value-help-dialog-filter
                main="true"
                key="name"
                label="Name"
                [advanced]="true"
                [include]="true"
                [exclude]="true"
            ></fdp-value-help-dialog-filter>
            <fdp-value-help-dialog-filter
                key="type"
                label="Type"
                [advanced]="true"
                [include]="true"
                [exclude]="true"
            ></fdp-value-help-dialog-filter>
            <fdp-value-help-dialog-filter
                key="code"
                label="Code"
                [advanced]="true"
                [include]="true"
                [exclude]="true"
            ></fdp-value-help-dialog-filter>
        </fdp-value-help-dialog>
    `,
    standalone: true,
    imports: [PlatformValueHelpDialogModule],
    providers: [
        {
            provide: FD_LANGUAGE,
            useValue: of({
                ...FD_LANGUAGE_ENGLISH,
                platformVHD: {
                    ...FD_LANGUAGE_ENGLISH.platformVHD,
                    selectTabTitle: 'Select from list',
                    defineTabTitle: 'Define Conditions'
                }
            })
        }
    ]
})
class TestWrapperComponent {
    @ViewChild(PlatformValueHelpDialogComponent, { static: true })
    vhdComponent: PlatformValueHelpDialogComponent<any>;

    data = Array(10)
        .fill(null)
        .map((_, i) => ({ name: `Name ${i}`, type: `Type ${i}`, code: `${i}` }));
}

describe('PlatformValueHelpDialogComponent', () => {
    let testComponent: TestWrapperComponent;
    let testFixture: ComponentFixture<TestWrapperComponent>;

    function setup(): void {
        TestBed.compileComponents();
        testFixture = TestBed.createComponent(TestWrapperComponent);
        testComponent = testFixture.componentInstance;
        testFixture.detectChanges();
    }

    beforeEach(async () => {
        TestBed.configureTestingModule({
            imports: [NoopAnimationsModule, TestWrapperComponent],
            providers: [RtlService]
        }).overrideComponent(PlatformValueHelpDialogComponent, {
            set: {
                changeDetection: ChangeDetectionStrategy.Default
            }
        });
        setup();
    });

    it('should create', async () => {
        expect(testComponent).toBeTruthy();
        expect(testComponent.vhdComponent).toBeTruthy();
    });

    it('should have value help dialog reference', async () => {
        testComponent.vhdComponent.open();
        expect(!!testComponent.vhdComponent.isOpen).toBe(true);
    });

    it('should have 3 filters', async () => {
        expect(testComponent.vhdComponent.filters.length).toEqual(3);
    });

    it('should have 1 selected items', async () => {
        testComponent.vhdComponent.value = {
            selected: testComponent.data.slice(0, 3)
        };
        testComponent.vhdComponent.open();
        testComponent.vhdComponent.removeSelected(0);
        expect(testComponent.vhdComponent.selectedItems.length).toEqual(2);
    });

    it('should not emit value on cancel', async () => {
        testComponent.vhdComponent.open();
        jest.spyOn(testComponent.vhdComponent.valueChange, 'emit');
        testComponent.vhdComponent.dismiss();
        expect(testComponent.vhdComponent.valueChange.emit).not.toHaveBeenCalled();
    });

    it('should emit value on success', async () => {
        testComponent.vhdComponent.open();
        jest.spyOn(testComponent.vhdComponent.valueChange, 'emit');

        testComponent.vhdComponent.onSelect(testComponent.data.slice(0, 3));
        testComponent.vhdComponent.success();
        expect(testComponent.vhdComponent.valueChange.emit).toHaveBeenCalled();
    });

    it('should emit value once on select', async () => {
        testComponent.vhdComponent.open();
        jest.spyOn(testComponent.vhdComponent.valueChange, 'emit');

        testComponent.vhdComponent.searchSelection = 'once';
        testComponent.vhdComponent.onSelect(testComponent.data.slice(0, 3));
        expect(testComponent.vhdComponent.valueChange.emit).toHaveBeenCalled();
    });

    it('should handle dialog close', async () => {
        testComponent.vhdComponent.open();
        testComponent.vhdComponent._mainSearch = 'test';
        if (testComponent.vhdComponent.activeDialog) {
            testComponent.vhdComponent.activeDialog.close();
        }
        expect(testComponent.vhdComponent._mainSearch).toBe('');
    });
});
