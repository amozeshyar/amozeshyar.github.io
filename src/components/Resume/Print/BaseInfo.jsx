import style from './style.module.css';

const BaseInfo = ({ title, value }) => {
  return (
    <div className={style.BaseInfo}>
      <h2>{title}</h2>
      {value ? <div>{value}</div> : '_'}
    </div>
  );
};

export default BaseInfo;
