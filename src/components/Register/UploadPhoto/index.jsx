"use client"
import { useCallback, useEffect, useState } from 'react'
import LucidIcon from '../../LucidIcon'
import BackBtn from '../BackBtn'
import { useDropzone } from 'react-dropzone'
import Image from 'next/image'
import storageService from '@/service/StorageService'
import useAccount from '@/context/account/useAccount'
import SelectDocumentType from './SelectDocumentType'
import useRegistrationDispatch from '@/context/registration/useRegistrationDispatch'
import useRegistration from '@/context/registration/useRegistration'

export default function UploadPhoto({data, formState, prevStep, nextStep}) {

    const [verifiactonDocumentType, setVerifiactonDocumentType] = useState({})
    // const account = useAccount()
    const [uploadFile, setUploadFile] = useState()
    const [imageFile, setImageFile] = useState({})
    const [rejectedFiles, setRejectedFiles]= useState([])

    const dispatch = useRegistrationDispatch()
    
    const registrationData = useRegistration()

    useEffect(()=>{
        if(formState==='user-photo' && Object(registrationData['prefs']).hasOwnProperty('userPhoto')){
            setImageFile(registrationData['prefs']['userPhoto'])
        }else if(formState==='verification-document-front-side' && Object(registrationData['prefs']).hasOwnProperty('verificationDocFront')){
            setImageFile(registrationData['prefs']['verificationDocFront'])}
        else if(formState==='verification-document-back-side' && Object(registrationData['prefs']).hasOwnProperty('verificationDocBack'))
            setImageFile(registrationData['prefs']['verificationDocBack'])
        if(Object(registrationData['prefs']).hasOwnProperty('verificationDocType'))
            setVerifiactonDocumentType(registrationData['prefs']['verificationDocType'])
        console.log(registrationData)
        console.log(verifiactonDocumentType)

    },[registrationData])


    const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
        if(acceptedFiles.length){
            setUploadFile(acceptedFiles[0])
            setImageFile( Object.assign(acceptedFiles[0], {preview: URL.createObjectURL(acceptedFiles[0])})  )
            // if(formState === 'user-photo')
            //     dispatch({  type:'registration/update-pref', data:{ userPhoto: acceptedFiles[0]}  })
            // else if(formState === 'verification-document-front-side')
            //     dispatch({  type:'registration/update-pref', data:{ verificationDocFront: acceptedFiles[0]}  })
            // else if(formState === 'verification-document-back-side')
            //     dispatch({  type:'registration/update-pref', data:{  verificationDocBack: acceptedFiles[0]}  })            
        }
        if(rejectedFiles.length){
            setRejectedFiles(previousFiles => [...previousFiles, ...rejectedFiles])
        }
        console.log(rejectedFiles)
    }, [])

    const { acceptedFiles, getRootProps, getInputProps, isDragActive} = useDropzone({onDrop, 
                                                                        accept:{    'image/svg': ['.svg'],
                                                                                    'image/jpg': ['.jpg', '.jpeg', '.jfif', '.pjpeg', '.pjp'],
                                                                                    'image/png': ['.png'] },
                                                                        maxSize: 2048 * 1000,
                                                                        maxFiles:1,
                                                                    })

    async function onContinueBtnClickHandlar() {
        // console.log(uploadFile)
        // console.log(imageFile)
        // const uploadImage = await storageService.uploadIdentificationImage(imageFile, account['$id'])
        let dataKey = ''
        if(formState === 'user-photo')
            dataKey = 'userPhoto'
        else if(formState === 'verification-document-front-side')
            dataKey = 'verificationDocFront'
        else if(formState === 'verification-document-back-side')
            dataKey = 'verificationDocBack'

        dispatch({  type:'registration/update-pref', data:{ [dataKey]: imageFile, verificationDocType:verifiactonDocumentType  }  })
        console.log(registrationData)
        if(imageFile)
            nextStep()
    }
    return (
        <>
            <h3 className='clr-primary txt-align-center fs-875 fw-regular-dark '>
                Upload { formState === 'user-photo' ? 'photo' : 'Document' }</h3>
            <div className='w-100 mr-l-auto mr-r-auto mr-t-48 relative'>
                {
                    (   formState === 'verification-document-front-side'
                    ||  formState === 'verification-document-back-side')
                        && <SelectDocumentType docType={verifiactonDocumentType} setDocumentType={setVerifiactonDocumentType} formState={formState} />
                }                
                <div {...getRootProps({className: `mr-top-32 ${ formState==='user-photo'
                                                                    ?'h-280px w-296px horizontal-center'
                                                                    :'h-232px w-386px ' } h-256px radius-8 border-dashed-1 cursor-pointer relative` })}>
                    <input {...getInputProps()}/>
                    {
                        Object.keys(imageFile).length < 1
                            ?   isDragActive
                                ?   <h3 className='clr-neutral-400  fs-200 fw-regular txt-align-center absolute-center'>
                                        Drop the File <span className='clr-neutral-500 fw-regular-dark'>here</span>...
                                    </h3>
                                :   <div className='grid gap-12px justify-items-center mr-62px-28px '>
                                        <LucidIcon name='upload' size={24} />
                                        <div className='radius-8 p-8 txt-align-center w-146 h-40 fs-regular fw-regular-dark clr-neutral-600 bg-secondary-050 border-neutral-300 ' >
                                            Browse
                                        </div>
                                        {
                                                formState === 'user-photo'
                                                    ?   <h3 className='clr-neutral-400  fs-200 fw-regular txt-align-center'>                                           
                                                            Or drag and drop <span className='clr-neutral-500 fw-regular-dark'> your photo </span> here
                                                        </h3>
                                                    :   formState === 'verification-document-front-side'
                                                            ?   <h3 className='clr-neutral-400  fs-200 fw-regular txt-align-center'>                                           
                                                                    Or drag and drop photo of the <span className='clr-neutral-500 fw-regular-dark'>Front Part</span> of your NID card
                                                                </h3>
                                                            :   <h3 className='clr-neutral-400  fs-200 fw-regular txt-align-center'>                                           
                                                                    Or drag and drop photo of the <span className='clr-neutral-500 fw-regular-dark'>Back Part</span> of your NID card
                                                                </h3>
                                            }
                                         
                                    </div>

                            :   <div className='absolute-center width-320px height-232px'>                                    
                                    <Image src={imageFile.preview} alt='' objectFit='contain' fill />
                                </div>
                    }
                </div>  
                <button onClick={onContinueBtnClickHandlar} className={`w-100 max-w-386 mr-top-32px mr-l-auto mr-r-auto ${(
                    Object.keys(imageFile).length > 0 
                    && (formState === 'user-photo' 
                            ? true 
                            : Object.keys(verifiactonDocumentType).length > 0) ) ? 'btn-primary': 'btn-disable' } `}>Save & Continue</button>
            </div>   
            <BackBtn onBackBtnClick={prevStep}/>
        </>
    )
}
