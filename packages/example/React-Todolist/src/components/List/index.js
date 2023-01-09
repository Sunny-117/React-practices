import React, { Component } from "react";

export default class List extends Component {
  render() {
    const data = this.props.todos;
    console.log(data);
    return (
      <ul style={styles.ul}>
        {data.map((item, index) => {
          return (
            <li
              style={styles.li}
              onClick={this.deleteHandler.bind(this, index)}
              key={index}
            >
              {index + 1} : {item}
            </li>
          );
        })}
      </ul>
    );
  }

  deleteHandler(index) {
    this.props.deleteFn(index);
  }
}

const styles = {
  ul: {
    marginTop: "10px",
    fontSize: "20px",
    lineHeight: "30px",
  },
  li: {
    textIndent: "20px",
    listStyle: "none",
  },
};
