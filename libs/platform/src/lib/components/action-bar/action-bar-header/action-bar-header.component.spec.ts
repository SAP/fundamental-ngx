import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActionBarHeaderComponent } from './action-bar-header.component';
import { ActionbarService } from '../actionbar.service';
import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FundamentalNgxCoreModule } from '@fundamental-ngx/core';
@Component({
  selector: 'fdp-test-component',
  template: `<fdp-action-bar
  [actionbarTitle]="actionbarTitle"
  [showBackButton]="showBackButton" 
  [actionbarDescription]="actionbardescription" (backButtonClick)="onBackButtonClick()" #actionbar>
  </fdp-action-bar>`
})
class TestComponent {

  @Input() actionbarTitle: string;
  @Input() actionbardescription: string;
  @Input() showBackButton = false;
  @Input() editTitle = false;
  @ViewChild('actionbar') actionbar: ActionBarHeaderComponent;

  public backButtonClicked = false;
  public


  onBackButtonClick() {
    this.backButtonClicked = true;
  }
}

describe('ActionBarComponent', () => {
  let component: ActionBarHeaderComponent;
  let fixture: ComponentFixture<ActionBarHeaderComponent>;
  let service: ActionbarService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ActionBarHeaderComponent, TestComponent],
      imports: [FormsModule, FundamentalNgxCoreModule],
      providers: [ActionbarService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionBarHeaderComponent);
    component = fixture.componentInstance;
    service = TestBed.get(ActionbarService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be able to show the action bar title', () => {
    component.actionbarTitle = 'Page Title';
    fixture.detectChanges();
    const title = fixture.debugElement.query(By.css('[data-tag="actionbar__title"]'));
    expect(title.nativeElement.textContent).toBe('Page Title');
  });

  it('should be able to show the action bar description', () => {
    component.actionbarDescription = 'Action bar description';
    fixture.detectChanges();
    const title = fixture.debugElement.query(By.css('[data-tag="actionbar__description"]'));
    expect(title.nativeElement.textContent).toBe('Action bar description');
  });

  it('should show the "back" button if "showBackButton" is true', () => {
    component.showBackButton = true;
    fixture.detectChanges();

    let backButton = fixture.debugElement.queryAll(By.css('[data-tag="actionbar__back-button"]'));
    expect(backButton.length).toBe(1);

    component.showBackButton = false;
    fixture.detectChanges();

    backButton = fixture.debugElement.queryAll(By.css('[data-tag="actionbar__back-button"]'));
    expect(backButton.length).toBe(0);
  });

  it('should emit a "backButtonClick" event when back button is pressed', () => {
    component.showBackButton = true;
    fixture.detectChanges();
    const backButton = fixture.debugElement.query(By.css('[data-tag="actionbar__back-button"]'));
    backButton.nativeElement.click();
    expect(component.backButtonClick).toBeTruthy();
  });

  it('Should show the input text box when editmode is on', () => {
    component.editMode = true;
    fixture.detectChanges();
    let inputText = fixture.debugElement.queryAll(By.css('[data-tag="actionbar__input"]'));
    expect(inputText.length).toBe(1);
    component.editMode = false;
    fixture.detectChanges();
    inputText = fixture.debugElement.queryAll(By.css('[data-tag="actionbar__input"]'));
    expect(inputText.length).toBe(0);

  });

  it('should emit a "onRenameTitle" event when back button is pressed', () => {
    component.editMode = true;
    fixture.detectChanges();
    let inputText = fixture.debugElement.query(By.css('[data-tag="actionbar__input"]')).nativeElement;
    inputText.value = "New Page title";
    inputText.focusout();
    component.onFocusOut();
    fixture.detectChanges();
    expect(component.renameTitle).toBeTruthy();
    const title = fixture.debugElement.query(By.css('[data-tag="actionbar__title"]'));
    expect(title.nativeElement.textContent).toBe('New Page title');
  });

});
