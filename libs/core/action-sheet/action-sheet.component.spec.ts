import { Component, ElementRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { ActionSheetBodyComponent } from './action-sheet-body/action-sheet-body.component';
import { ActionSheetControlComponent } from './action-sheet-control/action-sheet-control.component';
import { ActionSheetItemComponent } from './action-sheet-item/action-sheet-item.component';
import { ActionSheetComponent } from './action-sheet.component';
import { ActionSheetModule } from './action-sheet.module';

@Component({
    template: ` <div #componentElement fd-action-sheet>Action Sheet Parent Test Text</div> `,
    imports: [ActionSheetModule, ButtonComponent]
})
class TestComponent {
    @ViewChild('componentElement', { read: ElementRef })
    ref: ElementRef;
}

@Component({
    template: `
        <fd-action-sheet [isOpen]="false">
            <fd-action-sheet-control>
                <button fd-button>Action Sheet</button>
            </fd-action-sheet-control>
            <fd-action-sheet-body>
                <fd-action-sheet-item>Option 1</fd-action-sheet-item>
                <fd-action-sheet-item>Option 2</fd-action-sheet-item>
            </fd-action-sheet-body>
        </fd-action-sheet>
    `,
    imports: [
        ActionSheetComponent,
        ActionSheetControlComponent,
        ActionSheetBodyComponent,
        ActionSheetItemComponent,
        ButtonComponent
    ]
})
class ActionSheetIntegrationTestComponent {
    @ViewChild(ActionSheetComponent, { static: true })
    actionSheet: ActionSheetComponent;

    @ViewChild(ActionSheetBodyComponent, { static: true })
    actionSheetBody: ActionSheetBodyComponent;
}

describe('Action Sheet Parent Component', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [TestComponent]
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
});

describe('ActionSheetComponent Integration', () => {
    let component: ActionSheetIntegrationTestComponent;
    let fixture: ComponentFixture<ActionSheetIntegrationTestComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [ActionSheetIntegrationTestComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ActionSheetIntegrationTestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should close action sheet when Tab key is pressed inside the body', () => {
        // Open the action sheet
        component.actionSheet.open();
        fixture.detectChanges();
        expect(component.actionSheet.isOpen).toBe(true);

        // Dispatch Tab keydown event inside the action sheet body
        const bodyElement = component.actionSheetBody.actionSheetElementRef.nativeElement;
        const tabEvent = new KeyboardEvent('keydown', {
            key: 'Tab',
            code: 'Tab',
            keyCode: 9,
            bubbles: true
        });
        bodyElement.dispatchEvent(tabEvent);
        fixture.detectChanges();

        // Verify the action sheet is now closed
        expect(component.actionSheet.isOpen).toBe(false);
    });
});
