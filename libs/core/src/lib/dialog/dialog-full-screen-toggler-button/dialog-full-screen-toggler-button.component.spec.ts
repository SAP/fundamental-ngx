import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogFullScreenTogglerButtonComponent } from './dialog-full-screen-toggler-button.component';

describe('DialogFullScreenTogglerButtonComponent', () => {
    let component: DialogFullScreenTogglerButtonComponent;
    let fixture: ComponentFixture<DialogFullScreenTogglerButtonComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DialogFullScreenTogglerButtonComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(DialogFullScreenTogglerButtonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
