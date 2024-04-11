import {useState} from  'react'
export default function Button(){
    let [ButtonClicked,updateButtonState]=useState(false);
    return [ButtonClicked,updateButtonState];
}