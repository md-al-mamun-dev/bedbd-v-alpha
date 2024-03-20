"use client"
import { useEffect, useState } from 'react';
import styles from './index.module.css';
import { MinusSquare, PlusSquare } from 'lucide-react';
// import LucidIcon from '@/components/LucidIcon';
import { debounceCount } from '@/components/Utility/debounce';


const GuestCount = ({guestCount, setGuestCount, calenderRef, show}) => {

  const toInteger = (value) => {
      if (value.trim() === '') {        
          return 0;
      }
      const integerValue = parseInt(value, 10);

      if (!isNaN(integerValue) && Number.isInteger(integerValue)) {
          return integerValue;
      } else {
          return 0; 
      }
  }




  // const incrementAdult = debounceCount(
  //   clickCount => setGuestCount({...guestCount, 'adult': (guestCount['adult'] + clickCount)})
  // )

  // const incrementChildren = debounceCount( 
  //   clickCount => 
  //     (guestCount['adult'] < 1)
  //       ? setGuestCount({...guestCount, 'adult': 1, 'children': clickCount})                  
  //       : setGuestCount({...guestCount, 'children': guestCount['children'] + clickCount})
  //   )

  // const incrementInfant = debounceCount( 
  //   clickCount => {
  //     (guestCount['adult'] < 1)
  //       ? setGuestCount({...guestCount, 'adult': 1, 'infants':clickCount})                  
  //       : setGuestCount({...guestCount, 'infants':guestCount['infants'] + clickCount})
  //     }
  //   )

  // const incrementPets = debounceCount( 
  //   clickCount => {
  //     (guestCount['adult'] < 1)
  //       ? setGuestCount({...guestCount, 'adult':1, 'pets':clickCount})
  //       : setGuestCount({...guestCount, 'pets':guestCount['pets'] + clickCount})
  //     }
  //   )

  // const decrementAdult = debounceCount(
  //   clickCount => {
  //     const adultNumber = guestCount['adult'] - clickCount
  //     if(adultNumber > 0 )
  //         setGuestCount({...guestCount, 'adult': adultNumber})      
  //     else if((guestCount['children'] + guestCount['infants'] + guestCount['pets']) > 0)
  //         setGuestCount({...guestCount, 'adult': 1})
  //     else
  //         setGuestCount({...guestCount, 'adult': 0})
  //     }
  //   )

  // const decrementChildren = debounceCount( 
  //   clickCount => {
  //     const childrensNumber = guestCount['children'] - clickCount
  //     (childrensNumber > 0)
  //       ? setGuestCount({...guestCount, 'children': childrensNumber})    
  //       : setGuestCount({...guestCount, 'children': 0 })
  //     }
  //   )

  // const decrementInfant = debounceCount( 
  //   clickCount => {
  //     const infantsNumber = guestCount['infants'] - clickCount
  //     (infantsNumber > 0)
  //       ? setGuestCount({...guestCount, 'infants': infantsNumber})    
  //       : setGuestCount({...guestCount, 'infants': 0 })
  //     }
  //   )

  // const decrementPets = debounceCount( 
  //   clickCount => {
  //     const petsNumber = guestCount['pets'] - clickCount
  //     (petsNumber > 0)
  //       ? setGuestCount({...guestCount, 'pets': petsNumber})    
  //       : setGuestCount({...guestCount, 'pets': 0 })
  //     }
  //   )


  const increment = debounceCount(
    (clickCount, key='') => {
      if( key !=='adult' && guestCount['adult'] < 1){
        setGuestCount({...guestCount, 'adult': 1, [key]: clickCount})  
      }else{
        setGuestCount({...guestCount, [key]: (guestCount[key] + clickCount)})
      }
    }
  )
  const decrement = debounceCount(
    (clickCount, key='') => {
        const guestFieldChangedValue = guestCount[key] - clickCount
        if(guestFieldChangedValue > 0 )
          setGuestCount({...guestCount, [key]: guestFieldChangedValue})      
        else if(key === 'adult' && (guestCount['children'] + guestCount['infants'] + guestCount['pets'])>0 )
          setGuestCount({...guestCount, [key]: 1})
        else 
          setGuestCount({...guestCount, [key]: 0})
      }
  )

  return (
    <div ref={calenderRef} className={`${styles.guests_count} ${show ? 'display-static' : 'display-none' }`}>
        
        {/* Adult Guest Counter */}
        <div className={`${styles.guests_count_item}`}>
          <div className={`${styles.level}`}>
            <div className={`${styles.level_name}`}>Adult</div>
            <div className={`${styles.level_info}`}>age 18 or above</div>
          </div>
          <div className={`${styles.counter}`}>
            <MinusSquare
              onClick={()=>decrement('adult')}
              className={`${guestCount['adult'] < ((guestCount['children'] + guestCount['infants'] + guestCount['pets']) > 0 ? 2 : 1) ? styles.counter_icon_disabled: styles.counter_icon }`} />
            {/* <LucidIcon onClick={()=>setAdult(decrement(adult))} className={`${adult === 0 ? styles.counter_icon_disabled: styles.counter_icon }`} name='minus-square' size={24}/> */}
             <input type='number'
                onChange={e=> setGuestCount({...guestCount, 'adult': toInteger(e.target.value)})} 
                value={guestCount['adult']} className={`${styles.count_value}`}/>
            <PlusSquare 
              onClick={()=>increment('adult')}
              className={`${styles.counter_icon}`}/>
            {/* <LucidIcon onClick={()=>setAdult(increment(adult))} className={`${styles.counter_icon}`} name='plus-square' size={24}/> */}
          </div>            
        </div>

        {/* Childrens Counter */}
        <div className={`${styles.guests_count_item}`}>
          <div className={`${styles.level}`}>
            <div className={`${styles.level_name}`}>Children</div>
            <div className={`${styles.level_info}`}>age 2 - 18</div>
          </div>
          <div className={`${styles.counter}`}>
            <MinusSquare 
              onClick={()=>decrement('children')} 
              className={`${guestCount['children'] === 0 ? styles.counter_icon_disabled: styles.counter_icon }`} />
            {/* <LucidIcon onClick={()=>setChildren(decrement(children))}  className={`${children === 0 ? styles.counter_icon_disabled: styles.counter_icon }`} name='minus-square' size={24}/> */}
             <input 
              onChange={e=> setGuestCount({...guestCount, 'children': toInteger(e.target.value)})} 
              type='number' value={guestCount['children']} className={`${styles.count_value}`}/> 
            <PlusSquare 
              onClick={()=>increment('children')} 
              className={`${styles.counter_icon}`}/>
            {/* <LucidIcon onClick={()=>setChildren(increment(children))}  className={`${styles.counter_icon}`} name='plus-square' size={24}/> */}
          </div>            
        </div>

        {/* Infants Counter */}
        <div className={`${styles.guests_count_item}`}>
          <div className={`${styles.level}`}>
            <div className={`${styles.level_name}`}>Infant</div>
            <div className={`${styles.level_info}`}>under 2</div>
          </div>
          <div className={`${styles.counter}`}>
            <MinusSquare 
              onClick={()=>decrement('infants')}
              className={`${guestCount['infants'] === 0 ? styles.counter_icon_disabled: styles.counter_icon }`} />
            {/* <LucidIcon onClick={()=>setInfants(decrement(infants))} className={`${infants === 0 ? styles.counter_icon_disabled: styles.counter_icon }`} name='minus-square' size={24}/> */}
             <input 
              onChange={e=> setGuestCount({...guestCount, 'infants': toInteger(e.target.value)})} 
              type='number' value={guestCount['infants']}  className={`${styles.count_value}`}/>
            <PlusSquare 
              onClick={()=>increment('infants')}
              className={`${styles.counter_icon}`}/>
            {/* <LucidIcon onClick={()=>setInfants(increment(infants))} className={`${styles.counter_icon}`} name='plus-square' size={24}/> */}
          </div>            
        </div>

        {/* Pets Counter */}
        <div className={`${styles.guests_count_item}`}>
          <div className={`${styles.level}`}>
            <div className={`${styles.level_name}`}>Pets</div>
            <div className={`${styles.level_info}`}>bring a animal?</div>
          </div>
          <div className={`${styles.counter}`}>
            <MinusSquare
              onClick={()=>decrement('pets')}
              className={`${guestCount['pets'] === 0 ? styles.counter_icon_disabled: styles.counter_icon}`} />
            {/* <LucidIcon className={`${pets === 0 ? styles.counter_icon_disabled: styles.counter_icon}`}  name='minus-square' size={24}/> */}
             <input 
                onChange={e=> setGuestCount({...guestCount, 'pets': toInteger(e.target.value)})}
                type='number' value={guestCount['pets']}  className={`${styles.count_value}`}/>
            <PlusSquare
              onClick={()=>increment('pets')}
              className={`${styles.counter_icon}`}/>
            {/* <LucidIcon className={`${styles.counter_icon}`} name='plus-square' size={24}/> */}
          </div>            
        </div>

    </div>
  )
}

export default GuestCount