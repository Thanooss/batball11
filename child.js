
function Child({props})
{
   // function add=props.updateddata;

    return(
        <button onClick={()=>{
           props("task3");
           

        }}>click</button>)
    
}
export default Child;