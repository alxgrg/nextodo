import { createContext, useState, useEffect } from 'react';

const ModalContext = createContext({
  modal: null,
  showModal: function () {},
  hideModal: function () {},
});

export function ModalContextProvider(props) {
  const [activeModal, setActiveModal] = useState();

  function showModalHandler(id = 'default') {
    setActiveModal({ id: id });
    document.body.style.overflow = 'hidden';
  }

  function hideModalHandler() {
    setActiveModal(null);
    document.body.removeAttribute('style');
  }

  const context = {
    modal: activeModal,
    showModal: showModalHandler,
    hideModal: hideModalHandler,
  };

  return (
    <ModalContext.Provider value={context}>
      {props.children}
    </ModalContext.Provider>
  );
}

export default ModalContext;
