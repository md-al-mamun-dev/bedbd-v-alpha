import SwitchBtn from "../SwitchBtn"
import { useState } from "react";
import LucidIcon from "@/components/LucidIcon";
import usePropertyDispatch from "@/context/property/usePropertyDispatch";
import accountService from "@/service/AccountService";
// import { timeStringToMilliseconds } from "@/components/Utility/timeConversion";
import { timeStringArrayToMilisecondArray } from "@/components/Utility/timeConversion";


export default function TermsConditions({data, userId, nextPage, previousPage }) {
    const [acceptLegitimateDeclaration, setAcceptLegitimateDeclaration] = useState(false)
    const [acceptReadTermsCondition, setAcceptReadTermsCondition] = useState(false)
    const dispatch = usePropertyDispatch()

    async function onContinueBtnClick() {
        dispatch({type:'property/termsCondition', data:{
                                                        legitimateDeclaration:acceptLegitimateDeclaration,
                                                        readTermsCondition:acceptReadTermsCondition
                                                    } })

        const _formData = new FormData()

        data['images'].map((file, idx) =>{
            _formData.append(`image`, file)
        })
        // const selectedPropertyType = data['propertyTypes'].find(i => i['id']=== data['selectedPropertyType'])
        
        const selectedBookingTypes = data['bookingTypes'].filter(i => data['selectedBookingType'].includes(i['id']))
        const selectedPropertyFeatures = data['propertyFeatures'].filter(i => data['selectedPropertyFeatures'].includes(i['id']))
        // const selectedAmenities = data['amenities'].filter(i => data['selectedAmenities'].includes(i['id']))
        const selectedHomeRules = data['homeRules'].filter(i => data['selectedHomeRules'].includes(i['id']))


        _formData.append('propertyType', data['selectedPropertyType'])

        selectedBookingTypes.map(item=>{
            // _formData.append('bookingTypes', JSON.stringify(item))
            // new_type_
            if(item['id'].startsWith("new_type_")){
                _formData.append('customBookingTypes', JSON.stringify(item))
            }else{
                _formData.append('bookingTypes', item['id'])
            }
        })

        selectedPropertyFeatures.map(item=>{
            if(item['id'].startsWith("new_feature_")){
                _formData.append('customFeatures', JSON.stringify(item))
            }else{
                _formData.append('propertyFeatures', item['id'])
            }
        })
        // selectedAmenities.map(item=>{
        //     _formData.append('amenities', JSON.stringify(item))
        // })
        data['selectedAmenities'].forEach(item => {
            _formData.append('amenities', item)
        });
        selectedHomeRules.map(item=>{
            if(item['id'].startsWith("new_rules_")){
                _formData.append('customHomeRules', JSON.stringify(item))
            }else{
                _formData.append('homeRules', item['id'])
            }

            // _formData.append('homeRules', JSON.stringify(item))
        })
        _formData.append('userId',                              userId)
        _formData.append('propertyTitle',                       data['title'])
        _formData.append('description',                         data['propertyDescription'])
        _formData.append('address',                             JSON.stringify(data['address']))
        _formData.append('city',                                JSON.stringify(data['city']))
        _formData.append('country',                             JSON.stringify(data['country']))
        _formData.append('thana',                               JSON.stringify(data['thana']))
        _formData.append('timezone',                            JSON.stringify(data['timeZone']))
        _formData.append('zipCode',                             JSON.stringify(data['zipCode']))
        _formData.append('location',                            JSON.stringify(data['location']))
        _formData.append('ownersDataValidDeclaration',          acceptLegitimateDeclaration)
        _formData.append('readTermsCondition',                  acceptReadTermsCondition)

        data['roomCount'].map(item=>{
            _formData.append('roomCount', JSON.stringify(item))
        })
        data['bedCount'].map(item=>{
            _formData.append('bedCount', JSON.stringify(item))
        })
        data['guestCount'].map(item=>{
            _formData.append('guestCount', JSON.stringify(item))
        })


        // _formData.append('currency',                            JSON.stringify(data['rentInfo']['currency']))
        _formData.append('rent',                                JSON.stringify(data['rentInfo']))
        _formData.append('availability',                        JSON.stringify(data['availability']))
        _formData.append('approvingMethod',                     data['approvingMethod'])
        _formData.append('genderPref',                          data['genderPref'])        
        _formData.append('checkInTime',                         JSON.stringify(timeStringArrayToMilisecondArray(data['checkInTime'])))
        _formData.append('checkOutTime',                        JSON.stringify(timeStringArrayToMilisecondArray(data['checkOutTime'])))




        const response = await fetch(process.env.NEXT_PUBLIC_API_URL+"/api/add-listing", {
            method: "POST",
            headers: {
              Authorization: `Bearer sampleToken`,
            },
            body: _formData,
          })
          console.log(response)

        // if(response.ok)
        //     nextPage()



        // 
    }

  return (
    <div className='w-100 h-max-content absolute-center top-0 max-width-1280 '>
        <div className='max-w-600px mr-l-auto mr-r-auto p-btm-80px p-top-56px'>
            <div className="mr-btm-800">
                <h3 className='clr-primary-400 txt-align-center fw-regular-dark fs-875'>That’s all</h3>
                <p className='txt-align-center fw-regular-dark fs-600 mr-top-16px width-480px'>
                    You’ve done everything you need to before your first guest stays.
                </p>
            </div>
            
            <div className='w-100 grid gap-16px'>
                <div className="grid grid-col-auto-1fr gap-16px">
                    {/* <LucidIcon name='square' size={24}/> */}
                    <button 
                        onClick={e=>setAcceptLegitimateDeclaration(!acceptLegitimateDeclaration)}
                        className=' min-w-24px h-fit-content no-border no-outline bg-transparent cursor-pointer'>
                        <LucidIcon className='opacity-0_70' name={ acceptLegitimateDeclaration ? 'check-square' : 'square' } size={24}/>
                    </button>
                    <p className='fs-200 fw-regular'>I confirm that this is a legitimate accommodation business with all necessary licenses and permits, which can be shown upon first request. Bedbd.com reserves the right to verify and investigate any details provided in this registration.</p>
                </div>
                <div className="grid grid-col-auto-1fr gap-16px min-h-24px">
                    {/* <LucidIcon name='square' size={24}/> */}
                    <button 
                        onClick={e=>setAcceptReadTermsCondition(!acceptReadTermsCondition)}
                        className=' w-24px h-fit-content no-border no-outline bg-transparent cursor-pointer'>
                        <LucidIcon className='opacity-0_70' name={ acceptReadTermsCondition ? 'check-square' : 'square' }  size={24}/>
                    </button>
                    <p className='fs-200 fw-regular'>I have read, accepted, and agreed to the 
                        <span className='clr-secondary-400'> terms and conditions.</span>
                    </p>
                </div>
                
            </div>
            




            
            {/*   */}
            <SwitchBtn nextPage={onContinueBtnClick} previousPage={previousPage} />
        </div>
    </div>
  )
}
