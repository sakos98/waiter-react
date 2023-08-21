import styles from '../ErrorPage/ErrorPage.module.scss';
import clsx from "clsx";


const ErrorPage = () => {

  return (
    <div>
      <h1 className={clsx("mb-4 text-center", styles.error)}>ERROR 404 - NOT FOUND</h1>
    </div>
  );
}

export default ErrorPage;