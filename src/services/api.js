import { supabase } from '../lib/supabase';

export const fetchBlogPosts = async (options = {}) => {
  try {
    const { page = 1, limit = 6, category, keyword } = options;
    
    // Category ID mapping
    const categoryIdMap = {
      'Skills': 1,
      'Mindset': 2,
      'Health': 3
    };
    
    // Category name mapping (reverse)
    const categoryNameMap = {
      1: 'Skills',
      2: 'Mindset',
      3: 'Health'
    };
    
    // Fetch only from Supabase
    let query = supabase
      .from('posts')
      .select('*')
      .order('date', { ascending: false });

    const { data, error } = await query;

    if (error) {
      console.warn('Supabase error:', error);
      return {
        posts: [],
        currentPage: page,
        totalPages: 0,
        totalPosts: 0
      };
    }

    let allPosts = (data || []).map(post => ({
      id: `supabase_${post.id}`,
      originalId: post.id,
      title: post.title,
      description: post.description,
      content: post.content,
      category: categoryNameMap[post.category_id] || 'General',
      image: post.image,
      thumbnail: post.image,
      date: post.date,
      likes: post.likes_count || 0,
      author: 'Pataveekorn C.',
      status: post.status_id === 2 ? 'Draft' : 'Published',
      source: 'supabase'
    }));
    
    // Apply filters
    let filteredPosts = allPosts;
    
    // Filter by category
    if (category) {
      filteredPosts = filteredPosts.filter(post => 
        post.category?.toLowerCase() === category.toLowerCase()
      );
    }
    
    // Filter by keyword
    if (keyword) {
      const keywordLower = keyword.toLowerCase();
      filteredPosts = filteredPosts.filter(post =>
        post.title?.toLowerCase().includes(keywordLower) ||
        post.description?.toLowerCase().includes(keywordLower) ||
        post.content?.toLowerCase().includes(keywordLower)
      );
    }
    
    // Sort by date (newest first)
    filteredPosts.sort((a, b) => {
      const dateA = new Date(a.date || 0);
      const dateB = new Date(b.date || 0);
      return dateB - dateA;
    });
    
    // Apply pagination
    const totalPosts = filteredPosts.length;
    const totalPages = Math.ceil(totalPosts / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedPosts = filteredPosts.slice(startIndex, endIndex);
    
    return {
      posts: paginatedPosts,
      currentPage: page,
      totalPages: totalPages,
      totalPosts: totalPosts
    };
  } catch (error) {
    console.error('Error fetching blog posts:', error.message);
    throw error;
  }
};

export const fetchBlogPostsByCategory = async (category, page = 1, limit = 6) => {
  try {
    let query = supabase
      .from('posts')
      .select('*')
      .order('date', { ascending: false });

    if (category && category.toLowerCase() !== 'highlight') {
      const categoryIdMap = { 'Skills': 1, 'Mindset': 2, 'Health': 3 };
      const categoryId = categoryIdMap[category] || null;
      if (categoryId) {
        query = supabase
          .from('posts')
          .select('*')
          .eq('category_id', categoryId)
          .order('date', { ascending: false });
      }
    }

    const { data, error } = await query;
    if (error) {
      console.warn('Supabase error:', error);
      return [];
    }

    const categoryNameMap = { 1: 'Skills', 2: 'Mindset', 3: 'Health' };
    const posts = (data || []).map(post => ({
      id: `supabase_${post.id}`,
      originalId: post.id,
      title: post.title,
      description: post.description,
      content: post.content,
      category: categoryNameMap[post.category_id] || 'General',
      image: post.image,
      thumbnail: post.image,
      date: post.date,
      likes: post.likes_count || 0,
      author: 'Pataveekorn C.',
      status: post.status_id === 2 ? 'Draft' : 'Published',
      source: 'supabase'
    }));

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    return posts.slice(startIndex, endIndex);
  } catch (error) {
    console.error('Error fetching posts by category:', error.message);
    return [];
  }
};

export const searchBlogPosts = async (keyword, page = 1, limit = 6) => {
  try {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('date', { ascending: false });

    if (error) {
      console.warn('Supabase error:', error);
      return [];
    }
    const categoryNameMap = { 1: 'Skills', 2: 'Mindset', 3: 'Health' };
    const posts = (data || []).map(post => ({
      id: `supabase_${post.id}`,
      originalId: post.id,
      title: post.title,
      description: post.description,
      content: post.content,
      category: categoryNameMap[post.category_id] || 'General',
      image: post.image,
      thumbnail: post.image,
      date: post.date,
      likes: post.likes_count || 0,
      author: 'Pataveekorn C.',
      status: post.status_id === 2 ? 'Draft' : 'Published',
      source: 'supabase'
    }));

    const keywordLower = (keyword || '').toLowerCase();
    const filtered = posts.filter(post =>
      post.title?.toLowerCase().includes(keywordLower) ||
      post.description?.toLowerCase().includes(keywordLower) ||
      post.content?.toLowerCase().includes(keywordLower)
    );

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    return filtered.slice(startIndex, endIndex);
  } catch (error) {
    console.error('Error searching posts:', error.message);
    return [];
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
      console.warn('Auth error (handled):', authError);
      const message = (authError.message || '').toLowerCase();
      // Normalize common Supabase error to a user-friendly message
      if (message.includes('already registered') || message.includes('already exists')) {
        return { error: 'Email is already taken, Please try another email.' };
      }
      return { error: authError.message };
    }

    // If email confirmation is enabled, authData.user can be null.
    // In that case, skip profile creation and return early with a success message.
    if (!authData?.user?.id) {
      return { user: null, auth: authData, message: 'Confirmation email sent. Please verify your email to complete registration.' };
    }

    // Create or update user profile in users table
    // Many Supabase setups have an auth trigger that inserts (id, email) into public.users on signup.
    // Use upsert to avoid duplicate key errors and just enrich the existing row.
    console.log('Creating/updating user profile...');
    const { data: profileData, error: userError } = await supabase
      .from('users')
      .upsert([
        {
          id: authData.user.id,
          email: userData.email || userData?.email_address || authData.user.email || null,
          username: userData.username,
          name: userData.name,
          role: 'user'
        }
      ], { onConflict: 'id', ignoreDuplicates: false })
      .select()
      .single();

    console.log('Profile creation response:', { profileData, userError });

    if (userError) {
      console.warn('Profile creation error (handled):', userError);
      return { error: userError.message };
    }

    console.log('Registration successful!');
    return { user: profileData, auth: authData };
  } catch (error) {
    console.error('Error registering user:', error.message);
    return { error: error.message };
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
    // Parse ID to determine source and get real ID
    const idStr = String(postId);
    let realId = postId;
    let source = 'supabase';
    
    if (idStr.startsWith('supabase_')) {
      realId = idStr.replace('supabase_', '');
      source = 'supabase';
    }
    
    if (source === 'supabase') {
      // Fetch from Supabase
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', realId)
        .single();
      
      if (error) {
        throw new Error(`Post not found: ${error.message}`);
      }
      
      if (!data) {
        throw new Error('Post not found');
      }
      
      // Map category ID to name
      const categoryNameMap = {
        1: 'Cat',
        2: 'General',
        3: 'Inspiration'
      };
      
      return {
        id: `supabase_${data.id}`,
        originalId: data.id,
        title: data.title,
        description: data.description,
        content: data.content,
        category: categoryNameMap[data.category_id] || 'General',
        image: data.image,
        thumbnail: data.image,
        date: data.date,
        likes: data.likes_count || 0,
        author: 'Pataveekorn C.',
        status: data.status_id === 2 ? 'Draft' : 'Published',
        source: 'supabase'
      };
    }
  } catch (error) {
    console.warn('Error fetching post, trying mock data:', error.message);
    
    // Return mock post data as fallback
    const mockPosts = getMockBlogPosts();
    const mockPost = mockPosts.posts.find(post => {
      return post.id.toString() === postId.toString() || 
             post.id.toString() === String(postId).replace(/^supabase_/, '');
    });
    
    if (!mockPost) {
      throw new Error('Post not found');
    }
    
    return mockPost;
  }
};

