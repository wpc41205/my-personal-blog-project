/**
 * API service for fetching blog data
 */
const API_BASE_URL = 'https://blog-post-project-api.vercel.app';

/**
 * Fetch all blog posts from API
 * @param {Object} options - Query options
 * @param {number} options.page - Page number (default: 1)
 * @param {number} options.limit - Posts per page (default: 6)
 * @param {string} options.category - Filter by category
 * @param {string} options.keyword - Search keyword
 * @returns {Promise<Array>} Array of blog posts
 */
export const fetchBlogPosts = async (options = {}) => {
  try {
    const { page = 1, limit = 6, category, keyword } = options;
    
    // Build query parameters
    const params = new URLSearchParams();
    params.append('page', page.toString());
    params.append('limit', limit.toString());
    
    if (category) {
      params.append('category', category);
    }
    
    if (keyword) {
      params.append('keyword', keyword);
    }
    
    const response = await fetch(`${API_BASE_URL}/posts?${params.toString()}`);
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    
    const data = await response.json();
    const posts = data.posts || data;
    
    // Replace "Thompson P." with "Pataveekorn C."
    const updatedPosts = posts.map(post => ({
      ...post,
      author: post.author === "Thompson P." ? "Pataveekorn C." : post.author
    }));
    
    // Return pagination response structure
    return {
      posts: updatedPosts,
      currentPage: data.currentPage || page,
      totalPages: data.totalPages || Math.ceil(updatedPosts.length / limit),
      totalPosts: data.totalPosts || updatedPosts.length
    };
  } catch (error) {
    console.error('Error fetching blog posts:', error.message);
    throw error;
  }
};

/**
 * Fetch blog posts by category
 * @param {string} category - Category to filter by
 * @param {number} page - Page number (default: 1)
 * @param {number} limit - Posts per page (default: 6)
 * @returns {Promise<Array>} Array of filtered blog posts
 */
export const fetchBlogPostsByCategory = async (category, page = 1, limit = 6) => {
  try {
    const response = await fetch(`${API_BASE_URL}/posts?category=${category}&page=${page}&limit=${limit}`);
    
    if (!response.ok) {
      console.warn(`API endpoint not available (${response.status}). Using mock data.`);
      const mockPosts = getMockBlogPosts();
      return category === 'highlight' 
        ? mockPosts 
        : mockPosts.filter(post => post.category.toLowerCase() === category.toLowerCase());
    }
    
    const data = await response.json();
    const posts = data.posts || data;
    
    // Replace "Thompson P." with "Pataveekorn C."
    const updatedPosts = posts.map(post => ({
      ...post,
      author: post.author === "Thompson P." ? "Pataveekorn C." : post.author
    }));
    
    return updatedPosts;
  } catch (error) {
    console.warn('API not available. Using mock data:', error.message);
    const mockPosts = getMockBlogPosts();
    return category === 'highlight' 
      ? mockPosts 
      : mockPosts.filter(post => post.category.toLowerCase() === category.toLowerCase());
  }
};

export const searchBlogPosts = async (query, page = 1, limit = 6) => {
  try {
    const response = await fetch(`${API_BASE_URL}/posts?keyword=${encodeURIComponent(query)}&page=${page}&limit=${limit}`);
    
    if (!response.ok) {
      console.warn(`API endpoint not available (${response.status}). Using mock data.`);
      const mockPosts = getMockBlogPosts();
      return mockPosts.filter(post => 
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.description.toLowerCase().includes(query.toLowerCase()) ||
        post.content.toLowerCase().includes(query.toLowerCase())
      );
    }
    
    const data = await response.json();
    const posts = data.posts || data;
    
    // Replace "Thompson P." with "Pataveekorn C."
    const updatedPosts = posts.map(post => ({
      ...post,
      author: post.author === "Thompson P." ? "Pataveekorn C." : post.author
    }));
    
    return updatedPosts;
  } catch (error) {
    console.warn('API not available. Using mock data:', error.message);
    const mockPosts = getMockBlogPosts();
    return mockPosts.filter(post => 
      post.title.toLowerCase().includes(query.toLowerCase()) ||
      post.description.toLowerCase().includes(query.toLowerCase()) ||
      post.content.toLowerCase().includes(query.toLowerCase())
    );
  }
};

