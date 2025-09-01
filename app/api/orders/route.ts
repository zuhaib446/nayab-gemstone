import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Order from '@/models/Order';
import Product from '@/models/Product';
import { getCurrentUser } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    
    if (!user) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();

    let query: any = {};
    if (user.role !== 'admin') {
      query.userId = user.id;
    }

    const orders = await Order.find(query)
      .populate('userId', 'name email')
      .populate('products.productId', 'name images price')
      .sort({ createdAt: -1 });

    return NextResponse.json(orders);
  } catch (error) {
    console.error('Orders fetch error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    
    if (!user) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();

    const orderData = await request.json();
    
    // Verify stock availability
    for (const item of orderData.products) {
      const product = await Product.findById(item.productId);
      if (!product || product.stock < item.quantity) {
        return NextResponse.json(
          { message: `Insufficient stock for ${product?.name || 'product'}` },
          { status: 400 }
        );
      }
    }

    const order = new Order({
      ...orderData,
      userId: user.id,
    });

    await order.save();

    // Update product stock
    for (const item of orderData.products) {
      await Product.findByIdAndUpdate(
        item.productId,
        { $inc: { stock: -item.quantity } }
      );
    }

    const populatedOrder = await Order.findById(order._id)
      .populate('products.productId', 'name images price');

    return NextResponse.json(populatedOrder, { status: 201 });
  } catch (error: any) {
    console.error('Order creation error:', error);
    return NextResponse.json(
      { message: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}