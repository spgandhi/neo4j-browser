import React from 'react'
interface IProps {
  size: number
  color: string
}

const CheckIconCircle = ({ size, color }: IProps) => {
  return (
    <svg
      viewBox="0 0 16 16"
      height={size}
      width={size}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform="matrix(1.1428571428571428,0,0,1.1428571428571428,0,0)">
        <path
          d="M7,0a7,7,0,1,0,7,7A7.008,7.008,0,0,0,7,0Zm3.6,5.9L6.624,9.874a1,1,0,0,1-1.415,0L3.4,8.068A1,1,0,0,1,4.818,6.654l1.1,1.1L9.182,4.487A1,1,0,0,1,10.6,5.9Z"
          fill={color}
          stroke="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  )
}

export default CheckIconCircle
