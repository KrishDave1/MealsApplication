import { useGlobalContext } from '../context'
import { BsHandThumbsUp } from 'react-icons/bs'

const Meals = () => {
  const { meals, loading, selectMeal, addToFavorites } = useGlobalContext();

  if (loading) {
    return <section className='section-loading'>
      <h4>Loading...</h4>
    </section>
  }

  if (meals.length == 0) {
    return <section className="section-loading">
      <h4>No meals matched your search.Try again</h4>
    </section>
  }
  return <section className='section-center'>
    {meals.map((singleMeal) => {
      const { idMeal, strMeal: title, strMealThumb: image } = singleMeal
      //Here in above line we are just giving alias to the big names.
      return <article key={idMeal} className='single-meal' >
        <img src={image} className='img' onClick={() => selectMeal(idMeal)} />
        {/* Here in onClick attribute why use arrow function?Simply bcoz if we directly write 'selectMeal(idMeal)' then it will be invoked without even clicking as the page loads up.*/}
        <footer>
          <h5>{title}</h5>
          <button className='like-btn' onClick={() => addToFavorites(idMeal)}><BsHandThumbsUp /></button>
        </footer>
      </article>
    })}
  </section>
}

export default Meals;