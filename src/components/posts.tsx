import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// Define the API endpoint
const API_URL = 'https://jsonplaceholder.typicode.com/posts';

// Fetcher function
const fetchPosts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const Posts = () => {
  // Use the `useQuery` hook
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ['posts'], // Unique key for caching
    queryFn: fetchPosts, // Fetcher function
  });

  // Handle loading and error states
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  // Render the data
  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {data.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Posts;
