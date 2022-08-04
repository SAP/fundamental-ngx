import { ComponentFixture } from '@angular/core/testing';

export async function whenStable(fixture: ComponentFixture<any>): Promise<void> {
    try {
        fixture.changeDetectorRef.markForCheck();
        fixture.detectChanges();
    } catch (error) {
        // avoiding "ExpressionChangedAfterItHasBeenCheckedError"
        if (error?.code !== -100) {
            throw error;
        }
    }
    await fixture.whenStable();
}
