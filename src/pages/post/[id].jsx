import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { toast } from 'sonner';
import Navigation from '../../components/layout/Navigation';
import Footer from '../../components/layout/Footer';
import { Button } from '../../components/ui/button';
import { LoadingState, ErrorState } from '../../components/ui/LoadingStates';
import { LikeIcon, CopyLinkIcon, FacebookIcon, LinkedInIcon, TwitterIcon } from '../../components/ui/Icons';
import { getBlogPost, toggleLike, getLikeCount, checkUserLike, addComment, getComments } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
// import meImage from '../../../public/me.jpg';

/**
 * ViewPost component - Display individual blog post details
 * Accessible via URL: /post/:postId
 */
const ViewPost = () => {
  const router = useRouter();
  const { id: postId } = router.query;
  const { user, loading: authLoading } = useAuth();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Like and comment state
  const [likeCount, setLikeCount] = useState(0);
  const [userLiked, setUserLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [submittingComment, setSubmittingComment] = useState(false);

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch post data
        const postData = await getBlogPost(postId);
        setPost(postData);
        
        // Fetch like count
        const likes = await getLikeCount(postId);
        setLikeCount(likes);
        
        // Fetch comments
        const postComments = await getComments(postId);
        setComments(postComments);
        
        // Check if user liked this post (if logged in)
        if (user) {
          const liked = await checkUserLike(postId, user.id);
          setUserLiked(liked);
        }
      } catch (err) {
        setError(err.message || 'Failed to load post');
      } finally {
        setLoading(false);
      }
    };

    if (postId) {
      fetchPostData();
    }
  }, [postId, user]);

  const handleBackToHome = () => {
    router.push('/');
  };

  // Handle like button click
  const handleLikeClick = async () => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }
    
    try {
      const result = await toggleLike(postId, user.id);
      setUserLiked(result.liked);
      
      // Update like count
      const newLikeCount = await getLikeCount(postId);
      setLikeCount(newLikeCount);
      
      toast.success(result.liked ? 'Liked!' : 'Unliked!');
    } catch (error) {
      console.error('Error toggling like:', error);
      toast.error('Failed to update like');
    }
  };

  // Handle copy link functionality
  const handleCopyLink = async () => {
    try {
      const currentUrl = window.location.href;
      await navigator.clipboard.writeText(currentUrl);
      toast.success('Copied!', {
        description: 'This article has been copied to your clipboard.',
        duration: 3000,
      });
    } catch (err) {
      toast.error('Failed to copy link');
    }
  };

  // Handle social media sharing
  const handleSocialShare = (platform) => {
    const currentUrl = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(post?.title || '');
    
    let shareUrl = '';
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/share.php?u=${currentUrl}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${currentUrl}`;
        break;
      case 'twitter':
        shareUrl = `https://www.twitter.com/share?url=${currentUrl}&text=${title}`;
        break;
      default:
        return;
    }
    
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  // Handle comment submission
  const handleCommentSubmit = async () => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }
    
    if (!commentText.trim()) {
      toast.error('Please enter a comment');
      return;
    }
    
    try {
      setSubmittingComment(true);
      const newComment = await addComment(postId, user.id, commentText);
      
      // Add the new comment to the list
      setComments(prevComments => [newComment, ...prevComments]);
      toast.success('Comment added successfully!');
      
      setCommentText('');
    } catch (error) {
      console.error('Error adding comment:', error);
      toast.error('Failed to add comment');
    } finally {
      setSubmittingComment(false);
    }
  };

  // Handle login modal actions
  const handleCreateAccount = () => {
    setShowLoginModal(false);
    router.push('/register');
  };

  const handleLogin = () => {
    setShowLoginModal(false);
    router.push('/login');
  };

  const closeLoginModal = () => {
    setShowLoginModal(false);
  };

  if (loading) {
    return (
      <div className="flex flex-col w-full min-h-screen bg-white">
        <Navigation />
        <div className="flex-1 flex items-center justify-center">
          <LoadingState loadingState="loading" />
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col w-full min-h-screen bg-white">
        <Navigation />
        <div className="flex-1 flex items-center justify-center">
          <ErrorState error={error} onRetry={() => window.location.reload()} />
        </div>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex flex-col w-full min-h-screen bg-white">
        <Navigation />
        <div className="flex-1 flex flex-col items-center justify-center">
          <h1 className="text-2xl font-semibold text-[#26231E] mb-4">Post Not Found</h1>
          <p className="text-[#75716B] mb-6">The post you&apos;re looking for doesn&apos;t exist.</p>
          <Button
            variant="primary"
            size="large"
            onClick={handleBackToHome}
            className="px-6 py-3"
          >
            Back to Home
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#F9F8F6] text-[#26231E]">
      {/* Navigation Bar */}
      <Navigation />
      
      {/* Hero Image Section */}
      <section className="relative w-[90vw] md:w-[80vw] lg:w-[60vw] h-[260px] sm:h-[320px] md:h-[450px] lg:h-[587px] overflow-hidden rounded-[16px] mx-auto mt-[40px] md:mt-[60px]">
        {post.image && (
          <Image
            src={post.image}
            alt={post.title}
            width={800}
            height={587}
            className="w-full h-full object-cover"
          />
        )}
      </section>
      
      {/* Category and Date below image */}
      <div className="w-[90vw] md:w-[80vw] lg:w-[60vw] mx-auto mt-3 md:mt-4 flex items-center gap-2 md:gap-3 px-4 flex-wrap">
        <span className="bg-[#D7F2E9] text-[#12B279] px-3 py-1 rounded-full text-sm font-medium">
          {post.category}
        </span>
        <span className="text-[#75716B] text-sm">
          {new Date(post.date).toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          })}
        </span>
      </div>

      {/* Main Content */}
      <main className="flex-1 w-[90vw] md:w-[80vw] lg:w-[60vw] mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 justify-center">
          {/* Article Content */}
          <article className="flex-1">
            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#26231E] mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Post Content */}
            <div className="prose prose-lg max-w-none text-[#43403B] leading-relaxed">
              <div className="markdown space-y-4">
                {(() => {
                  const normalized = (post.content || '').replace(/\\n/g, '\n');
                  return (
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {normalized}
                    </ReactMarkdown>
                  );
                })()}
              </div>
            </div>

            {/* Engagement Section */}
            <div className="pt-8">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-8 bg-[#EFEEEB] rounded-2xl opacity-100 h-auto sm:h-20 p-4 sm:pt-4 sm:pr-6 sm:pb-4 sm:pl-6">
                {/* Like Counter */}
                <button 
                  onClick={handleLikeClick}
                  className={`flex items-center justify-center gap-1.5 bg-white rounded-full border border-[#DAD6D1] opacity-100 w-full sm:w-[135px] h-10 sm:h-12 px-4 sm:pt-3 sm:pr-10 sm:pb-3 sm:pl-10 hover:bg-[#EFEEEB] transition-colors cursor-pointer ${
                    userLiked ? 'bg-red-50 border-red-200' : ''
                  }`}
                >
                  <LikeIcon className={`w-6 h-6 ${userLiked ? 'text-red-500 fill-current' : 'text-[#26231E]'}`} />
                  <span className={`font-medium ${userLiked ? 'text-red-500' : 'text-[#26231E]'}`}>
                    {likeCount}
                  </span>
                </button>
                
                {/* Right Side - Copy Link Button and Social Media Icons */}
                <div className="flex items-center gap-4 sm:gap-6 w-full sm:w-auto justify-center sm:justify-end">
                  {/* Copy Link Button */}
                  <button 
                    onClick={handleCopyLink}
                    className="flex items-center justify-center gap-1.5 bg-white rounded-full border border-[#DAD6D1] text-[#26231E] hover:bg-[#EFEEEB] transition-colors opacity-100 flex-1 sm:w-[185px] h-10 sm:h-12 px-3 sm:pt-3 sm:pr-8 sm:pb-3 sm:pl-8"
                  >
                    <CopyLinkIcon className="w-4 h-4 flex-shrink-0" />
                    <span className="text-sm">Copy link</span>
                  </button>
                  
                  {/* Social Media Icons */}
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => handleSocialShare('facebook')}
                      className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-blue-600 flex items-center justify-center text-white hover:bg-blue-700 transition-colors opacity-100"
                    >
                      <FacebookIcon className="w-6 h-6" />
                    </button>
                    <button 
                      onClick={() => handleSocialShare('linkedin')}
                      className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-blue-700 flex items-center justify-center text-white hover:bg-blue-800 transition-colors opacity-100"
                    >
                      <LinkedInIcon className="w-6 h-6" />
                    </button>
                    <button 
                      onClick={() => handleSocialShare('twitter')}
                      className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-blue-400 flex items-center justify-center text-white hover:bg-blue-500 transition-colors opacity-100"
                    >
                      <TwitterIcon className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Comments Section */}
            <div className="mt-8">
              <h3 className="font-medium text-[#75716B] mb-6 text-base leading-6 tracking-normal font-['Poppins']">Comment</h3>
              
              
              {/* Comment Input */}
              <div>
                <textarea
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="What are your thoughts?"
                  className="w-full h-24 p-4 bg-white border border-[#DAD6D1] rounded-lg text-[#26231E] placeholder-[#75716B] resize-none"
                />
                <div className="mt-4 flex justify-end">
                  <button 
                    onClick={handleCommentSubmit}
                    disabled={submittingComment || !commentText.trim()}
                    className="flex items-center gap-1.5 bg-[#26231E] hover:bg-[#1a1a1a] disabled:bg-gray-400 disabled:cursor-not-allowed rounded-full text-white opacity-100 w-[121px] h-12 pt-3 pr-10 pb-3 pl-10 transition-colors cursor-pointer"
                  >
                    <span className="text-sm">
                      {submittingComment ? 'Sending...' : 'Send'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Existing Comments */}
              <div className="space-y-6 mt-8">
                {comments.length > 0 ? (
                  comments.map((comment, index) => (
                    <div 
                      key={comment.id} 
                      className={`flex gap-4 ${index < comments.length - 1 ? 'pb-6 border-b border-dotted border-[#DAD6D1]' : ''}`}
                    >
                      <Image
                        src={comment.user?.avatar_url || "/imgdefault.png"}
                        alt={comment.user?.name || "User"}
                        width={48}
                        height={48}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="mb-2">
                          <div className="font-semibold text-[#26231E] mb-1">
                            {comment.user?.name || "Anonymous"}
                          </div>
                          <div className="text-[#75716B] text-sm">
                            {new Date(comment.created_at).toLocaleDateString('en-US', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric'
                            })} at {new Date(comment.created_at).toLocaleTimeString('en-US', {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </div>
                        </div>
                        <p className="text-[#75716B] font-medium text-base leading-6 tracking-normal text-left">
                          {comment.content}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-[#75716B] text-lg">No comments yet. Be the first to comment!</p>
                  </div>
                )}
              </div>
            </div>
          </article>

          {/* Author Sidebar */}
          <aside className="lg:ml-auto">
            <div className="lg:sticky top-8 border border-[#DAD6D1] w-full md:w-[305px] h-auto md:h-[400px] opacity-100 rounded-2xl p-6 bg-[#EFEEEB]">
              <div className="flex items-start gap-5">
                <Image
                  src="/me.jpg"
                  alt="Pataveekorn C."
                  width={44}
                  height={44}
                  className="w-11 h-11 object-cover flex-shrink-0 rounded-full opacity-100"
                />
                <div className="flex-1">
                  <div className="text-sm text-[#75716B] mb-1">Author</div>
                  <h4 className="text-lg font-semibold text-[#26231E] mb-3">Pataveekorn C.</h4>
                </div>
              </div>
              
              <div className="w-full h-px bg-[#DAD6D1] mb-3"></div>
              <div className="space-y-3 text-[#43403B] text-sm leading-relaxed">
                <p>
                  I am passionate about psychology and personal development, 
                  always seeking ways to grow and improve. 
                  I love reading books that provide new perspectives and insights into self-growth, 
                  emotional intelligence, and mental well-being.
                </p>
                <p>
                  When I&apos;m reading or learning, 
                  I focus on applying these concepts to my daily life, 
                  striving to become a better version of myself.
                </p>
              </div>
            </div>
          </aside>
        </div>

        {/* Back Button */}
        <div className="mt-12 text-center">
          <Button
            variant="ghost"
            size="large"
            onClick={handleBackToHome}
            className="text-[#75716B] hover:text-[#26231E] hover:bg-[#EFEEEB] px-8 py-3"
          >
            ← Back to All Posts
          </Button>
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/10">
          <div className="bg-white rounded-2xl w-[621px] h-[352px] pt-4 pr-6 pb-10 pl-6 mx-4 relative">
            {/* Close Button */}
            <button
              onClick={closeLoginModal}
              className="absolute top-4 right-4 text-black hover:text-gray-600 w-16 h-16 flex items-center justify-center text-[2.5rem] leading-none"
            >
              ×
            </button>
            
            {/* Modal Content */}
            <div className="flex flex-col items-center justify-center h-full text-center">
              <h2 className="font-['Poppins'] font-semibold text-[40px] leading-[48px] text-center text-[#26231E]  hover:text-gray-600 mb-6">
                Create an account to continue
              </h2>
              
              <button
                onClick={handleCreateAccount}
                className="w-[207px] h-[48px] bg-[#26231E] hover:bg-[#1a1a1a] text-white font-medium text-base pt-3 pr-10 pb-3 pl-10 rounded-full transition-colors mb-4"
              >
                Create account
              </button>
              
              <p className="text-base text-[#75716B]">
                Already have an account?{' '}
                <button
                  onClick={handleLogin}
                  className="text-[#26231E] hover:underline font-medium"
                >
                  Log in
                </button>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewPost;