export const toggleLike = async (postId, userId) => {
  try {
    // Parse ID to get real ID for database
    const idStr = String(postId);
    let realId = postId;
    
    if (idStr.startsWith('supabase_')) {
      realId = parseInt(idStr.replace('supabase_', ''));
    } else {
      // If it's already a number, use it directly
      realId = parseInt(postId);
    }
    
    // Check if user already liked this post
    const { data: existingLike, error: checkError } = await supabase
      .from('post_likes')
      .select('*')
      .eq('post_id', realId)
      .eq('user_id', userId)
      .single();

    if (checkError && checkError.code !== 'PGRST116') {
      console.warn('Database error checking existing like:', checkError.message);
      // If database error, simulate a like action
      return { liked: true, action: 'liked' };
    }

    if (existingLike) {
      // Unlike the post
      const { error: deleteError } = await supabase
        .from('post_likes')
        .delete()
        .eq('post_id', realId)
        .eq('user_id', userId);

      if (deleteError) {
        console.warn('Database error deleting like:', deleteError.message);
        // If delete fails, still return unliked status
        return { liked: false, action: 'unliked' };
      }

      return { liked: false, action: 'unliked' };
    } else {
      // Like the post
      const { error: insertError } = await supabase
        .from('post_likes')
        .insert([{
          post_id: realId,
          user_id: userId
        }]);

      if (insertError) {
        console.warn('Database error inserting like:', insertError.message);
        // If insert fails, still return liked status
        return { liked: true, action: 'liked' };
      }

      return { liked: true, action: 'liked' };
    }
  } catch (error) {
    console.warn('Error toggling like, simulating like action:', error.message);
    // Return a simulated like action to prevent UI errors
    return { liked: true, action: 'liked' };
  }
};

