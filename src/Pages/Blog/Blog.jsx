import React from 'react';
import ReviewSection from '../Home/Review/ReviewSection';

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: 'Top 5 Smartphones of 2025',
      excerpt: 'Discover the latest and greatest smartphones of 2025 that are leading the tech world.',
      image: 'https://www.techadvisor.com/wp-content/uploads/2025/06/best-phones-2.jpg?resize=1536%2C864&quality=50&strip=all',
      date: 'June 20, 2025',
    },
    {
      id: 2,
      title: 'How to Choose the Perfect Mobile for Gaming',
      excerpt: 'Explore the features you need to consider for an optimal gaming experience on mobile.',
      image: 'https://images.unsplash.com/photo-1626686707291-7bda5c45e8a8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Z2FtaW5nJTIwcGhvbmV8ZW58MHx8MHx8fDA%3D',
      date: 'June 15, 2025',
    },
    {
      id: 3,
      title: 'Budget-Friendly Smartphones with High-End Features',
      excerpt: 'Check out these affordable smartphones that pack premium features.',
      image: 'https://i.pcmag.com/imagery/articles/075j8T9Uo1ZNK9WmpHXgbAN-17.fit_lim.size_1600x900.v1569488258.jpg',
      date: 'June 10, 2025',
    },
  ];

  return (
    <div className="bg-gray-50 ">
      {/* Header */}
      <header className="bg-blue-600 text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold">Resell Mobile Store Blog</h1>
          <p className="mt-2">Stay updated with the latest news and insights from the mobile world.</p>
        </div>
      </header>

      {/* Blog Posts */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <div key={post.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="text-lg font-bold text-gray-800 hover:text-blue-600 transition">
                  {post.title}
                </h2>
                <p className="text-gray-600 mt-2 text-sm">{post.excerpt}</p>
                <p className="text-gray-400 text-xs mt-4">{post.date}</p>
              </div>
            </div>
          ))}
        </div>
      </main>

     <ReviewSection></ReviewSection>
    </div>
  );
};

export default Blog;
