import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
import tw from "@/twrnc-config"

const Alzheimer = ({width = 43, height= 41, ...props}) => (
  <Svg
    
    width={width}
    height={height}
    fill="none"
    viewBox="0 0 43 41"
    {...props}
  >
    <Path
      fill="#8FBF00"
      d="M41.994 18.797c.567-4.952-1.117-9.924-4.653-13.456-1.74-1.738-4.117-3.375-7.277-4.165-8.86-2.218-14.603-.187-17.474 5.21C9.72 11.78 1.48 10.85.17 20.154c-1.311 9.303 5.056 19.534 15.853 20.095 10.796.56 9.406-4.781 15.312-7.074 4.517-1.753 9.814-6.99 10.66-14.38Z"
    />
    <Path
      fill="#fff"
      d="M41.994 18.797c.567-4.952-1.117-9.924-4.653-13.456-1.74-1.738-4.117-3.375-7.277-4.165-8.86-2.218-14.603-.187-17.474 5.21C9.72 11.78 1.48 10.85.17 20.154c-1.311 9.303 5.056 19.534 15.853 20.095 10.796.56 9.406-4.781 15.312-7.074 4.517-1.753 9.814-6.99 10.66-14.38Z"
      opacity={0.7}
    />
    <Path
      fill="#8FBF00"
      d="M30.844 15.718a.369.369 0 0 0-.17.285.344.344 0 0 0 .058.214l.07.092 1.166.437.44-1.158.092-.068a.337.337 0 0 1 .214-.058.372.372 0 0 1 .288.167c.05.072.12.126.201.157.243.091.523-.053.626-.322.103-.27-.011-.565-.254-.656a.442.442 0 0 0-.255-.014.384.384 0 0 1-.326-.063.342.342 0 0 1-.123-.184l-.026-.113.44-1.159-1.163-.434-.068-.091a.339.339 0 0 1-.009-.376c.03-.05.07-.092.12-.123a.44.44 0 0 0 .157-.2c.092-.243-.054-.523-.326-.624a.505.505 0 0 0-.66.253.424.424 0 0 0-.014.253.372.372 0 0 1-.062.326.363.363 0 0 1-.185.122l-.115.025-1.165-.438-.443 1.15-.093.067a.342.342 0 0 1-.216.06.383.383 0 0 1-.286-.168.435.435 0 0 0-.2-.155.53.53 0 0 0-.627.323.522.522 0 0 0 .257.654.44.44 0 0 0 .256.015.371.371 0 0 1 .326.063c.06.046.103.11.121.184l.027.114-.44 1.158 1.158.443.116-.025a.355.355 0 0 0 .246-.447.435.435 0 0 1 .016-.254c.092-.242.386-.354.658-.252.272.102.419.38.327.623a.44.44 0 0 1-.154.197ZM37.623 6.72a.352.352 0 0 0-.185-.468.31.31 0 0 0-.185-.01.279.279 0 0 1-.232-.045.244.244 0 0 1-.088-.133l-.019-.081.315-.828-.833-.312-.049-.067a.243.243 0 0 1-.042-.153.265.265 0 0 1 .12-.204.313.313 0 0 0 .114-.143.374.374 0 0 0-.238-.424.38.38 0 0 0-.46.163.303.303 0 0 0-.012.184.265.265 0 0 1-.178.325l-.083.018-.832-.313-.315.828-.07.048a.232.232 0 0 1-.154.042.272.272 0 0 1-.204-.12.31.31 0 0 0-.143-.11.38.38 0 0 0-.445.231.374.374 0 0 0 .18.467c.059.022.123.026.185.011a.264.264 0 0 1 .233.045c.043.033.074.08.087.132l.02.08-.316.828.832.313.083-.019a.253.253 0 0 0 .134-.092.264.264 0 0 0 .043-.231.312.312 0 0 1 .011-.184.378.378 0 0 1 .473-.184.378.378 0 0 1 .232.448.308.308 0 0 1-.113.143.269.269 0 0 0-.121.204.243.243 0 0 0 .041.152l.05.068.833.312.315-.827.068-.049a.24.24 0 0 1 .152-.041.267.267 0 0 1 .206.12c.036.05.086.089.144.112a.36.36 0 0 0 .446-.236ZM27.392 4.612c.065.03.137.039.207.026a.315.315 0 0 1 .265.068c.048.042.08.098.093.16l.014.092-.423.926.932.421.05.082c.034.055.047.12.038.184a.311.311 0 0 1-.154.224.348.348 0 0 0-.139.155.43.43 0 0 0 .234.526.437.437 0 0 0 .553-.17.358.358 0 0 0 .025-.21.301.301 0 0 1 .227-.355l.093-.017.932.421.426-.923-.013-.092a.294.294 0 0 0-.217-.223.312.312 0 0 0-.14-.004.355.355 0 0 1-.208-.025.433.433 0 0 1-.176-.552.434.434 0 0 1 .534-.23c.065.028.12.077.156.138a.307.307 0 0 0 .227.153.29.29 0 0 0 .178-.035l.082-.053.424-.926-.932-.42-.051-.082a.268.268 0 0 1-.036-.177.301.301 0 0 1 .159-.23.355.355 0 0 0 .14-.156.43.43 0 0 0-.235-.525.437.437 0 0 0-.552.17.356.356 0 0 0-.027.207.309.309 0 0 1-.068.262.278.278 0 0 1-.161.092l-.093.014-.932-.42-.424.926-.081.05a.286.286 0 0 1-.31-.013.308.308 0 0 1-.096-.103.356.356 0 0 0-.157-.139.437.437 0 0 0-.533.231.43.43 0 0 0 .175.551l-.006.001ZM31.388 7.205c0 .068.021.134.06.19a.288.288 0 0 1 .044.253.277.277 0 0 1-.103.141l-.078.05h-.97v2.898h.97l.078-.05a.276.276 0 0 0 .11-.276.29.29 0 0 0-.051-.122.336.336 0 0 1-.06-.19.41.41 0 0 1 .411-.363.415.415 0 0 1 .41.364.341.341 0 0 1-.058.19.288.288 0 0 0-.046.254.276.276 0 0 0 .102.14l.078.05h.972V9.77l.05-.076a.266.266 0 0 1 .274-.11.3.3 0 0 1 .123.051.346.346 0 0 0 .19.06.414.414 0 0 0 .37-.409.409.409 0 0 0-.37-.407.343.343 0 0 0-.19.058.298.298 0 0 1-.256.045.277.277 0 0 1-.14-.103l-.05-.075V7.84h-.973l-.078-.05a.276.276 0 0 1-.056-.394.34.34 0 0 0 .059-.19.41.41 0 0 0-.41-.363.415.415 0 0 0-.412.363ZM41.337 11.125a.317.317 0 0 0-.185-.011.272.272 0 0 1-.234-.044.247.247 0 0 1-.087-.133l-.019-.082.316-.827-.833-.313-.048-.067a.245.245 0 0 1-.007-.269.264.264 0 0 1 .085-.087.303.303 0 0 0 .112-.144.373.373 0 0 0-.232-.446.38.38 0 0 0-.472.182.302.302 0 0 0-.01.184.273.273 0 0 1-.044.233.259.259 0 0 1-.134.087l-.083.018-.832-.313-.316.827-.068.048a.242.242 0 0 1-.155.043.28.28 0 0 1-.204-.12.303.303 0 0 0-.144-.111.38.38 0 0 0-.445.232.373.373 0 0 0 .18.467c.059.021.123.025.185.01a.265.265 0 0 1 .234.046c.043.033.073.079.086.131l.02.081-.315.828.832.312.083-.017a.252.252 0 0 0 .183-.198.265.265 0 0 0-.005-.121.304.304 0 0 1 .011-.184.378.378 0 0 1 .472-.183.378.378 0 0 1 .232.447.313.313 0 0 1-.112.143.263.263 0 0 0-.122.204.246.246 0 0 0 .042.152l.05.068.833.313.314-.828.068-.049c.045-.03.099-.045.153-.041a.269.269 0 0 1 .206.12c.035.05.086.09.144.112a.38.38 0 0 0 .445-.232.374.374 0 0 0-.18-.467v-.001Z"
    />
    <Path
      fill="#8FBF00"
      d="M23.485 24.009c-.033-.256.522-1.004 1.005-1.598 3.537-4.362 3.715-11.912.278-16.58a.322.322 0 0 0-.055.078l-.054.116.196 1.346-1.355.195-.093.084a.367.367 0 0 0-.115.217.41.41 0 0 0 .112.344c.065.07.107.158.121.252.041.28-.185.545-.498.591-.314.046-.604-.147-.648-.427a.473.473 0 0 1 .044-.275.404.404 0 0 0 .01-.368.369.369 0 0 0-.17-.174l-.115-.05-1.355.194-.196-1.347.055-.117a.39.39 0 0 1 .541-.157.486.486 0 0 0 .278.043c.284-.04.474-.328.429-.644-.045-.315-.31-.537-.594-.495a.478.478 0 0 0-.254.12.415.415 0 0 1-.346.113.4.4 0 0 1-.219-.115l-.085-.092-.197-1.348 1.355-.194.093-.086a.367.367 0 0 0 .114-.213.403.403 0 0 0-.113-.347.544.544 0 0 1-.04-.052 8.546 8.546 0 0 0-.575-.296C17.65 1.125 13.647.853 10.064 1.946c-4.619 1.41-6.568 4.53-7.694 9.017-.353 1.403-.617 1.839-.353 2.367.265.53.794 1.229.618 1.755-.175.526-1.5 3.158-2.03 3.861-.53.704-.618 1.229-.265 1.667.354.439 1.677.614 1.677.614s.007.674-.295 1.229c-.301.555-.047.556 0 .79.048.235-.17.45-.126.791.043.342.209.519.428.717.22.197-.195 1.793-.224 2.247-.029.453.487 1.608.874 1.907.388.298 1.118.385 1.42.427.301.043 1.85.171 2.107.257.257.085 1.591 1.624 2.194 2.39.602.766 2.666 3.078 2.794 3.89.066.415.6 2.157 1.105 3.76h22.574c-2.893-3.292-7.537-8.642-8.518-10.316-1.404-2.4-2.809-4.86-2.865-5.307ZM14.932 6.367a.365.365 0 0 0-.2-.146.408.408 0 0 0-.36.062.496.496 0 0 1-.27.083c-.285 0-.517-.257-.517-.573 0-.316.232-.576.518-.576.095.001.188.03.267.083a.417.417 0 0 0 .359.062.363.363 0 0 0 .203-.142l.073-.106v-1.36h1.366l.11-.071a.384.384 0 0 0 .155-.385.41.41 0 0 0-.074-.172.466.466 0 0 1-.084-.264c0-.285.26-.516.579-.516.319 0 .579.23.579.516 0 .095-.03.188-.084.266a.407.407 0 0 0-.063.359c.024.08.076.149.145.196l.106.07h1.37v1.365l.07.106a.37.37 0 0 0 .379.15.417.417 0 0 0 .172-.071A.485.485 0 0 1 20 5.22c.285 0 .517.257.517.576 0 .319-.232.572-.517.572a.481.481 0 0 1-.269-.082.41.41 0 0 0-.359-.065.362.362 0 0 0-.197.143l-.07.106v1.36h-1.37l-.108-.07a.381.381 0 0 1-.155-.383.408.408 0 0 1 .074-.172.472.472 0 0 0 .084-.267c0-.285-.26-.513-.579-.513-.319 0-.578.228-.578.513 0 .096.03.189.083.267a.405.405 0 0 1 .064.357.386.386 0 0 1-.145.198l-.11.07h-1.364V6.472l-.07-.105Zm7.678 6.219a.48.48 0 0 1-.268-.084.412.412 0 0 0-.36-.06.362.362 0 0 0-.198.142l-.071.106v1.36h-1.37l-.107-.07a.38.38 0 0 1-.155-.383.407.407 0 0 1 .075-.172.48.48 0 0 0 .083-.267c0-.284-.26-.513-.579-.513-.32 0-.578.229-.578.514 0 .095.03.187.083.266a.408.408 0 0 1 .064.357.386.386 0 0 1-.145.198l-.108.07h-1.369v-1.36l-.073-.106a.364.364 0 0 0-.195-.143.41.41 0 0 0-.36.061.488.488 0 0 1-.27.084c-.286 0-.518-.257-.518-.574 0-.317.232-.575.519-.575.095 0 .188.03.266.083a.417.417 0 0 0 .36.062.37.37 0 0 0 .198-.145l.073-.106V9.97h1.368l.108-.071a.383.383 0 0 0 .155-.384.41.41 0 0 0-.074-.172.474.474 0 0 1-.083-.266c0-.284.26-.515.578-.515.318 0 .58.23.58.515a.48.48 0 0 1-.084.267.406.406 0 0 0-.064.36c.025.079.076.148.145.195l.107.07h1.37v1.36l.07.107a.37.37 0 0 0 .2.145.419.419 0 0 0 .358-.062.484.484 0 0 1 .268-.083c.285 0 .518.256.518.575 0 .319-.232.574-.517.574Z"
    />
  </Svg>
)
export default Alzheimer
