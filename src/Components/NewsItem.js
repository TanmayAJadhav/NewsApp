import React from 'react';

const NewsItem = (props) => {    
  let  {title, description, imageUrl, newsUrl, author, date, source } = props;
  return (
        <div className='my-3'>
            <div className="card" >
            <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left:'90%', zIndex: '1'}}>{source}</span>
                <img className="card-img-top" src={!imageUrl ? "https://img.republicworld.com/republic-prod/stories/promolarge/xhdpi/xifs6gxrkexotmu9_1643973469.jpeg": imageUrl} alt="Card image cap"/>
                <div className="card-body">
                    <h5 className="card-title">{title}...</h5>
                    <p className="card-text">{description}...</p>
                    <p className="card-text"><small className="text-muted">By {author?author:"unknown"} on {new Date(date).toGMTString()}</small></p>
                    <a href= {newsUrl} target="_blank" className="btn btn-sm btn-outline-primary">Read More</a>
                </div>
            </div>
        </div>
    )
}

export default NewsItem;
