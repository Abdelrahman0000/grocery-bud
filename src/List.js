import React from 'react'
import{FaEdit,FaTrash} from'react-icons/fa'
export default function List({item,removeitem,edit}) {
    
  return (
    <div className='grocery-list'>
{item.map((x)=>{
    const {id,title}=x;
    return(<article className='grocery-item' >
        <p className='title'>{title}</p>
        <div className='btn-container'>
<button className='edit-btn' type='button' onClick={()=>{
    edit(id)
   }} >
    <FaEdit />
</button>
<button className='delete-btn' type='button' onClick={()=>removeitem(id)} >
    <FaTrash />
</button>
</div>
    </article>)
})}
    </div>
  )
}
