import React, { useState } from "react";
import { useErrorContext } from "../../contexts/ErrorProvider";
import 'react-responsive-modal/styles.css';
import { Modal } from "react-responsive-modal";

function Error() {
  const { error } = useErrorContext();
  const [open, setOpen] = useState(true)

  const onCloseModal = () => setOpen(false);
  return (
    <>
      {error?.message ? (
        <Modal open={open} center onClose={onCloseModal}>
          <p className="text-2xl font-bold text-slate-500 py-10">{error.message}</p>
        </Modal>
      ) : (
        ""
      )}
    </>
  );
}

export default Error;
