/**
 * API service for fetching blog data and authentication
 */
import { supabase } from '../lib/supabase';

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
    content: `# The Psychology of Happiness: Understanding What Truly Makes Us Happy

Positive psychology is a branch of psychology that focuses on the study of positive emotions, strengths, and factors that contribute to a fulfilling life. This article explores the key principles and practical applications of positive psychology in daily life.

## What is Positive Psychology?

Positive psychology is the scientific study of what makes life most worth living. It focuses on both individual and societal well-being, studying positive subjective experience, positive individual traits, and positive institutions.

## Key Components of Happiness

### 1. Positive Emotions
Positive emotions like joy, gratitude, and contentment are not just pleasant experiences—they also broaden our thinking and build our resources for the future.

### 2. Engagement
When we're fully engaged in activities that challenge us and match our skills, we experience what psychologist Mihaly Csikszentmihalyi calls "flow."

### 3. Relationships
Strong, positive relationships with others are one of the most important factors in human happiness and well-being.

### 4. Meaning and Purpose
Having a sense of meaning and purpose in life—feeling that our lives matter and that we're contributing to something larger than ourselves.

### 5. Accomplishment
The pursuit of success, mastery, and achievement for its own sake.

## Practical Applications

Here are some evidence-based strategies to increase happiness:

- **Practice Gratitude**: Keep a gratitude journal or regularly express thanks to others
- **Cultivate Optimism**: Focus on positive outcomes and learn from setbacks
- **Build Strong Relationships**: Invest time and energy in meaningful connections
- **Find Your Strengths**: Identify and use your personal strengths regularly
- **Help Others**: Acts of kindness and service to others boost our own happiness

## Conclusion

Happiness is not just a feeling—it's a skill that can be developed through intentional practice and understanding of the psychological principles that underlie well-being.`,
    author: "Pataveekorn C.",
    date: "2024-12-15T00:00:00.000Z",
    category: "Inspiration",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    likes: 45
  },
  {
    id: 2,
    title: "The Power of Daily Habits: Small Changes, Big Results",
    description: "Discover how small daily habits can transform your life and help you achieve your long-term goals...",
    content: `# The Power of Daily Habits: Small Changes, Big Results

Habits are the foundation of personal success. This article explores how small, consistent actions can lead to significant life changes over time, including practical strategies for habit formation and maintenance.

## The Science of Habits

Habits are automatic behaviors that our brains have learned to perform with minimal conscious thought. They're formed through a process called "chunking," where the brain converts a sequence of actions into an automatic routine.

## The Habit Loop

Every habit consists of three components:

1. **Cue**: The trigger that starts the habit
2. **Routine**: The behavior itself
3. **Reward**: The benefit you gain from the behavior

## Building Better Habits

### Start Small
Begin with habits so small they seem almost trivial. This reduces resistance and makes it easier to maintain consistency.

### Stack Your Habits
Link new habits to existing ones. For example, "After I brush my teeth, I will do 10 push-ups."

### Track Your Progress
Use a habit tracker to monitor your consistency and celebrate small wins.

### Focus on Systems, Not Goals
Instead of focusing on the end result, focus on the daily actions that will get you there.

## Breaking Bad Habits

1. **Identify the Cue**: What triggers the unwanted behavior?
2. **Change the Routine**: Replace the bad habit with a better alternative
3. **Keep the Same Reward**: Ensure the new behavior provides similar satisfaction

## Conclusion

Small, consistent actions compound over time to create remarkable results. The key is to start small, stay consistent, and focus on the process rather than the outcome.`,
    author: "Pataveekorn C.",
    date: "2024-12-10T00:00:00.000Z",
    category: "General",
    image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=600&fit=crop",
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

export const registerUser = async (userData) => {
  try {
    console.log('Registering user with data:', userData);
    
    // Register user with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: userData.email,
      password: userData.password,
      options: {
        data: {
          name: userData.name,
          username: userData.username,
        }
      }
    });

    console.log('Auth response:', { authData, authError });

    if (authError) {
      console.error('Auth error:', authError);
      throw new Error(authError.message);
    }

    // Create user profile in users table
    console.log('Creating user profile...');
    const { data: profileData, error: userError } = await supabase
      .from('users')
      .insert([
        {
          id: authData.user.id,
          username: userData.username,
          name: userData.name,
          role: 'user'
        }
      ])
      .select()
      .single();

    console.log('Profile creation response:', { profileData, userError });

    if (userError) {
      console.error('Profile creation error:', userError);
      throw new Error(userError.message);
    }

    console.log('Registration successful!');
    return { user: profileData, auth: authData };
  } catch (error) {
    console.error('Error registering user:', error.message);
    throw error;
  }
};

export const loginUser = async (credentials) => {
  try {
    // Login user with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    });

    if (authError) {
      throw new Error(authError.message);
    }

    // Get user profile from users table
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('id', authData.user.id)
      .single();

    if (userError) {
      throw new Error(userError.message);
    }

    return { user: userData, auth: authData };
  } catch (error) {
    console.error('Error logging in user:', error.message);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      throw new Error(error.message);
    }

    return { success: true };
  } catch (error) {
    console.error('Error logging out user:', error.message);
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    
    if (error) {
      throw new Error(error.message);
    }

    return user;
  } catch (error) {
    console.error('Error getting current user:', error.message);
    throw error;
  }
};

/**
 * Upload profile image to Supabase Storage
 * @param {File} file - Image file to upload
 * @param {string} userId - User ID
 * @returns {Promise<string>} Public URL of uploaded image
 */
