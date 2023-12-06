import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogModule } from '../dialog.module';
import { DialogCloseButtonComponent } from './dialog-close-button.component';

describe('DialogCloseButtonComponent', () => {
    let component: DialogCloseButtonComponent;
    let fixture: ComponentFixture<DialogCloseButtonComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DialogModule]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DialogCloseButtonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
