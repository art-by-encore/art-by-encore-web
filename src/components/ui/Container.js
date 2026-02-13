import React from 'react'

const Container = ({ children, className = '' }) => {
  return (
    <div className={`mx-auto max-w-[1240px] w-full ${className} container lg:px-[10px] px-[20px]`}>
      {children}
    </div>
  )
}

export default Container