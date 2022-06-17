import React from 'react'

const Box = ({data}) => {
  const dragStart = (e)=>{
    const target = e.target;
    console.log(e.target.id)
    e.dataTransfer.setData("BoxId",target.id);
  }
  const handleDragOver=(e)=>{
    e.stopPropagation();
  }
  return (
    <div onDragOver={handleDragOver} onDragStart={dragStart}  id={data.id} className={data.type==="operand"?"operand":"operator"} draggable={data.isdragabble} >
        <h2 className={data.value}>{data.name}</h2>
    </div>
  )
}

export default Box