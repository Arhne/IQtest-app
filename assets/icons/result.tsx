import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const ResultIcon = (props: SvgProps) => (
  <Svg
    width={40}
    height={30}
    fill="none"
    {...props}
  >
    <Path
      fill="#F9CCFC"
      d="M0 4a4 4 0 0 1 4-4h32a4 4 0 0 1 4 4v22a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4Z"
    />
    <Path
      fill="#8D0CCA"
      d="M29 21.75h-.75v-15A.75.75 0 0 0 27.5 6h-5.25a.75.75 0 0 0-.75.75v3.75H17a.75.75 0 0 0-.75.75V15H12.5a.75.75 0 0 0-.75.75v6H11a.75.75 0 1 0 0 1.5h18a.75.75 0 1 0 0-1.5ZM23 7.5h3.75v14.25H23V7.5ZM17.75 12h3.75v9.75h-3.75V12Zm-4.5 4.5h3v5.25h-3V16.5Z"
    />
  </Svg>
)
export default ResultIcon
