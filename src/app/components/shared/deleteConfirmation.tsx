import { Form, Formik } from "formik";
import Modal from "./modal";
import { FiAlertOctagon } from "react-icons/fi";
import Spinner from "./Spinner";

interface Props {
  header: string;
  description: string;
  trueHandler: () => void;
  cancelHandler: () => void;
}

export default function DeleteConfirmation({
  header,
  description,
  trueHandler,
  cancelHandler,
}: Props) {
  return (
    <Modal isOpen={true} setIsOpen={cancelHandler} title={header}>
      <>
        <div className="flex gap-2 items-center justify-between mr-3">
          <p className="text-2xl mx-2">{description}</p>
          <FiAlertOctagon size={48} className=" text-red-600" />
        </div>
        <div>
          <Formik initialValues={{}} onSubmit={trueHandler}>
            {({ isSubmitting }) => (
              <Form className="container mx-10 py-8">
                <div className="flex items-center justify-start gap-2">
                  <button
                    className="px-6 py-2 rounded-md shadow-md bg-red-600 text-white font-bold "
                    type="submit"
                  >
                    {isSubmitting && <Spinner />}
                    Delete
                  </button>
                  <button
                    onClick={cancelHandler}
                    className="px-6 py-2 rounded-md shadow-md bg-gray-300 font-semibold"
                    type="button"
                  >
                    Cancel
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </>
    </Modal>
  );
}
