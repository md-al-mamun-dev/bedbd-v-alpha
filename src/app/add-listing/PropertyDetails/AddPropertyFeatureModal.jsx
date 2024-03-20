'use client'
import LucidIcon from "@/components/LucidIcon";
import SwitchBtn from "../SwitchBtn";
import { useState } from "react";
const { v4: uuidv4 } = require('uuid');
import usePropertyDispatch from "@/context/property/usePropertyDispatch";


export default function AddPropertyFeature({data, closeModal}) {
    const dispatch = usePropertyDispatch()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

   function onAddBtnClickHandlar(e){
        e.preventDefault()    
        if(title.length>3 && title.length < 100 && description.length>3 && description.length < 300 ){
            const id = uuidv4()
            dispatch({type:'property/addFeatures', data:{id:`new_feature_${id}` , title, description}})

            // if(data.length>0){
            //     const maxId = Math.max(...data.map(item => item.id));
                
            //     dispatch({type:'property/addBookingType', data:{id:(maxId+1), title, description}})
            // }else{
            //     dispatch({type:'property/addBookingType', data:{id:0, title, description}})
            // }
            dispatch({type:'property/addSelectedFeatures', data: `new_feature_${id}`})
            closeModal()
        }   
   }
  return (
    <div className="position-fixed w-100 h-100 bg-neutral-050_a_50">
        <div className="absolute-center w-100 h-100 max-w-814px max-h-640px radius-350 bg-neutral-000">
            <div className="absolute-center w-100 h-100 max-w-600px max-h-470px">
                <h3 className="clr-primary-400 fs-850 txt-align-center fw-regular-dark"> Add Property Feature </h3>
                <form className='w-100 mr-top-24px mr-btm-32px'>
                    <div className='w-100'>
                        <label className='w-100 fs-600 fw-regular-dark'>Title</label>
                        <input onChange={e=>setTitle(e.target.value)} className='w-100 fs-regular mr-top-16px clr-neutral-500 border-neutral-500 p-16px-24px radius-8' type='text' placeholder="pls give a title "/>
                    </div>
                    <div className='w-100 mr-top-32px'>
                        <label className='w-100 fs-600 fw-regular-dark'>Description</label>
                        <textarea onChange={e=>setDescription(e.target.value)} className='w-100 min-h-120px mr-top-16px fs-regular clr-neutral-500 border-neutral-500 p-16px-24px radius-8' type='text' placeholder="pls provide description "/>
                    </div>                
                </form>
                <>

                <div className={`flex gap-32px w-100 justify-content-center`}>
                <button onClick={closeModal} className={` flex radius-8 p-t-150 p-b-150 cursor-pointer fs-400 fw-regular-dark gap-16px clr-primary bg-neutral-000 p-l-30px p-r-30px border-primary-1`}>
                        {/* <LucidIcon name='chevron-left'className='clr-primary-400' size={24} /> */}
                        Cancle
                </button>
                <button className={` btn-primary  w-100 max-width-300px`} onClick={onAddBtnClickHandlar}>Add</button>
                </div>
                </>
            </div>
            <button onClick={closeModal} className="bg-transparent no-border no-background absolute top-50px right-50px cursor-pointer" ><LucidIcon name='x' size={24}/> </button>          
        </div>
    </div>
  )
}
