import { Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';

// Lazily loading the `FormEmployee` component for better performance and split the app into chunks.
const FormEmployee = lazy(() => import('./components/FormEmployee'));

/**
 * Features:
 * 1. Displays the application name ("HRnet")
 * 2. Provides a link to view the current list of employees
 * 3. Lazily loads the `FormEmployee` component, showing a "Loading..." fallback
 *    during the component load time.
 */
const App = () => {
  return (
    <main className="container">
      <h1>HRnet</h1>
      {/* Navigation link to view the list of current employees */}
      <Link to="employees" className="link">
        View Current Employees
      </Link>
      {/* `Suspense` wrapper to handle the lazy loading of the `FormEmployee` component */}
      <Suspense fallback={<div>Loading...</div>}>
        <FormEmployee />
      </Suspense>
    </main>
  );
};

export default App;
