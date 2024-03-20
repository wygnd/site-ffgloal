import React, {useEffect, useState} from 'react';
import {IPost, IPostRequest} from "@/@types/post";
import {get_post} from "@/http/posts";

const Logo = () => {

  const [logo, setLogo] = useState<IPost>(null);

  const getLogoData = async () => {
    const args: IPostRequest = {
      post_id: 4
    }

    const data = await get_post(args);
    setLogo(data);
  }

  useEffect(() => {
    getLogoData();
  }, [])

  return (
    <div>
      {logo && (
        <h2>{logo.title}</h2>
      )}
    </div>
  );
};

export default Logo;