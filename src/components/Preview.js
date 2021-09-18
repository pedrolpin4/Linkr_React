import styled from 'styled-components';

export default function Preview({ title, description, link, img }) {
    return (
        <PreviewContainer href={link} target="_blank">
            <LeftSection>
                <h1>{title}</h1>
                <p>{description}</p>
                <p className="link" href={link}>{link}</p>
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
    z-index: 10;
    overflow: hidden;

    @media screen and (max-width: 600px) {
        height: 115px;
    }

`

const LeftSection = styled.div`
    width: calc(100% - 155px);
    font-family: 'Lato', sans-serif;
    color: #CECECE;
    padding: 10px;

    h1 {
        font-size: 16px;
        margin: 10px 0px 20px 0px;
        word-wrap: break-word;
        max-height: 32px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    p {
        font-size: 11px;
        margin-bottom: 10px;
        word-wrap: break-word;
        color: #9B9595;
        height: 55px;

        @media screen and (max-width: 600px) {
            height: 35px;
            margin-bottom: 5px;
            overflow: hidden;
        }
    }

    .link {
        font-size: 11px;
        text-decoration: none;
        color: #fff;
        border: none;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin-bottom: 0;
        line-height: 20px;
    }

    @media screen and (max-width: 600px) {
        margin-left: 5px;
        width: calc(100% - 95px);
        padding: 5px;
    }
`

const RightSection = styled.div`
    width: 155px;
    height: inherit;
    border-radius: 0px 10px 10px 0px;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    background-image: url(${props => props.img});
    z-index: 5;

    @media screen and (max-width: 600px) {
        width: 95px;
  }
`