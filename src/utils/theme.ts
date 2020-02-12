import { ThemeType } from 'utils/interfaces';
import { RecursivePartial } from 'utils/helpers';
import { DefaultTheme } from 'styled-components';

const defaultType = ThemeType.LIGHT;

const defaultFonts = {
  header: {
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: '700',
  },
  subheader: {
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: '600',
  },
  paragraph: {
    fontFamily: '"Source Sans Pro", sans-serif',
    fontWeight: '400',
  },
};

const defaultColors = {
  text: {
    paragraph: '#7A7D92',
    header: '#2A2C3E',
    alternative: '#F8FAFD',
    anchor: {
      link: '#2A2C3E',
      hover: '#F85705',
      active: '#2A2C3E',
      visited: '#2A2C3E',
    },
  },
  background: {
    app: '#EAEEF6',
    default: '#FFFFFF',
    alternative: '#F85705',
    menu: '#F8FAFD',
  },
  button: {
    primary: {
      default: {
        text: '#FFFFFF',
        background: '#F85705',
      },
      hover: {
        text: '#FFFFFF',
        background: '#DB4F08',
      },
      focus: {
        text: '#FFFFFF',
        background: '#C34100',
      },
      disabled: {
        text: '#BABFCD',
        background: '#DCE2ED',
      },
    },
    secondary: {
      default: {
        text: '#7A7D92',
        background: '#FFFFFF',
      },
      hover: {
        text: '#DB4F08',
        background: '#F8F8F8',
      },
      focus: {
        text: '#C34100',
        background: '#F8F8F8',
      },
      disabled: {
        text: '#BABFCD',
        background: '#DCE2ED',
      },
    },
    outline: {
      default: {
        text: '#7A7D92',
        background: 'transparent',
      },
      hover: {
        text: '#FFFFFF',
        background: 'transparent',
      },
      focus: {
        text: '#FFFFFF',
        background: 'transparent',
      },
      disabled: {
        text: '#BABFCD',
        background: 'transparent',
      },
    },
  },
  list: {
    border: '#EAEEF6',
    header: {
      default: {
        text: '#2A2C3E',
        background: '#F8FAFD',
      },
      hover: {
        text: '#2A2C3E',
        background: '#F8FAFD',
      },
      focus: {
        text: '#F85705',
        background: '#F8FAFD',
      },
    },
    item: {
      default: {
        text: '#2A2C3E',
        background: '#FFFFFF',
      },
      hover: {
        text: '#2A2C3E',
        background: '#F8FAFD',
      },
      focus: {
        text: '#F85705',
        background: '#F8FAFD',
      },
    },
    info: '#7A7D92',
  },
};

export const defaultTheme: DefaultTheme = {
  type: defaultType,
  fonts: defaultFonts,
  colors: defaultColors,

  // Old properties left for backward compatibility

  color: {
    basic: '#D3D3D3',
    primary: '#3EC2E9',
    dark: '#0F1C21',
    headerBackground: '#009688',
    light: '#FFFFFF',
    error: '#FF0000',
    errorBackground: 'rgba(255, 0, 0, .2)',
    successBackground: 'rgba(0, 255, 0, .2)',
    background: {
      primary: 'white',
      alternative: 'black',
    },
    font: {
      primary: 'black',
      alternative: 'white',
    },
    link: {
      primary: 'deepskyblue',
      hover: 'lightskyblue',
    },
  },
  media: {
    tablet: '@media (min-width: 568px)',
    desktop: '@media (min-width: 1024px)',
  },
};

