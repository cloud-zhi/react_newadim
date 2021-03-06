// 这个组价我写了，但是我没用

import React, { Component } from 'react'
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { reqLogin } from '../../api'

class NormalLoginForm extends Component{
    onFinish = async (values) => {  //得到输入框的值，在正确的情况下，使用async函数来处理发送数据
        const { username, password } = values;
            const response = await reqLogin(username, password)
            const result = response.data  //{status : 0,data : user}成功   {status : 1,msg : xxx}失败
            if(result.status===0){  //登陆成功
                //提示成功
                message.success('登陆成功');
                //跳转后台管理对象(登录成功后我不需要会退回来，所以这里必须用replace而不是push)
                console.log(this)
                this.props.history.replace('/')
            }else{ //登陆失败
                message.error(result.msg)
            }
    };
    render(){
        return (
            <Form name="normal_login" className="login-form"
                initialValues={{
                    remember: true,
                }}
                onFinish={this.onFinish}>
                <Form.Item
                    name="username"
                    rules={[  //模板所提供的的自定义验证
                        { brequired: true, message: 'Please input your Username！', },
                        { min: 4, message: '用户名至少4位!' },
                        { max: 12, message: '用户名至多12位!' },
                        { pattern: /^\w+$/, message: '用户名必须由英文、数字或是下划线组成!' },
                        { whitespace: true, message: '用户名不允许有空格' }
                    ]}
                    initialValue='admin'  //初始值，默认值
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        { required: true, message: '请输入正确的密码!' },
                        { min: 4, message: '密码至少4位!' },
                        { max: 12, message: '密码至多12位!' },
                        { whitespace: true, message: '密码不允许有空格' },
                        // { validator :(rule, value) => {
                        //     let reg = new RegExp(/^\w+$/);
                        //     if(reg.test(value)) {
                        //         return Promise.reject('密码必须由英文、数字或是下划线组成!');
                        //     } else {
                        //         return Promise.resolve();
                        //     }
                        //     }
                        // }
                    ]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="密码"
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        登陆
                </Button>
                </Form.Item>
            </Form>
        );
    }
}
// const NormalLoginForm = () => {

// };

export default NormalLoginForm

/*
async和await
1、作用
   简化promise对象的使用：不能在使用then()来指定成功/失败的回调函数
   以同步编码（没有回调函数）方式实现异步流程
2、那里写await？
   在返回promise的表达式左侧写await：不想要promise，想要promise异步执行的value数据
3、哪里写async？
   await所在函数的（最近的）定义左侧
 */