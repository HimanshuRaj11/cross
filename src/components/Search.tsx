"use client"
import React, { useState } from 'react';

type ResultType = 'post' | 'reel' | 'user';

interface Result {
    id: number;
    type: ResultType;
    content: string;
}

const mockResults: Result[] = [
    { id: 1, type: 'post', content: 'This is a post' },
    { id: 2, type: 'reel', content: 'This is a reel' },
    { id: 3, type: 'user', content: 'User: John Doe' },
];

function Searchbox() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<Result[]>([]);

    const handleChange = (e: any) => {
        const { value } = e.target;
        setQuery(value)

        const filteredResults = mockResults.filter(result =>
            result.content.toLowerCase().includes(query.toLowerCase())
        );
        setResults(filteredResults);
    };

    return (
        <div className="max-w-lg mx-auto p-4 h-[80vh] w-[80vw] lg:w-[40vw]">
            <div className="mb-4">
                <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Search..."
                    value={query}
                    onChange={handleChange}
                />

            </div>
            <div className="space-y-4">
                {results.map((result, index) => (
                    <div
                        key={index}
                        className="p-4 border border-gray-200 rounded shadow-sm"
                    >
                        <h3 className="font-bold capitalize">{result.type}</h3>
                        <p>{result.content}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Searchbox;