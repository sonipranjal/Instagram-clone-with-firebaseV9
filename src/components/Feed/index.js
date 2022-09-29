import { useContext, useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import {
  GlobalContext,
  GlobalDispatchContext,
} from '../../state/context/GlobalContext';
import Header from '../Header';
import Modal from '../Modal';
import Post from '../Post';
import { db, storage } from '../../lib/firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { uuidv4 } from '@firebase/util';
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';

const Feed = () => {
  const { isUploadPostModalOpen } = useContext(GlobalContext);
  const dispatch = useContext(GlobalDispatchContext);

  const closeModal = () => {
    dispatch({
      type: 'SET_IS_UPLOAD_POST_MODAL_OPEN',
      payload: {
        isUploadPostModalOpen: false,
      },
    });
  };

  const [file, setFile] = useState('');

  const [media, setMedia] = useState({
    src: '',
    isUploading: false,
    caption: '',
  });

  useEffect(() => {
    const reader = new FileReader();

    const handleEvent = (e) => {
      switch (e.type) {
        case 'load':
          return setMedia((prev) => ({
            ...prev,
            src: reader.result,
          }));
        case 'error':
          console.log(e);
          return toast.error('something not working');
        default:
          return;
      }
    };

    if (file) {
      reader.addEventListener('load', handleEvent);
      reader.addEventListener('error', handleEvent);
      reader.readAsDataURL(file);
    }

    return () => {
      reader.removeEventListener('load', handleEvent);
      reader.removeEventListener('error', handleEvent);
    };
  }, [file]);

  const currentImage = useRef(null);

  const { user } = useContext(GlobalContext);

  const handlePostMedia = async (url) => {
    const postId = uuidv4();
    const postRef = doc(db, 'posts', postId);
    const post = {
      id: postId,
      image: url,
      caption: media.caption,
      username: user.username,
      createdAt: serverTimestamp(),
    };
    try {
      await setDoc(postRef, post);
    } catch (error) {
      console.error(error);
      toast.error('error posting the image');
    }
  };

  const handleUploadPost = async () => {
    if (!file) return toast.error('please select a image first');
    setMedia((prev) => ({ ...prev, isUploading: true }));

    const toastId = toast.loading('uploading your post, wait a minute...');
    const postName = `posts/${uuidv4()}-${file.name}`;

    const storageRef = ref(storage, postName);

    try {
      const uploadTask = await uploadBytes(storageRef, file);
      const url = await getDownloadURL(uploadTask.ref);
      await handlePostMedia(url);
      toast.success('image has uploaded', {
        id: toastId,
      });
    } catch (error) {
      toast.error('failed to upload the image', {
        id: toastId,
      });
    } finally {
      setMedia({
        src: '',
        isUploading: false,
        caption: '',
      });
      setFile('');
      closeModal();
    }
  };

  const handleRemovePost = () => {
    setFile('');
    currentImage.current.src = '';
  };

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const postsCollection = collection(db, 'posts');
    const q = query(postsCollection, orderBy('createdAt', 'desc'));
    onSnapshot(q, (snapshot) => {
      const posts = snapshot.docs.map((doc) => doc.data());
      setPosts(posts);
      setLoading(false);
    });
  }, []);
  console.log(posts);

  return (
    <div className="w-full h-full bg-[#FAFAFA]">
      <Header />
      <Modal closeModal={closeModal} isOpen={isUploadPostModalOpen}>
        <div className="w-screen h-screen max-w-3xl max-h-[70vh] flex flex-col items-center">
          <div className="w-full py-4 text-xl font-light text-center border-b border-black">
            Create new post
          </div>
          <div className="flex items-center justify-center w-full h-full">
            {!file ? (
              <>
                <label
                  htmlFor="post"
                  className="bg-[#0095F6] py-2 px-4 text-white active:scale-95 transform transition  disabled:bg-opacity-50 select-none cursor-pointer disabled:scale-100 rounded text-sm font-semibold"
                >
                  Select from computer
                </label>

                <input
                  onChange={(e) => setFile(e.target.files[0])}
                  value={file.name}
                  type="file"
                  name="post"
                  id="post"
                  className="hidden"
                  multiple={false}
                  accept="image/jpeg,image/png"
                />
              </>
            ) : (
              <div className="flex flex-col p-5 gap-y-4">
                <input
                  type="image"
                  src={media.src}
                  className="w-80 h-80"
                  ref={currentImage}
                />
                <input
                  type="text"
                  name="caption"
                  id="caption"
                  placeholder="Type your caption (optional...)"
                  onChange={(e) =>
                    setMedia((prev) => ({ ...prev, caption: e.target.value }))
                  }
                  value={media.caption}
                  className="w-full px-2 py-4 bg-gray-100 border rounded outline-none hover:bg-transparent focus:bg-transparent focus:border-gray-400"
                />
                <div className="flex items-center justify-center w-full gap-x-6">
                  <button
                    className="bg-[#0095F6] py-2 px-4 text-white active:scale-95 transform transition  disabled:bg-opacity-50 select-none cursor-pointer disabled:scale-100 rounded text-xl font-semibold"
                    onClick={handleRemovePost}
                  >
                    Remove
                  </button>
                  <button
                    className="bg-[#0095F6] py-2 px-4 text-white active:scale-95 transform transition  disabled:bg-opacity-50 select-none cursor-pointer disabled:scale-100 rounded text-xl font-semibold"
                    onClick={handleUploadPost}
                  >
                    Upload
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </Modal>

      <div className="grid w-full max-w-screen-lg grid-cols-3 gap-6 mx-auto mt-20 ">
        <div className="flex flex-col w-full col-span-2 space-y-5 border-t-2 border-pink-500">
          {/* stories section */}
          <section className="flex p-4 space-x-4 overflow-x-scroll bg-white border border-black/10">
            {new Array(10).fill(0).map((_, i) => (
              <div
                key={i}
                className="rounded-full w-14 ring-[2px] ring-pink-500 ring-offset-2 h-14 bg-black flex-none"
              />
            ))}
          </section>

          {/* posts section */}
          <section className="flex flex-col gap-y-3">
            {posts.map((post) => (
              <Post key={post.id} {...post} />
            ))}
          </section>
        </div>

        {/* this is our sidebar */}
        <div className="fixed right-[15%] max-w-sm">
          <div className="flex">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates,
            optio? Eius quia quis iste ipsa in impedit eligendi voluptatibus
            tenetur praesentium iure! Soluta nemo doloremque quod est quisquam
            explicabo placeat, amet deleniti ex saepe, officiis quaerat
            asperiores aliquid molestias rem iure perspiciatis quam! Quidem quo
            laudantium cumque, dolore mollitia illo ullam. Perspiciatis cumque
            in, recusandae reprehenderit asperiores, optio explicabo a adipisci
            fuga ad facilis ipsum, ullam dicta ipsa dignissimos placeat
            deleniti. Mollitia aliquid dolor odit, ullam laboriosam corrupti et.
            Id atque dolor repellendus porro, laboriosam rem odio ex quaerat
            unde tenetur consectetur vero! Veniam sequi et a illo consectetur
            repellat.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feed;
