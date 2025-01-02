"use client"
import Image from "next/image";
import React, { useState } from "react";
import ReactDOM from "react-dom";

let openModalFn;
let closeModalFn; 

const ModalManager = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const openModal = (content) => {
    setModalContent(content);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setModalContent(null);
  };

  openModalFn = openModal;
  closeModalFn = closeModal;

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center "
      onClick={closeModal}
    >
      <div
        className="w-fit"
        onClick={(e) => e.stopPropagation()} 
          >
              <Image alt="" width={1024} height={1024} src={modalContent} className="max-h-screen object-contain"/>
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 text-white bg-black rounded-full p-2"
        >
          ✕
        </button>
      </div>
    </div>,
    document.body
  );
};

export const openModal = (content) => {
    console.log(content)
  if (openModalFn) openModalFn(content);
};

export const closeModal = () => {
  if (closeModalFn) closeModalFn();
};

export default ModalManager;
