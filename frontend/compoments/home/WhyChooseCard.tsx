

import Image from "next/image";
import React from 'react'

type Props = {
  title: string;
  image: string;
  description: string;
};

const WhyChooseCard = ({ image, title, description }: Props) => {
  return (
    <div className="">
      <Image 
        src={image}
        width={90}
        height={90}
        alt={title}
        className="object-contain mx-auto"
      />
      <h1 className="text-center text-lg mt-5 mb-5 font-semibold text-gray-700">{title}</h1>
      <p className="text-gray-600 text-center font-light text-sm mb-7">
        {description}
      </p>
    </div>
  );
};

export default WhyChooseCard;
