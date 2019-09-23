import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input, ViewChild } from '@angular/core';
import { ActionBarActionsComponent } from './action-bar-actions.component';
import { ActionItem } from '../action-bar.component';
import { FundamentalNgxCoreModule } from '@fundamental-ngx/core';
import { By } from '@angular/platform-browser';
@Component({
    selector: 'fdp-test-action-bar-actions',
    template: `
        <fdp-action-bar-actions
            #actionbaractions
            [actionItems]="actionItems"
            (itemClick)="onItemClick($event)"
            [placement]="'bottom-end'"
        ></fdp-action-bar-actions
        >'
    `
})
class TestComponent {
    @Input() actionItems = [];
    buttonItems = [];
    @Input() placement: string;
    editMode = false;
    @ViewChild('actionbaractions') actionbaraction: ActionBarActionsComponent;
    actionClicked = false;
    onItemClick(item: ActionItem) {
        this.actionClicked = true;
    }
}

describe('ActionBarActionsComponent', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ActionBarActionsComponent, TestComponent],
            imports: [FundamentalNgxCoreModule]
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

    it('should emit a "itemClick" event when the button is pressed', () => {
        const buttonaction = fixture.debugElement.queryAll(By.css('.fdp-action-button'));

        buttonaction[0].nativeElement.click();
        fixture.detectChanges();
        expect(component.actionClicked).toBeTruthy();
    });

    it('check for over flow', () => {
        const buttonaction = fixture.debugElement.query(By.css('.fdp-action-popover-button'));

        expect(buttonaction.nativeElement.attributes['aria-haspopup'].value).toBe('true');
    });
});
