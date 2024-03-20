"use client"
import LucidIcon from "@/components/LucidIcon"
import styles from './index.module.css'
import { useState, useRef, useEffect } from "react"





const DropdownBtn = ({currentValue, openDropDown, closeDropDown, children}) => {
    
    // const dropdownItemsRef = useRef(null);

  return (
    <button 
        className={`${styles.dropdown_btn}`} 
        onClick={()=>currentValue?closeDropDown():openDropDown()}>
            {children} {currentValue ? <LucidIcon name="chevron-up" size={24}/> :<LucidIcon name="chevron-down" size={24}/> } 
    </button>
  )
}

export default DropdownBtn