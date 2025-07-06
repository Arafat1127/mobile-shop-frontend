import React from 'react';


const ReviewCard = ({ review }) => {
  return (
    <div className="bg-secondary shadow-lg rounded-2xl p-4 flex flex-col items-center space-y-4">
      <img
        className="w-20 h-20 rounded-full border-2 object-cover border-blue-500"
        src={review.image}
        alt={review.name}
      />
      <h3 className="text-lg font-semibold text-gray-800">{review.name}</h3>
      <p className="text-sm text-gray-600 text-center">{review.review}</p>
      <div className="flex space-x-1">
        {[...Array(review.rating)].map((_, i) => (
          <span key={i} className="text-yellow-400 text-lg">★</span>
        ))}
        {[...Array(5 - review.rating)].map((_, i) => (
          <span key={i} className="text-gray-300 text-lg">★</span>
        ))}
      </div>
    </div>
  );
};
export default ReviewCard;