import NotFoundPage from '../assets/img/not-found-pizza.jpg';

const NotFound = () => {
  return (
    <div className='d-flex flex-column align-items-center' style={{backgroundColor:'#131e3a'}}>
        <img
              alt=""
              src={ NotFoundPage }
              width="950"
              height="600"
              className="align-top"
            />
    </div>
  )
}

export default NotFound