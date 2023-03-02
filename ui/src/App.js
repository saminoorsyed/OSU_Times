import { Routes, Route } from 'react-router-dom';
import './App.css';
import React from 'react';

// import pages
import DBHomePage from './Pages/DBPages/DBHomePage';
import DBUsersPage from './Pages/DBPages/DBUsersPage';
import DBAdminsPage from './Pages/DBPages/DBAdminsPage';
import DBAuthorsPage from './Pages/DBPages/DBAuthorsPage';
// import components
import DBNavigation from './Components/DBComponents/DBNavigation';
import DBUsersAuthorsPage from './Pages/DBPages/DBUsersAuthors';
import DBGenresPage from './Pages/DBPages/DBGenresPage';
import DBPostsPage from './Pages/DBPages/DBPosts';
import DBCommentsPage from './Pages/DBPages/DBCommentsPage';
import DBReactionsPage from './Pages/DBPages/DBReactions';
import DBReactionIconsPage from './Pages/DBPages/DBReactionIcons';
import Header from './Components/CComponents/Header'
function App() {
  return (
    <div className="App">
      <header>
        <Header/>
        <DBNavigation/>
      </header>
      <main>
        <Routes>
          <Route path='/'element={<DBHomePage/>}/>
          <Route path='/DBUsers' element={<DBUsersPage/>}/>
          <Route path='/DBAdmins' element={<DBAdminsPage/>}/>
          <Route path='/DBAuthors' element={<DBAuthorsPage/>}/>
          <Route path='/DBUsersAuthors' element= {<DBUsersAuthorsPage/>}/>
          <Route path='/DBGenres' element={<DBGenresPage/>}/>
          <Route path='/DBPosts' element={<DBPostsPage/>}/>
          <Route path='/DBComments' element={<DBCommentsPage/>}/>
          <Route path='/DBReactions' element={<DBReactionsPage/>}/>
          <Route path='/DBReactionIcons' element={<DBReactionIconsPage/>}/>
        </Routes>
      </main>
    </div>
  );
}

export default App;
