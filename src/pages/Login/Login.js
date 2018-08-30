import React, { Component } from 'react';
import { connect } from 'react-redux';
import { action as user } from '@/store/user'
import { bindActionCreators } from 'redux';
import "./Login.less";
import { Form, Icon, Input, Button, Card, Row, Col, message } from 'antd';
import * as langLib from '../../widget/language'
const FormItem = Form.Item;

let mapStateToProps = state =>({
    user: state.user,
});

let mapDispatchToProps = dispatch => bindActionCreators({
    ...user
}, dispatch);

@connect(mapStateToProps, mapDispatchToProps)
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            weather:'',
            pending: false
        };
    }

    componentWillReceiveProps(nextProps) {

    }

    componentDidMount() {

    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                const {lang} = this.props.user;
                this.setState({pending: true})
                const res = await this.$api.login(values);
                this.setState({pending: false})
                if (res.code === 0) {
                    message.success(langLib[lang].login.login_ok);
                    localStorage.setItem('token',res.data.token);
                    // localStorage.setItem('timeout',new Date(moment().add(1, 'days')));
                    res.data.isLogin = true
                    this.props.setUser(res.data)
                    this.props.history.push('/');
                }
                if(res.code === 400111) {
                    message.warn(langLib[lang].login.login_user_err);
                }
                if(res.code === 400112) {
                    message.error(langLib[lang].login.login_pass_err);
                }
                if(res.code === -1) {
                    message.error(res.msg);
                }
            }
        });
    };

    logUp = () => {

    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { pending } = this.state;
        const { lang } = this.props.user;
        return (
            <div className='bg'>
                <Card className='login-card'>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <FormItem>
                            {getFieldDecorator('user', {
                                rules: [{ required: true, message: langLib[lang].login.user_tips }],
                            })(
                                <Input className='login-input' prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} 
                                placeholder={langLib[lang].login.user_placeholder} />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('pass', {
                                rules: [{ required: true, message: langLib[lang].login.pass_tips }],
                            })(
                                <Input className='login-input' prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} 
                                type="password" placeholder={langLib[lang].login.pass_placeholder} />
                            )}
                        </FormItem>
                        <FormItem>
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Button type="primary" htmlType="submit" className="login-form-button" loading={pending}>
                                        {langLib[lang].login.sign_in}
                                    </Button>
                                </Col>
                                <Col span={12}>
                                    <Button onClick={this.logUp} className="login-form-button">
                                        {langLib[lang].login.sign_up}
                                    </Button>
                                </Col>
                            </Row>
                        </FormItem>
                    </Form>
                </Card>
            </div>
        );
    }
}

export default Form.create()(Login);