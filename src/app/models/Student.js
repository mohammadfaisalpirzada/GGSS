import mongoose from 'mongoose';

const StudentSchema = new mongoose.Schema({
  grNumber: String,
  studentName: String,
  fathersName: String,
  gender: String,
  religion: String,
  contactNumber: String,
  cnicBForm: String,
  dateOfBirth: String,
  fatherMotherCnic: String,
  guardianName: String,
  guardianCnic: String,
  guardianRelation: String,
  studentClass: String,
  classSection: String,
  dateOfAdmission: String,
});

const Student = mongoose.models.Student || mongoose.model('Student', StudentSchema);

export default Student;
