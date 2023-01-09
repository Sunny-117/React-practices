import React, { Component } from "react";

export default class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
    };
  }
  render() {
    return (
      <div>
        <input
          style={styles.input}
          value={this.state.value}
          onChange={this.changeValue.bind(this)}
          onKeyUp={this.addList.bind(this)}
        />
      </div>
    );
  }

  changeValue(e) {
    // 实时同步数据
    this.setState({
      value: e.target.value,
    });
  }

  addList(e) {
    const value = this.state.value;
    if (e.keyCode === 13 && value.trim()) {
      // 清空数据
      this.setState({ value: "" });
      // 提交
      this.props.submitFn(value);
    }
  }
}

const styles = {
  input: {
    display: "block",
    width: "200px",
    height: "40px",
    margin: "0 auto",
    fontSize: "35px",
    border: "2px solid #000",
  },
};
