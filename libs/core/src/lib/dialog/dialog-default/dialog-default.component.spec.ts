import { DialogDefaultComponent } from './dialog-default.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonModule } from '../../button/button.module';
import { DialogDecisiveButtonDirective } from '../directives/dialog-decisive-button.directive';
import { DialogDefaultContent } from '../utils/dialog-default-content.class';
import { DialogHeaderComponent } from '../dialog-header/dialog-header.component';
import { DialogCloseButtonComponent } from '../dialog-close-button/dialog-close-button.component';
import { DialogConfig } from '../utils/dialog-config.class';

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
            providers: [DialogConfig]
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
        component._defaultDialogContent = object;
        expect(component).toBeTruthy();
    });

    it('should have footer', () => {
        component._defaultDialogContent = object;
        fixture.detectChanges();
        expect(component._showFooter()).toBeTruthy();
    });

    it('should not have footer', () => {
        component._defaultDialogContent = { ...object, cancelButton: null, approveButton: null };
        fixture.detectChanges();
        expect(component._showFooter()).toBeFalsy();
    });

    it('should handle callback', () => {
        let cancelClicked = false;
        let approveClicked = false;
        let closeClicked = false;
        component._defaultDialogContent = {
            ...component._defaultDialogContent,
            closeButtonCallback: () => closeClicked = true,
            cancelButtonCallback: () => cancelClicked = true,
            approveButtonCallback: () => approveClicked = true
        };

        component._approveButtonClicked();
        component._cancelButtonClicked();
        component._closeButtonClicked();

        expect(cancelClicked).toBeTruthy();
        expect(closeClicked).toBeTruthy();
        expect(approveClicked).toBeTruthy();
    });
});
