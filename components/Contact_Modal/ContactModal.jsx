import Modal from "react-bootstrap/Modal";

function ContactModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="contactModal"
    >
      <Modal.Header >
        <Modal.Title id="contained-modal-title-vcenter">Contact Us</Modal.Title>
        <button type="button" className="btn-close cross-button" aria-label="Close" onClick={props.onHide}>X</button>
      </Modal.Header>
      <Modal.Body>
        <div className="container">
          <form >
            <div className="form-group mb-3">
              <label for="fullName">Full Name</label>
              <input
                type="text"
                className="form-control"
                id="fullName"
                placeholder="Enter your full name"
                required
              />
            </div>
            <div className="form-group mb-3">
              <label for="email">Email address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="form-group mb-3">
              <label for="message">Message</label>
              <textarea
                className="form-control"
                id="message"
                rows="5"
                placeholder="Enter your message"
                required
              ></textarea>
            </div>
            <br />
            <button type="submit" className="btn form-submit-button">
              Submit
            </button>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
}
export default ContactModal;
