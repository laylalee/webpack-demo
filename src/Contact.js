import React, { Component } from "react";
class NameForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { inputVal: '', selectVal: '' };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.type === 'select' ? target.select : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });

    }


    handleSubmit(event) {
        alert('提交的数据: ' + this.state.inputVal + this.state.selectVal);
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <section>
                    <label>
                        姓名:<textarea name='inputVal' value={this.state.inputVal} onChange={this.handleChange} />
                    </label>
                </section>
                <section>
                    <label>
                        国籍: <select name="selectVal" value={this.state.selectVal} onChange={this.handleChange}>
                            <option value="grapefruit">zh</option>
                            <option value="lime">Lime</option>
                            <option value="coconut">Coconut</option>
                            <option value="mango">Mango</option>
                        </select>
                    </label>
                </section>

                <input type="submit" value="确定" />
            </form>
        );
    }
}

export default class Contact extends Component {
    render() {
        return (<section className="container jumbotron">
                <h3>联系：</h3>
                <NameForm />
            </section>);
    }
}