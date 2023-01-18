// https://mui.com/material-ui/customization/theming/
import { ThemeOptions, Theme } from '@mui/material/styles';

export interface ExtendsThemeOptions {
    font?: {
        primary?: string;
        secondary?: string;
        tertiary?: string;
    };
    global?: {
        background: string;
        darkBackground: string;
        hoverBackground: string;
        hover: string;
        shadow: string;
        title:  string;
        border:  string;
        defaultBackground:  string;
        completedBackground:  string;
        inProgressBackground: string;
        inProgressIndicator: string;
        completedIndicator: string;
        normal: string;
        indico: string;
        tintsOfSeashell:string;
        crusta:string;
        gray93:string;
        redOxide:string;
        gray90:string;
        jacksonPurple:string;
        whitesmoke:string;
        lightGray:string;
        red:string;
        grey:string;
        mainlyBlue:string;
        warning:string;
        lightIndico:string;
        darkIndico:string;
    };
    switch?: {
        color: string;
    };
    color?: {
        textColor: string,
        white: string,
        black: string,
        gray: string,
        theadBg: string,
        theadColor: string,
        statusDeployed: string,
        statusDraft: string,
        deployedColor: string,
        draftColor: string,
        boxBorder: string,
        error: string,
        purple: string
    }
}
export type MixThemeOptions = ExtendsThemeOptions & ThemeOptions;

export type MixTheme = ExtendsThemeOptions & Theme;
