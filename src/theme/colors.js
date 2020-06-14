const colors = {
  black: '#000000',
  white: '#ffffff',
  gray: {
    50: '#9E9E9E',
    100: '#F5F5F5',
    200: '#EEEEEE',
    300: '#E0E0E0',
    400: '#BDBDBD',
    500: '#9E9E9E',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121'
  },
  red: {
    50: '#FD5757',
    100: '#FD4646',
    200: '#FC2828',
    300: '#F00404',
    400: '#D50000',
    500: '#BE0303',
    600: '#AB0303',
    700: '#910303',
    800: '#780202',
    900: '#670202'
  },
  pink: {
    50: '#F69CBA',
    100: '#F385AA',
    200: '#F16E9A',
    300: '#EE578A',
    400: '#EC407A',
    500: '#E82A6A',
    600: '#E0195C',
    700: '#C91753',
    800: '#B11549',
    900: '#9A1240'
  },
  purple: {
    50: '#C96CE2',
    100: '#C156DE',
    200: '#B942D9',
    300: '#B12DD4',
    400: '#A028C0',
    500: '#8E24AA',
    600: '#7C2095',
    700: '#3E237F',
    800: '#59186A',
    900: '#471355'
  },
  deepPurple: {
    50: '#8563D8',
    100: '#764FD2',
    200: '#663CCC',
    300: '#5A32BD',
    400: '#512DA8',
    500: '#472893',
    600: '#3E237F',
    700: '#341E6B',
    800: '#2B1956',
    900: '#211342'
  },
  blue: {
    50: '#4E98ED',
    100: '#378BEA',
    200: '#217EE7',
    300: '#1871D7',
    400: '#1565C0',
    500: '#1359A8',
    600: '#114D91',
    700: '#0F417A',
    800: '#0C3563',
    900: '#0A294C'
  },
  cyan: {
    50: '#29E7FE',
    100: '#10E4FE',
    200: '#02D8F2',
    300: '#02C1D8',
    400: '#00ACC1',
    500: '#0393A5',
    600: '#027D8C',
    700: '#026672',
    800: '#024F59',
    900: '#023940'
  },
  green: {
    50: '#7ECB81',
    100: '#6CC470',
    200: '#5ABC5F',
    300: '#4AB34E',
    400: '#43A047',
    500: '#3C8E3F',
    600: '#357B38',
    700: '#2E6930',
    800: '#265728',
    900: '#1F4520'
  },
  amber: {
    50: '#F9C774',
    100: '#F7BD5C',
    200: '#F6B344',
    300: '#F4A92D',
    400: '#F49F14',
    500: '#E1910D',
    600: '#C8810C',
    700: '#B0710B',
    800: '#97620A',
    900: '#7F5209'
  },
  orange: {
    50: '#FFBA62',
    100: '#FEAE49',
    200: '#FDA331',
    300: '#FD9718',
    400: '#FB8C00',
    500: '#DE7D03',
    600: '#C46F04',
    700: '#AB6103',
    800: '#925303',
    900: '#784503'
  }
}

colors.gray.main = colors.gray['400']
colors.blue.main = colors.blue['400']
colors.cyan.main = colors.cyan['400']
colors.red.main = colors.red['400']
colors.amber.main = colors.amber['400']
colors.green.main = colors.green['400']
colors.purple.main = colors.purple['400']

colors.gray.lightmode = colors.gray['50']
colors.gray.darkmode = colors.gray['900']

colors.primary = colors.blue.main
colors.secondary = colors.cyan.main
colors.information = colors.blue.main
colors.success = colors.green.main
colors.alert = colors.amber.main
colors.error = colors.red.main
colors.support = colors.purple.main
colors.lightmode = colors.gray.lightmode
colors.darkmode = colors.gray.darkmode

// Typography's colors
colors.typography = {
  default: colors.gray['700'],
  heading: colors.gray['700'],
  subtitle: colors.gray['800'],
  paragraph: colors.gray['900'],
  inputTitle: colors.gray['800'],
  button: colors.gray['900'],
  caption: colors.gray['800'],
  tag: colors.gray['900']
}

export default colors
