import React, { useEffect } from 'react'

export default function Alert({msg,type,removeallert,list}) {
  useEffect(()=>{
    const timeout=setTimeout(()=>{
      removeallert();
    },3000)
    return ()=>clearTimeout(timeout)
  },[list])
  return (
    <p className={`alert alert-${type}`}>{msg}</p>
  )
}
