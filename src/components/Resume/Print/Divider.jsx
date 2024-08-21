import style from './style.module.css';

const Divider = ({ text }) => {
  return (
    <div className={style.Divider}>{text}</div>
  );
};

export default Divider;
