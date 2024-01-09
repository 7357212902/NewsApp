import React, { Component } from 'react';
import NewsItem from './NewsItem';
//import spinner from './spinner'
import PropTypes from 'prop-types'


export default class News extends Component {
  static defaultProps={
    country:'in',
    pageSize:9,
    category:'general',
  }
  static propTypes={
    country:PropTypes.string,
    pageSize:PropTypes.number,
    category:PropTypes.string,
  }
  constructor() {
    super();
    console.log("Hello, I am cons from News component.");
    this.state = {
      articles: [],
      loading: true,
      page: 1, // Initialize the page state
      
}
 
    }
    //run after render method
    //async funtio wait for resolve await method promise
  
  async componentDidMount() {
    console.log("cdm");
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=580a16ffefe14ed790d7c87d121383e0&page=1&pageSize=${this.props.pageSize}`;
    this.setState({loading: true });
    let data = await fetch(url);
    let parsedata = await data.json();
    console.log(parsedata);
    this.setState({ articles: parsedata.articles ,totalarticles: parsedata.totalResults,loading: false});
  }

  handlePreviousclick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=580a16ffefe14ed790d7c87d121383e0&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;

    this.setState({loading: true});
    let data = await fetch(url);
    let parsedata = await data.json();
    // console.log(parsedata);
    this.setState({
      page: this.state.page - 1,
      articles: parsedata.articles,
      loading: false
    });
  };

  handleNextclick = async () => {
    if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=580a16ffefe14ed790d7c87d121383e0&page=${this.state.page + 1}&pagesize=${this.props.pageSize}`;
    this.setState({loading: true});
    let data = await fetch(url);
    let parsedata = await data.json();
    this.setState({loading: false});
    // console.log(parsedata);
    this.setState({
      page: this.state.page + 1,
      articles: parsedata.articles,
      loading: false
    });
  };
}

  render() {
    return (
      <div className='container my-3'>
        <h1 className="text-center" style={{margin:'35px 0px',textDecoration:'underline 5px grey' ,color:'black',fontFamily:'serif'}}>NEWSAPP - Top Headlines</h1>
       {this.state.loading  && <spinner/>}
        <div className="row">
          {!this.state.loading && this.state.articles.map((element) => (
            <div className="col-md-4" key={element.url}>
              <NewsItem
                title={element.title ? element.title.slice(0, 45) : ""}
                description={element.description ? element.description.slice(0, 88) : ""}
                imgurl={element.urlToImage}
                newsurl={element.url}
                author={element.author}
                date={element.publishedAt}
              />
            </div>
          ))}
        </div>
        <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handlePreviousclick}
          >
            &larr; Previous
          </button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)}type="button" className="btn btn-dark" onClick={this.handleNextclick}>
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

