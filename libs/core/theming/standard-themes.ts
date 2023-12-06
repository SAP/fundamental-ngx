import { ThemeDefinition } from './interfaces/theme.interface';

export const STANDARD_THEMES: ThemeDefinition[] = [
    {
        id: 'sap_horizon',
        name: 'Morning Horizon (Light)',
        theming: {
            themeFontPath: 'sap_horizon_fonts.css'
        }
    },
    {
        id: 'sap_horizon_dark',
        name: 'Evening Horizon (Dark)',
        theming: {
            themeFontPath: 'sap_horizon_fonts.css'
        }
    },
    {
        id: 'sap_horizon_hcb',
        name: 'Horizon High Contrast Black',
        description: 'Optimized contrast and accessibility for extremely bright environments',
        theming: {
            themeFontPath: 'sap_horizon_fonts.css'
        }
    },
    {
        id: 'sap_horizon_hcw',
        name: 'Horizon High Contrast White',
        description: 'Optimized contrast and accessibility for extremely dark environments',
        theming: {
            themeFontPath: 'sap_horizon_fonts.css'
        }
    },
    {
        id: 'sap_fiori_3',
        name: 'Quartz Light',
        description: 'Use in regular office environment'
    },
    {
        id: 'sap_fiori_3_dark',
        name: 'Quartz Dark',
        description: 'Use in dimmed environments'
    },
    {
        id: 'sap_fiori_3_hcb',
        name: 'Quartz High Contrast Black',
        description: 'Optimized contrast and accessibility for extremely bright environments'
    },
    {
        id: 'sap_fiori_3_hcw',
        name: 'Quartz High Contrast White',
        description: 'Optimized contrast and accessibility for extremely dark environments'
    },
    {
        id: 'sap_fiori_3_light_dark',
        name: 'Quartz Auto (Depending on the OS Settings)'
    }
];
