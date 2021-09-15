import styled from 'styled-components';

export default function Preview({ title, description, link, img }) {
    return (
        <PreviewContainer>
            <LeftSection>
                <h1>{title}</h1>
                <p>{description}</p>
                <a href={link}>{link}</a>
            </LeftSection>

            <RightSection img={img}/>
        </PreviewContainer>
    )
}

const PreviewContainer = styled.a`
    text-decoration: none;
    background-color: inherit;
    border: 1px solid #6e6e6e;
    display: flex;
    justify-content: space-between;
    border-radius: 10px;
    height: 155px;
`

const LeftSection = styled.div`
    width: calc(100% - 155px);
    font-family: 'Lato', sans-serif;
    color: #CECECE;
    padding: 10px;

    h1 {
        font-size: 16px;
    }

    p {
        font-size: 11px;
    }

    a {
        font-size: 11px;
        text-decoration: none;
        color: #fff;
        border: none;
    }
`

const RightSection = styled.div`
    width: 155px;
    height: inherit;
    border-radius: 0px 10px 10px 0px;
    background-size: contain;
    background-image: url(${props => props.img});
`