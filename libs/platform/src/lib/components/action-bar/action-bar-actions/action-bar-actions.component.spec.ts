import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input, ViewChild } from '@angular/core';
import { ActionBarActionsComponent, ActionItem } from './action-bar-actions.component';
import { FundamentalNgxCoreModule } from '@fundamental-ngx/core';
@Component({
  selector: 'fdp-test-action-bar-actions',
  template: `<fdp-action-bar-actions #actionbaractions [actionItems]="actionItems" [placement]="'bottom-end'"></fdp-action-bar-actions>'
  `
})
class TestComponent {

  @Input() actionItems = new Array();
  @Input() placement: string;
  @ViewChild('actionbaractions') actionbaraction: ActionBarActionsComponent;

}

describe('ActionBarActionsComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ActionBarActionsComponent, TestComponent],
      imports: [
        FundamentalNgxCoreModule
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;

    const data = [
      {
        label: 'Save',
        type: 'main',
        priority: 1,
        callback: () => {
          alert('Save')
        }
      }, {
        label: 'Cancel',
        type: 'primary',
        priority: 2,
        callback: () => {
          alert('Cancel')
        }
      },
      {
        label: 'Demo1',
        type: 'main',
        priority: 3,
        callback: () => {
          alert('Demo1')
        }
      },

      {
        label: 'Rename',
        type: 'main',
        priority: 4,
        callback: () => {
          alert('Rename')
        }
      }, {
        label: 'Demo2',
        type: 'main',
        priority: 5,
        callback: () => {
          alert('Demo2')
        }
      }
    ];
    component.actionItems.push(data);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
