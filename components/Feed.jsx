"use client";

import React, { useState, useEffect } from 'react';
import PromptsCard from './PromptsCard';

const PromptsCardList = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 prompt_layout'>
        {data?.map((post) => (
            <PromptsCard key={post._id} post={post} handleTagClick={handleTagClick} />
        ))}
    </div>
  );
};

const Feed = () => {

  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt")
      const  data  = await response.json();
      setPosts(data)
    }

    fetchPosts();
  }, [])

  useEffect(() => {
    if(searchText === "") {
      setFilteredPosts(posts)
    } else {
      setFilteredPosts(posts?.filter(post => 
        post?.prompt?.toLowerCase().includes(searchText.toLowerCase())
        || post?.tag?.toLowerCase().includes(searchText.toLowerCase()) 
      ))
    }


  }, [searchText, posts])
  
  const handleTagClick = (tagName) => {
    setSearchText(tagName);
  }

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          placeholder='Search for a prompt or tag...'
          type='text'
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          required
          className='search_input peer'
        />
      </form>
      
      <PromptsCardList
        data={filteredPosts}
        handleTagClick={handleTagClick}
      />
    </section>
  )
}

export default Feed