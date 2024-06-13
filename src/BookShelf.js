// import React from 'react';

// function Bookshelf({ bookshelf }) {
//   return (
//     <div>
//       <h1>My Bookshelf</h1>
//       <div>
//         {bookshelf.map(book => (
//           <div key={book.key} style={{ border: '1px solid black', margin: '10px', padding: '10px' }}>
//             <h2>{book.title}</h2>
//             <p>Author: {book.author_name ? book.author_name.join(', ') : 'Unknown'}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Bookshelf;

import React from 'react';
import './bookshelf.css'
function Bookshelf({ bookshelf = [] }) {
  return (
    <div className='wrapper'>
      <h1>My Bookshelf</h1>
      <div className='cards'>
        {bookshelf.map(book => (
          <div className='cards1' key={book.key} style={{ border: '1px solid black', margin: '10px', padding: '10px' }}>
            <h2>{book.title}</h2>
            <p>Edition Count: {book.edition_count ? book.edition_count : 'Unknown'}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Bookshelf;

