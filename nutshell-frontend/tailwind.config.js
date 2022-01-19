module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    colors: {
      dark: '#1d1c29',
      light: '#EDEDED',
      title: '#272535',
      pink: '#f23de9',
      green: '#00fb40',
      yellow: '#ffe800',
      blue: '#4D4DFF',
      cyan: '#00FFFF',
    },
    extend: {
      gridTemplateColumns: {
        'auto-1fr': 'auto 1fr',
        '1fr-auto': '1fr auto',
        'auto-1fr-auto': 'auto 1fr auto',
        'auto-auto-1fr': 'auto auto 1fr',
        '1fr-1fr-auto': '1fr 1fr auto',
        '1fr-auto-auto': '1fr auto auto',
        '2-auto': 'repeat(2, auto)',
        '3-auto': 'repeat(3, auto)',
        '4-auto': 'repeat(4, auto)',
      },
    },
  },
  plugins: [],
};
