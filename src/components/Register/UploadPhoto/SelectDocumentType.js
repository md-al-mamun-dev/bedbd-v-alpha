import useVerificationDocumentType from "@/hooks/useVerificationDocumentType"
import LucidIcon from "@/components/LucidIcon"

export default function SelectDocumentType({docType, setDocumentType, formState}) {
    const verificationDocumentType = useVerificationDocumentType()

    console.log(docType)

    function onDocumentTypeChangeHandlar(e) {
      console.log(docType)
      const value = e.target.value
      if(value.length > 0)
        setDocumentType(verificationDocumentType?.find(i=>i['id']===e.target.value))
      else
        setDocumentType({})
    }


  return (
    <>
        <select 
          disabled={(formState==='verification-document-back-side')}
          value={ Object.keys(docType).length>0 ? docType['id'] : '' }
          onChange={onDocumentTypeChangeHandlar} className='w-100 border-neutral-250 fs-regular fw-regular-dark clr-neutral-500 p-12-24 radius-6 bg-transparent' name="doc-type" id="doc-type" required>
            <option value="" > Select document type </option>
            {
                verificationDocumentType
                    .map(i=><option key={i['id']} value={i['id']}>{i['title']}</option>)
            }
            
            {/* <option value="nid">National ID</option>
            <option value="passport">Passport</option>
            <option value="driving_license">Driving License</option> */}
        </select>
        <LucidIcon className='absolute right-16px top-16px z-index-minus-1' name='chevron-down' size={24} />
    </>
    
  )
}
