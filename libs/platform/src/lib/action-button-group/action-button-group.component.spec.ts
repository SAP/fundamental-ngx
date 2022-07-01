import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ActionBarModule } from '@fundamental-ngx/core/action-bar';
import { ActionButtonGroupComponent } from './action-button-group.component';

@Component({
    selector: 'fdp-action-button-group-component',
    template: `
        <fdp-action-button-group #actionbuttongroup>
            <button>Save</button>
            <button>Cancel</button>
        </fdp-action-button-group>
    `
})
class ActionButtonGroupTestComponent {
    @ViewChild('actionbuttongroup') actionbuttongroup: ActionButtonGroupComponent;
}

describe('ActionButtonGroupComponent', () => {
    let component: ActionButtonGroupTestComponent;
    let fixture: ComponentFixture<ActionButtonGroupTestComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ActionButtonGroupComponent, ActionButtonGroupTestComponent],
            imports: [ActionBarModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ActionButtonGroupTestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('Check for action-button-group content', () => {
        fixture.detectChanges();

        const actionButtons = fixture.debugElement.queryAll(By.css('.fd-action-bar__actions'));
        expect(actionButtons.length).toBe(1);
    });
});
