// Office.onReady((info) => {
//   if (info.host === Office.HostType.Word) {
//     document.getElementById("sideload-msg").style.display = "none";
//     document.getElementById("app-body").style.display = "flex";
//     document.getElementById("run").onclick = run;
//   }
// });

// export async function run() {
//   return Word.run(async (context) => {
//     /**
//      * Insert your Word code here
//      */

//     // insert a paragraph at the end of the document.
//     const paragraph = context.document.body.insertParagraph("Hello World", Word.InsertLocation.end);

//     // change the paragraph color to blue.
//     paragraph.font.color = "blue";

//     await context.sync();
//   });
// }


import * as React from 'react';
import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import LogoutButton from '../components/LogoutButton';
import SignIn from '../components/SignIn';
import TabsList from '../components/TabsList';
import '../style/tailwind.css';

const App = () => {
  const [signedIn, setSignedIn] = useState(false);

  const handleSignIn = () => {
    setSignedIn(true);
  };

  const handleSignOut = () => {
    setSignedIn(false);
  };

  return (
    <div className="h-full">
      {!signedIn ? (
        <SignIn onSignIn={handleSignIn} />
      ) : (
        <>
          <TabsList/>
          <LogoutButton onSignOut={handleSignOut} />
        </>
      )}

    </div>
  );
};


// Wait for Office.js to initialize
Office.onReady((info) => {
  if (info.host === Office.HostType.Word) {
    // Render the React app once Office.js is ready
    const container = document.getElementById('container');
    const root = createRoot(container);
    root.render(<App />);
  }
});