import React from 'react'

interface IProps {
  size: number
  color: string
}

const PlayIconCircle = ({ size, color }: IProps) => {
  return (
    <svg
      viewBox="0 0 16 16"
      height={size}
      width={size}
      xmlns="http://www.w3.org/2000/svg"
    >
      ,
      <g transform="matrix(0.6666666666666666,0,0,0.6666666666666666,0,0)">
        <path
          d="M12,0A12,12,0,1,0,24,12,12.013,12.013,0,0,0,12,0Zm0,21.43A9.43,9.43,0,1,1,21.429,12,9.44,9.44,0,0,1,12,21.429Z"
          fill={color}
          stroke="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16.609,10.712,10.683,7.749A1.488,1.488,0,0,0,8.459,9.122v5.754a1.532,1.532,0,0,0,.7,1.348,1.44,1.44,0,0,0,.759.214,1.709,1.709,0,0,0,.761-.188l5.926-2.963a1.386,1.386,0,0,0,0-2.575Z"
          fill={color}
          stroke="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  )
}

export default PlayIconCircle
