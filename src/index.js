//Library
import _ from 'lodash';
//Library
import React, { Component } from 'react';
//Library
import ReactDOM from 'react-dom';
//Youtube API
import YTSearch from 'youtube-api-search';
//Search bar
import SearchBar from './components/search_bar';
//VideoList
import VideoList from './components/video_list';
//VideoDetail
import VideoDetail from './components/video_detail';
//Youtube API KEY
import API_KEY from '../config/config';


// Create a new component. This component should produce 
// some HTML.
class App extends Component {
    constructor(props) {
    super(props);

    this.state = { 
        videos: [],
        selectedVideo: null 
    }; 

    this.videoSearch('surfboards');
  }

    videoSearch(term) {
      YTSearch({key: API_KEY, term: term}, (videos) => {
        this.setState({ 
          videos: videos,
          selectedVideo: videos[0]
        });
      });  
  }

  render() {
    const videoSearch = _.debounce((term) => { this.videoSearch(term) }, 300);

    return (
      <div>
        <SearchBar 
          onSearchTermChange = {videoSearch} />
        <VideoDetail 
          video = {this.state.selectedVideo}/>
        <VideoList 
          onVideoSelect = {selectedVideo => this.setState({selectedVideo}) }
          videos = {this.state.videos} />
      </div>
    );
  }
}
 
// Take this component's HTML and put it 
// on the page (in the DOM)
ReactDOM.render(
  <App />, document.querySelector('.container'));