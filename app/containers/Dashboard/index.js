/**
 * DashboardPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
// import ImagePreview from '../ImagePreview';
import ImagePreview from 'react-image-file-cropper';

export default class Dashboard extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  onCrop(file) {
    console.log("onCrop ", file);
  }

  onChange(file) {
    console.log("onChange ", file);
  }

  render() {
    return (
      <div>
        <h1 className='heading'>React file image cropper</h1>
        {/* <ImagePreview cropper={true} /> */}
        <ImagePreview cropper={true} preview={true}  onCrop={this.onCrop} onChange={this.onChange}/>
      </div>
    );
  }
}
