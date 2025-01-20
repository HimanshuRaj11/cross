// components/AboutSection.tsx
import React from 'react';



const AboutSection = ({ email, hobbies, professionalInfo }: { email: string, hobbies: any, professionalInfo: any }) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-xl font-bold mb-4">About</h3>
            <p><strong>Email:</strong> {email}</p>
            <p><strong>Hobbies:</strong> {hobbies.join(', ')}</p>
            <p><strong>Professional Info:</strong> {professionalInfo}</p>
        </div>
    );
};

export default AboutSection;