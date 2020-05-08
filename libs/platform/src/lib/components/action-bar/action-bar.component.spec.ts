import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActionBarComponent } from './action-bar.component';
import { Component, Input, ViewChild, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FundamentalNgxCoreModule } from '@fundamental-ngx/core';
import { ActionBarActionsComponent } from './action-bar-actions/action-bar-actions.component';

@Component({
    selector: 'fdp-test-component',
    template: `
        <fdp-action-bar
            [title]="actionBarTitle"
            [showBackButton]="showBackButton"
            [editing]="editMode"
            [description]="actionBarDescription"
            [actionItems]="actionItems"
            [placement]="'bottom-end'"
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
    @Input() editMode = false;
    @Input() actionItems = [];
    @Input() placement: string;
    @ViewChild('actionbar') actionbar: ActionBarComponent;
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
            declarations: [ActionBarComponent, ActionBarActionsComponent, TestComponent],
            imports: [FormsModule, FundamentalNgxCoreModule]
        }).compileComponents();
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
                    alert('Save');
                }
            },
            {
                label: 'Cancel',
                type: 'primary',
                priority: 2,
                callback: () => {
                    alert('Cancel');
                }
            },

            {
                label: 'Rename',
                type: 'main',
                priority: 3,
                callback: () => {
                    alert('Rename');
                }
            },
            {
                label: 'Demo1',
                type: 'main',
                priority: 4,
                callback: () => {
                    alert('Demo1');
                }
            },
            {
                label: 'Demo2',
                type: 'main',
                priority: 5,
                callback: () => {
                    alert('Demo2');
                }
            }
        ];
        component.actionItems = data;
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
        expect(title.nativeElement.textContent).toBe(' New Page title ');
    });
});
