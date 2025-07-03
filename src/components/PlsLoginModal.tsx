import '../styles/PlsLoginModal.css';

type PlsLoginModalProps = {
  modal : string;
  onClose: () => void;
};

export default function PlsLoginModal({ onClose, modal}: PlsLoginModalProps) {
  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2>Please Login To see {modal} </h2>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
