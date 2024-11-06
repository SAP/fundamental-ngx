import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShellbarContextAreaComponent } from './shellbar-context-area.component';

describe('ShellbarContextAreaComponent', () => {
    let component: ShellbarContextAreaComponent;
    let fixture: ComponentFixture<ShellbarContextAreaComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ShellbarContextAreaComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(ShellbarContextAreaComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
