'use client';

import React, { useState, useEffect } from 'react';

const StudentForm = () => {
  // const initialFormData = {
  //   grNumber: '',
  //   studentName: '',
  //   fathersName: '',
  //   gender: 'Female',
  //   religion: 'Islam',
  //   contactNumber: '',
  //   cnicBForm: '',
  //   dateOfBirth: '',
  //   fatherMotherCnic: '',
  //   guardianName: '',
  //   guardianCnic: '',
  //   guardianRelation: 'Father',
  //   studentClass: 'ECE',
  //   classSection: 'Girls',
  //   dateOfAdmission: '',
  // };

  const initialFormData = {
    grNumber: '105',
    studentName: 'Eshal',
    fathersName: 'Muhammad Faisal Peerzada',
    gender: 'Female',
    religion: 'Islam',
    contactNumber: '03458340669',
    cnicBForm: '4210113754684',
    dateOfBirth: '2010-12-13',
    fatherMotherCnic: '4210113754684',
    guardianName: 'Asma',
    guardianCnic: '4210113754684',
    guardianRelation: 'Grandmother',
    studentClass: 'IX',
    classSection: 'Girls',
    dateOfAdmission: '2014-10-17',
  };


  const [formData, setFormData] = useState(initialFormData);
  const [cnicError, setCnicError] = useState('');

  // Pre-fill Guardian's name and CNIC based on father's info
  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      guardianName: prevFormData.fathersName,
      guardianCnic: prevFormData.fatherMotherCnic,
    }));
  }, [formData.fathersName, formData.fatherMotherCnic]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    // Allow only digits for GR# and contact number
    if ((name === 'grNumber' || name === 'contactNumber') && !/^\d*$/.test(value)) {
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleCnicBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // CNIC formatting
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
          grNumber: Number(formData.grNumber),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Unknown error occurred');
      }

      const responseData = await response.json();
      alert(`Data saved successfully! GR#: ${responseData.data.grNumber}`);

      // Reset the form after successful submission
      setFormData(initialFormData);
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(`Error occurred while submitting the form: ${error.message}`);
      } else {
        alert('An unknown error occurred.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
        <h1 className="text-2xl font-bold mb-6 text-center text-blue-600">Student Form</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
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
            <label className="font-semibold text-black">Fathers Name:</label>
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
              <option value="Other">Other</option>
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
            <label className="font-semibold text-black">Students CNIC / B-Form:</label>
            <input
              type="text"
              name="cnicBForm"
              value={formData.cnicBForm}
              onChange={handleChange}
              onBlur={handleCnicBlur}
              className="border border-gray-300 p-2 rounded-md text-black"
              required
              maxLength={13} // Only allow 13 digits
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
            <label className="font-semibold text-black">Father/Mothers CNIC:</label>
            <input
              type="text"
              name="fatherMotherCnic"
              value={formData.fatherMotherCnic}
              onChange={handleChange}
              onBlur={handleCnicBlur}
              className="border border-gray-300 p-2 rounded-md text-black"
              required
              maxLength={13}
            />
          </div>

          {/* Guardian Name Field */}
          <div className="flex flex-col">
            <label className="font-semibold text-black">Guardian Name:</label>
            <input
              type="text"
              name="guardianName"
              value={formData.guardianName}  // Pre-filled with Father's Name
              onChange={handleChange}  // Allow user to modify it if needed
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
              value={formData.guardianCnic}  // Pre-filled with Father's CNIC
              onChange={handleChange}  // Allow user to modify it if needed
              onBlur={handleCnicBlur}
              className="border border-gray-300 p-2 rounded-md text-black"
              required
              maxLength={13}
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