export const getLikeCount = async (postId) => {
  try {
    // Parse ID to get real ID for database
    const idStr = String(postId);
    let realId = postId;
    
    if (idStr.startsWith('supabase_')) {
      realId = parseInt(idStr.replace('supabase_', ''));
    } else {
      // If it's already a number, use it directly
      realId = parseInt(postId);
    }
    
    const { count, error } = await supabase
      .from('post_likes')
      .select('*', { count: 'exact', head: true })
      .eq('post_id', realId);

    if (error) {
      console.warn('Database error getting like count:', error.message);
      // Return 0 if database error (table doesn't exist or connection issue)
      return 0;
    }

    return count || 0;
  } catch (error) {
    console.warn('Error getting like count, returning 0:', error.message);
    // Return 0 instead of throwing error to prevent app crashes
    return 0;
  }
};

export const checkUserLike = async (postId, userId) => {
  try {
    // Parse ID to get real ID for database
    const idStr = String(postId);
    let realId = postId;
    
    if (idStr.startsWith('supabase_')) {
      realId = parseInt(idStr.replace('supabase_', ''));
    } else {
      // If it's already a number, use it directly
      realId = parseInt(postId);
    }
    
    const { data, error } = await supabase
      .from('post_likes')
      .select('*')
      .eq('post_id', realId)
      .eq('user_id', userId)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.warn('Database error checking user like:', error.message);
      // Return false if database error
      return false;
    }

    return !!data;
  } catch (error) {
    console.warn('Error checking user like, returning false:', error.message);
    // Return false instead of throwing error
    return false;
  }
};

export const addComment = async (postId, userId, content) => {
  try {
    // Parse ID to get real ID for database
    const idStr = String(postId);
    let realId = postId;
    
    if (idStr.startsWith('supabase_')) {
      realId = parseInt(idStr.replace('supabase_', ''));
    } else {
      // If it's already a number, use it directly
      realId = parseInt(postId);
    }
    
    // Insert comment
    const { data: comment, error: commentError } = await supabase
      .from('comments')
      .insert([{
        post_id: realId,
        user_id: userId,
        content: content.trim()
      }])
      .select('*')
      .single();

    if (commentError) {
      console.warn('Database error adding comment:', commentError.message);
      // Return a mock comment if database error
      return {
        id: `temp_${Date.now()}`,
        post_id: postId,
        user_id: userId,
        content: content.trim(),
        created_at: new Date().toISOString(),
        user: { name: 'Anonymous', username: 'anonymous' }
      };
    }

    // Get user data
    let userData = { name: 'Anonymous', username: 'anonymous' };
    
    try {
      const { data: user, error: userError } = await supabase
        .from('users')
        .select('id, name, username, avatar_url')
        .eq('id', userId)
        .single();

      if (user && !userError) {
        userData = user;
      } else {
        console.warn('User not found in database, using auth user data:', userError?.message);
        // Fallback: get user data from auth
        const { data: { user: authUser }, error: authError } = await supabase.auth.getUser();
        if (authUser && !authError) {
          userData = {
            name: authUser.user_metadata?.name || authUser.email?.split('@')[0] || 'User',
            username: authUser.user_metadata?.username || authUser.email?.split('@')[0] || 'user'
          };
        }
      }
    } catch (err) {
      console.warn('Error getting user data:', err.message);
    }

    // Combine comment with user data
    return {
      ...comment,
      user: userData
    };
  } catch (error) {
    console.warn('Error adding comment, returning mock comment:', error.message);
    // Return a mock comment to prevent UI errors
    return {
      id: `temp_${Date.now()}`,
      post_id: postId,
      user_id: userId,
      content: content.trim(),
      created_at: new Date().toISOString(),
      user: { name: 'Anonymous', username: 'anonymous' }
    };
  }
};

