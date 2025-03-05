import { useEffect, useRef, useState } from 'react';
import './BoxModel.css';

const StatBox = ({ textContent, className}) => {
    const componentRef = useRef(null);
    const [height, setHeight] = useState(0);
    const [width, setWidth] = useState(0);
    useEffect(() => {
        if (componentRef.current) {
            setHeight(componentRef.current.offsetHeight);
            setWidth(componentRef.current.offsetWidth);
        }
    }, []);

    return (
        <div
            ref={componentRef}
            className={className}
        >
            <div>
                <p>My height: {height}</p>
                <p>My width: {width}</p>
            </div>
            {textContent}
        </div>
    )
}

const BasicBox = ({textContent, isBorder=false}) => {
    const className = [isBorder && 'border-box'].filter(Boolean).join(' ');
    return (
        <StatBox textContent={textContent} className={className} />
    );
}

const ContentBox = () => (
    <BasicBox
        textContent={'With regards to size; I only care about my height and width'}
    />
);

const BorderBox = () => (
    <BasicBox
        textContent={'With regards to size; I care about height, width, padding, and border'}
        isBorder={true}
    />
);

const WithoutHeight = ({isPadded=false}) => {
    const className = [isPadded && 'base-padding'].filter(Boolean).join(' ');
    const textContent = 'This div has no height defined. The height is determined by the content.';
    return (
        <StatBox textContent={textContent} className={className} />
    );
}

const WithoutHeightWithPadding = () => <WithoutHeight isPadded={true} />;
const WithoutWidth = ({isPadded=false, isWidthLimited=false}) => {
    const className = [
        isPadded && 'base-padding',
        isWidthLimited && 'base-max-width'
    ].filter(Boolean).join(' ');
    const textContent = 'This div has no height defined. The height is determined by the content.';
    return (
        <StatBox textContent={textContent} className={className} />
    )
}

const WithoutWidthWithPadding = () => <WithoutWidth isPadded={true} />;
const WithoutWidthWithLimit = () => <WithoutWidth isPadded={true} isWidthLimited={true} />;
const BoxModel = () => {
    return (
        <div id='box-model'>
            <div>
                <h2>Content box</h2>
                <ContentBox />
            </div>
            <div>
                <h2>Border box</h2>
                <BorderBox />
            </div>
            <div>
                <h2>Without height and without padding</h2>
                <WithoutHeight />
            </div>
            <div>
                <h2>Without height but with padding</h2>
                <WithoutHeightWithPadding />
            </div>
            <div>
                <h2>Without width and without padding</h2>
                <WithoutHeightWithPadding />
            </div>
            <div>
                <h2>Without width but with padding</h2>
                <WithoutWidthWithPadding />
            </div>
            <div>
                <h2>Without width but with padding and width limit</h2>
                <WithoutWidthWithLimit />
            </div>
        </div>
    )
}

export default BoxModel;