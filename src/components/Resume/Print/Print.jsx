import { useSelector } from 'react-redux';
import Button from '../../UI/Button';

import styles from './style.module.css';
import BaseInfo from './BaseInfo';
import Divider from './Divider';

const PrintResume = () => {
  const {
    baseInformation,
    education,
    workExperience,
    skill,
  } = useSelector((state) => state.resume);

  const { image } = useSelector(
    (state) => state.profile,
  );

  const {
    nameResume,
    phonenumber,
    firstName,
    lastName,
    generic,
    vaziatTaahol,
    nezamVazife,
    city,
    birthdayDate,
    address,
  } = baseInformation;

  const {
    gradeEducation,
    fieldOfStudy,
    startDate,
    endDate,
    nameUniversity,
  } = education;

  const {
    employmentStatus,
    employmentTitle,
    occupationalGroup,
    companyName,
    startDate: wStartDate,
    endDate: wEndDate,
  } = workExperience;

  const printHandler = () => {
    window.print();
  };

  console.log('@#@#', generic);

  const baseInfo = [
    {
      title: 'نام رزومه',
      value: nameResume,
    },
    {
      title: 'نام',
      value: firstName,
    },
    {
      title: 'نام خانوادگی',
      value: lastName,
    },
    {
      title: 'تولد',
      value: birthdayDate,
    },
    {
      title: 'شماره تلفن',
      value: phonenumber,
    },
    {
      title: 'جنسیت',
      value: generic.label,
    },
    {
      title: 'وضعیت تاهل',
      value: vaziatTaahol.label,
    },
    {
      title: 'شهر',
      value: city.label,
    },
    {
      title: 'وضعیت نظام وظیفه',
      value: nezamVazife.label,
    },
    {
      title: 'آدرس',
      value: address,
    },
  ];

  const educationInfo = [
    {
      title: 'مقطع تحصیلی',
      value: gradeEducation,
    },
    {
      title: 'رشته تحصیلی',
      value: fieldOfStudy,
    },
    { title: 'تاریخ شروع', value: startDate },
    { title: 'تاریخ پایان', value: endDate },
    {
      title: 'نام دانشگاه',
      value: nameUniversity,
    },
  ];

  const workInfo = [
    {
      title: 'وضعیت شغلی',
      value: employmentStatus,
    },
    {
      title: 'عنوان شغلی',
      value: employmentTitle,
    },
    {
      title: 'گروه شغلی',
      value: occupationalGroup,
    },
    {
      title: 'نام شرکت',
      value: companyName,
    },
    {
      title: 'تاریخ شروع',
      value: wStartDate,
    },
    {
      title: 'تاریخ پایان',
      value: wEndDate,
    },
  ];

  return (
    <div className={styles.Wraper}>
      <div>
        <Divider text="اطلاعات شخصی" />
        {image?.url && (
          <div className={styles.Image}>
            <img src={image.url} />
          </div>
        )}
        <div className={styles.AllBaseInfo}>
          {baseInfo.map((info) => (
            <BaseInfo
              key={info.title}
              {...info}
            />
          ))}
        </div>
      </div>
      <div>
        <Divider text="تحصیلات" />
        <div className={styles.AllBaseInfo}>
          {educationInfo.map((edu) => (
            <BaseInfo key={edu.title} {...edu} />
          ))}
        </div>
      </div>
      <div>
        <Divider text="سوابق شغلی" />
        <div className={styles.AllBaseInfo}>
          {workInfo.map((w) => (
            <BaseInfo key={w.title} {...w} />
          ))}
        </div>
      </div>
      <div>
        <Divider text="مهارت‌ها" />
        <div className={styles.AllBaseInfo}>
          {skill.skills.map((s) => (
            <BaseInfo
              key={s.value}
              value={s.name}
            />
          ))}
        </div>
      </div>
      <div className={styles.Sticky}>
        <Button
          className={`${styles.NoPrint} ${styles.Btn}`}
          onClick={printHandler}
        >
          چاپ رزومه
        </Button>
      </div>
    </div>
  );
};

export default PrintResume;
