import BackButton from "@/components/ImageDetails/BackButton"
import ShareSaveBtn from "@/components/ShareSaveBtn"
import Image from "next/image"
import dynamic from "next/dynamic"
// import { useEffect , useState} from "react"
import storageService from "@/service/StorageService"



function getImages(data) {
    return data.map(async id=>{
        const imageData = storageService.getImageView(id)
    })

    // return await Promise.all(data.map(id =>{
    //     const image = storageService.getPropertyImage(id)
    //     return import(`${image['href']}`)
    // }));
}




export async function ImageDetails({data}) {
const images = await getImages(data)
// console.log(images)
// const images = storageService.getPropertyImage(data)


    const containerId = 'img_details'
    return  <div id="img_details" className='display-none blur-6 p-top-48px position-absolute bg-neutral-000 z-index-11 top-24px w-100 h-100vh overflow-scroll'>
                <div className='position-relative w-100 max-width-1024px bg-neutral-000 left-50 translateX-50 p-l-24px p-r-24px radius-8 p-btm-80px'>
                    <div className={`flex flex-align-center flex-space-between p-24px z-index-12 sticky top-0 bg-neutral-000 `}>
                        <BackButton containerId = {containerId}/>
                        <ShareSaveBtn/>
                    </div>

                    <div className='z-index-1 mr-l-auto mr-r-auto w-100-24px max-w-768px '>
                            {
                                data.map((img, idx)=>{
                                    const image_id = `detail_image_${idx}`
                                    const image = storageService.getPropertyImage(img)
                                    return (
                                        <div className='position-relative min-w-100 min-h-500px
                                         radius-4 mr-btm-36px-not-last-child'>
                                            <Image id={image_id} key={idx} src={image} fill objectFit="contain"/>
                                        </div>
                                    )
                                })
                            }
                    </div>
                </div>
            </div>
}