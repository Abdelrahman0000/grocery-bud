import React, { useEffect, useState } from 'react'
import List from './List';
import Alert from './Alert'

const mylocelstorage=()=>{
let list =localStorage.getItem('list');
if(list){
  return JSON.parse(localStorage.getItem('list'))
}
else{
  return [];
}

}

export default function App() {
const [name,setName]=useState('');
const[list,setlist]=useState(mylocelstorage());
const [edit,setEdit]=useState(false);
const[editID,setEditID]=useState(null)
const [alert,setAlert]=useState({show:false,msg:'',type:''})
const handelevent=(e)=>{
e.preventDefault();
if(!name){
  showalert(true,'danger','please enter value')
}
else if(name && edit){
setlist(
  list.map((item)=>{
    if(item.id===editID){
      return({...item,title:name})
    }
    return item;
  })
)
setName('');
setEditID(null);
setEdit(false)
showalert(true,'success','value changed')
}
else{
  showalert(true,'success','item added to list')
  const newitem={id: new Date().getTime().toString(),
  title:name
  }
  setlist([...list,newitem]);
  setName('');
}
}
const showalert=(show=false,type='',msg='')=>{
  setAlert({show,msg,type});
}
const clearlist=()=>{ showalert(true,'danger','empty list')
setlist([])
}
const removeitem=(id)=>{
  showalert(true,'danger','item removed');
  const newlist=list.filter((item)=>item.id !==id);
  setlist(newlist)
}
const editItem=(id)=>{
const spicefcitem=list.find((item)=>item.id ===id);
setEdit(true)
setEditID(id);
setName(spicefcitem.title)
}
useEffect(()=>{
  localStorage.setItem('list',JSON.stringify(list))
},[list])
  return (
 <section className='section-center' >
     <form className='grocery-form' onSubmit={handelevent}>
       {alert.show&&<Alert {...alert} removeallert={showalert} list={list} />}
       <h3>grocery bud</h3>
       <div className='form-control'>
         <input className='grocery' type='text' placeholder='e.g. eggs' value={name} onChange={(e)=>setName(e.target.value)} />
         <button type='submit' className='submit-btn' >
           {edit?'edit':'submit'}
         </button>
       </div>
     </form>
     { list.length>0 &&
     <div className='grocery-container'>
         <List item={list} removeitem={removeitem} edit={editItem} />
         <button className='clear-btn' onClick={clearlist}>clear items</button>
     </div>
}
 </section>
  )
}