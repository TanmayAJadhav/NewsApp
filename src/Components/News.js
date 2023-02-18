import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  
  const updateNews = async() => {
      const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=c9e7b246db074c479f95f82e50cdb89f&page=${page}&pageSize=${props.pageSize}`;
      setLoading(true)
      props.setProgress(30)
      let data = await fetch(url);
      props.setProgress(60)
      let parsedData = await data.json();
      props.setProgress(80)
      setArticles(parsedData.articles) 
      setTotalResults(parsedData.totalResults)
      setLoading(false)
      props.setProgress(100)
    }
    
    useEffect(() => {
    document.title = `NewsExpress-${(props.category)[0].toUpperCase()+(props.category).substring(1)}`
    updateNews();
  }, [])

  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=c9e7b246db074c479f95f82e50cdb89f&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page+1)
	  let data = await fetch(url);
    let parsedData = await data.json();
    // console.log(parsdData)
    setArticles(articles.concat(parsedData.articles))
    setTotalResults( parsedData.totalResults)
  }

    return (
      <>
        <h1 className="d-flex justify-content-center" style={{ margin: "40px 0px" ,marginTop: "80px",fontSize: "50px" }}>
			NewsExpress - Top {(props.category)[0].toUpperCase()+(props.category).substring(1)} Headlines
        </h1>
        {loading && <Spinner/>}
        <InfiniteScroll style={{overflow:'none'}}
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length !== totalResults}
                    loader={<Spinner/>}
                > 
                    <div className="container">    
                      <div className="row">
                          {   articles.map((element) => {
                              return <div className="col-md-4" key={element.url}>
                                  <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                              </div>
                          })}
                      </div>
                    </div> 
                </InfiniteScroll>
        </>
    );
  
}


export default News;