export const getComments = async (postId) => {
  try {
    // Parse ID to get real ID for database
    const idStr = String(postId);
    let realId = postId;
    
    if (idStr.startsWith('supabase_')) {
      realId = parseInt(idStr.replace('supabase_', ''));
    } else if (idStr.startsWith('external_')) {
      // For external posts, use a negative number to avoid conflicts with Supabase posts
      const externalId = parseInt(idStr.replace('external_', ''));
      realId = -externalId; // Use negative numbers for external posts
    } else {
      // If it's already a number, use it directly
      realId = parseInt(postId);
    }
    
    // Get comments first
    const { data: comments, error: commentsError } = await supabase
      .from('comments')
      .select('*')
      .eq('post_id', realId)
      .order('created_at', { ascending: false });

    if (commentsError) {
      console.warn('Database error getting comments:', commentsError.message);
      // Return empty array if database error
      return [];
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
      console.warn('Database error getting user data for comments:', usersError.message);
      // Return comments without user data if error
      return comments.map(comment => ({
        ...comment,
        user: { name: 'Anonymous', username: 'anonymous' }
      }));
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
    console.warn('Error getting comments, returning empty array:', error.message);
    // Return empty array instead of throwing error
    return [];
  }
};

export const resetPassword = async (currentPassword, newPassword) => {
  try {
    console.log('Starting password reset process...');
    
    // Validate input parameters
    if (!currentPassword || !newPassword) {
      throw new Error('Both current and new passwords are required');
    }

    if (currentPassword === newPassword) {
      throw new Error('New password must be different from current password');
    }

    // Get current user session
    const { data: currentUser, error: getUserError } = await supabase.auth.getUser();
    
    if (getUserError) {
      console.error('Get user error:', getUserError);
      throw new Error('Failed to verify user session. Please try logging in again.');
    }

    if (!currentUser.user || !currentUser.user.email) {
      throw new Error('User not authenticated. Please log in again.');
    }

    // Create timeout promise
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Request timeout. Please try again.')), 10000);
    });

    // Verify current password by attempting to sign in with it (with timeout)
    console.log('Verifying current password...');
    const verifyPromise = supabase.auth.signInWithPassword({
      email: currentUser.user.email,
      password: currentPassword
    });

    const { error: verifyError } = await Promise.race([verifyPromise, timeoutPromise]);

    if (verifyError) {
      console.error('Password verification error:', verifyError);
      
      // Handle specific error cases
      if (verifyError.message.includes('Invalid login credentials')) {
        throw new Error('Current password is incorrect');
      } else if (verifyError.message.includes('Email not confirmed')) {
        throw new Error('Please confirm your email before changing password');
      } else if (verifyError.message.includes('Request timeout')) {
        throw new Error('Request timeout. Please check your connection and try again');
      } else {
        throw new Error('Unable to verify current password. Please try again');
      }
    }

    // Update the password (with timeout)
    console.log('Updating password...');
    const updatePromise = supabase.auth.updateUser({
      password: newPassword
    });

    const { data, error } = await Promise.race([updatePromise, timeoutPromise]);

    if (error) {
      console.error('Password update error:', error);
      
      // Handle specific password update errors
      if (error.message.includes('Password should be at least')) {
        throw new Error('New password does not meet minimum requirements');
      } else if (error.message.includes('same as the old password')) {
        throw new Error('New password must be different from current password');
      } else if (error.message.includes('Request timeout')) {
        throw new Error('Request timeout. Please check your connection and try again');
      } else {
        throw new Error(error.message || 'Unable to update password. Please try again');
      }
    }

    console.log('Password updated successfully');
    return { 
      success: true, 
      message: 'Password changed successfully! Please log out and log back in with your new password',
      user: data.user 
    };
  } catch (error) {
    console.error('Error resetting password:', error);
    
    // Re-throw with better error messages
    if (error.message.includes('Network error') || error.message.includes('fetch')) {
      throw new Error('Network error. Please check your connection and try again.');
    }
    
    throw error;
  }
};

