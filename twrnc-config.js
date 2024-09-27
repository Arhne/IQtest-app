import { create } from "twrnc";

const tw = create({
  theme: {
    extend: {
      colors: {
        primary: "#ffffff",
       
        secondary: {
          DEFAULT: "#8D0CCA",
          100: "#D568EF",
        },
        accent:{
          100: "#FCDDD480",
          200: "#F9CCFC80",
        },
        black: "#141414",
        gray: {
          DEFAULT: "#F8F7F9",
          textgray: "#727272",
          100: "#57575B",
          200: "#848288"
        },
      },
      fontFamily: {
        intregular: ["Inter-Regular", "sans-serif"],
        intmedium: ["Inter-Medium", "sans-serif"],
        intsemibold: ["Inter-SemiBold", "sans-serif"],
        intbold: ["Inter-Bold", "sans-serif"],
        intextrabold: ["Inter-ExtraBold", "sans-serif"],
      },
    },
  },
});

export default tw;
