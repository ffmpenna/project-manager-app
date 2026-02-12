const shades: Record<string, string> = {
  blue: '400',
  yellow: '400',
  green: '400',
  red: '400',
  purple: '400',
  gray: '400',
};

export const colorMap = {
  ...shades,

  getBgClass: (color: string): string => {
    const safeColor = shades[color] ? color : 'gray';
    const shade = shades[safeColor];
    return `bg-${safeColor}-${shade}`;
  },

  getBorderClass: (color: string): string => {
    const safeColor = shades[color] ? color : 'gray';
    const shade = shades[safeColor];
    return `border-${safeColor}-${shade}`;
  },

  getTextClass: (color: string): string => {
    const safeColor = shades[color] ? color : 'gray';
    let shade = shades[safeColor];

    if (shade === '400') {
      shade = '600';
    }

    return `text-${safeColor}-${shade}`;
  },

  getBaseColor: (color: string): string => {
    const safeColor = shades[color] ? color : 'gray';
    const shade = shades[safeColor];
    return `${safeColor}-${shade}`;
  },
};
