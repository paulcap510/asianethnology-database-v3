import React, { useState, useEffect } from 'react';
import DOMPurify from 'dompurify';

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [allArticles, setAllArticles] = useState([]);

  useEffect(() => {
    fetch('/articles.json')
      .then((response) => response.json())
      .then((data) => {
        setAllArticles(data);
      })
      .catch((error) => {
        console.error('Error fetching articles:', error);
      });
  }, []);

  const checkRateLimit = async () => {
    try {
      const response = await fetch('/.netlify/functions/rate-limit');
      if (response.status === 429) {
        alert('Too many requests. Please try again later.');
        return false;
      }
      return true;
    } catch (error) {
      console.error('Error checking rate limit:', error);
      return false;
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    console.log(`Searching for: ${query}`);

    const allowed = await checkRateLimit();
    if (!allowed) return;

    const cleanQuery = DOMPurify.sanitize(query);

    const filteredResults = allArticles.filter(
      (article) =>
        article.Title.toLowerCase().includes(cleanQuery.toLowerCase()) ||
        article.Author.toLowerCase().includes(cleanQuery.toLowerCase()) ||
        article.Keywords.toLowerCase().includes(cleanQuery.toLowerCase()) ||
        article.Abstract.toLowerCase().includes(cleanQuery.toLowerCase()) ||
        article.JournalIssueAndVolume.toLowerCase().includes(
          cleanQuery.toLowerCase()
        ) ||
        article.ArticleType.toLowerCase().includes(cleanQuery.toLowerCase()) ||
        article.Subtitle.toLowerCase().includes(cleanQuery.toLowerCase())
    );

    setResults(filteredResults);
  };

  return (
    <div className="bg-orange-500 min-h-screen w-full flex flex-col items-center justify-center px-4">
      <h1
        className={`text-4xl font-extrabold text-center text-white mb-8 ${
          results.length > 0 ? 'mt-12' : ''
        }`}
      >
        Asian Ethnology Search
      </h1>
      <h5 className="text-white mb-4">
        Please note: initial search may take up to 5 seconds to return results.
      </h5>

      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-6xl">
        <form onSubmit={handleSearch} className="flex mb-6">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search..."
            className="flex-1 p-2 border border-gray-300 rounded-l-lg focus:outline-none"
          />
          <button
            type="submit"
            className="bg-orange-600 text-white p-2 rounded-r-lg hover:bg-orange-700"
          >
            Search
          </button>
        </form>
        <div className="max-h-96 overflow-y-auto">
          {results.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-300">
                <thead className="sticky top-0 bg-gray-200">
                  <tr>
                    <th className="py-2 px-4 border-b-2 border-gray-300">
                      Journal Issue and Volume
                    </th>
                    <th className="py-2 px-4 border-b-2 border-gray-300">
                      Article Type
                    </th>
                    <th className="py-2 px-4 border-b-2 border-gray-300">
                      Title
                    </th>
                    <th className="py-2 px-4 border-b-2 border-gray-300">
                      Subtitle
                    </th>
                    <th className="py-2 px-4 border-b-2 border-gray-300">
                      Author
                    </th>
                    <th className="py-2 px-4 border-b-2 border-gray-300">
                      Keywords
                    </th>
                    <th className="py-2 px-4 border-b-2 border-gray-300">
                      URL
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((result, index) => (
                    <tr key={index} className="hover:bg-gray-100">
                      <td className="py-2 px-4 border-b border-gray-300">
                        {result.JournalIssueAndVolume}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-300">
                        {result.ArticleType}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-300">
                        {result.Title}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-300">
                        {result.Subtitle}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-300">
                        {result.Author}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-300">
                        {result.Keywords}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-300 whitespace-nowrap">
                        <a
                          href={result.URL}
                          className="text-blue-500 hover:underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Link
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500 text-center">No results found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
