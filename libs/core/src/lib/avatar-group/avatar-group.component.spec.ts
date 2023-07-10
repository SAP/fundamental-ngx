import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AvatarGroupComponent } from './avatar-group.component';

describe('AvatarGroupComponent', () => {
    let component: AvatarGroupComponent;
    let fixture: ComponentFixture<AvatarGroupComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AvatarGroupComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(AvatarGroupComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
