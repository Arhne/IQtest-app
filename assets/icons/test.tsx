import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const TestIcon = (props: SvgProps) => (
  <Svg
    
    width={40}
    height={30}
    fill="none"
    {...props}
  >
    <Path
      fill="#F4FBC9"
      d="M0 4a4 4 0 0 1 4-4h32a4 4 0 0 1 4 4v22a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4Z"
    />
    <Path
      fill="#8FBF00"
      d="M29 7.5h-6A3.75 3.75 0 0 0 20 9a3.75 3.75 0 0 0-3-1.5h-6A1.5 1.5 0 0 0 9.5 9v12a1.5 1.5 0 0 0 1.5 1.5h6a2.25 2.25 0 0 1 2.25 2.25.75.75 0 1 0 1.5 0A2.25 2.25 0 0 1 23 22.5h6a1.5 1.5 0 0 0 1.5-1.5V9A1.5 1.5 0 0 0 29 7.5ZM17 21h-6V9h6a2.25 2.25 0 0 1 2.25 2.25v10.5A3.732 3.732 0 0 0 17 21Zm12 0h-6a3.732 3.732 0 0 0-2.25.75v-10.5A2.25 2.25 0 0 1 23 9h6v12Z"
    />
  </Svg>
)
export default TestIcon

