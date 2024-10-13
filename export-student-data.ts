import { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';
import Student from '@/models/Student'; // Adjust the path based on your project structure
import { utils, write } from 'xlsx';

// MongoDB connection string
const MONGO_URI = 'mongodb+srv://mohammadfaisalpirzada:shazz4001@cluster0.6uyke.mongodb.net/';

// Connect to MongoDB
async function connectToDatabase() {
  if (mongoose.connection.readyState >= 1) return; // Already connected
  await mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Connect to MongoDB
    await connectToDatabase();

    // Fetch all student data
    const students = await Student.find({});

    // Prepare data for Excel
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

    // Create a new workbook and add the worksheet
    const worksheet = utils.json_to_sheet(worksheetData);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, 'Students');

    // Generate Excel file
    const excelBuffer = write(workbook, { bookType: 'xlsx', type: 'buffer' });

    // Set headers to download the file
    res.setHeader('Content-Disposition', 'attachment; filename="students_data.xlsx"');
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

    // Send the generated Excel file
    res.status(200).send(excelBuffer);
  } catch (error) {
    console.error('Error exporting data to Excel:', error);
    res.status(500).json({ message: 'Error exporting data to Excel.' });
  }
}
