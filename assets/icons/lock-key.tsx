import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const LockKey = (props: SvgProps) => (
  <Svg
   
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <Path
      fill="#000"
      d="M12 10.5a2.625 2.625 0 0 0-.75 5.14v1.61a.75.75 0 1 0 1.5 0v-1.61A2.625 2.625 0 0 0 12 10.5Zm0 3.75A1.125 1.125 0 1 1 12 12a1.125 1.125 0 0 1 0 2.25Zm7.5-6.75h-3V5.25a4.5 4.5 0 1 0-9 0V7.5h-3A1.5 1.5 0 0 0 3 9v10.5A1.5 1.5 0 0 0 4.5 21h15a1.5 1.5 0 0 0 1.5-1.5V9a1.5 1.5 0 0 0-1.5-1.5ZM9 5.25a3 3 0 1 1 6 0V7.5H9V5.25ZM19.5 19.5h-15V9h15v10.5Z"
    />
  </Svg>
)
export default LockKey
