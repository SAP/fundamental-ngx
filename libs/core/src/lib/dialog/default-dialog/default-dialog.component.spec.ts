import { DefaultDialogComponent } from './default-dialog.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonModule } from '../../button/button.module';
import { DialogCloseButtonDirective, DialogDecisiveButtonDirective, DialogTitleDirective } from '../utils/dialog-directives';
import { DefaultDialogObject } from './default-dialog-object';
import { DialogHeaderComponent } from '../dialog-header/dialog-header.component';
import { DIALOG_CONFIG, DialogConfig } from '../utils/dialog-config.class';

describe('DefaultDialogComponent', () => {
    let component: DefaultDialogComponent;
    let fixture: ComponentFixture<DefaultDialogComponent>;
    let object: DefaultDialogObject;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ButtonModule],
            declarations: [
                DefaultDialogComponent,
                DialogTitleDirective,
                DialogCloseButtonDirective,
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
        fixture = TestBed.createComponent(DefaultDialogComponent);
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
