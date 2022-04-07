module.exports = {
  feture: {
    removeDeprecatedGapUtilities: true,
  },
  content: ["./src/**/*.{html,js}"],
  theme: {
    fill: (theme) => ({
      red: theme("colors.red.primary"),
    }),
    flexGrow: {
      2: 2,
    },

    colors: {
      white: "#fff",
      blue: {
        medium: "#005c98",
      },
      black: {
        light: "#262626",
        faded: "#00000059",
        primary: "#000000",
      },
      gray: {
        base: "#616161",
        background: "#fafafa",
        primary: "#dbdbdb",
        secondary: "#eee",
        overlay: "rgba(0, 0, 0, 0.7)",
      },
      red: {
        primary: "#ed4956",
      },
    },
  },
  variants: {
    display: ["group-hover"]
  },
  plugins: [],
};
