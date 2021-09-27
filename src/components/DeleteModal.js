export default function DeleteModal ({showModal, showModal, setShowModal, setShowModal, closeModal}){
    {showModal ? (
        <>
          <ModalBackground
            ref={modalRef}
            onClick={closeModal}
            theme={theme}
          ></ModalBackground>
          <Modal theme={theme}>
            <TopSection theme={theme}>
              <h2>{username}’s location</h2>
              <p onClick={() => setShowModal(false)}>X</p>
            </TopSection>
          </Modal>
        </>
      ) : (
        ""
      )}
}

const Modal = styled.div`
  position: fixed;
  top: calc((100vh - 375px) / 2);
  left: calc((100vw - 790px) / 2);
  height: 375px;
  width: 790px;
  background-color: ${(props) => (props.theme === "light" ? "#e2e2e2" : "#333333")};
  opacity: 1;
  z-index: 130;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 790px) {
    width: 100vw;
    height: auto;
    left: 0px;
    padding: 0 15px 20px;
  }
`;

const TopSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 36px 15px 40px;
  width: 100%;

  h2 {
    font-family: "Oswald", sans-serif;
    font-weight: bold;
    font-size: 38px;
    line-height: 56px;
    color: ${(props) => (props.theme === "light" ? "#2a2a2a" : "#ffffff")};
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin: 0 5px 0 0;
  }

  p {
    font-size: 19.74px;
    color: ${(props) => (props.theme === "light" ? "#2a2a2a" : "#ffffff")};
    cursor: pointer;
  }

  @media (max-width: 790px) {
    padding: 10px 0;

    h2 {
      font-size: 22px;
      line-height: 28px;
    }
  } ;
`;

const ModalBackground = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0px;
  right: 0px;
  background-color: ${props => props.theme === "light" ? "rgba(0,0,0, 0.6)" : "rgba(255,255,255, 0.6)"};
  z-index: 120;
`;