import React, { Component } from "react";


export default class Courses extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            message: ''
        }
    }
    getCourses() {
        fetch('/mock/5af58399b758743d3788f8bb/courses/', {
            method: 'GET'
        }).then((res) => {
            if (res.ok && res.status === 200) {
                res.json()
                    .then((datas) => {
                        this.setState({
                            message: JSON.stringify(datas.data)
                        });
                    });
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    render() {
        this.getCourses() ;
        return (
            <div className="list">
            <h3>数据列表</h3>
            <div>
                <div>{this.state.message}</div>
            </div>
        </div>
        );
    }
}