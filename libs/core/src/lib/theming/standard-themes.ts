import { ThemeDefinition } from './interfaces/theme.interface';

export const STANDARD_THEMES: ThemeDefinition[] = [
    {
        id: 'sap_fiori_3',
        name: 'Fiori 3',
        description: 'Use in regular office environment'
    },
    {
        id: 'sap_fiori_3_dark',
        name: 'Fiori 3 Dark',
        description: 'Use in dimmed environments'
    },
    {
        id: 'sap_fiori_3_hcb',
        name: 'High Contrast Black',
        description: 'Optimized contrast and accessibility for extremely bright environments'
    },
    {
        id: 'sap_fiori_3_hcw',
        name: 'High Contrast White',
        description: 'Optimized contrast and accessibility for extremely dark environments'
    },
    {
        id: 'sap_fiori_3_light_dark',
        name: 'Light Dark'
    },
    {
        id: 'sap_horizon',
        name: 'Morning Horizon',
        theming: {
            themeFontPath: 'sap_horizon_fonts.css'
        }
    },
    {
        id: 'sap_horizon_dark',
        name: 'Evening Horizon',
        theming: {
            themeFontPath: 'sap_horizon_fonts.css'
        }
    },
    {
        id: 'sap_horizon_hcb',
        name: 'High Contrast Black Horizon',
        theming: {
            themeFontPath: 'sap_horizon_fonts.css'
        }
    },
    {
        id: 'sap_horizon_hcw',
        name: 'High Contrast White Horizon',
        theming: {
            themeFontPath: 'sap_horizon_fonts.css'
        }
    }
];
