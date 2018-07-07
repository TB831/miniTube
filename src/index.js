import React, { Component }from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/SearchBar.js';
import VideoList from './components/VideoList.js';
import VideoDetail from './components/VideoDetail.js';
import config from '../config.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: [],
      selectedVideo: null,
    };
    this.videoSearch('');
  }

  videoSearch(term) {
    YTSearch({
      key: config.API_KEY,
      term: term
    }, (videos) => {
      this.setState({
        videos: videos,
        selectedVideo: videos[0]
      })
    });
  }

  render() {
    const videoSearch = _.debounce((term) => {this.videoSearch(term)}, 300) // Throttles the YTSearch, can only by called every 300ms

    return (
      <div>
        <SearchBar
          onSearchTermChange={videoSearch}
        />
        <VideoDetail
          video={this.state.selectedVideo}
        />
        <VideoList
          onVideoSelect={selectedVideo => this.setState({selectedVideo})}
          videos={this.state.videos}
        />

      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('.container'));
