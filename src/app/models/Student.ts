import { Schema, model, models } from 'mongoose';

const studentSchema = new Schema({
  grNumber: { type: Number, required: true },
  studentName: { type: String, required: true },
  fathersName: { type: String, required: true },
  gender: { type: String, required: true },
  religion: { type: String, required: true },
  contactNumber: { type: String, required: true },
  cnicBForm: { type: String, required: true },
  dateOfBirth: { type: String, required: true },
  fatherMotherCnic: { type: String, required: true },
  guardianName: { type: String, required: true },
  guardianCnic: { type: String, required: true },
  guardianRelation: { type: String, required: true },
  studentClass: { type: String, required: true },
  classSection: { type: String, required: true },
  dateOfAdmission: { type: String, required: true },
});

const Student = models.Student || model('Student', studentSchema);

export default Student;
