import React, { Component } from "react";

type Props = {};

type State = {};

export default class ErrorBoundary extends Component<Props, State> {
  state = { error: null };
  static getDerivedStateFromError(error: any) {
    return { error };
  }
  render() {
    if (this.state.error) {
      return <div>{this.state.error}</div>;
    }
    return this.props.children;
  }
}
