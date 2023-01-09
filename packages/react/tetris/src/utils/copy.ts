const copy = (text: string, callback: Function) => {
    window.navigator.clipboard.writeText(text).then(res => callback(res))
}
export default copy;