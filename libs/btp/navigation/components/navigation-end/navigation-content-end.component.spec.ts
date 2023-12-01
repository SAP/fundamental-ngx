import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavigationContentEndComponent } from './navigation-content-end.component';

describe('NavigationContentEndComponent', () => {
    let component: NavigationContentEndComponent;
    let fixture: ComponentFixture<NavigationContentEndComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [NavigationContentEndComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(NavigationContentEndComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
