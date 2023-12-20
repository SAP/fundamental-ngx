import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavigationContainerComponent } from './navigation-container.component';

describe('NavigationContainerComponent', () => {
    let component: NavigationContainerComponent;
    let fixture: ComponentFixture<NavigationContainerComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [NavigationContainerComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(NavigationContainerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
