import React from "react";
import './ViewAllReviews.css'
import { ThumbsUp } from 'lucide-react';
import thumpsup from '../../assets/thumps-up.svg';
import Image from "../../UI/components/Image/Image";
const ViewAllReviewsComponent = ({reviews}) =>{
    return (
        <div className="view-all-reviews">
            {reviews.map(review=>{
                return(
                    <>
                        <div>

                            <div className="ratings-received">{review.rating}/10 {review.comment}</div>
                            <div className="reviewer-name">{review.name}</div>
                            <div className="post-date">{review.postDate}</div>
                            <div className="review-desc">{review?.desc}</div>
                            <div className="stay">stayed {review.stay} in {review.stayMonth} </div>
                            <div className="likes"><Image src={thumpsup} height="20px" width="20px"/> {review.likes}</div>
                        </div>
                        <hr />
                    </>
                )
            })}
        </div>
    )
}
export default ViewAllReviewsComponent;