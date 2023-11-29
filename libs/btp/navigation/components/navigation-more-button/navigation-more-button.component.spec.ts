import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavigationMoreButtonComponent } from './navigation-more-button.component';

describe('NavigationMoreButtonComponent', () => {
    let component: NavigationMoreButtonComponent;
    let fixture: ComponentFixture<NavigationMoreButtonComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [NavigationMoreButtonComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(NavigationMoreButtonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
