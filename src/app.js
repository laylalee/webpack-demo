import React from "react";
import ReactDOM from "react-dom";
import "./css/common.css";

const app = document.querySelector('#app');

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
                        选择你喜欢ds的w: <select name="selectVal" value={this.state.selectVal} onChange={this.handleChange}>
                            <option value="grapefruit">Grapefruit</option>
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

class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (<div className="container">
            <section className="jumbotron">
                <h3>表单</h3>
                <NameForm />
            </section>
        </div>)
    }
}

const renderDom = () => {
    ReactDOM.render(<App />, app)
}
renderDom();
if (module.hot) {
    module.hot.accept([], () => {
        renderDom()
    });
}