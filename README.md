# Next.js Blog Application

A modern, full-stack blog application built with Next.js 15, featuring user authentication, blog management, and a responsive design.

## 🚀 Features

- **User Authentication**: Secure signup and login with JWT tokens
- **Blog Management**: Create, read, update, and delete blog posts
- **Category Filtering**: Filter blogs by categories (All, Technology, Startup, Lifestyle)
- **Image Upload**: Cloudinary integration for image storage
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Database**: PostgreSQL with Prisma ORM
- **Modern UI**: Built with Radix UI components and Lucide icons

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT (JSON Web Tokens)
- **Image Storage**: Cloudinary
- **UI Components**: Radix UI, Lucide React
- **Styling**: Tailwind CSS with animations

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd next-blog-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   
   Create a `.env` file in the root directory and add the following variables:
   ```env
   DATABASE_URL=postgresql://blogger_owner:npg_6VGB0CREmZgl@ep-plain-leaf-a8d0qzyl-pooler.eastus2.azure.neon.tech/blogger?sslmode=require
   
   NEXT_PUBLIC_CLOUDINARY_KEY=322395274971586
   NEXT_PUBLIC_CLOUDINARY_SECRET=2blGibaP9XDXXX3jpOOLXVTh5Xo
   ```

4. **Database Setup**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📁 Project Structure

```
next-blog-app/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── blogs/         # Blog CRUD operations
│   │   ├── login/         # Authentication endpoints
│   │   └── signup/        
│   ├── blogs/             # Blog pages
│   │   ├── create/        # Create blog page
│   │   └── [id]/          # Individual blog page
│   ├── login/             # Login page
│   ├── signup/            # Signup page
│   └── page.js            # Home page
├── Components/            # Reusable components
│   ├── BlogItem.jsx       # Individual blog card
│   ├── BlogList.jsx       # Blog listing with filters
│   ├── Footer.jsx         # Footer component
│   └── Header.jsx         # Navigation header
├── Assets/                # Static assets and images
├── prisma/                # Database schema and migrations
├── utils/                 # Utility functions
└── components/ui/         # UI components
```

## 🔐 Authentication

The application uses JWT-based authentication with the following features:
- User registration with email and password
- Secure password hashing with bcryptjs
- Protected routes for blog creation and management
- Token-based session management

## 📝 API Endpoints

### Authentication
- `POST /api/signup` - User registration
- `POST /api/login` - User login

### Blogs
- `GET /api/blogs` - Fetch all blogs
- `POST /api/blogs` - Create a new blog (authenticated)
- `GET /api/blogs/[id]` - Fetch specific blog
- `PUT /api/blogs/[id]` - Update blog (authenticated)
- `DELETE /api/blogs/[id]` - Delete blog (authenticated)

## 🎨 UI Components

The application uses a modern component library including:
- **Radix UI**: Accessible, unstyled UI primitives
- **Lucide React**: Beautiful, customizable icons
- **Tailwind CSS**: Utility-first CSS framework
- **Custom animations**: Smooth transitions and interactions

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Manual Deployment
```bash
npm run build
npm start
```

## 📱 Features Overview

### Home Page
- Display all blog posts with category filtering
- Responsive grid layout
- Search and filter functionality

### Blog Management
- Create new blog posts with rich content
- Upload and manage images
- Edit and delete existing posts
- Category assignment

### User Authentication
- Secure user registration and login
- Protected routes for authenticated users
- Session management with JWT tokens

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework for production
- [Prisma](https://prisma.io/) - Next-generation ORM for Node.js and TypeScript
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
- [Radix UI](https://radix-ui.com/) - Low-level UI primitives
- [Cloudinary](https://cloudinary.com/) - Image and video management

---

**Note:** This project was created for educational purposes. The database credentials shown are for demonstration only and should be replaced with your own secure credentials in production.
