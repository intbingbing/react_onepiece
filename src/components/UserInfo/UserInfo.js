import React, { Component } from 'react';
import "./UserInfo.less";
import { Avatar, Upload, Modal, message, Button, Slider, Icon } from 'antd';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { action as user } from '@/store/user'
import AvatarEdit from 'react-avatar-editor'
import * as url from '@/api/url'
import lrz from 'lrz'
import { resolve } from 'uri-js';

let mapStateToProps = state =>({
    user: state.user
});

let mapDispatchToProps = dispatch => bindActionCreators({
    ...user
}, dispatch);

@connect(mapStateToProps, mapDispatchToProps)
export default class UserInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
            modal: {
                visible: false,
                loading: false
            },
            scale: 1,
            preview: null,
            pending: false
        }
    }

    componentWillMount() {

    }

    componentDidMount() {

    }

    uploadedImg = res => {
        console.log(res)
    }

    handleChange = res => {
        console.log(res)
    }

    handleOk = e => {
        console.log(e)
        this.setState({ 
            modal: {
                visible: false
            }
        })
    }

    handleSave = async () => {
        const _this = this
        this.setState({pending: true})
        const img = this.editor.getImageScaledToCanvas().toDataURL()
        //const rect = this.editor.getCroppingRect()
        lrz(img, {quality:1}).then(res => _this.$api.uploadAvatar({formData: res.formData}))
        .then(res => {
            if (res.code === 0) {
                _this.props.setUser({avatar: res.data.url})
                message.success('上传成功')
            } else {
                message.error(res)
            }
            _this.setState({ 
                modal: {
                    visible: false
                },
                pending: false
            })
        })
        .catch(err => {
            message.error(err)
        })
    }

    handleCancel = e => {
        console.log(e)
        this.setState({ 
            modal: {
                visible: false
            }
        })
    }

    onSliderChange = value => {
        this.setState({scale: value})
    }

    setEditorRef = editor => {
        if (editor) this.editor = editor
    }

    render() {
        const { user } = this.props
        const { file, scale, pending } = this.state
        const { visible, loading } = this.state.modal
        const _this = this
        const prop = {
            name: 'avatar',
            accept: 'image/*',
            //action: `${url.base}${url.ping}`,
            showUploadList: false,
            customRequest: info => {
                const file = info.file
                this.setState({
                    file, 
                    modal: {
                        visible: true
                    }
                })
            },
            // onChange(info) {
            //     const type = info.file.originFileObj.type
            //     const file = info.file.originFileObj
            //     if (info.file.status === 'done') {
            //         console.log('done',info)
            //         _this.setState({
            //             file, 
            //             modal: {
            //                 visible: true
            //             }})
            //     } else if (info.file.status === 'error') {
            //         console.log('error',info)
            //     }
            //     if(type.substr(0, 4) === 'image') {
            //         message.error(`【${type}】 file upload failed.`);
            //     }
            // }
        };

        return (
            <div className='user-info'>
                <div className='cover' style={{backgroundImage: `url(${user.cover})`}}></div>
                <div className='body'>
                    <Upload {...prop}>
                        <Avatar shape = 'square' src={user.avatar} style={{color: '#f56a00', backgroundColor: '#fde3cf', cursor: 'pointer', border: '4px solid #fff'}}>
                            {user.avatar.length === 0 && user.name[0]}
                        </Avatar>
                    </Upload>
                    <Modal visible={visible}
                        onOk={this.handleOk}
                        confirmLoading={loading}
                        onCancel={this.handleCancel}
                        centered={true}
                        footer={null}
                        closable={false}
                        bodyStyle={{textAlign: 'center'}}
                        wrapClassName='avatar-edit-modal'>
                        <div style={{
                            textAlign: 'center',
                            marginTop: 16}}>
                            <h1>编辑头像</h1>
                            <span>调整头像尺寸和位置</span>
                        </div>
                        <div style={{
                            margin: '24px 0'}}>
                            <AvatarEdit image={file}
                                width={160}
                                height={160}
                                border={40}
                                color={[255, 255, 255, 0.6]} // RGBA
                                scale={scale}
                                rotate={0}
                                ref={this.setEditorRef}/>
                            <Slider defaultValue={1} min={1} max={2} step={0.01}
                                onChange={this.onSliderChange}
                                type="range"/>
                        </div>
                        <Button type="primary" onClick={this.handleSave} loading={pending}>保存</Button>
                    </Modal>
                </div>
            </div>
        );
    }
}