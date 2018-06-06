import React from "react";
import Cropper from 'react-cropper';
import b64toBlob from 'b64-to-blob';
import { replace } from 'lodash';

export default class ImageCropper extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            imagePreviewUrl: '',
            imageFile: {},
            croppedImageFile: {},
            cropper: true
        }
        this.crop = this.crop.bind(this);
        this.handleFileInputChange = this.handleFileInputChange.bind(this);
    }

    handleFileInputChange(e) {
        e.preventDefault();
        const reader = new FileReader();
        const imageFile = e.target.files[0];
        if (this.props.onChange)
            this.props.onChange(e.target.files[0])
        this.setState({ imageFile });
        reader.onloadend = () => {
            this.setState({ imagePreviewUrl: reader.result });
        };
        reader.readAsDataURL(imageFile);
    }

    crop() {
        if (this.cropper) {
            const data = replace(this.cropper.getCroppedCanvas().toDataURL(), 'data:image/png;base64,', '');
            this.setState({ croppedImageFile: b64toBlob(data, 'image/png') })
            if (this.props.onCrop)
                this.props.onCrop(b64toBlob(data, 'image/png'));
        }
    }


    render() {
        const { imagePreviewUrl, imageFile } = this.state;
        const { cropper, preview, aspectRatio } = this.props;
        return (
            <div className='image-upload'>
                {(imagePreviewUrl && !cropper && preview) &&
                    <img src={imagePreviewUrl} alt="" />
                }
                {(imagePreviewUrl && cropper) &&
                    <Cropper
                        ref={(node) => { this.cropper = node }}
                        src={imagePreviewUrl}
                        style={{ width: '100%' }}
                        viewMode={3}
                        dragMode={'move'}
                        aspectRatio={aspectRatio ? aspectRatio : 1 / 1}
                        guides={false}
                        crop={this.crop}
                    />
                }
                <a className="replace " title="Replace Image">
                    <i className="sprite-replace-img"></i>
                    <input className="file-input" name="imageFile" onChange={this.handleFileInputChange} type="file" accept="image/*" ref={(ref) => this.fileUpload = ref} />
                    <span >{`${(imagePreviewUrl && (cropper || preview)) ? 'Replace' : 'Upload'}`} image</span>
                </a>
            </div>
        );
    }
}