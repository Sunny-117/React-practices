import AtSteps from ".";

const { AtStep } = AtSteps;
const Test = () => {
    return (
        <div>
            <AtSteps current={0}>
                <AtStep title="Finished" description='asmdalms' />
                <AtStep title="Finished" description='asmdalms' />
                <AtStep title="Finished" description='asmdalms' />
            </AtSteps>
        </div>
    );
};

export default Test;
