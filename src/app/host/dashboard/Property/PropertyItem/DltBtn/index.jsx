'use client'
import styles from './index.module.css'
import LucidIcon from "@/components/LucidIcon"
import React from 'react'

export default function DltBtn() {
  return (
    <button className='p-8 bg-transparent no-outline no-border'>
        <LucidIcon name='trash' size={24}/>
    </button>
  )
}