export const uploadProfileImage = async (file, userId) => {
  try {
    console.log('Uploading profile image for user:', userId);
    
    // Create unique filename
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}-${Date.now()}.${fileExt}`;
    const filePath = `profile-images/${fileName}`;

    // Try to upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from('avatars')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error('Upload error:', error);
      
      // If bucket doesn't exist, provide helpful error message
      if (error.message.includes('Bucket not found') || error.message.includes('does not exist')) {
        throw new Error('Storage bucket not configured. Please contact administrator to set up image storage.');
      }
      
      throw new Error(error.message);
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('avatars')
      .getPublicUrl(filePath);

    console.log('Upload successful, public URL:', urlData.publicUrl);
    return urlData.publicUrl;
  } catch (error) {
    console.error('Error uploading profile image:', error);
    throw error;
  }
};

/**
 * Update user profile in database
 * @param {string} userId - User ID
 * @param {Object} updates - Profile updates
 * @returns {Promise<Object>} Updated user data
 */
export const updateUserProfile = async (userId, updates) => {
  try {
    console.log('Updating user profile:', userId, updates);
    
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();

    if (error) {
      console.error('Update error:', error);
      throw new Error(error.message);
    }

    console.log('Profile updated successfully');
    return data;
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};

export const getBlogPost = async (postId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/posts/${postId}`);
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    
    const post = await response.json();
    
    // Replace "Thompson P." with "Pataveekorn C."
    const updatedPost = {
      ...post,
      author: post.author === "Thompson P." ? "Pataveekorn C." : post.author
    };
    
    return updatedPost;
  } catch (error) {
    console.warn('API not available. Using mock data:', error.message);
    
    // Return mock post data if API is not available
    const mockPosts = getMockBlogPosts();
    const mockPost = mockPosts.posts.find(post => post.id.toString() === postId.toString());
    
    if (!mockPost) {
      throw new Error('Post not found');
    }
    
    return mockPost;
  }
};

export const toggleLike = async (postId, userId) => {
  try {
    // Check if user already liked this post
    const { data: existingLike, error: checkError } = await supabase
      .from('post_likes')
      .select('*')
      .eq('post_id', postId)
      .eq('user_id', userId)
      .single();

    if (checkError && checkError.code !== 'PGRST116') {
      throw new Error(checkError.message);
    }

    if (existingLike) {
      // Unlike the post
      const { error: deleteError } = await supabase
        .from('post_likes')
        .delete()
        .eq('post_id', postId)
        .eq('user_id', userId);

      if (deleteError) {
        throw new Error(deleteError.message);
      }

      return { liked: false, action: 'unliked' };
    } else {
      // Like the post
      const { error: insertError } = await supabase
        .from('post_likes')
        .insert([{
          post_id: postId,
          user_id: userId
        }]);

      if (insertError) {
        throw new Error(insertError.message);
      }

      return { liked: true, action: 'liked' };
    }
  } catch (error) {
    console.error('Error toggling like:', error);
    throw error;
  }
};

export const getLikeCount = async (postId) => {
  try {
    const { count, error } = await supabase
      .from('post_likes')
      .select('*', { count: 'exact', head: true })
      .eq('post_id', postId);

    if (error) {
      throw new Error(error.message);
    }

    return count || 0;
  } catch (error) {
    console.error('Error getting like count:', error);
    throw error;
  }
};

/**
 * Check if user liked a post
 * @param {string|number} postId - The ID of the post
 * @param {string} userId - The ID of the user
 * @returns {Promise<boolean>} Whether user liked the post
 */
export const checkUserLike = async (postId, userId) => {
  try {
    const { data, error } = await supabase
      .from('post_likes')
      .select('*')
      .eq('post_id', postId)
      .eq('user_id', userId)
      .single();

    if (error && error.code !== 'PGRST116') {
      throw new Error(error.message);
    }

    return !!data;
  } catch (error) {
    console.error('Error checking user like:', error);
    throw error;
  }
};

export const addComment = async (postId, userId, content) => {
  try {
    // Insert comment
    const { data: comment, error: commentError } = await supabase
      .from('comments')
      .insert([{
        post_id: postId,
        user_id: userId,
        content: content.trim()
      }])
      .select('*')
      .single();

    if (commentError) {
      throw new Error(commentError.message);
    }

    // Get user data
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('id, name, username, avatar_url')
      .eq('id', userId)
      .single();

    if (userError) {
      console.warn('Error getting user data:', userError);
    }

    // Combine comment with user data
    return {
      ...comment,
      user: user || { name: 'Anonymous', username: 'anonymous' }
    };
  } catch (error) {
    console.error('Error adding comment:', error);
    throw error;
  }
};

export const getComments = async (postId) => {
  try {
    // Get comments first
    const { data: comments, error: commentsError } = await supabase
      .from('comments')
      .select('*')
      .eq('post_id', postId)
      .order('created_at', { ascending: false });

    if (commentsError) {
      throw new Error(commentsError.message);
    }

    if (!comments || comments.length === 0) {
      return [];
    }

    // Get user data for each comment
    const userIds = [...new Set(comments.map(comment => comment.user_id))];
    const { data: users, error: usersError } = await supabase
      .from('users')
      .select('id, name, username, avatar_url')
      .in('id', userIds);

    if (usersError) {
      throw new Error(usersError.message);
    }

    // Combine comments with user data
    const commentsWithUsers = comments.map(comment => {
      const user = users?.find(u => u.id === comment.user_id);
      return {
        ...comment,
        user: user || { name: 'Anonymous', username: 'anonymous' }
      };
    });

    return commentsWithUsers;
  } catch (error) {
    console.error('Error getting comments:', error);
    throw error;
  }
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
