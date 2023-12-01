import { ComponentFixture } from '@angular/core/testing';

/** Waits for the fixture to be stable, i.e. for async tasks to complete. */
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
