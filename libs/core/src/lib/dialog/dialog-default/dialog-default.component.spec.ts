import { DialogDefaultComponent } from './dialog-default.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonModule } from '../../button/button.module';
import { DialogDecisiveButtonDirective } from '../directives/dialog-decisive-button.directive';
import { DialogDefaultContent } from '../utils/dialog-default-content';
import { DialogHeaderComponent } from '../dialog-header/dialog-header.component';
import { DialogCloseButtonComponent } from '../dialog-close-button/dialog-close-button.component';
import { DIALOG_CONFIG, DialogConfig } from '../utils/dialog-config.class';

describe('DefaultDialogComponent', () => {
    let component: DialogDefaultComponent;
    let fixture: ComponentFixture<DialogDefaultComponent>;
    let object: DialogDefaultContent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ButtonModule],
            declarations: [
                DialogDefaultComponent,
                DialogCloseButtonComponent,
                DialogDecisiveButtonDirective,
                DialogHeaderComponent
            ],
            providers: [{ provide: DIALOG_CONFIG, useClass: DialogConfig }]
        }).compileComponents();
    });

    beforeEach(() => {
        object = {
            approveButton: 'approveButton',
            approveButtonCallback: () => {
            },
            cancelButton: 'cancelButton',
            cancelButtonCallback: () => {
            },
            closeButtonCallback: () => {
            }
        };
        fixture = TestBed.createComponent(DialogDefaultComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        component.defaultDialogConfig = object;
        expect(component).toBeTruthy();
    });

    it('should have footer', () => {
        component.defaultDialogConfig = object;
        fixture.detectChanges();
        expect(component.showFooter()).toBeTruthy();
    });

    it('should not have footer', () => {
        component.defaultDialogConfig = { ...object, cancelButton: null, approveButton: null };
        fixture.detectChanges();
        expect(component.showFooter()).toBeFalsy();
    });

    it('should handle callback', () => {
        let cancelClicked = false;
        let approveClicked = false;
        let closeClicked = false;
        component.defaultDialogConfig = {
            ...component.defaultDialogConfig,
            closeButtonCallback: () => closeClicked = true,
            cancelButtonCallback: () => cancelClicked = true,
            approveButtonCallback: () => approveClicked = true
        };

        component.approveButtonClicked();
        component.cancelButtonClicked();
        component.closeButtonClicked();

        expect(cancelClicked).toBeTruthy();
        expect(closeClicked).toBeTruthy();
        expect(approveClicked).toBeTruthy();
    });
});
