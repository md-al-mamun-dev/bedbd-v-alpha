import SwitchBtn from "../SwitchBtn"
import { useState } from "react";
import usePropertyDispatch from "@/context/property/usePropertyDispatch";

export default function Availability({data, nextPage, previousPage }) {
    const [checkInPossibility, setCheckInPossibility] = useState('');
    const [allowMoreThanMonth, setAllowMoreThanMonth] = useState('');
    const [isBookingExtend, setIsBookingExtend] = useState('');

    const dispatch = usePropertyDispatch()

    const handleCheckInPossibilityChange = (e) => {
        setCheckInPossibility(e.target.value);
      };
    const handleAllowMoreThanMonthChange = (e) => {
    setAllowMoreThanMonth(e.target.value);
    };

    const handleIsBookingExtendChange = (e) => {
    setIsBookingExtend(e.target.value);
    };

    function onContinueBtnClick() {
        // const newValue = {
        //                     checkIn:checkInPossibility,
        //                     monthExtendStay:allowMoreThanMonth,
        //                     rebookAfterTimeFrame:isBookingExtend
        //                 }
        dispatch({type:'property/availability', data: { checkIn:checkInPossibility,
                                                        monthExtendStay:allowMoreThanMonth,
                                                        rebookAfterTimeFrame:isBookingExtend  }})
        nextPage()
        
    }
  return (
    <div className='w-100 h-max-content absolute-h-center top-0 max-width-1280 '>
        <div className='max-w-600px mr-l-auto mr-r-auto p-btm-80px p-top-56px'>
            <h3 className='clr-primary-400 txt-align-center fw-regular-dark fs-875'>Availability</h3>
            <p className='txt-align-center fw-regular fs-200'>
                From your profile dashboard, you also will able to change all availability.
            </p>

            <div className='mr-top-24px fw-regular-dark'>
                <div className=" fs-400">
                    <h4 className='clr-neutral-600 fs-600 '>From when guests can start check in?</h4>
                    <div className=' grid gap-16px mr-top-24px mr-btm-24px'>
                        <label className="flex flex-align-center gap-24px">
                            <input type="radio" name="check_in_possibility" value="asap" checked={checkInPossibility === 'asap'} onChange={handleCheckInPossibilityChange}/>
                                As soon as possible 
                        </label>

                        <label className="flex flex-align-center gap-24px">
                            <input type="radio" name="check_in_possibility" value="fixed" checked={checkInPossibility === 'fixed'} onChange={handleCheckInPossibilityChange}/>
                                On a specific date
                        </label>
                    </div>
                    
                </div>
                <div>
                    <h4 className='clr-neutral-600 fs-600'>Want to allow 30+ night stays?</h4>
                    <div className=' grid gap-16px mr-top-24px mr-btm-24px'>
                        <label className="flex flex-align-center gap-24px">
                            <input type="radio" name="allow_more_then_month" value="yes"  checked={allowMoreThanMonth === 'yes'} onChange={handleAllowMoreThanMonthChange}/>
                                Yes
                        </label>

                        <label className="flex flex-align-center gap-24px">
                            <input type="radio" name="allow_more_then_month" value="no" checked={allowMoreThanMonth === 'no'} onChange={handleAllowMoreThanMonthChange}/>
                                No
                        </label>
                    </div>
                </div>
                <div>
                    <h4 className='clr-neutral-600 fs-600'>Want to stop getting booked after a time frame?</h4>
                    <div className=' grid gap-16px mr-top-24px mr-btm-24px'>
                        <label className="flex flex-align-center gap-24px">
                            <input type="radio" name="is_booking_extend" value="yes" checked={isBookingExtend === 'yes'} onChange={handleIsBookingExtendChange}/>
                                Yes 
                        </label>

                        <label className="flex flex-align-center gap-24px">
                            <input type="radio" name="is_booking_extend" value="no" checked={isBookingExtend === 'no'} onChange={handleIsBookingExtendChange}/>
                                No
                        </label>
                    </div>                
                </div>
            </div>
            




            
            {/* nextPage={onContinueBtnClick} previousPage={previousPage}   */}
            <SwitchBtn nextPage={onContinueBtnClick} previousPage={previousPage} />
        </div>
    </div>
  )
}
