import React from "react";
import "./App.css";
import { mainRouter } from "./router";
import { Route, BrowserRouter, Routes } from "react-router-dom";

function App() {
  // React.useEffect(() => {
  //   // initGame();
  // },[]);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {mainRouter.map((r) => {
            return (
              <Route key={r.path} path={r.path} element={<r.component />}>
                {(() => {
                  if (r.childs) {
                    return r.childs.map((cr) => (
                      <Route
                        key={cr.path}
                        path={cr.path}
                        element={<cr.component />}
                      />
                    ));
                  }
                })()}
              </Route>
            );
          })}
        </Routes>
      </BrowserRouter>
      {/* <Options /> */}
    </div>
  );
}

export default App;
