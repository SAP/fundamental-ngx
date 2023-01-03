import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RtlService } from '@fundamental-ngx/cdk/utils';
import { PlatformValueHelpDialogComponent } from './value-help-dialog.component';
import { PlatformValueHelpDialogModule } from '../value-help-dialog.module';

@Component({
    template: `
        <fdp-value-help-dialog
            #vhd
            dialogTitle="Simple value help dialog"
            uniqueKey="id"
            tokenViewField="name"
            selectTabTitle="Select from list"
            defineTabTitle="Define Conditions"
            [dataSource]="data"
        >
            <fdp-value-help-dialog-search placeholder="Search..."></fdp-value-help-dialog-search>
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
    `
})
class TestWrapperComponent {
    data = Array(10)
        .fill(null)
        .map((_, i) => ({ name: `Name ${i}`, type: `Type ${i}`, code: `${i}` }));

    @ViewChild(PlatformValueHelpDialogComponent, { static: true })
    vhdComponent: PlatformValueHelpDialogComponent<any>;
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
            imports: [NoopAnimationsModule, PlatformValueHelpDialogModule],
            declarations: [TestWrapperComponent],
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
        expect(!!testComponent.vhdComponent.isOpen).toBeTrue();
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
        spyOn(testComponent.vhdComponent.valueChange, 'emit').and.callThrough();
        testComponent.vhdComponent.dismiss();
        expect(testComponent.vhdComponent.valueChange.emit).not.toHaveBeenCalled();
    });

    it('should emit value on success', async () => {
        testComponent.vhdComponent.open();
        spyOn(testComponent.vhdComponent.valueChange, 'emit').and.callThrough();

        testComponent.vhdComponent.onSelect(testComponent.data.slice(0, 3));
        testComponent.vhdComponent.success();
        expect(testComponent.vhdComponent.valueChange.emit).toHaveBeenCalled();
    });

    it('should emit value once on select', async () => {
        testComponent.vhdComponent.open();
        spyOn(testComponent.vhdComponent.valueChange, 'emit').and.callThrough();

        testComponent.vhdComponent.searchSelection = 'once';
        testComponent.vhdComponent.onSelect(testComponent.data.slice(0, 3));
        expect(testComponent.vhdComponent.valueChange.emit).toHaveBeenCalled();
    });
});
