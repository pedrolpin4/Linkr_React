import styled from 'styled-components';
import { CgSpinner } from 'react-icons/cg';
import { useContext } from 'react/cjs/react.development';

export default function Loading({ spinnerSize,
                                  message,
                                  color     }) {
    return (
        <LoadingContainer>
            <CgSpinner color={color ? color : "#ffffff"} 
                       size={spinnerSize} 
                       className="spinner"/>
            <Text color={color}>{
                message
                 ? message
                 : ""    
            }</Text>
        </LoadingContainer>
    )
}

const LoadingContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .spinner {
        animation: rotate 1s linear infinite;
    }

    @keyframes rotate {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
`

const Text = styled.p`
    font-family: 'Oswald', sans-serif;
    color: ${props => props.color ? props.color : "#fff"};
`