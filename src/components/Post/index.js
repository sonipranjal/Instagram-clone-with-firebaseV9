import Image from 'next/image';
import React from 'react';
import { AiOutlineHeart } from 'react-icons/ai';
import { BsBookmark, BsEmojiSmile, BsThreeDots } from 'react-icons/bs';
import { FaRegComment } from 'react-icons/fa';
import { IoShareOutline } from 'react-icons/io5';

const Post = ({ id, username, image, caption }) => {
  return (
    <div className="flex flex-col w-full border border-gray-200">
      <div className="flex items-center justify-between w-full p-2 ">
        <div className="flex items-center justify-center space-x-2">
          <div className="w-10 h-10 bg-black border-2 rounded-full" />
          <div>{username}</div>
        </div>
        <div className="w-4 select-none">
          <BsThreeDots className="text-lg" />
        </div>
      </div>
      <div className="relative flex items-center justify-center bg-black aspect-square">
        <Image
          src={image}
          layout="fill"
          alt={caption}
          className="object-contain"
        />
      </div>
      <div className="flex justify-between p-2 text-lg">
        <div className="flex space-x-2">
          <div>
            <AiOutlineHeart
              size={25}
              className="text-black cursor-pointer hover:text-black/50"
            />
          </div>
          <div>
            <FaRegComment
              size={22}
              className="text-black cursor-pointer hover:text-black/50"
            />
          </div>
          <div>
            <IoShareOutline
              size={22}
              className="text-black cursor-pointer hover:text-black/50"
            />
          </div>
        </div>
        <div>
          <BsBookmark
            size={20}
            className="text-black cursor-pointer hover:text-black/50"
          />
        </div>
      </div>
      <div className="px-2">1000 likes</div>
      <div className="px-2">{caption}</div>
      <div className="p-2">
        <div className="flex flex-col space-y-1">
          {new Array(3).fill(0).map((_, i) => (
            <div key={i} className="flex space-x-2">
              <div className="font-medium">username</div>
              <div>comment {i + 1}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="px-2">3 hours ago</div>
      <div className="flex items-center px-2 py-4 mt-1 space-x-3 border-t border-gray-200">
        <div>
          <BsEmojiSmile className="text-xl" />
        </div>
        <form onSubmit={(e) => e.preventDefault()} className="flex w-full px-2">
          <div className="w-full">
            <input
              type="text"
              name={`comment ${id}`}
              id={`comment ${id}`}
              className="w-full bg-white outline-none"
              placeholder="Add a comment..."
            />
          </div>
          <div>
            <button className="text-sm font-semibold text-blue-600">
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Post;
