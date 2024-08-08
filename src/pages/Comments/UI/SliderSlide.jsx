import React from 'react';

function SliderSlide({
  img,
  comment,
  name,
  feature,
}) {
  return (
    <div
      className="w-[80%] h-full flex flex-col items-center md:items-start md:flex-row"
      style={{ gap: '16px' }}
    >
      <figure className="w-[200px] h-[200px] rounded-full overflow-hidden">
        <img
          src={img}
          alt=""
          className="w-[100%] h-[100%] bg-cover"
          style={{
            aspectRatio: '1',
            borderRadius: '50%',
          }}
        />
      </figure>

      <div className="flex flex-col w-[calc(100%-100px)] text-right">
        <h4 className="text-2xl mb-4">
          {name}{' '}
          <p className="inline-block text-base">
            درباره{' '}
            <span className="text-primaryColor">
              {feature}
            </span>{' '}
            میگه:
          </p>
        </h4>
        <p className="text-center">{comment}</p>
      </div>
    </div>
  );
}

export default SliderSlide;
