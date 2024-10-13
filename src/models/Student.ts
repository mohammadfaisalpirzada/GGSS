import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  grNumber: { type: Number, required: true },  // Use Number for GR#
  studentName: { type: String, required: true },
  fathersName: { type: String, required: true },
  gender: { type: String, required: true },
  religion: { type: String, required: true },
  contactNumber: { type: Number, required: true },  // Use Number for Contact Number
  cnicBForm: { type: String, required: true },  // CNIC should remain a string due to format
  dateOfBirth: { type: String, required: true },
  fatherMotherCnic: { type: String, required: true },  // CNIC should remain a string
  guardianName: { type: String, required: true },
  guardianCnic: { type: String, required: true },  // CNIC should remain a string
  guardianRelation: { type: String, required: true },
  studentClass: { type: String, required: true },
  classSection: { type: String, required: true },
  dateOfAdmission: { type: String, required: true },
});

const Student = mongoose.models.Student || mongoose.model('Student', studentSchema);

export default Student;
