import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const BackIcon = (props: SvgProps) => (
  <Svg width={10} height={18} fill="none" {...props} viewBox="0 0 10 18">
    <Path
      fill="#000"
      d="M9.53 15.97a.751.751 0 0 1-1.06 1.061l-7.5-7.5a.75.75 0 0 1 0-1.061l7.5-7.5A.75.75 0 1 1 9.53 2.03l-6.97 6.97 6.97 6.969Z"
    />
  </Svg>
)
export default BackIcon
