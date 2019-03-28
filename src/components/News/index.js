import React from 'react'
import Parser from 'html-react-parser'
const News = ({ news }) => {
  return (
    <li className='news'>
      <a className='news__wrapper' href={news.link}>
        {news.media.file ? (
          <img className='news__image' src={news.media.file} />
        ) : (
          <></>
        )}
        <h2 className='news__title'>{news.title}</h2>
        <div className='news__description'>{Parser(news.description)}</div>
        <a className='news__source' href={news.source.url}>
          {news.source.text}
        </a>
      </a>
    </li>
  )
}
export default News
