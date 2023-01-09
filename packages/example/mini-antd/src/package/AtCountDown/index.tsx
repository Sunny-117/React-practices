import { useState, useEffect, useRef } from 'react';

export const CountDown = (props: any) => {
    const { countDown } = props;
    const cd = useRef<number>(countDown);
    const timer = useRef<any>(null);

    const [time, setTime] = useState<string>('');

    const dealData = () => {
        if (cd.current <= 0) {
            setTime('');
            return timer.current && clearTimeout(timer.current);
        }
        const d = parseInt(cd.current / (24 * 60 * 60) + '');
        const h = parseInt(((cd.current / (60 * 60)) % 24) + '');
        const m = parseInt(((cd.current / 60) % 60) + '');
        const s = parseInt((cd.current % 60) + '');
        setTime(`倒计时: ${d}天${h}时${m}分${s}秒`);
        cd.current--;
        timer.current = setTimeout(() => {
            dealData();
        }, 1000);
    };

    useEffect((): any => {
        dealData();
        return () => {
            timer.current && clearTimeout(timer.current);
        }
    }, []);

    return <div >{time}</div>;
};
