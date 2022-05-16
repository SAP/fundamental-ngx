import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
    DialogConfig,
    DialogDefaultComponent,
    DialogDefaultContent,
    DialogModule,
    DialogRef
} from '@fundamental-ngx/core/dialog';

describe('DefaultDialogComponent', () => {
    let component: DialogDefaultComponent;
    let fixture: ComponentFixture<DialogDefaultComponent>;
    let object: DialogDefaultContent;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [DialogModule, BrowserAnimationsModule],
                providers: [DialogConfig, DialogRef]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        object = {
            approveButton: 'approveButton',
            approveButtonCallback: () => {},
            cancelButton: 'cancelButton',
            cancelButtonCallback: () => {},
            closeButtonCallback: () => {}
        };
        fixture = TestBed.createComponent(DialogDefaultComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        component._defaultDialogContent = object;
        expect(component).toBeTruthy();
    });

    it('should have footer', () => {
        component._defaultDialogContent = object;
        fixture.detectChanges();
        expect(component._showFooter()).toBeTruthy();
    });

    it('should not have footer', () => {
        component._defaultDialogContent = { ...object, cancelButton: undefined, approveButton: undefined };
        fixture.detectChanges();
        expect(component._showFooter()).toBeFalsy();
    });

    it('should handle callback', () => {
        let cancelClicked = false;
        let approveClicked = false;
        let closeClicked = false;
        component._defaultDialogContent = {
            ...component._defaultDialogContent,
            closeButtonCallback: () => (closeClicked = true),
            cancelButtonCallback: () => (cancelClicked = true),
            approveButtonCallback: () => (approveClicked = true)
        };

        component._approveButtonClicked();
        component._cancelButtonClicked();
        component._closeButtonClicked();

        expect(cancelClicked).toBeTruthy();
        expect(closeClicked).toBeTruthy();
        expect(approveClicked).toBeTruthy();
    });
});
