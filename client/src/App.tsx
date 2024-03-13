import React from 'react';
import Counter from "@/components/counter/Counter";
import 'styles/main.scss';
import image from '@/assets/images/image.png';
import Car from '@/assets/images/car.svg';

const App = () => {
  return (
    <main>
      <h1>
        Hello, world
      </h1>
      <hr/>
      <Counter/>
      <hr/>
      <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aliquid aperiam ducimus ea eaque eligendi explicabo in ipsam iusto libero minima, numquam odio optio qui quidem similique sunt temporibus voluptatem.</span><span>Eaque explicabo, ipsam mollitia neque numquam qui quos. Aliquam dicta dolorum earum explicabo harum ipsam iusto numquam officiis, placeat porro, quod reiciendis rem sequi, tempora veniam. Cupiditate, porro, vero! Quas?</span><span>Accusamus ad adipisci aperiam asperiores cumque delectus distinctio doloremque eaque eos eum excepturi incidunt iure magnam magni modi, neque, nobis nostrum omnis optio placeat quidem quisquam quod sint ullam voluptas?</span><span>A alias commodi corporis debitis eos error est et explicabo fugiat, harum inventore iste libero maiores odio pariatur ratione, ut veniam vero voluptas voluptatem? Fuga impedit ipsam soluta sunt tempora?</span><span>Alias consequatur debitis doloribus eius fuga, iure laboriosam, non porro quaerat quibusdam, quidem sint sunt velit! At cupiditate dicta error exercitationem explicabo iure minus nemo sequi vero voluptatem! Enim, officia.</span>
      <div>
        <img
          src={image}
          width={100}
          height={100}
          alt="image"
          decoding="async"
          loading="lazy"
        />
        <Car color="red" width={100} height={100} />
      </div>
    </main>
  );
};

export default App;