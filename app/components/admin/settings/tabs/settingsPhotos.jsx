import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
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
    this.getAvatarById 			= this.getAvatarById.bind(this);
		this.numberTryingLoadImg = 0;
  }

  /**
	 * get the avatar by the id given by parameter
	 * @param {number} avatarId - the id of the avatar we want find
	 * @return {object} the avatar find in the list
	 * */
  getAvatarById(avatarId) {
		const { userAuth } = this.props;
		var avatarSelected;

		for (var i = 0; i < userAuth.userObj.avatarsSrc.length; i++) {
			var avatar = userAuth.userObj.avatarsSrc[i];
			if (parseInt(avatar.avatarId, 10) === avatarId) {
				avatarSelected = avatar;
				break;
			}
		}

		return avatarSelected;
	};

	/**
	 * To load the image immediately after the upload - because the resizer BE side is very long :
	 * @param {string} avatarIdParam - the id of the avatar we want find
	 * @return {void}
	 * */
	reloadImage(avatarIdParam) {
		const image = this.refs['avatar_' + avatarIdParam];
		const avatarId = parseInt(avatarIdParam, 10) || 0;
		var that = this;

		if (this.getAvatarById(avatarId) && this.getAvatarById(avatarId).mainProfil) {
			image.onerror = function () {
				that.numberTryingLoadImg++;
				if (that.numberTryingLoadImg < 10) {
					setTimeout(function () {
						image.src = `/uploads/${that.getAvatarById(avatarId).mainProfil}`;
					}, 1000);
				}
			};
		}
	};

	/* Upload - step 1 - open the modal with us image selected */
	dropHandler(avatarId) {
		const { avatarUploadImagePreviewAction, avatarUploadModalIsOpenAction } = this.props;
		function dropHandlerFile(file) {
			if (!file[0] || !file[0].preview) {
				return;
			}

			// send image in state for displaying in Cropper
			avatarUploadImagePreviewAction(avatarId, file[0].preview);

			// open modal :
			avatarUploadModalIsOpenAction(true);
		}

		return dropHandlerFile;
	};

  /* Upload - step 2 - close the modal and call the API */
  uploadAvatarAction() {
    const { userAuth, uploadAvatarUserAction, avatarUploadModalIsOpenAction, avatarUploadImagePreviewState } = this.props;
    const _id = userAuth.userObj._id;
		const that = this;

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
			var avatarId = avatarUploadImagePreviewState.nameField;
      let formData = new FormData();
      formData.append('formAvatar', blob, filename); // 'formAvatar' is used in routes.js

      // send image cropped to back-end :
      if (_id && formData && avatarId) {
        uploadAvatarUserAction(formData, {id: _id, avatarId: avatarId});
      }

			that.reloadImage(avatarId);
    });
  }

  handleClose() {
    const { avatarUploadModalIsOpenAction } = this.props;
    avatarUploadModalIsOpenAction(false);
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
						<div className={cx('dropzone-text')}><strong>Image 1</strong><br/></div>
						<Dropzone onDrop={this.dropHandler('0')} multiple={false} accept={'image/*'} className={cx('dropzone-input')} >
							<img src={this.getAvatarById(0) ? `/uploads/${this.getAvatarById(0).mainProfil}` : ''} alt="avatar" ref={'avatar_0'} />
						</Dropzone>
						<RaisedButton label="Mettre comme avatar de profil" className={cx('dropzone-button')} />
					</div>

					<div className={cx('dropzone-container')}>
						<div className={cx('dropzone-text')}><strong>Image 2</strong><br/></div>
						<Dropzone onDrop={this.dropHandler('1')} multiple={false} accept={'image/*'} className={cx('dropzone-input')} >
							<img src={this.getAvatarById(1) ? `/uploads/${this.getAvatarById(1).mainProfil}` : ''} alt="avatar" ref={'avatar_1'} />
						</Dropzone>
						<RaisedButton label="Mettre comme avatar de profil" className={cx('dropzone-button')} />
					</div>

					<div className={cx('dropzone-container')}>
						<div className={cx('dropzone-text')}><strong>Image 3</strong><br/></div>
						<Dropzone onDrop={this.dropHandler('2')} multiple={false} accept={'image/*'} className={cx('dropzone-input')} >
							<img src={this.getAvatarById(2) ? `/uploads/${this.getAvatarById(2).mainProfil}` : ''} alt="avatar" ref={'avatar_2'} />
						</Dropzone>
						<RaisedButton label="Mettre comme avatar de profil" className={cx('dropzone-button')} />
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
