import { Link } from 'react-router-dom';
import heroImage from '../../asset/images/hero_image.svg';
import Button from '../../components/UI/Button';

import roadDashed from '../../asset/images/road-dashed.svg';
import roadCircleImage from '../../asset/images/road-circle_image.svg';
import roadSite from '../../asset/images/Group 386.png';
import Statictics from '../Statictics/Statictic.jsx';
import Comment from '../Comments/Comment';
import { Collapse } from 'antd';

export default function HomePage() {
  const items = [
    {
      key: '1',
      label:
        'چه مقدار می‌توان به تست های شخصیت اطمینان کرد؟',
      text: 'به طور کلی خطا در تست های شخصیت وجود دارد و نمی‌شود گفت که می‌توان به صورت صد درصدی اطمینان کرد. ما در آموزشیار تلاش کرده‌ایم که دقیق ترین تست های شخصیت را برای شما فراهم کنیم.',
    },
    {
      key: '2',
      label:
        'آیا مهارت های مربوطه در بخش کسب مهارت آموزش داده میشوند؟',
      text: 'آموزش هر مهارت نیازمند برنامه ای طولانی مدت، منظم و طبقه بندی شده است. ما در این بخش سعی میکنیم شما را با مسیرهای یادگیری آشنا کنیم و همچنین بهترین و باکیفیت ترین منابع موجود طبق نظر و تجربه اکثریت را به شما معرفی کنیم تا از بهترین روش ها بهره مند شوید.',
    },
    {
      key: '3',
      label:
        'راه ارتباطی‌ای با عوامل سازنده سایت وجود دارد؟',
      text: 'برای ارتباط با عوامل سازنده می‌توانید در پیامرسان بله به آیدی @mkhodagholi پیام دهید.',
    },
    {
      key: '4',
      label:
        'آیا امکان مشاوره در زمینه های تست شخصیت وجود دارد؟',
      text: 'هم اکنون این گزینه در سایت امکان پذیر نیست ولی در برنامه‌های آتی جزو اولویت‌های ما است.',
    },
  ];

  return (
    <div className="mt-8">
      <div className="relative flex flex-col items-center min-h-[60vh] p-4 shadow-lg md:flex-row z-30 max-w-full overflow-hidden">
        <div className="w-[100%] h-1/2 md:h-full md:w-1/2">
          <img
            src={heroImage}
            className="h-full"
          />
        </div>
        <div className="flex flex-col justify-center w-full my-4 md:text-center md:items-center md:w-[45%]">
          <h1 className="text-4xl md:text-8xl">
            آموزشیار
          </h1>
          <p className="my-2">
            بستری برای خودشناسی ، یادگیری ، آموزش
            و به اشتراک گذاشتن رزومه و تجربیاتتون
            با دیگران :)
          </p>
          <Button className="inline w-fit shadow-lg text-base px-0 py-0">
            <Link
              to="/talent-survey"
              className="inline-block px-8 py-2"
            >
              خودشناسی
            </Link>
          </Button>
        </div>
        <div className="w-[5%]"></div>
      </div>
      <div className="md:hidden">
        <div className="-z-30 relative flex justify-end mb-20">
          <img
            src={roadDashed}
            alt=""
            className="absolute right-0 -top-28 w-[30%] bg-top h-[450px] -z-30"
          />
          <div
            className="w-fit h-fit p-2 ml-2 bg-[#CFDFFF]"
            style={{
              borderRadius: '0 0 19px 19px',
            }}
          >
            <img src={roadCircleImage} alt="" />
          </div>
        </div>
        <div className="mb-[20vh] md:mb-[40vh] relative">
          <img src={roadSite} alt="" />

          <div
            style={{
              position: 'absolute',
              left: '2%',
              bottom: '12%',
              translate: 'translateX(-2%)',
            }}
          >
            <p className="text-xs">ساخت حساب</p>
            <p className="text-xxs">
              برای دسترسی به بخش های ویژه
            </p>
          </div>
          <div
            style={{
              position: 'absolute',
              left: '9%',
              bottom: '70%',
              translate: 'translateX(-9%)',
            }}
          >
            <p className="text-xs">ساخت رزومه</p>
            <p className="text-xxs">
              مثل حرفه ایا رزومه بساز
            </p>
          </div>
          <div
            style={{
              position: 'absolute',
              left: '35%',
              bottom: '45%',
              translate: 'translateX(-35%)',
            }}
          >
            <p className="text-xs">کسب مهارت</p>
            <p className="text-xxs">
              یادگیری مهارت های دلخواهتون به روش
              بهترینا
            </p>
          </div>
          <div
            style={{
              position: 'absolute',
              left: '58%',
              bottom: '12%',
              translate: 'translateX(-58%)',
            }}
          >
            <p className="text-xs">خودشناسی</p>
            <p className="text-xxs">
              ویژگی ها و ابعاد مختلفتو بهتر بشناس
            </p>
          </div>
        </div>
      </div>

      <div className="hidden md:block">
        <div className="-z-30 relative flex justify-end mb-20">
          <img
            src={roadDashed}
            alt=""
            className="absolute right-0 -top-28 w-[30%] bg-top h-[450px] -z-30"
          />
          <div
            className="w-fit h-fit p-2 ml-2 bg-[#CFDFFF]"
            style={{
              borderRadius: '0 0 19px 19px',
            }}
          >
            <img src={roadCircleImage} alt="" />
          </div>
        </div>
        <div className="mb-[20vh] md:mb-[40vh] relative">
          <img src={roadSite} alt="" />

          <div
            style={{
              position: 'absolute',
              left: '4%',
              bottom: '20%',
              translate: 'translateX(-4%)',
            }}
          >
            <p>ساخت حساب</p>
            <p className="text-xs font-light">
              برای دسترسی به بخش های ویژه
            </p>
          </div>
          <div
            style={{
              position: 'absolute',
              left: '22%',
              translate: 'translateX(-22%)',
              bottom: '75%',
            }}
          >
            <p >ساخت رزومه</p>
            <p className="text-xs font-light">
              مثل حرفه ایا رزومه بساز
            </p>
          </div>
          <div
            style={{
              position: 'absolute',
              left: '37%',
              translate: 'translateX(-37%)',
              bottom: '42%',
            }}
          >
            <p>
              کسب مهارت
            </p>
            <p className="text-xs font-light">
              یادگیری مهارت های دلخواهتون به روش
              بهترینا
            </p>
          </div>
          <div
            style={{
              position: 'absolute',
              left: '70%',
              translate: 'translateX(-70%)',
              bottom: '35%',
            }}
          >
            <p>خودشناسی</p>
            <p className="text-xs font-light">
              ویژگی ها و ابعاد مختلفتو بهتر بشناس
            </p>
          </div>
        </div>
      </div>

      <div className="relative my-[200px]">
        <div className="absolute w-full h-[100px] -top-[10%] bg-secondaryColor skew-y-2 -z-10" />
        <div className="absolute w-full h-[100px] -bottom-[10%] bg-secondaryColor skew-y-2 -z-10" />
        <Statictics />
      </div>
      <div className="relative mt-[400px]">
        <div className="absolute w-full h-[100px] -top-[10%] bg-[#DEEAFF] -skew-y-2 -z-10" />
        <div className="absolute w-full h-[100px] -bottom-[10%] bg-[#DEEAFF] -skew-y-2 -z-10" />
        <Comment />
      </div>

      <div className="w-[80%] mx-auto my-[150px]">
        <h2 className="text-2xl mb-6">
          پرسش های پر تکرار
        </h2>
        <Collapse>
          {items.map((item) => (
            <Collapse.Panel
              header={item.label}
              key={item.key}
              className="text-base"
            >
              <span className="text-sm text-gray-500">
                {item.text}
              </span>
            </Collapse.Panel>
          ))}
        </Collapse>
      </div>
    </div>
  );
}
