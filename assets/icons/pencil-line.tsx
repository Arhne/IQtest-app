import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const PencilLine = (props: SvgProps) => (
  <Svg
    
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <Path
      fill="#000"
      d="m21.311 6.878-4.19-4.189a1.5 1.5 0 0 0-2.121 0L3.44 14.25A1.487 1.487 0 0 0 3 15.31v4.19A1.5 1.5 0 0 0 4.5 21h15.75a.75.75 0 1 0 0-1.5h-9.439L21.311 9a1.5 1.5 0 0 0 0-2.122Zm-8.561.182 1.565 1.565-7.94 7.94L4.81 15l7.94-7.94ZM4.5 19.5v-2.69l2.69 2.69H4.5Zm4.5-.31-1.564-1.565 7.939-7.94 1.565 1.565L9 19.19Zm9-9L13.811 6l2.25-2.25 4.189 4.19L18 10.19Z"
    />
  </Svg>
)
export default PencilLine

