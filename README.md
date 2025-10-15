# Personal Blog Platform

A modern, responsive personal blog platform built with Next.js, featuring user authentication, content management, and social engagement features. This project demonstrates full-stack development skills with a focus on user experience and responsive design.

## 🚀 Live Demo

[View Live Demo](my-personal-blog-project-sooty.vercel.app) *(Replace with your actual deployment URL)*

## ✨ What I Built

### 🔐 Authentication System
- **User Registration & Login** - Complete auth flow with Supabase Auth
- **Profile Management** - User profiles with avatar upload to Supabase Storage
- **Password Reset** - Secure password reset functionality
- **Protected Admin Routes** - Role-based access control for admin features

### 📝 Content Management System
- **Admin Dashboard** - Full admin panel with article and category management
- **Article CRUD** - Create, read, update, delete blog posts
- **Category Management** - Organize posts by categories (Cat, General, Inspiration)
- **Image Handling** - Support for featured images and profile pictures
- **Rich Content** - Markdown rendering with React Markdown

### 🎨 Responsive UI/UX
- **Mobile-First Design** - Fully responsive across all devices
- **Custom Components** - Built reusable UI components with Radix UI
- **Loading States** - Implemented smooth loading animations and error handling
- **Form Validation** - Client-side validation with real-time feedback
- **Accessibility** - Proper ARIA labels and keyboard navigation

### 📱 Social Features
- **Like System** - Users can like/unlike posts with database persistence
- **Comment System** - Real-time commenting with user avatars
- **Social Sharing** - Share posts on Facebook, LinkedIn, and Twitter
- **Copy Link** - One-click link copying with toast notifications

### 🔧 Technical Implementation
- **Hybrid Data Sources** - Integrated Supabase database with external API
- **Error Handling** - Comprehensive error handling with fallback to mock data
- **Performance Optimization** - Image optimization with Next.js Image component
- **State Management** - React Context for authentication and global state

## 🛠️ Technologies I Used

### Frontend Development
- **Next.js 15** - React framework with Pages Router and Turbopack
- **React 19** - Modern React with hooks, context, and concurrent features
- **Tailwind CSS** - Utility-first CSS framework for responsive design
- **JavaScript (ES6+)** - Modern JavaScript with async/await patterns

### Backend & Database
- **Supabase** - Backend-as-a-Service with PostgreSQL database
- **Supabase Auth** - Authentication system with email/password
- **Supabase Storage** - File upload system for images
- **External API Integration** - Hybrid data fetching from multiple sources

### UI/UX Libraries
- **Radix UI** - Accessible component primitives (@radix-ui/react-dialog, @radix-ui/react-separator, @radix-ui/react-slot, @radix-ui/react-tooltip)
- **Lucide React** - Beautiful icon library for consistent iconography
- **React Markdown** - Markdown rendering for rich blog content
- **Sonner** - Toast notification system for user feedback

### Development Tools
- **Class Variance Authority** - Component variant management
- **Tailwind Merge** - Conditional styling utility
- **Tailwind Animate** - Animation utilities
- **CLSX** - Conditional class name utility

## 📁 My Project Structure

```
src/
├── components/          # Reusable UI components I built
│   ├── admin/          # Admin panel components (AdminSidebar, DeleteConfirmModal)
│   ├── blog/           # Blog components (ArticleCard, ArticleGrid, HeroSection)
│   ├── layout/         # Layout components (Navigation, Footer)
│   └── ui/             # Base UI components (Button, Input, Card, etc.)
├── contexts/           # React Context for authentication state
├── hooks/              # Custom React hooks (use-mobile)
├── lib/                # Utility libraries (Supabase config, utils)
├── pages/              # Next.js pages I created
│   ├── admin/          # Admin dashboard (11 pages total)
│   │   ├── login.jsx
│   │   ├── article-management.jsx
│   │   ├── category-management.jsx
│   │   ├── create-article.jsx
│   │   ├── create-category.jsx
│   │   ├── edit-article/[id].jsx
│   │   ├── edit-category/[id].jsx
│   │   ├── notifications.jsx
│   │   ├── profile.jsx
│   │   └── reset-password.jsx
│   ├── post/[id].jsx   # Individual blog post page
│   ├── index.jsx       # Homepage with blog listing
│   ├── login.jsx       # User login page
│   ├── register.jsx    # User registration page
│   ├── profile.jsx     # User profile page
│   └── reset-password.jsx # Password reset page
├── services/           # API service functions I wrote
└── styles/             # Global styles and design system
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, or pnpm
- Supabase account

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/your-username/personal-blog.git
cd personal-blog
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Environment Setup**
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

4. **Run the development server**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Key Features I Implemented

### Authentication Flow
- **Complete Auth System** - Built registration, login, logout, and password reset
- **Protected Routes** - Implemented route protection for admin and user pages
- **Context Management** - Created AuthContext for global authentication state
- **Session Handling** - Persistent login sessions with Supabase Auth

### Admin Dashboard
- **11 Admin Pages** - Complete admin panel with CRUD operations
- **Article Management** - Create, edit, delete, and manage blog posts
- **Category Management** - Organize content with category system
- **User Management** - Profile management and password reset functionality

### Data Management
- **Hybrid Data Sources** - Integrated Supabase database with external API
- **Fallback System** - Mock data fallback when external API is unavailable
- **Real-time Updates** - Like counts and comments update in real-time
- **Image Upload** - Profile pictures and featured images with Supabase Storage

### Responsive Design
- **Mobile-First Approach** - Designed for mobile devices first, then desktop
- **Grid Layouts** - Responsive grid systems for different screen sizes
- **Touch-Friendly** - Optimized for touch interactions on mobile devices
- **Cross-Browser Compatibility** - Tested across different browsers and devices

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: 1024px+

## 🔒 Security Features

- **Authentication**: Secure user authentication with Supabase Auth
- **Authorization**: Role-based access control for admin features
- **Input Validation**: Client and server-side validation
- **XSS Protection**: Sanitized content rendering
- **CSRF Protection**: Built-in Next.js CSRF protection

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms
The app can be deployed on any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Pataveekorn C.**
- Portfolio: [Your Portfolio URL]
- LinkedIn: [Your LinkedIn Profile]
- Email: your.email@example.com

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing framework
- [Supabase](https://supabase.com/) for backend services
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Radix UI](https://www.radix-ui.com/) for accessible components

---

⭐ **Star this repository if you found it helpful!**
