import { Link } from "react-router-dom";
import { styles } from "~/constants/styles";

const NotFoundPage = () => {
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className={`${styles.card} p-10 text-center max-w-md w-full`}>
        <h1 className={`text-8xl font-bold ${styles.header} mb-4`}>404</h1>
        <h2 className={`text-2xl font-semibold text-slate-700 mb-4`}>
          Page Not Found
        </h2>
        <p className="text-slate-500 mb-8">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className={`inline-flex items-center gap-2 ${styles.ctaButton}`}
        >
          &larr; Back to Dashboard
        </Link>
      </div>
    </main>
  );
};

export default NotFoundPage;