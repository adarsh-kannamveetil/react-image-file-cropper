# react-image-file-cropper

It provides you a button to upload the file with image preview and cropper according to the need

[Cropperjs](https://github.com/fengyuanchen/cropperjs) as React components

[![NPM](https://nodei.co/npm/react-image-file-cropper.png)](https://www.npmjs.com/package/react-image-file-cropper)

[Demo](http://roadmanfong.github.io/react-cropper/example/)


## Docs

* [Image Cropper](https://github.com/fengyuanchen/cropper)

## Installation

Install via [npm](https://www.npmjs.com/package/react-image-file-cropper)

```shell
npm install --save react-image-file-cropper
```

You need `cropper.css` in your project which is from [cropperjs](https://www.npmjs.com/package/cropperjs).


# Changelog


## Todo
* Unit test

## Quick Example
```js
import React, {Component} from 'react';
import ImagePreview from 'react-image-file-cropper';
import 'cropperjs/dist/cropper.css'; // see installation section above for versions of NPM older than 3.0.0
// If you choose not to use import, you need to assign Cropper to default
// var Cropper = require('react-image-file-cropper').default

class Demo extends Component {
  onCrop(blob) {
    console.log("onCrop ", blob);
  }

  onChange(file) {
    console.log("onChange ", file);
  }

  render() {
    return (
        <ImagePreview 
            cropper={true} 
            preview={true} 
            onCrop={this.onCrop} 
            onChange={this.onChange}
            aspectRatio={1/ 1}
        />
    );
  }
}
```

## Options


### aspectRatio
https://github.com/fengyuanchen/cropperjs#aspectratio

### cropper
If you provide the value true, cropper will appear, if you dont want a cropper, and only preview is needed you can use the preview option only.

### preview
If you only want to preview the file uploaded you can user this option.

If you dont use a preview or cropper option a button will apper which will give you the selected file .


## Methods

### onCrop
It will provide the blob after cropping

### onChange
It will provide the file after selecting


## Build

```
npm run build
npm run build-example
```

## Author
Adarsh ks(adarshs.adarshs@gmail.com)

## License

## Keywords
react, cropper, image preview

