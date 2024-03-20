"use client"
import styles from './index.module.css'
import DropdownBtn from '../DropdownBtn'
import { useState, useEffect, useRef } from 'react'

const SelectPropertyType = ({data}) => {
  const dropdownContentId='property-type-dropdown-id'
  const [selectedValue, setSelectedValue] = useState(data[0])
  const [isDropDownOpen, setIsDropDownOpen]= useState(false)
  const dropDownRef = useRef(null)

  function onTypeClickHandlar(e){
    const id = e.target.attributes.value.value
    const propertyTypeData = data.find(item=>(item['id']===Number(id)))
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
    <div className='relative w-285' id={dropdownContentId} >
        {/* <button class={`${styles.}`}>Dropdown</button> */}
        <DropdownBtn currentValue={isDropDownOpen} openDropDown={()=>setIsDropDownOpen(true)}   closeDropDown={()=>setIsDropDownOpen(false)}  >{selectedValue['name']}</DropdownBtn>
        <div ref={dropDownRef} className={`${styles.dropdown_content}`} onClick={onTypeClickHandlar}>
          {   
            data.map(item => <div key={item['id']} value={item['id']}>{item['name']}</div>)
          }
        </div>

    </div>
  )
}

export default SelectPropertyType