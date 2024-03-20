'use client'
import { useState } from "react"
export default function PostReview({}) {

    const [reviewText, setReviewText] = useState()

    
    return  <form className="w-100">
                <textarea value={reviewText} onChange={e=>setReviewText(e.target.value)} className="w-100 radius-8 p-8px" id="inputTextArea" rows="5" cols="50" placeholder="Write a review (Optional)"/>
                <button className="bg-neutral-000 cursor-pointer clr-neutral-620 mr-top-24px w-285 p-top-16px p-btm-16px radius-8 txt-align-center">Save Review</button>
            </form>
}