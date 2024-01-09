import React, { Component } from 'react'

export default class NewsItem extends Component{
                     
  render() {
    let {title,description,imgurl,newsurl,author,date}=this.props;
    return (
      <div className="my-3">
        <div className="card" style={{backgroundColor:"#B3B6B7"}}>
  <img src={imgurl} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{title}...</h5>
    <p className="card-text">{description}...</p>
    <p className="card-text"><small class="text-body-secondary">By {!author?"Unknown" :author} on {new Date(date).toGMTString()}</small></p>

    <a rel="noreferrer" href={newsurl} target='_blank' className="btn btn-outline-success">Read More</a>
  </div>
</div>
      </div>
    )
  }
}