export const fetchCategories = async () => {
  try {
    // Fetch from Supabase categories table
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('id', { ascending: true });
    
    if (error) {
      console.error('Supabase error fetching categories:', error);
      throw new Error(error.message);
    }
    
    // Return just the category names for admin dropdown
    return (data || []).map(cat => cat.name);
  } catch (error) {
    console.error('Error fetching categories:', error.message);
    return ['Cat', 'General', 'Inspiration'];
  }
};

export const fetchAllCategories = async () => {
  try {
    // Fetch from Supabase categories table
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('id', { ascending: true });
    
    if (error) {
      console.error('Supabase error fetching categories:', error);
      throw new Error(error.message);
    }
    
    return data || [];
  } catch (error) {
    console.error('Error fetching all categories:', error.message);
    // Return empty array if fails
    return [];
  }
};

export const createCategory = async (categoryData) => {
  try {
    const { data, error } = await supabase
      .from('categories')
      .insert([{ name: categoryData.name }])
      .select()
      .single();
    
    if (error) {
      throw new Error(`Failed to create category: ${error.message}`);
    }
    
    return data;
  } catch (error) {
    console.error('Error creating category:', error);
    throw error;
  }
};

export const updateCategory = async (id, categoryData) => {
  try {
    const { data, error } = await supabase
      .from('categories')
      .update({ name: categoryData.name })
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      throw new Error(`Failed to update category: ${error.message}`);
    }
    
    return data;
  } catch (error) {
    console.error('Error updating category:', error);
    throw error;
  }
};

export const deleteCategory = async (id) => {
  try {
    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', id);
    
    if (error) {
      throw new Error(`Failed to delete category: ${error.message}`);
    }
    
    return true;
  } catch (error) {
    console.error('Error deleting category:', error);
    throw error;
  }
};

// Admin API functions for article management

export const createArticle = async (articleData) => {
  try {
    console.log('Creating article with data:', articleData);
    
    // Handle thumbnail image - convert to base64 or use default
    let imageUrl = '/imgdefault.png';
    
    if (articleData.thumbnail && typeof articleData.thumbnail === 'object') {
      try {
        // Convert to base64 for storage in database
        imageUrl = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(articleData.thumbnail);
        });
      } catch (uploadErr) {
        console.error('Image conversion failed, using default:', uploadErr);
      }
    } else if (articleData.thumbnail && typeof articleData.thumbnail === 'string') {
      // If thumbnail is already a string (URL or base64), use it
      imageUrl = articleData.thumbnail;
    }
    
    // Map category name to category_id (static mapping)
    let categoryId = 1; // Default category
    if (articleData.category) {
      const categoryMap = {
        'Cat': 1,
        'General': 2,
        'Inspiration': 3
      };
      categoryId = categoryMap[articleData.category] || 1;
    }
    
    // Map status to status_id
    let statusId = 1; // Default: Published
    if (articleData.status === 'Draft') {
      statusId = 2;
    }
    
    // Prepare article data for Supabase with correct column names
    const postData = {
      title: articleData.title,
      description: articleData.introduction || '', // introduction -> description
      content: articleData.content,
      image: imageUrl, // thumbnail -> image
      category_id: categoryId, // category -> category_id
      status_id: statusId, // 1 = Published, 2 = Draft
      date: articleData.date || new Date().toISOString(),
      likes_count: 0
    };
    
    console.log('Sending to Supabase:', postData);
    
    // Insert into Supabase
    const { data, error } = await supabase
      .from('posts')
      .insert([postData])
      .select()
      .single();
    
    if (error) {
      console.error('Supabase error:', error);
      console.error('Error details:', JSON.stringify(error, null, 2));
      throw new Error(`Failed to create article: ${error.message}`);
    }
    
    console.log('Article created successfully:', data);
    return data;
  } catch (error) {
    console.error('Error creating article:', error);
    throw error;
  }
};

