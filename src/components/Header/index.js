import Link from 'next/link';
import { BsSearch } from 'react-icons/bs';
import HeaderIcon from '../Header/HeaderIcon';
import {
  Add,
  Home,
  Heart,
  Messenger,
  Compass,
  Profile,
} from '../Header/HeaderIcons';
import { signOut } from 'firebase/auth';
import { auth } from '../../lib/firebase';

const HEADER_ITEMS = [
  {
    icon: Home,
    url: '/',
    name: 'Home',
  },
  {
    icon: Messenger,
    url: '/',
    name: 'Messenger',
  },
  {
    icon: Add,
    url: '/',
    name: 'Add',
  },
  {
    icon: Compass,
    url: '/',
    name: 'Discover',
  },
  {
    icon: Heart,
    url: '/',
    name: 'Likes',
  },
  {
    icon: Profile,
    url: '/',
    name: 'Profile',
  },
];

const Header = () => {
  const handleLogout = async () => {
    await signOut(auth);
    window.location.reload();
  };

  return (
    <header className="fixed top-0 z-10 flex items-center justify-around w-full h-16 bg-white shadow-md">
      <Link href="/">
        <div className="text-xl font-semibold tracking-wider cursor-pointer select-none">
          Instagram
        </div>
      </Link>
      <div className="flex items-center px-2 space-x-4 bg-gray-100 border border-gray-400 rounded-lg group group-focus:border-gray-400">
        <label htmlFor="search" className="">
          <BsSearch className="text-lg text-gray-400" />
        </label>
        <input
          type="search"
          name="search"
          id="search"
          className="w-full px-2 py-1 transition bg-gray-100 rounded-sm outline-none hover:bg-transparent focus:bg-transparent placeholder:text-sm "
          placeholder="Search"
        />
      </div>
      <div className="flex items-center space-x-2">
        <div className="flex space-x-4">
          {HEADER_ITEMS.map((item) => (
            <HeaderIcon Icon={item.icon} name={item.name} key={item.name} />
          ))}
        </div>
        <button
          onClick={handleLogout}
          className="bg-[#0095F6] py-1 h-4/5 text-white active:scale-95 transform transition disabled:bg-opacity-50 px-6 disabled:scale-100 rounded text-sm font-semibold"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
