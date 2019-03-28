import React, { Component } from 'react'
import { getData } from '../../api/getData'
import News from '../News'
var parser = require('parser')

export default class NewsList extends Component {
  state = {
    url: 'https://newsapi.org/v2',
    apiKey: 'c458412b48584f06946dbdc07ed9121d',
    news: [],
    show_news: [],
    error: '',
    loading: false
  }
  componentDidMount () {
    this.setState({ loading: true }, () => {
      getData(
        `${'https://cors-anywhere.herokuapp.com/'}https://news.google.com/rss`
      )
        .then(res => {
          let news = this.parseData(res)
          let sort = news.sort((a, b) => {
            return new Date(b.pubDate) - new Date(a.pubDate)
          })
          let show_news = [...sort]
          show_news.length = 10
          this.setState({ news: sort, show_news, loading: false })
        })
        .catch(err => {
          this.setState({ error: err.message })
        })
    })
  }

  handleLoad = () => {
    let { news, show_news } = this.state
    let add = news.slice(show_news.length, show_news.length + 2)
    let concat = show_news.concat(add)
    this.setState({ show_news: concat })
  }

  parseData = data => {
    parser = new DOMParser()
    var xmlDoc = parser.parseFromString(data, 'text/xml')
    var items = Array.from(xmlDoc.getElementsByTagName('item'))
    var feeds = []
    items.forEach(item => {
      feeds.push({
        title: this.getNode(item, 'title').innerHTML,
        link: this.getNode(item, 'link').innerHTML,
        pubDate: this.getNode(item, 'pubDate').innerHTML,
        description: this.getNode(item, 'description').textContent,
        source: {
          url:
            item.getElementsByTagName('source')[0] &&
            item.getElementsByTagName('source')[0].getAttribute('url'),
          text:
            item.getElementsByTagName('source')[0] &&
            item.getElementsByTagName('source')[0].textContent
        },
        media: {
          file:
            item.getElementsByTagName('media:content')[0] &&
            item.getElementsByTagName('media:content')[0].getAttribute('url')
        }
      })
    })
    return feeds
  }

  getNode = (node, tagToRetrieve) => {
    var htmlData = node.getElementsByTagName(tagToRetrieve)[0]
    return htmlData
  }

  render () {
    let { error, show_news, loading, news } = this.state
    return (
      <>
        {loading ? (
          <div className='loading'>
            <p className='loading__text'>Loading ...</p>
          </div>
        ) : (
          <div className='container'>
            {error.length > 0 ? (
              <div className='error'>{error}</div>
            ) : (
              <ul>
                {show_news.map((item, index) => {
                  return <News key={index} news={item} index={index} />
                })}
              </ul>
            )}
            {news.length !== show_news.length ? (
              <div className='load-more' onClick={() => this.handleLoad()}>
                Load More
              </div>
            ) : (
              <></>
            )}
          </div>
        )}
      </>
    )
  }
}
