import { createTheme } from '@mui/material/styles';
import { MixThemeOptions, MixTheme } from './ThemeOptions';

export const theme: MixTheme = createTheme({
    typography: {
        fontFamily: 'IBMPlexSans'
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: `
            @font-face {
              font-family: 'IBMPlexMono';
              font-style: normal;
              font-display: swap;
              font-weight: 400;
            }
            @font-face {
                font-family: 'IBMPlexSansArial';
                font-style: normal;
                font-display: swap;
                font-weight: 400;
              }
          `
        }
    },
    palette: {
        primary: {
            main: '#6663FD'
        },
        secondary: {
            main: '#FFFFFF'
        },
        myAwesomeColor: 'red'
    },
    font: {
        primary: 'IBMPlexMono',
        secondary: 'IBMPlexSansArial',
        tertiary: 'IBMPlexSans'
    },
    global: {
        background: '#FAFAFC',
        darkBackground: '#0F172A',
        hoverBackground: '#F2F1FF',
        hover: '#6663FD',
        shadow: '#E0E0E0',
        title: '#000000',
        border: '#CACAE0',
        defaultBackground: '#E0E0E0',
        completedBackground: '#C9C8FE',
        inProgressBackground: '#BDBDBD',
        inProgressIndicator: '#F0EB47',
        completedIndicator: '#32C48D',
        normal: '#FFFFFF',
        indico: '#B0AFFE',
        tintsOfSeashell: '#F8F676',
        crusta: '#F98028',
        gray93: '#FDEDED',
        redOxide: '#5F2120',
        gray90: '#E5E5E5',
        jacksonPurple: '#9A9AC3',
        whitesmoke: '#F5F5F5',
        lightGray: '#EEEEEE',
        red: '#dd1717',
        grey: '#9E9E9E',
        mainlyBlue: '#6663FD',
        warning: '#FCAD36',
        lightIndico: '#E1E1FF',
        darkIndico: '#3330B6'
    },
    switch: {
        color: '#6663fd'
    },
    color: {
        textColor: '#8A8AB9',
        white: '#ffffff',
        black: '#000000',
        gray: '#FAFAFA',
        theadBg: '#FAFAFC',
        theadColor: '#8A8AB9',
        statusDeployed: '#EBF9F4',
        statusDraft: '#EAEAF3',
        deployedColor: '#196247',
        draftColor: '#6A6AA6',
        boxBorder: '#BABAD6',
        error: '#CE2818',
        purple: '#B0AFFE'
    }
} as MixThemeOptions);
