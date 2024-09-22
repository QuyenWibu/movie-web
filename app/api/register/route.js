

import { User } from '../../../models/User';
import connectDB from '../../../lib/db';
import bcrypt from 'bcryptjs';

export async function POST(req) {
  await connectDB();

  if (req.method === 'POST') {
    try {
      const { email, password, firstName, lastName } = await req.json();

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return new Response(JSON.stringify({ message: 'User already exists' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        email,
        password: hashedPassword,
        firstName,
        lastName,
      });

      await newUser.save();

      return new Response(JSON.stringify({ message: 'User created successfully' }), {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      console.error(error);
      return new Response(JSON.stringify({ message: 'Error creating user' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }

  return new Response(JSON.stringify({ message: 'Method not allowed' }), {
    status: 405,
    headers: { 'Content-Type': 'application/json' },
  });
}