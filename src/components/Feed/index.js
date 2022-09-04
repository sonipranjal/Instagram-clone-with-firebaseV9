import { BsThreeDots } from 'react-icons/bs';
import Header from '../Header';
import Post from '../Post';

const Feed = () => {
  return (
    <div className="w-full h-full bg-[#FAFAFA]">
      <Header />

      <div className="grid w-full max-w-screen-lg grid-cols-3 gap-6 mx-auto mt-20 ">
        <div className="flex flex-col w-full col-span-2 space-y-5 border-t-2 border-pink-500">
          <section className="flex p-4 space-x-4 overflow-x-scroll bg-white border border-black/10">
            {new Array(10).fill(0).map((_, i) => (
              <div
                key={i}
                className="rounded-full w-14 ring-[2px] ring-pink-500 ring-offset-2 h-14 bg-black flex-none"
              />
            ))}
          </section>
          <section className="flex flex-col gap-y-3">
            {new Array(5).fill(1).map((_, i) => (
              <Post key={i} postIndex={i} />
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