export const lightPartial: RecursivePartial<DefaultTheme> = {
  colors: {
    text: {
      paragraph: '#7A7D92',
      header: '#2A2C3E',
      alternative: '#F8FAFD',
      anchor: {
        link: '#2A2C3E',
        hover: '#F85705',
        active: '#2A2C3E',
        visited: '#2A2C3E',
      },
    },
    background: {
      app: '#EAEEF6',
      default: '#FFFFFF',
      alternative: '#F85705',
      menu: '#F8FAFD',
    },
    button: {
      primary: {
        default: {
          text: '#FFFFFF',
          background: '#F85705',
        },
        hover: {
          text: '#FFFFFF',
          background: '#DB4F08',
        },
        focus: {
          text: '#FFFFFF',
          background: '#C34100',
        },
        disabled: {
          text: '#BABFCD',
          background: '#DCE2ED',
        },
      },
      secondary: {
        default: {
          text: '#7A7D92',
          background: '#FFFFFF',
        },
        hover: {
          text: '#DB4F08',
          background: '#F8F8F8',
        },
        focus: {
          text: '#C34100',
          background: '#F8F8F8',
        },
        disabled: {
          text: '#BABFCD',
          background: '#DCE2ED',
        },
      },
      outline: {
        default: {
          text: '#7A7D92',
          background: 'transparent',
        },
        hover: {
          text: '#FFFFFF',
          background: 'transparent',
        },
        focus: {
          text: '#FFFFFF',
          background: 'transparent',
        },
        disabled: {
          text: '#BABFCD',
          background: 'transparent',
        },
      },
    },
    list: {
      border: '#EAEEF6',
      header: {
        default: {
          text: '#2A2C3E',
          background: '#F8FAFD',
        },
        hover: {
          text: '#2A2C3E',
          background: '#F8FAFD',
        },
        focus: {
          text: '#F85705',
          background: '#F8FAFD',
        },
      },
      item: {
        default: {
          text: '#2A2C3E',
          background: '#FFFFFF',
        },
        hover: {
          text: '#2A2C3E',
          background: '#F8FAFD',
        },
        focus: {
          text: '#F85705',
          background: '#F8FAFD',
        },
      },
      info: '#7A7D92',
    },
  },
};

export const darkPartial: RecursivePartial<DefaultTheme> = {
  colors: {
    text: {
      paragraph: '#7A7D92',
      header: '#F8FAFD',
      alternative: '#FFFFFF',
      anchor: {
        link: '#F8FAFD',
        hover: '#FFFFFF',
        active: '#F8FAFD',
        visited: '#F8FAFD',
      },
    },
    background: {
      app: '#2A2E37',
      default: '#464856',
      alternative: '#73BFCA',
    },
    button: {
      primary: {
        default: {
          text: '#FFFFFF',
          background: '#65BFCB',
        },
        hover: {
          text: '#FFFFFF',
          background: '#3C96A2',
        },
        focus: {
          text: '#FFFFFF',
          background: '#007B8B',
        },
        disabled: {
          text: '#646672',
          background: '#454856',
        },
      },
      secondary: {
        default: {
          text: '#7A7D92',
          background: '#FFFFFF',
        },
        hover: {
          text: '#3C96A2',
          background: '#F8F8F8',
        },
        focus: {
          text: '#007B8B',
          background: '#F8F8F8',
        },
        disabled: {
          text: '#646672',
          background: '#454856',
        },
      },
      outline: {
        default: {
          text: '#F8FAFD',
          background: 'transparent',
        },
        hover: {
          text: '#65BFCB',
          background: 'transparent',
        },
        focus: {
          text: '#007B8B',
          background: 'transparent',
        },
        disabled: {
          text: '#646672',
          background: 'transparent',
        },
      },
    },
    list: {
      border: '#2A2C3E',
      header: {
        default: {
          text: '#F8FAFD',
          background: '#7A7D92',
        },
        hover: {
          text: '#F8FAFD',
          background: '#7A7D92',
        },
        focus: {
          text: '#F8FAFD',
          background: '#7A7D92',
        },
      },
      item: {
        default: {
          text: '#F8FAFD',
          background: '#454856',
        },
        hover: {
          text: '#F8FAFD',
          background: '#7A7D92',
        },
        focus: {
          text: '#65BFCB',
          background: '#505265',
        },
      },
      info: '#C8C9D5',
    },
  },
};
