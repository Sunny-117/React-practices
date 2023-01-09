import React from 'react';
import './index.css'
interface IAtStepProps {
    title: string;
    description: string;
    currentFromFather?: number;
    j?: number
}
const AtStep = ({ title, description, currentFromFather, j }: IAtStepProps) => {
    console.log(currentFromFather)
    return <div className="first">
        {currentFromFather !== undefined && j !== undefined && <div className={j <= currentFromFather ? 'active left' : 'left'}></div>}
        <div className="right">
            <div className="title">{title}</div>
            <div className="des">{description}</div>
        </div>
    </div>
}
const AtSteps = ({ children, current }: any) => {
    return (
        <div className="all">
            {children.map((item: any, j: any) => React.cloneElement(item, { currentFromFather: current, j }))}
        </div>
    );
};

AtSteps.AtStep = AtStep;

export default AtSteps;
