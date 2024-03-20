import SwitchBtn from "../SwitchBtn"
import { useState } from "react";
import LucidIcon from "@/components/LucidIcon";
import usePropertyDispatch from "@/context/property/usePropertyDispatch";

export default function Approving({data, previousPage, nextPage}) {
    const dispatch = usePropertyDispatch()
    const [approvingMethod, setApprovingMethod] = useState('');
    const [genderPreference, setgenderPreference] = useState('');
    // const [isBookingExtend, setIsBookingExtend] = useState('');
    const [addPropertyFeatureModalOpen, setAddPropertyFeatureModalOpen] = useState(false)

    const onApprovingMethodChangeHandlar = (e) => {
        setApprovingMethod(e.target.value);
      };
    const onGenderPreferenceChnageHandlar = (e) => {
        setgenderPreference(e.target.value);
    };

    function onContinueBtnClick(params) {
        dispatch({type:'property/approvingMethod', data:approvingMethod})
        dispatch({type:'property/genderPreference', data:genderPreference})
        nextPage()
    }

    // const handleIsBookingExtendChange = (e) => {
    // setIsBookingExtend(e.target.value);
    // };
  return (
    <div className='w-100 h-max-content absolute-center top-0 max-width-1280 '>
        <div className='max-w-600px mr-l-auto mr-r-auto p-btm-80px p-top-56px'>
            <h3 className='clr-primary-400 txt-align-center fw-regular-dark fs-875'>Approving</h3>
            <p className='txt-align-center fw-regular fs-200'>
                From your profile dashboard, you also will able to change all availability.
            </p>

            <div className='mr-top-24px fw-regular-dark'>
                <div className=" fs-400">
                    <h4 className='clr-neutral-600 fs-600 '>Approving method</h4>
                    <div className=' grid gap-16px mr-top-24px mr-btm-24px'>
                        <label className="flex flex-align-center gap-24px">
                            <input type="radio" name="approving_method" value="instant" checked={approvingMethod === 'instant'} onChange={onApprovingMethodChangeHandlar}/>
                            Instant approve
                        </label>

                        <label className="flex flex-align-center gap-24px">
                            <input type="radio" name="approving_method" value="manual" checked={approvingMethod === 'manual'} onChange={onApprovingMethodChangeHandlar}/>
                            Approve manually
                        </label>
                    </div>
                    
                </div>
                <div>
                    <h4 className='clr-neutral-600 fs-600 mr-btm-16px'>Gender Preference</h4>

                    <div className="relative ">
                        <select className='border-neutral-300 no-outline no-active-outline radius-8 w-100 p-16px-24px' 
                            value={genderPreference}
                            onChange={onGenderPreferenceChnageHandlar}>
                            <option className="p-16px-24px" value=''>Anyone/No issues</option>
                            <option className="p-16px-24px" value='male'>Male</option>
                            <option className="p-16px-24px" value='female'>Female</option>
                        </select>
                        <LucidIcon className='position-absolute top-50 translateY-50 right-24px' name='chevron-down' size={24}/>
                    </div>
                    {/* <div className=' grid gap-16px mr-top-24px mr-btm-24px'>
                        <label className="flex flex-align-center gap-24px">
                            <input type="radio" name="allow_more_then_month" value="yes"  checked={allowMoreThanMonth === 'yes'} onChange={handleAllowMoreThanMonthChange}/>
                                Yes
                        </label>

                        <label className="flex flex-align-center gap-24px">
                            <input type="radio" name="allow_more_then_month" value="no" checked={allowMoreThanMonth === 'no'} onChange={handleAllowMoreThanMonthChange}/>
                                No
                        </label>
                    </div> */}
                </div>
                
            </div>
            




            
            {/* nextPage={onContinueBtnClick} previousPage={previousPage}   */}
            <SwitchBtn nextPage={onContinueBtnClick} previousPage={previousPage} />
        </div>
    </div>
  )
}
