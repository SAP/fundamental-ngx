import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActionBarHeaderComponent } from './action-bar-header.component';
import { ActionbarService } from '../actionbar.service';
import { Component, Input, ViewChild, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FundamentalNgxCoreModule } from '@fundamental-ngx/core';
@Component({
  selector: 'fdp-test-component',
  template: `<fdp-action-bar
  [actionbarTitle]="actionbarTitle"
  [showBackButton]="showBackButton"
  [editMode]="editMode"
  [actionbarDescription]="actionbarDescription" (backButtonClick)="onBackButtonClick()" #actionbar>
  </fdp-action-bar>`
})
class TestComponent {

  @Input() actionbarTitle: string;
  @Input() actionbarDescription: string;
  @Input() showBackButton = false;
  @Input() editMode = false;
  @ViewChild('actionbar') actionbar: ActionBarHeaderComponent;
  @Output() onRenameTitle: EventEmitter<string> = new EventEmitter<string>();
  public backButtonClicked = false;
  onBackButtonClick() {
    this.backButtonClicked = true;
  }
}

describe('ActionBarHeaderComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ActionBarHeaderComponent, TestComponent],
      imports: [FormsModule, FundamentalNgxCoreModule],
      providers: [ActionbarService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be able to show the action bar title', () => {
    component.actionbarTitle = 'Page Title';
    fixture.detectChanges();
    const title = fixture.debugElement.query(By.css('.fd-action-bar__title'));
    expect(title.nativeElement.textContent).toBe(' Page Title');
  });

  it('should be able to show the action bar description', () => {
    component.actionbarDescription = 'Action bar description';
    fixture.detectChanges();
    const title = fixture.debugElement.query(By.css('.fd-action-bar__description'));
    expect(title.nativeElement.textContent).toBe(' Action bar description');
  });

  it('should show the "back" button if "showBackButton" is true', () => {
    component.showBackButton = true;
    fixture.detectChanges();

    let backButton = fixture.debugElement.queryAll(By.css('.sap-icon--nav-back'));
    expect(backButton.length).toBe(1);

    component.showBackButton = false;
    fixture.detectChanges();

    backButton = fixture.debugElement.queryAll(By.css('.sap-icon--nav-back'));
    expect(backButton.length).toBe(0);
  });

  it('should emit a "backButtonClick" event when back button is pressed', () => {
    component.showBackButton = true;
    fixture.detectChanges();
    const backButton = fixture.debugElement.query(By.css('.sap-icon--nav-back'));
    backButton.nativeElement.click();
    expect(component.backButtonClicked).toBeTruthy();
  });

  it('Should show the input text box when editmode is on', () => {
    component.editMode = true;
    fixture.detectChanges();
    let inputText = fixture.debugElement.queryAll(By.css('.edit-actionbar-title'));
    expect(inputText.length).toBe(1);
    component.editMode = false;
    fixture.detectChanges();
    inputText = fixture.debugElement.queryAll(By.css('.edit-actionbar-title'));
    expect(inputText.length).toBe(0);

  });

  it('should emit a "onRenameTitle" event when back button is pressed', () => {
    component.editMode = true;
    fixture.detectChanges();
    const inputText = fixture.debugElement.query(By.css('.edit-actionbar-title'));
    inputText.nativeElement.value = 'New Page title';
    inputText.nativeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    component.editMode = false;
    fixture.detectChanges();
    const title = fixture.debugElement.query(By.css('.fd-action-bar__title'));
    expect(title.nativeElement.textContent).toBe(' New Page title');
  });

});
