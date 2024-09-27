import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"


const AppIcon = (props: SvgProps) => (
  <Svg
    width={40}
    height={30}
    fill="none"
    {...props}
  >
    <Path
      fill="#FEF5CB"
      d="M0 4a4 4 0 0 1 4-4h32a4 4 0 0 1 4 4v22a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4Z"
    />
    <Path
      fill="#F9AE00"
      d="M17.75 6.75h-4.5a1.5 1.5 0 0 0-1.5 1.5v4.5a1.5 1.5 0 0 0 1.5 1.5h4.5a1.5 1.5 0 0 0 1.5-1.5v-4.5a1.5 1.5 0 0 0-1.5-1.5Zm0 6h-4.5v-4.5h4.5v4.5Zm9-6h-4.5a1.5 1.5 0 0 0-1.5 1.5v4.5a1.5 1.5 0 0 0 1.5 1.5h4.5a1.5 1.5 0 0 0 1.5-1.5v-4.5a1.5 1.5 0 0 0-1.5-1.5Zm0 6h-4.5v-4.5h4.5v4.5Zm-9 3h-4.5a1.5 1.5 0 0 0-1.5 1.5v4.5a1.5 1.5 0 0 0 1.5 1.5h4.5a1.5 1.5 0 0 0 1.5-1.5v-4.5a1.5 1.5 0 0 0-1.5-1.5Zm0 6h-4.5v-4.5h4.5v4.5Zm9-6h-4.5a1.5 1.5 0 0 0-1.5 1.5v4.5a1.5 1.5 0 0 0 1.5 1.5h4.5a1.5 1.5 0 0 0 1.5-1.5v-4.5a1.5 1.5 0 0 0-1.5-1.5Zm0 6h-4.5v-4.5h4.5v4.5Z"
    />
  </Svg>
)
export default AppIcon
