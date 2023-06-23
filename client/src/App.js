import {BrowserRouter, Routes, Route} from 'react-router-dom';
import DisplayAuthors from './components/DisplayAuthors';
import AuthorForm from './components/AuthorForm';
import EditAuthor from './components/EditAuthor';
import styles from './styles.module.css'

function App() {
  return (
    <div>
      <h1 className={styles.content}>Favorite Authors</h1>
      <BrowserRouter>
        <Routes>
          <Route element={<DisplayAuthors />} path="/" />
          <Route element={<AuthorForm />} path="/author/new" />
          <Route element={<EditAuthor />} path="/author/edit/:id" />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
