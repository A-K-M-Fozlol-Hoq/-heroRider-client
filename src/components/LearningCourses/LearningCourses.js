import React from 'react';
import car from './images/car.png';
import bike from './images/bike.jpg';
import { Link } from 'react-router-dom';
const LearningCourses = () => {
    return (
        <div className="container">
            <div className="row m-5 ">
                <div className="col-md-5 p-5 rounded bg-primary">
                    <p className='text-center bg-info text-white p-2 rounded'>Learn how to drive a car</p>
                    <img style={{width:'100%', height:'250px', borderRadius:'10px'}} src={car} alt="" />
                    <div className="btn btn-secondary w-100 mt-2">$200</div>
                    <Link to='/checkout/car' className='text-white btn btn-secondary w-100 mt-2'>Continue to Cart</Link>
                </div>
                <div className="col-md-2"></div>
                <div className="col-md-5 p-5 rounded bg-primary">
                    <p className='text-center bg-info text-white p-2 rounded'>Learn how to drive a bike</p>
                    <img style={{width:'100%', height:'250px', borderRadius:'10px'}} src={bike} alt="" />
                    <div className="btn btn-secondary w-100 mt-2">$100</div>
                    <Link to='/checkout/bike' className='text-white btn btn-secondary w-100 mt-2'>Continue to Cart</Link>
                </div>
            </div>
        </div>
    );
};

export default LearningCourses;