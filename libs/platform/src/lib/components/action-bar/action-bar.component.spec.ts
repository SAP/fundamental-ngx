import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActionBarComponent } from './action-bar.component';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActionBarModule } from '@fundamental-ngx/core';

@Component({
    selector: 'fdp-test-component',
    template: `
        <fdp-action-bar
            [title]="actionBarTitle"
            [showBackButton]="showBackButton"
            [description]="actionBarDescription"
            (backButtonClick)="onBackButtonClick()"
            #actionbar
        >
        </fdp-action-bar>
    `
})
class TestComponent {
    @Input() actionBarTitle: string;
    @Input() actionBarDescription: string;
    @Input() showBackButton = false;
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
            declarations: [ActionBarComponent, TestComponent],
            imports: [FormsModule, ActionBarModule]
        }).compileComponents();
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
        component.actionBarTitle = 'Page Title';
        fixture.detectChanges();
        const title = fixture.debugElement.query(By.css('.fd-action-bar__title'));
        expect(title.nativeElement.textContent).toBe(' Page Title ');
    });

    it('should be able to show the action bar description', () => {
        component.actionBarDescription = 'Action bar description';
        fixture.detectChanges();
        const title = fixture.debugElement.query(By.css('.fd-action-bar__description'));
        expect(title.nativeElement.textContent).toBe(' Action bar description ');
    });

    it('should show the "back" button if "showBackButton" is true', () => {
        component.showBackButton = true;
        fixture.detectChanges();

        let backButton = fixture.debugElement.queryAll(By.css('.sap-icon--navigation-left-arrow'));
        expect(backButton.length).toBe(1);

        component.showBackButton = false;
        fixture.detectChanges();

        backButton = fixture.debugElement.queryAll(By.css('.sap-icon--navigation-left-arrow'));
        expect(backButton.length).toBe(0);
    });

    it('should emit a "backButtonClick" event when back button is pressed', () => {
        component.showBackButton = true;
        fixture.detectChanges();
        const backButton = fixture.debugElement.query(By.css('.sap-icon--navigation-left-arrow'));
        backButton.nativeElement.click();
        expect(component.backButtonClicked).toBeTruthy();
    });
});
