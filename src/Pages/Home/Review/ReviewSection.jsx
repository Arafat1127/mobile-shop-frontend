import ReviewCard from "./ReviewCard";

const reviews = [
  {
    id: 1,
    name: "Kh.Arafat",
    image: "https://img.freepik.com/premium-vector/businessman-flat-icon-man-business-suit-avatar-businessman-flat-internet-icon-rounded-shape-web-mobile-design-element-male-profile-vector-colored-illustration_263753-2878.jpg",
    review: "Excellent service! I got the latest model at the best price. Highly recommend this shop.",
    rating: 5,
  },
  {
    id: 2,
    name: "Kh.Arafat",
    image: "https://img.freepik.com/premium-vector/businessman-flat-icon-man-business-suit-avatar-businessman-flat-internet-icon-rounded-shape-web-mobile-design-element-male-profile-vector-colored-illustration_263753-2878.jpg",
    review: "Good quality and fast delivery. I'm satisfied with my purchase.",
    rating: 4,
  },
  {
    id: 3,
    name: "Kh.Refat",
    image: "https://img.freepik.com/premium-vector/businessman-flat-icon-man-business-suit-avatar-businessman-flat-internet-icon-rounded-shape-web-mobile-design-element-male-profile-vector-colored-illustration_263753-2878.jpg",
    review: "Affordable prices and friendly staff. Will shop here again!",
    rating: 5,
  },
  {
    id: 4,
    name: "Kh.Arafat",
    image: "https://img.freepik.com/premium-vector/businessman-flat-icon-man-business-suit-avatar-businessman-flat-internet-icon-rounded-shape-web-mobile-design-element-male-profile-vector-colored-illustration_263753-2878.jpg",
    review: "Wide variety of choices and great deals. The website is easy to use too.",
    rating: 4,
  },
];

const ReviewSection = () => {
  return (
    <section className="bg-gray-50 py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          What Our Customers Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewSection;