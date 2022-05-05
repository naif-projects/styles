module.exports = {
  purge: ['./scss/index.scss', './scss/*/*.scss'],
  theme: {
    container: false,
    extend: {
      colors: {
        'primary-lighter': '#96BBFF',
        'primary-light': '#73A4FF',
        'primary-base': '#588FF4',
        'primary-dark': '#4E7DCB',
        'primary-darker': '#3869BA',

        'secondary-lighter': '#F7F9FE',
        'secondary-light': '#DDE9FF',
        'secondary-base': '#C5D9FE',
        'secondary-dark': '#B9D1FE',
        'secondary-darker': '#B1C9F2',
      },

      fontFamily: {
        cairo: ['Cairo', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

/*

--primary-lighter-color: #96BBFF;
  --primary-light-color: #73A4FF;
  --primary-base-color: #588FF4;
  --primary-dark-color: #4E7DCB;
  --primary-darker-color: #3869BA;

  --primary-linear-color: linear-gradient(180deg, #5D93FF, #877EFF);
  --primary-r-linear-color: linear-gradient(0deg, #5D93FF, #877EFF);

  --secondary-lighter-color: #F7F9FE;
  --secondary-light-color: #DDE9FF;
  --secondary-base-color: #C5D9FE;
  --secondary-dark-color: #B9D1FE;
  --secondary-darker-color: #B1C9F2;

  --dark-50: #456687;
  --dark-100: #244362;

  --linear: linear-gradient(180deg, #3869BA, #96BBFF)

*/
