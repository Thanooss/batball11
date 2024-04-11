import { useParams } from "react-router-dom"
export default function Contact(){
    let {name}=useParams();
    return(<><h1>This is contact us section</h1>
    <h1>hello {name}</h1></>)
}