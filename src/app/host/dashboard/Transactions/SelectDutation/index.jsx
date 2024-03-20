"use client"
import styles from './index.module.css'
import DropdownBtn from '../DropdownBtn'
import { useState, useEffect, useRef } from 'react'

const SelectDuration = () => {
  const dropdownContentId='duration-dropdown-id'
  const durations = [
    {   
        id:0,
        name:'last 24h',
        timeDuration:"86400000"
    },
    {
        id:1,
        name:'last 7 days',
        timeDuration:"604800000"
    },
    {
        id:2,
        name:'last 2 weeks',
        timeDuration:"1209600000"
    },
    {
        id:3,
        name:'last 15 days',
        timeDuration:"1296000000"
    },
    {
        id:4,
        name:'last 30 days',
        timeDuration:"2592000000"
    }
    ,
    {
        id:5,
        name:'last 1 year',
        timeDuration:"31536000000"
    }
  ]
  const [selectedValue, setSelectedValue] = useState(durations[0])
  const [isDropDownOpen, setIsDropDownOpen]= useState(false)
  const dropDownRef = useRef(null)



  function onDurationClickHandlar(e){
    const id = e.target.attributes.value.value
    const propertyTypeData = durations.find(item=>(item['id']===Number(id)))
    setSelectedValue(propertyTypeData)
    setIsDropDownOpen(false)
  }

useEffect(()=>{
  isDropDownOpen
    ? dropDownRef.current.style.display ='grid'
    : dropDownRef.current.style.display ='none'
}, [isDropDownOpen])



useEffect(() => {
  const dropDown= document.getElementById(dropdownContentId)

  const handleClickOutside = (event) => {
    if (dropDown && !dropDown.contains(event.target)) {
      setIsDropDownOpen(false);
    }
  };

  const handleEscapeKey = (event) => {
    if (event.key === 'Escape' && isOpen) {          
        setIsDropDownOpen(false)
    }
  };

  document.addEventListener('mousedown', handleClickOutside);
  document.addEventListener('keydown', handleEscapeKey);

  return () => {
    document.removeEventListener('mousedown', handleClickOutside);
    document.removeEventListener('keydown', handleEscapeKey);
  };
}, [isDropDownOpen]);



  return (
    <div className='relative w-245' id={dropdownContentId}>
        {/* const [isOpen, setIsOpen]= useState(false) */}

        {/* <button class={`${styles.}`}>Dropdown</button> */}
        <DropdownBtn currentValue={isDropDownOpen} openDropDown={()=>setIsDropDownOpen(true)}   closeDropDown={()=>setIsDropDownOpen(false)} >{selectedValue['name']}</DropdownBtn>
        <div  className={`${styles.dropdown_content}`} ref={dropDownRef} onClick={onDurationClickHandlar}>
            {   
                durations.map(item => <div key={item['id']} value={item['id']}>{item['name']}</div>)
            }
        </div>

    </div>
  )
}

export default SelectDuration