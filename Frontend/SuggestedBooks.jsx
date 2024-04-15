import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import Back from '../components/Back';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';

const SuggestedBooks = () => {
  const [suggestedBooks, setSuggestedBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5000/suggested-books')
      .then((response) => {
        console.log('Response data:', response.data);
        setSuggestedBooks(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching suggested books:', error);
        setLoading(false);
      });
  }, []);
  

  return (
    <div className='p-4'>
      <Back />
      <h1 className='text-3xl my-8'>Suggested Books for You</h1>
      {loading ? (
        <Spinner />
      ) :
        <table className='w-full border-separate border-spacing-2'>
         <thead>
          <tr>
            <th className='border border-slate-600 rounded-md'>No</th>
            <th className='border border-slate-600 rounded-md'>Title</th>
            <th className='border border-slate-600 rounded-md'>Genre</th>
            <th className='border border-slate-600 rounded-md'>Add</th>
          </tr>
        </thead>
        <tbody>
        {suggestedBooks.map((book, index) => (
          <tr key={book._id} className='h-8'>
            <td className='border border-slate-700 rounded-md text-center'>
              {index + 1}
            </td>
            <td className='border border-slate-700 rounded-md text-center'>
              {book.title}
            </td>
            <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
              {book.genre}
            </td>
            <td className='border border-slate-700 rounded-md text-center'>
              <div className='flex justify-center gap-x-4'>
                <Link to={'/books/create'}>
                  <BsInfoCircle className='text-2xl text-green-800' />
                </Link>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
        </table>
}
    </div>
  );
};

export default SuggestedBooks;
