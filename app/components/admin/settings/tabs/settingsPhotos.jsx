import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { uploadAvatarUserAction, avatarUploadModalIsOpenAction, avatarUploadImagePreviewAction } from '../../../../actions/userAuth';
import Dropzone from 'react-dropzone';
import Cropper from 'react-cropper';

import classNames from 'classnames/bind';
import stylesMain from '../../../../css/main';
import stylesSetting from '../css/style';
const styles = Object.assign({}, stylesMain, stylesSetting);
const cx = classNames.bind(styles);


class SettingsProfil extends Component {
  constructor(props) {
    super(props);
    this.dropHandler 		    = this.dropHandler.bind(this);
    this.handleClose 		    = this.handleClose.bind(this);
    this.uploadAvatarAction = this.uploadAvatarAction.bind(this);
		this.numberTryingLoadImg = 0;
  }

	/* Upload - step 1 - open the modal with us image selected */
	dropHandler(nameField) {
		const { avatarUploadImagePreviewAction, avatarUploadModalIsOpenAction } = this.props;
		function dropHandlerFile(file) {
			if (!file[0] || !file[0].preview) {
				return;
			}

			// send image in state for displaying in Cropper
			avatarUploadImagePreviewAction(nameField, file[0].preview);

			// open modal :
			avatarUploadModalIsOpenAction(true);
		}

		return dropHandlerFile;
	};

  /* Upload - step 2 - close the modal and call the API */
  uploadAvatarAction() {
    const { userAuth, uploadAvatarUserAction, avatarUploadModalIsOpenAction, avatarUploadImagePreviewState } = this.props;
    const _id = userAuth.userObj._id;

    // close modal :
    avatarUploadModalIsOpenAction(false);

    this.refs.cropper.getCroppedCanvas({
      width: 160,
      height: 90,
      fillColor: '#fff',
      imageSmoothingEnabled: false,
      imageSmoothingQuality: 'high'
    });

    this.refs.cropper.getCroppedCanvas().toBlob(function (blob) {
			var $filename = document.querySelector('#formAvatar input[type="file"]');
			var filename = $filename.files[0] && $filename.files[0].name || 'undefined.jpg';
			var nameField = avatarUploadImagePreviewState.nameField;
      let formData = new FormData();
      formData.append('formAvatar', blob, filename); // 'formAvatar' is used in routes.js

      // send image cropped to back-end :
      if (_id && formData && nameField) {
        uploadAvatarUserAction(formData, {id: _id, avatarSelected: nameField});
      }

    });
  }

  handleClose() {
    const { avatarUploadModalIsOpenAction } = this.props;
    avatarUploadModalIsOpenAction(false);
  };

  /*
   * retry to load image immediately after the upload - because the server is very long :
	 * */
	componentDidUpdate() {
		const { userAuth } = this.props;
		const image = this.refs.avatar;
		var that = this;

		if (userAuth.userObj && userAuth.userObj.avatarSrc) {
			image.onerror = function () {
				that.numberTryingLoadImg++;
				if (that.numberTryingLoadImg < 10) {
					setTimeout(function () {
						image.src = `/uploads/${userAuth.userObj.avatarSrc}`;
					}, 1000);
				}
			};
		}
	};

  render() {
    const { userAuth, avatarUploadModalIsOpenState, avatarUploadImagePreviewState } = this.props;
    const message = userAuth.message;

    const actions = [
      <FlatButton label="Annuler" primary={true} onTouchTap={this.handleClose}/>,
      <FlatButton label="OK" primary={true} keyboardFocused={true} onTouchTap={this.uploadAvatarAction}/>,
    ];

    return (
      <div>
        <h2>Ajouter une image</h2>
				<p>Drag and drop une image ici ou clique pour selectionner une image.</p>

        {/* MODALE CROPPER */}
        <div>
          <Dialog
            title="Redimensionne une image"
            actions={actions}
            modal={false}
            open={avatarUploadModalIsOpenState}
            onRequestClose={this.handleClose}
          >
            <Cropper
              ref='cropper'
              src={avatarUploadImagePreviewState.imageSrc}
              style={{height: 400, width: '100%'}}
              zoomable={false}
              aspectRatio={16 / 9}
              guides={false}
            />
          </Dialog>
        </div>

        <form id="formAvatar" className={cx('form-horizontal')} >
					<div className={cx('dropzone-container')}>
						<Dropzone onDrop={this.dropHandler('avatar1')} multiple={false} accept={'image/*'} className={cx('dropzone-input')} >
							<img src={userAuth.userObj.avatarsSrc.avatar1 ? `/uploads/${userAuth.userObj.avatarsSrc.avatar1.mainProfil}` : ''} alt="avatar" ref="avatar" />
						</Dropzone>
						<div className={cx('dropzone-text')}><strong>Image 1</strong><br/></div>
					</div>

					<div className={cx('dropzone-container')}>
						<Dropzone onDrop={this.dropHandler('avatar2')} multiple={false} accept={'image/*'} className={cx('dropzone-input')} >
							<img src={userAuth.userObj.avatarsSrc.avatar2 ? `/uploads/${userAuth.userObj.avatarsSrc.avatar2.mainProfil}` : ''} alt="avatar" ref="avatar" />
						</Dropzone>
						<div className={cx('dropzone-text')}><strong>Image 2</strong><br/></div>
					</div>

					<div className={cx('dropzone-container')}>
						<Dropzone onDrop={this.dropHandler('avatar3')} multiple={false} accept={'image/*'} className={cx('dropzone-input')} >
							<img src={userAuth.userObj.avatarsSrc.avatar3 ? `/uploads/${userAuth.userObj.avatarsSrc.avatar3.mainProfil}` : ''} alt="avatar" ref="avatar" />
						</Dropzone>
						<div className={cx('dropzone-text')}><strong>Image 3</strong><br/></div>
					</div>

          <p className={cx('message', {'message-show': message && message.length > 0})}>{message}</p>
        </form>
      </div>
    );
  }
}

SettingsProfil.propTypes = {
  userAuth: PropTypes.object.isRequired,
  uploadAvatarUserAction: PropTypes.func,
  avatarUploadModalIsOpenAction: PropTypes.func,
  avatarUploadModalIsOpenState: PropTypes.bool,
  avatarUploadImagePreviewAction: PropTypes.func,
  avatarUploadImagePreviewState: PropTypes.object
};

function mapStateToProps(state) {
  return {
    userAuth: state.userAuth,
    avatarUploadModalIsOpenState: state.userAuth.avatarUploadModalIsOpenState,
    avatarUploadImagePreviewState: state.userAuth.avatarUploadImagePreviewState
  };
}


export default connect(mapStateToProps, {uploadAvatarUserAction, avatarUploadModalIsOpenAction, avatarUploadImagePreviewAction})(SettingsProfil);
