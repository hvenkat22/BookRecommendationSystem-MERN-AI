import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import BooksTable from '../components/home/BookTable';
import BooksCard from '../components/home/BookCard';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState('table');
  const [suggestedBooks, setSuggestedBooks] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:4444/books')
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const getSuggestedBooks = () => {
    axios
      .post('http://localhost:5000/suggested-books', { data: books })
      .then((response) => {
        console.log('Response data:', response.data);
        setSuggestedBooks(response.data);
      })
      .catch((error) => {
        console.error('Error fetching suggested books:', error);
      });
  };

  return (
    <div className='p-4'>
      <div className='flex justify-center items-center gap-x-4'>
        <button
          className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'
          onClick={() => setShowType('table')}
        >
          Table
        </button>
        <button
          className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'
          onClick={() => setShowType('card')}
        >
          Card
        </button>
      </div>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl my-8'>Books List</h1>
        <Link to='/books/create'>
          <MdOutlineAddBox className='text-sky-800 text-4xl' />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : showType === 'table' ? (
        <BooksTable books={books} />
      ) : (
        <BooksCard books={books} />
      )}
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <Link to='/books/suggest'>
        <button className='bg-purple-300 hover:bg-purple-600 px-4 py-1 rounded-lg horizontal-center' onClick={()=>getSuggestedBooks()}>Suggest New Books</button>
      </Link>
    </div>
  );
};

export default Home;