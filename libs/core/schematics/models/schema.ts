export interface Schema {
    project: string;
    animations: boolean;
    fonts: boolean;
    theme:
        | 'sap_fiori_3'
        | 'sap_fiori_3_dark'
        | 'sap_fiori_3_hcb'
        | 'sap_fiori_3_hcw'
        | 'sap_fiori_3_light_dark'
        | 'sap_horizon'
        | 'sap_horizon_dark'
        | 'sap_horizon_hcb'
        | 'sap_horizon_hcw'
        | 'custom';
    readThemeFromURL: boolean;
}
