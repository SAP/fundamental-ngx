import supportedThemes from './supported-themes';

describe('supported-themes', () => {
    it('should export theme IDs, not file paths', () => {
        for (const theme of supportedThemes) {
            expect(theme).not.toContain('/');
            expect(theme).toMatch(/^sap_/);
        }
    });

    it('should include sap_horizon_dark', () => {
        expect(supportedThemes).toContain('sap_horizon_dark');
    });

    it('should include all standard horizon and fiori themes', () => {
        expect(supportedThemes).toContain('sap_horizon');
        expect(supportedThemes).toContain('sap_horizon_dark');
        expect(supportedThemes).toContain('sap_horizon_hcb');
        expect(supportedThemes).toContain('sap_horizon_hcw');
        expect(supportedThemes).toContain('sap_fiori_3');
        expect(supportedThemes).toContain('sap_fiori_3_dark');
        expect(supportedThemes).toContain('sap_fiori_3_hcb');
        expect(supportedThemes).toContain('sap_fiori_3_hcw');
    });
});
