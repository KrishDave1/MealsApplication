import { useGlobalContext } from "../context";

const Modal = () => {
  const { selectedMeal, closeModal } = useGlobalContext()

  const { strMealThumb: image, strMeal: title, strInstructions: text, strSource: source } = selectedMeal
  //This is the way of destructing properties from an object.If we do not do this we can alternatively write selectedMeal.strMeal , selectedMeal.strSource ,..etc.

  return (
    <aside className="modal-overlay">
      <div className="modal-container">
        <img src={image} className="img modal-img" alt={title} />
        <div className="modal-content">
          <h4>{title}</h4>
          <p>Cooking Instruction</p>
          <p>{text}</p>
          <a href={source} target="_blank">Original Source</a>
          <button onClick={closeModal} className="btn btn-hipster close-btn">Close</button>
        </div>
      </div>
    </aside>
  )
}

export default Modal;