import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/app/utils/db';
import Student from '@/app/models/Student';

export async function POST(req: Request) {
  try {
    await connectToDatabase();

    const data = await req.json();
    const newStudent = new Student(data);
    await newStudent.save();

    return NextResponse.json({ message: 'Data saved successfully!', data: newStudent });
  } catch (error: unknown) {
    console.error('Error saving data:', error);
    return NextResponse.json({ message: 'Error saving data.', error: (error as Error).message }, { status: 500 });
  }
}
