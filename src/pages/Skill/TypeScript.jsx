import React, { useRef, useEffect } from 'react';
import SkillSection from './UI/SkiilSection';
import SkillRoad from './UI/SkillRoad';
import bg from '../../asset/images/bg.png';
import bg2 from '../../asset/images/bg2.png';
import bg3 from '../../asset/images/Group 444.png';
import bg6 from '../../asset/images/Group 445.png';
import bg7 from '../../asset/images/Group 446.png';
import tsroadMap from '../../asset/images/ts-roadmap.jpg';
import useObserver from '../../hooks/use-observer';

function TypeScript() {
  const navbarRef = useRef(null);
  const observeLineRef = useRef(null);
  const top1Ref = useRef(null);
  const top2Ref = useRef(null);
  const top3Ref = useRef(null);
  const top4Ref = useRef(null);
  const top5Ref = useRef(null);
  const top6Ref = useRef(null);
  const top7Ref = useRef(null);
  const top8Ref = useRef(null);

  useObserver(navbarRef, observeLineRef);

  return (
    <section className="  mx-auto flex flex-col  ">
      <div className="bg-line bg-no-repeat">
        {' '}
        <h1 className="inline-block p-10 ">
          مقدمه:
        </h1>
      </div>

      <SkillSection
        explain={
          'یکی از جذاب ‌ ترین تکنولوژی ‌ هایی که وارد دنیای توسعه وب شده است زبان برنامه ‌ نویسی  تایپ ‌ اسکریپت است.شرکت ‌ های بزرگی مانند گوگل، فیسبوک و توییتر استفاده از آن را بشدت پیشنهاد  می ‌ دهند. تایپ اسکریپت یک زبان برنامه نویسی مبتنی بر جاوا اسکریپت است که توسط شرکت  مایکروسافت توسعه یافته است. تایپ اسکریپت را به عنوان یک Superset برای جاوا اسکریپت در  نظر می ‌ گیرند. منظور از Superset بودن یک زبان برنامه نویسی این است که مبتنی بر یک زبان برنامه  نویسی دیگر بوده و ویژگی ‌ های زیادی را به آن زبان اضافه می ‌ کند.'
        }
      />

      <div
        className="mt-8"
        ref={observeLineRef}
      ></div>
      <section
        className="flex sticky top-0 gap-5 justify-center mx-auto w-full z-20 py-5 bg-white/80"
        ref={navbarRef}
      >
        <div className=" bg-dotted bg-no-repeat bg-center flex sticky top-0 gap-5 justify-center mx-auto w-full">
          <SkillRoad
            refTitle={top1Ref}
            title={
              'چرا باید تایپ‌ اسکریپت را یاد بگیریم'
            }
          />
          <SkillRoad
            refTitle={top2Ref}
            title={'افزایش بهره‌وری'}
          />
          <SkillRoad
            refTitle={top3Ref}
            title={'خوانایی'}
          />

          <SkillRoad
            refTitle={top4Ref}
            title={'ترجمه به جاوا اسکریپت'}
          />

          <SkillRoad
            refTitle={top5Ref}
            title={'شی گرایی قدرتمند'}
          />
          <SkillRoad
            refTitle={top6Ref}
            title={
              'پیشتیبانی از کتابخانه‌های قدرتمند'
            }
          />
          <SkillRoad
            refTitle={top7Ref}
            title={'منابع یادگیری'}
          />
          <SkillRoad
            refTitle={top8Ref}
            title={'نقشه راه'}
          />
        </div>
      </section>

      <div className="relative mb-[150px]">
        <img
          src={bg}
          className="absolute left-0 w-[10%] -mt-7"
          alt=""
        />
      </div>
      <section className="container mx-auto inline-block">
        <h2
          id="1"
          className="inline-block px-10  "
          ref={top1Ref}
        >
          چرا باید تایپ‌ اسکریپت را یاد بگیریم
        </h2>
        <p className="px-10 text-xs leading-7">
          اگر یک برنامه جاوا اسکریپت دارید که هیچ
          گونه خطای نحوی ندارد، برنامه تایپ ‌
          اسکریپت نیز هست. همانطور که گفته شد زبان
          تایپ ‌ اسکریپت یک superset ‌ برای زبان
          جاوااسکرپت و هدف آن کدنویسی آسان با کم ‌
          ترین میزان خطا و استفاده از ویژگی ‌ های
          پیشرفته ‌ ی زبان ‌ های شی ‌ گرا، جهت
          نوشتن برنامه ‌ های سمت سرور و سمت کاربر
          است. اهمیت این زبان در این است که به شما
          این اجازه را می ‌ دهد که انواع داده ‌
          هایی را که داخل کد ارسال می ‌ شوند، مشخص
          کنید. همچنین قابلیت این را دارد که در
          صورت وجود عدم تطابق، انواع خطاها را
          گزارش کند. مثلا هنگام ارسال یک رشته به
          تابعی که انتظار یک عدد را دارد، خطایی را
          گزارش می ‌ دهد. جاوا اسکریپت این قابلیت
          را دارا نیست و نمی ‌ تواند این ‌ کار را
          بکند.
          <br />
          <br />
          <h2
            id="2"
            className="inline-block "
            ref={top2Ref}
          >
            افزایش بهره‌وری{' '}
          </h2>{' '}
          <br />
          مثلا فرض کنید که می ‌ خواهید از سرور
          لیستی از کاربران را بگیرید و اطلاعات آن
          ها را در صفحه ادمین نمایش دهید. اگر
          بخواهید با جاوااسکریپت کد بزنید بدون در
          نظر گرفتن تایپ داده ها ممکن است مشکلی
          پیش بیاید)البته راهکارهایی برای پیشگیری
          از این مشکل ها نیز وجود دارد( مثلا سن
          کاربر ها را شما به صورت عدد در نظر گرفته
          باشید ولی در سرور به صورت تایپ رشته )
          string ( ذخیره شده باشد و اگر روی این سن
          بخواهید عملیاتی انجام دهید نتیجه به صورت
          NaN نمایش داده می ‌ شود ولی در تایپ ‌
          اسکریپت از آنجایی که تایپ ها به صورت
          قطعی مشخص کرده اید برنامه خطای نحوی می ‌
          دهد و اصلا اجرا نمی ‌ شود.
          <img
            src={bg6}
            alt=""
            className="-ml-4 w-32 float-left"
          />
          <br />
          <br />
          <h2
            id="3"
            className="inline-block "
            ref={top3Ref}
          >
            خوانایی
          </h2>
          <br />
          به لطف افزودن تایپ ‌ های سخت ‌ گیرانه و
          سایر عناصری که باعث می ‌ شود کد، خودبیان
          ‌ تر شود، شما به ‌ راحتی خواهید توانست
          دلایل و اهداف توسعه ‌ دهندگانی که در
          ابتدا کد را نوشته ‌ اند متوجه شوید. این
          امر به ویژه برای تیم های توزیع شده ای که
          روی یک پروژه کار می ‌ کنند، بسیار مهم
          است. کدی که خودش صحبت می ‌ کند می ‌
          تواند کمبود ارتباط مستقیم بین اعضای تیم
          را جبران کند.
          <br /> <br />
          <h2
            id="4"
            className="inline-block"
            ref={top4Ref}
          >
            ترجمه به جاوا اسکریپت
          </h2>
          <br />
          تایپ اسکریپت قابلیت اجرا شدن به صورت
          مستقیم را ندارد چرا که به کدهای صفر و یک
          تبدیل نمی ‌ شود. بجای آن تایپ اسکریپت
          کدهای خود را به جاوا اسکریپت تبدیل کرده
          و آن کدها را در نهایت اجرا می ‌ کند. این
          مسئله باعث سازگاری بسیار بیشتر خواهد شد
          و مهم نیست که شما از چه پلتفرم یا
          مرورگری استفاده خواهید کرد. اگر ابزار
          اجرایی شما از جاوا اسکریپت پشتیبانی بعمل
          بیاورد در نهایت کدهای تایپ اسکریپتی شما
          نیز به خوبی اجرا خواهند شد. دومین خاصیتی
          که این ویژگی به شما می ‌ دهد دریافت همان
          میزان کارایی و پرفورمنس است که از طریق
          جاوا اسکریپت دریافت می ‌ کنید. در واقع
          سرعت اجرای پروژه ‌ های شما بیشتر نخواهد
          شد، چرا که همانطور گفته شد در نهایت این
          قطعه کد جاوا اسکریپتی است که اجرا می ‌
          شود.
          <br />
          <br />
          <h2
            id="5"
            className="inline-block "
            ref={top5Ref}
          >
            شی گرایی قدرتمند
          </h2>
          <br />
          جاوا اسکریپت یک زبان برنامه نویسی
          توانمند و بسیار قدرتمند در زمینه
          پارادایم شئ ‌ گرایی نیست و تمام ویژگی ‌
          های یک سیستم برنامه نویسی شئ ‌ گرا مانند
          جاوا را در اختیارتان قرار نمی ‌ دهد.
          برای در اختیار گرفتن این امکانات شما
          نیاز به استفاده از یک Superset مانند
          تایپ اسکریپت دارید. تایپ اسکریپت به صورت
          کامل از پارادایم شئ ‌ گرایی پشتیبانی
          بعمل آورده و قابلیت ‌ های یک زبان برنامه
          نویسی شئ گرا را در اختیارتان قرار می ‌
          دهد.
          <br /> <br />
          <h2
            id="6"
            className="inline-block "
            ref={top6Ref}
          >
            پیشتیبانی از کتابخانه‌های قدرتمند
          </h2>
          <br />
          یکی از دغدغه ‌ های بسیاری از برنامه
          نویسان که به تازگی وارد فرایند آموزش
          تایپ اسکریپت می ‌ شوند این است که آیا
          قابلیت استفاده از کتابخانه ‌ های دیگر
          جاوا اسکریپت را خواهند داشت یا خیر؟
          همانطور که گفته شد تایپ اسکریپت در نهایت
          به جاوا اسکریپت تبدیل خواهد شد، ‌
          بنابراین در زمان اجرا و استفاده از این
          کتابخانه ‌ ها در پروژه نهایی هیچ مشکلی
          نخواهید داشت.
          <br /> <br />
        </p>
      </section>

      <section className="container mx-auto  ">
        <img
          src={bg2}
          alt=""
          className="w-36 float-left mr-8"
        />
        <br /> <br /> <br /> <br />
        <h2
          id="7"
          className="inline-block px-10"
          ref={top7Ref}
        >
          منابع یادگیری TypeScript{' '}
        </h2>
        <p className="px-10 text-xs leading-7">
          <h3>دوره ها</h3>
          دوره جاوااسکریپت ۱۲ ساعت ۳۵۹ هزار تومان
          استاد صدری
          <br />
          دوره جاوااسکریپت ۱۵ ساعت رایگان استاد
          مدائنی
          <br />
          دوره تایپ ‌ اسکریپت ۱۵ ساعت حدودا رایگان
          استاد ماکسیمیلیان عزیز
          <br />
        </p>
        <br /> <br />
        <img
          src={bg3}
          alt=""
          className="w-[53%] float-left "
        />
        <h2
          id="8"
          className="inline-block px-10"
          ref={top8Ref}
        >
          {' '}
          نقشه راه
        </h2>
        <section className="mx-auto w-[75%] flex justify-center">
          <img
            src={tsroadMap}
            alt=""
            className="w-full"
          />
        </section>
        <img
          src={bg7}
          className="-mb-48 -z-10"
          alt=""
        />
      </section>
    </section>
  );
}

export default TypeScript;
