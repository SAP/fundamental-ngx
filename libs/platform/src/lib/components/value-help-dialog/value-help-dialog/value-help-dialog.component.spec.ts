import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';

import {
  TokenModule,
  ButtonModule,
  TabsModule,
  DialogModule,
  FormModule,
  CheckboxModule,
  LayoutGridModule,
  ToolbarModule,
  TableModule,
  PipeModule,
  IconModule,
  ListModule,
  LinkModule,
  BarModule,
  DynamicComponentService
} from '@fundamental-ngx/core';
import { ValueHelpDialogDataSource, ValueHelpDialogTabs, VhdDataProvider } from '../models';
import { ValueHelpDialogService } from '../value-help-dialog.service';
import {
  VhdFilterComponent,
  SelectTabSettingsComponent,
  DefineTabSettingsComponent,
  VhdSearchComponent,
  TableRow
} from '../components';
import { PlatformValueHelpDialogComponent } from './value-help-dialog.component';

class MockValueHelpDialogService extends ValueHelpDialogService<any> {
  selectedItems$: BehaviorSubject<Array<any>> = new BehaviorSubject([]);
  displayedData$: BehaviorSubject<Array<any>> = new BehaviorSubject([]);
}

fdescribe('PlatformValueHelpDialogComponent', () => {
  const service = new MockValueHelpDialogService();
  const dataSource = Array(10).fill(null).map((_, i) => {
    return { name: `Name ${ i }`, type: `Type ${ i }` };
  });
  let component: PlatformValueHelpDialogComponent<any>;
  let fixture: ComponentFixture<PlatformValueHelpDialogComponent<any>>;

  beforeEach(async () => {
    const module = TestBed.configureTestingModule({
      imports: [
        DialogModule,
        TabsModule,
        ButtonModule,
        TokenModule,
        FormModule,
        LayoutGridModule,
        ToolbarModule,
        TableModule,
        CheckboxModule,
        PipeModule,
        IconModule,
        ListModule,
        BarModule,
        LinkModule
      ],
      declarations: [
        PlatformValueHelpDialogComponent,

        VhdFilterComponent,
        SelectTabSettingsComponent,
        DefineTabSettingsComponent,
        VhdSearchComponent]
      ,
      providers: [
        DynamicComponentService,
        ValueHelpDialogService
      ]
    });
    TestBed.overrideComponent(
      PlatformValueHelpDialogComponent,
      {
        set: {
          providers: [{
            provide: ValueHelpDialogService,
            useExisting: service
          }]
        }
      }
    );
    await module.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlatformValueHelpDialogComponent);
    component = fixture.componentInstance;
    component.dataSource = new ValueHelpDialogDataSource(new VhdDataProvider(dataSource));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should has state service', () => {
    const componentService = fixture.debugElement.injector.get(ValueHelpDialogService);
    expect(componentService instanceof MockValueHelpDialogService).toBeTruthy();
  });

  it('should open', () => {
    component.open();
    expect(!!component.activeDialog).toBeTrue();
  });

  it('should close if we already opened dialog', () => {
    component.dismiss();
    fixture.detectChanges();
    expect(!!component.activeDialog).toBeFalse();
  });

  it('should be closed if selected and excluded are empty', () => {
    component._selectedExpandState = false;
    component.toggleSelectedPanel();
    fixture.detectChanges();
    expect(component._selectedExpandState).toBeFalse();
  });
});
