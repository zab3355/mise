export const colors = {
    // Primary gradient
    primary: {
        main: '#6366f1',
        light: '#818cf8',
        dark: '#4f46e5',
        gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        gradientReverse: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
    },

    // Secondary
    secondary: {
        main: '#ec4899',
        light: '#f472b6',
        dark: '#db2777',
    },

    // Background
    background: {
        default: '#fafafa',
        paper: '#ffffff',
        glass: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.95) 100%)',
    },

    // Text
    text: {
        primary: '#0f172a',
        secondary: '#64748b',
    },

    // Shadows
    shadows: {
        button: '0 4px 6px -1px rgba(99, 102, 241, 0.3)',
        buttonHover: '0 10px 15px -3px rgba(99, 102, 241, 0.4)',
        card: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        cardHover: '0 10px 15px -3px rgba(99, 102, 241, 0.2), 0 4px 6px -2px rgba(99, 102, 241, 0.1)',
        step: '0 2px 4px rgba(99, 102, 241, 0.3)',
    },
};

export const spacing = {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
};

export const borderRadius = {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    full: 9999,
};

export const transitions = {
    default: 'all 0.2s ease-in-out',
    slow: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
};
