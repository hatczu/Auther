/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        gainsboro: {
          "100": "#dbdbdb",
          "200": "#d9d9d9",
        },
        royalblue: "#005ac4",
        whitesmoke: "#efefef",
        darkgray: "#969696",
        white: "#fff",
      },
      spacing: {},
      fontFamily: {
        inter: "Inter",
      },
      borderRadius: {
        "20xl-5": "39.5px",
        "81xl": "100px",
      },
    },
    fontSize: {
      "5xl": "24px",
      inherit: "inherit",
    },
  },
  corePlugins: {
    preflight: false,
  },
};
