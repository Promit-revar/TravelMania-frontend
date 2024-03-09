import React from "react";
import './Reviews.css';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import { ChevronRight } from "lucide-react";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: theme.palette.mode === 'light' ? '#399a7a' : '#308fe8',
    },
  }));
const ReviewCard = ({ratings, name, date}) => {
    return (
        <div className="review-card">
            <div className="review-ratings">{ratings}/10</div>
            <div className="review-comment">Excellent</div>
            <div className="review-name">{name}</div>
            <div className="review-bottom-section">
                <div className="review-date">{date}</div>
                <div className="review-read-more">Read more<ChevronRight size={'15px'}/></div>
            </div>
            

        </div>
    )
}
const RatingProgress = ({ received, total, label }) => {
  // Calculate the progress percentage
  const progress = (received / total) * 100;

  return (
    <div>
        <div className="rating-label">
            <div className="rating-label-text">{label}</div>
            <div className="rating-received">{received}</div>
        </div>
        <BorderLinearProgress variant="determinate" value={progress} />
    </div>
  );
};

const ReviewComponent = ({totalRating}) => {
    return(
        <div className="review-section">
            <div className="ratings-summary">
                <div style={{ display: 'flex', flexDirection: 'row', gap:'15px'}}>
                    <div className="rating-score">
                        {totalRating}
                    </div>
                    <div style={{display: 'flex', flexDirection:'column', marginTop: '8px'}}>
                        <div className="recent-reviews-title">Exceptional </div>
                        <div style={{fontSize:'12px'}}>{87} reviews</div> 
                    </div>
                </div>
                <RatingProgress received={52} total={87} label={'Excellent'}/>
                <RatingProgress received={23} total={87} label={'Good'}/>
                <RatingProgress received={7} total={87} label={'Okay'}/>
                <RatingProgress received={5} total={87} label={'Poor'}/>
            </div>
            <div className="recent-reviews">
                <div style={{ display:'flex', flexDirection:'column'}}>
                    <div className="recent-reviews-title" style={{ marginTop:'5px'}}>
                        Recent Reviews
                    </div>
                    <div className="recent-review-cards">
                        <ReviewCard ratings={10} name="Mary" date="Feb 27, 2024" />
                        <ReviewCard ratings={6} name="Jose" date="Feb 15, 2024" />
                    </div>
                </div>
                <div className="all-reviews-button">
                    See all reviews <ChevronRight size={'18px'}/>
                </div>
            </div>
        </div>
    )
};
export default ReviewComponent;