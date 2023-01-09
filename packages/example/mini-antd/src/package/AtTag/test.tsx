import AtTag from ".";

const log = (e: any) => {
    console.log(e);
};

const preventDefault = (e: any) => {
    e.preventDefault();
    console.log('Clicked! But prevent default.');
};

const Test = () => (
    <>
        <AtTag>Tag 1</AtTag>
        <AtTag>
            <a href="https://github.com/ant-design/ant-design/issues/1862">Link</a>
        </AtTag>
        <AtTag closable onClose={log}>
            AtTag 2
        </AtTag>
        <AtTag closable onClose={preventDefault}>
            Prevent Default
        </AtTag>

        <button onClick={() => {

        }}>+</button>
    </>
);

export default Test;