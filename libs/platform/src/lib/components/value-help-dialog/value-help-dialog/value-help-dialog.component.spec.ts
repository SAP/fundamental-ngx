import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatformValueHelpDialogComponent } from './value-help-dialog.component';
import { PlatformValueHelpDialogModule } from '../value-help-dialog.module';

async function whenStable(fixture: ComponentFixture<any>): Promise<void> {
  fixture.changeDetectorRef.markForCheck();
  fixture.detectChanges();
  await fixture.whenStable();
}
@Component({
  template: `
    <fdp-value-help-dialog #vhd
        dialogTitle="Simple value help dialog"
        uniqueKey="id"
        selectTabTitle="Select from list"
        defineTabTitle="Define Conditions"
        [dataSource]="data"
    >
        <fdp-value-help-dialog-search
            placeholder="Search..."
        ></fdp-value-help-dialog-search>
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
  data = Array(10).fill(null).map((_, i) => {
    return { name: `Name ${ i }`, type: `Type ${ i }`, code: `${ i }` };
  });

  @ViewChild(PlatformValueHelpDialogComponent, {static: true})
  vhdComponent: PlatformValueHelpDialogComponent<any>;
}

describe('PlatformValueHelpDialogComponent', () => {
  let testComponent: TestWrapperComponent;
  let testFixture: ComponentFixture<TestWrapperComponent>;


  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        PlatformValueHelpDialogModule
      ],
      declarations: [
        TestWrapperComponent
      ]
    })
    .overrideComponent(
      PlatformValueHelpDialogComponent,
      {
        set: {
          changeDetection: ChangeDetectionStrategy.Default
        }
      }
    );
  });


  function setup(): void {
    TestBed.compileComponents();
    testFixture = TestBed.createComponent(TestWrapperComponent);
    testComponent = testFixture.componentInstance;
    testFixture.detectChanges();
  }
  beforeEach(() => {
    setup();
  });

  it('should create', async () => {
    expect(testComponent).toBeTruthy();
    await whenStable(testFixture);
    expect(testComponent.vhdComponent).toBeTruthy();
  });

  it('should have value help dialog reference', async () => {
    await whenStable(testFixture);
    testComponent.vhdComponent.open();
    expect(!!testComponent.vhdComponent.activeDialog).toBeTrue();
  });

  it('should have 3 filters', async () => {
    await whenStable(testFixture);
    expect(testComponent.vhdComponent.filters.length).toEqual(3);
  });

  it('should have 1 selected items', async () => {
    await whenStable(testFixture);
    testComponent.vhdComponent.value = {
      selected: testComponent.data.slice(0, 3)
    };
    await whenStable(testFixture);
    testComponent.vhdComponent.removeSelected(0);
    await whenStable(testFixture);
    expect(testComponent.vhdComponent.selectedItems.length).toEqual(2);
  });

  it('should not emit value on cancel', async () => {
    await whenStable(testFixture);
    testComponent.vhdComponent.open();
    await whenStable(testFixture);
    spyOn(testComponent.vhdComponent.valueChange, 'emit').and.callThrough();
    await whenStable(testFixture);
    testComponent.vhdComponent.dismiss();
    await whenStable(testFixture);
    expect(testComponent.vhdComponent.valueChange.emit).not.toHaveBeenCalled();
  });

  it('should emit value on success', async () => {
    await whenStable(testFixture);
    testComponent.vhdComponent.open();
    testComponent.vhdComponent.value = {
      selected: testComponent.data.slice(0, 3)
    };
    await whenStable(testFixture);
    spyOn(testComponent.vhdComponent.valueChange, 'emit').and.callThrough();
    await whenStable(testFixture);
    testComponent.vhdComponent.success();
    await whenStable(testFixture);
    expect(testComponent.vhdComponent.valueChange.emit).toHaveBeenCalled();
  });
});
