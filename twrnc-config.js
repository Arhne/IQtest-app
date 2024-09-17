import { create } from "twrnc";

const tw = create({
  theme: {
    extend: {
      colors: {
        primary: "#ffffff",
        gradientcolor: "linear-gradient(to right, #8D0CCA 100%, #D568EF 100%)",
        secondary: {
          DEFAULT: "#8D0CCA",
          100: "#D568EF",
        },
        black: "#141414",
        gray: {
          DEFAULT: "#F8F7F9",
          textgray: "#727272",
        },
      },
      fontFamily: {
        intregular: ["Inter-Regular", "sans-serif"],
        intsemibold: ["Inter-SemiBold", "sans-serif"],
        intbold: ["Inter-Bold", "sans-serif"],
      },
    },
  },
});

export default tw;
