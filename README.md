# Nayab Gemstone E-commerce Platform

A comprehensive Next.js e-commerce application for gemstone sales with MongoDB integration, user authentication, and admin panel.

## Features

- **User Authentication**: Role-based access control (admin/customer)
- **Product Management**: Full CRUD operations for gemstone listings
- **Shopping Cart**: Persistent cart with session management
- **Payment Integration**: Secure Stripe payment processing
- **Order Management**: Complete order tracking and management system
- **Admin Panel**: Comprehensive dashboard for managing products, orders, and users
- **Responsive Design**: Mobile-first design with elegant gemstone-focused aesthetics

## Technology Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT with secure cookie storage
- **Payments**: Stripe integration
- **UI Components**: shadcn/ui with Radix UI primitives
- **Animations**: Framer Motion

## Getting Started

### Prerequisites

- Node.js 18+ 
- MongoDB (local or cloud instance)
- Stripe account for payment processing

### Installation

1. Clone the repository and install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.local.example .env.local
```

Update the `.env.local` file with your actual values:
- MongoDB connection string
- JWT secret key
- Stripe API keys

3. Seed the database with sample data:
```bash
node seeder.js
```

4. Start the development server:
```bash
npm run dev
```

Visit `http://localhost:3000` to see the application.

## Default Accounts

After running the seeder, you can log in with these accounts:

**Admin Account:**
- Email: admin@nayabgemstone.com  
- Password: admin123

**Customer Account:**
- Email: john@example.com
- Password: customer123

## Database Models

### User
- Authentication and user management
- Role-based access control
- Wishlist functionality

### Product
- Comprehensive gemstone information
- Category association
- Stock management
- Ratings and reviews

### Category
- Product categorization
- SEO-friendly slugs

### Order
- Complete order tracking
- Payment status management
- Shipping information

### Review
- Product reviews and ratings
- User feedback system

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Products
- `GET /api/products` - Get products with filtering
- `POST /api/products` - Create product (admin only)
- `GET /api/products/[id]` - Get single product
- `PUT /api/products/[id]` - Update product (admin only)
- `DELETE /api/products/[id]` - Delete product (admin only)

### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create category (admin only)

### Orders
- `GET /api/orders` - Get orders (user's orders or all for admin)
- `POST /api/orders` - Create new order
- `PUT /api/orders/[id]` - Update order status (admin only)

### Payments
- `POST /api/payment/create-intent` - Create Stripe payment intent

## Admin Features

- **Dashboard**: Overview of sales, orders, and user metrics
- **Product Management**: Add, edit, delete products with image galleries
- **Order Management**: Track orders, update status, manage fulfillment
- **User Management**: View and manage customer accounts
- **Analytics**: Sales reporting and business insights

## Deployment

This application can be deployed to any platform that supports Next.js:

1. **Vercel**: One-click deployment with automatic builds
2. **Netlify**: Static export with serverless functions
3. **AWS/Google Cloud**: Container deployment with managed databases

For production deployment:
1. Set up a production MongoDB instance
2. Configure production Stripe keys
3. Set strong JWT secrets
4. Enable HTTPS for secure authentication

## Security Features

- JWT-based authentication with secure HTTP-only cookies
- Password hashing with bcrypt
- Role-based access control
- Input validation and sanitization
- Secure payment processing with Stripe

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and ensure code quality
5. Submit a pull request

## License

This project is licensed under the MIT License.