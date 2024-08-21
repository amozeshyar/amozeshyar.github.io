import userIcon from '../../asset/icon/profile-user_icon.svg';
import moshavereIcon from '../../asset/icon/profile-moshaver_icon.svg';
import UserInfo from '../../components/profile/UserInfo';
import TicketsInfo from '../../components/profile/TicketsInfo';
import { useState } from 'react';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import { changeUserImageProfile } from '../../store/profile-slice';

import profileImage from '../../asset/images/people-media-profile.png';

import { Progress } from 'antd';

export default function ProfilePage() {
  const { image } = useSelector(
    (state) => state.profile,
  );
  const [imageInfo, setImageInfo] = useState({
    text: 'بارگذاری تصویر',
    isUpload: false,
    progress: null,
  });
  const { user_token } = useSelector(
    (state) => state.auth,
  );

  const dispatch = useDispatch();

  const [imageFile, setImageFile] =
    useState(null);

  const imageChangeHandler = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageFile(file);
    dispatch(
      changeUserImageProfile({
        user_token,
        imageFile: file,
        cb: (info) => {
          setImageInfo(info);
        },
      }),
    );
  };

  return (
    <div className="flex mx-8 mt-8">
      <div className="relative z-10 w-[calc(100%-48px)] h-full px-10 pb-20 bg-white rounded-t-xl">
        <UserInfo />
      </div>
      <div className="flex flex-col items-center w-[150px] mt-6">
        <div className="relative flex flex-col items-center w-fit mb-2">
          {image.url ? (
            <img
              src={image.url}
              alt=""
              className="w-[62px] h-[64px] rounded-full"
              key={image.changed}
            />
          ) : (
            <img
              src={profileImage}
              alt=""
              className="w-[62px] h-[64px] rounded-full"
              key={image.changed}
            />
          )}
          <input
            type="file"
            accept="image/*"
            className={`absolute inset-0 w-full h-full opacity-0 ${
              imageInfo.isUpload
                ? 'cursor-not-allowed'
                : 'cursor-pointer'
            }`}
            onChange={imageChangeHandler}
            disabled={imageInfo.isUpload}
          />
          <div className="flex flex-col justify-center">
            <span className="mt-2 mb-1 text-xs whitespace-nowrap">
              {imageInfo.text}
            </span>
            {imageInfo.isUpload && (
              <Progress
                percent={Math.floor(
                  +imageInfo.progress * 100,
                )}
                status="active"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
