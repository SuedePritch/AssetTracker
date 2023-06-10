import React from 'react'
import styled from 'styled-components'

function Button({ text, size, onClick }) {
    const renderButton = () => {
        switch (size) {
            case 'large':
                return <LargeButton onClick={onClick}>{text}</LargeButton>;
            case 'medium':
                return <MediumButton onClick={onClick}>{text}</MediumButton>;
            case 'small':
                return <SmallButton onClick={onClick}>{text}</SmallButton>;
            default:
                return <MediumButton onClick={onClick}>{text}</MediumButton>;
        }
    };

    return renderButton();
}
export default Button

const LargeButton = styled.button`
padding: 0.5rem 1.5rem;
margin: 0.5rem;
font-size: 1.5rem;
border-radius: 6px;
background-color: var(--clr-accent-700);
color: var(--clr-primary-100);
border: none;
`
const MediumButton = styled.button`
padding: 0.25rem 0.75rem;
margin: 0.5rem;
font-size: 1rem;
border-radius: 3px;
background-color: var(--clr-accent-700);
color: var(--clr-primary-100);
border: none;
`
const SmallButton = styled.button`
padding: 0.25rem 0.5rem;
margin: 0.25rem;
font-size: 0.75rem;
border-radius: 3px;
background-color: var(--clr-accent-700);
color: var(--clr-primary-100);
border: none;
`