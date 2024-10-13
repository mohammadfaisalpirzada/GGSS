'use client';

import React, { useState } from 'react';

const StudentForm = () => {
  const initialFormData = {
    grNumber: '234',  // GR# as number input
    studentName: 'gdfg',
    fathersName: 'dfgsd',
    gender: 'Female',
    religion: 'Islam',  // Default to Islam
    contactNumber: '563456347',  // Number input for Contact Number
    cnicBForm: '42101-1234456-9',  // String input for CNIC
    dateOfBirth: '15/05/2002',
    fatherMotherCnic: '42101-1234456-9',
    guardianName: 'sdfasdfsd',
    guardianCnic: '42101-1234456-9',
    guardianRelation: 'Grandchild',
    studentClass: 'ECE',  // Default to ECE
    classSection: 'Girls',  // Default to Boys
    dateOfAdmission: '2024-11-07',
  };

  const [formData, setFormData] = useState(initialFormData);
  const [cnicError, setCnicError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    // Only allow numbers for numeric fields
    if ((name === 'grNumber' || name === 'contactNumber') && !/^\d*$/.test(value)) {
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleCnicBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Handle CNIC formatting on blur
    if (value.length === 13) {
      const formattedCnic = `${value.slice(0, 5)}-${value.slice(5, 12)}-${value.slice(12)}`;
      setFormData({ ...formData, [name]: formattedCnic });
      setCnicError('');
    } else if (value.length > 0) {
      setCnicError('CNIC should be exactly 13 digits before formatting.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/save-student-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          ...formData,
          grNumber: Number(formData.grNumber),  // Convert numeric fields to numbers
          contactNumber: Number(formData.contactNumber),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Unknown error occurred');
      }

      const responseData = await response.json();
      alert(`Data saved successfully! GR#: ${responseData.data.grNumber}`);

      // Reset form fields after successful submission
      setFormData(initialFormData);
    } catch (error) {
      alert(`Error occurred while submitting the form: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
        <h1 className="text-2xl font-bold mb-6 text-center text-blue-600">G.G.S.S Nishtar Road Students Data Form!</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* GR# Field */}
          <div className="flex flex-col">
            <label className="font-semibold text-black">GR#:</label>
            <input
              type="number"
              name="grNumber"
              value={formData.grNumber}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-md text-black"
              required
            />
          </div>

          {/* Student Name Field */}
          <div className="flex flex-col">
            <label className="font-semibold text-black">Student Name:</label>
            <input
              type="text"
              name="studentName"
              value={formData.studentName}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-md text-black"
              required
            />
          </div>

          {/* Father's Name Field */}
          <div className="flex flex-col">
            <label className="font-semibold text-black">Father's Name:</label>
            <input
              type="text"
              name="fathersName"
              value={formData.fathersName}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-md text-black"
              required
            />
          </div>

          {/* Gender Field */}
          <div className="flex flex-col">
            <label className="font-semibold text-black">Gender:</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-md text-black"
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          {/* Religion Field */}
          <div className="flex flex-col">
            <label className="font-semibold text-black">Religion:</label>
            <select
              name="religion"
              value={formData.religion}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-md text-black"
              required
            >
              <option value="Islam">Islam</option>
              <option value="Christianity">Christianity</option>
              <option value="Hinduism">Hinduism</option>
            </select>
          </div>

          {/* Contact Number Field */}
          <div className="flex flex-col">
            <label className="font-semibold text-black">Contact Number:</label>
            <input
              type="number"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-md text-black"
              required
            />
          </div>

          {/* CNIC / B-Form Field */}
          <div className="flex flex-col">
            <label className="font-semibold text-black">CNIC / B-Form:</label>
            <input
              type="text"
              name="cnicBForm"
              value={formData.cnicBForm}
              onChange={handleChange}
              onBlur={handleCnicBlur}
              className="border border-gray-300 p-2 rounded-md text-black"
              required
              maxLength={15}
            />
            {cnicError && <p className="text-red-500 text-sm">{cnicError}</p>}
          </div>

          {/* Date of Birth Field */}
          <div className="flex flex-col">
            <label className="font-semibold text-black">Date of Birth:</label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-md text-black"
              required
            />
          </div>

          {/* Father's/Mother's CNIC Field */}
          <div className="flex flex-col">
            <label className="font-semibold text-black">Father/Mother's CNIC:</label>
            <input
              type="text"
              name="fatherMotherCnic"
              value={formData.fatherMotherCnic}
              onChange={handleChange}
              onBlur={handleCnicBlur}
              className="border border-gray-300 p-2 rounded-md text-black"
              required
              maxLength={15}
            />
          </div>

          {/* Guardian Name Field */}
          <div className="flex flex-col">
            <label className="font-semibold text-black">Guardian Name:</label>
            <input
              type="text"
              name="guardianName"
              value={formData.guardianName}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-md text-black"
              required
            />
          </div>

          {/* Guardian CNIC Field */}
          <div className="flex flex-col">
            <label className="font-semibold text-black">Guardian CNIC:</label>
            <input
              type="text"
              name="guardianCnic"
              value={formData.guardianCnic}
              onChange={handleChange}
              onBlur={handleCnicBlur}
              className="border border-gray-300 p-2 rounded-md text-black"
              required
              maxLength={15}
            />
          </div>

          {/* Guardian Relation Field */}
          <div className="flex flex-col">
            <label className="font-semibold text-black">Guardian Relation:</label>
            <input
              type="text"
              name="guardianRelation"
              value={formData.guardianRelation}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-md text-black"
              required
            />
          </div>

          {/* Student Class Field */}
          <div className="flex flex-col">
            <label className="font-semibold text-black">Student Class:</label>
            <select
              name="studentClass"
              value={formData.studentClass}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-md text-black"
              required
            >
              <option value="ECE">ECE</option>
              <option value="I">I</option>
              <option value="II">II</option>
              <option value="III">III</option>
              <option value="IV">IV</option>
              <option value="V">V</option>
              <option value="VI">VI</option>
              <option value="VII">VII</option>
              <option value="VIII">VIII</option>
              <option value="IX">IX</option>
              <option value="X">X</option>
            </select>
          </div>

          {/* Class Section Field */}
          <div className="flex flex-col">
            <label className="font-semibold text-black">Class Section:</label>
            <select
              name="classSection"
              value={formData.classSection}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-md text-black"
              required
            >
              <option value="Boys">Boys</option>
              <option value="Girls">Girls</option>
            </select>
          </div>

          {/* Date of Admission Field */}
          <div className="flex flex-col">
            <label className="font-semibold text-black">Date of Admission:</label>
            <input
              type="date"
              name="dateOfAdmission"
              value={formData.dateOfAdmission}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-md text-black"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default StudentForm;
