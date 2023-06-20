import React from "react";
import { useModal } from "../../context/Modal";

function OpenModalButton({
    modalComponent, // component to render inside the modal
    buttonText, // text of the button that opens the modal
    onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
    onModalClose, // optional: callback function that will be called once the modal is closed
    className,
    isIcon
}) {
    const { setModalContent, setOnModalClose } = useModal();

    const onClick = () => {
        if (typeof onButtonClick === "function") onButtonClick();
        if (typeof onModalClose === "function") setOnModalClose(onModalClose);
        setModalContent(modalComponent);
    };

    if (isIcon)
        return <i className={className} onClick={onClick}>{buttonText}</i>;

    return <button className={className || "log-link join-bttn"} onClick={onClick}>{buttonText}</button>;
}

export default OpenModalButton;