const getMockBlogPosts = (options = {}) => {
  const { page = 1, limit = 6, category } = options;
  
  const allPosts = [
  {
    id: 1,
    title: "The Psychology of Happiness: Understanding What Truly Makes Us Happy",
    description: "Explore the fascinating world of positive psychology and discover the science behind lasting happiness...",
    content: "Positive psychology is a branch of psychology that focuses on the study of positive emotions, strengths, and factors that contribute to a fulfilling life. This article explores the key principles and practical applications of positive psychology in daily life.",
    author: "Pataveekorn C.",
    date: "2024-12-15T00:00:00.000Z",
    category: "Inspiration",
    image: null,
    likes: 45
  },
  {
    id: 2,
    title: "The Power of Daily Habits: Small Changes, Big Results",
    description: "Discover how small daily habits can transform your life and help you achieve your long-term goals...",
    content: "Habits are the foundation of personal success. This article explores how small, consistent actions can lead to significant life changes over time, including practical strategies for habit formation and maintenance.",
    author: "Pataveekorn C.",
    date: "2024-12-10T00:00:00.000Z",
    category: "General",
    image: null,
    likes: 32
  },
  {
    id: 3,
    title: "Mindfulness and Meditation: Finding Peace in a Busy World",
    description: "Learn practical mindfulness techniques to reduce stress and find inner peace in your daily life...",
    content: "In our fast-paced world, mindfulness and meditation offer powerful tools for managing stress and finding inner peace. This guide provides practical techniques and exercises for beginners and experienced practitioners alike.",
    author: "Pataveekorn C.",
    date: "2024-12-08T00:00:00.000Z",
    category: "Inspiration",
    image: null,
    likes: 67
  },
  {
    id: 4,
    title: "Building Resilience: How to Bounce Back from Life's Challenges",
    description: "Learn the key principles of resilience and how to develop this crucial life skill...",
    content: "Resilience is the ability to adapt and bounce back from adversity. This comprehensive guide covers the key components of resilience and provides practical strategies for building this essential life skill.",
    author: "Pataveekorn C.",
    date: "2024-12-03T00:00:00.000Z",
    category: "General",
    image: null,
    likes: 28
  },
  {
    id: 5,
    title: "The Art of Time Management: Maximizing Productivity in Your Daily Life",
    description: "Learn effective time management strategies to boost your productivity and achieve your goals...",
    content: "Time management is a crucial skill for success in both personal and professional life. This article provides practical techniques and tools for better time management.",
    author: "Pataveekorn C.",
    date: "2024-11-28T00:00:00.000Z",
    category: "General",
    image: null,
    likes: 41
  },
  {
    id: 6,
    title: "Digital Detox: Reclaiming Your Life from Technology",
    description: "Discover the benefits of taking breaks from technology and how to implement a digital detox...",
    content: "In our hyperconnected world, taking time away from technology can have profound benefits for mental health and well-being. Learn how to implement a successful digital detox.",
    author: "Pataveekorn C.",
    date: "2024-11-25T00:00:00.000Z",
    category: "Inspiration",
    image: null,
    likes: 33
  },
  {
    id: 7,
    title: "The Science of Sleep: Why Quality Rest Matters",
    description: "Explore the importance of sleep for health, productivity, and overall well-being...",
    content: "Sleep is one of the most important factors for physical and mental health. This comprehensive guide covers the science of sleep and practical tips for better rest.",
    author: "Pataveekorn C.",
    date: "2024-11-20T00:00:00.000Z",
    category: "General",
    image: null,
    likes: 56
  },
  {
    id: 8,
    title: "Creative Problem Solving: Thinking Outside the Box",
    description: "Learn innovative approaches to problem-solving that can help you overcome challenges...",
    content: "Creative problem-solving involves looking at challenges from new perspectives and finding innovative solutions. This article explores various techniques and approaches.",
    author: "Pataveekorn C.",
    date: "2024-11-15T00:00:00.000Z",
    category: "Inspiration",
    image: null,
    likes: 29
  }
];

  // Filter by category if specified
  let filteredPosts = allPosts;
  if (category && category !== 'highlight') {
    filteredPosts = allPosts.filter(post => 
      post.category.toLowerCase() === category.toLowerCase()
    );
  }

  // Calculate pagination
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedPosts = filteredPosts.slice(startIndex, endIndex);
  
  return {
    posts: paginatedPosts,
    currentPage: page,
    totalPages: Math.ceil(filteredPosts.length / limit),
    totalPosts: filteredPosts.length
  };
};

/**
 * Get categories from API or return mock categories
 * @returns {Promise<Array>} Array of categories
 */
export const fetchCategories = async () => {
  try {
    // Since categories endpoint doesn't exist, extract categories from posts
    const response = await fetch(`${API_BASE_URL}/posts?page=1&limit=30`);
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    
    const data = await response.json();
    const posts = data.posts || data;
    
    // Extract unique categories from posts
    const categories = [...new Set(posts.map(post => post.category))];
    
    // Create category options with highlight as first option
    const categoryOptions = [
      { value: 'highlight', label: 'Highlight' },
      ...categories.map(category => ({
        value: category.toLowerCase(),
        label: category
      }))
    ];
    
    return categoryOptions;
  } catch (error) {
    console.error('Error fetching categories:', error.message);
    
    // Return mock categories if API is not available
    return [
      { value: 'highlight', label: 'Highlight' },
      { value: 'cat', label: 'Cat' },
      { value: 'inspiration', label: 'Inspiration' },
      { value: 'general', label: 'General' }
    ];
  }
};
