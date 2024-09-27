import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const SpeakerHigh = (props: SvgProps) => (
  <Svg
    
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <Path
      fill="#000"
      d="M14.58 2.326a.75.75 0 0 0-.79.082L7.242 7.5H3A1.5 1.5 0 0 0 1.5 9v6A1.5 1.5 0 0 0 3 16.5h4.242l6.548 5.091A.75.75 0 0 0 15 21V3a.75.75 0 0 0-.42-.674ZM3 9h3.75v6H3V9Zm10.5 10.466-5.25-4.083V8.616l5.25-4.082v14.932Zm5.063-9.945a3.75 3.75 0 0 1 0 4.958.75.75 0 0 1-1.125-.992 2.25 2.25 0 0 0 0-2.974.75.75 0 0 1 1.125-.992ZM23.25 12a7.49 7.49 0 0 1-1.91 5 .75.75 0 0 1-1.117-1 6 6 0 0 0 0-8 .751.751 0 1 1 1.117-1 7.484 7.484 0 0 1 1.91 5Z"
    />
  </Svg>
)
export default SpeakerHigh

