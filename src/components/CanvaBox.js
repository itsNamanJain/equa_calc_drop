import React from 'react'

const CanvaBox = ({data,handleRemove}) => {
    // console.log(data)
  return (
    <div className={data.type==="operand"?"operand canvasBox":data.type==="operator"?"operator canvasBox":"operand newrhs canvasBox"}>
        <h2 className={data.value}>{data.name}</h2>
        <span className='cross' onClick={()=>handleRemove(data.id)}><i className="fa-solid fa-xmark"></i></span>
    </div>
  )
}

export default CanvaBox