// (Reverted) removed seeding utilities

export const updateArticle = async (id, articleData) => {
  try {
    console.log('Updating article:', id, articleData);
    
    // Parse ID to determine source
    const idStr = String(id);
    let realId = id;
    let source = 'supabase';
    
    if (idStr.startsWith('supabase_')) {
      realId = idStr.replace('supabase_', '');
      source = 'supabase';
    } else if (idStr.startsWith('external_')) {
      realId = idStr.replace('external_', '');
      source = 'external';
    }
    
    if (source === 'external') {
      throw new Error('Cannot update articles from external API');
    }
    
    // Handle thumbnail image if new file is provided
    let imageUrl = articleData.thumbnail || articleData.image;
    
    if (articleData.thumbnail && typeof articleData.thumbnail === 'object') {
      try {
        // Convert to base64 for storage in database
        imageUrl = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(articleData.thumbnail);
        });
      } catch (uploadErr) {
        console.error('Image conversion failed, keeping existing:', uploadErr);
        // Keep the file object, will be removed later
      }
    }
    
    // Prepare update data with correct column names
    const updateData = {};
    
    if (articleData.title !== undefined) {
      updateData.title = articleData.title;
    }
    if (articleData.content !== undefined) {
      updateData.content = articleData.content;
    }
    if (imageUrl && typeof imageUrl === 'string') {
      updateData.image = imageUrl; // thumbnail -> image
    }
    if (articleData.introduction !== undefined) {
      updateData.description = articleData.introduction; // introduction -> description
    }
    if (articleData.category !== undefined) {
      // Map category name to category_id
      const categoryMap = {
        'Cat': 1,
        'General': 2,
        'Inspiration': 3
      };
      updateData.category_id = categoryMap[articleData.category] || 1;
    }
    if (articleData.status !== undefined) {
      // Map status to status_id
      updateData.status_id = articleData.status === 'Draft' ? 2 : 1;
    }
    
    console.log('Sending update to Supabase:', updateData);
    
    // Update in Supabase
    const { data, error } = await supabase
      .from('posts')
      .update(updateData)
      .eq('id', realId)
      .select()
      .single();
    
    if (error) {
      console.error('Supabase error:', error);
      console.error('Error details:', JSON.stringify(error, null, 2));
      throw new Error(`Failed to update article: ${error.message}`);
    }
    
    console.log('Article updated successfully:', data);
    return data;
  } catch (error) {
    console.error('Error updating article:', error);
    throw error;
  }
};

/**
 * Admin users (panel) helpers
 */

export const getAdminUserByEmail = async (email) => {
  try {
    if (!email) throw new Error('Email is required');
    const { data, error } = await supabase
      .from('admin_users')
      .select('*')
      .eq('email', email)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data || null;
  } catch (error) {
    console.error('Error fetching admin user by email:', error);
    throw error;
  }
};

export const updateAdminUserByEmail = async (email, updates) => {
  try {
    if (!email) throw new Error('Email is required');
    const sanitized = { ...updates };
    // Never allow direct password_hash updates from client accidentally
    delete sanitized.password_hash;

    const { data, error } = await supabase
      .from('admin_users')
      .update(sanitized)
      .eq('email', email)
      .select('*')
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error('Error updating admin user:', error);
    throw error;
  }
};

export const deleteArticle = async (id) => {
  try {
    // Parse ID to determine source
    const idStr = String(id);
    let realId = id;
    if (idStr.startsWith('supabase_')) {
      realId = idStr.replace('supabase_', '');
    }
    
    if (true) {
      // Delete from Supabase
      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', realId);
      
      if (error) {
        throw new Error(`Failed to delete article: ${error.message}`);
      }
      
      return true;
    }
  } catch (error) {
    console.error('Error deleting article:', error.message);
    throw error;
  }
};

export const fetchArticleById = async (id) => {
  try {
    const idStr = String(id);
    let realId = id;
    if (idStr.startsWith('supabase_')) realId = idStr.replace('supabase_', '');

    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('id', realId)
      .single();

    if (error) {
      throw new Error(`Failed to fetch article: ${error.message}`);
    }

    return data;
  } catch (error) {
    console.error('Error fetching article:', error.message);
    throw error;
  }
};
