import './App.css';
import {useState} from 'react';
import Box from './components/Box';
import datas from "./data";
import CanvaBox from './components/CanvaBox';
import data from './data';
function App() {
  const [canvasData, setCanvasData] = useState([]);
  let operandData = [],operatorData=[],comparatorData=[];
  let rhsData = datas.filter(data=>{
    if(data.type==="operand")
    operandData.push(data);
    else if(data.type==="operator")
    operatorData.push(data);
    else if(data.type==="comparator")
    comparatorData.push(data);
    else
    return data;
  });
  const createRhs = (id)=>{
    let rhs = prompt("What should be the rhs integer?")
    let newData  = {
      name:rhs,
      value:rhs,
      id:id,
      type:"newrhs",
    }
    let lastEle =canvasData[canvasData.length-1];
    if(lastEle.type!=="newrhs"){
      setCanvasData(prevData=>{
        return [...prevData,newData]
      })
    }
  }
  const handleDragOver=(e)=>{
    e.preventDefault();
  }
  
  const handleDrop= (e)=>{
    e.preventDefault();
   const boxid = e.dataTransfer.getData("BoxId");
   const box = datas.filter(data=>{
    if(data.id==boxid){
      return data;
    }
   });
   
  //  console.log(box[0])
   setCanvasData(prevData=>{
   return [...prevData,box[0]]
   })
  }
  const handleRemove = (id)=>{
    const newCanvasData  = canvasData.filter(data=>{
      if(data.id!==id)
      return data
    });
    setCanvasData(newCanvasData);
  }
  const handleComparator=(data)=>{
    let newData = {
      id:data.id,
      name:data.name,
      value:data.value,
      type:"operator"
    }
    let lastEle =canvasData[canvasData.length-1];
    if(lastEle.name==data.name){
    }
    else if(lastEle.type==="newrhs"){
    }
    else if(lastEle.name==">"||lastEle.name=="<"){
      
      setCanvasData(canvasData.splice(0,canvasData.indexOf(lastEle)));
      setCanvasData(prevData=>{
        return [...prevData,newData]
      });
    }
    else{
      setCanvasData(prevData=>{
        return [...prevData,newData]
      });
    }
  }
  const handleSubmit = ()=>{
    let data;
    if(canvasData.length>0){
      data  = canvasData.map(data=>{
        return data.value
      })
    }
    let isTrue;
    try{
    isTrue = eval(data.join(""));
    alert(isTrue);
    }
    catch(e){
      alert("Invalid Expression!!! ")
    }
    
    
  }
  return (
    <>
    <section className='operands'>
    {operandData.map((data)=>{
      return <Box key={data.id} data={data}  />
    })}
    </section>
    <section className="operators">
    {operatorData.map((data)=>{
      return <Box key={data.id} data={data}/>
    })}
    <span className='space'></span>
    {
      comparatorData.map(data=>{
       return <div className="comparator" onDoubleClick={()=>{handleComparator(data)}}>{data.name}</div>
      })
    }
    <span className='space'></span>
    {
      rhsData.map(data=>{
        return <div key={data.id} onClick={()=>createRhs(data.id)} className="rhs">{data.name}</div>
      })
    }
    </section>
    <div id="myCanvas" onDrop={handleDrop} onDragOver={handleDragOver} className='canvas'>
    {
      canvasData && canvasData.map(data=>{
        return <CanvaBox key={data.id} data={data} handleRemove={handleRemove}/>
      })
    }
</div>
<button className='btn' onClick={handleSubmit}>Evaluate</button>
<footer>
  <ul>
    <li>Alphabets are fetched from the NodeJS+Express+MongoDB backend</li>
    <li>Numbers(Alphabets) and operators are draggable</li>
    <li>&lt; &nbsp; and &nbsp; &gt; &nbsp; are clickable(non-draggable), pick the comparison sign using them</li>
    <li>Clicking on the RHS integer, it prompts to choose an integer and adds it to the equation</li>
    <li>Drag and drop functionality was implemented without any external library</li>
    <li>Dragging an operand/operator to the center of any two elements adds it between those two elements</li>
  </ul>
</footer>

    </>
  );
}

export default App;
