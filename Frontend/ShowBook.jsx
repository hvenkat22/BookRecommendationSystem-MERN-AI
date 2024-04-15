import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Back from '../components/Back';
import Spinner from '../components/Spinner';

const ShowBook = () => {
    const [book, setBook] = useState({});
    const [loading, setLoading] = useState(false);
    const { id } = useParams();

    useEffect(()=>{
        setLoading(true);
        axios.get(`http://localhost:4444/books/${id}`)
        .then((response)=>{
           setBook(response.data); 
           setLoading(false);
        }).catch((error) => {
            console.log(error);
            setLoading(false);
        });
    },[])

  return (
    <div classname='p-4'>
      <Back />
      <h1 className='text-3xl my-4'>Show Book</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className='flex flex-col border-2 border-sky-500 rounded-xl w-fit p-4'>
            <div className='my-4'>
                <span className='text-xl mr-4 text gray-600'>ID</span>
                <span>{book._id}</span>
            </div>
            <div className='my-4'>
                <span className='text-xl mr-4 text gray-600'>Title</span>
                <span>{book.title}</span>
            </div>
            <div className='my-4'>
                <span className='text-xl mr-4 text gray-600'>Author</span>
                <span>{book.author}</span>
            </div>
            <div className='my-4'>
                <span className='text-xl mr-4 text gray-600'>Publish Year</span>
                <span>{book.publishYear}</span>
            </div>
            <div className='my-4'>
                <span className='text-xl mr-4 text gray-600'>Genre</span>
                <span>{book.genre}</span>
            </div>
            <div className='my-4'>
                <span className='text-xl mr-4 text gray-600'>Time Of Creation</span>
                <span>{new Date(book.createdAt).toString()}</span>
            </div>
            <div className='my-4'>
                <span className='text-xl mr-4 text gray-600'>Time Last Updated</span>
                <span>{new Date(book.updatedAt).toString()}</span>
            </div>
        </div>
      )}
    </div>
  )
}

export default ShowBook
