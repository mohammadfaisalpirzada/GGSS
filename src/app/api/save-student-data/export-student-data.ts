// /pages/api/export-student-data.ts
import { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';
import Student from '@/models/Student'; // Ensure this path is correct
import { utils, write } from 'xlsx';

// MongoDB connection string
const MONGO_URI = 'mongodb+srv://mohammadfaisalpirzada:shazz4001@cluster0.6uyke.mongodb.net/';

// Connect to MongoDB
async function connectToDatabase() {
  if (mongoose.connection.readyState >= 1) return; // Already connected
  try {
    await mongoose.connect(MONGO_URI); // No need for useNewUrlParser or useUnifiedTopology
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw new Error('Failed to connect to MongoDB');
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Connect to MongoDB
    await connectToDatabase();

    // Fetch all student data
    const students = await Student.find({});

    // Prepare data for Excel export
    const worksheetData = students.map((student) => ({
      'GR#': student.grNumber,
      'Student Name': student.studentName,
      "Father's Name": student.fathersName,
      Gender: student.gender,
      Religion: student.religion,
      'Contact Number': student.contactNumber,
      'CNIC / B-Form': student.cnicBForm,
      'Date of Birth': student.dateOfBirth,
      "Father/Mother's CNIC": student.fatherMotherCnic,
      'Guardian Name': student.guardianName,
      'Guardian CNIC': student.guardianCnic,
      'Guardian Relation': student.guardianRelation,
      'Student Class': student.studentClass,
      'Class Section': student.classSection,
      'Date of Admission': student.dateOfAdmission,
    }));

    // Create Excel workbook and worksheet
    const worksheet = utils.json_to_sheet(worksheetData);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, 'Students');

    // Generate the Excel file as a buffer
    const excelBuffer = write(workbook, { bookType: 'xlsx', type: 'buffer' });

    // Set headers to prompt download
    res.setHeader('Content-Disposition', 'attachment; filename="students_data.xlsx"');
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

    // Send the buffer containing the Excel file
    res.status(200).send(excelBuffer);
  } catch (error: unknown) {
    console.error('Error exporting data to Excel:', error);
    res.status(500).json({ message: 'Error exporting data to Excel.' });
  }
}
