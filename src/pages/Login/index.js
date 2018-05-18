import React, { Component } from 'react';
import { connect } from 'react-redux';
import login from '@/store/action/login'
import { bindActionCreators } from 'redux';
import "./index.less";
import { Form, Icon, Input, Button, Card, Row, Col, message } from 'antd';
import moment from "moment"
const FormItem = Form.Item;

let mapStateToProps = state =>({
    state : state.login
});

let mapDispatchToProps = dispatch =>({
    action : bindActionCreators(login, dispatch)
});

@connect(mapStateToProps, mapDispatchToProps)
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            weather:''
        };
        this.logUp = this.logUp.bind(this);
    }
    componentWillMount() {

    }

    componentDidMount() {

    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                let res = await this.$api.login(values);
                if(res.code==='200110') {
                    message.success('登录成功！');
                    localStorage.setItem('token',res.data.token);
                    localStorage.setItem('timeout',new Date(moment().add(1, 'days')));
                    this.props.history.push('/');
                }
                if(res.code!=='200110') {
                    message.error('用户密码有问题！'+res.msg, 7);
                    localStorage.clear();
                }
            }
        });
    };

    logUp() {

    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className='bg'>
                <Card className='login-card'>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <FormItem>
                            {getFieldDecorator('user', {
                                rules: [{ required: true, message: 'Please input your username!' }],
                            })(
                                <Input className='login-input' prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('pass', {
                                rules: [{ required: true, message: 'Please input your Password!' }],
                            })(
                                <Input className='login-input' prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                            )}
                        </FormItem>
                        <FormItem>
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Button type="primary" htmlType="submit" className="login-form-button">
                                        Log in
                                    </Button>
                                </Col>
                                <Col span={12}>
                                    <Button type="primary" onClick={this.logUp} className="login-form-button button-danger">
                                        Log up
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